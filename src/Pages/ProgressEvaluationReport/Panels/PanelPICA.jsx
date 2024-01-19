/* eslint-disable react/jsx-props-no-spreading */
import { Icon } from "@iconify/react";
import {
  ActionIcon,
  Loader,
  Pagination,
  Spoiler,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { useRef, useState } from "react";
import TableTemplate from "../../../Components/Table/TableTemplates";
import {
  BASE_PROXY,
  DEVELOPMENT_PLAN_ENDPOINT,
  SMARTPLAN_ENDPOINT,
} from "../../../Networks/endpoint";
import { Networks } from "../../../Networks/factory";
import commify from "../../../Utils/Helpers/comify";
import toMapIdAsKey from "../../../Utils/Helpers/toMapIdAsKey";
import totalKPIScore from "../../../Utils/Helpers/totalKPIScore";
import uppercaseFirstLetterEveryWord from "../../../Utils/Helpers/uppercaseFirstLetterEveryWord";

export default function PanelPICA({ activeTab, employeeNumber }) {
  const [data, setData] = useState({
    feedback: "",
    picas: [],
  });

  const [kpiItems, setKpiItems] = useState([]);
  const [pageScoreCard, setPageScoreCard] = useState(1);

  const smartplan = Networks(BASE_PROXY.smartplan);
  const dpService = Networks(BASE_PROXY.developmentPlan);

  const { data: cmcSchedule } = dpService.query(
    DEVELOPMENT_PLAN_ENDPOINT.GET.getCmcSchedule,
    [DEVELOPMENT_PLAN_ENDPOINT.GET.getCmcSchedule],
  );

  const { data: dataScoreCard, isLoading: isLoadingScoreCard } =
    smartplan.query(
      SMARTPLAN_ENDPOINT.GET.kpi,
      ["kpi", pageScoreCard],
      {},
      {
        params: {
          page: pageScoreCard,
          size: 10,
          "employee-number": employeeNumber,
        },
      },
    );

  smartplan.query(
    SMARTPLAN_ENDPOINT.GET.kpi,
    ["kpiInput"],
    {
      onSuccess: (res) =>
        setKpiItems(
          res.kpis.map((kpi) => ({
            value: kpi.kpi_id,
            label: kpi.nama_kpi,
            capaian: kpi.capaian,
          })),
        ),
    },
    {
      params: {
        page: pageScoreCard,
        size: 100,
        "employee-number": employeeNumber,
        "exclude-achieved-kpi": 1,
      },
    },
  );

  const { data: dataPica } = smartplan.query(
    SMARTPLAN_ENDPOINT.GET.pica,
    ["pica"],
    {
      onSuccess: (res) => {
        setData((prev) => ({
          ...prev,
          picas: res?.picas?.map((item) => ({
            kpi_id: item?.kpi_id || null,
            kpi_pica_id: item?.kpi_pica_id || null,
            date_start: item?.date_start
              ? dayjs(item?.date_start).toDate()
              : null,
            date_end: item?.date_end
              ? dayjs(item?.date_end).toDate()
              : null,
            problem_identification:
              item?.problem_identification || "",
            correlative_action: item?.correlative_action || "",
            target_output: item?.target_output || "",
          })),
        }));
      },
    },
    {
      params: {
        page: 1,
        size: 9999,
        "employee-number": employeeNumber,
      },
    },
  );

  const { isLoading: isLoadingFeedback } = smartplan.query(
    SMARTPLAN_ENDPOINT.GET.qualFeedback,
    ["qualFeedback"],
    {
      onSuccess: (res) => {
        setData((prev) => ({
          ...prev,
          feedback: res?.feedback,
        }));
      },
    },
    {
      params: {
        page: pageScoreCard,
        size: 10,
        "employee-number": employeeNumber,
      },
    },
  );

  return (
    <div className="flex flex-col gap-5 border rounded-md p-4 min-h-[200px]">
      <section className="flex justify-between">
        <div>
          <p className="text-darkGrey font-medium text-base">
            {uppercaseFirstLetterEveryWord(
              dataPica?.openQuarterPeriod?.type || "",
            )}{" "}
            {dataPica?.period_code}
          </p>
          <h4 className="text-xl font-semibold">
            Formulir Problem Identification & Corrective Action
          </h4>
        </div>
        <div>
          {/* <p className="text-darkGrey font-medium text-base mt-9">
              Masa Pelaksanaan CMC Perfomance
            </p> */}
          <h4 className="text-xl font-semibold mt-2">
            {!!cmcSchedule?.open_period?.is_open &&
              `${
                !!cmcSchedule?.open_period?.is_open &&
                dayjs(cmcSchedule?.open_period?.date_start).format(
                  "DD MMMM YYYY",
                )
              } - ${
                !!cmcSchedule?.open_period?.is_open &&
                dayjs(cmcSchedule?.open_period?.date_end).format(
                  "DD MMMM YYYY",
                )
              }`}
          </h4>
        </div>
      </section>

      <section>
        <h4 className="text-xl font-semibold ">
          KPI Score Card Pekerja
        </h4>
        <p className="text-darkGrey font-medium text-base mb-5">
          Hasil Penilaian Kinerja Berbasis KPI
        </p>
        <TableTemplate
          variant="outline"
          classNames={{
            table: "bg-bg1 border-b mb-4",
            tbody: "text-start",
          }}
          tHeads={
            <tr>
              <th className="py-4 px-1 text-start">No</th>
              <th className="py-4 px-1 text-start">Nama KPI</th>
              <th className="py-4 px-1 text-start">Satuan</th>
              <th className="py-4 px-1 text-start">Polaritas</th>
              <th className="py-4 px-1 text-start">Formula</th>
              <th className="py-4 px-1 text-start">
                Periode Pengukuran
              </th>
              <th className="py-4 px-1 text-start">Bobot</th>
              <th className="py-4 px-1 text-start">Target</th>
              <th className="py-4 px-1 text-start">Realisasi</th>
              <th className="py-4 px-1 text-start">Capaian</th>
              <th className="py-4 px-1 text-start">Skor</th>
            </tr>
          }
          tRows={dataScoreCard?.kpis?.map((e, i) => (
            <RowItemKPI key={e.kpi_id} data={e} counter={i + 1} />
          ))}
          isLoading={isLoadingScoreCard}
          isNoItem={!dataScoreCard?.kpis?.length}
          noItemLabel="No KPI"
        />
        {!!dataScoreCard?.kpis?.length && (
          <Pagination
            page={pageScoreCard}
            setPage={setPageScoreCard}
            totalPage={dataScoreCard?.totalPage}
          />
        )}
        <TotalScoreKPITable
          score={
            dataScoreCard?.kpis
              ? totalKPIScore(dataScoreCard?.kpis)
              : ""
          }
        />
      </section>
      <section>
        <div>
          <h4 className="text-xl font-semibold">PICA</h4>
          <p className="text-darkGrey font-medium text-base">
            Problem Identification & Corrective Action
          </p>
        </div>
        {data?.picas?.map((e) => (
          <div key={e?.kpi_pica_id}>
            <ItemPICA data={e} kpiItems={kpiItems} />
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-5 my-5">
        <h4 className="text-xl font-semibold">
          Qualitative Feedback
        </h4>

        {isLoadingFeedback ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <p>{data?.feedback || "-"}</p>
        )}
      </section>
    </div>
  );
}

function ItemPICA({ data, kpiItems }) {
  const kpiMap = toMapIdAsKey(kpiItems, "value", "Object");

  return (
    <section className="flex flex-col gap-4 p-4 border rounded-lg mt-6">
      <div className="flex justify-between">
        <div className="flex flex-col gap-4">
          <p className="text-darkGrey text-xs font-medium ">
            Nama KPI
          </p>
          <p className="text-primary3 font-medium text-base">
            {kpiMap?.[data.kpi_id]?.label}
          </p>
        </div>
        <div className="flex flex-col items-end gap-4">
          <p className="text-darkGrey text-xs font-medium ">
            CAPAIAN
          </p>
          <p className={`font-semibold text-xl ${"text-red-500"}`}>
            {kpiMap?.[data.kpi_id]?.capaian}
          </p>
        </div>
      </div>
      <div className="border" />
      <p className="text-darkGrey text-xs font-medium">
        PROBLEM IDENTIFICATION
      </p>

      <p className="max-w-xs text-start">
        {data.problem_identification}
      </p>

      <div className="border" />
      <p className="text-darkGrey text-xs font-medium">
        CORRECTIVE ACTION
      </p>

      <p className="max-w-xs text-start">
        {data?.correlative_action}
      </p>

      <div className="border" />
      <p className="text-darkGrey text-xs font-medium">WAKTU</p>
      <div className="flex gap-2">
        <DatePicker
          placeholder="Start Date"
          defaultValue={data?.date_start}
          clearable={false}
          disabled
        />
        <DatePicker
          placeholder="End Date"
          defaultValue={data?.date_end}
          clearable={false}
          disabled
        />
      </div>
      <div className="border" />
      <p className="text-darkGrey text-xs font-medium">TARGET</p>
      <p className="max-w-xs text-start">{data?.target_output}</p>
    </section>
  );
}

function TotalScoreKPITable({ score }) {
  return (
    <div className="w-full flex items-center justify-center gap-5 rounded h-[73px]">
      <p className="font-medium text-xl">Total skor :</p>
      <p className="bg-white py-[13px] px-[24px] rounded-[10px] font-semibold text-xl">
        {typeof score === "number" ? score?.toFixed(2) : "-"}
      </p>
    </div>
  );
}

function RowItemKPI({ data, counter }) {
  const spoilerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <tr key={data.kpi_id} className="rounded-lg">
      <td className="bg-white relative">{counter}</td>
      <td className="bg-white  relative">
        <a
          href={`/smart-plan/kpi/${data?.kpi_id}`}
          className="bg-white text-primary3 font-semibold"
        >
          {data?.nama_kpi}
        </a>
      </td>
      <td className="bg-white ">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center mx-3 ${classNames.wrapper} bg-primary4`}
        >
          <p className="mx-[16px] text-white">{data?.satuan}</p>
        </div>
      </td>
      <td className="bg-white ">{data.polaritas}</td>
      <td className="bg-white  text-start">
        <div className="flex justify-between items-center mb-[9px]">
          <p className="text-base font-semibold text-text1">Rumus</p>
          <button
            type="button"
            onClick={() => {
              spoilerRef?.current?.click();
              setIsOpen(!isOpen);
            }}
          >
            <ActionIcon radius="xl" variant="light">
              <Icon
                icon={
                  isOpen
                    ? "akar-icons:chevron-up"
                    : "akar-icons:chevron-down"
                }
              />
            </ActionIcon>
          </button>
        </div>
        <Spoiler controlRef={spoilerRef} maxHeight={50}>
          {data.formula}
        </Spoiler>
      </td>
      <td className="bg-white ">{data.periode_penilaian}</td>
      <td className="bg-white  text-xl font-medium text-primary3">
        {data.bobot}%
      </td>
      <td className="bg-white  text-xl font-medium text-primary3">
        {commify(data?.target_tw) || "None"}
      </td>
      <td className="bg-white  text-xl font-medium text-primary3">
        {commify(data?.realisasi) || "None"}
      </td>
      <td className="bg-white  text-xl font-medium text-primary3">
        {commify(data?.capaian) || "None"}
      </td>
      <td className="bg-white">
        <div className="rounded-full border-2 m-auto border-primary3 h-16 w-16 flex justify-center items-center">
          <p className="text-base font-semibold text-primary3">
            {commify(data.skor_kpi || "None")}
          </p>
        </div>
      </td>
    </tr>
  );
}
