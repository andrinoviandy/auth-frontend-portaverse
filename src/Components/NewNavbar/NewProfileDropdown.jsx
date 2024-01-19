import { Icon } from "@iconify/react";
import { Popover } from "@mantine/core";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSocialMediaProfile } from "../../Configs/Redux/slice";
import {
  AUTH_ENDPOINT,
  BASE_PROXY,
  SOCIAL_ENDPOINT,
} from "../../Networks/endpoint";
import { Networks } from "../../Networks/factory";
import getUserCookie from "../../Utils/Helpers/getUserCookie";
import Exit from "../Assets/Icon/Exit";
import ProfilePicture from "../ProfilePicture";

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
  const { mutate: logout, isLoading } = auth.mutation("post", {
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
      <Popover.Target className="flex justify-center items-center gap-1.5 mr-2.5">
        <button type="button">
          <ProfilePicture
            name={name}
            img={data?.profilePicture || img}
            className="w-7 h-7 rounded-full object-cover"
            alt="profile"
          />
          <Icon
            icon="ep:arrow-down-bold"
            width={13}
            className="text-darkGrey"
          />
        </button>
      </Popover.Target>

      <Popover.Dropdown className="rounded-xl w-[320px] p-0 shadow-md">
        <div className="flex gap-3 p-4">
          <ProfilePicture
            name={name}
            img={data?.profilePicture || img}
            className="w-10 h-10 rounded-full object-cover"
            alt="profile"
          />
          <div>
            <p className="font-semibold text-lg break-words">
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

        <div className="[&>*]:border-t [&>*]:border-grey2 [&>*]:px-5 [&>*]:py-4 [&>*]:w-full">
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
            onClick={() =>
              logout({ endpoint: AUTH_ENDPOINT.POST.logout })
            }
          >
            <div className="flex gap-2 items-center text-red-800">
              <Exit />
              <p className="font-medium">Sign out</p>
            </div>
          </button>
        </div>
      </Popover.Dropdown>
    </Popover>
  );
}
