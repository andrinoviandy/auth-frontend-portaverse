import NiceModal from "@ebay/nice-modal-react";

export default function showErrorDialog(err) {
  NiceModal.show("error-handling-dialog", { err });
  setTimeout(() => {
    NiceModal.hide("error-handling-dialog");
    setTimeout(() => {
      NiceModal.remove("error-handling-dialog");
    }, 500);
  }, 3000);
}
