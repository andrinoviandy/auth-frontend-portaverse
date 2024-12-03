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
    idp: "/tms/idp",
    getCmcSchedule: "/tms/cmc/settings/schedules",
    verifyAccessOrgManagement: `tms/organization/verify-access`,
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
