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
import SignatureManagement from "../../../Components/Assets/Svg/signature-management.svg";
import {
  BASE_PROXY,
  SIGNATURE_ENDPOINT,
} from "../../../Networks/endpoint";
import { Networks } from "../../../Networks/factory";
import { MANTINE_TAB_STYLES, color } from "../../../Utils/Constants";
import getUserCookie from "../../../Utils/Helpers/getUserCookie";
import hasRole from "../../../Utils/Helpers/hasRole";

export default function SectionPlatformMenu() {
  const user = getUserCookie();
  const [activeTab, setActiveTab] = useState("KMS");
  const [menus, setMenus] = useState({
    KMS: [
      {
        label: "Home",
        description:
          "Media sosialisasi, kolaborasi, dan knowledge sharing antar pegawai",
        route: "/home",
        icon: (
          <Icon
            icon="octicon:home-16"
            color={color.primary3}
            width={35}
          />
        ),
        shown: true,
      },
      {
        label: "KMAP",
        description:
          "Peta pengetahuan dan aktivitas perusahaan yang diselaraskan dengan tujuan perusahaan",
        route: "/kmap",
        icon: (
          <img src={KMAPOutline} alt="kmap" className="w-[40px]" />
        ),
        shown: true,
      },
      {
        label: "Employees",
        description: "Daftar semua pegawai Pelindo dalam satu modul",
        route: "/employees",
        icon: (
          <Icon
            icon="mdi:user-box-outline"
            color={color.primary3}
            width={40}
          />
        ),
        shown: true,
      },
      {
        label: "Communities of Practice",
        description:
          "Komunitas yang menjadi wadah knowledge sharing untuk topik-topik strategis",
        route: "/communities",
        icon: (
          <Icon
            icon="fluent:people-community-add-20-regular"
            color={color.primary3}
            width={40}
          />
        ),
        shown: true,
      },
      {
        label: "Communities of Interest",
        description:
          "Komunitas-komunitas bagi para pegawai yang memiliki minat yang sama",
        route: "/communities?is-coi=1",
        icon: (
          <Icon
            icon="fluent:people-community-16-regular"
            color={color.primary3}
            width={40}
          />
        ),
        shown: true,
      },
      {
        label: "Repository",
        description:
          "Wadah yang menampung dan mengelola semua dokumen yang berada di Portaverse",
        route: "/repository",
        icon: (
          <img src={Repository} alt="repo" className="w-[26px]" />
        ),
        shown: true,
      },
      {
        label: "Ask the Expert",
        description:
          "Modul yang menjembatani komunikasi antara narasumber ahli dengan seluruh pegawai",
        route: "/ask-expert",
        icon: <img src={AoE} alt="repo" className="w-[40px]" />,
        shown: true,
      },
      {
        label: "Headquarter",
        description:
          "Modul untuk mengelola dan mengatur semua modul KMS secara terpusat",
        route: "/hq/user-mngmt",
        icon: (
          <Icon icon="ri:hq-line" color={color.primary3} width={40} />
        ),
        shown: hasRole(["SA"]),
      },
    ],
    LMS: [
      {
        label: "Home & Explore",
        description:
          "Modul utama untuk melihat semua kursus, peringkat Learning Hours, dan lainnya",
        route: "/",
        icon: (
          <Icon
            icon="octicon:home-16"
            color={color.primary3}
            width={35}
          />
        ),
        shown: true,
      },
      {
        label: "Dashboard",
        description:
          "Modul untuk mengelola semua informasi penting terkait akun Anda dalam LMS",
        route: "/dashboard",
        icon: (
          <Icon
            icon="carbon:user-avatar-filled-alt"
            color={color.primary3}
            width={40}
          />
        ),
        shown: true,
      },
      {
        label: "Dashboard Kursus",
        description:
          "Modul terpusat untuk mengelola semua aktivitas kursus-kursus Anda",
        route: "/course-pool/courses",
        icon: (
          <Icon
            icon="clarity:blocks-group-solid"
            color={color.primary3}
            width={40}
          />
        ),
        shown: hasRole(["CRPU"]),
      },
      {
        label: "Manajemen Kompetensi",
        description:
          "Modul terpusat untuk mengelola semua kompetensi-kompetensi dalam Portaverse",
        route: "/competency-management",
        icon: (
          <Icon
            icon="fluent:clipboard-task-list-rtl-24-regular"
            color={color.primary3}
            width={40}
          />
        ),
        shown: hasRole(["CRPU", "SA"]),
      },
      {
        label: "Manajemen Sertifikat",
        description:
          "Modul terpusat untuk mengelola dan membuat sertifikat dalam Portaverse",
        route: "/certificate-management",
        icon: (
          <Icon
            icon="mingcute:certificate-2-line"
            color={color.primary3}
            width={40}
          />
        ),
        shown: hasRole(["CRPU", "SA"]),
      },
      {
        label: hasRole(["SBCN"])
          ? "Subcon Dashboard"
          : "Manajemen Subcon",
        description:
          "Modul terpusat untuk mengelola semua subcon-Subcon di bawah naungan Anda",
        route: hasRole(["SBCN"])
          ? `/subcon-management/${user?.subcon?.subcon_id}`
          : "/subcon-management",
        icon: (
          <img
            src={SubconDashboardOutline}
            alt="subcon-dashboard"
            className="w-[40px]"
          />
        ),
        shown: hasRole(["CRPU", "SA", "SBCN"]),
      },
      {
        label: hasRole(["VNDR"])
          ? "Vendor Dashboard"
          : "Manajemen Vendor",
        description:
          "Modul terpusat untuk mengelola semua vendor yang beraktivitas di dalam Vendor",
        route: "/vendor-management",
        icon: (
          <img
            src={VendorDashboardOutline}
            alt="vendor-dashboard"
            className="w-[40px]"
          />
        ),
        shown: hasRole(["CRPU", "SA", "VNDR"]),
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
        shown: hasRole(["CRPU", "SA"]),
      },
      {
        label: "Manajemen Wallet",
        description:
          "Modul terpusat untuk mengelola individual wallet, group wallet, dan corporate wallet dalam Portaverse",
        route: "/wallet-management",
        icon: (
          <Icon
            icon="fluent:wallet-credit-card-16-regular"
            color={color.primary3}
            width={40}
          />
        ),
        shown: hasRole(["CRPU", "SA"]),
      },
      {
        label: "Manajemen Kuis Harian",
        description:
          "Modul berisi pengelolaan kuis harian yang ada di Portaverse",
        route: "/quiz-management",
        icon: (
          <Icon
            icon="material-symbols:quiz-outline"
            color={color.primary3}
            width={40}
          />
        ),
        shown: hasRole(["CRPU", "SA"]),
      },
      {
        label: "Trainer Pool",
        description:
          "Modul berisi trainer internal maupun eksternal yang tergabung pada aplikasi Portaverse",
        route: "/trainer-management",
        icon: (
          <Icon icon="mdi:teach" color={color.primary3} width={40} />
        ),
        shown: hasRole(["CRPU", "SA", "VNDR"]),
      },
      {
        label: "Manajemen Download",
        description:
          "Modul untuk mengunduh dan mendapatkan data-data dalam format Excel dari beberapa aktivitas di Portaverse",
        route: "/download-manager",
        icon: (
          <Icon
            icon="mdi-light:view-module"
            color={color.primary3}
            width={40}
          />
        ),
        shown: hasRole(["CRPU", "VNDR"]),
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
        shown: false,
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
        shown: true,
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
        shown: true,
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
        shown: hasRole(["SA"]),
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
        shown: hasRole(["SA"]),
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
        shown: hasRole(["SA"]),
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
        shown: hasRole(["SA"]),
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
        shown: hasRole(["SA"]),
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
        shown: hasRole(["SA"]),
      },
    ],
  });

  const signatureService = Networks(BASE_PROXY.signature);
  const { data: _ } = signatureService.query(
    SIGNATURE_ENDPOINT.GET.checkSMSAuthorization,
    [SIGNATURE_ENDPOINT.GET.checkSMSAuthorization],
    {
      onError: () => {},
      onSuccess: (res) => {
        const hasAccepted = !!res?.pass;
        if (hasAccepted) {
          setMenus((prev) => {
            if (
              prev.LMS.filter((e) =>
                e?.route?.includes("signature-management"),
              ).length
            ) {
              return { ...prev };
            }
            const newMenus = {
              ...prev,
              LMS: [
                ...prev.LMS.filter(
                  (e) => !e?.route?.includes("signature-management"),
                ),
                {
                  label: "Manajemen Tanda Tangan",
                  description:
                    "Modul terpusat untuk mengelola dan membuat tanda tangan elektronik",
                  route: "/signature-management",
                  icon: (
                    <img
                      src={SignatureManagement}
                      alt="signature-mngmt"
                      className="w-[40px]"
                    />
                  ),
                  shown: true,
                  state: { fromDashboard: true },
                },
              ],
            };
            return newMenus;
          });
        }
      },
    },
  );

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
        {!menus[activeTab].length ? (
          <p className="text-darkGrey">No menu available yet</p>
        ) : (
          menus[activeTab].map((menu) => (
            <MenuCard
              label={menu?.label}
              description={menu?.description}
              route={`${import.meta.env[`VITE_${activeTab}_URL`]}${
                menu.route
              }`}
              icon={menu?.icon}
              hidden={!menu?.shown}
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
