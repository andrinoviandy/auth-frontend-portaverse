/* eslint-disable jsx-a11y/label-has-associated-control */
import { Button, Divider, TextInput } from "@mantine/core";
import { useMutation } from "react-query";

import { color } from "../../../Utils/Constants";
import { useRegistrationFormContext } from "../Contexts/RegistrationFormContext";
import { getCheckNipp } from "../../../Networks/UserRegistration/Get";

function InputNIPP({ onNext, isSendingCode }) {
  const form = useRegistrationFormContext();

  const { mutate: checkNipp, isLoading: isCheckingNipp } =
    useMutation((nipp) => getCheckNipp(nipp), {
      onSuccess: (data) => {
        // Store the user_registration_id
        form.setFieldValue(
          "0.userRegistrationId",
          data?.user_registration_id,
        );

        // Populate form fields from response
        form.setFieldValue(
          "0.namaPekerja",
          data?.employee_name || "",
        );
        form.setFieldValue("0.emailKorporat", data?.email || "");
        form.setFieldValue("0.emailFromApi", data?.email || ""); // Track original email from API
        form.setFieldValue("0.unitKerja", data?.work_unit || "");
        form.setFieldValue(
          "0.statusPekerja",
          data?.employee_status || "",
        );
        form.setFieldValue(
          "0.namaAtasanLangsung",
          data?.superior_employee_name || "",
        );
        form.setFieldValue(
          "0.jabatanAtasanLangsung",
          data?.superior_position_name || "",
        );

        // Reset verification fields
        form.setFieldValue("1.verificationCode", "");
        form.setFieldValue("1.isEmailVerified", null);

        form.clearFieldError("0.nipp");
      },
      onError: (err) => {
        // Clear all fields except NIPP on error
        form.setFieldValue("0.userRegistrationId", null);
        form.setFieldValue("0.namaPekerja", "");
        form.setFieldValue("0.emailKorporat", "");
        form.setFieldValue("0.emailFromApi", "");
        form.setFieldValue("0.unitKerja", "");
        form.setFieldValue("0.statusPekerja", "");
        form.setFieldValue("0.namaAtasanLangsung", "");
        form.setFieldValue("0.jabatanAtasanLangsung", "");

        // Set error on NIPP field
        const errorMessage =
          err?.response?.data?.message || "Gagal memeriksa NIPP";
        form.setFieldError("0.nipp", errorMessage);
      },
    });

  const handleCheckData = () => {
    const nipp = form.values[0]?.nipp || "";
    if (nipp) {
      checkNipp(nipp);
    }
  };

  const nipp = form.values[0]?.nipp || "";
  const emailFromApi = form.values[0]?.emailFromApi || "";
  const hasCheckedNipp = form.values[0]?.namaPekerja ? true : false;
  // Only allow editing if NIPP is checked AND email from API is empty
  const canEditEmail =
    hasCheckedNipp && (!emailFromApi || emailFromApi.trim() === "");

  const emailError =
    canEditEmail &&
    form.values[0]?.emailKorporat.trim() === "" &&
    "Email Anda belum terdaftar, silakan isi email korporat Anda.";

  return (
    <div className="flex flex-col gap-6">
      {/* Title and Description */}
      <div>
        <h2
          className="text-xl font-semibold"
          style={{ color: color.coffee }}
        >
          Input NIPP Pekerja
        </h2>
        <p className="mt-2 text-sm" style={{ color: color.darkGrey }}>
          Nomor pekerja/NIPP digunakan untuk mendeteksi data pekerja
          yang terdaftar dalam MDM.
        </p>
      </div>

      {/* NIPP Input with Check Button */}
      <div>
        <label
          className="mb-2 block text-sm font-medium"
          style={{ color: color.coffee }}
        >
          Nomor Pekerja/NIPP
        </label>
        <div className="flex items-start gap-4">
          <div className="w-5/6">
            <TextInput
              placeholder="Tuliskan NIPP"
              {...form.getInputProps("0.nipp")}
            />
          </div>
          <Button
            onClick={handleCheckData}
            disabled={!nipp || isCheckingNipp}
            loading={isCheckingNipp}
            className="w-1/6"
          >
            Cek Data
          </Button>
        </div>
      </div>

      {/* Data Pekerja Divider */}
      <div className="flex items-center gap-4">
        <div
          className="flex-1 border-t"
          style={{ borderColor: color.lightGrey }}
        />
        <span className="text-sm" style={{ color: color.coffee }}>
          Data Pekerja
        </span>
        <div
          className="flex-1 border-t"
          style={{ borderColor: color.lightGrey }}
        />
      </div>

      {/* Employee Data Inputs */}
      <div className="flex flex-col gap-6">
        <div>
          <label
            className="mb-2 block text-sm font-medium"
            style={{ color: color.coffee }}
          >
            Nama Pekerja
          </label>
          <TextInput
            placeholder="Nama Pekerja"
            disabled
            {...form.getInputProps("0.namaPekerja")}
          />
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-medium"
            style={{ color: color.coffee }}
          >
            Email Korporat
          </label>
          <TextInput
            placeholder="Email Korporat"
            disabled={!canEditEmail}
            {...form.getInputProps("0.emailKorporat")}
            error={emailError}
          />
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-medium"
            style={{ color: color.coffee }}
          >
            Unit Kerja
          </label>
          <TextInput
            placeholder="Unit Kerja"
            disabled
            {...form.getInputProps("0.unitKerja")}
          />
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-medium"
            style={{ color: color.coffee }}
          >
            Status Pekerja
          </label>
          <TextInput
            placeholder="Status Pekerja"
            disabled
            {...form.getInputProps("0.statusPekerja")}
          />
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-medium"
            style={{ color: color.coffee }}
          >
            Nama Atasan Langsung
          </label>
          <TextInput
            placeholder="Nama Atasan Langsung"
            disabled
            {...form.getInputProps("0.namaAtasanLangsung")}
          />
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-medium"
            style={{ color: color.coffee }}
          >
            Jabatan Atasan Langsung
          </label>
          <TextInput
            placeholder="Jabatan Atasan Langsung"
            disabled
            {...form.getInputProps("0.jabatanAtasanLangsung")}
          />
        </div>
      </div>

      {/* Next Button */}
      <Button
        fullWidth
        onClick={onNext}
        disabled={!hasCheckedNipp}
        loading={isSendingCode}
      >
        Lanjut ke Verifikasi Email
      </Button>

      {/* Help Section */}
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

export default InputNIPP;
