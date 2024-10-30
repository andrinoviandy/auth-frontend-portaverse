import NiceModal, { useModal } from "@ebay/nice-modal-react";

import MODAL_IDS from "./modalIds";
import ConfirmationModalTemplate, {
  ConfirmationModalTemplateProps,
} from "./Templates/ConfirmationModal";
import closeNiceModal from "../../Utils/Helpers/closeNiceModal";

interface ConfirmationsProps extends ConfirmationModalTemplateProps {
  handleCancel?: () => void;
}

const Confirmations = NiceModal.create(
  ({
    message,
    subMessage,
    handleConfirm,
    handleCancel,
    variant = "safe",
    withCancel = true,
    withConfirm = true,
    labelCancel = "Tidak",
    labelConfirm = "Ya",
    width = "350px",
    buttonWidth,
    icon,
  }: ConfirmationsProps) => {
    const modalId = MODAL_IDS.GENERAL.CONFIRMATION;
    const modal = useModal(modalId);

    return (
      <ConfirmationModalTemplate
        isOpen={modal.visible}
        variant={variant}
        message={message}
        subMessage={subMessage}
        handleClose={
          handleCancel !== undefined
            ? handleCancel
            : () => closeNiceModal(modalId)
        }
        handleConfirm={handleConfirm}
        withCancel={withCancel}
        withConfirm={withConfirm}
        labelCancel={labelCancel}
        labelConfirm={labelConfirm}
        width={width}
        buttonWidth={buttonWidth}
        icon={icon}
      />
    );
  },
);

export default Confirmations;
