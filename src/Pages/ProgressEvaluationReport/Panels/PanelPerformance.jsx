import { Button, RingProgress, Text, clsx } from "@mantine/core";
import * as localeId from "apexcharts/dist/locales/id.json";
import dayjs from "dayjs";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import PerformanceSheetIllust from "../../../Components/Assets/Pictures/PerformanceSheets.png";
import TextNumberCard from "../../../Components/Cards/TextNumberCard";
import TableTemplate from "../../../Components/Table/TableTemplates";
import finalScoreCategorize from "../../../Utils/Helpers/finalScoreCategorize";
import "./PanelPerformance.css";

const timelineType = {
  initial: { label: "Awal", color: "#A56EFF" },
  mutation: { label: "Mutasi", color: "#4BB543" },
  job_sharing: { label: "Job Sharing", color: "#F5BB5C" },
};

export default function PanelPerformance({ activeTab }) {
  const [step, setStep] = useState(1); // 1, 2, 3

  const dataFinalEvaluation = [
    {
      aspect: "Penilaian Kinerja Berbasis KPI",
      weight: 80,
      score: 67.2,
      work_score: 53.76,
    },
    {
      aspect: "Penilaian Kinerja Berbasis Penilaian Perilaku",
      weight: 20,
      score: 76,
      work_score: 15.2,
    },
  ];

  const dataWeighted = [
    {
      kpi_type: "Awal",
      kpi_name: "KPI 01",
      score: 72,
      formula: "3/12",
      weighted_score: 18,
    },
    {
      kpi_type: "Awal",
      kpi_name: "KPI 01",
      score: 84,
      formula: "(3/12) + (1/12)*(6/12)",
      weighted_score: 42,
    },
    {
      kpi_type: "Job Sharing",
      kpi_name: "KPI 0",
      score: 96,
      formula: "(1/12) * (6/12)",
      weighted_score: 24,
    },
  ];

  const dataFinalScore = [
    {
      kpi_name: "Sakit bukan karena kecelakaan kerja dan dirawat",
      description:
        "Nilai kinerja = 80% dari nilai kinerja individu berbasis KPI periode berjalan",
    },
  ];

  const dataGraph = {
    job_sharing: {
      start_date: "2023-08-05T14:48:00.000Z",
      end_date: "2023-12-05T14:48:00.000Z",
    },
    mutation: {
      start_date: "2023-05-05T14:48:00.000Z",
      end_date: "2023-08-05T14:48:00.000Z",
    },
    initial: {
      start_date: "2023-01-01T14:48:00.000Z",
      end_date: "2023-05-05T14:48:00.000Z",
    },
  };

  const graphSeries = [
    {
      data: Object.keys(dataGraph).map((key) => ({
        x: timelineType[key].label,
        y: [
          dayjs(dataGraph?.[key]?.start_date).toDate().getTime(),
          dayjs(dataGraph?.[key]?.end_date).toDate().getTime(),
        ],
        fillColor: timelineType[key].color,
      })),
    },
  ];

  const score = 90;
  const finalScoreProp = (() => {
    const temp = finalScoreCategorize(score);
    return {
      ...temp,
      color: `text-${temp?.color}`,
      colorDark: `text-${temp?.colorDark}`,
    };
  })();

  if (step === 3) {
    return (
      <div className="flex flex-col gap-5">
        <section className="flex flex-col gap-5 items-center p-5 rounded-md border">
          <div className="grid grid-cols-2 gap-5 w-full">
            <TextNumberCard
              title="NILAI AKHIR KINERJA AKHIR PEKERJA"
              value={score}
            />
            <TextNumberCard
              title="RATING PENILAIAN PEKERJA"
              value={finalScoreProp?.label}
              classNames={{
                value: finalScoreProp?.color,
              }}
            />
          </div>
          <TableTemplate
            variant="outline"
            tHeads={
              <tr>
                <th>Aspek Penilaian</th>
                <th>Bobot</th>
                <th>Skor</th>
                <th>Nilai Kerja</th>
              </tr>
            }
            tRows={dataFinalEvaluation?.map((item) => (
              <tr key={item?.aspect}>
                <td>{item?.aspect}</td>
                <td>{item?.weight || 0}%</td>
                <td>{item?.score || 0}</td>
                <td>{item?.work_score || 0}</td>
              </tr>
            ))}
          />
        </section>

        <section className="flex flex-col gap-5 p-5 rounded-md border">
          <h3 className="font-bold text-base">
            GRAFIS TIMELINE PENILAIAN KINERJA
          </h3>
          <div id="chart">
            <ReactApexChart
              height={300}
              options={{
                chart: {
                  locales: [localeId],
                  defaultLocale: "id",
                  type: "rangeBar",
                  zoom: { enabled: false },
                  toolbar: { show: false },
                },

                tooltip: {
                  custom: ({ y1, y2 }) => {
                    return `
                      <div class="flex flex-col p-4">
                        <div class="flex justify-between gap-2">
                          <div class="text-sm font-semibold">
                            Durasi :
                          </div>
                          <div class="text-sm">
                            ${dayjs(y1).format("DD MMMM YYYY")}
                            - ${dayjs(y2).format("DD MMMM YYYY")}
                          </div>
                        </div>
                      </div>
                    `;
                  },
                },

                plotOptions: {
                  bar: {
                    horizontal: true,
                    borderRadius: 2,
                    barHeight: "50%",
                    distributed: true,
                    dataLabels: {
                      hideOverflowingLabels: false,
                    },
                  },
                },

                dataLabels: {
                  enabled: true,
                  formatter: (_, opts) => {
                    const label =
                      opts.w.globals.labels[opts.dataPointIndex];

                    return `${label}`;
                  },
                  style: {
                    fontSize: "16px",
                  },
                },

                yaxis: {
                  show: false,
                },

                xaxis: {
                  type: "datetime",
                  min: dayjs().startOf("year").toDate().getTime(),
                  max: dayjs().endOf("year").toDate().getTime(),
                  position: "bottom",

                  labels: {
                    datetimeFormatter: {
                      year: "yyyy",
                      month: "MMMM",
                      day: "dd MM",
                      hour: "HH:mm",
                    },
                    datetimeUTC: false,
                    style: {
                      colors: "#000",
                      fontSize: "14px",
                      fontFamily: "Inter, Arial, sans-serif",
                      fontWeight: 600,
                    },
                  },
                },
                stroke: { width: 0 },
                grid: {
                  yaxis: {
                    lines: { show: false },
                  },
                  xaxis: {
                    lines: { show: true },
                  },
                },
              }}
              series={graphSeries}
              type="rangeBar"
            />
          </div>
        </section>

        <section className="flex flex-col gap-5 items-center p-5 rounded-md border">
          <TextNumberCard
            title="NILAI AKHIR SKOR TERTIMBANG KPI"
            value={84}
            classNames={{ root: "w-full" }}
          />
          <TableTemplate
            variant="outline"
            tHeads={
              <tr>
                <th>Jenis KPI</th>
                <th>Nama KPI</th>
                <th>Skor</th>
                <th>Detail Perhitungan</th>
                <th>Skor Tertimbang</th>
              </tr>
            }
            tRows={dataWeighted?.map((item) => (
              <tr key={item?.kpi_type}>
                <td>{item?.kpi_type}</td>
                <td>{item?.kpi_name}</td>
                <td>{item?.score}</td>
                <td>{item?.formula}</td>
                <td>{item?.weighted_score}</td>
              </tr>
            ))}
          />
        </section>

        <section className="flex flex-col gap-5 items-center p-5 rounded-md border">
          <TextNumberCard
            title="NILAI AKHIR SKOR"
            value={67.2}
            classNames={{ root: "w-full" }}
          />
          <TableTemplate
            variant="outline"
            tHeads={
              <tr>
                <th>
                  <p className="text-center">Jenis KPI</p>
                </th>
                <th>
                  <p className="text-center">
                    Penilaian Kinerja Berbasis KPI
                  </p>
                </th>
              </tr>
            }
            tRows={dataFinalScore?.map((item) => (
              <tr key={item?.kpi_name}>
                <td className="text-center">{item?.kpi_name}</td>
                <td className="text-center">{item?.description}</td>
              </tr>
            ))}
            classNames={{
              thead: "[&>tr>th]:text-center",
            }}
          />
        </section>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div
        className="relative overflow-hidden flex flex-col gap-5 justify-center items-center h-[400px] p-5 rounded-md border"
        style={{
          background:
            "linear-gradient(92deg, #016DB2 0.49%, #065385 99.1%)",
        }}
      >
        {/* 1st Slide */}
        <section
          className={clsx(
            "absolute flex flex-col items-center gap-5 anim-slide-1",
            finalScoreProp.colorDark,
          )}
        >
          <div className="flex items-center justify-center bg-primary5 h-[200px] w-[200px] rounded-full border-[12px] border-primary4">
            <p className="text-5xl font-semibold font-tertiary anim-slide-1-fadein">
              {score}
            </p>
          </div>
          <p className="text-3xl font-semibold anim-slide-1-fadein">
            {finalScoreProp.label}
          </p>
        </section>

        {/* 2nd Slide */}
        <section className="absolute flex flex-col items-center gap-5 anim-slide-2">
          <div className="flex gap-5 items-center">
            <RingProgress
              size={225}
              thickness={22}
              classNames={{
                root: "rotate-180",
              }}
              label={
                <Text
                  color="white"
                  weight={700}
                  align="center"
                  className="text-5xl font-tertiary rotate-180"
                >
                  94
                </Text>
              }
              sections={[
                { value: 79.06, color: "#EAB308" }, // KPI Based
                { value: 15.2, color: "#4BB543" }, // Behavior Based
              ]}
            />
            <div className="flex flex-col gap-3 bg-white rounded-lg p-3">
              <div className="flex gap-2 items-center font-semibold">
                <div className="h-[20px] w-[20px] rounded-md bg-green" />
                <p className="text-green">15.20</p>
                <p>Behavior - Based</p>
              </div>
              <div className="flex gap-2 items-center font-semibold">
                <div className="h-[20px] w-[20px] rounded-md bg-yellow-500" />
                <p className="text-yellow-500">79.06</p>
                <p>KPI - Based</p>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            size="md"
            className="text-white border-white anim-slide-2-fadein"
            onClick={() => setStep(3)}
          >
            Lihat Detail
          </Button>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 items-center p-5 rounded-md border">
      <h2 className="font-bold">
        Apakah anda ingin melihat hasil evaluasi tahunan?
      </h2>
      <img src={PerformanceSheetIllust} alt="illust" />
      <Button onClick={() => setStep(2)}>
        Klik Untuk Melihat Nilai
      </Button>
    </div>
  );
}
