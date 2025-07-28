import { Icon } from "@iconify/react";
import { Loader } from "@mantine/core";
import TextNumberCard from "../../../Components/Cards/TextNumberCard";
import {
  ASSESSMENT_ENDPOINT,
  BASE_PROXY,
} from "../../../Networks/endpoint";
import { Networks } from "../../../Networks/factory";
import toFixedTrim from "../../../Utils/Helpers/toFixedTrim";

export default function PanelBehavior({
  activeTab,
  employeeNumber,
  year,
}) {
  const assessmentService = Networks(BASE_PROXY.assessment);
  const { data, isLoading } = assessmentService.query(
    ASSESSMENT_ENDPOINT.GET.empAssessmentBehavioural(employeeNumber),
    ["eval-behavioral", employeeNumber, year],
    {
      enabled: activeTab === "behavior",
    },
    {
      params: { year: +year },
    },
  );

  if (isLoading) {
    return <Loader className="my-16 mx-auto" />;
  }

  return (
    <div className="flex flex-col rounded-md border">
      <h2 className="font-bold p-5 border-b">
        Penilaian Kinerja Individu Berbasis Perilaku
      </h2>

      <div className="flex flex-col gap-5 p-5">
        <div className="grid grid-cols-2 gap-5 w-full">
          <TextNumberCard
            title="SKOR KINERJA INDIVIDU BERBASIS PERILAKU"
            value={`${toFixedTrim(
              data?.formulated_final_score || 0,
              2,
            )}`}
          />
          <TextNumberCard
            title="SKOR KINERJA INDIVIDU BERBASIS PERILAKU (SKALA LIKERT)"
            value={`${toFixedTrim(data?.final_score || 0, 2)}/${data?.adaptif?.rate_range_end || 6
              }`}
          />
        </div>
        <div className="grid grid-cols-3 gap-5">
          <CoreValueCard
            type="Amanah"
            score={`${toFixedTrim(data?.amanah?.avg_amanah || 0, 2)}`}
          />
          <CoreValueCard
            type="Kolaboratif"
            score={`${toFixedTrim(
              data?.kolaboratif?.avg_kolaboratif || 0,
              2,
            )}`}
          />
          <CoreValueCard
            type="Harmonis"
            score={`${toFixedTrim(
              data?.harmonis?.avg_harmonis || 0,
              2,
            )}`}
          />
          <CoreValueCard
            type="Loyal"
            score={`${toFixedTrim(data?.loyal?.avg_loyal || 0, 2)}`}
          />
          <CoreValueCard
            type="Adaptif"
            score={`${toFixedTrim(
              data?.adaptif?.avg_adaptif || 0,
              2,
            )}`}
          />
          <CoreValueCard
            type="Kompeten"
            score={`${toFixedTrim(
              data?.kompeten?.avg_kompeten || 0,
              2,
            )}`}
          />
        </div>
      </div>
    </div>
  );
}

function CoreValueCard({ type, score }) {
  const coreValue = {
    Amanah: {
      icon: "mdi:puzzle",
      description: "Memegang teguh kepercayaan yang diberikan",
    },
    Kolaboratif: {
      icon: "heroicons:user-group-solid",
      description: "Terus belajar dan mengembangkan kapabilitas",
    },
    Harmonis: {
      icon: "mdi:handshake",
      description: "Saling peduli dan menghargai perbedaan",
    },
    Loyal: {
      icon: "bxs:donate-heart",
      description:
        "Berdedikasi dan mengutamakan kepentingan Bangsa dan Negara",
    },
    Adaptif: {
      icon: "fluent:shield-checkmark-20-filled",
      description:
        "Terus berinovasi dan antusias dalam menggerakkan ataupun menghadapi perubahan",
    },
    Kompeten: {
      icon: "ph:medal-fill",
      description: "Membangun kerjasama yang sinergis",
    },
  };

  return (
    <div className="rounded-md border">
      <div className="relative flex justify-center items-center p-3 bg-bg2 border-b h-[150px]">
        <Icon
          icon={coreValue?.[type]?.icon}
          width={25}
          className="text-primary3 absolute top-3 left-3"
        />
        <p className="text-primary3 text-4xl font-bold font-tertiary m-auto">
          {score || 0}
        </p>
      </div>
      <div className="flex flex-col gap-2 p-3">
        <p className="font-semibold">{type}</p>
        <p className="text-sm">{coreValue?.[type]?.description}</p>
      </div>
    </div>
  );
}
