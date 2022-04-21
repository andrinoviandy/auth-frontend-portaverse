import { axiosKmsClient } from "../../../dependencies/axios/kmsApiClient";
import handleLogout from "../../../utils/helpers/logout";
import { axiosKmsClientMultipart } from "../../../dependencies/axios/kms/apiClientMultipart";

export const postCorporateObjective = (
  formData,
  handleSuccess,
  setIsError,
  setShowAlert,
) => {
  axiosKmsClient
    .post(`/kmap/corpobj`, formData)
    .then(() => {
      handleSuccess();
    })
    .catch((error) => {
      if (error.response.status === 401) {
        handleLogout();
      } else {
        setShowAlert(false);
        setIsError(true);
      }
    });
};

export const postKmapQuickCreate = (
  payload,
  file,
  handleSuccessAndReset,
) => {
  const formData = new FormData();
  formData.append("data", JSON.stringify(payload));
  formData.append("file", file[0]);

  axiosKmsClientMultipart
    .post("/kmap", formData)
    .then(function (response) {
      console.log("kmap quick create: ", response);
      handleSuccessAndReset();
    })
    .catch(function (error) {
      console.log("kmap quick create: ", error);
    });
};
