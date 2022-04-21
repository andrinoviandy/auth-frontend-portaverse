import { axiosKmsClient } from "../../../dependencies/axios/kmsApiClient";
import handleLogout from "../../../utils/helpers/logout";
export const putCorporateObjective = (
  formData,
  handleSuccess,
  id,
  handleError,
) => {
  axiosKmsClient
    .put(`/kmap/corpobj/${id}`, formData)
    .then(() => {
      handleSuccess();
    })
    .catch((error) => {
      if (error.response.status === 401) {
        handleLogout();
      } else {
        handleError();
      }
    });
};

export const putBussinessProcess = (
  formData,
  handleSuccess,
  id,
  setIsError,
) => {
  axiosKmsClient
    .put(`/kmap/bp/${id}`, formData)
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
