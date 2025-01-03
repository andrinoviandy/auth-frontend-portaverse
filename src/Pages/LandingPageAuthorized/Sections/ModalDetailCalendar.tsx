/* eslint-disable react/jsx-props-no-spreading */
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  ActionIcon,
  Group,
  Indicator,
  Loader,
  Stack,
  Tabs,
  Tooltip,
} from "@mantine/core";
import dayjs from "dayjs";
import { useState } from "react";

import {
  AgendaGuest,
  CommunityAgenda,
  PersonalAgenda,
} from "./index.types";
import NoItems from "../../../Components/Errors/NoItems";
import MODAL_IDS from "../../../Components/Modals/modalIds";
import SectionModalTemplate from "../../../Components/Modals/Templates/SectionModal";
import {
  BASE_PROXY,
  SOCIAL_ENDPOINT,
} from "../../../Networks/endpoint";
import { Networks } from "../../../Networks/factory";
import closeNiceModal from "../../../Utils/Helpers/closeNiceModal";
import getUserCookie from "../../../Utils/Helpers/getUserCookie";
import uppercaseFirstLetterEveryWord from "../../../Utils/Helpers/uppercaseFirstLetterEveryWord";

// const PAGE_SIZE = 10;

interface AgendaCardProps {
  agendaId?: number;
  title: string;
  communityName?: string;
  description: string | null;
  imageUrl?: string | null;
  guests?: AgendaGuest[];
  href?: string;
  canEdit?: boolean;
  startDate: Date | string;
  endDate: Date | string;
  type: string;
  /** URL if online, address if offline. */
  location: string;
  creatorEmpId?: number;
}

function AgendaCard({
  agendaId,
  title,
  communityName,
  description,
  imageUrl,
  guests,
  href,
  canEdit,
  startDate,
  endDate,
  type,
  location,
  creatorEmpId,
}: AgendaCardProps) {
  const renderContent = () => {
    return (
      <Stack className="rounded-md border p-3" gap="xs">
        <Group align="center" justify="space-between" w="100%">
          <Group align="center">
            {imageUrl ? (
              <img
                alt="cover"
                src={imageUrl}
                className="h-[48px] w-[85px] rounded-md object-cover"
              />
            ) : (
              <div className="flex h-[48px] w-[85px] items-center justify-center rounded-md bg-bg2">
                <Icon
                  icon="gridicons:calendar"
                  width={20}
                  className="text-darkGrey"
                />
              </div>
            )}
            <Stack gap={4}>
              <Tooltip label={title}>
                <p className="line-clamp-1 font-bold">{title}</p>
              </Tooltip>
              {communityName && (
                <Tooltip label={communityName}>
                  <p className="line-clamp-1 text-sm text-darkGrey">
                    {communityName}
                  </p>
                </Tooltip>
              )}
            </Stack>
          </Group>
          {canEdit && (
            <ActionIcon
              variant="transparent"
              onClick={() =>
                NiceModal.show(MODAL_IDS.CALENDAR.CREATE_AGENDA, {
                  isEdit: true,
                  personalAgendaId: agendaId,
                  creatorEmpId,
                  agendaData: {
                    title,
                    start_date: startDate,
                    end_date: endDate,
                    guests,
                    type,
                    offline_location:
                      type === "Offline" ? location : null,
                    online_url: type === "Online" ? location : null,
                    description,
                  },
                })
              }
            >
              <Icon icon="mdi:pencil" width={20} />
            </ActionIcon>
          )}
        </Group>

        <Stack gap={2} className="text-sm">
          <p>Tanggal Agenda</p>
          <p className="text-darkGrey">
            {dayjs(startDate).format("DD/MM/YYYY, HH:mm")}{" "}
            {endDate && <>- {dayjs(endDate).format("HH:mm")}</>}
          </p>
        </Stack>

        <Stack gap={2} className="text-sm">
          <p>{communityName ? "Pembicara" : "Pekerja"}</p>
          <div className="text-primary3">
            {guests?.map((g, i) => {
              const isCreator = g.employee_id === creatorEmpId;
              return (
                <a
                  href={`${import.meta.env.VITE_KMS_URL}/home/detail/${g.social_employee_profile_id}`}
                  target="_blank"
                  className="hover:underline"
                  rel="noreferrer"
                >
                  {g.name}
                  {isCreator && (
                    <span className="text-darkGrey">
                      &nbsp;(Pembuat)
                    </span>
                  )}
                  {i !== guests.length - 1 && ", "}
                </a>
              );
            })}
          </div>
        </Stack>

        <Stack gap={2} className="text-sm">
          <p>Tipe Agenda</p>
          <p className="text-darkGrey">{type}</p>
        </Stack>

        <Stack gap={2} className="text-sm">
          <p>{type === "Online" ? "Link" : "Lokasi"} Agenda</p>
          {type === "Online" ? (
            <a
              href={location}
              target="_blank"
              className="text-primary3 hover:underline"
              rel="noreferrer"
            >
              {location}
            </a>
          ) : (
            <p className="text-darkGrey">{location}</p>
          )}
        </Stack>

        {description && (
          <Stack gap={2} className="text-sm">
            <p>Deskripsi Agenda</p>
            <p className="text-darkGrey">{description}</p>
          </Stack>
        )}
      </Stack>
    );
  };

  return href ? (
    <a
      href={href}
      target="_blank"
      className="hover:bg-bg4"
      rel="noreferrer"
    >
      {renderContent()}
    </a>
  ) : (
    renderContent()
  );
}

interface ModalDetailCalendarProps {
  date: Date;
}
const ModalDetailCalendar = NiceModal.create(
  ({ date }: ModalDetailCalendarProps) => {
    const modalId = MODAL_IDS.CALENDAR.DATE_DETAIL;
    const modal = useModal(modalId);

    const paramDate = dayjs(date).format("YYYY-MM-DD");
    const user = getUserCookie();
    const employeeId = user?.employee?.employee_id;

    const [activeTab, setActiveTab] = useState<string | null>(
      "personal",
    );

    const { query } = Networks(BASE_PROXY.social);
    const {
      data: fetchedPersonalData,
      isLoading: isLoadingPersonal,
    } = query(
      SOCIAL_ENDPOINT.GET.agendaPersonal,
      ["agendaPersonal", date],
      {
        enabled: activeTab === "personal",
      },
      {
        params: {
          start_date: paramDate,
          end_date: paramDate,
        },
      },
    );
    const {
      data: fetchedCommunityData,
      isLoading: isLoadingCommunity,
    } = query(
      SOCIAL_ENDPOINT.GET.agendaCommunity,
      ["agendaCommunity", date],
      {
        enabled: activeTab === "community",
      },
      {
        params: {
          start_date: paramDate,
          end_date: paramDate,
        },
      },
    );

    const dataPersonal: PersonalAgenda[] = fetchedPersonalData;
    const dataCommunity: CommunityAgenda[] = fetchedCommunityData;

    return (
      <SectionModalTemplate
        title={dayjs(date).format("dddd, D MMMM YYYY")}
        isOpen={modal.visible}
        withCloseButton
        handleClose={() => closeNiceModal(modalId)}
        width="70vw"
        height="60vh"
        withFooter={false}
      >
        <div className="flex flex-col gap-5 p-5">
          <Tabs
            variant="pills"
            value={activeTab}
            onChange={setActiveTab}
          >
            <Tabs.List>
              <Tabs.Tab value="personal">
                <Group align="center" gap="xs">
                  <Indicator zIndex={1} size={6} />
                  <p>Agenda Pribadi</p>
                </Group>
              </Tabs.Tab>
              <Tabs.Tab value="community">
                <Group align="center" gap="xs">
                  <Indicator zIndex={1} size={6} color="red" />
                  <p>Agenda Komunitas</p>
                </Group>
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>

          <section className="flex flex-col gap-4">
            {(() => {
              if (isLoadingCommunity || isLoadingPersonal) {
                return <Loader className="mx-auto my-10" />;
              }

              if (activeTab === "personal" && dataPersonal?.length) {
                return dataPersonal.map((item) => (
                  <AgendaCard
                    key={`personal-agenda-${item.personal_agenda_id}`}
                    agendaId={item?.personal_agenda_id}
                    title={item?.title}
                    description={item?.description}
                    startDate={item?.start_date}
                    endDate={item?.end_date}
                    type={item?.type}
                    location={
                      item?.type === "Online"
                        ? item?.online_url || ""
                        : item?.offline_location || ""
                    }
                    creatorEmpId={item?.creator_social_employee_id}
                    guests={[
                      {
                        employee_id: item?.creator_social_employee_id,
                        social_employee_profile_id:
                          item?.creator_social_employee_profile_id,
                        employee_number:
                          item?.creator_employee_number || "",
                        name: item?.creator_name,
                      },
                      ...(item?.guests || []),
                    ]}
                    canEdit={
                      employeeId === item?.creator_social_employee_id
                    }
                  />
                ));
              }

              if (
                activeTab === "community" &&
                dataCommunity?.length
              ) {
                return dataCommunity.map((item) => {
                  const guests = (() => {
                    let result: AgendaGuest[] = [];
                    if (item?.speaker?.length) {
                      result = [...item.speaker];
                    }
                    return result;
                  })();
                  return (
                    <AgendaCard
                      key={`community-agenda-${item.agenda_id}`}
                      title={item?.title}
                      communityName={item?.cop_name}
                      description={item?.description}
                      startDate={item?.start_date}
                      endDate={item?.end_date}
                      type={uppercaseFirstLetterEveryWord(
                        item?.type || "",
                      )}
                      location={
                        item?.type === "ONLINE"
                          ? item?.online_url || ""
                          : `${item?.offline_location?.name}, ${item?.offline_location?.address}` ||
                            ""
                      }
                      guests={guests}
                      imageUrl={item?.bg_pic}
                      href={`${import.meta.env.VITE_KMS_URL}/communities/${item?.cop_id}/${item?.agenda_id}${item?.is_coi ? "?is-coi=1" : ""}`}
                    />
                  );
                });
              }

              return <NoItems label="Agenda tidak ditemukan" />;
            })()}
          </section>
        </div>
      </SectionModalTemplate>
    );
  },
);
export default ModalDetailCalendar;
