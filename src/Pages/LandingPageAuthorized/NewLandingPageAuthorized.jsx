import { Loader } from "@mantine/core";
import dayjs from "dayjs";
import "dayjs/locale/id";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import DashedPlayButton from "../../Components/Assets/Svg/dashed-play-button.svg";
import NewFooter from "../../Components/Footer/NewFooter";
import NewNavbar from "../../Components/NewNavbar/NewNavbar";
import checkSubconAccess from "../../Utils/Helpers/checkSubconAccess";
import checkVendorAccess from "../../Utils/Helpers/checkVendorAccess";
import SectionCourse from "./Sections/SectionCourse";
import SectionHero from "./Sections/SectionHero";
import SectionPlatformMenu from "./Sections/SectionPlatformMenu";
import SectionStatistic from "./Sections/SectionStatistic";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

function Card({ title, description, icon, loading }) {
  return (
    <div className="flex flex-col justify-between gap-5 rounded-md bg-bg4 p-3">
      <div className="flex justify-between items-center gap-2">
        <p className="font-bold text-base">{title}</p>
        <span className="text-primary3">{icon}</span>
      </div>
      {loading ? (
        <Loader size="sm" />
      ) : (
        <p className="text-primary3 font-bold text-xl">
          {description}
        </p>
      )}
    </div>
  );
}

export default function NewLandingPageAuthorized() {
  checkSubconAccess();
  checkVendorAccess();

  return (
    <div className="flex flex-col">
      <NewNavbar />

      <SectionHero />
      <SectionStatistic />
      <SectionPlatformMenu />
      <SectionCourse />
      <NewFooter />
    </div>
  );
}
