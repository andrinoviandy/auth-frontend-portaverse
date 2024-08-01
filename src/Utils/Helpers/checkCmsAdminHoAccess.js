import hasRole from "./hasRole";

const checkCmsAdminHoAccess = () => {
  if (+hasRole(["CADH"])) {
    window.location = `${
      import.meta.env.VITE_CMS_URL
    }/change-catalyst-team-monitoring-system`;
  }
};

export default checkCmsAdminHoAccess;
