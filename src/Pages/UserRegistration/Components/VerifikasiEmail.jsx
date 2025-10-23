/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from "react";

import { Button, Divider, TextInput } from "@mantine/core";
import { useMutation } from "react-query";

import { color } from "../../../Utils/Constants";
import { useRegistrationFormContext } from "../Contexts/RegistrationFormContext";
import {
  postSendVerificationCode,
  postVerifyOtp,
} from "../../../Networks/UserRegistration/Post";
import showErrorDialog from "../../../Utils/Helpers/showErrorDialog";

function VerifikasiEmail({ onNext }) {
  const form = useRegistrationFormContext();
  const [timer, setTimer] = useState(180); // Start with 3 minutes since we sent code on step 0
  const [isVerifying, setIsVerifying] = useState(false);

  const email = form.values[0]?.emailKorporat || "";
  const verificationCode = form.values[1]?.verificationCode || "";

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const { mutate: resendCode } = useMutation(
    () => {
      const userRegistrationId = form.values[0]?.userRegistrationId;
      return postSendVerificationCode(userRegistrationId, null);
    },
    {
      onSuccess: () => {
        setTimer(180);
      },
      onError: (err) => {
        showErrorDialog(err);
      },
    },
  );

  const { mutate: verifyCode } = useMutation(
    (code) => {
      const userRegistrationId = form.values[0]?.userRegistrationId;
      return postVerifyOtp(userRegistrationId, code);
    },
    {
      onSuccess: (response) => {
        // Check if verification was successful
        // postVerifyOtp returns res.data, so we access response.data.verified
        const isSuccess = response?.data?.verified === true;
        form.setFieldValue("1.isEmailVerified", isSuccess);
        setIsVerifying(false);
      },
      onError: (err) => {
        form.setFieldValue("1.isEmailVerified", false);
        setIsVerifying(false);
        showErrorDialog(err);
      },
    },
  );

  const handleResendCode = () => {
    resendCode();
  };

  const handleSubmitCode = () => {
    setIsVerifying(true);
    const code = form.values[1]?.verificationCode || "";
    verifyCode(code);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const isEmailVerified = form.values[1]?.isEmailVerified;

  return (
    <div className="flex flex-col gap-6">
      {/* Title and Description */}
      <div>
        <h2
          className="text-xl font-semibold"
          style={{ color: color.coffee }}
        >
          Verifikasi Email
        </h2>
        <p className="mt-2 text-sm" style={{ color: color.darkGrey }}>
          Konfirmasi akun pekerja dengan mengirimkan kode verifikasi
          email yang dikirimkan pada:
        </p>
      </div>

      {/* Email Display */}
      <div>
        <label
          className="mb-2 block text-sm font-medium"
          style={{ color: color.coffee }}
        >
          Email Korporat
        </label>
        <TextInput
          placeholder="Email Korporat"
          value={email}
          disabled
        />
      </div>

      {/* Resend Code Button */}
      <Button
        variant="outline"
        onClick={handleResendCode}
        disabled={timer > 0 || isEmailVerified === true}
        fullWidth
      >
        {timer > 0
          ? `Kirim Ulang Kode dalam ${formatTime(timer)}`
          : "Kirim Ulang Kode"}
      </Button>

      <div className="flex items-center gap-4">
        <div
          className="flex-1 border-t"
          style={{ borderColor: color.lightGrey }}
        />
        <span className="text-sm" style={{ color: color.coffee }}>
          Kode Verifikasi
        </span>
        <div
          className="flex-1 border-t"
          style={{ borderColor: color.lightGrey }}
        />
      </div>

      {/* Verification Code Input */}
      <div>
        <label
          className="mb-2 block text-sm font-medium"
          style={{ color: color.coffee }}
        >
          Input Kode Verifikasi
        </label>
        <div className="flex items-end gap-4">
          <div className="w-5/6">
            <TextInput
              placeholder="Masukkan kode verifikasi"
              {...form.getInputProps("1.verificationCode")}
              error={
                form.values[1]?.isEmailVerified === false
                  ? "Kode yang Anda tulis tidak tepat."
                  : null
              }
            />
          </div>
          <Button
            onClick={handleSubmitCode}
            disabled={!verificationCode || isVerifying}
            loading={isVerifying}
            className="w-1/6"
          >
            Submit
          </Button>
        </div>
      </div>

      {/* Next Button */}
      <Button
        fullWidth
        onClick={onNext}
        disabled={isEmailVerified !== true}
      >
        Lanjut ke Buat Password
      </Button>

      {/* Help Section */}
      <div className="mt-6">
        <Divider />
      </div>

      <div className="flex flex-col items-center gap-2 text-center">
        <p className="text-sm" style={{ color: color.darkGrey }}>
          Butuh bantuan terkait aktivasi akun? Silakan hubungi:
        </p>
        <p className="text-sm">
          <span style={{ color: color.coffee }}>Porta : </span>
          <span
            className="font-semibold"
            style={{ color: color.primary3 }}
          >
            081911111375
          </span>
        </p>
        <p className="text-sm">
          <span style={{ color: color.coffee }}>Email : </span>
          <span
            className="font-semibold"
            style={{ color: color.primary3 }}
          >
            corpu@pelindo.co.id
          </span>
        </p>
      </div>
    </div>
  );
}

export default VerifikasiEmail;
