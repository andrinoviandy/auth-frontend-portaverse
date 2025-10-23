/* eslint-disable simple-import-sort/imports */
import { useState, useCallback } from "react";

import { Button } from "@mantine/core";
import { Icon } from "@iconify/react";
import { useMutation } from "react-query";

import Logo from "../../Components/Assets/Pictures/PortaverseLogo.png";
import { color } from "../../Utils/Constants";
import BuatPassword from "./Components/BuatPassword";
import InputNIPP from "./Components/InputNIPP";
import UnggahDokumen from "./Components/UnggahDokumen";
import VerifikasiEmail from "./Components/VerifikasiEmail";
import {
  RegistrationFormProvider,
  useRegistrationForm,
} from "./Contexts/RegistrationFormContext";
import {
  postSendVerificationCode,
  postCreatePassword,
} from "../../Networks/UserRegistration/Post";
import showErrorDialog from "../../Utils/Helpers/showErrorDialog";

const STEPS = {
  0: "Input NIPP",
  1: "Verifikasi Email",
  2: "Buat Password",
  3: "Unggah Dokumen",
};

const BACK_BUTTON_TEXT = {
  0: "Kembali ke Login",
  1: "Kembali ke Input NIPP",
  2: "Kembali ke Verifikasi Email",
  3: "Kembali ke Buat Password",
};

function UserRegistration() {
  const [currentStep, setCurrentStep] = useState(0);

  const form = useRegistrationForm({
    initialValues: {
      0: {
        nipp: "",
        userRegistrationId: null,
        namaPekerja: "",
        emailKorporat: "",
        emailFromApi: "", // Track the original email from API
        unitKerja: "",
        statusPekerja: "",
        namaAtasanLangsung: "",
        jabatanAtasanLangsung: "",
      },
      1: {
        verificationCode: "",
        // Null: belum submit, false: gagal, true: berhasil
        isEmailVerified: null,
      },
      2: {
        password: "",
        confirmPassword: "",
      },
      3: {
        fotoProfil: [],
        fotoIdCard: [],
        fileSKPKWT: [],
      },
    },
    validate: {
      0: {
        nipp: (value) => (!value ? "NIPP harus diisi" : null),
        namaPekerja: (value) =>
          !value ? "Nama Pekerja harus diisi" : null,
        emailKorporat: (value) =>
          !value ? "Email Korporat harus diisi" : null,
        unitKerja: (value) =>
          !value ? "Unit Kerja harus diisi" : null,
        statusPekerja: (value) =>
          !value ? "Status Pekerja harus diisi" : null,
        namaAtasanLangsung: (value) =>
          !value ? "Nama Atasan Langsung harus diisi" : null,
        jabatanAtasanLangsung: (value) =>
          !value ? "Jabatan Atasan Langsung harus diisi" : null,
      },
      1: {
        verificationCode: (value) =>
          !value ? "Kode Verifikasi harus diisi" : null,
        isEmailVerified: (value) =>
          !value ? "Email belum terverifikasi" : null,
      },
      2: {
        password: (value) => {
          if (!value) return "Password harus diisi";
          if (value.length < 12)
            return "Password minimal 12 karakter";
          if (!/[A-Z]/.test(value))
            return "Password harus mengandung huruf kapital";
          if (!/[0-9]/.test(value))
            return "Password harus mengandung angka";
          if (!/[!@$%^&*+#]/.test(value))
            return "Password harus mengandung simbol atau karakter spesial";
          return null;
        },
        confirmPassword: (value, values) =>
          value !== values[2]?.password
            ? "Konfirmasi password tidak cocok"
            : null,
      },
      3: {
        fotoProfil: (value) =>
          !value || value.length === 0
            ? "Foto Profil harus diunggah"
            : null,
        fotoIdCard: (value) =>
          !value || value.length === 0
            ? "Foto ID Card harus diunggah"
            : null,
        fileSKPKWT: (value) =>
          !value || value.length === 0
            ? "File SK/PKWT harus diunggah"
            : null,
      },
    },
  });

  const { mutate: sendVerificationCode, isLoading: isSendingCode } =
    useMutation(
      ({ userRegistrationId, email }) =>
        postSendVerificationCode(userRegistrationId, email),
      {
        onSuccess: () => {
          setCurrentStep((prev) => (prev < 3 ? prev + 1 : prev));
        },
        onError: (err) => {
          const errorMessage =
            err?.response?.data?.message ||
            "Gagal mengirim kode verifikasi";
          form.setFieldError("0.nipp", errorMessage);
          showErrorDialog(err);
        },
      },
    );

  const { mutate: createPassword, isLoading: isCreatingPassword } =
    useMutation(
      ({ userRegistrationId, password }) =>
        postCreatePassword(userRegistrationId, password),
      {
        onSuccess: () => {
          setCurrentStep((prev) => (prev < 3 ? prev + 1 : prev));
        },
        onError: (err) => {
          showErrorDialog(err);
        },
      },
    );

  const handleBack = useCallback(() => {
    if (currentStep === 0) {
      // Navigate to login
      window.location.href = "/login";
    } else {
      // Reset verification when going back from step 1
      if (currentStep === 1) {
        form.setFieldValue("1.verificationCode", "");
        form.setFieldValue("1.isEmailVerified", null);
      }
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep, form]);

  const handleNext = useCallback(() => {
    // If we're on step 0 (Input NIPP), call send verification code API
    if (currentStep === 0) {
      const userRegistrationId = form.values[0]?.userRegistrationId;
      const currentEmail = form.values[0]?.emailKorporat;
      const emailFromApi = form.values[0]?.emailFromApi;

      // Only send email parameter if it was manually edited (emailFromApi is empty)
      const emailToSend =
        !emailFromApi && currentEmail ? currentEmail : null;

      if (userRegistrationId) {
        sendVerificationCode({
          userRegistrationId,
          email: emailToSend,
        });
      }
    } else if (currentStep === 2) {
      // Step 2: Create password
      const userRegistrationId = form.values[0]?.userRegistrationId;
      const password = form.values[2]?.password;

      if (userRegistrationId && password) {
        createPassword({ userRegistrationId, password });
      }
    } else {
      setCurrentStep((prev) => (prev < 3 ? prev + 1 : prev));
    }
  }, [
    currentStep,
    form.values,
    sendVerificationCode,
    createPassword,
  ]);

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <InputNIPP
            onNext={handleNext}
            isSendingCode={isSendingCode}
          />
        );
      case 1:
        return <VerifikasiEmail onNext={handleNext} />;
      case 2:
        return (
          <BuatPassword
            onNext={handleNext}
            isCreatingPasswordProp={isCreatingPassword}
          />
        );
      case 3:
        return <UnggahDokumen />;
      default:
        return null;
    }
  };

  return (
    <RegistrationFormProvider form={form}>
      <div className="w-full min-h-screen overflow-y-scroll py-10">
        <div className="mx-auto w-3/5">
          <div className="flex flex-col gap-8">
            {/* Logo */}
            <div className="text-left">
              <img
                src={Logo}
                alt="Portaverse Logo"
                className="inline-block h-[80px]"
              />
            </div>

            {/* Back Button */}
            <div>
              <Button
                variant="subtle"
                leftSection={
                  <Icon icon="mdi:arrow-left" width={20} />
                }
                onClick={handleBack}
                disabled={isSendingCode || isCreatingPassword}
                styles={{
                  root: {
                    padding: "8px 16px",
                  },
                }}
              >
                {BACK_BUTTON_TEXT[currentStep]}
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                {Object.keys(STEPS).map((step) => {
                  const stepNum = parseInt(step, 10);
                  const isActive = stepNum <= currentStep;
                  return (
                    <div
                      key={step}
                      className="h-2 flex-1 rounded-full"
                      style={{
                        backgroundColor: isActive
                          ? color.primary3
                          : color.lightGrey,
                      }}
                    />
                  );
                })}
              </div>

              <div className="flex gap-4">
                {Object.entries(STEPS).map(([stepNum, stepName]) => {
                  const isActive =
                    parseInt(stepNum, 10) === currentStep;
                  return (
                    <div key={stepNum} className="flex-1 text-center">
                      <p
                        className="text-sm font-semibold"
                        style={{
                          color: isActive
                            ? color.coffee
                            : color.darkGrey,
                        }}
                      >
                        {parseInt(stepNum, 10) + 1}. {stepName}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step Content */}
            <div className="mt-8">{renderStepContent()}</div>
          </div>
        </div>
      </div>
    </RegistrationFormProvider>
  );
}

export default UserRegistration;
