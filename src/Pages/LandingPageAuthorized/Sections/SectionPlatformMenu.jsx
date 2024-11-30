/* eslint-disable react/prop-types */
import { Icon } from "@iconify/react";
import { Tabs } from "@mantine/core";
import clsx from "clsx";
import { useMemo, useState } from "react";

import AoE from "../../../Components/Assets/Svg/ask.svg";
import DevelopmentPlan from "../../../Components/Assets/Svg/development-plan.svg";
import KMAPOutline from "../../../Components/Assets/Svg/kmap-outline.svg";
import Podium from "../../../Components/Assets/Svg/podium.svg";
import PromotionRotation from "../../../Components/Assets/Svg/promotion-rotation.svg";
import Repository from "../../../Components/Assets/Svg/repository.svg";
import SignatureManagement from "../../../Components/Assets/Svg/signature-management.svg";
// import DashedPlayButton from "../../../Components/Assets/Svg/dashed-play-button.svg";
import SubconDashboardOutline from "../../../Components/Assets/Svg/SubconDashboardOutline.svg";
import VendorDashboardOutline from "../../../Components/Assets/Svg/VendorDashboardOutline.svg";
import Badge from "../../../Components/Badge/Badge";
import {
  BASE_PROXY,
  DEVELOPMENT_PLAN_ENDPOINT,
  INNOVATION_ENDPOINT,
  SIGNATURE_ENDPOINT,
  SMARTPLAN_ENDPOINT_V2,
} from "../../../Networks/endpoint";
import { Networks } from "../../../Networks/factory";
import { color } from "../../../Utils/Constants";
import getUserCookie from "../../../Utils/Helpers/getUserCookie";
import hasRole from "../../../Utils/Helpers/hasRole";

export default function SectionPlatformMenu() {
  const user = getUserCookie();
  const employeeId = user?.employee?.employee_id;
  const [activeTab, setActiveTab] = useState("KMS");

  const [hasAccessOM, setHasAccessOM] = useState(false);
  const [hasAccessSMS, setHasAccessSMS] = useState(false);
  const [hasWerks, setHasWerks] = useState(false);
  const [hasAccessIMSHQ, setHasAccessIMSHQ] = useState(false);

  const kpiService = Networks(BASE_PROXY.smartplan);
  const innovationService = Networks(BASE_PROXY.innovation);

  kpiService.query(
    SMARTPLAN_ENDPOINT_V2.GET.loggedInAdminEmployees,
    [
      SMARTPLAN_ENDPOINT_V2.GET.loggedInAdminEmployees,
      user.employee.employee_number,
    ],
    {
      onSuccess: (res) => {
        setHasWerks(!!res?.companies?.length);
      },
    },
  );

  innovationService.query(
    INNOVATION_ENDPOINT.GET.userRole(employeeId),
    ["ims-user-role", employeeId],
    {
      onSuccess: (res) => {
        setHasAccessIMSHQ(!!res?.is_regional || !!res?.is_admin);
      },
    },
  );

  const menus = useMemo(() => {
    return {
      KMS: [
        {
          label: "Social Media",
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
          hasAccess: true,
        },
        {
          label: "Knowledge Map",
          description:
            "Peta pengetahuan dan aktivitas perusahaan yang diselaraskan dengan tujuan perusahaan",
          route: "/kmap",
          icon: (
            <img src={KMAPOutline} alt="kmap" className="w-[40px]" />
          ),
          hasAccess: true,
        },
        {
          label: "SME Dashboard",
          description:
            "Modul untuk pengelolaan, monitoring, dan pengembangan narasumber ahli di Pelindo",
          route: "/dashboard-sme",
          icon: (
            <Icon
              icon="clarity:organization-line"
              width={40}
              color={color.primary3}
            />
          ),
          hasAccess: true,
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
          hasAccess: true,
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
          hasAccess: true,
        },
        {
          label: "Repository",
          description:
            "Wadah yang menampung dan mengelola semua dokumen yang berada di Portaverse",
          route: "/repository",
          icon: (
            <img src={Repository} alt="repo" className="w-[26px]" />
          ),
          hasAccess: true,
        },
        {
          label: "Ask the Expert",
          description:
            "Modul yang menjembatani komunikasi antara narasumber ahli dengan seluruh pegawai",
          route: "/ask-expert",
          icon: <img src={AoE} alt="repo" className="w-[40px]" />,
          hasAccess: true,
        },
        {
          label: "Virtu VR",
          description:
            "Modul untuk melihat secara virtual layanan secara 3 Dimensi",
          route: "/virtu-vr",
          icon: (
            <Icon
              icon="material-symbols:3d-rotation"
              color={color.primary3}
              width={40}
            />
          ),
          hasAccess: true,
        },
        // {
        //   label: "Headquarter",
        //   description:
        //     "Modul untuk mengelola dan mengatur semua modul KMS secara terpusat",
        //   route: "/hq/user-mngmt",
        //   icon: (
        //     <Icon icon="ri:hq-line" color={color.primary3} width={40} />
        //   ),
        //   hasAccess: hasRole(["SA"]),
        //   adminOnly: true,
        // },
      ],
      LMS: [
        {
          label: "Learning Explore",
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
          hasAccess: true,
        },
        {
          label: "Dashboard Learning",
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
          hasAccess: true,
        },
        {
          label: "Dashboard Corpu",
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
          hasAccess: hasRole(["CRPU"]),
          adminOnly: true,
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
          hasAccess: hasRole(["CRPU", "SA"]),
          adminOnly: true,
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
          hasAccess: hasRole(["CRPU", "SA"]),
          adminOnly: true,
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
          hasAccess: hasRole(["CRPU", "SA", "SBCN"]),
          adminOnly: true,
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
          hasAccess: hasRole(["CRPU", "SA", "VNDR"]),
          adminOnly: true,
        },
        {
          label: "Learning Analytics",
          description:
            "Analisis kursus-kursus yang ada di Portaverse",
          route: "/analytics",
          icon: (
            <Icon
              icon="majesticons:analytics-line"
              color={color.primary3}
              width={40}
            />
          ),
          hasAccess: hasRole(["CRPU", "SA"]),
          adminOnly: true,
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
          hasAccess: hasRole(["CRPU", "SA"]),
          adminOnly: true,
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
          hasAccess: hasRole(["CRPU", "SA"]),
          adminOnly: true,
        },
        {
          label: "Manajemen Trainer",
          description:
            "Modul berisi trainer internal maupun eksternal yang tergabung pada aplikasi Portaverse",
          route: "/trainer-management",
          icon: (
            <Icon
              icon="mdi:teach"
              color={color.primary3}
              width={40}
            />
          ),
          hasAccess: hasRole(["CRPU", "SA", "VNDR"]),
          adminOnly: true,
          comingSoon: true,
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
          hasAccess: hasRole(["CRPU", "VNDR"]),
          adminOnly: true,
        },
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
          hasAccess: hasAccessSMS,
          adminOnly: true,
          state: { fromDashboard: true },
        },
      ],
      TMS: [
        {
          label: "Dashboard",
          description:
            "Profil talenta untuk mendukung kinerja pegawai",
          route: "/dashboard",
          icon: (
            <Icon
              icon="carbon:user-avatar-filled-alt"
              color={color.primary3}
              width={40}
            />
          ),
          hasAccess: true,
        },
        {
          label: "Smart Plan KPI",
          description: "Tentukan target KPI divisi dan perusahaan",
          route: "/smart-plan-v2",
          icon: (
            <Icon
              icon="carbon:summary-kpi"
              color={color.primary3}
              width={40}
            />
          ),
          hasAccess: true,
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
          hasAccess: true,
        },
        {
          label: "Manajemen Organisasi",
          description:
            "Pengelolaan struktur organisasi yang ada di perusahaan",
          route: "/organization-management/organization-master",
          icon: (
            <Icon
              icon="clarity:organization-line"
              color={color.primary3}
              width={40}
            />
          ),
          hasAccess: hasAccessOM,
          adminOnly: true,
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
          hasAccess: true,
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
          hasAccess: hasRole(["SA"]),
          adminOnly: true,
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
          hasAccess: hasWerks || hasRole(["SA"]),
          adminOnly: true,
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
          hasAccess: false,
          comingSoon: true,
        },
        {
          label: "My Profile",
          description: "Profil lengkap pekerja Pelindo",
          route: "/my-profile/personal-data",
          icon: (
            <Icon
              icon="material-symbols:account-box-outline"
              width={40}
              color={color.primary3}
            />
          ),
          hasAccess: true,
        },
        // {
        //   label: "Performance Report",
        //   description:
        //     "Laporan hasil kinerja selama satu tahun berdasarkan penilaian atasan, rekan dan bawahan",
        //   route: "/progress-eval-report",
        //   host: import.meta.env.VITE_SSO_URL,
        //   icon: (
        //     <img
        //       src={PerformanceReport}
        //       alt="performance-report"
        //       className="w-[30px]"
        //     />
        //   ),
        //   hasAccess: false,
        //   comingSoon: true,
        // },
        {
          label: "Master Pegawai",
          description:
            "Daftar semua pegawai Pelindo dalam satu modul",
          route: "/employees",
          icon: (
            <Icon
              icon="mdi:user-box-outline"
              color={color.primary3}
              width={40}
            />
          ),
          hasAccess: true,
        },
        // {
        //   label: "Kamus Indikator Kinerja",
        //   description:
        //     "Daftar semua Kamus Indikator Kerja",
        //   route: "/dictionary",
        //   icon: (
        //     <Icon
        //       icon="mage:book-text"
        //       color={color.primary3}
        //       width={40}
        //     />
        //   ),
        //   hasAccess: true,
        // },
      ],
      IMS: [
        {
          label: "Dashboard Innovation",
          description:
            "Modul untuk menyampaikan dan mengembangkan ide-ide inovasi",
          route: "/innovation-management-system",
          icon: (
            <Icon
              icon="iconoir:light-bulb"
              color={color.primary3}
              width={40}
            />
          ),
          hasAccess: hasRole(["USER"]),
        },
        {
          label: "Competition Innovation",
          description:
            "Modul untuk mengikuti kegiatan kompetisi inovasi yang ada di Pelindo Grup",
          route: "/competition-management-system",
          icon: <img src={Podium} alt="kmap" className="w-[40px]" />,
          hasAccess: hasRole(["USER"]),
        },
        {
          label: "Headquarter Innovation",
          description:
            "Modul untuk mengelola dan mengatur semua modul IMS secara terpusat",
          route: "/headquarter-innovation",
          icon: (
            <Icon
              icon="material-symbols:account-box-outline"
              color={color.primary3}
              width={40}
            />
          ),
          hasAccess: hasRole(["SA"]) || hasAccessIMSHQ,
          adminOnly: true,
        },
      ],
      CMS: [
        {
          label: "Change Catalyst Team Monitoring System",
          description:
            "Modul untuk monitoring dan manajemen program budaya Change Catalyst Team (CCT) yang dilaksanakan di Pelindo Group.",
          route: "/change-catalyst-team-monitoring-system",
          icon: (
            <Icon
              icon="iconoir:light-bulb"
              color={color.primary3}
              width={40}
            />
          ),
          hasAccess: hasRole(["USER"]),
        },
        {
          label: "Culture Monitoring System",
          description:
            "Modul untuk monitoring dan manajemen program Internalisasi Budaya yang dilaksanakan di Pelindo Group.",
          route: "/culture-monitoring-system",
          icon: <img src={Podium} alt="kmap" className="w-[40px]" />,
          hasAccess: hasRole(["USER"]),
        },
        {
          label: "Change Catalyst Member Management",
          description:
            "Modul untuk manajemen anggota Change Catalyst Team (CCT) terkait status keanggotaan dan penugasan.",
          route: "/change-catalyst-member-management",
          icon: (
            <Icon
              icon="material-symbols:account-box-outline"
              color={color.primary3}
              width={40}
            />
          ),
          hasAccess: hasRole(["USER"]),
        },
        {
          label: "Culture Analytics",
          description:
            "Modul untuk melihat data terkait pelaksanaan program Change Catalyst Team dan Internalisasi Budaya.",
          route: "/analytics",
          icon: (
            <Icon
              icon="material-symbols:account-box-outline"
              color={color.primary3}
              width={40}
            />
          ),
          hasAccess: hasRole([
            "ADMIN_HO",
            "ADMIN_UNIT_KERJA",
            "CHANGE_AGENT",
            "CHANGE_CHAMPION",
            "CHANGE_LEADER",
          ]),
        },
        {
          label: "Culture Headquarter",
          description:
            "Modul untuk manajemen pengaturan modul CCTMS dan CMS.",
          route: "/culture-hq",
          icon: (
            <Icon
              icon="material-symbols:account-box-outline"
              color={color.primary3}
              width={40}
            />
          ),
          hasAccess: hasRole(["SA"]),
          adminOnly: true,
        },
      ],
    };
  }, [hasAccessOM, hasAccessSMS, hasWerks, user.role_code]);

  const signatureService = Networks(BASE_PROXY.signature);
  signatureService.query(
    SIGNATURE_ENDPOINT.GET.checkSMSAuthorization,
    [SIGNATURE_ENDPOINT.GET.checkSMSAuthorization],
    {
      onError: () => {},
      onSuccess: (res) => {
        const hasAccepted = !!res?.pass;
        setHasAccessSMS(hasAccepted);
      },
    },
  );

  const dpService = Networks(BASE_PROXY.developmentPlan);
  dpService.query(
    DEVELOPMENT_PLAN_ENDPOINT.GET.verifyAccessOrgManagement,
    [DEVELOPMENT_PLAN_ENDPOINT.GET.verifyAccessOrgManagement],
    {
      onSuccess: (res) => {
        const hasAccepted = !!res?.has_access;
        setHasAccessOM(hasAccepted);
      },
    },
  );

  return (
    <section className="flex flex-col gap-10 px-20 py-16">
      <Tabs value={activeTab} onChange={setActiveTab} radius="lg">
        <Tabs.List grow>
          {["KMS", "LMS", "TMS", "IMS", "CMS"].map((tab) => (
            <Tabs.Tab key={tab} value={tab}>
              {tab}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
      <div className="grid grid-cols-3 gap-5">
        {!menus[activeTab].length ? (
          <p className="text-darkGrey">No menu available yet</p>
        ) : (
          menus[activeTab].map((menu) => (
            <MenuCard
              key={`${activeTab}-${menu?.label}`}
              label={menu?.label}
              description={menu?.description}
              route={`${
                menu?.host || import.meta.env[`VITE_${activeTab}_URL`]
              }${menu.route}`}
              icon={menu?.icon}
              // hidden={!menu?.hasAccess}
              disabled={!menu?.hasAccess}
              adminOnly={!!menu?.adminOnly}
              comingSoon={!!menu?.comingSoon}
            />
          ))
        )}
      </div>
    </section>
  );
}

function MenuCard({
  label,
  description,
  route,
  icon,
  disabled,
  adminOnly,
  comingSoon,
}) {
  const badgeProp = (() => {
    if (comingSoon)
      return {
        variant: "purple",
        value: "Coming Soon",
      };
    if (adminOnly)
      return {
        variant: "primary",
        value: "Admin Only",
      };
    return null;
  })();

  return (
    <a
      href={disabled || comingSoon ? "/landing" : route}
      className={clsx(
        "flex items-center gap-3 rounded-lg border px-5 py-4",
        disabled || comingSoon
          ? "pointer-events-none cursor-not-allowed bg-gray-50"
          : "bg-white hover:border-primary3",
      )}
    >
      <div
        className="shrink-0"
        style={
          disabled || comingSoon
            ? {
                filter:
                  "grayscale(1) sepia(2%) saturate(1297%) hue-rotate(177deg) brightness(100%) contrast(89%)",
              }
            : {}
        }
      >
        {icon}
      </div>
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-3">
          <h3
            className={clsx(
              "text-base font-bold",
              disabled || comingSoon ? "text-gray-400" : "text-text1",
            )}
          >
            {label}
          </h3>
          {!!badgeProp && (
            <Badge
              customClasses="shrink-0"
              customTextClasses="text-xs"
              value={badgeProp.value}
              variant={badgeProp.variant}
            />
          )}
        </div>
        <p className="text-xs text-darkGrey">{description}</p>
      </div>
    </a>
  );
}
