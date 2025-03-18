import { Icon } from "@iconify/react";
import {
  Avatar,
  Button,
  FileButton,
  PasswordInput,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import axios from "axios";
import PortaverseLogo from "../../Components/Assets/Pictures/PortaverseLogoV2.png";
import baseURLRepositoryFile from "../../Utils/Helpers/baseURLRepositoryFile";
import { useGetExternalUser } from "./Hooks/useGetExternalUser";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import { useExternalPost } from "./Hooks/useExternalPost";
import { setSocialMediaProfile } from "../../Configs/Redux/slice";
import NiceModal from "@ebay/nice-modal-react";
import MODAL_IDS from "../../Components/Modals/modalIds";
import closeNiceModal from "../../Utils/Helpers/closeNiceModal";
import showSuccessDialog from "../../Utils/Helpers/showSuccessDialog";

export default function SignUpExternalUser() {
  const { invitationCode } = useParams();
  const navigate = useNavigate();
  const defaultAvatar =
    "https://dev-obs-portaverse.ilcs.co.id/files/default-user.jpeg";

  useEffect(() => {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    if (!uuidRegex.test(invitationCode)) {
      navigate("*");
    }
  }, [invitationCode, navigate]);

  const today = dayjs().toDate();
  const form = useForm({
    initialValues: {
      fileId: "",
      name: "",
      email: "",
      birth: "",
      birthday: "",
      address: "",
      password: "",
      phoneNumber: "",
      invitationId: 0,
      roleCode: "",
    },
    validate: {
      email: (value) =>
        !value
          ? "Email harus diisi"
          : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            ? null
            : "Email tidak valid",
      name: (value) => (!value ? "Nama harus diisi" : null),
      address: (value) => (!value ? "Alamat harus diisi" : null),
      birth: (value) =>
        !value
          ? "Tanggal Lahir harus diisi"
          : value === today
            ? "Isi tanggal lahir dengan benar"
            : null,
      birthday: (value) =>
        !value
          ? "Tanggal Lahir harus diisi"
          : value === today
            ? "Isi tanggal lahir dengan benar"
            : null,
      password: (value) => (!value ? "Password harus diisi" : null),
    },
  });

  const [fileKey, setFileKey] = useState(Date.now());
  const [previewImage, setPreviewImage] = useState("");
  const [fetchError, setFetchError] = useState([]);

  const handleImageUpload = async (file) => {
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        `${baseURLRepositoryFile}/file`,
        formData,
        {
          headers: {
            "api-key": "smartkms2022",
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response?.data?.data?.file_id) {
        form.setFieldValue("fileId", response.data.data.file_id);
        showSuccessDialog("Gambar berhasil di upload");
        setFileKey(Date.now());
        const reader = new FileReader();
        reader.onload = (e) => setPreviewImage(e.target?.result);
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.error("File upload failed", error);
    }
  };

  const handleBirthChange = (value) => {
    form.setFieldValue("birth", value);

    const parsedDate =
      value && dayjs(value).isValid()
        ? dayjs(value)
        : dayjs(new Date());

    form.setFieldValue("birthday", parsedDate.format("YYYY-MM-DD"));
  };

  const { data: dataUser } = useGetExternalUser({
    invitationCode: invitationCode,
  });

  useEffect(() => {
    if (dataUser?.data) {
      const {
        invitationListId,
        name,
        email,
        period,
        birthday,
        address,
        status,
        roleCode,
        startDate,
        endDate,
      } = dataUser.data;

      // let birth = dayjs(birthday, "DD/MM/YYYY").format("YYYY-MM-DD");

      // let parsedbirth = dayjs(birthday, "DD/MM/YYYY");
      // parsedbirth = parsedbirth.isValid()
      //   ? parsedbirth.toDate()
      //   : null;

      form.setValues({
        invitationId: invitationListId || "",
        name: name || "",
        email: email || "",
        roleCode: roleCode || "",
        // birth: parsedbirth || "",
        // birthday: parsedbirth || "",
        address: address || "",
        status: status || "",
        startDate: startDate || "",
        endDate: endDate || "",
      });
      form.validateField("birthday");
    }
  }, [dataUser]);

  const { mutate: postData, isLoading: loadingPost } =
    useExternalPost();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFetchError([]);
    const isValid = form.validate();
    if (!isValid) return;

    const formData = {
      ...form.values,
      fileId: Number(form.values.fileId),
    };

    const handleError = (error) => {
      const messages = error?.response?.data?.message || [];
      if (Array.isArray(messages)) {
        setFetchError(messages.map((err) => err.message));
      } else {
        setFetchError(["Something went wrong!"]);
      }
    };

    postData(formData, {
      onSuccess: () => {
        form.reset();
        NiceModal.show(MODAL_IDS.GENERAL.CONFIRMATION, {
          message: "Berhasil Sign Up",
          subMessage: "Silahkan Login untuk melanjutkan",
          variant: "safe",
          withCancel: false,
          withConfirm: false,
        });
        setTimeout(() => {
          NiceModal.hide(MODAL_IDS.GENERAL.CONFIRMATION);
          navigate("/login");
        }, 2000);
      },
      onError: handleError,
    });
  };

  return (
    <div className="flex flex-col gap-16 w-full">
      <div className="flex flex-col gap-2 items-start">
        <img
          src={PortaverseLogo}
          alt="company_logo"
          className="h-[60px] object-contain"
        />
        <p className="text-darkGrey font-medium">
          Universe of Growth & Agility
        </p>
      </div>

      <div className="flex justify-center flex-col items-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full"
        >
          <Text size="lg" fw={500}>
            Profile Photo
          </Text>
          <div className="relative flex items-center">
            <Avatar
              src={
                previewImage ||
                dataUser?.data.profilePicture ||
                defaultAvatar
              }
              alt="Profile Picture"
              size={80}
            />
            <FileButton
              key={fileKey}
              onChange={handleImageUpload}
              accept="image/png,image/jpeg"
            >
              {(props) => (
                <Icon
                  className="absolute z-10 mx-[60px] mt-16 cursor-pointer"
                  color="#005499"
                  fontSize="24"
                  icon="mdi:pencil-circle"
                  {...props}
                />
              )}
            </FileButton>
          </div>
          <TextInput
            withAsterisk
            label="Nama"
            size="md"
            placeholder="Masukkan nama"
            error={form?.errors?.name}
            {...form.getInputProps("name")}
          />
          <TextInput
            withAsterisk
            label="Email"
            size="md"
            placeholder="Masukkan email"
            error={form?.errors?.email}
            {...form.getInputProps("email")}
          />
          <DateInput
            withAsterisk
            valueFormat="DD MMMM YYYY"
            label="Tanggal Lahir"
            size="md"
            placeholder="Pilih Tanggal Lahir"
            leftSection={
              <Icon fontSize="20" icon="solar:calendar-outline" />
            }
            error={form?.errors?.birth}
            {...form.getInputProps("birth")}
            onChange={handleBirthChange}
          />
          <Textarea
            withAsterisk
            label="Alamat"
            size="md"
            placeholder="Masukkan Alamat"
            error={form?.errors?.address}
            {...form.getInputProps("address")}
          />
          <div>
            <PasswordInput
              withAsterisk
              label="Password"
              size="md"
              placeholder="Masukkan password"
              error={form?.errors?.password}
              {...form.getInputProps("password")}
            />
            {fetchError.length > 0 && (
              <div className="text-red-500 text-sm mt-6 pl-4">
                {fetchError.map((msg, index) => (
                  <ul key={index}>
                    <li className="list-disc">{msg}</li>
                  </ul>
                ))}
              </div>
            )}
          </div>

          <Button
            className="mt-4"
            loading={loadingPost}
            type="submit"
          >
            Submit
          </Button>
        </form>

        <a
          className="text-darkGrey mt-7 flex items-center font-semibold"
          href="http://wa.me/+628113117698"
        >
          <Icon
            icon="mingcute:service-fill"
            className="inline mr-2"
            width={20}
          />
          Helpdesk
        </a>
      </div>
    </div>
  );
}
