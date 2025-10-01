/* eslint-disable import/prefer-default-export */
/* eslint-disable react-hooks/exhaustive-deps */

import { useMemo, useState } from "react";
import {
  BASE_PROXY,
  DEVELOPMENT_PLAN_ENDPOINT,
  SMARTPLAN_ENDPOINT,
} from "../../Networks/endpoint";
// ! TEMP USE ET TIME TRAVEL DEVELOPMENT PLAN, ROLLBACK LATER
import { Networks } from "../../Networks/et-time-travel-factory";
import getUserCookie from "../Helpers/getUserCookie";

export function useGetSentStatus() {
  const employeeNumber = getUserCookie()?.employee?.employee_number;
  const kpiService = Networks(BASE_PROXY.smartplan);
  const { data: positions, isLoading: isLoadingPositions } =
    kpiService.query(
      SMARTPLAN_ENDPOINT.GET.getAllPosition,
      [SMARTPLAN_ENDPOINT.GET.getAllPosition],
      {
        select: (res) => {
          return res?.positions?.map((pos) => ({
            value: pos?.value || "-1",
            label: pos?.job_name,
            position_id: pos?.position_id,
            position_master_variant_id:
              pos?.position_master_variant_id,
          }));
        },
      },
      {
        params: {
          is_atasan_view: false,
        },
      },
    );

  const mainPositionVariantId = useMemo(() => {
    if (positions?.length) {
      return positions[0]?.position_master_variant_id || -1;
    }
    return -1;
  }, [JSON.stringify(positions)]);

  const developmentPlanService = Networks(BASE_PROXY.developmentPlan);
  const { data: ecaSentStatus } = developmentPlanService.query(
    DEVELOPMENT_PLAN_ENDPOINT.GET.getCaSentStatus(
      mainPositionVariantId || -1,
      "ECA",
    ),
    [
      DEVELOPMENT_PLAN_ENDPOINT.GET.getCaSentStatus(
        mainPositionVariantId || -1,
        "ECA",
      ),
      mainPositionVariantId,
      employeeNumber,
      isLoadingPositions,
    ],
    {
      enabled: !!(
        mainPositionVariantId ||
        (employeeNumber && !isLoadingPositions)
      ),
    },
    {
      params: {
        employee_number: employeeNumber,
      },
    },
  );

  const { data: sucaSentStatus } = developmentPlanService.query(
    DEVELOPMENT_PLAN_ENDPOINT.GET.getCaSentStatus(
      mainPositionVariantId || -1,
      "SUCA",
    ),
    [
      DEVELOPMENT_PLAN_ENDPOINT.GET.getCaSentStatus(
        mainPositionVariantId || -1,
        "SUCA",
      ),
      mainPositionVariantId,
      employeeNumber,
      isLoadingPositions,
    ],
    {
      enabled: !!(
        mainPositionVariantId ||
        (employeeNumber && !isLoadingPositions)
      ),
    },
    {
      params: {
        employee_number: employeeNumber,
      },
    },
  );

  const [macaSentStatus, setMacaSentStatus] = useState({});

  const hasSentAllMaca = useMemo(() => {
    return positions?.every(
      (pos) =>
        macaSentStatus?.[pos?.position_master_variant_id]
          ?.sent_status === "SENT",
    );
  }, [positions, macaSentStatus]);

  return {
    positions,
    isLoadingPositions,
    mainPositionVariantId,
    ecaSentStatus,
    sucaSentStatus,
    macaSentStatus,
    hasSentAllMaca,
    setMacaSentStatus,
  };
}
