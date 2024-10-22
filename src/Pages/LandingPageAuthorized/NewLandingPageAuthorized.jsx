import { Loader } from "@mantine/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import "dayjs/locale/id";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import SectionCourse from "./Sections/SectionCourse";
import SectionHero from "./Sections/SectionHero";
import SectionPlatformMenu from "./Sections/SectionPlatformMenu";
import SectionStatistic from "./Sections/SectionStatistic";
// import DashedPlayButton from "../../Components/Assets/Svg/dashed-play-button.svg";
import NewFooter from "../../Components/Footer/NewFooter";
import NewNavbar from "../../Components/NewNavbar";
import checkCmsAdminClusterAccess from "../../Utils/Helpers/checkCmsAdminClusterAccess";
import checkCmsAdminHoAccess from "../../Utils/Helpers/checkCmsAdminHoAccess";
import checkSubconAccess from "../../Utils/Helpers/checkSubconAccess";
import checkVendorAccess from "../../Utils/Helpers/checkVendorAccess";

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

export default function NewLandingPageAuthorized() {
  checkSubconAccess();
  checkVendorAccess();
  checkCmsAdminHoAccess();
  checkCmsAdminClusterAccess();

  return (
    <div className="flex flex-col">
      {/* // TODO: Replace NewNavbar with Navbar if development is on ILCS env (GitLab) */}
      {/* <Navbar /> */}
      <NewNavbar />

      <SectionHero />
      <SectionStatistic />
      <SectionPlatformMenu />
      <SectionCourse />
      <NewFooter />
    </div>
  );
}
