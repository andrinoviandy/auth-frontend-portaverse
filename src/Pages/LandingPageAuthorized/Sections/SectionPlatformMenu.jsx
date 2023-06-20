import { Icon } from "@iconify/react";
import { Tabs, clsx } from "@mantine/core";
import { useState } from "react";
// import DashedPlayButton from "../../../Components/Assets/Svg/dashed-play-button.svg";
import SubconDashboardOutline from "../../../Components/Assets/Svg/SubconDashboardOutline.svg";
import VendorDashboardOutline from "../../../Components/Assets/Svg/VendorDashboardOutline.svg";
import AoE from "../../../Components/Assets/Svg/ask.svg";
import DevelopmentPlan from "../../../Components/Assets/Svg/development-plan.svg";
import KMAPOutline from "../../../Components/Assets/Svg/kmap-outline.svg";
import PerformanceReport from "../../../Components/Assets/Svg/performance-report.svg";
import PromotionRotation from "../../../Components/Assets/Svg/promotion-rotation.svg";
import Repository from "../../../Components/Assets/Svg/repository.svg";
import { MANTINE_TAB_STYLES, color } from "../../../Utils/Constants";
import getUserCookie from "../../../Utils/Helpers/getUserCookie";

export default function SectionPlatformMenu() {
  const user = getUserCookie();
  const [activeTab, setActiveTab] = useState("KMS");
  const Menus = {
    KMS: [
      {
        label: "Home",
        description:
          "Capai target dan goals perusahaan dengan knowledge map",
        route: "/home",
        icon: (
          <Icon
            icon="octicon:home-16"
            color={color.primary3}
            width={35}
          />
        ),
      },
      {
        label: "KMAP",
        description: "Capai target perusahaan",
        route: "/kmap",
        icon: (
          <img src={KMAPOutline} alt="kmap" className="w-[40px]" />
        ),
      },
      {
        label: "Employees",
        description:
          "Daftar para pegawai Pelindo dalam satu platform",
        route: "/employees",
        icon: (
          <Icon
            icon="mdi:user-box-outline"
            color={color.primary3}
            width={40}
          />
        ),
      },
      {
        label: "Communities of Practice",
        description:
          "Kumpulan komunitas untuk menemukan berbagai kegiatan dan aktivitas",
        route: "/communities",
        icon: (
          <Icon
            icon="fluent:people-community-add-20-regular"
            color={color.primary3}
            width={40}
          />
        ),
      },
      {
        label: "Communities of Interest",
        description:
          "Kumpulan komunitas untuk menemukan berbagai kegiatan dan aktivitas",
        route: "/communities?is-coi=1",
        icon: (
          <Icon
            icon="fluent:people-community-16-regular"
            color={color.primary3}
            width={40}
          />
        ),
      },
      {
        label: "Repository",
        description:
          "Kumpulan dokumen yang dibagikan pada portaverse",
        route: "/repository",
        icon: (
          <img src={Repository} alt="repo" className="w-[26px]" />
        ),
      },
      {
        label: "Ask of Expert",
        description: "Platform untuk tanya jawab sesama pegawai",
        route: "/ask-expert",
        icon: <img src={AoE} alt="repo" className="w-[40px]" />,
      },
      {
        label: "Headquarter",
        description:
          "Lihat statistik kinerja dan pengembangan dalam perusahan",
        route: "/hq/user-mngmt",
        icon: (
          <Icon icon="ri:hq-line" color={color.primary3} width={40} />
        ),
      },
    ],
    LMS: [
      {
        label: "Home & Explore",
        description: "Temukan berbagai subjek yang kamu minati",
        route: "/",
        icon: (
          <Icon
            icon="octicon:home-16"
            color={color.primary3}
            width={35}
          />
        ),
      },
      {
        label: "Dashboard",
        description:
          "Profil pembelajaran untuk mendukung kinerja pegawai",
        route: "/dashboard",
        icon: (
          <Icon
            icon="carbon:user-avatar-filled-alt"
            color={color.primary3}
            width={40}
          />
        ),
      },
      {
        label: "Dashboard Kursus",
        description:
          "Kumpulan semua kursus yang telah dipublikasi di Portaverse",
        route: "/course-pool/courses",
        icon: (
          <Icon
            icon="clarity:blocks-group-solid"
            color={color.primary3}
            width={40}
          />
        ),
        hidden: !["CRPU", "SA", "VNDR"].includes(user?.role_code),
      },
      {
        label: "Manajemen Kompetensi",
        description:
          "Kumpulan kompetensi yang telah diklasifikasikan di Portaverse",
        route: "/competency-management",
        icon: (
          <Icon
            icon="fluent:clipboard-task-list-rtl-24-regular"
            color={color.primary3}
            width={40}
          />
        ),
        hidden: !["CRPU", "SA"].includes(user?.role_code),
      },
      {
        label: "Manajemen Sertifikat",
        description:
          "Kumpulan setifikast yang telah dibuat dan diklasifikasikan di Portaverse",
        route: "/certificate-management",
        icon: (
          <Icon
            icon="mingcute:certificate-2-line"
            color={color.primary3}
            width={40}
          />
        ),
        hidden: !["CRPU", "SA"].includes(user?.role_code),
      },
      {
        label: ["SBCN"].includes(user?.role_code)
          ? "Subcon Dashboard"
          : "Manajemen Subcon",
        description:
          "Kumpulan subcon-subcon yang tergabung di Portaverse",
        route: ["SBCN"].includes(user?.role_code)
          ? `/subcon-management/${user?.subcon?.subcon_id}`
          : "/subcon-management",
        icon: (
          <img
            src={SubconDashboardOutline}
            alt="subcon-dashboard"
            className="w-[40px]"
          />
        ),
        hidden: !["CRPU", "SA", "SBCN"].includes(user?.role_code),
      },
      {
        label: ["VNDR"].includes(user?.role_code)
          ? "Vendor Dashboard"
          : "Manajemen Vendor",
        description:
          "Kumpulan vendor-vendor yang tergabung di Portaverse",
        route: "/vendor-management",
        icon: (
          <img
            src={VendorDashboardOutline}
            alt="vendor-dashboard"
            className="w-[40px]"
          />
        ),
        hidden: !["CRPU", "SA", "VNDR"].includes(user?.role_code),
      },
      {
        label: "Analytics",
        description: "Analisis kursus-kursus yang ada di Portaverse",
        route: "/analytics",
        icon: (
          <Icon
            icon="majesticons:analytics-line"
            color={color.primary3}
            width={40}
          />
        ),
        hidden: !["CRPU", "SA"].includes(user?.role_code),
      },
      {
        label: "Manajemen Wallet",
        description:
          "Kumpulan semua wallet dan pengaturan isi wallet",
        route: "/wallet-management",
        icon: (
          <Icon
            icon="fluent:wallet-credit-card-16-regular"
            color={color.primary3}
            width={40}
          />
        ),
        hidden: !["CRPU", "SA"].includes(user?.role_code),
      },
    ],
    TMS: [
      {
        label: "Dashboard",
        description: "Profil talenta untuk mendukung kinerja pegawai",
        route: "/dashboard",
        icon: (
          <Icon
            icon="carbon:user-avatar-filled-alt"
            color={color.primary3}
            width={40}
          />
        ),
      },
      {
        label: "Smart Plan KPI",
        description: "Tentukan target KPI divisi dan perusahaan",
        route: "/smart-plan",
        icon: (
          <Icon
            icon="carbon:summary-kpi"
            color={color.primary3}
            width={40}
          />
        ),
      },
      {
        label: "Personal Assessment",
        description:
          "Nilai para atasan, rekan kerja, serta bawahan untuk membantu mengembangkan kinerja perusahaan",
        route: "/assessment",
        icon: (
          <Icon
            icon="mingcute:task-2-line"
            color={color.primary3}
            width={40}
          />
        ),
      },
      {
        label: "Manajemen Organisasi",
        description:
          "Pengelolaan struktur organisasi yang ada di perusahaan",
        route: "/organization-management/lakhar-job-sharing",
        icon: (
          <Icon
            icon="clarity:organization-line"
            color={color.primary3}
            width={40}
          />
        ),
      },
      {
        label: "Development Plan",
        description:
          "Daftar perencanaan pengembangan talenta dalam suatu perusahaan",
        route: "/development-plan/my-plan-development",
        icon: (
          <img
            src={DevelopmentPlan}
            alt="development-plan"
            className="w-[40px]"
          />
        ),
      },
      {
        label: "Manajemen Role",
        description:
          "Pengelolaan peran setiap pegawai pelindo dalam sistem Portaverse",
        route: "/role-management",
        icon: (
          <Icon
            icon="tabler:user-cog"
            color={color.primary3}
            width={40}
          />
        ),
        hidden: !["SA"].includes(user?.role_code),
      },
      {
        label: "Headquarter",
        description:
          "Sistem untuk mengatur semua module yang ada di TMS",
        route: "/headquarter/assessment/active",
        icon: (
          <Icon
            icon="mdi:view-dashboard-outline"
            color={color.primary3}
            width={40}
          />
        ),
      },
      {
        label: "Promotion & Rotation",
        description:
          "Pengembangan talenta dalam menunjang aspirasi karir pegawai",
        route: "/promotion-rotation",
        icon: (
          <img
            src={PromotionRotation}
            alt="promotion-rotation"
            className="w-[30px]"
          />
        ),
      },
      {
        label: "Performance Report",
        description:
          "Laporan hasil kinerja selama satu tahun berdasarkan penilaian atasan, rekan dan bawahan",
        route: "/performance-report",
        icon: (
          <img
            src={PerformanceReport}
            alt="performance-report"
            className="w-[30px]"
          />
        ),
      },
    ],
  };
  return (
    <section className="flex flex-col gap-10 py-16 px-[5rem]">
      <Tabs
        value={activeTab}
        onTabChange={setActiveTab}
        radius="lg"
        sx={MANTINE_TAB_STYLES.default.sx}
      >
        <Tabs.List grow>
          <Tabs.Tab
            sx={MANTINE_TAB_STYLES.default.sxChild}
            value="KMS"
          >
            KMS
          </Tabs.Tab>
          <Tabs.Tab
            sx={MANTINE_TAB_STYLES.default.sxChild}
            value="LMS"
          >
            LMS
          </Tabs.Tab>
          <Tabs.Tab
            sx={MANTINE_TAB_STYLES.default.sxChild}
            value="TMS"
          >
            TMS
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
      <div className="grid grid-cols-3 gap-8">
        {!Menus[activeTab].length ? (
          <p className="text-darkGrey">No menu available yet</p>
        ) : (
          Menus[activeTab].map((menu) => (
            <MenuCard
              label={menu?.label}
              description={menu?.description}
              route={`${import.meta.env[`VITE_${activeTab}_URL`]}${
                menu.route
              }`}
              icon={menu?.icon}
              hidden={menu?.hidden}
            />
          ))
        )}
      </div>
    </section>
  );
}

function MenuCard({ label, description, route, icon, hidden }) {
  return (
    <a
      key={label}
      href={route}
      className={clsx(
        "flex items-center gap-5 border hover:border-primary3 rounded-lg p-5",
        hidden && "hidden",
      )}
    >
      <div className="shrink-0">{icon}</div>
      <div className="flex flex-col gap-1">
        <h3 className="font-bold text-lg text-text1">{label}</h3>
        <p className="text-sm text-darkGrey">{description}</p>
      </div>
    </a>
  );
}
