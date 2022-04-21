import { axiosNestClient } from "../../../dependencies/axios/nest/apiClient";

export const putProfileResume = (
  emp_id,
  data,
  setIsLoading,
  setEditing,
  setIsOpen,
  setIsError,
) => {
  setIsLoading(true);
  axiosNestClient
    .put(`/employee/${emp_id}/resume`, data)
    .then(() => {
      setEditing(false);
      setIsOpen(false);
    })
    .catch(() => {
      setIsError(true);
    })
    .finally(() => {
      setIsLoading(false);
    });
};

export const putProfileWorkInformation = (
  emp_id,
  data,
  setIsLoading,
  setEditing,
  setIsError,
) => {
  setIsLoading(true);
  axiosNestClient
    .put(`/employee/${emp_id}/work-information`, data)
    .then(() => {
      setEditing(false);
    })
    .catch(() => {
      setIsError(true);
    })
    .finally(() => {
      setIsLoading(false);
    });
};

export const putProfileSideInfo = (
  emp_id,
  data,
  setIsLoading,
  handleSuccess,
  setIsError,
) => {
  setIsLoading(true);
  const formData = new FormData();
  formData.append("data", JSON.stringify(data));
  // formData.append("file", file[0]);
  axiosNestClient
    .put(`/employee/${emp_id}`, formData)
    .then((response) => {
      handleSuccess(response.data.data);
    })
    .catch(() => {
      setIsError(true);
    })
    .finally(() => {
      setIsLoading(false);
    });
};
