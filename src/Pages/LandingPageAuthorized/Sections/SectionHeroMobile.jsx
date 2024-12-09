import { Icon } from "@iconify/react";
import { Button, Tabs } from "@mantine/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import PanelCalendar from "./PanelCalendar";
import PanelNotification from "./PanelNotification";
import SMEIcon from "../../../Components/Assets/Icon/SME";
import SplashArt from "../../../Components/Assets/Pictures/Kapal_Pelindo.gif";
import YearlyReportIllust from "../../../Components/Assets/Pictures/YearlyReport.png";
import Wave from "../../../Components/Assets/Svg/wave-half.svg";
import ProfilePicture from "../../../Components/ProfilePicture";
import {
  BASE_PROXY,
  SMARTPLAN_ENDPOINT,
} from "../../../Networks/endpoint";
import { Networks } from "../../../Networks/factory";
import getUserCookie from "../../../Utils/Helpers/getUserCookie";
import hasRole from "../../../Utils/Helpers/hasRole";
import uppercaseFirstLetterEveryWord from "../../../Utils/Helpers/uppercaseFirstLetterEveryWord";

export default function SectionHeroMobile() {
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

  return (
    <section className="relative mt-4 pb-10">
      {/* Banner */}
      {bannerData?.hasYearlyReportBanner && (
        <div className="relative rounded-md border bg-white p-5 mx-2">
          <img
            src={YearlyReportIllust}
            alt="illust"
            className="absolute bottom-0 right-0 h-[190px] z-0 rounded-r-md"
          />
          <div className="relative space-y-2 z-10 flex flex-col gap-1">
            <p className="font-tertiary text-lg font-bold">
              Ingin tahu hasil akhir laporan evaluasi tahunan anda?
            </p>
            <p className="text-sm">
              Klik tombol di bawah untuk melihat laporan evaluasi
              tahunan Anda.
            </p>
            <Link to="/progress-eval-report" className="w-fit">
              <Button
                variant="outline"
                className="w-fit"
                size="md"
                rightIcon={
                  <Icon icon="ic:round-chevron-right" width={18} />
                }
              >
                Lihat Laporan Evaluasi Tahunan
              </Button>
            </Link>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-8 px-4 py-4">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold">
              Selamat Datang Kembali,{" "}
              <span className="text-primary3">
                {uppercaseFirstLetterEveryWord(
                  (name || "Unknown").trim(),
                )}
              </span>
              !
            </h2>
            <p className="text-sm text-darkGrey">
              Menghubungkan BUMN 1 Pelabuhan Bersama Portaverse
            </p>
          </div>
          <img
            src={SplashArt}
            alt="splash-art"
            className="my-auto mx-auto w-3/4"
          />
          {/* <div className="grid grid-cols-5 items-start gap-4" /> */}
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-8 rounded-md border p-6">
            <ProfilePicture
              imageUrl={userSocmed?.profilePicture || avatar}
              alt="avatar"
              size={40}
              className="shrink-0 rounded-full border"
              name={name}
              badgeIcon={hasRole(["SME"]) ? <SMEIcon /> : null}
            />
            <div className="flex flex-col text-sm">
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
