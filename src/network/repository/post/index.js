import { axiosNestClientMultipart } from "../../../dependencies/axios/nest/apiClientMultipart";

export const postDocument = (
  setIsLoading,
  setIsError,
  form,
  file,
  handleSuccess,
) => {
  setIsLoading(true);
  const formData = new FormData();
  formData.append("data", JSON.stringify(form));
  formData.append("file", file[0]);
  axiosNestClientMultipart
    .post(`/repository`, formData)
    .then(() => {
      handleSuccess();
    })
    .catch(() => {
      setIsError(true);
    })
    .finally(() => {
      setIsLoading(false);
    });
};
