// import DashedPlayButton from "../../../Components/Assets/Svg/dashed-play-button.svg";
import { Loader } from "@mantine/core";
import dayjs from "dayjs";
import TooltipIcon from "../../../Components/TooltipIcon/TooltipIcon";
import {
  BASE_PROXY,
  COURSE_ENDPOINT,
  SMARTPLAN_ENDPOINT,
} from "../../../Networks/endpoint";
import { Networks } from "../../../Networks/factory";
import { color } from "../../../Utils/Constants";
import formatLearningHours from "../../../Utils/Helpers/formatLearningHours";
import formatRupiah from "../../../Utils/Helpers/formatRupiah";
import getUserCookie from "../../../Utils/Helpers/getUserCookie";

export default function SectionStatistic() {
  const { employee_id: employeeId } = getUserCookie().employee;

  const smartplanService = Networks(BASE_PROXY.smartplan);
  const { data: kpiScore, isLoading: isLoadingKPI } =
    smartplanService.query(
      SMARTPLAN_ENDPOINT.GET.kpiScore,
      ["kpiScore"],
      { select: (res) => (res?.score || 0).toFixed(2) },
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

  const courseService = Networks(BASE_PROXY.course);
  const { data: cardBalance } = courseService.query(
    COURSE_ENDPOINT.GET.historyTransaction(employeeId),
    ["individualWallet"],
    { select: (res) => res?.responsesCardBalance?.balance },
  );
  const { data: totalLearningHours } = courseService.query(
    COURSE_ENDPOINT.GET.totalEmployeeLearningHours(employeeId),
    ["learningHour"],
  );

  return (
    <section className="bg-primary3 text-white">
      <div className="flex flex-col gap-8 py-10 px-[5rem]">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-3xl">Statistik Penting</h2>
          <p className="text-lg">
            Lihat dan pelajari data-data statistik terpenting Anda
          </p>
        </div>
        <div className="grid grid-cols-5 justify-center items-start gap-4 text-text1">
          <StatCard
            label="Skor KPI"
            value={kpiScore || "-"}
            loading={isLoadingKPI}
            tooltip="Total Skor KPI Anda saat ini"
          />
          <StatCard
            label="Batas Waktu Isi KPI"
            value={remainingDay || "-"}
            loading={isLoadingTime}
            tooltip="Batas waktu pengisian KPI"
          />
          <StatCard
            label="Learning Hours"
            value={
              totalLearningHours
                ? formatLearningHours(totalLearningHours)
                : "-"
            }
            tooltip="Total waktu pembelajaran kursus"
          />

          {/* TODO: Integrate when API is ready */}
          <StatCard
            label="Gamification Points"
            // value={`${80} Points`}
            value="-"
            tooltip="Gabungan point yang ada di KMS dan LMS"
          />

          <StatCard
            label="Individual Wallet"
            value={
              cardBalance ? `Rp. ${formatRupiah(cardBalance)},-` : "-"
            }
            tooltip="Individual Wallet Anda"
          />
        </div>
      </div>
    </section>
  );
}

function StatCard({ label, value, tooltip, loading }) {
  return (
    <div className="flex flex-col gap-1 items-center w-full p-3 rounded-lg border bg-white">
      <div className="flex gap-2 items-center">
        <p className="font-semibold">{label}</p>
        <TooltipIcon
          label={tooltip}
          variant="info-filled"
          color={color.grey2}
          labelColor="black"
        />
      </div>
      {loading ? (
        <Loader variant="dots" className="my-[0.45rem]" />
      ) : (
        <p className="font-semibold text-primary3">{value}</p>
      )}
    </div>
  );
}
