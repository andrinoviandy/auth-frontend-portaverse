import {
  BASE_PROXY,
  DEVELOPMENT_PLAN_ENDPOINT,
} from "../../Networks/endpoint";
// ! TEMP USE ET TIME TRAVEL DEVELOPMENT PLAN, ROLLBACK LATER
import { Networks } from "../../Networks/et-time-travel-factory";

/* eslint-disable import/prefer-default-export */
export function MacaPositionSentStatusFetcher({
  variantId,
  setCaStatus = () => null,
  employeeNumber,
}) {
  const developmentPlanService = Networks(BASE_PROXY.developmentPlan);
  developmentPlanService.query(
    DEVELOPMENT_PLAN_ENDPOINT.GET.getCaSentStatus(variantId, "MACA"),
    [
      DEVELOPMENT_PLAN_ENDPOINT.GET.getCaSentStatus(
        variantId,
        "MACA",
      ),
      variantId,
      employeeNumber,
    ],
    {
      enabled: !!variantId,
      onSuccess: (res) => {
        setCaStatus(res);
      },
    },
    {
      params: {
        employee_number: employeeNumber,
      },
    },
  );

  return <div />;
}
