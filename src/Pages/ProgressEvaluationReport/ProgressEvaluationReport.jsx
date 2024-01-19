import { Tabs } from "@mantine/core";
import { useState } from "react";
import YearlyPicker from "../../Components/CustomInputs/DateDropdown/YearlyPicker";
import NewNavbar from "../../Components/NewNavbar/NewNavbar";
import { MANTINE_TAB_STYLES } from "../../Utils/Constants";
import getUserCookie from "../../Utils/Helpers/getUserCookie";
import PanelBehavior from "./Panels/PanelBehavior";
import PanelIDP from "./Panels/PanelIDP";
import PanelKPI from "./Panels/PanelKPI";
import PanelPICA from "./Panels/PanelPICA";
import PanelPerformance from "./Panels/PanelPerformance";

export default function ProgressEvaluationReport() {
  const user = getUserCookie();
  const employeeNumber = user?.employee?.employee_number;
  const [activeTab, setActiveTab] = useState("performance");
  const currYear = new Date().getFullYear();
  const [year, setYear] = useState(currYear);

  return (
    <div className="flex flex-col">
      <NewNavbar />

      <section className="flex flex-col gap-5 py-5 px-[5rem]">
        <div className="flex justify-between items-center">
          <h1 className="font-bold font-tertiary">
            Progress Evaluation Report
          </h1>
          <YearlyPicker
            placeholder="Pilih Tahun"
            value={year}
            onChange={setYear}
            maxYear={currYear}
          />
        </div>
        <Tabs
          value={activeTab}
          onTabChange={setActiveTab}
          radius="lg"
          sx={MANTINE_TAB_STYLES.default.sx}
        >
          <Tabs.List>
            <Tabs.Tab
              sx={MANTINE_TAB_STYLES.default.sxChild}
              value="performance"
            >
              Nilai Kinerja
            </Tabs.Tab>
            <Tabs.Tab
              sx={MANTINE_TAB_STYLES.default.sxChild}
              value="kpi"
            >
              KPI Individu
            </Tabs.Tab>
            <Tabs.Tab
              sx={MANTINE_TAB_STYLES.default.sxChild}
              value="behavior"
            >
              Perilaku Individu
            </Tabs.Tab>
            <Tabs.Tab
              sx={MANTINE_TAB_STYLES.default.sxChild}
              value="pica"
            >
              PICA
            </Tabs.Tab>
            {/* <Tabs.Tab
              sx={MANTINE_TAB_STYLES.default.sxChild}
              value="idp"
            >
              IDP
            </Tabs.Tab> */}
          </Tabs.List>

          <Tabs.Panel value="performance" pt="xs">
            <PanelPerformance activeTab={activeTab} year={year} />
          </Tabs.Panel>

          <Tabs.Panel value="kpi" pt="xs">
            <PanelKPI activeTab={activeTab} year={year} />
          </Tabs.Panel>

          <Tabs.Panel value="behavior" pt="xs">
            <PanelBehavior
              activeTab={activeTab}
              employeeNumber={employeeNumber}
              year={year}
            />
          </Tabs.Panel>

          <Tabs.Panel value="pica" pt="xs">
            <PanelPICA
              activeTab={activeTab}
              employeeNumber={employeeNumber}
              year={year}
            />
          </Tabs.Panel>

          <Tabs.Panel value="idp" pt="xs">
            <PanelIDP
              activeTab={activeTab}
              employeeNumber={employeeNumber}
              year={year}
            />
          </Tabs.Panel>
        </Tabs>
      </section>
    </div>
  );
}
