import { axiosKmsClient } from "../../../dependencies/axios/kmsApiClient";
import handleLogout from "../../../utils/helpers/logout";

export const deleteCorporateObjective = (
  id,
  setIsError,
  setShowAlert,
  setRefetch,
) => {
  axiosKmsClient
    .delete(`/kmap/corpobj/${id}`)
    .then(() => {
      setRefetch(1);
    })
    .catch((error) => {
      if (error.response.status === 401) {
        handleLogout();
      } else {
        setIsError(true);
      }
    })
    .finally(() => {
      setShowAlert(false);
    });
};

export const deleteBussinessProcess = (
  id,
  handleSuccess,
  setIsError,
) => {
  axiosKmsClient
    .delete(`/kmap/bp/${id}`)
    .then(() => {
      handleSuccess();
    })
    .catch((error) => {
      if (error.response.status === 401) {
        handleLogout();
      } else {
        setIsError(true);
      }
    });
};
