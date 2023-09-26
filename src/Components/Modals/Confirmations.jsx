import NiceModal, { useModal } from "@ebay/nice-modal-react";
import closeNiceModal from "../../Utils/Helpers/closeNiceModal";
import ConfirmationModalTemplate from "./Templates/ConfirmationModal";
import MODAL_IDS from "./modalIds";

const Confirmations = NiceModal.create(
  ({
    message,
    subMessage,
    isLoading,
    handleConfirm,
    handleCancel = null,
    variant = "safe",
    withCancel = true,
    withConfirm = true,
    labelCancel = "Tidak",
    labelConfirm = "Ya",
    modalWidth = "350px",
    buttonWidth,
  }) => {
    const modalId = MODAL_IDS.GENERAL.CONFIRMATION;
    const modal = useModal(modalId);

    return (
      <ConfirmationModalTemplate
        isOpen={modal.visible}
        variant={variant}
        message={message}
        subMessage={subMessage}
        handleClose={
          handleCancel !== null
            ? handleCancel
            : () => closeNiceModal(modalId)
        }
        handleConfirm={handleConfirm}
        withCancel={withCancel}
        withConfirm={withConfirm}
        labelCancel={labelCancel}
        labelConfirm={labelConfirm}
        isLoadingConfirm={isLoading}
        width={modalWidth}
        buttonWidth={buttonWidth}
      />
    );
  },
);

export default Confirmations;
