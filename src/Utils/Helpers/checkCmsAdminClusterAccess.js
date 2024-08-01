import hasRole from "./hasRole";

const checkCmsAdminClusterAccess = () => {
  if (+hasRole(["CADC"])) {
    window.location = `${
      import.meta.env.VITE_CMS_URL
    }/change-catalyst-team-monitoring-system`;
  }
};

export default checkCmsAdminClusterAccess;
