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
import { useParams } from "react-router-dom";
import { useExternalPost } from "./Hooks/useExternalPost";

export default function SignUpExternalUser() {
  const { invitationCode } = useParams();
  useEffect(() => {}, [invitationCode]);
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      birthday: "",
      address: "",
      password: "",
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

  const { data: dataUser } = useGetExternalUser({
    invitationCode: invitationCode,
  });

  useEffect(() => {
    if (dataUser?.data) {
      const {
        userId,
        name,
        email,
        period,
        birthday,
        address,
        phoneNumber,
        status,
      } = dataUser.data;

      let parsedbirth = dayjs(birthday, "DD/MM/YYYY").toDate();

      form.setValues({
        userId: userId || "",
        name: name || "",
        email: email || "",
        birth: parsedbirth,
        birthday: parsedbirth,
        address: address || "",
        phoneNumber: phoneNumber || "",
        status: status || "",
      });
    }
  }, [dataUser]);

  const { mutate: postData, isLoading: loadingPost } =
    useExternalPost();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      ...form.values,
      fileId: Number(form.values.fileId),
    };

    const handleError = (error) => {
      showErrorDialog("Gagal Signup disimpan");
    };

    postData(formData, {
      onSuccess: () => {
        postData(formData, {
          onSuccess: () => {
            form.reset();
            // showSuccessDialog(
            //   "External User berhasil diedit dan disimpan",
            // );
          },
          onError: handleError,
        });

        form.reset();
        // showSuccessDialog(
        //   "External User berhasil diedit dan disimpan",
        // );
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
              src={previewImage || ""}
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
            error={form.errors.name}
            {...form.getInputProps("name")}
          />
          <TextInput
            label="Email"
            size="md"
            placeholder="Masukkan email"
            error={form.errors.email}
            {...form.getInputProps("email")}
          />
          <DateInput
            valueFormat="DD MMMM YYYY"
            label="Tanggal Lahir"
            size="md"
            placeholder="Pilih Tanggal Lahir"
            error={form.errors.birthday}
            {...form.getInputProps("birthday")}
          />
          <Textarea
            label="Alamat"
            size="md"
            placeholder="Masukkan Alamat"
            error={form.errors.address}
            {...form.getInputProps("address")}
          />
          <PasswordInput
            label="Password"
            size="md"
            placeholder="Masukkan password"
            error={form.errors.password}
            {...form.getInputProps("password")}
          />

          <Button type="submit">Submit</Button>
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
