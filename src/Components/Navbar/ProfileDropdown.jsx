import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setPrivilegesAndRole,
  setSocialMediaProfile,
  setZoomSettings,
} from "../../../Configs/Redux/slice";
import { postLogout } from "../../../Networks";
import {
  BASE_PROXY,
  SOCIAL_ENDPOINT,
} from "../../../Networks/endpoint";
import { Networks } from "../../../Networks/factory";
import getUserCookie from "../../../Utils/Helpers/getUserCookie";
import showErrorDialog from "../../../Utils/Helpers/showErrorDialog";
import ArrowDown from "../../Assets/Icon/ArrowDown";
import Exit from "../../Assets/Icon/Exit";
import ProfilePicture from "../../ProfilePicture";

export default function ProfileDropdown() {
  const user = getUserCookie();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { name } = user.employee;

  const { mutate: logout, isLoading } = postLogout(
    () => {
      dispatch(
        setZoomSettings({
          isMirrored: false,
          isMuted: true,
          isStartedVideo: false,
          cameraId: "",
          inputId: "",
          outputId: "",
        }),
      );
      dispatch(setPrivilegesAndRole({}));
      dispatch(setSocialMediaProfile({}));
      window.location.href = `${import.meta.env.VITE_SSO_URL}/login`;
    },
    (err) => showErrorDialog(err),
  );

  const socialService = Networks(BASE_PROXY.social);
  const { isLoading: isLoadingEmployeeProfile, data: profile } =
    socialService.query(
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
        onSuccess: (res) => {
          dispatch(setSocialMediaProfile(res));
        },
      },
    );

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="flex justify-center items-center gap-1.5 mr-2.5">
        <ProfilePicture
          img={profile?.profilePicture}
          className="w-7 h-7 rounded-full object-cover"
          alt="profile"
        />
        <h4 className="font-normal hidden md:block max-w-[7rem] truncate">
          {name}
        </h4>
        <ArrowDown width={13} />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-2 mt-2 w-max rounded-md bg-white ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <button
                type="button"
                onClick={() => logout()}
                className={`
                  ${
                    active
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-700"
                  }
                  block w-full text-left px-4 py-2 text-sm hover:bg-bg1 bg-white rounded`}
              >
                <div className="flex justify-between items-center">
                  <Exit />
                  <h5 className="text-red-800 pl-2 pr-6">Sign out</h5>
                </div>
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
