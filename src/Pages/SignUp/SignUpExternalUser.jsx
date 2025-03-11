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

export default function SignUpExternalUser() {
  const { invitationCode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    if (!uuidRegex.test(invitationCode)) {
      navigate("*");
    }
  }, [invitationCode, navigate]);

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
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
      birthday: (value) =>
        !value ? "Tanggal Lahir harus diisi" : null,
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
            "smartkmsystem-authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJtTktnQkpvTVlmVTVsQXVoVjl6bWV1WFpXSW0yIiwidXNlcl9pZCI6MTI1LCJlbXBsb3llZSI6eyJlbXBsb3llZV9pZCI6NSwiZW1wbG95ZWVfbnVtYmVyIjoidXNlcmQifSwicm9sZV9jb2RlIjpbIlNNRSIsIlVTRVIiLCJTQSIsbnVsbF0sInByaXZpbGVnZXMiOlsicGxlYXNlIGdldCBpdCBvbiBncm91cCBzZXJ2aWNlIChlYWNoIG1vZHVsZSkiXSwicmFuZG9tIjoiUHJldmVudGl2ZSBtZWFzdXJlcyIsImV4cCI6MTc0MjA1NDI0MiwiaWF0IjoxNzQxNjIyMjQyfQ.zfugYuv8Hf8oNKv4ykMO_EPS0m8G401Z6zItomyfyaU`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response?.data?.data?.file_id) {
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
      } = dataUser.data;

      let birth = dayjs(birthday, "DD/MM/YYYY").format("YYYY-MM-DD");

      let parsedbirth = dayjs(birthday, "DD/MM/YYYY");
      parsedbirth = parsedbirth.isValid()
        ? parsedbirth.toDate()
        : dayjs().toDate();

      let startDate = "";
      let endDate = "";

      if (period) {
        const [start, end] = period.split("-");
        startDate = dayjs(start, "DD/MM/YYYY").format("YYYY-MM-DD");
        endDate = dayjs(end, "DD/MM/YYYY").format("YYYY-MM-DD");
      }

      form.setValues({
        invitationId: invitationListId || "",
        name: name || "",
        email: email || "",
        roleCode: roleCode || "",
        birth: parsedbirth || "",
        birthday: parsedbirth || "",
        address: address || "",
        status: status || "",
        startDate: startDate || "",
        endDate: endDate || "",
      });
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
        setFetchError(messages.map((err) => err.message)); // Extract only the messages
      } else {
        setFetchError(["Something went wrong!"]); // Fallback to default message
      }
    };

    postData(formData, {
      onSuccess: () => {
        form.reset();
        setTimeout(() => {
          navigate("/login");
        }, 4000);
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
          <Text className="text-text1" size="lg" weight={600}>
            Profile Photo
          </Text>
          <div className="relative flex items-center">
            <Avatar
              src={
                previewImage || dataUser?.data.profilePicture || ""
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
            label="Nama"
            size="md"
            placeholder="Masukkan nama"
            error={form?.errors?.name}
            {...form.getInputProps("name")}
          />
          <TextInput
            label="Email"
            size="md"
            placeholder="Masukkan email"
            error={form?.errors?.email}
            {...form.getInputProps("email")}
          />
          <DateInput
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
            label="Alamat"
            size="md"
            placeholder="Masukkan Alamat"
            error={form?.errors?.address}
            {...form.getInputProps("address")}
          />
          <div>
            <PasswordInput
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

          <Button loading={loadingPost} type="submit">
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
