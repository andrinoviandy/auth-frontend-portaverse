/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable simple-import-sort/imports */
import { useMemo } from "react";

import { Button, Divider, PasswordInput } from "@mantine/core";
import { Icon } from "@iconify/react";

import EyeOffOutline from "../../../Components/Assets/Icon/EyeOffOutline";
import EyeOutline from "../../../Components/Assets/Icon/EyeOutline";
import { color } from "../../../Utils/Constants";
import { useRegistrationFormContext } from "../Contexts/RegistrationFormContext";

// Custom visibility toggle icon
const onToggleVisibility = ({ reveal, size }) =>
  reveal ? <EyeOutline size={size} /> : <EyeOffOutline size={size} />;

function BuatPassword({ onNext, isCreatingPasswordProp }) {
  const form = useRegistrationFormContext();

  const password = form.values[2]?.password || "";
  const confirmPassword = form.values[2]?.confirmPassword || "";

  // Password validation rules
  const passwordRules = useMemo(() => {
    return [
      {
        id: "length",
        text: "Minimal 12 karakter",
        isValid: password.length >= 12,
      },
      {
        id: "uppercase",
        text: "Huruf kapital",
        isValid: /[A-Z]/.test(password),
      },
      {
        id: "number",
        text: "Angka",
        isValid: /[0-9]/.test(password),
      },
      {
        id: "special",
        text: "Simbol atau karakter spesial (!, @, $, %, ^, &, *, +, #)",
        isValid: /[!@$%^&*+#]/.test(password),
      },
    ];
  }, [password]);

  const isPasswordValid = passwordRules.every((rule) => rule.isValid);
  const isConfirmPasswordValid =
    password && confirmPassword && password === confirmPassword;
  const canProceed = isPasswordValid && isConfirmPasswordValid;

  return (
    <div className="flex flex-col gap-6">
      {/* Title and Description */}
      <div>
        <h2
          className="text-xl font-semibold"
          style={{ color: color.coffee }}
        >
          Buat Password
        </h2>
        <p className="mt-2 text-sm" style={{ color: color.darkGrey }}>
          Silakan buat password untuk akun Anda.
        </p>
      </div>

      {/* Password Input */}
      <div>
        <label
          className="mb-2 block text-sm font-medium"
          style={{ color: color.coffee }}
        >
          Password
        </label>
        <PasswordInput
          placeholder="Masukkan password"
          {...form.getInputProps("2.password")}
          visibilityToggleIcon={onToggleVisibility}
        />

        {/* Password Requirements */}
        <div className="mt-2">
          <p className="text-sm" style={{ color: color.darkGrey }}>
            Wajib mengandung:
          </p>
          <div className="mt-2 flex flex-col gap-2">
            {passwordRules.map((rule) => (
              <div key={rule.id} className="flex items-center gap-2">
                {rule.isValid ? (
                  <Icon
                    icon="mdi:check-circle"
                    width={16}
                    height={16}
                    style={{ color: color.green }}
                  />
                ) : (
                  <div
                    className="size-4 rounded-full border"
                    style={{ borderColor: color.darkGrey }}
                  />
                )}
                <span
                  className="text-sm"
                  style={{ color: color.darkGrey }}
                >
                  {rule.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Confirm Password Input */}
      <div>
        <label
          className="mb-2 block text-sm font-medium"
          style={{ color: color.coffee }}
        >
          Konfirmasi Password
        </label>
        <PasswordInput
          placeholder="Masukkan konfirmasi password"
          visibilityToggleIcon={onToggleVisibility}
          {...form.getInputProps("2.confirmPassword")}
          error={
            confirmPassword &&
            password !== confirmPassword &&
            "Password yang Anda tulis tidak tepat."
          }
        />
      </div>

      {/* Next Button */}
      <Button
        fullWidth
        onClick={onNext}
        disabled={!canProceed}
        loading={isCreatingPasswordProp}
      >
        Lanjut ke Unggah Dokumen
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

export default BuatPassword;
