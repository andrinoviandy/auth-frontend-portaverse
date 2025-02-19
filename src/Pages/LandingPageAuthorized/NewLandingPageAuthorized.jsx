import { Loader } from "@mantine/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { isAndroid, isIOS } from "react-device-detect";
import { useDispatch } from "react-redux";
import "dayjs/locale/id";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import SectionCourse from "./Sections/SectionCourse";
import SectionCourseMobile from "./Sections/SectionCourseMobile";
import SectionHero from "./Sections/SectionHero";
import SectionHeroMobile from "./Sections/SectionHeroMobile";
import SectionPlatformMenuMobile from "./Sections/SectionPlaftormMenuMobile";
import SectionPlatformMenu from "./Sections/SectionPlatformMenu";
import SectionStatistic from "./Sections/SectionStatistic";
import SectionStatisticMobile from "./Sections/SectionStatisticMobile";
// import DashedPlayButton from "../../Components/Assets/Svg/dashed-play-button.svg";
import NewFooter from "../../Components/Footer/NewFooter";
import NewFooterMobile from "../../Components/Footer/NewFooterMobile";
import Navbar from "../../Components/Navbar";
import NewNavbarMobile from "../../Components/NewNavbar/NewNavbarMobile";
import { setSocialMediaProfile } from "../../Configs/Redux/slice";
import { BASE_PROXY, SOCIAL_ENDPOINT } from "../../Networks/endpoint";
import { Networks } from "../../Networks/factory";
import checkCmsAdminClusterAccess from "../../Utils/Helpers/checkCmsAdminClusterAccess";
import checkCmsAdminHoAccess from "../../Utils/Helpers/checkCmsAdminHoAccess";
import checkSubconAccess from "../../Utils/Helpers/checkSubconAccess";
import checkVendorAccess from "../../Utils/Helpers/checkVendorAccess";
import getUserCookie from "../../Utils/Helpers/getUserCookie";

dayjs.extend(relativeTime);

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

export default function NewLandingPageAuthorized() {
  checkSubconAccess();
  checkVendorAccess();
  checkCmsAdminHoAccess();
  checkCmsAdminClusterAccess();

  const dispatch = useDispatch();
  const user = getUserCookie();

  const socialService = Networks(BASE_PROXY.social);
  socialService.query(
    SOCIAL_ENDPOINT.GET.profile(
      user?.employee?.social_employee_profile
        ?.social_employee_profile_id,
    ),
    ["employeeSocialProfile"],
    {
      enabled:
        !!user?.employee?.social_employee_profile
          ?.social_employee_profile_id,
      select: (res) => ({
        name: `${[
          res?.firstName,
          res?.additional_name || "",
          res?.lastName || "",
        ].join(" ")}`,
        backgroundImage: res?.background_img,
        profilePicture: res?.profile_picture,
        group: res?.group?.name,
        position: res?.position?.name,
        total_followers: res?.total_followers,
        total_following: res?.total_following,
        sme: res?.sme,
      }),
      onSuccess: (res) => dispatch(setSocialMediaProfile(res)),
    },
  );

  return (
    <div className="flex flex-col">
      {isAndroid || isIOS ? (
        <>
          <NewNavbarMobile />

          <SectionHeroMobile />
          <SectionStatisticMobile />
          <SectionPlatformMenuMobile />
          <SectionCourseMobile />
          <NewFooterMobile />
        </>
      ) : (
        <>
          {/* // TODO: Replace NewNavbar with Navbar if development is on ILCS env (GitLab) */}
          <Navbar />
          {/* <NewNavbar /> */}

          <SectionHero />
          <SectionStatistic />
          <SectionPlatformMenu />
          <SectionCourse />
          <NewFooter />
        </>
      )}
    </div>
  );
}
