import axiosSSOClient from "../../Configs/AxiosClient/ssoAxiosClient";

/**
 * Send verification code to user's email
 * @param {number} userRegistrationId - User registration ID
 * @param {string|null} email - Optional email override
 * @returns {Promise} API response
 */
export const postSendVerificationCode = async (
  userRegistrationId,
  email = null
) => {
  const payload = {
    user_registration_id: userRegistrationId,
  };

  // Only add email if it's provided and not null
  if (email) {
    payload.email = email;
  }

  const response = await axiosSSOClient.post(
    `/user-registration/send-verification-code`,
    payload
  );
  return response.data;
};

/**
 * Verify OTP code
 * @param {number} userRegistrationId - User registration ID
 * @param {string} verificationCode - 6-digit OTP code
 * @returns {Promise} API response
 */
export const postVerifyOtp = async (
  userRegistrationId,
  verificationCode
) => {
  const response = await axiosSSOClient.post(
    `/user-registration/verify-otp`,
    {
      user_registration_id: userRegistrationId,
      verification_code: verificationCode,
    }
  );
  return response.data;
};

/**
 * Create password for user registration
 * @param {number} userRegistrationId - User registration ID
 * @param {string} password - User password
 * @returns {Promise} API response
 */
export const postCreatePassword = async (
  userRegistrationId,
  password
) => {
  const response = await axiosSSOClient.post(
    `/user-registration/create-password`,
    {
      user_registration_id: userRegistrationId,
      password,
    }
  );
  return response.data;
};

/**
 * Submit registration request with files
 * @param {number} userRegistrationId - User registration ID
 * @param {File} profilePicture - Profile picture file
 * @param {File} idCard - ID card file
 * @param {File} decree - Decree/SK file
 * @returns {Promise} API response
 */
export const postSubmitRequest = async (
  userRegistrationId,
  profilePicture,
  idCard,
  decree
) => {
  const formData = new FormData();
  formData.append("user_registration_id", userRegistrationId);
  formData.append("profile_picture", profilePicture);
  formData.append("id_card", idCard);
  formData.append("decree", decree);

  const response = await axiosSSOClient.post(
    `/user-registration/submit-request`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

/**
 * Admin accept registration request
 * @param {number} userRegistrationId - User registration ID
 * @returns {Promise} API response
 */
export const postAdminAcceptRequest = async (userRegistrationId) => {
  const response = await axiosSSOClient.post(
    `/user-registration/admin/accept-request`,
    {
      user_registration_id: userRegistrationId,
    }
  );
  return response.data;
};

/**
 * Admin reject registration request
 * @param {number} userRegistrationId - User registration ID
 * @param {string} rejectionNotes - Rejection reason
 * @returns {Promise} API response
 */
export const postAdminRejectRequest = async (
  userRegistrationId,
  rejectionNotes
) => {
  const response = await axiosSSOClient.post(
    `/user-registration/admin/reject-request`,
    {
      user_registration_id: userRegistrationId,
      rejection_notes: rejectionNotes,
    }
  );
  return response.data;
};
