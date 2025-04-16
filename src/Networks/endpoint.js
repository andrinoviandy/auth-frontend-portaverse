export const BASE_PROXY = {
  cms: "/api/cms/v1",
  repository: "/api/repository/v1",
  groups: "/api/groups/v1",
  hq: "/api/hq/v1",
  positions: "/api/positions/v1",
  kmap: "/api/kmap/v1",
  auth: "/api/sso/v1",
  assessment: "/api/assessment/v1",
  gamification: "/api/gamification/v1",
  employees: "/api/employees/v1",
  skills: "/api/skills/v1",
  social: "/api/social/v1",
  cop: "/api/cop/v1",
  badges: "/api/badges/v1",
  forum: "/api/forum/v1",
  notifications: "/api/notifications/v1",
  smartplan: "/api/smartplan/v1",
  course: "/api/course/v1",
  signature: "/api/signature/v1",
  searchEngine: "/api/search-engine/v1",
  dailyQuiz: "/api/daily-quiz/v1",
  developmentPlan: "/api/development-plan/v1",
  innovation: "/api/innovation/v1",
};

export const KMAP_ENDPOINT = {
  GET: {
    importantKnowledges: "/kmap/other/ik",
    kmapGroups: "/kmap-group",
    kmapGroup: (id) => `/kmap-group/${id}`,
    kmapOrgOrGroupDetailByID: (id) =>
      `/kmap-group/v2/get-group/${id}`,
  },
  POST: {
    kmapGroup: "/kmap-group",
  },
  PUT: {
    kmapGroup: (id) => `/kmap-group/${id}`,
  },
  DELETE: {
    kmapGroup: (id) => `/kmap-group/${id}`,
  },
};

export const GROUPS_ENDPOINT = {
  GET: {
    privilleges: "/privilege/other/user-status",
    allGroups: "/groups",
    group: (id) => `/groups/${id}`,
  },
};

export const POSITIONS_ENDPOINT = {
  GET: {
    allPositions: "/position",
  },
};

export const HQ_ENDPOINT = {
  GET: {
    rolesSum: "/hq-user-manage/role-data",
    groupSum: "/hq-group-manage/count-group",
    userManagement: "/hq-user-manage/user-data",
    groupManagement: "/hq-group-manage/group-data",
    reportManagement: "/hq-report/repo",
    logActivity: "/hq-log-activity/log-activity",
    groupDetail: (groupId) =>
      `/hq-group-manage/detail-group/${groupId}`,
    userInGroup: (groupId) =>
      `/hq-group-manage/detail-group/user-in-group/${groupId}`,
  },
  PUT: {
    repoReport: (repoId) => `/hq-report/repo/${repoId}`,
  },
};

export const NOTIFICATION_ENDPOINT = {
  GET: {
    notifications: "/notification",
    unreadCount: "/notification/other/unread",
    notificationModules: "/notification/other/modules",
  },
  PUT: {
    markAsRead: (notificationId) =>
      `/notification/${notificationId}/read-mark`,
    allMarkAsRead: "/notification/other/all-read-mark",
    pinnedNotif: (notificationId) =>
      `/notification/${notificationId}/pin`,
    putReads: "/notification/other/reads",
    aceptableActionNotif: (notificationId) =>
      `/notification/${notificationId}/acceptance-status`,
  },
  DELETE: {
    deleteNotification: (notificationId) =>
      `/notification/${notificationId}`,
  },
};

export const AUTH_ENDPOINT = {
  POST: {
    logout: "/auth/logout",
    refer: "/auth/referal",
  },
};

export const SMARTPLAN_ENDPOINT = {
  GET: {
    kpiScore: "/landing/score",
    remainingTime: "/landing/remaining-time",
    landingBanner: "/landing-banner",
    yearlyEvalKPI: "/yearly-evaluation/kpi",
    pica: "/pica",
    kpi: "/kpi/list",
    qualFeedback: "/pica/qual-idp",
    getFinalScore: "/kpi/final-score",
    getAllPosition: "/lakhar/lakhar-jobsharing/positions",
  },
};
export const SMARTPLAN_ENDPOINT_V2 = {
  GET: {
    loggedInAdminEmployees: "/v2/hq/logged-in-admin-employees",
  },
};

export const COP_ENDPOINT = {
  GET: {
    tags: "/cops/others/tags",
    coreMembers: (copId) => `/cops/core-members/${copId}`,
    agendaDocs: (agendaId) =>
      `/documents/document-by-agenda/${agendaId}`,
    copDocs: (copId) => `/cops/${copId}/documentations`,
  },
  POST: {
    agendaDocuments: (agendaId) => `/agendas/${agendaId}/documents`,
    copDocuments: (copId) => `/cops/${copId}/documentations`,
  },
};

export const EMPLOYEES_ENDPOINT = {
  GET: {
    resume: (employeeId) => `/employee/${employeeId}/resume`,
    allEmployees: "/employee",
    workInformation: (employeeId) =>
      `/employee/${employeeId}/work-information`,
    privateInformation: (employeeId) =>
      `/employee/${employeeId}/private-information`,
    profileDetail: (employeeId) => `/employee/${employeeId}/profile`,
    positionHistory: (employeeId) =>
      `/employee/position-history/${employeeId}`,
    assignmentHistory: (employeeId) =>
      `/employee/assignment-pelindo/${employeeId}`,
    assignmentCommissionHistory: (employeeId) =>
      `/employee/assignment-commissioner-supervisory-board/${employeeId}`,
    educationHistory: (employeeId) =>
      `/employee/education/${employeeId}`,
    certification: (employeeId) =>
      `/employee/certification/${employeeId}`,
    workshop: (employeeId) =>
      `/employee/training-history/${employeeId}`,
    tiering: (employeeId) =>
      `/employee/tiered-training/${employeeId}`,
    diciplinary: (employeeId) =>
      `/employee/indiciplinary-history/${employeeId}`,
    award: (employeeId) => `/employee/appreciation/${employeeId}`,
  },
  POST: {
    archive: "/employee/archive",
    employee: "/employee",
    historyPosition: (employeeId) =>
      `/employee/position-history/${employeeId}`,
    assignmentHistory: (employeeId) =>
      `/employee/assignment-pelindo/${employeeId}`,
    assignmentCommissionHistory: (employeeId) =>
      `/employee/assignment-commissioner-supervisory-board/${employeeId}`,
    educationHistory: (employeeId) =>
      `/employee/education/${employeeId}`,
    certification: (employeeId) =>
      `/employee/certification/${employeeId}`,
    workshop: (employeeId) =>
      `/employee/training-history/${employeeId}`,
    tiering: (employeeId) =>
      `/employee/tiered-training/${employeeId}`,
    diciplinary: (employeeId) =>
      `/employee/indiciplinary-history/${employeeId}`,
    award: (employeeId) => `/employee/appreciation/${employeeId}`,
  },
  PUT: {
    resume: (employeeId) => `/employee/${employeeId}/resume`,
    workInformation: (employeeId) =>
      `/employee/${employeeId}/work-information`,
    privateInformation: (employeeId) =>
      `/employee/${employeeId}/private-information`,
    profileDetail: (employeeId) => `/employee/${employeeId}/profile`,
  },
  DELETE: {
    positionHistory: (employeeId) =>
      `/employee/position-history/${employeeId}`,
    assignmentHistory: (employeeId) =>
      `/employee/assignment-pelindo/${employeeId}`,
    assignmentCommissionHistory: (employeeId) =>
      `/employee/assignment-commissioner-supervisory-board/${employeeId}`,
    educationHistory: (employeeId) =>
      `/employee/education/${employeeId}`,
    certification: (certId) => `/employee/certification/${certId}`,
    workshop: (wsId) => `/employee/training-history/${wsId}`,
    tiering: (tierId) => `/employee/tiered-training/${tierId}`,
    diciplinary: (diciplinaryId) =>
      `/employee/indiciplinary-history/${diciplinaryId}`,
    award: (awardId) => `/employee/appreciation/${awardId}`,
  },
};

export const SOCIAL_ENDPOINT = {
  POST: {
    postReaction: (postId) =>
      `/social-post/employee/post/${postId}/reactions`,
    postComment: (postId) =>
      `/social-post/employee/post/comments/${postId}`,
    pinComment: (commentId) =>
      `/social-post/employee/post/comments/${commentId}/pin`,
    post: "/social-post/employee/post",
    event: "social-post/employee/post/event",
    poll: "/social-post/employee/post/quiz",
    pollRefactored: "/social-post/employee/post/poll",
    sharePost: "/social-post/employee/post/share",
    votePollOption: (questionId) =>
      `/social-post/employee/post/poll/vote/${questionId}`,
    mention: (postId) =>
      `/social-post/employee/post/${postId}/mentions`,
    report: (postId) => `/social-post/employee/post/report/${postId}`,
    agendaPersonal: "/social-post/employee/post/user-agenda",
  },
  DELETE: {
    post: (postId) => `/social-post/employee/post/${postId}`,
    postReaction: (postId) =>
      `/social-post/employee/post/likes/${postId}`,
    postComment: (commentId) =>
      `/social-post/employee/post/comments/${commentId}`,
    poll: (pollId) => `/social-post/employee/post/poll/${pollId}`,
    agendaPersonal: (personalAgendaId) =>
      `/social-post/employee/post/user-agenda/${personalAgendaId}`,
  },
  GET: {
    timelinePost: "/social-post/employee/post",
    timelinePostGuest: "/social-post/employee/post/guest",
    postReactions: (postId) =>
      `/social-post/employee/post/reaction/${postId}`,
    postComments: (postId) =>
      `/social-post/employee/post/comments/${postId}`,
    profile: (employeeId) =>
      `/social-employee/employee/${employeeId}/profile`,
    activities: (employeeId) =>
      `/social-employee/employee/${employeeId}/activities`,
    socialEmployees: `/social-employee/employee`,
    calendarSummary: "/social-post/employee/post/count-agenda",
    agendaPersonal: "/social-post/employee/post/user-agenda",
    agendaCommunity: "/social-post/employee/post/user-cop-agenda",
  },
  PUT: {
    post: (postId) => `/social-post/employee/post/${postId}`,
    agendaPersonal: (personalAgendaId) =>
      `/social-post/employee/post/user-agenda/${personalAgendaId}`,
  },
};

export const REPO_ENDPOINT = {
  GET: {
    repo: "/repo",
    repoInFolder: (folderId) => `/repo-in-folder/${folderId}`,
  },
  POST: {
    file: "/file",
  },
};

export const FOLDER_REPOSITORY = {
  GET: {
    getAllFolder: "/folder-repo/all-folder",
    countData: "/folder-repo/count-data",
  },
  POST: {
    createFolder: "/folder-repo/add-folder",
  },
  PUT: {
    updateFolder: (folderId) =>
      `/folder-repo/update-folder/${folderId}`,
  },
};

export const DASHBOARD_ENDPOINT = {
  GET: {
    getAnalytics: "/hq-dashboard/analytics",
  },
};

export const GAMIFICATION_ENDPOINT = {
  GET: {
    leaderboard: "/karma-vw",
  },
};

export const COURSE_ENDPOINT = {
  GET: {
    myCourseProgress: (employeeId) =>
      `/course/employee/${employeeId}/progress-course`,
    historyTransaction: (employeeId) =>
      `/course/history-transaction/${employeeId}`,
    totalEmployeeLearningHours: (employeeId) =>
      `/course/total-learning-hours/${employeeId}`,
    getBastLog: (bastId) => `/course/vendor/bast/${bastId}/log`,
  },
};

export const SIGNATURE_ENDPOINT = {
  GET: {
    checkSMSAuthorization: "/authorization/check",
  },
};

export const SEARCH_ENGINE_ENDPOINT = {
  GET: {
    spotlight: "/spotlight",
  },
};

export const DAILY_QUIZ_ENDPOINT = {
  GET: {
    getAllCollection: "/collection",
    dailyQuizData: "/daily-quiz",
  },
  POST: {
    actionQuiz: `/daily-quiz`,
  },
};

export const ASSESSMENT_ENDPOINT = {
  GET: {
    empAssessmentBehavioural: (employeeId) =>
      `/hq/assessments/behavioral/${employeeId}`,
  },
};

export const DEVELOPMENT_PLAN_ENDPOINT = {
  GET: {
    allAspirations: "/tms/aspiration/all",
    getPromotionAnalytics: "/tms/aspiration/analytics/promotion",
    getRotationAnalytics: "/tms/aspiration/analytics/rotation",
    getJobFamByEmployee: (employeeId) =>
      `/tms/eca/employee/${employeeId}/jobfam-list`,
    getFilterJobListByJobFam: (jobFamId) =>
      `/tms/eca/jobfam/${jobFamId}/job-list-filter`,
    getJobList: (jobFamId) =>
      `/tms/eca/jobfam/${jobFamId}/job-listed`,
    getAllCmc: "/tms/cmc",
    getCmcSchedule: "/tms/cmc/settings/schedules",
    idp: "/tms/idp",
    getIdpViewAtasan: "/tms/idp/get-idp-as-superior",
    getDetailJob: (positionMasterId, employeeNumber) =>
      `/tms/eca/position/${positionMasterId}/employee/${employeeNumber}/detail`,
    getRequiredEventTalent: (employeeNumber) =>
      `/tms/eca/employee/${employeeNumber}/verify-eligibility`,
    getRequiredEventTalentV2: (employeeNumber) =>
      `/tms/v2/event-talent/employees/${employeeNumber}/verify`,
    getETEmployeeJobFunctionHistory: (employeeNumber) =>
      `/tms/v2/event-talent/employees/${employeeNumber}/job-function`,
    getAllSubordinatesMyTeamList: `/tms/my-team-dp/get-all-subordinates`,
    getListCompany: "/tms/v2/event-talent/companies",
    getListCompanyOld: "/tms/event-talent/companies",
    getListCompanyV1: "/tms/event-talent/companies",
    getJobFamEventTalent: (employeeNumber, aspirationType) =>
      `/tms/v2/event-talent/employees/${employeeNumber}/${aspirationType}/jobfams`,
    getJobFunctionEventTalent: (employeeNumber, aspirationType) =>
      `/tms/v2/event-talent/employees/${employeeNumber}/${aspirationType}/jobfunctions`,
    getJobLevelEventTalent: (employeeNumber, aspirationType) =>
      `/tms/v2/event-talent/employees/${employeeNumber}/${aspirationType}/job-levels`,
    getPersonalArea: "/tms/event-talent/personal-areas",
    getListPosition: (employeeNumber, aspirationType) =>
      `/tms/v2/event-talent/employees/${employeeNumber}/${aspirationType}/positions`,
    getSubmittedPosition: (employeeNumber, aspirationType) =>
      `/tms/v2/event-talent/employees/${employeeNumber}/${aspirationType}/submissions`,
    getKpiScoreFilter: `tms/v2/event-talent/score-filter`,
    getMacaSubordinates: `/tms/v2/event-talent/maca-subordinates`,
    getCurrentPosition: "/tms/event-talent/positions/currents",
    promotionRotationList: "/tms/v2/event-talent/promotion-rotation",
    promotionRotationPositionDetails: (positionId) =>
      `/tms/v2/event-talent/promotion-rotation/position-detail/${positionId}`,
    careerProgressionConsoleList:
      "/tms/v2/event-talent/promotion-rotation/career-progression",
    jobClassLevels: "/tms/event-talent/position/joblevel",
    getOrganizationList: "/tms/organization/dashboard",
    getOrganizationListV2: "/tms/v2/organization/dashboard",
    getMapParentChildrenCompany:
      "/tms/organization/dashboard/company/map-parent-children",
    getPositionDetail: (positionId) =>
      `/tms/organization/position/${positionId}`,
    getHierarchyOrganization: (positionId) =>
      `/tms/organization/position/${positionId}/hierarchy`,
    getHierarchyGroup: (groupId) =>
      `/tms/organization/group/${groupId}/hierarchy`,
    getDetailCompany: (companyId) =>
      `/tms/organization/company/${companyId}`,
    subordinatesByPositionId: (positionId) =>
      `/tms/organization/position/${positionId}/subordinates`,
    managerByPositionId: (positionId) =>
      `/tms/organization/position/${positionId}/managers`,
    historyByPositionId: (positionId) =>
      `/tms/organization/position/${positionId}/history`,
    getGroupDetail: (groupId) =>
      `/tms/organization/group/${groupId}/detail`,
    getGroupMember: (groupId) =>
      `/tms/organization/group/${groupId}/member`,
    getMasterPosition: "/tms/organization/position-master",
    getOrganization: "/tms/organization/group-master",
    jobFamByPositionId: (positionId) =>
      `/tms/organization/position/${positionId}/jobfam`,
    competencyRequirementByPositionId: (positionId) =>
      `/tms/organization/position/${positionId}/competency-requirement`,
    competencyRequirementByPositionMasterId: (positionMasterId) =>
      `/tms/organization/position-master/${positionMasterId}/competency-requirement`,
    getGroupMasterDecree: (masterId) =>
      `tms/organization/group-master/${masterId}/decree`,
    getPositionMasterJobDesc: (masterId) =>
      `tms/organization/position-master/${masterId}/job-description`,
    getPositionMasterDetail: (masterId) =>
      `/tms/organization/position-master/${masterId}`,
    getPositionMasterEditData: (masterId) =>
      `/tms/organization/position-master/${masterId}/edit-data`,
    jobFamByPositionMasterId: (masterId) =>
      `/tms/organization/position-master/${masterId}/jobfam`,
    getPositionMasterPositionList: (masterId) =>
      `/tms/organization/position-master/${masterId}/position`,
    groupMasterList: `/tms/organization/group-master`,
    groupMasterDetail: (groupMasterId) =>
      `/tms/organization/group-master/${groupMasterId}`,
    allAvailableWorkUnits: `/tms/organization/position-master/work-unit`,
    allAvailablePositionTypes: `tms/organization/position-master/position-type`,
    jobFunctionByJobfamId: (jobfamId) =>
      `tms/organization/position-master/jobfam/${jobfamId}/job-function`,
    competencyRequirementByJobFunctionIds: `tms/organization/position-master/job-function/competency-requirement`,
    getPositionSyncList: `tms/organization/position-sync`,
    getMutationMoveDate: `tms/organization/mutation-dashboard/move-date`,
    getMutationUpdateDate: `tms/organization/mutation-dashboard/update-date`,
    getMutationDashboard: `tms/organization/mutation-dashboard`,
    addPositionGetAllPosition: (masterId) =>
      `tms/organization/position-master/${masterId}/add/position`,
    getPositionMasterUploadTemplate: `tms/organization/position-master/upload/template`,
    getPositionSyncUploadTemplate: `tms/organization/position-sync/upload/template`,
    downloadPositionMaster: `tms/organization/position-master/download`,
    getPositionMasterVariant: (positionMasterId) =>
      `tms/organization/position-master/${positionMasterId}/variant`,
    downloadPositionSync: `tms/organization/position-sync/download`,
    getTypeList: "/tms/organization/organization-type",
    getOrganizationDetail: (organizationId) =>
      `/tms/organization/group-master/${organizationId}`,
    getDecreeOrganization: "/tms/organization/decree",
    getOrganizationChild: (organizationId) =>
      `/tms/organization/group-master/${organizationId}/child`,
    getOrganizationChildAdd: (organizationId) =>
      `/tms/organization/group-master/${organizationId}/child/add`,
    getPostionMasterByOrganizationId: (organizationId) =>
      `/tms/organization/group-master/${organizationId}/position-master`,
    getPostionMasterByOrganizationIdAdd: (organizationId) =>
      `/tms/organization/group-master/${organizationId}/position-master/add`,
    getVersionOrganization: (organizationId) =>
      `/tms/organization/group-master/${organizationId}/version-history`,
    getEmployeeSyncDetail: (employeeNumber) =>
      `/tms/organization/employee-sync/${employeeNumber}`,
    getEmployeeSyncDashboard: `/tms/organization/employee-sync`,
    getEmployeeOfPositionMaster: (posMasterId) =>
      `/tms/organization/position-master/${posMasterId}/employee`,
    addEmployeeGetAllEmployee: (posMasterId) =>
      `/tms/organization/position-master/${posMasterId}/add/employee`,
    getPositionMasterUrgency: `/tms/organization/position-master-urgency`,
    getPositionMasterType: `/tms/organization/position-master-type`,
    downloadEmployeeSync: `tms/organization/employee-sync/download`,
    getEmployeeSyncUploadTemplate: `tms/organization/employee-sync/upload/template`,
    getCompanyHierarchy: "/tms/organization/company-master/hierarchy",
    getMasterCompany: "/tms/organization/company-master",
    companyType: "/tms/organization/company-type",
    getCompanyDetail: (id) =>
      `/tms/organization/company-master/${id}`,
    getIncorporationFile: (id) =>
      `/tms/organization/company-master/${id}/incorporation-file`,
    getVersionCompany: (id) =>
      `/tms/organization/company-master/${id}/version-history`,
    getChildCompanyList: (id) =>
      `/tms/organization/company-master/${id}/child`,
    getChildCompanyListAdd: (id) =>
      `/tms/organization/company-master/${id}/child/add`,
    educationHistories: "/tms/education-history",
    educationHistory: (id) => `tms/education-history/${id}`,
    trainingCat: "tms/education-list/kategori-pelatihan",
    trainingLevel: "tms/education-list/level-pelatihan",
    certificateType: "tms/education-list/tipe-sertifikasi",
    jobFunction: (id) => `tms/education-history/${id}/job-function`,
    educationVariations: "/tms/education-variation",
    educationVariationsRelatedEmployees: (eduID) =>
      `/tms/education-variation/${eduID}/employee`,
    educationCategorization: "/tms/education-categorization",
    educationCategorizationByEduID: (eduID) =>
      `/tms/education-categorization/${eduID}/education`,
    jobFunctions: "tms/organization/jobfunc",
    getHQScheduleList: `/tms/headquarter/event-talent/schedule`,
    getHQEventTalentEventRule: `/tms/headquarter/event-talent/event-rule`,
    getJobFunctionList: "/tms/organization/jobfunc",
    getActiveEventTalentSchedule:
      "/tms/v2/event-talent/active-schedule",
    getAllCompanyCluster: "/tms/company-cluster",
    companyClusterEligibleCompany: `/tms/company-cluster/eligible-company`,
    getEmployeeAspTotalSubmitted: (empNumber) =>
      `/tms/v2/event-talent/employees/${empNumber}/aspiration-submitted`,
    downloadEventTalentReport: (companyId, year) => {
      let companyFilter = "";
      if (typeof companyId === "number") {
        companyFilter = `&company_id=${companyId}`;
      } else {
        companyFilter = companyId
          .map((item) => `company_id[]=${item}`)
          .join("&");
      }
      return `tms/headquarter/event-talent/analytics/download/event-talent?year=${year}&${companyFilter}`;
    },
    downloadIdpReport: (companyId, year) => {
      let companyFilter = "";
      if (typeof companyId === "number") {
        companyFilter = `&company_id=${companyId}`;
      } else {
        companyFilter = companyId
          .map((item) => `company_id[]=${item}`)
          .join("&");
      }
      return `tms/headquarter/event-talent/analytics/download/idp?year=${year}&${companyFilter}`;
    },
    downloadAspirationScoring: (companyId, year) => {
      let companyFilter = "";
      if (typeof companyId === "number") {
        companyFilter = `&company_id=${companyId}`;
      } else {
        companyFilter = companyId
          .map((item) => `company_id[]=${item}`)
          .join("&");
      }
      return `tms/headquarter/event-talent/analytics/download/scoring?year=${year}&${companyFilter}`;
    },
    downloadTotalAspirator: (companyId, year) => {
      let companyFilter = "";
      if (typeof companyId === "number") {
        companyFilter = `&company_id=${companyId}`;
      } else {
        companyFilter = companyId
          .map((item) => `company_id[]=${item}`)
          .join("&");
      }
      return `tms/headquarter/event-talent/analytics/download/total-aspirator?year=${year}&${companyFilter}`;
    },
    downloadCareerAspirationReport: (
      companyId,
      year,
      aspirationType,
    ) => {
      let companyFilter = "";
      if (typeof companyId === "number") {
        companyFilter = `&company_id=${companyId}`;
      } else {
        companyFilter = companyId
          .map((item) => `company_id[]=${item}`)
          .join("&");
      }
      return `tms/headquarter/event-talent/analytics/download/career-aspiration?year=${year}&aspiration_type=${aspirationType}&${companyFilter}`;
    },
    getNineboxData: `tms/v2/event-talent/ninebox`,
    getAspiredPosition: `tms/v2/event-talent/list/position-aspiration`,
    getCountNotEligibleEventTalent: `/tms/headquarter/event-talent/analytics/ineligible-employee/count`,
    getCountCommitmentEventTalent: `/tms/headquarter/event-talent/analytics/commitment-agreement/count`,
    getCountEcaFillReportEventTalent: `/tms/headquarter/event-talent/analytics/eca-fill/count`,
    getCountSucaFillReportEventTalent: `/tms/headquarter/event-talent/analytics/suca-fill/count`,
    getCountMacaFillReportEventTalent: `/tms/headquarter/event-talent/analytics/maca-fill/count`,
    getJobFunctionReportEventTalent: `/tms/headquarter/event-talent/analytics/job-function`,
    getRecentAspirationFillReport: `tms/headquarter/event-talent/analytics/recent-aspiration`,
    getYearlyPeriodAspirationFillReport: `tms/headquarter/event-talent/analytics/yearly-period-aspiration`,
    getAllNotEligibleEventTalent: `tms/headquarter/event-talent/analytics/ineligible-employee`,
    getAllCommitmentLetterAggreement: `/tms/headquarter/event-talent/analytics/commitment-agreement`,
    getAllEcaFillReport: `/tms/headquarter/event-talent/analytics/eca-fill`,
    getAllSucaFillReport: `/tms/headquarter/event-talent/analytics/suca-fill`,
    getAllMacaFillReport: `/tms/headquarter/event-talent/analytics/maca-fill`,
    getHqEventTalentAllEmployeeList:
      "/tms/headquarter/event-talent/employee",
    getEmployeeEventTalentEligibility: (employeeNumber) =>
      `/tms/headquarter/event-talent/employee/${employeeNumber}/eligibility`,
    getEmployeeCareerAspirationHq: (employeeNumber) =>
      `/tms/headquarter/event-talent/employee/${employeeNumber}/aspiration`,
    getPositionHistory: (employeeNumber) =>
      `/tms/headquarter/event-talent/employee/${employeeNumber}/position-history`,
    getEmployeeEducationPositionJobFunction: (employeeNumber) =>
      `tms/headquarter/event-talent/employee/${employeeNumber}/job-function`,
    getEmployeeHighestEducationScore: (employeeNumber) =>
      `tms/education-history/${employeeNumber}/highest-score`,
    getEmployeeIndiscipline: (employeeNumber) =>
      `tms/headquarter/event-talent/employee/${employeeNumber}/indiscipline`,
    getEmployeeLeave: (employeeNumber) =>
      `tms/headquarter/event-talent/employee/${employeeNumber}/leave`,
    getMasterJobfamList: `/tms/organization/jobfam`,
    getMasterJobFunctionList: `/tms/organization/jobfunc`,
    getDecreeJobfam: `/tms/organization/jobfam/decree-list`,
    downloadJobfamMaster: `tms/internal/download/job`,
    getJobFamStatusDetail: (id) =>
      `tms/organization/jobfam/status/${id}`,
    getJobFamPerdir: (id) => `tms/organization/jobfam/decree/${id}`,
    getJobFunctionByJobFamId: (id) =>
      `tms/organization/jobfam/jobfunc/${id}`,
    downloadJobfamUploadTemplate: `tms/organization/jobfam/template`,
    getVersionHistoryJobfam: (id) =>
      `tms/organization/jobfam/version/${id}`,

    // * HQ Promotion Rotation
    getEmployeePerformanceRange: `tms/hq/promotion-rotation/employee-performance`,
    getEmployeeCapabilityScore: `tms/hq/promotion-rotation/employee-capability`,
    getCareerHistoryAspectWeight: `tms/hq/promotion-rotation/career-history/job`,
    getJobClassGap: `tms/hq/promotion-rotation/career-history/job-class-gap`,
    getCareerHistoryMutation: `tms/hq/promotion-rotation/career-history/mutation`,
    getEducationHistory: `tms/hq/promotion-rotation/education-history`,
    getCareerAspiration: `tms/hq/promotion-rotation/career-aspiration`,
    getCareerPoints: `tms/hq/promotion-rotation/career-points`,
    getRecentUpdate: `tms/hq/promotion-rotation/recent-update`,
    getHqPromotionRotationPositionList: `tms/hq/promotion-rotation/position-list`,
    getPerformanceReportAssessmentKpi: (id) =>
      `tms/headquarter/event-talent/employee/${id}/performance`,
    downloadTemplateUploadGroupMaster: `/tms/organization/group-master/upload/template`,
    downloadGroupMaster: `/tms/organization/group-master/download`,
    downloadCompanyMaster: `/tms/organization/company-master/download`,
    downloadUploadTemplateCompanyMaster: `/tms/organization/company-master/upload/template`,

    // * HQ Talent Committee
    getTalentCommittee: `tms/hq/talent-committee/position`,
    getTalentCommitteeByTalentCommitteeId: (id) =>
      `tms/hq/talent-committee/committee/${id}`,
    getTalentCommitteeByPositionId: (id) =>
      `tms/hq/talent-committee/position/${id}`,
    getTalentCommitteeByPositionIdComparison: (id) =>
      `tms/hq/talent-committee/position/${id}/comparison`,
    getPositionListByRole: `tms/hq/talent-committee/list/position`,
    hqTalentCommitteeGetFilterCompany: `tms/hq/talent-committee/filter/company`,

    // * LIST
    getEmployeeList: `tms/list/employee`,
    getPositionList: `tms/list/position`,

    positionHistory: "/tms/v2/event-talent/position-history",

    // * general HQ
    generalHqGetCompanyFilter: "/tms/general-hq",

    getCompetencyRequirementByPosMasterId: (id) =>
      `tms/organization/competency-requirement/${id}`,
    getNineboxAnalytics: (id) =>
      `tms/headquarter/event-talent/analytics/ninebox/${id}`,
    getHierarchyPosition: (id) =>
      `tms/organization/hierarchy/position/${id}`,
    verifyAccessOrgManagement: `tms/organization/verify-access`,

    // * mutation dashboard
    mutationDashboardEmployeeList: `tms/organization/mutation-dashboard/employee-list`,
    mutationDashboardMutationActivity: `tms/organization/mutation-dashboard/mutation-activity`,
    downloadMutationActivity: `tms/organization/mutation-dashboard/mutation-activity/download`,
    mutationDashboardPositionList: `tms/organization/mutation-dashboard/position-list`,
    mutationDashboardPositionEmployeeHistory: (id) =>
      `tms/organization/mutation-dashboard/position-list/${id}/employee-history`,
    mutationDashboardEmployeePositionHistory: (id) =>
      `tms/organization/mutation-dashboard/employee-list/${id}/position-history`,
    mutationDashboardMutationActivityAnalytics: `tms/organization/mutation-dashboard/mutation-activity/analytics`,
    mutationDashboardEmployeeListAnalytics: `tms/organization/mutation-dashboard/employee-list/analytics`,
    mutationDashboardPositionListAnalytics: `tms/organization/mutation-dashboard/position-list/analytics`,

    getCaSentStatus: (varId, aspType) =>
      `/tms/v2/event-talent/sent-status/${varId}/${aspType}`,

    dpEmployeeProfile: `/tms/employee/profile`,
  },

  POST: {
    postCreateAspirationCareer: (employeeNumber, aspirationType) =>
      `/tms/v2/event-talent/employees/${employeeNumber}/${aspirationType}`,
    postVerifyEventTalent: (employeeNumber) =>
      `/tms/eca/employee/${employeeNumber}/verify-eligibility`,
    createIdp: () => "/tms/idp",
    createPositionMaster: `/tms/organization/position-master`,
    deactivatePositionMaster: (posMasterId) =>
      `/tms/organization/position-master/${posMasterId}`,
    uploadPositionMaster: `/tms/organization/position-master/upload`,
    uploadPositionSync: `/tms/organization/position-sync/upload`,
    uploadEmployeeSync: `/tms/organization/employee-sync/upload`,
    organizationPositionDuplicate:
      "/tms/organization/position-master/duplicate",
    createOrganization: "/tms/organization/group-master",
    uploadGroupMaster: "/tms/organization/group-master/upload",
    uploadCompanyMaster: "/tms/organization/company-master/upload",
    createOrganizationType: "/tms/organization/organization-type",
    createDegree: "/tms/organization/decree",
    createVariant: (positionMasterId) =>
      `/tms/organization/position-master/${positionMasterId}/variant`,
    synchronizeEmployee: `/tms/organization/employee-sync`,
    createPositionMasterUrgency: `/tms/organization/position-master-urgency`,
    createPositionMasterType: `/tms/organization/position-master-type`,
    createCompanyType: "/tms/organization/company-type",
    createCompany: "/tms/organization/company-master",
    createEducationVariation: "/tms/education-variation",
    createEducationCategorization: "/tms/education-categorization",
    createUpdateCompanyCluster: `tms/company-cluster`,
    createJobfam: `/tms/organization/job/`,
    createJobfamDecree: `/tms/organization/jobfam/decree`,
    synchronizeJobFunction: (id) => `tms/organization/jobfunc/${id}`,
    uploadJobfamMaster: `tms/internal/import/job`,

    // * HQ Talent Committee
    createTalentCommittee: `tms/hq/talent-committee/committee`,

    // * shortlisting agenda
    createShortlistingAgenda: `tms/shortlisting-agenda`,
    updateStatusAgenda: (id) =>
      `tms/shortlisting-agenda/${id}/status`,
  },

  PUT: {
    setAcceptanceStatus: (dpIdpId) =>
      `/tms/idp/${dpIdpId}/acceptance-status`,
    exchangeCareerAspiration: (aspirationId) =>
      `/tms/event-talent/career-aspiration/exchange/${aspirationId}`,
    updatePositionMaster: (posMasterId) =>
      `/tms/organization/position-master/${posMasterId}`,
    updatePositionMasterJobFunction: (posMasterId) =>
      `tms/organization/position-master/${posMasterId}/jobfam`,
    synchronizePosition: (positionId) =>
      `/tms/organization/position-sync/${positionId}`,
    addRemoveOrganizationChild: (organizationId) =>
      `/tms/organization/group-master/${organizationId}/parent`,
    addRemoveOrganizationPosition: (id) =>
      `/tms/organization/position-master/${id}/group-master`,
    updateOrganizationMaster: (id) =>
      `/tms/organization/group-master/${id}`,
    updatePositionUrgency: (positionUrgencyId) =>
      `/tms/organization/position-master-urgency/${positionUrgencyId}`,
    updatePositionType: (positionTypeId) =>
      `/tms/organization/position-master-type/${positionTypeId}`,
    updateCompanyMaster: (id) =>
      `/tms/organization/company-master/${id}`,
    updateChildCompany: (id) =>
      `/tms/organization/company-master/${id}/parent`,
    updateOrgType: (id) =>
      `/tms/organization/organization-type/${id}`,
    updateCompanyType: (id) => `/tms/organization/company-type/${id}`,
    updateEducationHistory: (id, type) =>
      `/tms/education-history/${id}/${type}`,
    updateEducationVariation: (id) =>
      `/tms/education-variation/${id}/categorization`,
    educationCategorizationByEduID: (eduID) =>
      `/tms/education-categorization/${eduID}/education`,
    jobFunctionByEduID: (eduID) =>
      `/tms/education-categorization/${eduID}/job-function`,
    updateHqEventTalentSetting:
      "/tms/headquarter/event-talent/setting",
    updateHqEventTalentSchedule: `/tms/headquarter/event-talent/schedule`,
    updateJobFunctionType: (id) =>
      `/tms/headquarter/event-talent/jobfunc-status/${id}`,
    updateEmployeeSyncStartEndDate: (id) =>
      `/tms/organization/employee-sync/${id}/date`,
    editJobFamJobFunctionList: (id) =>
      `tms/organization/jobfam/jobfunc/${id}`,
    updateJobFam: (id) => `/tms/organization/job/${id}`,

    // * HQ Promotion Rotation
    updateEmployeePerformanceRange: `tms/hq/promotion-rotation/employee-performance`,
    updateEmployeeCapabilityScore: `tms/hq/promotion-rotation/employee-capability`,
    updateCareerHistoryAspectWeight: `tms/hq/promotion-rotation/career-history/job`,
    updateJobClassGap: `tms/hq/promotion-rotation/career-history/job-class-gap`,
    updateCareerHistoryMutation: `tms/hq/promotion-rotation/career-history/mutation`,
    updateEducationHistoryScore: `tms/hq/promotion-rotation/education-history`,
    updateCareerAspiration: `tms/hq/promotion-rotation/career-aspiration`,
    updateCareerPoints: `tms/hq/promotion-rotation/career-points`,

    // * HQ Talent Committee
    updateTalentCommittee: (hqTalentCommitteId) =>
      `tms/hq/talent-committee/committee/${hqTalentCommitteId}`,
    replaceTalentCommittee: (hqTalentCommitteId) =>
      `tms/hq/talent-committee/committee/${hqTalentCommitteId}/replace`,
    reactivatePositionMaster: (posMasterId) =>
      `/tms/organization/position-master/${posMasterId}/reactivate`,
    updateCaSentStatus: (varId, aspType) =>
      `/tms/v2/event-talent/sent-status/${varId}/${aspType}`,
  },

  DELETE: {
    deleteAspiration: ({ aspirationId }) =>
      `/tms/eca/${aspirationId}`,
    deleteEventTalentSelected: (aspirationType) =>
      `/tms/v2/event-talent/career-aspiration/${aspirationType}`,
    deleteOrganization: (organizationId) =>
      `/tms/organization/group-master/${organizationId}/deactivate`,
    endEmployeeSync: (employeeSyncId) =>
      `/tms/organization/employee-sync/${employeeSyncId}`,
    deletePositionUrgency: (positionUrgencyId) =>
      `/tms/organization/position-master-urgency/${positionUrgencyId}`,
    deletePositionType: (positionTypeId) =>
      `/tms/organization/position-master-type/${positionTypeId}`,
    deleteCompany: (id) =>
      `/tms/organization/company-master/${id}/deactivate`,
    deleteCompanyType: (id) => `/tms/organization/company-type/${id}`,
    deleteOrgType: (id) =>
      `/tms/organization/organization-type/${id}`,
    deleteCompanyCluster: (id) => `/tms/company-cluster/${id}`,
    deleteJobFam: (id) => `/tms/organization/jobfam/${id}`,
    deleteJobFunction: (id) => `tms/organization/jobfunc/${id}`,
    resetEmployeeCa: (id, aspType) =>
      `tms/headquarter/event-talent/employee/${id}/reset/${aspType}`,
    resetCommitment: (id) =>
      `tms/headquarter/event-talent/cancel-commitment/${id}`,
  },
};

export const CMS_ENDPOINT = {
  GET: {
    home: "/lms/home",
  },
};

export const INNOVATION_ENDPOINT = {
  GET: {
    userRole: (employeeId) => `/employeeRole/${employeeId}`,
  },
};

export const IDP_ENDPOINT = {
  GET: {
    getCourseRecommendation: "/tms/idp/course/recommendation",
    getJobFunctionsOwned: "/tms/idp/job-function/owned",
    getJobFunctionsUnowned: "/tms/idp/job-function/not-owned",
    getJobFunctionsAll: "/tms/idp/job-function/all",
    getRequiredJobFunctionsByECA: "/tms/idp/job-function/requirement",
    getCoursesByIds: "/tms/idp/course/detail",
    getCourseBatches: (courseId) => {
      return `/tms/idp/course/${courseId}/batch`;
    },
    getCourseAndIdpList: "/tms/idp/idp-and-course",
  },
  POST: {
    bulkPostIDP: "/tms/idp/bulk",
  },
};
