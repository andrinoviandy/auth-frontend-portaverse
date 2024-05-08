import { Button, RingProgress, Text, clsx } from "@mantine/core";
import dayjs from "dayjs";
import { useState } from "react";
import PerformanceSheetIllust from "../../../Components/Assets/Pictures/PerformanceSheets.png";
import TextNumberCard from "../../../Components/Cards/TextNumberCard";
import TableTemplate from "../../../Components/Table/TableTemplates";
import {
  BASE_PROXY,
  SMARTPLAN_ENDPOINT,
} from "../../../Networks/endpoint";
import { Networks } from "../../../Networks/factory";
import finalScoreCategorize from "../../../Utils/Helpers/finalScoreCategorize";
import getUserCookie from "../../../Utils/Helpers/getUserCookie";
import "./PanelPerformance.css";

const timelineType = {
  initial: { label: "Awal", color: "#A56EFF" },
  mutation: { label: "Mutasi", color: "#4BB543" },
  job_sharing: { label: "Job Sharing", color: "#F5BB5C" },
};

export default function PanelPerformance({
  activeTab,
  year,
  employeeNumber,
}) {
  const [step, setStep] = useState(1); // 1, 2, 3c

  const kpiService = Networks(BASE_PROXY.smartplan);

  const user = getUserCookie();

  const params = {
    employee_number: employeeNumber || user.employee.employee_number,
    year,
    periode: "TW4",
    with_assessment_score: 1,
  };
  const { data: dataScore, isLoading: isLoadingScore } =
    kpiService.query(
      SMARTPLAN_ENDPOINT.GET.getFinalScore,
      [SMARTPLAN_ENDPOINT.GET.getFinalScore, params],
      {
        enabled: !(
          !params?.employee_number ||
          !params?.year ||
          !params?.periode
        ),
      },
      {
        params,
      },
    );

  const kpiWeight = 80;
  const assessmentWeight = 20;

  const dataFinalEvaluation = [
    {
      aspect: "Penilaian Kinerja Individu Berbasis KPI",
      weight: kpiWeight,
      score: (
        dataScore?.static_score?.kpi_final_score || dataScore?.score
      )?.toFixed(2),
      work_score: (
        ((dataScore?.static_score?.kpi_final_score ||
          dataScore?.score ||
          0) *
          kpiWeight) /
        100
      ).toFixed(2),
    },
    {
      aspect:
        "Penilaian Kinerja Individu Berbasis Penilaian Perilaku",
      weight: assessmentWeight,
      score:
        (
          dataScore?.static_score?.assessment_score ||
          dataScore?.assessment_score?.skor_konversi
        )?.toFixed(2) || 0,
      work_score: (
        ((dataScore?.static_score?.assessment_score ||
          dataScore?.assessment_score?.skor_konversi ||
          0) *
          assessmentWeight) /
        100
      ).toFixed(2),
    },
  ];

  const floorByThree = (value) => Math.floor((value * 10) / 3);

  // Formula
  // X = Posisi Definitif = Y * weigth + Z * weight
  // Y = Posisi Aktif Definitif
  // Z = Posisi Inactive Definitif
  // A = Posisi Job Sharing
  // score = {X + (X * [{3 - SUM[A::jumlah_bulan]} / 3] + SUM[A::{a ->  a.score * [a.jumlah_bulan/3]}]) / (1 + A.count)} + [isPlusTen ? 10 : 0]

  // misal
  // X = X // posisi definitif Y + Z
  // Y = Y // posisi definitif aktif
  // Z = Z // posisi definitif inactive
  // SUM[A::jumlah_bulan] = C
  // SUM[A::{a ->  a.score * [a.jumlah_bulan/3]}] = V
  // A.count = B
  // [isPlusTen ? 10 : 0] = N
  // [{3 - C} / 3] = M
  // (1 + A.count) = K
  // score = {(X + (X * M + V )) / K} + N

  const Y =
    (dataScore?.perscore?.active || 0) *
    (dataScore?.formula?.active || 0);
  const Z =
    (dataScore?.perscore?.inactive || 0) *
    (dataScore?.formula?.inactive || 0);
  const X = Y + Z;
  const C = dataScore?.job_sharing_scores
    ?.map((e) => e.total_months)
    ?.reduce((partialSum, a) => partialSum + a, 0); // SUM[A::jumlah_bulan]
  const M = (3 - C) / 3;
  const V = dataScore?.job_sharing_scores
    ?.map((e) => (e.total_score * e.total_months) / 3)
    ?.reduce((partialSum, a) => partialSum + a, 0); // SUM[A::{a ->  a.score * [a.jumlah_bulan/3]}]
  const K = 1 + (dataScore?.job_sharing_scores?.length || 0);
  const N = dataScore?.is_plus_ten ? 10 : 0;

  const S = (X + (X * M + V)) / K + N;

  const activeScore = dataScore?.perscore?.active
    ? parseFloat(dataScore.perscore.active)
    : 0;
  const inactiveScore = dataScore?.perscore?.inactive
    ? parseFloat(dataScore.perscore.inactive)
    : 0;

  const allScoreWithoutWeight =
    activeScore +
    inactiveScore +
    (dataScore?.job_sharing_scores
      ?.map((e) => parseFloat(e.total_score))
      ?.reduce((partialSum, a) => partialSum + a, 0) || 0);

  const calculationWithJobSharing = `Nilai Kinerja Dengan Job Sharing:
  ${dataScore?.is_plus_ten && "("}[Nilai Kinerja
  Posisi Definitif${" "}
  ${
    !!dataScore?.job_sharing_scores?.length &&
    dataScore.job_sharing_scores.map(
      (e, i) =>
        `+ (Nilai Kinerja Posisi Definitif * ${
          3 - e.total_months
        }/3 + Nilai Kinerja Posisi Job Sharing 0${i + 1} * ${
          e.total_months
        }/3)`,
    )
  }
  ] /${" "}
  ${(dataScore?.job_sharing_scores?.length || 0) + 1}
  ${dataScore?.is_plus_ten && ") + 10"}`;

  const formulaCalculateWithJs = (score) =>
    `Bobot: ${score?.toFixed(2)} / ${allScoreWithoutWeight?.toFixed(
      2,
    )} = ${(score / allScoreWithoutWeight).toFixed(
      2,
    )} <br/> (Bobot: ${(score / allScoreWithoutWeight).toFixed(
      2,
    )}) * (${calculationWithJobSharing}) = ${(
      (score / allScoreWithoutWeight) *
      (dataScore?.score || 0)
    ).toFixed(2)}`;

  const dataWeighted = [
    {
      kpi_type: "Aktif",
      position_name: dataScore?.position?.active,
      superior_name: dataScore?.superior_name?.active,
      score: dataScore?.perscore?.active
        ? parseFloat(dataScore.perscore.active).toFixed(2)
        : 0,
      formula: !dataScore?.job_sharing_scores?.length
        ? `${floorByThree(dataScore?.display_formula?.active || 0)}/3`
        : formulaCalculateWithJs(activeScore),
      weighted_score: (
        (activeScore / allScoreWithoutWeight) *
        (dataScore?.score || 0)
      ).toFixed(2),
    },
    {
      kpi_type: "Historis",
      position_name: dataScore?.position?.inactive,
      superior_name: dataScore?.superior_name?.inactive,
      score: dataScore?.perscore?.inactive
        ? parseFloat(dataScore.perscore.inactive).toFixed(2)
        : 0,
      formula: !dataScore?.job_sharing_scores?.length
        ? `${floorByThree(
            dataScore?.display_formula?.inactive || 0,
          )}/3`
        : formulaCalculateWithJs(inactiveScore),
      weighted_score: (
        (inactiveScore / allScoreWithoutWeight) *
        (dataScore?.score || 0)
      ).toFixed(2),
    },
    ...(dataScore?.job_sharing_scores?.map((e) => ({
      kpi_type: "Job Sharing",
      position_name: e.position,
      superior_name: e.superior_name,
      score: e.total_score,
      formula: formulaCalculateWithJs(e.total_score),
      weighted_score: (
        (e.total_score / allScoreWithoutWeight) *
        (dataScore?.score || 0)
      ).toFixed(2),
    })) || []),
  ];

  const dataFinalScore = [
    {
      position_name:
        "Sakit bukan karena kecelakaan kerja dan dirawat",
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

  const score = (
    dataScore?.static_score?.final_score ||
    ((dataScore?.score ? parseFloat(dataScore?.score) : 0) *
      kpiWeight +
      (dataScore?.assessment_score?.skor_konversi
        ? parseFloat(dataScore?.assessment_score?.skor_konversi)
        : 0) *
        assessmentWeight) /
      100
  ).toFixed(2);
  const finalScoreProp = (() => {
    return finalScoreCategorize(score);
  })();

  if (step === 3) {
    return (
      <div className="flex flex-col gap-5">
        <section className="flex flex-col gap-5 items-center p-5 rounded-md border">
          <div className="grid grid-cols-2 gap-5 w-full">
            <TextNumberCard
              title="NILAI KINERJA INDIVIDU BERBASIS KPI & ASSESSMENT"
              value={score}
            />
            <TextNumberCard
              title="RATING PENILAIAN PEKERJA"
              value={finalScoreProp?.label}
              styles={{
                color: finalScoreProp?.color,
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
                <th>Nilai Terbobot</th>
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

        {/* TODO: Uncomment when BE is ready */}
        {/* <section className="flex flex-col gap-5 p-5 rounded-md border">
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
        </section> */}

        <section className="flex flex-col gap-5 items-center p-5 rounded-md border">
          <TextNumberCard
            title="NILAI AKHIR SKOR TERTIMBANG KPI (SYSTEM SOURCE)"
            value={dataScore?.score?.toFixed(2)}
            classNames={{ root: "w-full" }}
          />
          <TableTemplate
            variant="outline"
            tHeads={
              <tr>
                <th>Jenis KPI</th>
                <th>Nama Posisi</th>
                <th>Skor</th>
                <th>Detail Perhitungan</th>
                <th>Skor Tertimbang</th>
              </tr>
            }
            tRows={
              <>
                {dataWeighted?.map((item) => (
                  <tr key={item?.kpi_type}>
                    <td>{item?.kpi_type}</td>
                    <td>
                      <div>
                        <p className="font-medium">
                          {item?.superior_name}
                        </p>
                        <p className="text-sm text-darkGrey">
                          Posisi: {item?.position_name}
                        </p>
                      </div>
                    </td>
                    <td>{item?.score}</td>
                    <td>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: item?.formula,
                        }}
                      />
                    </td>
                    <td>{item?.weighted_score}</td>
                  </tr>
                ))}
                <tr className="bg-bg3 font-semibold">
                  <td />
                  <td />
                  <td />
                  <td>Total Akumulasi Nilai</td>
                  <td>{dataScore?.score?.toFixed(2)}</td>
                </tr>
              </>
            }
          />
        </section>

        {/* TODO: Uncomment when BE is ready */}
        {/* <section className="flex flex-col gap-5 items-center p-5 rounded-md border">
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
              <tr key={item?.position_name}>
                <td className="text-center">{item?.position_name}</td>
                <td className="text-center">{item?.description}</td>
              </tr>
            ))}
            classNames={{
              thead: "[&>tr>th]:text-center",
            }}
          />
        </section> */}
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
        {/* No Animation */}
        {/* <section
          style={{
            color: finalScoreProp?.colorDark,
          }}
          className={clsx(
            "absolute flex flex-col items-center gap-5 -anim-slide-1",
          )}
        >
          <div className="flex items-center justify-center bg-primary5 h-[200px] w-[200px] rounded-full border-[12px] border-primary4">
            <p className="text-5xl font-semibold font-tertiary -anim-slide-1-fadein">
              {score}
            </p>
          </div>
          <p className="text-3xl font-semibold -anim-slide-1-fadein">
            {finalScoreProp.label}
          </p>
        </section> */}

        {/* 2nd Slide */}
        <section className="absolute flex flex-col items-center gap-5 -anim-slide-2">
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
                  className="text-4xl font-tertiary rotate-180"
                >
                  {score}
                </Text>
              }
              sections={[
                {
                  value:
                    ((dataScore?.static_score?.kpi_final_score ||
                      dataScore?.score ||
                      0) *
                      kpiWeight) /
                    100,
                  color: "#EAB308",
                }, // KPI Based
                {
                  value:
                    ((dataScore?.static_score?.assessment_score ||
                      dataScore?.assessment_score?.skor_konversi ||
                      0) *
                      assessmentWeight) /
                    100,
                  color: "#4BB543",
                }, // Behavior Based
              ]}
            />
            <div className="flex flex-col gap-3 bg-white rounded-lg p-3">
              <div className="flex gap-2 items-center font-semibold">
                <div className="h-[20px] w-[20px] rounded-md bg-green" />
                <p className="text-green">
                  {(
                    ((dataScore?.static_score?.assessment_score ||
                      dataScore?.assessment_score?.skor_konversi ||
                      0) *
                      assessmentWeight) /
                    100
                  ).toFixed(2)}
                </p>
                <p>Behavior - Based</p>
              </div>
              <div className="flex gap-2 items-center font-semibold">
                <div className="h-[20px] w-[20px] rounded-md bg-yellow-500" />
                <p className="text-yellow-500">
                  {(
                    ((dataScore?.static_score?.kpi_final_score ||
                      dataScore?.score ||
                      0) *
                      kpiWeight) /
                    100
                  ).toFixed(2)}
                </p>
                <p>KPI - Based</p>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            size="md"
            className="text-white border-white -anim-slide-2-fadein"
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
      <Button onClick={() => setStep(2)} loading={isLoadingScore}>
        Klik Untuk Melihat Nilai
      </Button>
    </div>
  );
}
