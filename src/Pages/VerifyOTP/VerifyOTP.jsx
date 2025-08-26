import { useEffect, useRef, useState } from "react";
import { Button, PinInput } from "@mantine/core";
import PortaverseLogo from "../../Components/Assets/Pictures/PortaverseLogoV2.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import getUserCookie from "../../Utils/Helpers/getUserCookie";
import baseURLExternal from "../../Utils/Helpers/baseURLExternalUser";
import axios from "axios";
import { useGenerateOTPPost } from "./hooks/useGenerateOTPPost";
import { useVerifyOTPPost } from "./hooks/useVerifyOTPPost";
import NiceModal from "@ebay/nice-modal-react";
import MODAL_IDS from "../../Components/Modals/modalIds";
import { Networks } from "../../Networks/factory";
import { AUTH_ENDPOINT, BASE_PROXY } from "../../Networks/endpoint";

export default function VerifyOTP() {
  const { targetUID } = useParams();
  const [otpData, setOtpData] = useState(null);
  const pinRef = useRef(null);
  const [value, setValue] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [expiryTime, setExpiryTime] = useState(null);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const user = getUserCookie();
  const newExpiry = Date.now() + 3 * 60 * 1000;
  const navigate = useNavigate();
  const auth = Networks(BASE_PROXY.auth);
  const { mutate: generateOtp } = useGenerateOTPPost();
  const { mutate: verifyOtp } = useVerifyOTPPost();
  const { mutate: logout } = auth.mutation("post", {
    onSuccess: () => {
      navigate("/login");
    },
  });

  useEffect(() => {
    const storedExpiry = localStorage.getItem("otp_countdown");
    if (storedExpiry) {
      setExpiryTime(Number(storedExpiry));
    }
  }, []);

  useEffect(() => {
    if (!expiryTime) return;

    const tick = () => {
      const remaining = Math.max(
        0,
        Math.floor((expiryTime - Date.now()) / 1000),
      );
      setTimeLeft(remaining);

      if (remaining === 0) {
        localStorage.removeItem("otp_countdown");
      }
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [expiryTime]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `0${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const handleComplete = (otp) => {
    verifyOtp(
      { uuid: localStorage.getItem("uidOTP"), code: otp },
      {
        onSuccess: (res) => {
          localStorage.removeItem("otp_countdown");
          localStorage.removeItem("isEmailOtpRequired");
          localStorage.setItem("otp_verified", "true");
          localStorage.removeItem("uidOTP");
          setSuccess(true);
          setError("");
          setTimeout(() => {
            navigate("/landing");
          }, 1000);
        },
        onError: () => {
          const remaining = attemptsLeft - 1;
          setAttemptsLeft(remaining);
          setError(`Kode salah. Sisa percobaan: ${remaining}`);
          setValue("");
          setSuccess(false);
          setTimeout(() => {
            pinRef.current?.focus();
          }, 0);
          document.cookie.split(";").forEach((c) => {
            document.cookie = c
              .replace(/^ +/, "")
              .replace(
                /=.*/,
                `=;expires=${new Date(0).toUTCString()};path=/`,
              );
          });
          localStorage.removeItem("otp_verified");
          localStorage.removeItem("uidOTP");
          localStorage.removeItem("isEmailOtpRequired");
          localStorage.removeItem("otp_countdown");
          localStorage.setItem("otp_blocked", "true");
          if (remaining <= 0) {
            setError("Anda telah melebihi batas percobaan.");
            logout({ endpoint: AUTH_ENDPOINT.POST.logout });
          }
        },
      },
    );
  };

  const handleResend = () => {
    if (attemptsLeft <= 0) return;

    generateOtp(
      { uid: user?.uid },
      {
        onSuccess: (res) => {
          localStorage.setItem(
            "isEmailOtpRequired",
            res.data.isEmailOtpRequired,
          );
          !localStorage.getItem("uidOTP")
            ? localStorage.setItem("uidOTP", res.data.uuid)
            : null;
          const expiry = new Date(res.data.expiredAt).getTime();
          setExpiryTime(expiry);
          localStorage.setItem("otp_countdown", expiry.toString());
          setError("");

          if (res.data.isEmailOtpRequired === 1) {
            window.history.replaceState(
              null,
              "",
              `${res.data.link}`,
              // `${import.meta.env.VITE_SSO_URL}/email-otp/${res.data.uuid}`,
            );
            NiceModal.show(MODAL_IDS.GENERAL.CONFIRMATION, {
              message: "Silahkan cek email kembali untuk melihat OTP",
              variant: "safe",
              labelCancel: "Tutup",
              withConfirm: false,
            });
          } else if (res.data.isEmailOtpRequired === 0) {
            localStorage.setItem("otp_verified", "true");
            navigate("/landing");
          } else {
            setError("OTP Link Tidak Ditemukan");
          }
        },
        onError: () => {
          setError("Gagal mengirim ulang OTP, silahkan Login kembali.");
        },
      },
    );
  };

  const backToLogin = () => {
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(
          /=.*/,
          `=;expires=${new Date(0).toUTCString()};path=/`,
        );
    });
    localStorage.removeItem("otp_verified");
    localStorage.removeItem("uidOTP");
    localStorage.removeItem("isEmailOtpRequired");
    localStorage.removeItem("otp_countdown");
    logout({ endpoint: AUTH_ENDPOINT.POST.logout });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-lg rounded-xl bg-white p-8 shadow-modal">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src={PortaverseLogo}
            alt="company_logo"
            className="mb-2 w-[200px]"
          />
        </div>

        {/* Title */}
        <h2 className="text-center text-2xl font-semibold mb-4">
          Verifikasi Kode Token
        </h2>
        <p className="text-center text-gray-600 text-base">
          Masukkan 6 digit kode yang dikirimkan ke Email{" "}
          <span className="font-bold text-gray-600">
            {user?.email}
          </span>
        </p>

        {/* Pin Input */}
        <div className="flex justify-center my-12">
          <PinInput
            ref={pinRef}
            length={6}
            type="number"
            value={value}
            onChange={setValue}
            onComplete={handleComplete}
            size="xl"
            disabled={attemptsLeft <= 0}
            classNames={{
              input: `rounded-md border-gray-300 text-xl font-bold ${
                attemptsLeft <= 0
                  ? "bg-gray-200 cursor-not-allowed"
                  : ""
              }`,
            }}
          />
        </div>

        {/* Timer */}
        <p className="text-center text-sm text-gray-600 mb-2">
          Waktu tersisa:{" "}
          <span className="text-red-500 font-medium">
            {" "}
            {formatTime(timeLeft)}
          </span>
        </p>

        {/* Resend */}
        <p className="text-center text-sm text-gray-600 mb-4">
          Tidak menerima kode?{" "}
          <button
            onClick={handleResend}
            disabled={timeLeft > 0 || attemptsLeft <= 0}
            className={`font-medium ${
              timeLeft > 0 || attemptsLeft <= 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-primary3 hover:underline"
            }`}
          >
            Kirim ulang kode
          </button>
        </p>

        {/* Error Message */}
        {error && (
          <p className="text-center text-sm font-medium text-red-600 mb-4">
            {error}
          </p>
        )}

        {/* Success Message */}
        {success && (
          <p className="text-center text-sm font-medium text-success3 mb-4">
            Verifikasi Kode Berhasil!
          </p>
        )}

        {/* Back Button */}
        <div className="flex justify-center">
          <Button
            onClick={backToLogin}
            className="rounded-md font-semibold bg-gray-700 px-4 py-2 text-white hover:bg-primary3"
            type="button"
          >
            Kembali ke Login
          </Button>
        </div>
      </div>
    </div>
  );
}
