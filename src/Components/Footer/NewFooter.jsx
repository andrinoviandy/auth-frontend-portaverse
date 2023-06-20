import { Icon } from "@iconify/react";
import { clsx } from "@mantine/core";
import { useState } from "react";
import { color } from "../../Utils/Constants";
import portaverse from "../Assets/Pictures/portaverse_logo_transparent.png";

export default function NewFooter() {
  return (
    <footer className="bg-white flex flex-col items-center justify-center">
      <div className="flex justify-between items-center gap-14 py-8 px-[6rem] border-b">
        <div>
          <img
            src={portaverse}
            alt="logo"
            className="w-[80px] mb-5"
            loading="lazy"
          />
          <div className="flex gap-20 items-start mb-[5rem]">
            <div className="flex flex-col gap-3 w-[50%]">
              <h6 className="font-bold text-base">
                PT. Pelabuhan Indonesia (Pelindo)
              </h6>
              <p className="text-darkGrey">
                PT Pelabuhan Indonesia adalah sebuah badan usaha milik
                negara Indonesia yang bergerak di bidang logistik,
                terutama pengelolaan dan pengembangan pelabuhan
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h6 className="font-bold text-base">Kantor Pusat</h6>
              <div className="text-darkGrey">
                <p>PT Pelabuhan Indonesia (Persero)</p>
                <p>Jl. Pasoso No.1, Tanjung Priok, Jakarta Utara,</p>
                <p>14310, Indonesia</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h6 className="font-bold text-base">Social Media</h6>
          <ul className="flex flex-col gap-3 text-darkGrey">
            <SocmedItem
              href="https://www.linkedin.com/company/pelindospmt/"
              icon="mdi:linkedin"
              text="LinkedIn"
            />
            <SocmedItem
              href="https://www.linkedin.com/company/pelindospmt/"
              icon="ant-design:instagram-filled"
              text="Instagram"
            />
            <SocmedItem
              href="https://www.linkedin.com/company/pelindospmt/"
              icon="ri:youtube-fill"
              text="Youtube"
            />
            <SocmedItem
              href="https://www.linkedin.com/company/pelindospmt/"
              icon="mdi:twitter"
              text="Twitter"
            />
            <SocmedItem
              href="https://www.linkedin.com/company/pelindospmt/"
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
        © 2023 KMPlus | Powered by KMPlus
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
          "flex items-center gap-1 cursor-pointer font-medium",
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
