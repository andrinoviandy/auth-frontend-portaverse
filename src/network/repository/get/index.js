import { axiosNestClient } from "../../../dependencies/axios/nest/apiClient";

export const getEmployees = (
  setIsLoading,
  setListCollab,
  setIsOpen,
  setIsError,
) => {
  setIsLoading(true);
  axiosNestClient
    .get(`/employee?page=0&size=1000`)
    .then((response) => {
      setListCollab(response.data.data.employees);
    })
    .catch(() => {
      setIsOpen(false);
      setIsError(true);
    })
    .finally(() => {
      setIsLoading(false);
    });
};
