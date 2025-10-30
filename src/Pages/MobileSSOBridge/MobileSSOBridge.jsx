import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import axiosSSOClient from "../../Configs/AxiosClient/ssoAxiosClient";

export default function MobileSSOBridge() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading"); // loading, success, error
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    const redirectPath = searchParams.get("redirect") || "/landing";
    const isRemember = searchParams.get("isRemember") === "true"; // Convert string to boolean
    const targetUID = searchParams.get("targetUID") || null;

    if (!token) {
      setStatus("error");
      setErrorMessage(
        "Token tidak ditemukan. Silakan login kembali dari aplikasi mobile.",
      );
      return;
    }

    // Lakukan after-login dengan token dari mobile
    const performAfterLogin = async () => {
      try {
        setStatus("loading");

        const data = {
          isRemember,
          targetUID,
        };

        await axiosSSOClient.post("/auth/after-login", data, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setStatus("success");

        // Redirect langsung ke path yang diberikan dari mobile
        setTimeout(() => {
          if (redirectPath.startsWith("http")) {
            window.location.href = `${import.meta.env.VITE_KMS_URL}${redirectPath}`;
          } else {
            window.location.href = `${import.meta.env.VITE_KMS_URL}${redirectPath}`;
          }
        }, 2000);
      } catch (err) {
        setStatus("error");

        if (err.response?.status === 401) {
          setErrorMessage(
            "Token tidak valid atau sudah kadaluarsa. Silakan login kembali dari aplikasi mobile.",
          );
        } else if (err.response?.status === 403) {
          setErrorMessage(
            "Akses ditolak. Anda tidak memiliki izin untuk mengakses halaman ini.",
          );
        } else {
          setErrorMessage(
            "Terjadi kesalahan saat memproses login. Silakan coba lagi.",
          );
        }
      }
    };

    performAfterLogin();
  }, [searchParams, navigate]);

  return (
    <div className="from-blue-100 to-indigo-200 flex min-h-screen items-center justify-center bg-gradient-to-br">
      <div className="shadow-lg mx-4 w-full max-w-md rounded-lg bg-white p-8">
        {status === "loading" && (
          <div className="text-center">
            <div className="border-blue-400 mb-4 inline-block size-12 animate-spin rounded-full border-b-2" />
            <h2 className="mb-2 text-xl font-semibold text-gray-800">
              Memproses Login...
            </h2>
            <p className="text-gray-600">
              Mohon tunggu sebentar, kami sedang memverifikasi akun
              Anda.
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="text-center">
            <div className="bg-green-100 mb-6 inline-flex size-16 items-center justify-center rounded-full">
              <svg
                className="text-green-600 size-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="mb-3 text-2xl font-bold text-gray-800">
              Authentication Success
            </h2>
            <p className="mb-6 text-gray-600">
              Redirecting to Virtu-VR...
            </p>
            <div className="border-blue-400 inline-block size-8 animate-spin rounded-full border-b-2" />
          </div>
        )}

        {status === "error" && (
          <div className="text-center">
            <div className="mb-4 inline-flex size-12 items-center justify-center rounded-full bg-red-100">
              <svg
                className="size-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="mb-2 text-xl font-semibold text-gray-800">
              Login Gagal
            </h2>
            <p className="mb-4 text-gray-600">{errorMessage}</p>
            <button
              type="button"
              onClick={() => window.close()}
              className="bg-blue-400 hover:bg-blue-700 rounded-lg px-6 py-2 text-white transition-colors"
            >
              Tutup
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
