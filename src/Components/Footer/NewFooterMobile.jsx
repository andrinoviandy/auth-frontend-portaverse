import NiceModal from "@ebay/nice-modal-react";
import { Icon } from "@iconify/react";
import { ActionIcon } from "@mantine/core";
import clsx from "clsx";
import { useState } from "react";

import MODAL_IDS from "../Modals/modalIds";
import { BASE_PROXY, CMS_ENDPOINT } from "../../Networks/endpoint";
import { Networks } from "../../Networks/factory";
import { color } from "../../Utils/Constants";
import hasRole from "../../Utils/Helpers/hasRole";
// import portaverse from "../Assets/Pictures/PelindoLogo.png";

export default function NewFooterMobile() {
  const canEdit = hasRole(["SA", "CRPU"]);
  const [isEditing, setIsEditing] = useState(false);
  const [contentData, setContentData] = useState({});
  const [previewData, setPreviewData] = useState({
    footer_title: "",
    footer_description: "",
    footer_logo_picture: "",
  });

  const cmsService = Networks(BASE_PROXY.cms);
  cmsService.query(CMS_ENDPOINT.GET.home, ["getLMSHome"], {
    onSuccess: (res) => setContentData(res?.home),
  });

  const handleClickEdit = ({
    identifier,
    section,
    type,
    title,
    maxFile,
    data,
    onSetPreviewData,
  }) => {
    setIsEditing(true);
    NiceModal.show(MODAL_IDS.LMS.GENERAL.CMS_EDIT_FORM, {
      identifier,
      maxFile,
      section,
      type,
      data,
      title: `Edit ${title}`,
      onSetPreviewData,
      onSuccessSubmit: () => setIsEditing(false),
    });
  };

  return (
    <footer className="my-6 flex flex-col items-center justify-center bg-white">
      <div className="flex w-full flex-col items-center justify-between border-b">
        <div className="w-full">
          {/* <img
            src={portaverse}
            alt="logo"
            className="h-[50px] mb-5"
            loading="lazy"
          /> */}
          <div className="flex gap-2">
            {canEdit && (
              <ActionIcon
                radius="xl"
                variant="light"
                disabled={isEditing}
                onClick={() =>
                  handleClickEdit({
                    identifier: "file",
                    section: "footer",
                    type: "image",
                    title: "Image",
                    onSetPreviewData: (data) => {
                      setPreviewData((prev) => ({
                        ...prev,
                        footer_logo_picture: data,
                      }));
                    },
                  })
                }
              >
                <Icon icon="charm:pencil" className="text-primary3" />
              </ActionIcon>
            )}
            <img
              src={
                previewData?.footer_logo_picture ||
                contentData?.footer_logo_picture
              }
              alt="company_logo"
              className="mb-5 h-[50px]"
              loading="lazy"
            />
          </div>
          <div className="mb-2 flex items-start">
            <div className="flex w-[50%] flex-col gap-3">
              <div className="flex gap-2">
                {canEdit && (
                  <ActionIcon
                    radius="xl"
                    variant="light"
                    disabled={isEditing}
                    onClick={() =>
                      handleClickEdit({
                        identifier: "title",
                        section: "footer",
                        type: "text",
                        title: "Title",
                        maxFile: 0,
                        data: contentData?.footer_title,
                        onSetPreviewData: (data) => {
                          setPreviewData((prev) => ({
                            ...prev,
                            footer_title: data,
                          }));
                        },
                      })
                    }
                  >
                    <Icon
                      icon="charm:pencil"
                      className="text-primary3"
                    />
                  </ActionIcon>
                )}
                <h6 className="text-base font-bold">
                  {previewData?.footer_title ||
                    contentData?.footer_title}
                </h6>
              </div>

              <div className="flex gap-2">
                {canEdit && (
                  <ActionIcon
                    radius="xl"
                    variant="light"
                    disabled={isEditing}
                    onClick={() =>
                      handleClickEdit({
                        identifier: "description",
                        section: "footer",
                        type: "text",
                        title: "Description",
                        maxFile: 0,
                        data: contentData?.footer_description,
                        onSetPreviewData: (data) => {
                          setPreviewData((prev) => ({
                            ...prev,
                            footer_description: data,
                          }));
                        },
                      })
                    }
                  >
                    <Icon
                      icon="charm:pencil"
                      className="text-primary3"
                    />
                  </ActionIcon>
                )}
                <p className="text-darkGrey">
                  {previewData?.footer_description ||
                    contentData?.footer_description}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h6 className="text-base font-bold">Kantor Pusat</h6>
              <div className="text-darkGrey">
                <p>PT Pelabuhan Indonesia (Persero)</p>
                <p>Jl. Pasoso No.1, Tanjung Priok, Jakarta Utara,</p>
                <p>14310, Indonesia</p>
              </div>
            </div>
          </div>
        </div>

        <div className="ml-9 mr-auto flex flex-col gap-3">
          <h6 className="text-base font-bold">Social Media</h6>
          <ul className="my-2 flex flex-col gap-3 text-darkGrey">
            <SocmedItem
              href="https://www.instagram.com/pelindo"
              icon="ant-design:instagram-filled"
              text="Instagram"
            />
            <SocmedItem
              href="https://www.youtube.com/@IndonesiaPortCorp"
              icon="ri:youtube-fill"
              text="Youtube"
            />
            <SocmedItem
              href="https://twitter.com/indonesiaport"
              icon="ri:twitter-x-fill"
              text="Twitter"
            />
            <SocmedItem
              href="https://www.facebook.com/Indonesiaport"
              icon="ic:baseline-facebook"
              text="Facebook"
            />
            <SocmedItem
              href="mailto:info@pelindo.co.id"
              icon="ic:round-email"
              text="info@pelindo.co.id"
            />
          </ul>
        </div>
      </div>
      <h5 className="p-5 text-darkGrey">
        © 2024 KMPlus | Powered by KMPlus
      </h5>
    </footer>
  );
}

function SocmedItem({ icon, text, href }) {
  const [hovered, setHovered] = useState(false);
  return (
    <li
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <a
        href={href}
        target="_blank"
        className={clsx(
          "flex cursor-pointer items-center gap-1 font-medium",
          hovered && "text-primary3",
        )}
        rel="noreferrer"
      >
        <Icon
          icon={icon}
          width={24}
          color={hovered ? color.primary3 : color.text1}
        />
        {text}
      </a>
    </li>
  );
}
