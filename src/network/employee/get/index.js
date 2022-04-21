import { axiosNestClient } from "../../../dependencies/axios/nest/apiClient";

export const getProfileDetails = (
  emp_id,
  setIsLoading,
  handleSuccess,
  setIsError,
) => {
  setIsLoading(true);
  axiosNestClient
    .get(`/employee/${emp_id}`)
    .then((response) => {
      console.log(response.data);
      // handleSuccess(response.data.data[0]);
    })
    .catch(() => {
      setIsError(true);
    })
    .finally(() => {
      setIsLoading(false);
    });
};

export const getProfileActivities = (
  emp_id,
  setIsLoading,
  setActivities,
  setIsError,
) => {
  setIsLoading(true);
  axiosNestClient
    .get(`/employee/${emp_id}/activities`)
    .then((response) => {
      setActivities(response.data.data);
    })
    .catch(() => {
      setIsError(true);
    })
    .finally(() => {
      setIsLoading(false);
    });
};

export const getProfileWorkInformation = (
  emp_id,
  setIsLoading,
  setData,
  setIsError,
) => {
  setIsLoading(true);
  axiosNestClient
    .get(`/employee/${emp_id}/work-informations`)
    .then((response) => {
      console.log("response", response.data.data);
      setData(response.data.data);
    })
    .catch(() => {
      setIsError(true);
    })
    .finally(() => {
      setIsLoading(false);
    });
};

export const getProfilePrivateInformation = (
  emp_id,
  setIsLoading,
  setData,
  setIsError,
) => {
  setIsLoading(true);
  axiosNestClient
    .get(`/employee/${emp_id}/private`)
    .then((response) => {
      console.log("response", response.data.data);
      setData(response.data.data);
    })
    .catch(() => {
      setIsError(true);
    })
    .finally(() => {
      setIsLoading(false);
    });
};

export const getProfileResume = (
  emp_id,
  setIsLoading,
  setData,
  setDataCache,
  setIsError,
) => {
  setIsLoading(true);
  axiosNestClient
    .get(`/employee/${emp_id}/resume`)
    .then((response) => {
      setData(response.data.data);
      setIsLoading(false);
      return response.data.data;
    })
    .then((response) => {
      setDataCache({ ...response });
    })
    .catch(() => {
      setIsError(true);
    })
    .finally(() => {
      setIsLoading(false);
    });
};

export const getBadges = (
  setIsLoading,
  handleSuccess,
  setIsError,
) => {
  setIsLoading(true);
  axiosNestClient
    .get(`/badge`)
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

export const getReceivedBadges = (
  emp_id,
  setIsLoading,
  setData,
  setIsError,
) => {
  setIsLoading(true);
  axiosNestClient
    .get(`/employee/${emp_id}/badges`)
    .then((response) => {
      setData(response.data.data);
    })
    .catch(() => {
      setIsError(true);
    })
    .finally(() => {
      setIsLoading(false);
    });
};

export const getSkills = (
  emp_id,
  setData,
  setIsLoading,
  setIsError,
) => {
  axiosNestClient
    .get(`/employee/${emp_id}/skills`)
    .then((response) => {
      setData(response.data.data);
    })
    .catch(() => {
      setIsError(true);
    })
    .finally(() => {
      setIsLoading(false);
    });
};

export const getImportantKnowledge = (
  emp_id,
  setData,
  setIsLoading,
  setIsError,
) => {
  axiosNestClient
    .get(`/employee/${emp_id}/important-knowledge`)
    .then((response) => {
      setData(response.data.data);
    })
    .catch(() => {
      setIsError(true);
    })
    .finally(() => {
      setIsLoading(false);
    });
};

export const getEmployeesQuickCreate = (
  size,
  query,
  setListEmployee,
  setIsLoading,
) => {
  axiosNestClient
    .get(`/employee?page=0&size=${size}&query=${query}`)
    .then(function (response) {
      setListEmployee(response.data.data.employees);
    })
    .catch(function (error) {
      console.log("employee list quick create: ", error);
    })
    .finally(function () {
      setIsLoading(false);
    });
};
