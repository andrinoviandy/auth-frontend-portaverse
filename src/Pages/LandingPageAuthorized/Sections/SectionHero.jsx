/* eslint-disable react/function-component-definition */
import { Icon } from "@iconify/react";
import { Button, Tabs, Text } from "@mantine/core";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import PanelCalendar from "./PanelCalendar";
import PanelNotification from "./PanelNotification";
import SMEIcon from "../../../Components/Assets/Icon/SME";
import SplashArt from "../../../Components/Assets/Pictures/Kapal_Pelindo.gif";
import YearlyReportIllust from "../../../Components/Assets/Pictures/YearlyReport.png";
import MyProfileBumnIllust from "../../../Components/Assets/Pictures/MyProfileBumn.png";
import CommitmentLetterIllust from "../../../Components/Assets/Pictures/Commitment_Letter.png";
import IDPIllust from "../../../Components/Assets/Pictures/Pengisian_IDP.png";
import EventTalentIllust from "../../../Components/Assets/Pictures/Pengisian_Event_Talent.png";
import Wave from "../../../Components/Assets/Svg/wave-half.svg";
import ProfilePicture from "../../../Components/ProfilePicture";
import {
  BASE_PROXY,
  DEVELOPMENT_PLAN_ENDPOINT,
  EMPLOYEES_ENDPOINT,
  IDP_ENDPOINT,
  SMARTPLAN_ENDPOINT,
} from "../../../Networks/endpoint";
import { Networks } from "../../../Networks/factory";
import getUserCookie from "../../../Utils/Helpers/getUserCookie";
import hasRole from "../../../Utils/Helpers/hasRole";
import uppercaseFirstLetterEveryWord from "../../../Utils/Helpers/uppercaseFirstLetterEveryWord";
import useCountdown from "../../../Utils/Hooks/useCountDown";
import { MacaPositionSentStatusFetcher } from "../../../Components/EventTalent/MacaSentStatusFetcher";
import showErrorDialog from "../../../Utils/Helpers/showErrorDialog";
import { useGetSentStatus } from "../../../Utils/Hooks/use-get-sent-status";

// * smiley face :D glhf
function BannerCard({
  eventTalentData,
  positions,
  setMacaSentStatus,
  idpCourseIds,
  imageUrl = "https://via.placeholder.com/300",
  heroPage,
  totalHeroPage,
  setHeroPage,
  type,
  ecaSentStatus,
  sucaSentStatus,
  hasSentAllMaca,
  employeeNumber,
  setNotifs,
}) {
  const getMissingAspirations = ({
    ecaSentStatus,
    sucaSentStatus,
    hasSentAllMaca,
    isAgree,
    isStruktural,
    idpCourseIds,
    isEligible = false,
  }) => {
    const ecaNotSent = ecaSentStatus !== "SENT";
    const sucaNotSent = sucaSentStatus !== "SENT";
    const macaNotSent = !hasSentAllMaca;
    const idpNotSent = idpCourseIds.length === 0;

    const missing = [];

    if (
      isAgree &&
      isEligible &&
      ecaNotSent &&
      !missing.includes("ECA")
    )
      missing.push("ECA");
    if (isStruktural && macaNotSent) missing.push("MACA");
    if (isStruktural && sucaNotSent) missing.push("SUCA");
    if (isAgree && isEligible && !ecaNotSent && idpNotSent)
      missing.push("IDP");

    return missing.length > 0
      ? missing.join(", ").replace(/, ([^,]*)$/, " dan $1")
      : null;
  };

  const now = useMemo(() => dayjs(), []);
  const start = useMemo(
    () => dayjs(eventTalentData?.start_date),
    [eventTalentData?.start_date],
  );
  const end = useMemo(
    () => dayjs(eventTalentData?.end_date),
    [eventTalentData?.end_date],
  );

  const isOngoing = useMemo(() => {
    return start.unix() < now.unix() && end.unix() > now.unix();
  }, [now, start, end]);

  const [days, hours, minutes, seconds] = useCountdown(
    eventTalentData?.end_date,
  );

  const isMissingOnlyIdp = useMemo(() => {
    return (
      ecaSentStatus === "SENT" &&
      sucaSentStatus === "SENT" &&
      hasSentAllMaca &&
      idpCourseIds.length === 0
    );
  }, [
    ecaSentStatus,
    sucaSentStatus,
    hasSentAllMaca,
    idpCourseIds.length,
  ]);

  const isNotFilledCommitment = useMemo(
    () => typeof eventTalentData?.is_agree !== "number",
    [eventTalentData?.is_agree],
  );

  const isStruktural = useMemo(
    () => eventTalentData?.employee_position_type === "Struktural",
    [eventTalentData?.employee_position_type],
  );

  const eligibilityStatus = useMemo(() => {
    return eventTalentData?.is_punish ||
      eventTalentData?.is_job_leave ||
      !eventTalentData?.is_under_max_age ||
      eventTalentData?.qualification_content?.event_talent_status ===
        "NOT_QUALIFIED"
      ? "NOT_ELIGIBLE"
      : "ELIGIBLE";
  }, [
    eventTalentData?.is_punish,
    eventTalentData?.is_job_leave,
    eventTalentData?.is_under_max_age,
    eventTalentData?.qualification_content?.event_talent_status,
  ]);

  const title = useMemo(() => {
    if (eligibilityStatus === "ELIGIBLE" && isNotFilledCommitment)
      return "Commitment Letter";
    if (isMissingOnlyIdp) return "Pengisian IDP";
    if (
      ecaSentStatus !== "SENT" ||
      sucaSentStatus !== "SENT" ||
      !hasSentAllMaca ||
      idpCourseIds.length === 0
    )
      return "Pengisian Aspirasi Karir";
    return "";
  }, [
    isNotFilledCommitment,
    ecaSentStatus,
    sucaSentStatus,
    hasSentAllMaca,
    isMissingOnlyIdp,
    idpCourseIds.length,
    eligibilityStatus,
  ]);

  const shouldShowWarning = useMemo(() => {
    return (
      isOngoing &&
      ((eligibilityStatus === "ELIGIBLE" &&
        typeof eventTalentData?.is_agree !== "number") ||
        (eligibilityStatus === "ELIGIBLE" &&
          ecaSentStatus !== "SENT") ||
        (isStruktural && sucaSentStatus !== "SENT") ||
        (isStruktural && !hasSentAllMaca) ||
        (eligibilityStatus === "ELIGIBLE" &&
          idpCourseIds.length === 0))
    );
  }, [
    eventTalentData?.is_agree,
    ecaSentStatus,
    sucaSentStatus,
    hasSentAllMaca,
    idpCourseIds.length,
    isOngoing,
    eligibilityStatus,
    isStruktural,
  ]);

  useEffect(() => {
    if (type === "eventTalent" && !shouldShowWarning) {
      setNotifs((prev) => {
        const t = [...prev];
        const filtered = t.filter((e) => e !== "event_talent");
        return filtered;
      });
    } else if (shouldShowWarning) {
      setNotifs((prev) => {
        const t = [...prev];
        const filtered = t.filter((e) => e !== "event_talent");
        return ["event_talent", ...filtered];
      });
    }
  }, [type, shouldShowWarning, setNotifs]);

  const imageUrlComputed = useMemo(() => {
    if (isMissingOnlyIdp) return IDPIllust;
    if (typeof eventTalentData?.is_agree !== "number")
      return CommitmentLetterIllust;
    if (
      ecaSentStatus !== "SENT" ||
      sucaSentStatus !== "SENT" ||
      !hasSentAllMaca ||
      idpCourseIds.length === 0
    )
      return EventTalentIllust;
    return imageUrl;
  }, [
    imageUrl,
    isMissingOnlyIdp,
    eventTalentData?.is_agree,
    ecaSentStatus,
    sucaSentStatus,
    hasSentAllMaca,
    idpCourseIds.length,
  ]);

  if (type === "yearlyReport") {
    return (
      <div className="bg-white p-6 rounded-md flex gap-4 items-center border border-lightGrey mx-[80px]">
        <div className="flex flex-col w-full">
          <Text className="text-primary3 font-medium text-sm">
            Evaluasi Tahunan
          </Text>
          <Text className="font-semibold text-lg mt-2">
            Ingin tahu hasil akhir laporan evaluasi tahunan anda?
          </Text>
          <Text className="text-gray-500 mt-2">
            Klik tombol di bawah untuk melihat laporan evaluasi
            tahunan Anda.
          </Text>

          <div className="flex items-center mt-4 gap-2 w-full">
            <Link to="/progress-eval-report">
              <Button
                rightIcon={
                  <Icon icon="ic:round-chevron-right" width={18} />
                }
              >
                Lihat Laporan Evaluasi Tahunan
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-4 mt-6">
            <Text className="text-darkGrey">
              <b>{heroPage}</b> dari <b>{totalHeroPage}</b> pengingat
            </Text>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setHeroPage((prev) => prev - 1)}
                disabled={heroPage === 1}
                className="text-xl"
              >
                &lsaquo;
              </Button>
              <Button
                variant="outline"
                onClick={() => setHeroPage((prev) => prev + 1)}
                disabled={heroPage === totalHeroPage}
                className="text-xl"
              >
                &rsaquo;
              </Button>
            </div>
          </div>
        </div>

        <div className="w-[352px]">
          <img
            src={imageUrl}
            alt="Yearly Report"
            className="h-[190px] rounded-r-md"
          />
        </div>
      </div>
    );
  }

  if (type === "myProfileBumn") {
    return (
      <div className="bg-white p-6 rounded-md flex gap-4 items-center border border-lightGrey mx-[80px]">
        <div className="flex flex-col w-full">
          <Text className="text-primary3 font-medium text-sm">
            CV Kementrian BUMN
          </Text>
          <Text className="font-semibold text-lg mt-2">
            Lengkapi Data Profil Anda
          </Text>
          <Text className="text-gray-500 mt-2">
            Mohon untuk melengkapi data tambahan untuk keperluan CV
            Kementrian BUMN Anda.
          </Text>

          <div className="flex items-center mt-4 gap-2 w-full">
            <Button
              onClick={() =>
                window.open(
                  `${import.meta.env.VITE_TMS_URL}/my-profile/personal-data`,
                )
              }
            >
              Buka My Profile
            </Button>
          </div>

          <div className="flex items-center gap-4 mt-6">
            <Text className="text-darkGrey">
              <b>{heroPage}</b> dari <b>{totalHeroPage}</b> pengingat
            </Text>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setHeroPage((prev) => prev - 1)}
                disabled={heroPage === 1}
                className="text-xl"
              >
                &lsaquo;
              </Button>
              <Button
                variant="outline"
                onClick={() => setHeroPage((prev) => prev + 1)}
                disabled={heroPage === totalHeroPage}
                className="text-xl"
              >
                &rsaquo;
              </Button>
            </div>
          </div>
        </div>

        <div className="w-[352px]">
          <img
            src={imageUrl}
            alt="Yearly Report"
            className="h-[190px] rounded-r-md"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-md flex gap-4 items-center border border-lightGrey mx-[80px]">
      <div className="flex flex-col w-full">
        <div className="flex items-center gap-2 ">
          <Text className="text-primary3 font-medium text-sm">
            TMS - Event Talent
          </Text>
          {isOngoing && (
            <div className="text-primary3 text-sm flex items-center gap-1">
              {" "}
              |{" "}
              <Icon
                icon="material-symbols:timer-outline"
                width={16}
              />
              {days}D {hours}H {minutes}M {seconds}S
            </div>
          )}
        </div>
        <Text className="font-semibold text-xl mt-2">{title}</Text>
        <Text className="mt-2">
          {positions?.map((pos) => (
            <MacaPositionSentStatusFetcher
              key={pos.position_master_variant_id}
              variantId={pos.position_master_variant_id}
              setCaStatus={(sentStatus) =>
                setMacaSentStatus((prev) => ({
                  ...prev,
                  [pos.position_master_variant_id]: sentStatus,
                }))
              }
              employeeNumber={employeeNumber}
            />
          ))}

          {eligibilityStatus === "ELIGIBLE" &&
          typeof eventTalentData?.is_agree !== "number" ? (
            <div>
              Selamat! Anda dinyatakan lolos untuk mengikuti kegiatan
              Event Talent. Segera berikan tanggapan Anda melalui
              Commitment Letter.
            </div>
          ) : (
            <div>
              {isMissingOnlyIdp ? (
                "Setelah Anda menentukan aspirasi karir Anda (ECA), Anda perlu memilih pembelajaran untuk membuat IDP."
              ) : (
                <>
                  Anda belum mengisi aspirasi karir Anda (
                  {getMissingAspirations({
                    ecaSentStatus,
                    sucaSentStatus,
                    hasSentAllMaca,
                    isAgree: eventTalentData.is_agree,
                    isStruktural:
                      eventTalentData.employee_position_type ===
                      "Struktural",
                    idpCourseIds,
                    isEligible: eligibilityStatus === "ELIGIBLE",
                  })}
                  ).
                </>
              )}
            </div>
          )}
        </Text>

        <div className="flex items-center mt-4 gap-2 w-full">
          <Button
            onClick={() =>
              window.open(
                isMissingOnlyIdp
                  ? `${import.meta.env.VITE_TMS_URL}/development-plan/my-plan-development/v2/idp`
                  : `${import.meta.env.VITE_TMS_URL}/development-plan/event-talent`,
              )
            }
          >
            Buka {isMissingOnlyIdp ? "Formulir IDP" : "Event Talent"}
          </Button>
        </div>
        <div className="flex items-center gap-4 mt-6">
          <Text className="text-darkGrey">
            <b>{heroPage}</b> dari <b>{totalHeroPage}</b> pengingat
          </Text>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setHeroPage((prev) => prev - 1)}
              disabled={heroPage === 1}
              className="text-xl"
            >
              &lsaquo;
            </Button>
            <Button
              variant="outline"
              onClick={() => setHeroPage((prev) => prev + 1)}
              disabled={heroPage === totalHeroPage}
              className="text-xl"
            >
              &rsaquo;
            </Button>
          </div>
        </div>
      </div>

      <div className="w-[352px]">
        <img
          src={imageUrlComputed}
          alt="Event Talent"
          className="rounded-md w-full"
        />
      </div>
    </div>
  );
}

export default function SectionHero() {
  const [heroPage, setHeroPage] = useState(1);

  const userSocmed = useSelector((st) => st.socialMediaProfile);
  const user = getUserCookie();
  const { email } = user;
  const {
    name,
    profile_picture: avatar,
    employee_number: employeNumber,
    position_name: position,
    group,
  } = user.employee;

  const [activeTab, setActiveTab] = useState("calendar");

  const smartplanService = Networks(BASE_PROXY.smartplan);
  const { data: bannerData } = smartplanService.query(
    SMARTPLAN_ENDPOINT.GET.landingBanner,
    ["landingBanner"],
    {
      select: (res) => ({
        hasYearlyReportBanner: !!res?.result?.find(
          (item) => item?.banner_code === "YEARLY_EVALUATION",
        ),
      }),
    },
  );

  // * Start event talent banner
  const employeeNumber = getUserCookie()?.employee?.employee_number;
  const developmentPlanService = Networks(BASE_PROXY.developmentPlan);
  const { data: eventTalentData } = developmentPlanService.query(
    DEVELOPMENT_PLAN_ENDPOINT.GET.getRequiredEventTalentV2(
      employeeNumber,
    ),
    ["requiredEventTalent", "main"],
    {
      onError: (err) =>
        err?.response?.status >= 500 && showErrorDialog(err),
    },
    {},
  );

  const {
    positions,
    setMacaSentStatus,
    ecaSentStatus,
    sucaSentStatus,
    hasSentAllMaca,
  } = useGetSentStatus();
  const [idpCourseIds, setIdpCourseIds] = useState([]);

  developmentPlanService.query(
    IDP_ENDPOINT.GET.getCourseAndIdpList,
    [IDP_ENDPOINT.GET.getCourseAndIdpList, "MAIN_LAYOUT"],
    {
      onSuccess: (res) => {
        const idpCIds = [];
        res.course_idps?.forEach((course) => {
          if (course.origin !== "course") {
            idpCIds.push(course.course_id);
          }
        });
        setIdpCourseIds(idpCIds);
      },
    },
    {
      params: {
        page: 1,
        size: 1,
        course_type: null,
        type: "idp",
        employee_number: employeeNumber,
        idp_type: null,
      },
    },
  );
  // * end event talent banner

  // start banner my profile cv bumn

  const employeeService = Networks(BASE_PROXY.employees);
  const employeeId = user?.employee?.employee_id;
  const { data } = employeeService.query(
    EMPLOYEES_ENDPOINT.GET.getHasFilledCvBumn(employeeId),
    [EMPLOYEES_ENDPOINT.GET.getHasFilledCvBumn(employeeId)],
    {
      enabled: !!employeeId,
    },
    {},
  );

  const unfilledCvBumnKeys = useMemo(() => {
    if (!data) return [];

    const result = [];

    if (!data.has_filled_bidang_job_non_pelindo)
      result.push("bidang_job_non_pelindo");

    if (!data.has_filled_bidang_job_pelindo)
      result.push("bidang_job_pelindo");

    if (!data.has_filled_executive_summary)
      result.push("executive_summary");

    if (!data.has_filled_project_exposure)
      result.push("project_exposure");

    if (!data.has_filled_transformasi_inovasi)
      result.push("transformasi_inovasi");

    if (!data.has_filled_aspirasi_bumn) result.push("aspirasi_bumn");

    if (!data.has_filled_seminar_internal)
      result.push("seminar_internal");

    if (!data.has_filled_seminar_external)
      result.push("seminar_external");

    // if (!data.has_filled_education) result.push("education");

    return result;
  }, [data]);
  // end banner my profile cv bumn

  const [notifs, setNotifs] = useState([]);

  useEffect(() => {
    const notifList = [];
    if (eventTalentData) {
      const start = dayjs(eventTalentData?.start_date);
      const end = dayjs(eventTalentData?.end_date);
      const now = dayjs();

      const isOngoing =
        start.unix() < now.unix() && end.unix() > now.unix();

      if (eventTalentData && isOngoing)
        notifList.push("event_talent");
    }

    if (bannerData?.hasYearlyReportBanner) {
      notifList.push("kpi");
    }

    if (unfilledCvBumnKeys.length) {
      notifList.push("my_profile_bumn");
    }
    setNotifs(notifList);
  }, [
    eventTalentData,
    bannerData?.hasYearlyReportBanner,
    unfilledCvBumnKeys.length,
  ]);

  const totalHeroPage = useMemo(() => notifs.length, [notifs.length]);

  console.log(bannerData?.hasYearlyReportBanner, notifs, heroPage);

  return (
    <section className="relative mt-10 pb-10">
      {/* Banner */}

      {notifs.length &&
        notifs
          .filter((_, idx) => idx === heroPage - 1)
          .map((item) => (
            <>
              {item === "event_talent" && (
                <BannerCard
                  type="eventTalent"
                  eventTalentData={eventTalentData}
                  positions={positions}
                  setMacaSentStatus={setMacaSentStatus}
                  idpCourseIds={idpCourseIds}
                  heroPage={heroPage}
                  setHeroPage={setHeroPage}
                  totalHeroPage={totalHeroPage}
                  imageUrl=""
                  ecaSentStatus={ecaSentStatus?.sent_status}
                  sucaSentStatus={sucaSentStatus?.sent_status}
                  hasSentAllMaca={hasSentAllMaca}
                  employeeNumber={employeeNumber}
                  setNotifs={setNotifs}
                />
              )}

              {item === "kpi" && (
                <BannerCard
                  type="yearlyReport"
                  eventTalentData={eventTalentData}
                  positions={positions}
                  setMacaSentStatus={setMacaSentStatus}
                  idpCourseIds={idpCourseIds}
                  heroPage={heroPage}
                  setHeroPage={setHeroPage}
                  totalHeroPage={totalHeroPage}
                  imageUrl={YearlyReportIllust}
                  ecaSentStatus={ecaSentStatus?.sent_status}
                  sucaSentStatus={sucaSentStatus?.sent_status}
                  hasSentAllMaca={hasSentAllMaca}
                  employeeNumber={employeeNumber}
                  setNotifs={setNotifs}
                />
              )}

              {item === "my_profile_bumn" && (
                <BannerCard
                  type="myProfileBumn"
                  eventTalentData={eventTalentData}
                  positions={positions}
                  setMacaSentStatus={setMacaSentStatus}
                  idpCourseIds={idpCourseIds}
                  heroPage={heroPage}
                  setHeroPage={setHeroPage}
                  totalHeroPage={totalHeroPage}
                  imageUrl={MyProfileBumnIllust}
                  ecaSentStatus={ecaSentStatus?.sent_status}
                  sucaSentStatus={sucaSentStatus?.sent_status}
                  hasSentAllMaca={hasSentAllMaca}
                  employeeNumber={employeeNumber}
                  setNotifs={setNotifs}
                />
              )}
            </>
          ))}

      <div className="grid grid-cols-2 gap-8 px-20 py-10">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">
              Selamat Datang Kembali,{" "}
              <span className="text-primary3">
                {uppercaseFirstLetterEveryWord(
                  (name || "Unknown").trim(),
                )}
              </span>
              !
            </h2>
            <p className="text-lg text-darkGrey">
              Menghubungkan BUMN 1 Pelabuhan Bersama Portaverse
            </p>
          </div>
          <img
            src={SplashArt}
            alt="splash-art"
            className="my-auto w-3/4"
          />
          {/* <div className="grid grid-cols-5 items-start gap-4" /> */}
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex items-start gap-8 rounded-md border p-6">
            <ProfilePicture
              imageUrl={userSocmed?.profilePicture || avatar}
              alt="avatar"
              size={96}
              className="shrink-0 rounded-full border"
              name={name}
              badgeIcon={hasRole(["SME"]) ? <SMEIcon /> : null}
            />
            <div className="flex flex-col">
              <p className="font-semibold">
                {uppercaseFirstLetterEveryWord(name)}
              </p>
              <p className="font-semibold text-primary3">
                {employeNumber}
              </p>
              <p className="font-semibold">{position || "-"}</p>
              <p className="font-semibold">{group?.name}</p>
              <p className="font-medium text-darkGrey">
                {email?.toLowerCase()}
              </p>
            </div>
          </div>

          <div className="rounded-md border">
            <Tabs
              value={activeTab}
              onChange={setActiveTab}
              classNames={{ tab: "pt-4" }}
            >
              <Tabs.List grow>
                <Tabs.Tab value="calendar">Kalendar</Tabs.Tab>
                <Tabs.Tab value="notif">Pemberitahuan</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="calendar">
                <PanelCalendar />
              </Tabs.Panel>
              <Tabs.Panel value="notif">
                <PanelNotification />
              </Tabs.Panel>
            </Tabs>
          </div>
        </div>
      </div>
      <img src={Wave} alt="wave" className="absolute -bottom-1" />
    </section>
  );
}
