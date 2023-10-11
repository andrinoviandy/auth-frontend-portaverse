import NiceModal from "@ebay/nice-modal-react";
import dayjs from "dayjs";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import MODAL_IDS from "../../Components/Modals/modalIds";
import { setDailyQuizStatus } from "../../Configs/Redux/slice";
import {
  BASE_PROXY,
  DAILY_QUIZ_ENDPOINT,
} from "../../Networks/endpoint";
import { Networks } from "../../Networks/factory";
import closeNiceModal from "../../Utils/Helpers/closeNiceModal";
import getUserCookie from "../../Utils/Helpers/getUserCookie";
import hasRole from "../../Utils/Helpers/hasRole";

export default function SyncRoute() {
  const location = useLocation();
  const dispatch = useDispatch();
  const dailyQuizStatus = useSelector((st) => st.quizStatus);
  const quizService = Networks(BASE_PROXY.dailyQuiz);
  const user = getUserCookie();
  const employeeNumber = user?.employee?.employee_number;

  // subcon and vendor not allowed to access daily quiz
  const isSubconOrVendor = hasRole(["SBCN", "VNDR"]);

  // hasDoneTodayQuiz = undefined means there is no quiz today
  const hasDoneTodayQuiz = useMemo(() => {
    if (dailyQuizStatus) {
      const todayStatus =
        dailyQuizStatus?.[
          `${employeeNumber}_${dayjs(new Date()).format(
            "DD-MM-YYYY",
          )}`
        ]?.isCompleted;
      return todayStatus;
    }
    return true;
  }, [
    JSON.stringify(dailyQuizStatus),
    dayjs(new Date()).format("DD-MM-YYYY"),
  ]);

  quizService.query(
    DAILY_QUIZ_ENDPOINT.GET.dailyQuizData,
    [DAILY_QUIZ_ENDPOINT.GET.dailyQuizData],
    {
      enabled: !hasDoneTodayQuiz && !isSubconOrVendor,
      onSuccess: (res) => {
        dispatch(
          setDailyQuizStatus({
            isCompleted: res?.is_completed,
            date: new Date(),
            employeeNumber,
          }),
        );
      },
    },
    {
      params: {},
    },
  );

  useEffect(() => {
    // chech if there is no quiz today
    if (typeof hasDoneTodayQuiz !== "boolean") {
      closeNiceModal(MODAL_IDS.DAILY_QUIZ.END_USER_DO_QUIZ);
    }
    // Check whether user already done quiz or not
    else if (!hasDoneTodayQuiz && !isSubconOrVendor) {
      // if no, popup quiz modal
      NiceModal.show(MODAL_IDS.DAILY_QUIZ.END_USER_DO_QUIZ);
    }
  }, [location.pathname, hasDoneTodayQuiz]);

  return <Outlet />;
}
