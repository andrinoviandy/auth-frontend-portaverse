import axiosSSOClient from "../../Configs/AxiosClient/ssoAxiosClient";

/**
 * Check NIPP and initialize user registration
 * @param {string} nipp - Employee number (NIPP)
 * @returns {Promise} API response
 */
export const getCheckNipp = async (nipp) => {
  const response = await axiosSSOClient.get(
    `/user-registration/check-nipp`,
    {
      params: {
        employee_number: nipp,
      },
    },
  );
  return response.data.data;
};

/**
 * Get admin list of registration requests (Admin only)
 * @param {number} page - Page number
 * @param {number} size - Items per page
 * @param {string} search - Search term
 * @returns {Promise} API response
 */
export const getAdminListRequest = async (page, size, search) => {
  const response = await axiosSSOClient.get(
    `/user-registration/admin/list-request`,
    {
      params: {
        page,
        size,
        search,
      },
    },
  );
  return response.data.data;
};

/**
 * Get admin request detail (Admin only)
 * @param {number} userRegistrationId - User registration ID
 * @returns {Promise} API response
 */
export const getAdminRequestDetail = async (userRegistrationId) => {
  const response = await axiosSSOClient.get(
    `/user-registration/admin/request-detail`,
    {
      params: {
        user_registration_id: userRegistrationId,
      },
    },
  );
  return response.data.data;
};

/**
 * Get admin request analytics (Admin only)
 * @returns {Promise} API response
 */
export const getAdminRequestAnalytics = async () => {
  const response = await axiosSSOClient.get(
    `/user-registration/admin/request-analytics`,
  );
  return response.data.data;
};
