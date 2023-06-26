/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Icon } from "@iconify/react";
import {
  Button,
  Checkbox,
  Loader,
  Menu,
  Select,
} from "@mantine/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import parse from "html-react-parser";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useQueryClient } from "react-query";
import { useForm } from "@mantine/form";
import {
  BASE_PROXY,
  NOTIFICATION_ENDPOINT,
} from "../../Networks/endpoint";
import { Networks } from "../../Networks/factory";
import useOnScrollFetch from "../../Utils/Hooks/useOnScrollFetch";
import ChipCarousel from "../CustomInputs/ChipCarousel";
import { getClearableProps } from "../CustomInputs/CustomMantine/ClearSearchTextInputMantine";
import { useNavigate } from "react-router-dom";

dayjs.locale("id");
dayjs.extend(relativeTime);

const listStatus = [
  { label: "Semua", value: "all" },
  { label: "Telah Dibaca", value: "read" },
  {
    label: "Belum Dibaca",
    value: "not_read",
  },
];

function NotificationSection({ origin, tab, unreadCount }) {
  const queryClient = useQueryClient();
  const [module, setModule] = useState(null);
  const ref = useRef();

  const notificationService = Networks(BASE_PROXY.notifications);

  const { data: dataModules } = notificationService.query(
    NOTIFICATION_ENDPOINT.GET.notificationModules,
    [`notificationModules${origin}`],
    {
      select: (response) =>
        response?.modules?.map((item) => ({
          value: item,
          label: item,
        })),
      enabled: origin === tab,
    },
    {
      params: {
        origin,
      },
    },
  );

  const {
    data: notifications,
    status,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = notificationService.infiniteQuery(
    NOTIFICATION_ENDPOINT.GET.notifications,
    [`notifications${origin}`, module],
    {
      getNextPageParam: (lastPage, allPages) => {
        const maxPages = lastPage.totalPage;
        const nextPage = allPages.length + 1;
        return nextPage <= Math.ceil(maxPages) ? nextPage : undefined;
      },
      select: (res) => ({
        totalPage: res?.pages?.[0]?.totalPage,
        pageParams: res?.pageParams,
        totalParticipant: res?.pages?.[0]?.notifications,
        items: res?.pages
          ?.map((page) => page.notifications.map((item) => item))
          .flat(),
      }),
      enabled: origin === tab,
    },
    {
      params: {
        page: 1,
        size: 10,
        origin,
        module,
      },
    },
  );

  const { mutate: put } = notificationService.mutation("put", {});
  const { mutate: deleteMutate } = notificationService.mutation(
    "delete",
    {},
  );

  useOnScrollFetch(hasNextPage, fetchNextPage, ref);
  const form = useForm({
    initialValues: {
      checkAll: false,
      type: "all",
      status: null,
      checkbox: {},
    },
    validate: {},
  });

  const initialState = useMemo(() => {
    const field = {
      ...form.values,
    };
    const validate = {};
    notifications?.items?.forEach((v) => {
      if (!field.checkbox?.[`notif_${v.notification_id}`]) {
        field.checkbox[`notif_${v.notification_id}`] = false;
        console.log("ngisi");
      }
    });

    return {
      initialValues: field,
      validate,
    };
  }, [notifications]);

  useEffect(() => {
    form.setValues(initialState.initialValues);
  }, [initialState]);

  console.log(notifications?.items);
  console.log(form?.values);

  const urlLookup = (type, id, data) => {
    const lookupObj = {
      COMMUNITY_ADD_COREMEMBER: `${
        import.meta.env.VITE_KMS_URL
      }/communities/${id}`,
      COMMUNITY_AGENDA_ADD_COMITEE: `${
        import.meta.env.VITE_KMS_URL
      }/communities/${id}/${data || id}`,
      COMMUNITY_AGENDA_ADD_NOTETAKER: `${
        import.meta.env.VITE_KMS_URL
      }/communities/${id}/${data || id}`,
      COMMUNITY_AGENDA_ADD_SPEAKER: `${
        import.meta.env.VITE_KMS_URL
      }/communities/${id}/${data || id}`,
      COMMUNITY_REMINDER_AGENDA: `${
        import.meta.env.VITE_KMS_URL
      }/communities/${id}/${data || id}`,
      KMAP_ADD_COLLABORATOR_KMAP: `${
        import.meta.env.VITE_KMS_URL
      }/kmap`,
      KMAP_ADD_COLLABORATOR_KMAP_OBJECTIVE: `${
        import.meta.env.VITE_KMS_URL
      }/kmap`,
      KMAP_ADD_SME_KMAP: `${import.meta.env.VITE_KMS_URL}/kmap`,
      KMAP_COMMENT_KMAP: `${import.meta.env.VITE_KMS_URL}/kmap`,
      KMAP_COMMENT_KMAP_OBJECTIVE: `${
        import.meta.env.VITE_KMS_URL
      }/kmap`,
      REPOSITORY_ADD_COLLABORATOR: `${
        import.meta.env.VITE_KMS_URL
      }/repository`,
      SOCIAL_COMMENT_POST: `${
        import.meta.env.VITE_KMS_URL
      }/home?post=${data}`,
      SOCIAL_FOLLOW: `${
        import.meta.env.VITE_KMS_URL
      }/home/detail/${id}`,
      SOCIAL_LIKE_POST: `${
        import.meta.env.VITE_KMS_URL
      }/home?post=${data}`,
      SOCIAL_MENTION: `${
        import.meta.env.VITE_KMS_URL
      }/home?post=${data}`,
      SIGNATURE_MANAGEMENT_INVITE: `${
        import.meta.env.VITE_LMS_URL
      }/signature-management`,
      SIGNATURE_MANAGEMENT_EDIT: `${
        import.meta.env.VITE_LMS_URL
      }/signature-management`,
      SIGNATURE_MANAGEMENT_REINVITE: `${
        import.meta.env.VITE_LMS_URL
      }/signature-management`,
      COURSE_PUBLISH_COURSE: `${
        import.meta.env.VITE_LMS_URL
      }/course-pool/course/${data}/standard-information`,
      COURSE_BUY_COURSE: `${
        import.meta.env.VITE_LMS_URL
      }/dashboard/${data}`,
    };
    if (lookupObj[type]) {
      window.location.href = lookupObj[type];
    }
  };

  function MenuItem({ notification }) {
    const [isHover, setIsHover] = useState(false);
    return (
      <div
        className={`${
          notification?.is_pinned ? "border-l-4 border-primary3" : ""
        }`}
      >
        <div
          key={notification?.notification_id}
          className="border-b py-2 px-2"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <div className="flex flex-row items-start w-full gap-4 cursor-pointer">
            <div className="mt-2">
              <Checkbox
                size="sm"
                onChange={(e) => {
                  form.setFieldValue(
                    `checkbox.notif_${notification?.notification_id}`,
                    e.target.checked,
                  );
                }}
                checked={
                  form.values.checkbox?.[
                    `notif_${notification?.notification_id}`
                  ]
                }
              />
            </div>
            <div
              className={`flex flex-col gap-[2px] w-full `}
              onClick={() => {
                if (!notification?.viewed) {
                  put(
                    {
                      endpoint: NOTIFICATION_ENDPOINT.PUT.markAsRead(
                        notification?.notification_id,
                      ),
                    },
                    {
                      onSuccess: () => {
                        queryClient.invalidateQueries([
                          `notifications${origin}`,
                        ]);
                      },
                    },
                  );
                }
                urlLookup(
                  notification?.notification_topic_code,
                  notification?.send_from,
                  notification?.data,
                );
              }}
            >
              <div className="flex-row flex justify-between items-center w-full">
                <span className="font-bold text-primary3">Title</span>
                <div className="flex flex-row gap-1 ">
                  {isHover && !notification?.is_global && (
                    <>
                      <button
                        type="button"
                        className="p-0 font-normal hover:text-primary3 text-darkGrey"
                        onClick={() => {
                          if (!notification?.viewed) {
                            put(
                              {
                                endpoint:
                                  NOTIFICATION_ENDPOINT.PUT.markAsRead(
                                    notification?.notification_id,
                                  ),
                              },
                              {
                                onSuccess: () => {
                                  queryClient.invalidateQueries([
                                    `notifications${origin}`,
                                  ]);
                                },
                              },
                            );
                          }
                        }}
                      >
                        <Icon
                          icon={
                            !!notification?.viewed
                              ? "mdi-light:email-open"
                              : "mdi-light:email"
                          }
                          width={20}
                        />
                      </button>
                      <button
                        type="button"
                        className="hover:text-danger3 p-0 font-normal text-darkGrey"
                        onClick={() => {
                          if (!notification?.is_global) {
                            deleteMutate(
                              {
                                endpoint:
                                  NOTIFICATION_ENDPOINT.DELETE.deleteNotification(
                                    notification?.notification_id,
                                  ),
                              },
                              {
                                onSuccess: () => {
                                  queryClient.invalidateQueries([
                                    `notifications${origin}`,
                                  ]);
                                },
                              },
                            );
                          }
                        }}
                      >
                        <Icon icon="ph:trash" width={20} />
                      </button>
                      <button
                        type="button"
                        className="p-0 font-normal hover:text-primary3 text-darkGrey"
                        onClick={() => {
                          // if (!notification?.viewed) {
                          //   put(
                          //     {
                          //       endpoint:
                          //         NOTIFICATION_ENDPOINT.PUT.markAsRead(
                          //           notification?.notification_id,
                          //         ),
                          //     },
                          //     {
                          //       onSuccess: () => {
                          //         queryClient.invalidateQueries([
                          //           `notifications${origin}`,
                          //         ]);
                          //       },
                          //     },
                          //   );
                          // }
                          console.log("pinned");
                        }}
                      >
                        <Icon
                          icon={
                            !!notification?.is_pinned
                              ? "tabler:pin-filled"
                              : "tabler:pin"
                          }
                          width={20}
                        />
                      </button>
                    </>
                  )}
                  {!notification?.viewed && (
                    <span className="text-primary3 text-2xl">
                      &bull;
                    </span>
                  )}
                </div>
              </div>
              <span
                className={`text-text1 text-sm w-full ${
                  !isHover ? "line-clamp-2" : ""
                }`}
              >
                {notification?.message &&
                  parse(notification?.message)}
              </span>
              <div className="flex gap-1 items-center text-darkGrey text-xs">
                <Icon
                  icon="streamline:interface-time-clock-circle-clock-loading-measure-time-circle"
                  width={12}
                />
                <span>
                  {dayjs(notification?.reminder_at)?.format(
                    "DD MMMM YYYY, H:mm",
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-between">
      <div className="border-b-[1px]">
        <ChipCarousel
          data={dataModules || []}
          value={module}
          onClick={(v) => {
            setModule(v);
          }}
        />
      </div>
      <div className="flex flex-row justify-between p-2 border-b">
        <div className="flex flex-row items-center  gap-2">
          <div className="mt-2">
            <Checkbox
              size="sm"
              label="Pilih Semua"
              onChange={(e) => {
                form.setFieldValue("checkAll", e.target.checked);
                const data = {};
                notifications?.items?.forEach((v) => {
                  if (
                    Object.keys(form.values.checkbox)?.filter(
                      (key) => {
                        return form.values.checkbox[key] === true;
                      },
                    )?.length === notifications?.items?.length
                  ) {
                    data[`notif_${v?.notification_id}`] = false;
                  } else {
                    data[`notif_${v?.notification_id}`] = true;
                  }
                });
                form.setFieldValue("checkbox", data);
              }}
              checked={
                Object.keys(form.values.checkbox)?.filter((key) => {
                  return form.values.checkbox[key] === true;
                })?.length === notifications?.items?.length
              }
            />
          </div>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Icon icon="charm:chevron-down" size="20" />
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item>Tandai semua dibaca</Menu.Item>
              <Menu.Item>Tandai semua belum dibaca</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
        <div className="w-[9rem]">
          <Select
            data={listStatus}
            size="sm"
            placeholder="Status Notifikasi"
            value={form.values.status}
            onChange={(v) => {
              form.setFieldValue("status", v);
            }}
            {...getClearableProps(
              form.values.status,
              () => form.setFieldValue("status", null),
              "select",
            )}
          />
        </div>
      </div>
      <div
        className="h-[250px] overflow-auto scroll-style-2"
        ref={ref}
      >
        {(() => {
          if (status === "loading") {
            return <Loader size="sm" className="mx-auto my-3.5" />;
          }

          if (!notifications?.items) return null;

          return notifications?.items?.map((v) => {
            return <MenuItem notification={v} />;
          });
        })()}

        {status !== "loading" && isFetchingNextPage ? (
          <Loader size="sm" className="mx-auto my-3.5" />
        ) : null}
      </div>
      <div className="py-2 flex flex-row justify-center">
        <Button
          variant="white"
          className="disabled:bg-white"
          onClick={() => {
            window.location.href = `${
              import.meta.env.VITE_SSO_URL
            }/notifications`;
          }}
          disabled={!unreadCount?.all}
          type="button"
        >
          Lihat semua
        </Button>
      </div>
    </div>
  );
}

export default NotificationSection;
