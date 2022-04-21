import { axiosKmsClient } from "../../../dependencies/axios/kmsApiClient";
import handleLogout from "../../../utils/helpers/logout";

export const getCorporateObject = (
  setCorporateObject,
  setIsLoading,
  setIsError,
) => {
  setIsLoading(true);
  axiosKmsClient
    .get(`/kmap/corpobj`)
    .then((response) => {
      setCorporateObject(response.data.data);
    })
    .catch((error) => {
      if (error.response.status === 401) {
        handleLogout();
      } else {
        setIsError(true);
      }
    })
    .finally(() => {
      setIsLoading(false);
    });
};

export const getAllGroup = (setGroup, setIsLoading, setIsError) => {
  setIsLoading(true);
  axiosKmsClient
    .get(`/kmap/group`)
    .then((response) => {
      setGroup(response.data.data);
    })
    .catch((error) => {
      if (error.response.status === 401) {
        handleLogout();
      } else {
        setIsError(true);
      }
    })
    .finally(() => {
      setIsLoading(false);
    });
};

export const getDepartementObjectiveById = (
  setDepartementObjectives,
  setIsLoading,
  setIsError,
  group,
) => {
  setIsLoading(true);
  axiosKmsClient
    .get(`/kmap/depobj?group_id=${group}`)
    .then((response) => {
      setDepartementObjectives(response.data.data);
    })
    .catch((error) => {
      if (error.response.status === 401) {
        handleLogout();
      } else {
        setIsError(true);
      }
    })
    .finally(() => {
      setIsLoading(false);
    });
};

export const getKmapByGroupId = (
  setKmap,
  setIsLoading,
  setIsError,
  group_id,
) => {
  setIsLoading(true);
  axiosKmsClient
    .get(`/kmap?group_id=${group_id}}`)
    .then((response) => {
      setKmap(response.data.data);
    })
    .catch((error) => {
      if (error.response.status === 401) {
        handleLogout();
      } else {
        setIsError(true);
      }
    })
    .finally(() => {
      setIsLoading(false);
    });
};

export const getBussinessProcessById = (
  setData,
  id,
  handleSuccess,
  setIsError,
) => {
  axiosKmsClient
    .get(`/kmap/bp/${id}`)
    .then((response) => {
      setData(response.data.data);
      handleSuccess(response);
    })
    .catch((error) => {
      if (error.response.status === 401) {
        handleLogout();
      } else {
        setIsError(true);
      }
    });
};

export const getGroups = (
  setIsLoading,
  handleSuccess,
  setIsError,
) => {
  setIsLoading(true);
  axiosKmsClient
    .get(`/kmap/group`)
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
