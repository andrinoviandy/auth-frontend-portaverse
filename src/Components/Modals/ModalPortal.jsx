import { ModalDef } from "@ebay/nice-modal-react";
import FillAssessmentModal from "../../Modules/Assessment/Components/FillAssessmentModal";
import ModalEndUserDailyQuiz from "../../Modules/DailyQuiz/Components/ModalEndUserDailyQuiz";
import ModalAttachAgenda from "../../Modules/DevelopmentPlan/Components/CMCForum/Messaging/ModalAttachAgenda";
import ModalAttachCourse from "../../Modules/DevelopmentPlan/Components/CMCForum/Messaging/ModalAttachCourse";
import ModalAddPICA from "../../Modules/DevelopmentPlan/Components/CMCForum/ModalAddPICA";
import ModalDeclineIDP from "../../Modules/DevelopmentPlan/Components/CMCForum/ModalDeclineIDP";
import ModalUploadAchievementPica from "../../Modules/DevelopmentPlan/Components/CoachingMentoringCounselingCard/ModalUploadAchievementPica";
import ModalEventTalentConfirmation from "../../Modules/DevelopmentPlan/Components/EventTalent/ModalEventTalentConfirmation";
import AwardForm from "../../Modules/DevelopmentPlan/Components/MyProfile/Content/AwardHistory/Form/AwardForm";
import DiciplinaryForm from "../../Modules/DevelopmentPlan/Components/MyProfile/Content/AwardHistory/Form/DiciplinaryForm";
import HistoryAssignmentCommissionForm from "../../Modules/DevelopmentPlan/Components/MyProfile/Content/HistoryAssignment/Form/HistoryAssignmentCommissionForm";
import HistoryAssignmentForm from "../../Modules/DevelopmentPlan/Components/MyProfile/Content/HistoryAssignment/Form/HistoryAssignmentForm";
import HistoryEducationForm from "../../Modules/DevelopmentPlan/Components/MyProfile/Content/HistoryPositionEducation/Form/HistoryEducationForm";
import HistoryPositionForm from "../../Modules/DevelopmentPlan/Components/MyProfile/Content/HistoryPositionEducation/Form/HistoryPositionForm";
import BadgeForm from "../../Modules/DevelopmentPlan/Components/MyProfile/Content/ReceivedBadges/BadgeForm";
import ResumeEducationForm from "../../Modules/DevelopmentPlan/Components/MyProfile/Content/Resume/NewForm/ResumeEducationForm";
import ResumeWorkExperienceForm from "../../Modules/DevelopmentPlan/Components/MyProfile/Content/Resume/NewForm/ResumeWorkExperienceForm";
import AddCertificationForm from "../../Modules/DevelopmentPlan/Components/MyProfile/Content/Skills/Form/AddCertificationForm";
import AddSkillsForm from "../../Modules/DevelopmentPlan/Components/MyProfile/Content/Skills/Form/AddSkillsForm";
import CertificationForm from "../../Modules/DevelopmentPlan/Components/MyProfile/Content/TrainingHistory/Form/CertificationForm";
import TieringForm from "../../Modules/DevelopmentPlan/Components/MyProfile/Content/TrainingHistory/Form/TieringForm";
import WorkshopForm from "../../Modules/DevelopmentPlan/Components/MyProfile/Content/TrainingHistory/Form/WorkshopForm";
import {
  ModalAddIDP,
  ModalPreviewIDP,
  ModalReviewIndividualDevelopmentPlan,
} from "../../Modules/DevelopmentPlan/Components/MyTeamDevelopmentPlan";
import ModalKPIPositionStatus from "../../Modules/Headquarter/Molecules/ModalKPIPositionStatus";
import ModalViewAllEmployeeList from "../../Modules/Headquarter/Molecules/ModalViewAllEmployeeList";
import ModalHQEmployeeDetail from "../../Modules/Headquarter/Pages/SmartPlanKPI/HeadquarterEmployeeDetail/ModalHQEmployeeDetail";
import HQAssessmentModal from "../../Modules/NewHeadquarter/Components/HQAssessmentModal";
import ModalEditKPIAttendance from "../../Modules/NewHeadquarter/Components/HQKPIFormulaSetting/ModalEditKPIAttendance";
import ModalEditKPIIndisciplinary from "../../Modules/NewHeadquarter/Components/HQKPIFormulaSetting/ModalEditKPIIndisciplinary";
import ModalUploadAssessment from "../../Modules/NewHeadquarter/Components/ModalUploadAssessment";
import CompanyDetailGroupListModal from "../../Modules/OrganizationManagement/Components/Atoms/Modals/CompanyDetailGroupListModal";
import ModalAddPositionToPositionMaster from "../../Modules/OrganizationManagement/Components/Atoms/Modals/ModalAddPositionToPositionMaster";
import OrganizationMasterDetailModal from "../../Modules/OrganizationManagement/Components/Atoms/Modals/OrganizationMasterDetailModal";
import SmartPlanEditMasterDashboard from "../../Modules/OrganizationManagement/Components/Atoms/Modals/SmartPlanEditMasterDashboard";
import ModalEmployeeList from "../../Modules/OrganizationManagement/Components/CurrentStructureDetail/ModalEmployeeList";
import ModalJobfamList from "../../Modules/OrganizationManagement/Components/CurrentStructureDetail/ModalJobfamList";
import Modal9Boxes from "../../Modules/PromotionRotation/Components/Modal9Boxes";
import ModalCPCAddEmployee from "../../Modules/PromotionRotation/Components/ModalCPCAddEmployee";
import ModalDetail9Boxes from "../../Modules/PromotionRotation/Components/ModalDetail9Boxes";
import ModalSpiderWeb from "../../Modules/PromotionRotation/Components/ModalSpiderWeb";
import ChooseSubconFormModal from "../../Modules/RoleManagement/Components/Modals/ChooseSubconFormModal";
import ChooseVendorFormModal from "../../Modules/RoleManagement/Components/Modals/ChooseVendorFormModal";
import ChooseExKPIModal from "../../Modules/SmartPlan/Components/Atoms/Modals/ChooseExKPIModal";
import ChooseExKPIModalDetail from "../../Modules/SmartPlan/Components/Atoms/Modals/ChooseExKPIModalDetail";
import ChooseSuperiorModal from "../../Modules/SmartPlan/Components/Atoms/Modals/ChooseSuperiorModal";
import ModalSmartPlanInsertKPIScoreModalChoose from "../../Modules/SmartPlan/Components/Atoms/Modals/InsertKPIScoreModal/ModalSmartPlanInsertKPIScoreModalChoose";
import SmartPlanCommentFormModal from "../../Modules/SmartPlan/Components/Atoms/Modals/SmartPlanCommentFormModal";
import SmartPlanDetailScoreModal from "../../Modules/SmartPlan/Components/Atoms/Modals/SmartPlanDetailScoreModal";
import SmartPlanEmployeeCommonKPIUploadFormModal from "../../Modules/SmartPlan/Components/Atoms/Modals/SmartPlanEmployeeCommonKPIUploadFormModal";
import SmartplanFileForm from "../../Modules/SmartPlan/Components/Atoms/Modals/SmartPlanFileFormModal";
import SmartPlanNotesPerKPIFormModal from "../../Modules/SmartPlan/Components/Atoms/Modals/SmartPlanNotesPerKPIFormModal";
import SmartPlanPlanningUploadFormModal from "../../Modules/SmartPlan/Components/Atoms/Modals/SmartPlanPlanningUploadFormModal";
import SmartPlanReplaceSuperiorUploadFormModal from "../../Modules/SmartPlan/Components/Atoms/Modals/SmartPlanReplaceSuperiorUploadFormModal";
import SmartPlanScheduleForm from "../../Modules/SmartPlan/Components/Atoms/Modals/SmartPlanScheduleForm";
import SmartPlanSyncronizationPositionMaster from "../../Modules/SmartPlan/Components/Atoms/Modals/SmartPlanSyncronizationPositionMaster";
import ModalKPIFormula from "../../Modules/SmartPlan/Components/Molecules/KPIDetail/ModalKPIFormula";
import ModalKPITarget from "../../Modules/SmartPlan/Components/Molecules/KPIDetail/ModalKPITarget";
import Confirmations from "./Confirmations";
import MODAL_IDS from "./modalIds";

export default function ModalPortal() {
  return (
    <>
      {/* GENERAL */}
      <ModalDef
        id={MODAL_IDS.GENERAL.CONFIRMATION}
        component={Confirmations}
      />
      {/* KPI Modules */}
      <ModalDef
        id={MODAL_IDS.SMARTPLAN.FILE_FORM}
        component={SmartplanFileForm}
      />
      <ModalDef
        id={MODAL_IDS.SMARTPLAN.CHOOSE_SUPERIOR}
        component={ChooseSuperiorModal}
      />
      <ModalDef
        id={MODAL_IDS.SMARTPLAN.COMMENT_FORM}
        component={SmartPlanCommentFormModal}
      />
      <ModalDef
        id={MODAL_IDS.SMARTPLAN.NOTES_PER_KPI_FORM}
        component={SmartPlanNotesPerKPIFormModal}
      />
      <ModalDef
        id={MODAL_IDS.SMARTPLAN.CHOOSE_EX_KPI_MODAL}
        component={ChooseExKPIModal}
      />
      <ModalDef
        id={MODAL_IDS.SMARTPLAN.CHOOSE_EX_KPI_MODAL_DETAIL}
        component={ChooseExKPIModalDetail}
      />
      <ModalDef
        id={MODAL_IDS.SMARTPLAN.KPI_FORMULA}
        component={ModalKPIFormula}
      />
      <ModalDef
        id={MODAL_IDS.SMARTPLAN.KPI_TARGET}
        component={ModalKPITarget}
      />
      <ModalDef
        id={MODAL_IDS.SMARTPLAN.DETAIL_SCORE}
        component={SmartPlanDetailScoreModal}
      />
      <ModalDef
        id={MODAL_IDS.SMARTPLAN.SYNCRONIZATION_POSITION_MASTER}
        component={SmartPlanSyncronizationPositionMaster}
      />
      <ModalDef
        id={MODAL_IDS.SMARTPLAN.INSERT_SCORE_KPI}
        component={ModalSmartPlanInsertKPIScoreModalChoose}
      />
      {/* Assessment Modules */}
      <ModalDef
        id={MODAL_IDS.ASSESSMENT.FILL_ASSESSMENT}
        component={FillAssessmentModal}
      />
      {/* HQ Modules */}
      <ModalDef
        id={MODAL_IDS.SMARTPLAN.SCHEDULE_FORM}
        component={SmartPlanScheduleForm}
      />
      <ModalDef
        id={MODAL_IDS.SMARTPLAN.PLANNING_UPLOAD_FORM}
        component={SmartPlanPlanningUploadFormModal}
      />
      <ModalDef
        id={MODAL_IDS.SMARTPLAN.EMPLOYEE_COMMON_KPI_UPLOAD_FORM}
        component={SmartPlanEmployeeCommonKPIUploadFormModal}
      />
      <ModalDef
        id={MODAL_IDS.SMARTPLAN.SUPERIOR_REPLACEMENT_UPLOAD_FORM}
        component={SmartPlanReplaceSuperiorUploadFormModal}
      />
      <ModalDef
        id={MODAL_IDS.HEADQUARTER.UPLOAD_ASSESSMENT}
        component={ModalUploadAssessment}
      />
      <ModalDef
        id={MODAL_IDS.HEADQUARTER.ASSESSMENT_DASHBOARD_MODAL}
        component={HQAssessmentModal}
      />
      <ModalDef
        id={MODAL_IDS.HEADQUARTER.KPI_EDIT_INDISCIPLINARY}
        component={ModalEditKPIIndisciplinary}
      />
      <ModalDef
        id={MODAL_IDS.HEADQUARTER.KPI_EDIT_ATTENDANCE}
        component={ModalEditKPIAttendance}
      />
      <ModalDef
        id={MODAL_IDS.HEADQUARTER.KPI_POSITION_AND_STATUS}
        component={ModalKPIPositionStatus}
      />
      {/* Development Plan Module */}
      <ModalDef
        id={MODAL_IDS.DEVELOPMENT_PLAN.ATTACH_AGENDA}
        component={ModalAttachAgenda}
      />
      <ModalDef
        id={MODAL_IDS.DEVELOPMENT_PLAN.ATTACH_COURSE}
        component={ModalAttachCourse}
      />
      <ModalDef
        id={MODAL_IDS.EVENT.EVENT_TALENT}
        component={ModalEventTalentConfirmation}
      />{" "}
      <ModalDef
        id={MODAL_IDS.ASSESSMENT.DETAIL_LIST_EMPLOYEE}
        component={ModalViewAllEmployeeList}
      />
      <ModalDef
        id={MODAL_IDS.DEVELOPMENT_PLAN.ADD_PICA}
        component={ModalAddPICA}
      />
      <ModalDef
        id={MODAL_IDS.DEVELOPMENT_PLAN.UPLOAD_ACHIEVEMENT_PICA}
        component={ModalUploadAchievementPica}
      />
      <ModalDef
        id={MODAL_IDS.DEVELOPMENT_PLAN.DECLINE_IDP}
        component={ModalDeclineIDP}
      />
      <ModalDef
        id={MODAL_IDS.DEVELOPMENT_PLAN.REVIEW_IDP}
        component={ModalReviewIndividualDevelopmentPlan}
      />
      <ModalDef
        id={MODAL_IDS.DEVELOPMENT_PLAN.ADD_IDP}
        component={ModalAddIDP}
      />
      <ModalDef
        id={MODAL_IDS.DEVELOPMENT_PLAN.PREVIEW_IDP}
        component={ModalPreviewIDP}
      />
      <ModalDef
        id={MODAL_IDS.DEVELOPMENT_PLAN.SUBORDINATE_LIST}
        component={ModalEmployeeList}
      />
      <ModalDef
        id={MODAL_IDS.DEVELOPMENT_PLAN.JOBFAM_LIST}
        component={ModalJobfamList}
      />
      {/* Employee Modules */}
      <ModalDef
        id={MODAL_IDS.EMPLOYEE.RESUME_EDUCATION_FORM}
        component={ResumeEducationForm}
      />
      <ModalDef
        id={MODAL_IDS.EMPLOYEE.RESUME_WORK_EXPERIENCE_FORM}
        component={ResumeWorkExperienceForm}
      />
      <ModalDef
        id={
          MODAL_IDS.EMPLOYEE
            .EMPLOYEE_ADD_EMPLOYEE_CERT_TRAINING_HISTORY
        }
        component={CertificationForm}
      />
      <ModalDef
        id={
          MODAL_IDS.EMPLOYEE.EMPLOYEE_ADD_EMPLOYEE_WS_TRAINING_HISTORY
        }
        component={WorkshopForm}
      />
      <ModalDef
        id={
          MODAL_IDS.EMPLOYEE
            .EMPLOYEE_ADD_EMPLOYEE_TIER_TRAINING_HISTORY
        }
        component={TieringForm}
      />
      <ModalDef
        id={
          MODAL_IDS.EMPLOYEE
            .EMPLOYEE_ADD_EMPLOYEE_DICIPLINARY_AWARD_HISTORY
        }
        component={DiciplinaryForm}
      />
      <ModalDef
        id={MODAL_IDS.EMPLOYEE.EMPLOYEE_ADD_EMPLOYEE_AWARD_HISTORY}
        component={AwardForm}
      />
      <ModalDef
        id={MODAL_IDS.EMPLOYEE.HISTORY_POSITION_FORM}
        component={HistoryPositionForm}
      />
      <ModalDef
        id={MODAL_IDS.EMPLOYEE.HISTORY_EDUCATION_FORM}
        component={HistoryEducationForm}
      />
      <ModalDef
        id={MODAL_IDS.EMPLOYEE.HISTORY_ASSIGNMENT_FORM}
        component={HistoryAssignmentForm}
      />
      <ModalDef
        id={MODAL_IDS.EMPLOYEE.HISTORY_ASSIGNMENT_COMMISION_FORM}
        component={HistoryAssignmentCommissionForm}
      />
      <ModalDef
        id={MODAL_IDS.EMPLOYEE.EMPLOYEE_ADD_BADGE}
        component={BadgeForm}
      />
      <ModalDef
        id={MODAL_IDS.EMPLOYEE.EMPLOYEE_ADD_SKILL}
        component={AddSkillsForm}
      />
      <ModalDef
        id={MODAL_IDS.EMPLOYEE.EMPLOYEE_ADD_CERTIFICATION}
        component={AddCertificationForm}
      />
      {/* PROMOTION & ROTATION Module */}
      <ModalDef
        id={MODAL_IDS.PROMOTION_ROTATION.EMPLOYEE_NINE_BOXES}
        component={Modal9Boxes}
      />
      <ModalDef
        id={MODAL_IDS.PROMOTION_ROTATION.EMPLOYEE_SPIDERWEB}
        component={ModalSpiderWeb}
      />
      <ModalDef
        id={MODAL_IDS.PROMOTION_ROTATION.NINEBOXES_DETAIL}
        component={ModalDetail9Boxes}
      />
      <ModalDef
        id={MODAL_IDS.PROMOTION_ROTATION.CPC_ADD_EMPLOYEE}
        component={ModalCPCAddEmployee}
      />
      {/* Role Management Module */}
      <ModalDef
        id={MODAL_IDS.ROLE_MANAGEMENT.CHOOSE_VENDOR}
        component={ChooseVendorFormModal}
      />
      <ModalDef
        id={MODAL_IDS.ROLE_MANAGEMENT.CHOOSE_SUBCON}
        component={ChooseSubconFormModal}
      />
      {/* Organization Management Module */}
      <ModalDef
        id={
          MODAL_IDS.ORGANIZATION_MANAGEMENT.ORGANIZATION_MASTER_DETAIL
        }
        component={OrganizationMasterDetailModal}
      />
      <ModalDef
        id={
          MODAL_IDS.ORGANIZATION_MANAGEMENT.EDIT_ORGANIZATION_MASTER
        }
        component={SmartPlanEditMasterDashboard}
      />
      <ModalDef
        id={
          MODAL_IDS.ORGANIZATION_MANAGEMENT.COMPANY_DETAIL_GROUP_LIST
        }
        component={CompanyDetailGroupListModal}
      />
      <ModalDef
        id={
          MODAL_IDS.ORGANIZATION_MANAGEMENT
            .ADD_POSITION_TO_POSITION_MASTER
        }
        component={ModalAddPositionToPositionMaster}
      />
      <ModalDef
        id={MODAL_IDS.HEADQUARTER.HQ_EMPLOYEE_DETAIL}
        component={ModalHQEmployeeDetail}
      />
      {/* Daily quiz */}
      <ModalDef
        id={MODAL_IDS.DAILY_QUIZ.END_USER_DO_QUIZ}
        component={ModalEndUserDailyQuiz}
      />
    </>
  );
}
