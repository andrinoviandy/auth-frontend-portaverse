import { Icon } from "@iconify/react";
import { Popover } from "@mantine/core";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Exit from "../Assets/Icon/Exit";
import ProfilePicture from "../ProfilePicture";
import { setSocialMediaProfile } from "../../Configs/Redux/slice";
import {
  AUTH_ENDPOINT,
  BASE_PROXY,
  SOCIAL_ENDPOINT,
} from "../../Networks/endpoint";
import { Networks } from "../../Networks/factory";
import getUserCookie from "../../Utils/Helpers/getUserCookie";

export default function ProfileDropdown() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = getUserCookie();
  const {
    name,
    employee_number: employeNumber,
    position_name: position,
  } = user.employee;

  const img = user?.employee?.profile_picture;

  const auth = Networks(BASE_PROXY.auth);
  const { mutate: logout } = auth.mutation("post", {
    onSuccess: () => {
      navigate("/login");
    },
  });

  const socialService = Networks(BASE_PROXY.social);
  const { data } = socialService.query(
    SOCIAL_ENDPOINT.GET.profile(
      user.employee.social_employee_profile
        .social_employee_profile_id,
    ),
    ["employeeSocialProfile"],
    {
      select: (res) => ({
        name: `${[
          res?.firstName,
          res?.additional_name || "",
          res?.lastName || "",
        ].join(" ")}`,
        backgroundImage: res?.background_img,
        profilePicture: res?.profile_picture,
        group: res?.group?.name,
        position: res?.position?.name,
        total_followers: res?.total_followers,
        total_following: res?.total_following,
        sme: res?.sme,
      }),
      onSuccess: (res) => dispatch(setSocialMediaProfile(res)),
    },
  );

  return (
    <Popover
      position="bottom-end"
      offset={17.5}
      width={400}
      radius="md"
    >
      <Popover.Target className="mr-2.5 flex items-center justify-center gap-1.5">
        <button type="button">
          <ProfilePicture
            name={name}
            imageUrl={data?.profilePicture || img}
            size={28}
            alt="profile"
          />
          <Icon
            icon="ep:arrow-down-bold"
            width={13}
            className="text-darkGrey"
          />
        </button>
      </Popover.Target>

      <Popover.Dropdown className="shadow-md w-[320px] rounded-xl p-0">
        <div className="flex gap-3 p-4">
          <ProfilePicture
            name={name}
            imageUrl={data?.profilePicture || img}
            size={40}
            alt="profile"
          />

          <div>
            <p className="break-words text-lg font-semibold">
              {name}
            </p>
            <p className="font-semibold text-darkGrey">
              {position || "-"}
            </p>
            <p className="text-darkGrey">
              NIPP : {employeNumber || "-"}
            </p>
          </div>
        </div>

        <div className="[&>*]:w-full [&>*]:border-t [&>*]:border-grey2 [&>*]:px-5 [&>*]:py-4">
          {/* <button
            type="button"
            className="hover:bg-bg2"
            onClick={() => {}}
          >
            <div className="flex gap-2 items-center text-darkGrey">
              <Icon icon="mdi:gear" width={20} />
              <p className="font-medium">Pengaturan</p>
            </div>
          </button> */}
          <button
            type="button"
            className="rounded-b-xl hover:bg-bg2"
            onClick={() => {
              logout({ endpoint: AUTH_ENDPOINT.POST.logout });
              localStorage.removeItem("otp_verified");
            }}
          >
            <div className="flex items-center gap-2 text-red-800">
              <Exit />
              <p className="font-medium">Sign out</p>
            </div>
          </button>
        </div>
      </Popover.Dropdown>
    </Popover>
  );
}
