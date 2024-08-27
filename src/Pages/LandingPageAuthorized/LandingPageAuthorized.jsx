import { Icon } from "@iconify/react";
import { Loader, Tabs } from "@mantine/core";
import clsx from "clsx";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import { useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "dayjs/locale/id";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Employee from "../../Components/Assets/Icon/Employee";
import KMAP from "../../Components/Assets/Icon/KMAP";
import Image1 from "../../Components/Assets/Pictures/carou1.png";
import Image2 from "../../Components/Assets/Pictures/carou2.png";
// import DashedPlayButton from "../../Components/Assets/Svg/dashed-play-button.svg";
import Analytics from "../../Components/Assets/Svg/Analytics.svg";
import SubconDashboard from "../../Components/Assets/Svg/SubconDashboard.svg";
import VendorDashboard from "../../Components/Assets/Svg/VendorDashboard.svg";
import Navbar from "../../Components/Navbar";
import NotificationPanel from "../../Components/NotificationPanel/NotificationPanel";
import {
  BASE_PROXY,
  SMARTPLAN_ENDPOINT,
} from "../../Networks/endpoint";
import { Networks } from "../../Networks/factory";
import checkSubconAccess from "../../Utils/Helpers/checkSubconAccess";
import checkVendorAccess from "../../Utils/Helpers/checkVendorAccess";
import getUserCookie from "../../Utils/Helpers/getUserCookie";
import hasRole from "../../Utils/Helpers/hasRole";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

function Card({ title, description, icon, loading }) {
  return (
    <div className="flex flex-col justify-between gap-5 rounded-md bg-bg4 p-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-base font-bold">{title}</p>
        <span className="text-primary3">{icon}</span>
      </div>
      {loading ? (
        <Loader size="sm" />
      ) : (
        <p className="text-xl font-bold text-primary3">
          {description}
        </p>
      )}
    </div>
  );
}

const CarouselImages = [Image1, Image2];

const NavButtonClassName =
  "absolute z-10 m-0 w-fit h-fit p-3 top-1/2 bottom-1/2 bg-white rounded-full after:content-none text-primary3 disabled:opacity-0";

export default function LandingPageAuthorized() {
  checkSubconAccess();
  checkVendorAccess();
  const [activeTab, setActiveTab] = useState("KMS");
  const user = getUserCookie();
  const Menus = {
    KMS: [
      {
        label: "Social Media",
        description: "Platform bersosialisasi sesama pegawai",
        route: "/home",
        icon: <Icon icon="el:home" color="#016DB2" width={25} />,
      },
      {
        label: "KMAP",
        description: "Capai target perusahaan",
        route: "/kmap",
        icon: <KMAP />,
      },
      {
        label: "Community",
        description:
          "Kumpulan komunitas untuk menemukan kegiatan dan aktivitas",
        route: "/communities",
        icon: (
          <Icon
            icon="fluent:people-community-20-filled"
            color="#016DB2"
            width={25}
          />
        ),
      },
      {
        label: "Employees",
        description:
          "Daftar para pegawai Pelindo dalam satu platform",
        route: "/employees",
        icon: <Employee />,
      },
      {
        label: "Repository",
        description:
          "Kumpulan dokumen yang dibagikan pada portaverse",
        route: "/repository",
        icon: (
          <Icon
            icon="fluent:document-28-filled"
            color="#016DB2"
            width={25}
          />
        ),
      },

      {
        label: "Ask the Expert",
        description: "Platform untuk tanya jawab sesama pegawai",
        route: "/ask-expert",
        icon: (
          <Icon
            icon="simple-icons:askubuntu"
            color="#016DB2"
            width={25}
          />
        ),
      },
    ],
    LMS: [
      {
        label: "Home",
        description: "Temukan berbagai subjek yang kamu minati",
        route: "/",
        icon: <Icon icon="el:home" color="#016DB2" width={25} />,
      },
      {
        label: "My Course",
        description:
          "Lihat proses belajar-mu dalam mempelajari sesuatu",
        route: "/dashboard",
        icon: (
          <Icon
            icon="ph:chalkboard-teacher-fill"
            color="#016DB2"
            width={25}
          />
        ),
      },
      {
        label: "Dashboard Kursus",
        route: "/course-pool/courses",
        icon: <Icon icon="clarity:blocks-group-solid" width={25} />,
        hidden: !hasRole(["CRPU", "SA", "VNDR"]),
      },
      {
        label: "Manajemen Kompetensi",
        route: "/competency-management",
        icon: (
          <Icon
            icon="material-symbols:slide-library-rounded"
            width={25}
          />
        ),
        hidden: !hasRole(["CRPU", "SA"]),
      },
      {
        label: "Manajemen Sertifikat",
        route: "/certificate-management",
        icon: <Icon icon="mingcute:certificate-2-fill" width={25} />,
        hidden: !hasRole(["CRPU", "SA"]),
      },
      {
        label: hasRole(["SBCN"])
          ? "Subcon Dashboard"
          : "Manajemen Subcon",
        route: hasRole(["SBCN"])
          ? `/subcon-management/${user?.subcon?.subcon_id}`
          : "/subcon-management",
        icon: (
          <img
            src={SubconDashboard}
            alt="analytics"
            className="size-[23px]"
          />
        ),
        hidden: !hasRole(["CRPU", "SA", "SBCN"]),
      },
      {
        label: hasRole(["VNDR"])
          ? "Vendor Dashboard"
          : "Manajemen Vendor",
        route: "/vendor-management",
        icon: (
          <img
            src={VendorDashboard}
            alt="analytics"
            className="size-[21px]"
          />
        ),
        hidden: !hasRole(["CRPU", "SA", "VNDR"]),
      },
      {
        label: "Analytics",
        route: "/analytics",
        icon: (
          <img
            src={Analytics}
            alt="analytics"
            className="size-[23px]"
          />
        ),
        hidden: !hasRole(["CRPU", "SA"]),
      },
      {
        label: "Manajemen Wallet",
        route: "/wallet-management",
        icon: <Icon icon="uil:wallet" width={25} />,
        hidden: !hasRole(["CRPU", "SA"]),
      },
    ],
    TMS: [
      // {
      //   label: "Talent Dashboard",
      //   description:
      //     "Lihat statistik kinerja-mu dan temukan pengembangan diri",
      //   route: "/dashboard",
      //   icon: <Icon icon="bxs:dashboard" color="#016DB2" width={28} />,
      // },
      {
        label: "Assessment",
        description:
          "Nilai para atasan, rekan kerja, serta bawahan untuk membantu mengembangkan kinerja perusahaan",
        route: "/assessment",
        icon: (
          <Icon
            icon="fluent:clipboard-task-20-filled"
            color="#016DB2"
            width={30}
          />
        ),
      },
      {
        label: "Smart Plan KPI",
        description: "Tentukan target KPI divisi dan perusahaan",
        route: "/smart-plan-v2",
        icon: <p className="font-bold text-primary3">KPI</p>,
      },
      // {
      //   label: "Project Management",
      //   description:
      //     "Atur task dan pekerjaanmu untuk memenuhi target perusahaan",
      //   route: "/project-management",
      //   icon: (
      //     <Icon
      //       icon="material-symbols:view-kanban"
      //       color="#016DB2"
      //       width={30}
      //     />
      //   ),
      // },
    ],
  };

  const smartplanService = Networks(BASE_PROXY.smartplan);
  const { data: kpiScore, isLoading: isLoadingKPI } =
    smartplanService.query(
      SMARTPLAN_ENDPOINT.GET.kpiScore,
      ["kpiScore"],
      { select: (res) => res.score.toFixed(2) },
    );
  const { data: remainingDay, isLoading: isLoadingTime } =
    smartplanService.query(
      SMARTPLAN_ENDPOINT.GET.remainingTime,
      ["remainingTime"],
      {
        select: (res) =>
          res?.time_end
            ? dayjs().locale("id").to(res.time_end, true)
            : "Unknown",
      },
    );

  return (
    <div className="flex flex-col gap-5 pb-10">
      <Navbar />
      <section className="mt-10 px-[5vw]">
        <div className="flex items-start justify-between gap-10">
          <div className="flex flex-col justify-between gap-5 text-2xl font-bold">
            <div className="text-3xl">
              <p>
                <span className="text-primary3">Portaverse</span>
                &nbsp;as the universe
              </p>
              <p>of growth and agility</p>
            </div>
            {/* <Button
              variant="outline"
              radius="xl"
              size="lg"
              classNames={{ root: "pl-1.5 w-fit" }}
              leftIcon={
                <img
                  src={DashedPlayButton}
                  alt="play"
                  className="h-[40px]"
                />
              }
            >
              Ikuti Daily Quiz!
            </Button> */}

            <div className="mt-[2.5vh] rounded-md bg-bg2 p-5">
              <h3 className="mb-3 font-bold">Statistik</h3>
              <div className="flex items-center gap-3">
                {/* <Card
                  title="Learning Hours"
                  icon={<Icon icon="ic:round-access-time-filled" />}
                  description="120 Hours"
                />
                <Card
                  title="Portaverse Points"
                  icon={
                    <Icon icon="material-symbols:leaderboard-rounded" />
                  }
                  description="80 Points"
                /> */}
                <Card
                  title="Skor KPI"
                  icon={<Icon icon="carbon:summary-kpi" />}
                  description={kpiScore || 0}
                  loading={isLoadingKPI}
                />
                <Card
                  title="Sisa Waktu"
                  icon={<Icon icon="mdi:timer-sand" />}
                  description={remainingDay}
                  loading={isLoadingTime}
                />
              </div>
            </div>
          </div>
          <NotificationPanel classNames={{ root: "w-[45%]" }} />
        </div>
        <div className="flex justify-between gap-5" />
      </section>
      <section className="flex items-start justify-between gap-14 px-[5vw] py-10">
        <div className="w-1/2">
          <Tabs
            value={activeTab}
            onChange={setActiveTab}
            variant="pills"
            classNames={{ tabsList: "gap-3" }}
          >
            <Tabs.List>
              <Tabs.Tab value="KMS">KMS</Tabs.Tab>
              <Tabs.Tab value="LMS">LMS</Tabs.Tab>
              <Tabs.Tab value="TMS">TMS</Tabs.Tab>
            </Tabs.List>
          </Tabs>

          <div className="mt-5 grid grid-cols-2 gap-8">
            {!Menus[activeTab].length ? (
              <p className="text-darkGrey">No menu available yet</p>
            ) : (
              Menus[activeTab].map((menu) => (
                <a
                  key={menu.label}
                  href={`${import.meta.env[`VITE_${activeTab}_URL`]}${
                    menu.route
                  }`}
                  className={clsx(
                    "flex flex-col",
                    menu?.hidden && "hidden",
                  )}
                >
                  <div className="mb-2 flex size-14 items-center justify-center rounded-md bg-bg2 text-primary3">
                    {menu.icon}
                  </div>
                  <h3 className="text-lg font-bold">{menu.label}</h3>
                  <p className="text-sm">{menu.description}</p>
                </a>
              ))
            )}
          </div>
        </div>
        <div className="relative mt-10 w-1/2 items-center justify-between">
          <button
            id="landing-button-prev"
            type="button"
            className={`${NavButtonClassName} left-2`}
          >
            <Icon icon="ooui:previous-ltr" width={15} />
          </button>
          <Swiper
            slidesPerView={1}
            navigation={{
              prevEl: `#landing-button-prev`,
              nextEl: `#landing-button-next`,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop
            pagination={{ clickable: true }}
            modules={[Pagination, Navigation, Autoplay]}
            className="rounded-md"
          >
            {CarouselImages.map((img, i) => (
              <SwiperSlide
                className="flex w-full justify-center"
                key={i}
              >
                <img
                  className="h-[40vh] w-full cursor-pointer rounded-t-md object-cover"
                  src={img}
                  alt={`slide-${i}`}
                  loading="lazy"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            id="landing-button-next"
            type="button"
            className={`${NavButtonClassName} right-2`}
          >
            <Icon icon="ooui:previous-rtl" width={15} />
          </button>
        </div>
      </section>
    </div>
  );
}
