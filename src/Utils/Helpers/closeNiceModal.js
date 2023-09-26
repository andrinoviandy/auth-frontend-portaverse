import NiceModal from "@ebay/nice-modal-react";

export default function closeNiceModal(modalId) {
  NiceModal.hide(modalId);

  // remove modal to improve performance
  return new Promise((resolve) =>
    // eslint-disable-next-line no-promise-executor-return
    setTimeout(() => {
      NiceModal.remove(modalId);
      return resolve();
    }, 100),
  );
}
