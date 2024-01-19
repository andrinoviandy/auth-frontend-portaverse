/* eslint-disable react/jsx-props-no-spreading */
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Button, Textarea } from "@mantine/core";
import closeNiceModal from "../../../Utils/Helpers/closeNiceModal";
import SectionModalTemplate from "../Templates/SectionModal";
import MODAL_IDS from "../modalIds";

const ModalKPIFormula = NiceModal.create(({ value }) => {
  const modalId = MODAL_IDS.TMS.SMARTPLAN.KPI_FORMULA;
  const modal = useModal(modalId);

  return (
    <SectionModalTemplate
      title="Formula KPI"
      isOpen={modal.visible}
      handleClose={() => closeNiceModal(modalId)}
      withCloseButton
      footerElement={
        <Button onClick={() => closeNiceModal(modalId)}>Tutup</Button>
      }
    >
      <div className="flex flex-col gap-5 p-5 max-h-[40vh] overflow-y-auto scroll-style-3">
        <Textarea
          placeholder="Tidak ada formula"
          value={value}
          readOnly
          minRows={5}
        />
      </div>
    </SectionModalTemplate>
  );
});

export default ModalKPIFormula;
