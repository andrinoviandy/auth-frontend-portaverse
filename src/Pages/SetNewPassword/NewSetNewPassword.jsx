import { Icon } from "@iconify/react";
import { Button, PasswordInput } from "@mantine/core";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import StatusBanner from "../../Components/StatusBanner/StatusBanner";
import { setNewPassword } from "../../Utils/Helpers/firebaseAuth";
import useValidateInput from "../../Utils/Hooks/useValidateInput";
import { onToggleVisibility } from "../Login/NewLogin";

const form = {
  password: "",
  confirmPassword: "",
};

export default function NewSetNewPassword() {
  const navigate = useNavigate();

  const params = new URLSearchParams(window.location.search);
  const actionCode = params.get("oobCode");

  const [payload, setPayload] = useState(form);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [validateNewPassword, setValidateNewPassword] = useState("");
  const [validateConfirmPassword, setValidateConfirmPassword] =
    useState("");
  const [success, setSuccess] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
    setValidateNewPassword("");
    setValidateConfirmPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errNewPassword = useValidateInput(
      "newPassword",
      payload.password,
    );
    setValidateNewPassword(errNewPassword);

    const errConfirmPassword = useValidateInput(
      "newPassword",
      payload.confirmPassword,
    );
    setValidateConfirmPassword(errConfirmPassword);

    if (
      !errNewPassword &&
      payload.password !== payload.confirmPassword
    ) {
      setValidateNewPassword("Password does not match");
      setValidateConfirmPassword("Password does not match");
      return;
    }

    if (payload.password.length > 1 && !errNewPassword) {
      setIsLoading(true);
      setNewPassword(actionCode, payload.password)
        .then(() => setSuccess(true))
        .catch(() =>
          setFetchError(
            "Invalid action code, please try resetting the password again",
          ),
        )
        .finally(() => setIsLoading(false));
    }
  };

  if (!actionCode) return <Navigate to="/login" replace />;

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
        <h1 className="font-semibold text-3xl">Set New Password</h1>
        <p className="text-darkGrey font-medium">
          Buat password baru untuk akunmu
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full"
      >
        <PasswordInput
          radius="md"
          label="New Password"
          placeholder="Masukan password baru"
          size="md"
          name="password"
          classNames={{
            root: "w-full",
            label: "mb-2",
          }}
          value={payload.password}
          error={validateNewPassword}
          onChange={handleOnChange}
          visibilityToggleIcon={onToggleVisibility}
        />

        <div>
          <PasswordInput
            radius="md"
            label="Re-Enter New Password"
            placeholder="Masukan password baru"
            size="md"
            name="confirmPassword"
            classNames={{
              root: "w-full",
              label: "mb-2",
            }}
            value={payload.confirmPassword}
            error={validateConfirmPassword}
            onChange={handleOnChange}
            visibilityToggleIcon={onToggleVisibility}
          />
          <p className="text-red-500 text-center text-sm mt-2">
            {fetchError}
          </p>
        </div>
        {success && (
          <StatusBanner
            variant="success"
            message="Password Anda berhasil diubah. SIlahkan login ulang akun Anda"
          />
        )}
        <Button loading={isLoading} type="submit">
          Ubah Password
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => navigate("/login")}
        >
          Kembali ke halaman login
        </Button>
      </form>
    </div>
  );
}
