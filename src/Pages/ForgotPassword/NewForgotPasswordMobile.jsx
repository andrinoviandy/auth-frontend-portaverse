import { Icon } from "@iconify/react";
import { Button, TextInput } from "@mantine/core";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import sendForgotPassword from "../../Networks/ForgotPassword";
import useValidateInput from "../../Utils/Hooks/useValidateInput";

export default function NewForgotPasswordMobile() {
  const [email, setEmail] = useState("");
  const [validateEmail, setValidateEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    setValidateEmail("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errEmail = useValidateInput("email", email);
    setValidateEmail(errEmail);

    if (email.length > 1 && !errEmail) {
      sendForgotPassword(email, setIsLoading, setFetchError, () => {
        navigate("/check-email", { state: { email } });
      });
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-screen px-2 gap-16 w-full">
      <div className="border p-5 rounded-xl shadow-card space-y-4">
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
          <h1 className="font-semibold text-3xl">Forgot Password</h1>
          <p className="text-darkGrey font-medium">
            Masukan email untuk mendapatkan kode OTP
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <TextInput
            label="Email"
            radius="md"
            placeholder="Masukan email"
            size="md"
            name="email"
            classNames={{
              root: "w-full",
              label: "mb-2",
            }}
            // type="email"
            value={email}
            error={validateEmail}
            onChange={handleOnChange}
          />

          <p className="text-red-500 text-center text-sm mt-2">
            {fetchError}
          </p>

          <Button
            loading={isLoading}
            type="submit"
            className="mt-6 w-full"
          >
            Kirim Kode OTP
          </Button>
        </form>
      </div>
    </div>
  );
}
