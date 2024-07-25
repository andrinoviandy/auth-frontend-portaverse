/* eslint-disable camelcase */
import NiceModal from "@ebay/nice-modal-react";
import MODAL_IDS from "../../Components/Modals/modalIds";
import getUserCookie from "./getUserCookie";

const notifURLLookup = (type, id, data, { bast_course_id }) => {
  const user = getUserCookie();
  const vendorId = user?.vendor?.vendor_id;

  const lookupObj = {
    COMMUNITY_ADD_COREMEMBER: {
      payload: `${import.meta.env.VITE_KMS_URL}/communities/${id}`,
      action: "redirect",
    },
    COMMUNITY_AGENDA_ADD_COMITEE: {
      payload: `${import.meta.env.VITE_KMS_URL}/communities/${id}/${
        data || id
      }`,
      action: "redirect",
    },
    COMMUNITY_AGENDA_ADD_NOTETAKER: {
      payload: `${import.meta.env.VITE_KMS_URL}/communities/${id}/${
        data || id
      }`,
      action: "redirect",
    },
    COMMUNITY_AGENDA_ADD_SPEAKER: {
      payload: `${import.meta.env.VITE_KMS_URL}/communities/${id}/${
        data || id
      }`,
      action: "redirect",
    },
    COMMUNITY_REMINDER_AGENDA: {
      payload: `${import.meta.env.VITE_KMS_URL}/communities/${id}/${
        data || id
      }`,
      action: "redirect",
    },
    COURSE_PUBLISH_COURSE: {
      payload: `${
        import.meta.env.VITE_LMS_URL
      }/course-pool/course/${data}/standard-information`,
      action: "redirect",
    },
    COURSE_BUY_COURSE: {
      payload: `${import.meta.env.VITE_LMS_URL}/dashboard/${data}`,
      action: "redirect",
    },
    COURSE_CLAIM_REJECTED: {
      payload: data,
      action: "open-modal",
      modalId: MODAL_IDS.LMS.DASHBOARD.DECLINE_EXT_COURSE_CLAIM,
      modalProps: { note: data },
    },
    COURSE_CLAIM_SUCCEED: {
      payload: `${
        import.meta.env.VITE_LMS_URL
      }/dashboard#subinfo_claim-lh`,
      action: "redirect",
    },
    COURSE_COURSE_NEED_APPROVAL: {
      payload: `${import.meta.env.VITE_LMS_URL}/course-pool/request`,
      action: "redirect",
    },
    COURSE_CANCEL_NOT_ENOUGH_PARTICIPANT: {
      payload: `${import.meta.env.VITE_LMS_URL}/dashboard/group`,
      action: "redirect",
    },
    COURSE_COURSE_NEED_APPROVAL_VENDOR_REVISION: {
      payload: `${
        import.meta.env.VITE_LMS_URL
      }/vendor-management/${vendorId}#course-procurement`,
      action: "redirect",
    },
    COURSE_ENROLLMENT_APPROVED_BY_SUPERIOR: {
      payload: `${import.meta.env.VITE_LMS_URL}/dashboard/group`,
      action: "redirect",
    },
    COURSE_ENROLLMENT_APPROVED_BY_WALLET_ADMIN: {
      payload: `${
        import.meta.env.VITE_LMS_URL
      }/dashboard/group#approvals_approval-wallet`,
      action: "redirect",
    },
    COURSE_ENROLLMENT_REJECTED_BY_SUPERIOR: {
      payload: `${
        import.meta.env.VITE_LMS_URL
      }/dashboard/group#approvals`,
      action: "redirect",
    },
    COURSE_ENROLLMENT_REJECTED_BY_WALLET_ADMIN: {
      payload: `${
        import.meta.env.VITE_LMS_URL
      }/dashboard/group#approvals_approval-wallet`,
      action: "redirect",
    },
    COURSE_ENROLLMENT_REQUEST_TO_SUPERIOR: {
      payload: `${
        import.meta.env.VITE_LMS_URL
      }/dashboard/group#approvals`,
      action: "redirect",
    },
    COURSE_ENROLLMENT_REQUEST_TO_WALLET_ADMIN: {
      payload: `${
        import.meta.env.VITE_LMS_URL
      }/dashboard/group#approvals_approval-wallet`,
      action: "redirect",
    },
    COURSE_INVITATION: {
      payload: `${import.meta.env.VITE_LMS_URL}/explore/request`,
      action: "redirect",
    },
    COURSE_PUBLICATION_TARGETED: {
      payload: `${import.meta.env.VITE_LMS_URL}/explore/${data}`,
      action: "redirect",
    },
    // COURSE_PUBLICATION_TARGETED_TO_RANK_ID: {
    //   payload: `${import.meta.env.VITE_LMS_URL}/???`,
    //   action: "redirect",
    // },
    COURSE_REQUEST_CANCELLED: {
      payload: `${
        import.meta.env.VITE_LMS_URL
      }/explore/request#_mine`,
      action: "redirect",
    },
    COURSE_REQUEST_COURSE_ACCEPT_BY_VENDOR: {
      payload: `${
        import.meta.env.VITE_LMS_URL
      }/explore/request#_mine`,
      action: "redirect",
    },
    COURSE_REMINDER: {
      payload: `${import.meta.env.VITE_LMS_URL}/dashboard/${data}`,
      action: "redirect",
    },
    COURSE_REQUEST_PUBLISHED: {
      payload: `${import.meta.env.VITE_LMS_URL}explore/${data}`,
      action: "redirect",
    },
    COURSE_REQUEST_PROCESSED: {
      payload: `${
        import.meta.env.VITE_LMS_URL
      }/explore/request#_mine`,
      action: "redirect",
    },
    KMAP_ADD_COLLABORATOR_KMAP: {
      payload: `${import.meta.env.VITE_KMS_URL}/kmap`,
      action: "redirect",
    },
    KMAP_ADD_COLLABORATOR_KMAP_OBJECTIVE: {
      payload: `${import.meta.env.VITE_KMS_URL}/kmap`,
      action: "redirect",
    },
    KMAP_ADD_SME_KMAP: {
      payload: `${import.meta.env.VITE_KMS_URL}/kmap`,
      action: "redirect",
    },
    KMAP_COMMENT_KMAP: {
      payload: `${import.meta.env.VITE_KMS_URL}/kmap`,
      action: "redirect",
    },
    KMAP_COMMENT_KMAP_OBJECTIVE: {
      payload: `${import.meta.env.VITE_KMS_URL}/kmap`,
      action: "redirect",
    },
    REPOSITORY_ADD_COLLABORATOR: {
      payload: `${import.meta.env.VITE_KMS_URL}/repository`,
      action: "redirect",
    },
    SIGNATURE_MANAGEMENT_INVITE: {
      payload: `${import.meta.env.VITE_LMS_URL}/signature-management`,
      action: "redirect",
    },
    SIGNATURE_MANAGEMENT_EDIT: {
      payload: `${import.meta.env.VITE_LMS_URL}/signature-management`,
      action: "redirect",
    },
    SIGNATURE_MANAGEMENT_REINVITE: {
      payload: `${import.meta.env.VITE_LMS_URL}/signature-management`,
      action: "redirect",
    },
    SOCIAL_COMMENT_POST: {
      payload: `${import.meta.env.VITE_KMS_URL}/home?post=${data}`,
      action: "redirect",
    },
    SOCIAL_FOLLOW: {
      payload: `${import.meta.env.VITE_KMS_URL}/home/detail/${id}`,
      action: "redirect",
    },
    SOCIAL_LIKE_POST: {
      payload: `${import.meta.env.VITE_KMS_URL}/home?post=${data}`,
      action: "redirect",
    },
    SOCIAL_MENTION: {
      payload: `${import.meta.env.VITE_KMS_URL}/home?post=${data}`,
      action: "redirect",
    },
    SOCIAL_MENTION_POST: {
      payload: `${import.meta.env.VITE_KMS_URL}/home?post=${data}`,
      action: "redirect",
    },
    SOCIAL_MENTION_COMMENT: {
      payload: `${import.meta.env.VITE_KMS_URL}/home?post=${
        data?.post_id
      }&comment=${data?.comment_id}`,
      action: "redirect",
    },
    FORUM_QUESTION_POST: {
      payload: `${
        import.meta.env.VITE_KMS_URL
      }/ask-expert?tab=questions&id=${data}`,
      action: "redirect",
    },
    FORUM_QUESTION_COMMENT_POST: {
      payload: `${
        import.meta.env.VITE_KMS_URL
      }/ask-expert?tab=answers&id=${data}`,
      action: "redirect",
    },

    // BAST NOTIFICATIONS
    "BAST_CREATE_NEED_INSPECTOR_1.1": {
      payload: `${
        import.meta.env.VITE_LMS_URL
      }/vendor-management/${vendorId}/bast/${bast_course_id}`,
      action: "redirect",
    },
    "BAST_HAS_ACCEPTED_INSPECTOR_1.x_NEED_ADD_DOCS_CREATOR": {
      payload: `${
        import.meta.env.VITE_LMS_URL
      }/vendor-management/${vendorId}/bast/${bast_course_id}`,
      action: "redirect",
    },
    "BAST_HAS_ACCEPTED_INSPECTOR_1.x_NEED_INSPECTOR_1.x": {
      payload: `${
        import.meta.env.VITE_LMS_URL
      }/vendor-management/${vendorId}/bast/${bast_course_id}`,
      action: "redirect",
    },
    "BAST_HAS_ACCEPTED_INSPECTOR_2.x_NEED_INSPECTOR_2.x": {
      payload: `${
        import.meta.env.VITE_LMS_URL
      }/vendor-management/${vendorId}/bast/${bast_course_id}`,
      action: "redirect",
    },
    BAST_HAS_REJECTED_NEED_REVISION: {
      payload: `${
        import.meta.env.VITE_LMS_URL
      }/vendor-management/${vendorId}/bast/${bast_course_id}`,
      action: "redirect",
    },
    "BAST_HAS_SIGNED_APPROVAL_1_NEED_INSPECTOR_2.1": {
      payload: `${
        import.meta.env.VITE_LMS_URL
      }/vendor-management/${vendorId}/bast/${bast_course_id}`,
      action: "redirect",
    },
    BAST_NEED_SIGNED_APPROVAL_1: {
      payload: `${
        import.meta.env.VITE_LMS_URL
      }/vendor-management/${vendorId}/bast/${bast_course_id}`,
      action: "redirect",
    },
    BAST_NEED_SIGNED_APPROVAL_2: {
      payload: `${
        import.meta.env.VITE_LMS_URL
      }/vendor-management/${vendorId}/bast/${bast_course_id}`,
      action: "redirect",
    },
    BAST_ACCEPTANCE_DONE: {
      payload: `${
        import.meta.env.VITE_LMS_URL
      }/vendor-management/${vendorId}/bast/${bast_course_id}`,
      action: "redirect",
    },
    CCMM_MEMBER_LIMIT_CHANGE_AGENT: {
      payload: `${
        import.meta.env.VITE_CMS_URL
      }/change-catalyst-member-management`,
      action: "redirect",
    },
    CCMM_MEMBER_LIMIT_CHANGE_CHAMPION: {
      payload: `${
        import.meta.env.VITE_CMS_URL
      }/change-catalyst-member-management`,
      action: "redirect",
    },
    CCMM_MEMBER_LIMIT_AGENT_LESS: {
      payload: `${
        import.meta.env.VITE_CMS_URL
      }/change-catalyst-member-management?main_tab=member-setting&list_tab=CHANGE_AGENT`,
      action: "redirect",
    },
    CCMM_MEMBER_LIMIT_AGENT_MORE: {
      payload: `${
        import.meta.env.VITE_CMS_URL
      }/change-catalyst-member-management?main_tab=member-setting&list_tab=CHANGE_AGENT`,
      action: "redirect",
    },
    CCMM_MEMBER_LIMIT_CHAMPION_LESS: {
      payload: `${
        import.meta.env.VITE_CMS_URL
      }/change-catalyst-member-management?main_tab=member-setting&list_tab=CHANGE_CHAMPION`,
      action: "redirect",
    },
    CCMM_MEMBER_LIMIT_CHAMPION_MORE: {
      payload: `${
        import.meta.env.VITE_CMS_URL
      }/change-catalyst-member-management?main_tab=member-setting&list_tab=CHANGE_CHAMPION`,
      action: "redirect",
    },
  };

  const { payload, action, modalId, modalProps } =
    lookupObj?.[type] || {};

  if (action === "redirect") {
    window.location.href = payload;
  }
  if (action === "open-modal") {
    NiceModal.show(modalId, modalProps);
  }
};

export default notifURLLookup;
