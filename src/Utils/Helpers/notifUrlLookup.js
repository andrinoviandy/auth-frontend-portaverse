import NiceModal from "@ebay/nice-modal-react";
import MODAL_IDS from "../../Components/Modals/modalIds";

const notifURLLookup = (type, id, data) => {
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
