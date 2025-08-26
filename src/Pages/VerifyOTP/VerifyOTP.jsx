import { useEffect, useRef, useState } from "react";
import { PinInput } from "@mantine/core";
import PortaverseLogo from "../../Components/Assets/Pictures/PortaverseLogoV2.png";
import { Link } from "react-router-dom";
import getUserCookie from "../../Utils/Helpers/getUserCookie";

export default function VerifyOTP() {
  const pinRef = useRef(null);
  const [value, setValue] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [expiryTime, setExpiryTime] = useState(null);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const user = getUserCookie();

  useEffect(() => {
    const savedExpiry = localStorage.getItem("otp_countdown");
    if (savedExpiry) {
      setExpiryTime(parseInt(savedExpiry, 10));
    } else {
      const newExpiry = Date.now() + 3 * 60 * 1000;
      localStorage.setItem("otp_countdown", newExpiry.toString());
      setExpiryTime(newExpiry);
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
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  // Fake OTP validation (replace with real API check)
  const correctOTP = "123456";

  const handleComplete = (otp) => {
    if (otp === correctOTP) {
      localStorage.removeItem("otp_countdown");
      localStorage.setItem("otp_verified", "true");
      setSuccess(true); // ✅ mark as success
      setError(""); // ✅ clear old error if any

      setTimeout(() => {
        window.location.href = "/landing";
      }, 1000);
    } else {
      const remaining = attemptsLeft - 1;
      setAttemptsLeft(remaining);
      setError(`Kode salah. Sisa percobaan: ${remaining}`);
      setValue("");
      setSuccess(false); // ❌ reset success state
      setTimeout(() => {
        pinRef.current?.focus();
      }, 0);

      if (remaining <= 0) {
        setError("Anda telah melebihi batas percobaan.");
        document.cookie.split(";").forEach((c) => {
          document.cookie = c
            .replace(/^ +/, "")
            .replace(
              /=.*/,
              `=;expires=${new Date(0).toUTCString()};path=/`,
            );
        });

        localStorage.removeItem("otp_verified");
        localStorage.setItem("otp_blocked", "true");

        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }
    }
  };

  const handleResend = () => {
    if (attemptsLeft <= 0) return;
    const newExpiry = Date.now() + 3 * 60 * 1000;
    localStorage.setItem("otp_countdown", newExpiry.toString());
    setExpiryTime(newExpiry);
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
          <Link
            to="/login"
            className="rounded-md font-semibold bg-gray-700 px-4 py-2 text-white hover:bg-primary3"
            type="button"
          >
            Kembali ke Login
          </Link>
        </div>
      </div>
    </div>
  );
}
