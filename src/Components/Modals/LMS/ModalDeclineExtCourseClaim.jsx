/* eslint-disable react/jsx-props-no-spreading */
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Button, Textarea } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import * as yup from "yup";

import MODAL_IDS from "../modalIds";
import SectionModalTemplate from "../Templates/SectionModal";
import {
  BASE_PROXY,
  COURSE_ENDPOINT,
} from "../../../Networks/endpoint";
import { Networks } from "../../../Networks/factory";
import closeNiceModal from "../../../Utils/Helpers/closeNiceModal";
import showSuccessDialog from "../../../Utils/Helpers/showSuccessDialog";

const ModalDeclineExtCourseClaim = NiceModal.create(
  ({ courseClaimIds, onSuccess, note }) => {
    const modalId = MODAL_IDS.LMS.DASHBOARD.DECLINE_EXT_COURSE_CLAIM;
    const modal = useModal(modalId);

    const form = useForm({
      initialValues: {
        note: note || "",
      },
      validate: yupResolver(
        yup.object().shape({
          note: yup.string().required(),
        }),
      ),
    });

    const courseService = Networks(BASE_PROXY.course);

    const { mutateAsync, isLoading: isLoadingAction } =
      courseService.mutation("put");

    const handleDecline = async () => {
      const promises = courseClaimIds.map((id) => {
        return mutateAsync({
          endpoint: COURSE_ENDPOINT.PUT.updateExtCourseClaim(id),
          data: { note: form.values.note },
          axiosConfigs: {
            params: {
              status: "Ditolak",
            },
          },
        });
      });
      await Promise.all(promises).then(() => {
        showSuccessDialog(
          "Penolakan klaim learning hour berhasil diajukan",
          "Berhasil",
        );
        closeNiceModal(MODAL_IDS.DASHBOARD.DECLINE_EXT_COURSE_CLAIM);
        onSuccess();
      });
    };

    const showConfirmation = (ids) => {
      NiceModal.show(MODAL_IDS.GENERAL.CONFIRMATION, {
        message: "Klaim Learning Hour",
        subMessage:
          "Anda yakin ingin menolak klaim learning hour ini?",
        variant: "danger",
        labelCancel: "Tinjau Ulang",
        labelConfirm: "Ya, Saya Yakin",
        handleConfirm: () =>
          closeNiceModal(MODAL_IDS.GENERAL.CONFIRMATION).then(() =>
            handleDecline(ids),
          ),
      });
    };

    return (
      <SectionModalTemplate
        title={
          note
            ? "Alasan Penolakan Klaim"
            : "Tolak Klaim Learning Hour"
        }
        isOpen={modal.visible}
        withCloseButton
        handleClose={() => closeNiceModal(modalId)}
        withFooter
        footerElement={
          <>
            <Button
              variant={note ? "filled" : "outline"}
              onClick={() => closeNiceModal(modalId)}
              disabled={isLoadingAction}
            >
              {note ? "Tutup" : "Batalkan"}
            </Button>
            {!note && (
              <Button
                onClick={showConfirmation}
                disabled={!form.isValid() || !!note}
                loading={isLoadingAction}
              >
                Kirim Penolakan
              </Button>
            )}
          </>
        }
      >
        <div className="scroll-style-3 max-h-[50vh] overflow-y-auto p-5">
          <Textarea
            label="Alasan Penolakan"
            placeholder="Tuliskan alasan penolakan Anda..."
            {...form.getInputProps("note")}
            classNames={{ input: "resize-y" }}
            minRows={5}
            disabled={!!note}
          />
        </div>
      </SectionModalTemplate>
    );
  },
);
export default ModalDeclineExtCourseClaim;
