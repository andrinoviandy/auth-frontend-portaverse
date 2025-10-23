/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable simple-import-sort/imports */
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { Button, Divider } from "@mantine/core";
import { MIME_TYPES } from "@mantine/dropzone";

import { CustomMantineDropzone } from "../../../Components/Dropzone/Dropzone";
import { color } from "../../../Utils/Constants";
import { useRegistrationFormContext } from "../Contexts/RegistrationFormContext";
import { postSubmitRequest } from "../../../Networks/UserRegistration/Post";
import showErrorDialog from "../../../Utils/Helpers/showErrorDialog";
import showSuccessDialog from "../../../Utils/Helpers/showSuccessDialog";

function UnggahDokumen() {
  const form = useRegistrationFormContext();
  const navigate = useNavigate();

  const { mutate: submitRequest, isLoading: isSubmitting } =
    useMutation(
      ({ userRegistrationId, profilePicture, idCard, decree }) =>
        postSubmitRequest(
          userRegistrationId,
          profilePicture,
          idCard,
          decree,
        ),
      {
        onSuccess: () => {
          showSuccessDialog(
            "Pengajuan aktivasi akun berhasil dikirimkan. Silakan tunggu konfirmasi dari admin.",
          );
          // Navigate to login after successful submission
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        },
        onError: (err) => {
          showErrorDialog(err);
        },
      },
    );

  const handleSubmit = () => {
    const userRegistrationId = form.values[0]?.userRegistrationId;
    const fotoProfil = form.values[3]?.fotoProfil || [];
    const fotoIdCard = form.values[3]?.fotoIdCard || [];
    const fileSKPKWT = form.values[3]?.fileSKPKWT || [];

    if (
      userRegistrationId &&
      fotoProfil.length > 0 &&
      fotoIdCard.length > 0 &&
      fileSKPKWT.length > 0
    ) {
      submitRequest({
        userRegistrationId,
        profilePicture: fotoProfil[0],
        idCard: fotoIdCard[0],
        decree: fileSKPKWT[0],
      });
    }
  };

  const fotoProfil = form.values[3]?.fotoProfil || [];
  const fotoIdCard = form.values[3]?.fotoIdCard || [];
  const fileSKPKWT = form.values[3]?.fileSKPKWT || [];

  const canSubmit =
    fotoProfil.length > 0 &&
    fotoIdCard.length > 0 &&
    fileSKPKWT.length > 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Title and Description */}
      <div>
        <h2
          className="text-xl font-semibold"
          style={{ color: color.coffee }}
        >
          Unggah Foto dan Dokumen
        </h2>
        <p className="mt-2 text-sm" style={{ color: color.darkGrey }}>
          Lengkapi data pekerja dengan mengunggah foto profil, foto ID
          Card, dan dokumen SK Pengangkatan atau Kontrak (PKWT).
        </p>
      </div>

      <Divider />

      {/* Foto Profil Section */}
      <div className="flex items-start gap-4">
        {/* Left Side - Upload */}
        <div className="w-5/6">
          <label
            className="mb-2 block text-sm font-medium"
            style={{ color: color.coffee }}
          >
            Foto Profil Pekerja
          </label>
          <div
            className="mb-4 text-sm"
            style={{ color: color.darkGrey }}
          >
            <p>Tipe: File PNG, max 10MB</p>
            <p>Warna: Hitam & Putih dan Menggunakan Kemeja Putih</p>
            <p>Dimensi: 500x500</p>
          </div>
          <CustomMantineDropzone
            file={fotoProfil}
            setFile={(files) =>
              form.setFieldValue("3.fotoProfil", files)
            }
            acceptType={[MIME_TYPES.png]}
            maxSize={10 * 1024 * 1024}
            typeComponent="multiple"
            maximumUploads={1}
            orDescription="Tipe: File PNG, max 10MB"
          />
        </div>

        {/* Right Side - Example */}
        <div className="flex w-1/6 flex-col items-center gap-2">
          <p
            className="text-center text-sm"
            style={{ color: color.darkGrey }}
          >
            Contoh Foto Profil
          </p>
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
            alt="Contoh Foto Profil"
            className="size-[100px] object-cover"
          />
        </div>
      </div>

      {/* Foto ID Card Section */}
      <div>
        <label
          className="mb-2 block text-sm font-medium"
          style={{ color: color.coffee }}
        >
          Foto ID Card Pekerja
        </label>
        <p className="mb-4 text-sm" style={{ color: color.darkGrey }}>
          Supported files are .jpg, .png, .mp4
        </p>
        <CustomMantineDropzone
          file={fotoIdCard}
          setFile={(files) =>
            form.setFieldValue("3.fotoIdCard", files)
          }
          acceptType={[
            MIME_TYPES.jpeg,
            MIME_TYPES.png,
            MIME_TYPES.mp4,
          ]}
          maxSize={10 * 1024 * 1024}
          typeComponent="multiple"
          maximumUploads={1}
          orDescription="Supported files are .jpg, .png, .mp4, max 10MB"
        />
      </div>

      {/* File SK/PKWT Section */}
      <div>
        <label
          className="mb-2 block text-sm font-medium"
          style={{ color: color.coffee }}
        >
          File SK Pengangkatan (PKWTT) atau Kontrak (PKWT)
        </label>
        <p className="mb-4 text-sm" style={{ color: color.darkGrey }}>
          Tipe File PDF, max 100MB
        </p>
        <CustomMantineDropzone
          file={fileSKPKWT}
          setFile={(files) =>
            form.setFieldValue("3.fileSKPKWT", files)
          }
          acceptType={[MIME_TYPES.pdf]}
          maxSize={100 * 1024 * 1024}
          typeComponent="multiple"
          maximumUploads={1}
          orDescription="Tipe File PDF, max 100MB"
        />
      </div>

      {/* Submit Button */}
      <Button
        fullWidth
        onClick={handleSubmit}
        disabled={!canSubmit}
        loading={isSubmitting}
      >
        Ajukan Aktivasi Akun
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

export default UnggahDokumen;
