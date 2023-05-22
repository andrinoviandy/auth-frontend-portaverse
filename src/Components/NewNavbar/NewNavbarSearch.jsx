import { Icon } from "@iconify/react";
import { Loader, Select } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useState } from "react";
import { BASE_PROXY, SOCIAL_ENDPOINT } from "../../Networks/endpoint";
import { Networks } from "../../Networks/factory";
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
  return (
    <button
      type="button"
      className="p-2 flex justify-between h-[60px] items-center relative hover:bg-bg2"
      onClick={(e) => {
        window.location = `${
          import.meta.env.VITE_KMS_URL
        }/home/detail/${value}`;
      }}
    >
      <div className="flex items-center w-[50%]">
        <img
          alt="employee"
          src={profilePicture}
          className="w-[42px] h-[42px] rounded-full object-cover"
        />
        <div className="text-start ml-4">
          <div className="flex gap-2 items-center">
            <p className="text-1 font-medium text-sm">
              {!!label && trimString(label || "-", 20)}
            </p>
            {!!isSme && <SMEIcon size={16} />}
          </div>
          <p className="text-darkGrey font-normal text-xs">
            {!!positionName && trimString(positionName || "-", 25)}
          </p>
        </div>
      </div>
      <div className="flex items-center w-[50%]">
        <div className="h-2 w-2 rounded-full bg-[#D9D9D9]" />
        <p className="text-start text-darkGrey font-normal text-xs ml-5">
          {!!groupName && trimString(groupName || "-", 25)}
        </p>
      </div>
    </button>
  );
}

export default function NavbarSearch() {
  const [socialEmployeeItems, setSocialEmployeeItems] = useState([]);
  const [searchValue, onSearchChange] = useState("");
  const [debounceQuery] = useDebouncedValue(searchValue, 500);

  const socialService = Networks(BASE_PROXY.social);
  const { data: employees, isLoading } = socialService.query(
    SOCIAL_ENDPOINT.GET.socialEmployees,
    ["socialEmployees", 1, debounceQuery],
    {
      onSuccess: (res) => {
        setSocialEmployeeItems(
          res.socialEmployees.map((e) => ({
            ...e,
            value: e.social_employee_profile_id,
            label: e.firstName,
            groupName: e.group_name,
            positionName: e.position_name,
            profilePicture: e.profile_picture,
          })),
        );
      },
    },
    {
      params: {
        page: 1,
        search: debounceQuery,
      },
    },
  );

  return (
    <Select
      itemComponent={EmployeeItems}
      classNames={{
        root: "w-[350px] xl:w-[517px] rounded-[10px]",
        input: "border-0",
      }}
      size="sm"
      placeholder="Cari sesuatu..."
      icon={<Icon icon="material-symbols:search" />}
      rightSection={<div />}
      searchable
      onSearchChange={onSearchChange}
      searchValue={searchValue}
      nothingFound={
        isLoading ? (
          <div className="w-full flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          "No options"
        )
      }
      data={socialEmployeeItems}
    />
  );
}
