import { ModalDef } from "@ebay/nice-modal-react";
import ModalEndUserDailyQuiz from "../../Pages/DailyQuiz/Components/ModalEndUserDailyQuiz";
import Confirmations from "./Confirmations";
import EditFormModal from "./LMS/EditFormModal";
import ModalDeclineExtCourseClaim from "./LMS/ModalDeclineExtCourseClaim";
import ModalKPIFormula from "./TMS/ModalKPIFormula";
import MODAL_IDS from "./modalIds";

export default function ModalPortal() {
  return (
    <>
      {/* GENERAL */}
      <ModalDef
        id={MODAL_IDS.GENERAL.CONFIRMATION}
        component={Confirmations}
      />

      {/* Daily quiz */}
      <ModalDef
        id={MODAL_IDS.DAILY_QUIZ.END_USER_DO_QUIZ}
        component={ModalEndUserDailyQuiz}
      />
      {/* LMS Modals */}
      <ModalDef
        id={MODAL_IDS.LMS.DASHBOARD.DECLINE_EXT_COURSE_CLAIM}
        component={ModalDeclineExtCourseClaim}
      />
      <ModalDef
        id={MODAL_IDS.LMS.GENERAL.CMS_EDIT_FORM}
        component={EditFormModal}
      />

      {/* TMS Modals */}
      <ModalDef
        id={MODAL_IDS.TMS.SMARTPLAN.KPI_FORMULA}
        component={ModalKPIFormula}
      />
    </>
  );
}
