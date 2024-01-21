import { Button } from "@mantine/core";
import dayjs from "dayjs";
import { useQueryClient } from "react-query";
import { COURSE_TYPES } from "../../Utils/Constants";
import Badge from "../Badge";
import DashedProgressBar from "../DashedProgressBar";

export default function CourseProgressCard({
  name,
  dateStart,
  dateEnd,
  courseType,
  evalLevel,
  batchName,
  kpis,
  careerAspiration,
  competencies,
  progress,
  isIDP,
  idpAcceptanceStatus,
  dpIdpId,
  employeeNumber,
  maxProgress = 6,
}) {
  const queryClient = useQueryClient();
  const progressLabels = {
    1: "Proses Persetujuan IDP",
    2: "Menunggu Aktivitas Kursus",
    3: "Proses Pembelajaran Berlangsung",
    4: "Evaluasi Level 01 Selesai",
    5: "Evaluasi Level 02 Selesai",
    6: "Evaluasi Level 03 Selesai",
  };

  const dateDifference = (() => {
    if (dateEnd) {
      const djsStart = dayjs(dateStart);
      const djsEnd = dayjs(dateEnd);
      const diff = djsEnd.diff(djsStart, "day");
      if (diff < 7) {
        return `${diff} Hari`;
      }
      if (diff < 30) {
        return `${djsEnd.diff(djsStart, "week")} Minggu`;
      }
      if (diff < 365) {
        return `${djsEnd.diff(djsStart, "month")} Bulan`;
      }
      return `${djsEnd.diff(djsStart, "year")} Tahun`;
    }
    return "∞";
  })();

  return (
    <div className="flex flex-col justify-between border rounded-md">
      <div className="flex flex-col gap-3 p-4">
        <div className="flex justify-between items-center">
          <p className="font-bold">{name}</p>

          {isIDP && (
            <Badge
              value="Individual Development Plan"
              customTextClasses="text-sm"
            />
          )}
        </div>

        <p>
          <span className="text-darkGrey">
            Aspirasi Karir Terkait:{" "}
          </span>
          {careerAspiration || "-"}
        </p>

        <p>
          <span className="text-darkGrey">Jenis Kursus: </span>
          {courseType ? COURSE_TYPES[courseType] : "-"}
        </p>

        <p>
          <span className="text-darkGrey">Batch Kursus: </span>
          {batchName || "-"}
        </p>

        <p>
          <span className="text-darkGrey">Periode Kursus: </span>
          {dateDifference}
        </p>

        <p>
          <span className="text-darkGrey">
            Waktu Pelaksanaan Kursus:{" "}
          </span>
          {dayjs(dateStart).format("DD/MM/YYYY")} -{" "}
          {dateEnd ? dayjs(dateEnd).format("DD/MM/YYYY") : "∞"}
        </p>

        <div className="flex gap-2 items-start">
          <p className="shrink-0 text-darkGrey">KPI Terkait:</p>
          <div className="flex gap-2 flex-wrap">
            {kpis?.length
              ? kpis
                  ?.slice(0, 3)
                  ?.map((c) => (
                    <Badge
                      key={c}
                      value={c}
                      customTextClasses="text-sm"
                      variant="gray"
                      withTooltip
                      maxLength={16}
                    />
                  ))
              : "-"}
            {kpis?.length > 3 && (
              <p className="text-primary3 font-semibold">
                + {kpis?.length - 3} KPI lainnya
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-2 items-start">
          <p className="shrink-0 text-darkGrey">
            Kompetensi Terkait:
          </p>
          <div className="flex gap-2 flex-wrap">
            {competencies?.length
              ? competencies
                  ?.slice(0, 3)
                  ?.map((c) => (
                    <Badge
                      key={c}
                      value={c}
                      customTextClasses="text-sm"
                      variant="gray"
                      withTooltip
                      maxLength={16}
                    />
                  ))
              : "-"}
            {competencies?.length > 3 && (
              <p className="text-primary3 font-semibold">
                + {competencies?.length - 3} kompetensi lainnya
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 bg-bg4 px-4 py-3">
        <div className="flex justify-between items-center">
          <p className="text-primary3 font-semibold">Progress</p>
          <p className="font-semibold text-darkGrey">
            {progress || 0}/{maxProgress}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <DashedProgressBar
            value={progress}
            sectionCount={maxProgress}
            classNames={{ root: "w-1/2" }}
            isRounded
          />
          <p className="font-semibold text-darkGrey shrink-0">
            {progressLabels[progress]}
          </p>
        </div>
        {isIDP &&
          progress === 1 &&
          idpAcceptanceStatus === "Subordinate Rejection Request" && (
            <div className="flex gap-3 self-end mt-2">
              <Button
                variant="outline"
                size="md"
                color="red"
                disabled
              >
                Pengajuan Penolakan telah Dikirim
              </Button>
            </div>
          )}
      </div>
    </div>
  );
}
