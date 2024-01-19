/* eslint-disable react/jsx-props-no-spreading */
import { Loader, Pagination } from "@mantine/core";
import React, { useState } from "react";
import CourseProgressCard from "../../../Components/Cards/CourseProgressCard";
import NoItems from "../../../Components/Errors/NoItems";
import {
  BASE_PROXY,
  DEVELOPMENT_PLAN_ENDPOINT,
} from "../../../Networks/endpoint";
import { Networks } from "../../../Networks/factory";
import { MANTINE_PAGINATION_STYLES } from "../../../Utils/Constants";

function PanelIDP({ activeTab, employeeNumber }) {
  const [page, setPage] = useState(1);

  const dpService = Networks(BASE_PROXY.developmentPlan);

  const { data, isLoading } = dpService.query(
    DEVELOPMENT_PLAN_ENDPOINT.GET.idp,
    [`idp-landing-${employeeNumber}`, employeeNumber, page],
    {
      enabled: activeTab === "idp",
    },
    {
      params: {
        page,
        size: 2,
        employee_number: employeeNumber,
      },
    },
  );

  if (isLoading) {
    return <Loader className="my-16 mx-auto" />;
  }

  return (
    <div className="flex flex-col gap-5 border rounded-md p-4 min-h-[200px]">
      {data?.idps?.length ? (
        <div className="grid grid-cols-2 gap-5 mt-5">
          {data?.idps?.map((item) => (
            <CourseProgressCard
              key={item?.id}
              name={item?.course_name}
              batchName={item?.course_batch_name}
              careerAspiration={item?.career_asp_name}
              courseType={item?.course_type}
              dateStart={item?.start_date}
              dateEnd={item?.end_date}
              kpis={item?.kpis || []}
              competencies={item?.competencies || []}
              progress={item?.step_status}
              evalLevel={item?.course_eval_lvl}
              // isIDP={item?.is_idp}
              isIDP={!!item?.dp_idp_id} // TODO: Should be dynamic
              dpIdpId={item?.dp_idp_id}
              idpAcceptanceStatus={item?.acceptance_status}
              employeeNumber={employeeNumber}
              maxProgress={item?.max_progress}
            />
          ))}
        </div>
      ) : (
        <NoItems label="IDP tidak ditemukan" />
      )}

      <Pagination
        value={page}
        onChange={setPage}
        total={data?.totalPage || 0}
        className="mx-auto"
        {...MANTINE_PAGINATION_STYLES.default}
      />
    </div>
  );
}

export default PanelIDP;
