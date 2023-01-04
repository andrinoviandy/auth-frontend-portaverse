import { Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import trimString from "../../Utils/Helpers/trimString";
import SMEIcon from "../Assets/Icon/SME";

function EmployeeItems({
  value,
  label,
  groupName,
  positionName,
  profilePicture,
  isSme,
}) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="p-2 flex h-[60px] items-center relative hover:bg-bg2"
      onClick={(e) => {
        navigate(`/home/detail/${value}`);
      }}
    >
      <img
        alt="employee"
        src={profilePicture}
        className="w-[42px] h-[42px] rounded-full object-cover"
      />
      <div className="ml-4">
        <div className="flex gap-2 items-center">
          <p className="text-1 font-medium text-sm">
            {!!label && trimString(label, 20)}
          </p>
          {!!isSme && <SMEIcon size={16} />}
        </div>
        <p className="text-darkGrey font-normal text-xs">
          {!!positionName && trimString(positionName, 25)}
        </p>
      </div>
      <div className="flex  absolute left-[300px] items-center">
        <div className="h-2 w-2 rounded-full bg-[#D9D9D9]" />
        <p className="text-darkGrey font-normal text-xs ml-5">
          {!!groupName && trimString(groupName, 25)}
        </p>
      </div>
    </button>
  );
}

export default function NavbarSearch() {
  const [socialEmployeeItems, setSocialEmployeeItems] = useState([]);

  const form = useForm({
    initialValues: {
      name: "",
    },
  });

  const [searchValue, onSearchChange] = useState("");

  // const socialService = Networks(BASE_PROXY.social);
  // const { data: employees, isLoading } = socialService.query(
  //   SOCIAL_ENDPOINT.GET.socialEmployees,
  //   ["socialEmployees", 1, searchValue],
  //   {
  //     onSuccess: (res) => {
  //       setSocialEmployeeItems(
  //         res.socialEmployees.map((e) => ({
  //           ...e,
  //           value: e.social_employee_profile_id,
  //           label: e.firstName,
  //           groupName: e.group_name,
  //           positionName: e.position_name,
  //           profilePicture: e.profile_picture,
  //         })),
  //       );
  //     },
  //   },
  //   {
  //     params: {
  //       page: 1,
  //       search: searchValue,
  //     },
  //   },
  // );

  // const handleSubmitSearch = (e) => {
  //   e.preventDefault();
  //   alert("submit");
  // };
  return (
    // <Menu opened={opened}>
    //   <Menu.Target>
    //     <div className="hidden lg:block w-[380px] mx-auto text-gray-600">
    //       <form
    //         onSubmit={handleSubmitSearch}
    //         onChange={() => setOpened(true)}
    //       >
    //         <input
    //           className="bg-white border border-grey h-9 pl-2.5 w-full rounded-md text-sm focus:outline-none leading-normal placeholder-darkGrey font-normal text-text1"
    //           type="search"
    //           name="search"
    //           placeholder="Search here"
    //           autoComplete="off"
    //         />
    //       </form>
    //     </div>
    //   </Menu.Target>
    //   <Menu.Dropdown className="">
    //     <Menu.Item>text</Menu.Item>
    //   </Menu.Dropdown>
    // </Menu>
    <Select
      itemComponent={EmployeeItems}
      className="w-[517px] rounded-[10px]"
      size="sm"
      placeholder="Search here"
      rightSection={<div />}
      searchable
      onSearchChange={onSearchChange}
      searchValue={searchValue}
      // nothingFound="No options"
      data={[]}
    />
  );
}
