import { axiosNestClient } from "../../../dependencies/axios/nest/apiClient";

export const postReceivedBadges = (
  emp_id,
  setIsLoading,
  setIsError,
  setIsOpen,
) => {
  setIsLoading(true);
  axiosNestClient
    .post(`/employee/${emp_id}/badge`)
    .then(() => {
      setIsLoading(false);
      setIsOpen(false);
    })
    .catch(() => {
      setIsError(true);
    })
    .finally(() => {
      setIsLoading(false);
      setIsOpen(false);
    });
};
