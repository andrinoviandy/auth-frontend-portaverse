import NiceModal from "@ebay/nice-modal-react";
import { useState } from "react";
import Badge from "../../../Components/Badge";
import MODAL_IDS from "../../../Components/Modals/modalIds";
import Profile from "../../../Components/Profile/Profile";
import ScrollableTableTemplate from "../../../Components/Table/ScrollableTableTemplate";
import {
  BASE_PROXY,
  SMARTPLAN_ENDPOINT,
} from "../../../Networks/endpoint";
import { Networks } from "../../../Networks/factory";

export default function PanelKPI({ activeTab, year }) {
  const period = "IV";
  const [type, setType] = useState("job_sharing");
  const types = ["job_sharing", "jabatan_utama"];

  const smartplanService = Networks(BASE_PROXY.smartplan);
  const { data, isLoading } = smartplanService.query(
    SMARTPLAN_ENDPOINT.GET.yearlyEvalKPI,
    ["eval-kpi"],
    {
      enabled: activeTab === "kpi",
      select: (res) => ({
        mutation: res?.jabatan_utama?.[0]?.detail,
        job_sharing: res?.job_sharing?.[0]?.detail,
        jabatan_utama: res?.jabatan_utama?.[0]?.detail,
      }),
    },
  );

  // if (isLoading) {
  //   return <Loader className="my-16 mx-auto" />;
  // }

  return (
    <div className="flex flex-col rounded-md border">
      {types.map((type) => (
        <>
          <h2 className="font-bold p-5 border-b">
            Penilaian Kinerja Individu Berbasis KPI - TW {period}{" "}
            <span className="text-darkGrey font-semibold">
              (Atasan : {data?.[type]?.employee_atasan?.name || "-"})
            </span>
          </h2>

          <div className="flex flex-col gap-5 p-5">
            {/* <Tabs
          value={type}
          onTabChange={setType}
          variant="pills"
          sx={MANTINE_TAB_STYLES.pill.sx}
        >
          <Tabs.List>
            <Tabs.Tab
              sx={MANTINE_TAB_STYLES.pill.sxChild}
              value="job_sharing"
            >
              Job Sharing
            </Tabs.Tab>
            <Tabs.Tab
              sx={MANTINE_TAB_STYLES.pill.sxChild}
              value="mutation"
            >
              Mutasi
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>

        <div className="grid grid-cols-2 gap-5 w-full">
          <TextNumberCard
            title="TOTAL BOBOT"
            value={data?.[type]?.total_bobot || 0}
          />
          <TextNumberCard
            title="TOTAL KINERJA"
            value={data?.[type]?.total_kinerja || 0}
          />
        </div> */}

            <div className="flex gap-3 items-center font-semibold">
              <p className="text-lg">Atasan Langsung</p>
              <Badge
                value={
                  type === "job_sharing"
                    ? "Job Sharing"
                    : "Jabatan Utama"
                }
              />
            </div>

            <Profile
              alt="avatar"
              name={data?.[type]?.employee_atasan?.name}
              img={null} // TODO: Integrate this
              subName={null} // TODO: Integrate this
              classNames={{ root: "border w-fit p-3 rounded-md" }}
            />

            <ScrollableTableTemplate
              width="fit"
              variant="outline"
              maxHeight="60vh"
              infiniteScroll
              classNames={{
                table: "w-max",
              }}
              isNoItem={!data?.[type]?.kpis?.length}
              noItemLabel="Data KPI tidak ditemukan"
              tHeads={
                <>
                  <tr>
                    <th
                      rowSpan={2}
                      className="bg-white w-[20px] sticky left-0"
                    >
                      No
                    </th>
                    <th
                      rowSpan={2}
                      className="bg-white w-[300px] sticky left-[calc(20px+1.55rem)]"
                    >
                      KPI
                    </th>
                    <th rowSpan={2}>Satuan</th>
                    <th rowSpan={2}>Polaritas</th>
                    <th rowSpan={2}>Formula</th>
                    <th rowSpan={2}>Periode Monitoring</th>
                    <th rowSpan={2}>Target TW {period}</th>
                    <th rowSpan={2}>Bobot</th>
                    <th rowSpan={1} colSpan={3}>
                      <p className="text-center border-b pb-2">
                        Evaluasi
                      </p>
                    </th>
                  </tr>
                  <tr>
                    <th>Target</th>
                    <th>Realisasi</th>
                    <th>Skor</th>
                  </tr>
                </>
              }
              tRows={
                <>
                  {data?.[type]?.kpis?.map((item, i) => (
                    <tr key={item?.kpi_id}>
                      <td className="bg-white w-[20px] sticky left-0 font-semibold text-primary3">
                        {i + 1}
                      </td>
                      <td className="bg-white w-[300px] sticky left-[calc(20px+1.55rem)]">
                        {item?.nama_kpi || "-"}
                      </td>
                      <td>{item?.satuan || "-"}</td>
                      <td>{item?.polaritas || "-"}</td>
                      <td>
                        <button
                          type="button"
                          className="text-primary3 font-bold w-fit text-start"
                          onClick={() =>
                            NiceModal.show(
                              MODAL_IDS.TMS.SMARTPLAN.KPI_FORMULA,
                              {
                                value: item?.formula || "",
                              },
                            )
                          }
                        >
                          Lihat Detail
                        </button>
                      </td>
                      <td>{item?.periode_monitoring || "-"}</td>
                      <td>{item?.target_tw || "-"}</td>
                      <td>{item?.bobot || "-"}</td>
                      <td>{item?.target || "-"}</td>
                      <td>{item?.realisasi || "-"}</td>
                      <td>{item?.skor || "-"}</td>
                    </tr>
                  ))}
                  {!!data?.[type]?.kpis?.length && (
                    <tr className="bg-bg3 font-semibold">
                      <td />
                      <td />
                      <td />
                      <td />
                      <td />
                      <td />
                      <td />
                      <td />
                      <td />
                      <td>Total Kinerja</td>
                      <td>
                        {data?.[type]?.kpis?.reduce(
                          (acc, curr) =>
                            (acc?.skor || 0) + (curr?.skor || 0),
                          0,
                        )}
                      </td>
                    </tr>
                  )}
                </>
              }
            />
          </div>
        </>
      ))}
    </div>
  );
}
