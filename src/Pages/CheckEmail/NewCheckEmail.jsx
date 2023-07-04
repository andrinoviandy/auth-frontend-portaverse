import { Icon } from "@iconify/react";
import { Button } from "@mantine/core";
import { useEffect, useState } from "react";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import resendResetPassword from "../../Networks/Resend";

const countdown = 60; // in seconds

export default function NewCheckEmail() {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(countdown);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");

  const { state } = useLocation();

  const handleOpenMail = () => {
    // choose one
    window.open("https://gmail.com", "_blank");
    // window.location = "mailto:{yourmail@domain.com}";
  };

  const handleResend = () => {
    resendResetPassword(state.email, setIsLoading, setFetchError);
  };

  useEffect(() => {
    if (!isLoading) {
      setTimer(countdown);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!timer) return undefined;

    const intervalId = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timer]);

  if (!state) return <Navigate to="/login" replace />;

  return (
    <div className="flex flex-col gap-16 w-full">
      <div className="flex flex-col gap-2 items-start">
        <Link to="/login" className="mb-5">
          <button
            type="button"
            className="flex items-center gap-1 text-darkGrey"
          >
            <Icon icon="ic:round-chevron-left" width={24} />
            <p className="font-semibold">Sign In</p>
          </button>
        </Link>
        <h1 className="font-semibold text-3xl">Check Your Email</h1>
        <p className="text-darkGrey font-medium">
          Kami telah mengirim link reset password ke {state.email}
        </p>
      </div>

      <div className="self-center w-full mt-[20%]">
        <button
          type="submit"
          className={
            "font-secondary w-full bg-primary3 font-medium hover:bg-primary4 text-white py-2 px-4 rounded my-1.5" +
            " hidden"
          }
          onClick={handleOpenMail}
        >
          Open email app
        </button>

        <div className="flex flex-col gap-4 items-center justify-center my-3">
          <Button className="w-full" onClick={handleOpenMail}>
            Buka Email
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate("/login")}
          >
            Kembali ke halaman login
          </Button>
          <p className="text-gray font-secondary">
            {(() => {
              if (timer > 0 && fetchError.length === 0) {
                return (
                  <>
                    Resend in{" "}
                    <span className="text-primary3 font-semibold">
                      {timer} second
                    </span>
                  </>
                );
              }
              return (
                <>
                  {fetchError || "Tidak menerima email?"}{" "}
                  <button
                    type="button"
                    onClick={handleResend}
                    className="text-primary3 font-semibold"
                  >
                    Kirim ulang
                  </button>
                </>
              );
            })()}
          </p>
        </div>
      </div>
    </div>
  );
}
