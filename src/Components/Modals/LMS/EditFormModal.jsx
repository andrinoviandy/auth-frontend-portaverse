/* eslint-disable react/jsx-props-no-spreading */
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Icon } from "@iconify/react";
import { Button, Input, Textarea, TextInput } from "@mantine/core";
import { MIME_TYPES } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import { useQueryClient } from "react-query";

import MODAL_IDS from "../modalIds";
import SectionModalTemplate from "../Templates/SectionModal";
import { CustomMantineDropzone } from "../../Dropzone/Dropzone";
import {
  postFile,
  putBannerSection,
  putCourseSection,
  putDepartmentSection,
  putFooterSection,
  putHeaderSection,
  putMerchandiseSection,
  putThirdSection,
  putTutorSection,
  putVoucherSection,
} from "../../../Networks";
import closeNiceModal from "../../../Utils/Helpers/closeNiceModal";
import showErrorDialog from "../../../Utils/Helpers/showErrorDialog";
import showSuccessDialog from "../../../Utils/Helpers/showSuccessDialog";

const MAX_IMAGE_SIZE = 1 * 1024 * 1024;
const EditFormModal = NiceModal.create(
  ({
    identifier,
    section,
    title,
    type,
    maxFile,
    data,
    onSetPreviewData = () => {},
    onSuccessSubmit = () => {},
  }) => {
    const modalId = MODAL_IDS.LMS.GENERAL.CMS_EDIT_FORM;
    const queryClient = useQueryClient();
    const modal = useModal(modalId);

    const formSocmed = useForm({
      initialValues: {
        link_fb: data?.link_fb || "",
        link_ig: data?.link_ig || "",
        link_linkedin: data?.link_linkedin || "",
      },
    });
    const formText = useForm({
      initialValues: {
        text: typeof data === "string" ? data : "",
      },
    });
    const [filesValue, setFilesValue] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [isPreview, setIsPreview] = useState(false);

    const { isLoading: isLoadingPutHeader, mutate: updateHeader } =
      putHeaderSection();
    const { isLoading: isLoadingPutBanner, mutate: updateBanner } =
      putBannerSection();
    const { isLoading: isLoadingPutThird, mutate: updateThird } =
      putThirdSection();
    const { isLoading: isLoadingPutCourse, mutate: updateCourse } =
      putCourseSection();
    const { isLoading: isLoadingPutTutor, mutate: updateTutor } =
      putTutorSection();
    const {
      isLoading: isLoadingPutDepartment,
      mutate: updateDepartment,
    } = putDepartmentSection();
    const { isLoading: isLoadingPutVoucher, mutate: updateVoucher } =
      putVoucherSection();
    const {
      isLoading: isLoadingPutMerchandise,
      mutate: updateMerchandise,
    } = putMerchandiseSection();
    const { isLoading: isLoadingPutFooter, mutate: updateFooter } =
      putFooterSection();
    const {
      isLoading: isLoadingPostFile,
      mutateAsync: uploadFileAsync,
      mutate: uploadFile,
    } = postFile();

    const isLoadingPut = useMemo(() => {
      return (
        isLoadingPutHeader ||
        isLoadingPutBanner ||
        isLoadingPutThird ||
        isLoadingPutCourse ||
        isLoadingPutTutor ||
        isLoadingPutDepartment ||
        isLoadingPutVoucher ||
        isLoadingPutMerchandise ||
        isLoadingPutFooter ||
        isLoadingPostFile
      );
    }, [
      isLoadingPutHeader,
      isLoadingPutBanner,
      isLoadingPutThird,
      isLoadingPutCourse,
      isLoadingPutTutor,
      isLoadingPutDepartment,
      isLoadingPutVoucher,
      isLoadingPutMerchandise,
      isLoadingPutFooter,
      isLoadingPostFile,
    ]);

    const handleClose = () => {
      onSetPreviewData("");
      if (filePreview) {
        URL.revokeObjectURL(filePreview);
      }
      onSuccessSubmit();
      closeNiceModal(modalId);
    };

    const handleSuccessPut = () => {
      queryClient.invalidateQueries(["getLMSHome"]);
      handleClose();
      showSuccessDialog("Perubahan berhasil disimpan");
    };

    const getReqBody = async () => {
      let reqBody;
      if (type === "text") {
        return {
          [identifier]: formText.values.text,
        };
      }
      if (type === "image" && section !== "third") {
        if (maxFile > 1) {
          const fileKeys = Object.keys(filesValue);
          const upload = async (key) => {
            const formData = new FormData();
            formData.append("file", filesValue[key]);
            return uploadFileAsync(formData)
              .then((res) => res.file_id)
              .catch((err) => showErrorDialog(err));
          };

          return Promise.all(fileKeys.map(upload)).then((res) => ({
            [identifier]: res,
          }));
        }
        if (type === "image") {
          reqBody = new FormData();
          reqBody.append("file", filesValue[0]);
          return reqBody;
        }
      }
      if (type === "socmed") {
        return {
          ...formSocmed.values,
        };
      }
      return null;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      let reqBody = await getReqBody();

      if (section === "header") {
        updateHeader(reqBody, {
          onSuccess: handleSuccessPut,
          onError: (err) => showErrorDialog(err),
        });
      }

      if (section === "banner") {
        updateBanner(reqBody, {
          onSuccess: handleSuccessPut,
          onError: (err) => showErrorDialog(err),
        });
      }

      if (section === "third") {
        if (type === "image") {
          const formData = new FormData();
          formData.append("file", filesValue[0]);
          uploadFile(formData, {
            onSuccess: (res) => {
              reqBody = { [identifier]: res.file_id };
              updateThird(reqBody, {
                onSuccess: handleSuccessPut,
                onError: (err) => showErrorDialog(err),
              });
            },
            onError: (err) => showErrorDialog(err),
          });
        } else {
          updateThird(reqBody, {
            onSuccess: handleSuccessPut,
            onError: (err) => showErrorDialog(err),
          });
        }
      }

      if (section === "course") {
        updateCourse(reqBody, {
          onSuccess: handleSuccessPut,
          onError: (err) => showErrorDialog(err),
        });
      }

      if (section === "tutor") {
        updateTutor(reqBody, {
          onSuccess: handleSuccessPut,
          onError: (err) => showErrorDialog(err),
        });
      }

      if (section === "department") {
        updateDepartment(reqBody, {
          onSuccess: handleSuccessPut,
          onError: (err) => showErrorDialog(err),
        });
      }

      if (section === "voucher") {
        updateVoucher(reqBody, {
          onSuccess: handleSuccessPut,
          onError: (err) => showErrorDialog(err),
        });
      }

      if (section === "merchandise") {
        updateMerchandise(reqBody, {
          onSuccess: handleSuccessPut,
          onError: (err) => showErrorDialog(err),
        });
      }

      if (section === "footer") {
        updateFooter(reqBody, {
          onSuccess: handleSuccessPut,
          onError: (err) => showErrorDialog(err),
        });
      }
    };

    const handleShowPreview = () => {
      setIsPreview(true);

      let tmpFilePreview = null;
      if (filesValue?.[0]) {
        tmpFilePreview = URL.createObjectURL(filesValue[0]);
        setFilePreview(tmpFilePreview);
      }

      onSetPreviewData(tmpFilePreview || formText.values.text);
    };

    const isDisabled = useMemo(() => {
      if (type === "text") return !formText.isDirty();
      if (type === "socmed") return !formSocmed.isDirty();
      if (type === "image") return filesValue === null;
      return false;
    }, [type, formSocmed, formText, filesValue]);

    if (isPreview) {
      return (
        <div className="shadow fixed top-0 z-[100] flex w-full items-center justify-between bg-primary1 px-5 py-4">
          <p className="font-semibold">Pratinjau Perubahan</p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setIsPreview(false)}
              disabled={isLoadingPut}
            >
              Ubah Kembali
            </Button>
            <Button onClick={handleSubmit} loading={isLoadingPut}>
              Simpan Perubahan
            </Button>
          </div>
        </div>
      );
    }

    return (
      <SectionModalTemplate
        isOpen={modal.visible}
        handleClose={handleClose}
        title={title}
        classNames={{ modal: "w-[40vw]" }}
        footerElement={
          <>
            <Button
              onClick={handleClose}
              variant="outline"
              disabled={isLoadingPut}
            >
              Batalkan
            </Button>
            <Button
              onClick={handleShowPreview}
              loading={isLoadingPut}
              disabled={isDisabled}
            >
              Pratinjau
            </Button>
          </>
        }
      >
        <form className="flex w-full flex-col p-4">
          {type === "text" && (
            <Textarea
              variant="unstyled"
              minRows={10}
              {...formText.getInputProps("text")}
            />
          )}
          {type === "image" && (
            <Input.Wrapper
              label="Upload file image"
              description="Supported files are .jpg .jpeg .png"
              classNames={{ description: "mb-2" }}
            >
              <CustomMantineDropzone
                file={filesValue}
                setFile={(files) => {
                  if (filePreview) {
                    URL.revokeObjectURL(filePreview);
                  }
                  setFilesValue(files);
                }}
                multiple
                typeComponent="multiple"
                maximumUploads={maxFile}
                maxSize={MAX_IMAGE_SIZE}
                orDescription="3563 × 1000 (4:1) recommended. Maximum Uploaded File 1MB"
                acceptType={[MIME_TYPES.jpeg, MIME_TYPES.png]}
              />
            </Input.Wrapper>
          )}
          {type === "socmed" && (
            <div className="flex w-full flex-col gap-5">
              <TextInput
                classNames={{
                  icon: "bg-bg2 text-black/60 rounded-l",
                  input: "pl-11",
                }}
                icon={<Icon icon="ci:facebook" />}
                {...formSocmed.getInputProps("link_fb")}
              />
              <TextInput
                classNames={{
                  icon: "bg-bg2 text-black/60 rounded-l",
                  input: "pl-11",
                }}
                icon={<Icon icon="akar-icons:instagram-fill" />}
                {...formSocmed.getInputProps("link_ig")}
              />
              <TextInput
                classNames={{
                  icon: "bg-bg2 text-black/60 rounded-l",
                  input: "pl-11",
                }}
                icon={<Icon icon="akar-icons:linkedin-box-fill" />}
                {...formSocmed.getInputProps("link_linkedin")}
              />
            </div>
          )}
        </form>
      </SectionModalTemplate>
    );
  },
);

EditFormModal.propTypes = {
  identifier: PropTypes.string,
  section: PropTypes.string,
  type: PropTypes.string,
  maxFile: PropTypes.number,
};

EditFormModal.defaultProps = {
  identifier: "",
  section: "",
  type: "text",
  maxFile: 1,
};

export default EditFormModal;
