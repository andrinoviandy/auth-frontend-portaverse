import { Icon } from "@iconify/react";
import { Button } from "@mantine/core";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SMEIcon from "../../../Components/Assets/Icon/SME";
import SplashArt from "../../../Components/Assets/Pictures/Kapal_Pelindo.gif";
import YearlyReportIllust from "../../../Components/Assets/Pictures/YearlyReport.png";
import Wave from "../../../Components/Assets/Svg/wave-half.svg";
import NewNotificationPanel from "../../../Components/NotificationPanel/NewNotificationPanel";
import ProfilePictureWithBadge from "../../../Components/ProfilePictureWithBadge/ProfilePictureWithBadge";
import {
  BASE_PROXY,
  SMARTPLAN_ENDPOINT,
} from "../../../Networks/endpoint";
import { Networks } from "../../../Networks/factory";
import getUserCookie from "../../../Utils/Helpers/getUserCookie";
import hasRole from "../../../Utils/Helpers/hasRole";
import uppercaseFirstLetterEveryWord from "../../../Utils/Helpers/uppercaseFirstLetterEveryWord";

export default function SectionHero() {
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
    <section className="relative mt-10 pb-10">
      {/* Banner */}
      {bannerData?.hasYearlyReportBanner && (
        <div className="relative h-[190px] flex flex-col justify-between gap-5 p-5 bg-white rounded-md border mx-[5rem]">
          <div className="flex flex-col gap-1">
            <p className="font-bold text-2xl font-tertiary">
              Ingin tahu hasil akhir laporan evaluasi tahunan anda?
            </p>
            <p className="text-sm">
              Klik tombol di bawah untuk melihat laporan evaluasi
              tahunan Anda.
            </p>
          </div>
          <Link to="/progress-eval-report">
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

          <img
            src={YearlyReportIllust}
            alt="illust"
            className="absolute h-[190px] right-0 bottom-0 rounded-r-md"
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-8 py-10 px-[5rem]">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-2xl">
              Selamat Datang Kembali,{" "}
              <span className="text-primary3">
                {uppercaseFirstLetterEveryWord(
                  (name || "Unknown").trim(),
                )}
              </span>
              !
            </h2>
            <p className="text-darkGrey text-lg">
              Menghubungkan BUMN 1 Pelabuhan Bersama Portaverse
            </p>
          </div>
          <img
            src={SplashArt}
            alt="splash-art"
            className="w-[75%] my-auto"
          />
          {/* <div className="grid grid-cols-5 items-start gap-4" /> */}
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex gap-8 items-start border p-6 rounded-md">
            <ProfilePictureWithBadge
              img={userSocmed?.profilePicture || avatar}
              alt="avatar"
              className="w-[96px] h-[96px] rounded-full border shrink-0"
              badgeIcon={hasRole(["SME"]) ? <SMEIcon /> : null}
            />
            <div className="flex flex-col text">
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
          <NewNotificationPanel />
        </div>
      </div>
      <img src={Wave} alt="wave" className="absolute -bottom-1" />
    </section>
  );
}
