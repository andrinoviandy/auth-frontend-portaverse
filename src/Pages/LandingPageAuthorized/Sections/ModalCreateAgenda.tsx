/* eslint-disable react/jsx-props-no-spreading */
import { VALIDATION_REGEX } from "@constants";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  ActionIcon,
  Button,
  Group,
  Loader,
  Radio,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import {
  DatePickerInput,
  DateValue,
  TimeInput,
} from "@mantine/dates";
import { useForm, yupResolver } from "@mantine/form";
import { useDebouncedValue } from "@mantine/hooks";
import dayjs from "dayjs";
import { ComponentType, useMemo, useRef, useState } from "react";
import { InfiniteData, useQueryClient } from "react-query";
import * as yup from "yup";

import { AgendaGuest } from "./index.types";
import { EmployeeOptions, EmployeesResponse } from "../index.types";
import SMEIcon from "../../../Components/Assets/Icon/SME";
import PersonCard from "../../../Components/Cards/PersonCard";
import MultiSelect from "../../../Components/Inputs/MultiSelect";
import MODAL_IDS from "../../../Components/Modals/modalIds";
import SectionModalTemplate from "../../../Components/Modals/Templates/SectionModal";
import {
  BASE_PROXY,
  EMPLOYEES_ENDPOINT,
  SOCIAL_ENDPOINT,
} from "../../../Networks/endpoint";
import { Networks } from "../../../Networks/factory";
import closeNiceModal from "../../../Utils/Helpers/closeNiceModal";
import combineDateAndTime from "../../../Utils/Helpers/combineDateAndTime";
import useInfiniteQuery from "../../../Utils/Hooks/useInfiniteQuery";

const PAGE_SIZE = 10;

export interface AgendaData {
  title: string;
  /** Date formatted in ISO String */
  start_date: string;
  /** Date formatted in ISO String */
  end_date: string;
  guests: AgendaGuest[];
  type: string;
  offline_location: string | null;
  online_url: string | null;
  description: string;
}

interface FormValues {
  title: string;
  date: Date | null;
  start_time: string;
  end_time: string;
  employee_ids: string[];
  type: string | null;
  offline_location: string;
  online_url: string;
  description: string;
}

interface ModalCreateAgendaProps {
  isEdit?: boolean;
  personalAgendaId?: number;
  agendaData?: AgendaData;
}
const ModalCreateAgenda = NiceModal.create(
  ({
    isEdit,
    personalAgendaId,
    agendaData,
  }: ModalCreateAgendaProps) => {
    const modalId = MODAL_IDS.CALENDAR.CREATE_AGENDA;
    const modal = useModal(modalId);

    const dateInputRef = useRef<HTMLButtonElement>(null);
    const timeStartInputRef = useRef<HTMLInputElement>(null);
    const timeEndInputRef = useRef<HTMLInputElement>(null);

    const form = useForm<FormValues>({
      initialValues: {
        title: agendaData?.title || "",
        date: agendaData?.start_date
          ? dayjs(agendaData.start_date).startOf("day").toDate()
          : null,
        start_time: agendaData?.start_date
          ? dayjs(agendaData.start_date).format("HH:mm")
          : "",
        end_time: agendaData?.end_date
          ? dayjs(agendaData.end_date).format("HH:mm")
          : "",
        employee_ids:
          agendaData?.guests?.map((g) => `${g?.employee_id}`) || [],
        type: agendaData?.type || null,
        offline_location: agendaData?.offline_location || "",
        online_url: agendaData?.online_url || "",
        description: agendaData?.description || "",
      },
      validate: yupResolver(
        yup.object().shape({
          title: yup.string().required("Field tidak boleh kosong"),
          date: yup.date().required("Field tidak boleh kosong"),
          start_time: yup
            .string()
            .required("Field tidak boleh kosong"),
          end_time: yup.string().required("Field tidak boleh kosong"),
          employee_ids: yup
            .array(yup.string())
            .required("Field tidak boleh kosong"),
          type: yup.string().required("Field tidak boleh kosong"),
          offline_location: yup.string().when("type", {
            is: "Offline",
            then: yup.string().required("Field tidak boleh kosong"),
          }),
          online_url: yup.string().when("type", {
            is: "Online",
            then: yup
              .string()
              .matches(VALIDATION_REGEX.url, "Format URL tidak valid")
              .required("Field tidak boleh kosong"),
          }),
          description: yup
            .string()
            .required("Field tidak boleh kosong"),
        }),
      ),
    });

    const [searchEmployee, setSearchEmployee] = useState("");
    const [dbcSearchEmployee] = useDebouncedValue(
      searchEmployee,
      500,
    );

    const { infiniteQuery } = Networks(BASE_PROXY.employees);
    const { mutation } = Networks(BASE_PROXY.social);

    const { mutate: mutateDelete, isLoading: isLoadingDelete } =
      mutation("delete");
    const { mutate: mutatePost, isLoading: isLoadingPost } =
      mutation("post");
    const { mutate: mutatePut, isLoading: isLoadingPut } =
      mutation("put");

    const {
      ref: refEmployees,
      isLoading: isLoadingEmployees,
      isFetchingNextPage: isFetchingNextEmployees,
      ...restQuery
    } = useInfiniteQuery(
      infiniteQuery(
        EMPLOYEES_ENDPOINT.GET.allEmployees,
        ["allEmployees-agenda", dbcSearchEmployee],
        {
          getNextPageParam: (lastPage, allPages) => {
            const maxPages = lastPage.data.totalAccount / PAGE_SIZE;
            const nextPage = allPages.length + 1;
            return nextPage <= Math.ceil(maxPages)
              ? nextPage
              : undefined;
          },
          select: (res: InfiniteData<EmployeesResponse>) =>
            res.pages
              .map((page) =>
                page.employees.map((item) => ({
                  label: item?.name || "",
                  value: `${item.id}`,
                  // Fields below will be used for PersonCard component props
                  name: item?.name,
                  positionName: item?.employee_number,
                  imageUrl: item?.profile_picture,
                  badgeIcon: item?.sme ? <SMEIcon size={12} /> : null,
                })),
              )
              .flat() as EmployeeOptions,
        },
        {
          params: {
            size: PAGE_SIZE,
            query: dbcSearchEmployee,
            "without-me": 1,
          },
        },
      ),
    );

    const dataEmployees = restQuery.data;

    const optionsEmployee = useMemo(() => {
      let result: EmployeeOptions = [];
      if (dataEmployees?.length) {
        result = [...dataEmployees];
      }
      if (agendaData?.guests?.length) {
        const mapped = agendaData.guests.map((g) => ({
          value: `${g?.employee_id}`,
          label: `${g?.name}`,
          // Fields below will be used for PersonCard component props
          name: g?.name,
          positionName: g?.employee_number,
          imageUrl: g?.profile_picture,
          badgeIcon: g?.is_sme ? <SMEIcon size={12} /> : null,
        })) as EmployeeOptions;
        result = [...mapped, ...result];
      }
      return result;
    }, [dataEmployees, agendaData]);

    const queryClient = useQueryClient();

    const handleSuccessMutate = () => {
      closeNiceModal(modalId).then(() => {
        queryClient.invalidateQueries(["agendaPersonal"]);
        queryClient.invalidateQueries(["agendaCommunity"]);
        queryClient.invalidateQueries(["myAgendaListCalendar"]);
      });
    };

    const getReqBody = () => {
      return {
        name: form.values.title,
        invited_social_employee_profile_id:
          form.values.employee_ids.map((id) => +id),
        start_date: combineDateAndTime(
          form.values.date!,
          form.values.start_time,
        ),
        end_date: combineDateAndTime(
          form.values.date!,
          form.values.end_time,
        ),
        type: form.values.type,
        location:
          form.values.type === "Online"
            ? form.values.online_url
            : form.values.offline_location,
        description: form.values.description,
      };
    };

    const handleCreate = () => {
      mutatePost(
        {
          endpoint: SOCIAL_ENDPOINT.POST.agendaPersonal,
          data: getReqBody(),
        },
        { onSuccess: handleSuccessMutate },
      );
    };

    const showEditConfirmation = () => {
      const handleEdit = () => {
        mutatePut(
          {
            endpoint:
              SOCIAL_ENDPOINT.PUT.agendaPersonal(personalAgendaId),
            data: getReqBody(),
          },
          { onSuccess: handleSuccessMutate },
        );
      };

      NiceModal.show(MODAL_IDS.GENERAL.CONFIRMATION, {
        message: "Konfirmasi",
        subMessage:
          "Apakah Anda yakin untuk menyimpan perubahan agenda ini?",
        variant: "warning",
        handleConfirm: () =>
          closeNiceModal(MODAL_IDS.GENERAL.CONFIRMATION).then(
            handleEdit,
          ),
      });
    };

    const showDeleteConfirmation = () => {
      const handleDelete = () => {
        mutateDelete(
          {
            endpoint:
              SOCIAL_ENDPOINT.DELETE.agendaPersonal(personalAgendaId),
          },
          { onSuccess: handleSuccessMutate },
        );
      };

      NiceModal.show(MODAL_IDS.GENERAL.CONFIRMATION, {
        message: "Konfirmasi",
        subMessage: "Apakah Anda yakin untuk menghapus agenda ini?",
        variant: "danger",
        handleConfirm: () =>
          closeNiceModal(MODAL_IDS.GENERAL.CONFIRMATION).then(
            handleDelete,
          ),
      });
    };

    const minTime = useMemo(() => {
      const currDate = dayjs().date();
      const selectedDate = dayjs(form.values.date).date();
      if (currDate === selectedDate) {
        return dayjs().format("HH:mm");
      }
      return undefined;
    }, [form.values.date]);

    const handleChangeDate = (value: DateValue) => {
      const currDate = dayjs().date();
      const selectedDate = dayjs(value).date();
      const currTime = dayjs().unix();
      const selectedStartTime = dayjs(
        combineDateAndTime(value!, form.values.start_time),
      ).unix();
      const selectedEndTime = dayjs(
        combineDateAndTime(value!, form.values.end_time),
      ).unix();

      if (currDate === selectedDate && selectedStartTime < currTime) {
        form.setFieldValue("start_time", dayjs().format("HH:mm"));
      }

      if (currDate === selectedDate && selectedEndTime < currTime) {
        form.setFieldValue(
          "end_time",
          dayjs().add(1, "minute").format("HH:mm"),
        );
      }

      form.setFieldValue("date", value);
    };

    return (
      <SectionModalTemplate
        title={isEdit ? "Ubah Agenda" : "Buat Agenda"}
        isOpen={modal.visible}
        withCloseButton
        handleClose={() => closeNiceModal(modalId)}
        width="70vw"
        height="60vh"
        withFooter
        footerElement={
          <Group justify="space-between" className="w-full">
            <Button
              variant="outline"
              onClick={() => closeNiceModal(modalId)}
              disabled={
                isLoadingPost || isLoadingPut || isLoadingDelete
              }
            >
              Kembali
            </Button>

            <Group>
              {isEdit && (
                <Button
                  variant="outline"
                  color="red"
                  onClick={showDeleteConfirmation}
                  loading={isLoadingDelete}
                  disabled={isLoadingPost || isLoadingPut}
                >
                  Hapus Agenda
                </Button>
              )}
              <Button
                onClick={isEdit ? showEditConfirmation : handleCreate}
                disabled={
                  !form.isValid() ||
                  !form.isDirty() ||
                  isLoadingDelete
                }
                loading={isLoadingPost || isLoadingPut}
              >
                {isEdit ? "Simpan Perubahan" : "Buat Agenda"}
              </Button>
            </Group>
          </Group>
        }
      >
        <div className="flex flex-col gap-5 p-5">
          <TextInput
            label="Nama Agenda"
            placeholder="Masukkan nama agenda"
            required
            {...form.getInputProps("title")}
          />

          <div className="grid grid-cols-3 gap-3">
            <DatePickerInput
              ref={dateInputRef}
              label="Tanggal Mulai"
              placeholder="Pilih Tanggal Mulai"
              required
              minDate={new Date()}
              rightSection={
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  onClick={() => dateInputRef.current?.click()}
                >
                  <Icon icon="ic:round-date-range" />
                </ActionIcon>
              }
              {...form.getInputProps("date")}
              onChange={handleChangeDate}
            />
            <TimeInput
              ref={timeStartInputRef}
              label="Waktu Mulai"
              placeholder="Pilih Waktu Mulai"
              required
              minTime={minTime}
              maxTime={form.values.end_time || undefined}
              rightSection={
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  onClick={() =>
                    timeStartInputRef.current?.showPicker()
                  }
                >
                  <Icon icon="mdi:clock-outline" />
                </ActionIcon>
              }
              {...form.getInputProps("start_time")}
            />
            <TimeInput
              ref={timeEndInputRef}
              label="Waktu Selesai"
              placeholder="Pilih Waktu Selesai"
              required
              minTime={form.values.start_time || minTime}
              rightSection={
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  onClick={() =>
                    timeEndInputRef.current?.showPicker()
                  }
                >
                  <Icon icon="mdi:clock-outline" />
                </ActionIcon>
              }
              {...form.getInputProps("end_time")}
            />
          </div>

          <MultiSelect
            label="Nama Pekerja"
            placeholder="Cari nama pekerja"
            classNames={{ label: "text-primary-main mb-1" }}
            leftSection={<Icon icon="ic:twotone-search" />}
            rightSection={
              isLoadingEmployees || isFetchingNextEmployees ? (
                <Loader size="xs" />
              ) : (
                <div />
              )
            }
            renderValueOutside
            inputWrapperOrder={[
              "label",
              "input",
              "description",
              "error",
            ]}
            searchable
            searchValue={searchEmployee}
            onSearchChange={setSearchEmployee}
            data={optionsEmployee || []}
            scrollAreaProps={{ viewportRef: refEmployees }}
            valueComponent={PersonCard as ComponentType}
            valueComponentProps={{
              withRemoveButton: true,
              classNames: { textWrapper: "w-[125px]" },
            }}
            {...form.getInputProps("employee_ids")}
          />

          <Radio.Group
            label="Tipe Agenda"
            required
            {...form.getInputProps("type")}
          >
            <Stack gap="xs" mt="xs">
              <Radio value="Offline" label="Offline" />
              {form.values.type === "Offline" && (
                <TextInput
                  placeholder="Masukkan lokasi agenda"
                  {...form.getInputProps("offline_location")}
                />
              )}

              <Radio value="Online" label="Online" />
              {form.values.type === "Online" && (
                <TextInput
                  placeholder="Masukkan tautan lokasi agenda"
                  {...form.getInputProps("online_url")}
                />
              )}
            </Stack>
          </Radio.Group>

          <Textarea
            label="Deskripsi Agenda"
            placeholder="Masukkan deskripsi agenda..."
            required
            resize="vertical"
            minRows={5}
            {...form.getInputProps("description")}
          />
        </div>
      </SectionModalTemplate>
    );
  },
);
export default ModalCreateAgenda;
