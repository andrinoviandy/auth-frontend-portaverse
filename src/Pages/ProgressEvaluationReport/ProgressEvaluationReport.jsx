import { Tabs } from "@mantine/core";
import { useState } from "react";
import { useParams } from "react-router-dom";

import PanelBehavior from "./Panels/PanelBehavior";
import PanelKPI from "./Panels/PanelKPI";
import PanelPerformance from "./Panels/PanelPerformance";
import PanelPICA from "./Panels/PanelPICA";
import YearlyPicker from "../../Components/CustomInputs/DateDropdown/YearlyPicker";
import Navbar from "../../Components/Navbar";
import getUserCookie from "../../Utils/Helpers/getUserCookie";

export default function ProgressEvaluationReport() {
  const { employeeId } = useParams();

  const employeeIdParams = employeeId ? atob(employeeId) : null;

  const user = getUserCookie();
  const employeeNumber =
    employeeIdParams || user?.employee?.employee_number;
  const [activeTab, setActiveTab] = useState("performance");
  const currYear = new Date().getFullYear() - 1;
  const [year, setYear] = useState(null);

  return (
    <div className="flex flex-col">
      {/* // TODO: Replace NewNavbar with Navbar if development is on ILCS env (GitLab) */}
      <Navbar />
      {/* <NewNavbar /> */}

      <section className="flex flex-col gap-5 px-20 py-5">
        <div className="flex items-center justify-between">
          <h1 className="font-tertiary font-bold">
            Progress Evaluation Report
          </h1>
          <YearlyPicker
            placeholder="Pilih Tahun"
            value={year}
            onChange={setYear}
            maxYear={currYear}
          />
        </div>
        <Tabs value={activeTab} onChange={setActiveTab} radius="lg">
          <Tabs.List>
            <Tabs.Tab value="performance">Nilai Kinerja</Tabs.Tab>
            <Tabs.Tab value="kpi">KPI Individu</Tabs.Tab>
            <Tabs.Tab value="behavior">Perilaku Individu</Tabs.Tab>
            <Tabs.Tab value="pica">PICA</Tabs.Tab>
            {/* <Tabs.Tab

              value="idp"
            >
              IDP
            </Tabs.Tab> */}
          </Tabs.List>

          <Tabs.Panel value="performance" pt="xs">
            <PanelPerformance
              activeTab={activeTab}
              year={year || currYear}
              employeeNumber={employeeNumber}
            />
          </Tabs.Panel>

          <Tabs.Panel value="kpi" pt="xs">
            <PanelKPI
              activeTab={activeTab}
              year={year || currYear}
              employeeNumber={employeeNumber}
            />
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
              year={year || currYear}
            />
          </Tabs.Panel>

          {/* <Tabs.Panel value="idp" pt="xs">
            <PanelIDP
              activeTab={activeTab}
              employeeNumber={employeeNumber}
              year={year}
            />
          </Tabs.Panel> */}
        </Tabs>
      </section>
    </div>
  );
}
