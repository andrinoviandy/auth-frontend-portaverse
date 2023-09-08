/* eslint-disable react/prop-types */
import { Icon } from "@iconify/react";
import { Anchor, Loader, Select } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useMemo, useState } from "react";
import {
  BASE_PROXY,
  SEARCH_ENGINE_ENDPOINT,
} from "../../Networks/endpoint";
import { Networks } from "../../Networks/factory";
import { COURSE_TYPES, color } from "../../Utils/Constants";
import SMEIcon from "../Assets/Icon/SME";
import ProfilePictureWithBadge from "../ProfilePictureWithBadge/ProfilePictureWithBadge";

function CourseTypeItem({ courseName, courseType }) {
  return (
    <div className="flex items-center gap-2">
      <div className="block">
        <Icon
          width={24}
          height={24}
          color={color.primary3}
          icon="fluent:learning-app-20-regular"
        />
      </div>
      <div className="text-sm font-medium text-coffee">
        {courseName}
        <span className="font-normal text-darkGrey">
          {" "}
          - {courseType}
        </span>
      </div>
    </div>
  );
}

function DocumentTypeItem({ filename, filetype = "pdf" }) {
  return (
    <div className="flex items-center gap-2">
      <div className="block">
        <Icon
          width={16}
          height={16}
          color={color.primary3}
          icon="pajamas:doc-text"
        />
      </div>
      <div className="text-sm font-medium text-coffee">
        {filename}.
        <span className="font-normal text-darkGrey">{filetype}</span>
      </div>
    </div>
  );
}

function EmployeeTypeItem({ avatar, isSme = false, employeeName }) {
  return (
    <div className="flex items-center gap-2">
      <div className="block">
        <ProfilePictureWithBadge
          className="object-cover w-6 h-6 border rounded-full"
          img={avatar}
          noImgVariant="light"
          badgeIcon={
            isSme ? (
              <div className="absolute -right-1 -bottom-2">
                <SMEIcon size={12} />
              </div>
            ) : null
          }
          name={employeeName}
        />
      </div>
      <div className="text-sm font-medium text-coffee">
        {employeeName}
      </div>
    </div>
  );
}

const mapGroup = {
  document: {
    group: "Dokumen",
    render: (data) => (
      <DocumentTypeItem
        filename={data.filename}
        filetype={data.filetype}
      />
    ),
    href: (data) => `${data.fileUrl}`,
  },
  employee: {
    group: "Pegawai",
    render: (data) => (
      <EmployeeTypeItem
        avatar={data.avatar}
        isSme={data.isSme}
        employeeName={data.employeeName}
      />
    ),
    href: (data) =>
      `${import.meta.env.VITE_KMS_URL}/employees/detail/${data.id}`,
  },
  trainer: {
    group: "Trainer",
    render: (data) => (
      <EmployeeTypeItem
        avatar={data.avatar}
        isSme={data.isSme}
        employeeName={data.trainerName}
      />
    ),
    // TODO: Integrate href for trainer to pool of trainer detail page (not developed yet)
    href: (data) => `${data.id}`,
  },
  course: {
    group: "Kursus",
    render: (data) => (
      <CourseTypeItem
        courseName={data.courseName}
        courseType={data.courseType}
      />
    ),
    href: (data) =>
      `${import.meta.env.VITE_LMS_URL}/explore/${data.id}`,
  },
};

function SelectItem({ data = {} }) {
  const RenderItem = useMemo(() => {
    if (data?.type) return mapGroup?.[data?.type]?.render(data);
    return null;
  }, [data, mapGroup]);

  const linkHref = useMemo(() => {
    if (data?.type) return mapGroup?.[data?.type]?.href(data);
    return "";
  }, [data, mapGroup]);

  return (
    <Anchor
      rel="noopener noreferrer"
      href={linkHref}
      className="px-4 pb-4 no-underline"
    >
      {RenderItem}
    </Anchor>
  );
}

export default function NavbarSearch() {
  const [searchValue, onSearchChange] = useState("");
  const [debounceQuery] = useDebouncedValue(searchValue, 500);

  const searchService = Networks(BASE_PROXY.searchEngine);
  const { data: searchResultItems, isLoading } = searchService.query(
    SEARCH_ENGINE_ENDPOINT.GET.spotlight,
    [SEARCH_ENGINE_ENDPOINT.GET.spotlight, debounceQuery],
    {
      select: (res) => {
        return res?.map((e) => {
          let data = {};
          if (e.type === "course") {
            data = {
              courseName: e.display,
              courseType: COURSE_TYPES?.[e?.describe?.type_course],
            };
          } else if (e.type === "employee") {
            data = {
              avatar: e?.describe?.avatar,
              isSme: e?.describe?.is_sme,
              employeeName: e.display,
            };
          } else if (e.type === "trainer") {
            data = {
              avatar: e?.describe?.avatar,
              isSme: e?.describe?.is_sme,
              trainerName: e.display,
            };
          } else if (e.type === "document") {
            data = {
              filetype: e?.describe?.type_file,
              filename: e.display,
              fileUrl: e?.describe?.link_file,
            };
          }
          return {
            ...e,
            value: e.id,
            label: e.display,
            group: mapGroup?.[e.type]?.group,
            data: {
              ...data,
              id: e.id,
              type: e.type,
            },
          };
        });
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
      itemComponent={SelectItem}
      classNames={{
        root: "w-[750px] rounded-[6px]",
        input: "border-0",
        separator: "px-4 py-3",
        separatorLabel: "text-sm",
        dropdown: "top-[58px]",
      }}
      styles={{
        separatorLabel: {
          color: color.darkGrey,
          "&::after": { borderTop: "none" },
        },
      }}
      size="lg"
      placeholder="Cari sesuatu"
      icon={
        <Icon
          icon="material-symbols:search"
          width={20}
          color={color.darkGrey}
        />
      }
      rightSection={<div />}
      searchable
      maxDropdownHeight={450}
      onSearchChange={onSearchChange}
      searchValue={searchValue}
      nothingFound={
        isLoading ? (
          <div className="flex items-center justify-center w-full">
            <Loader />
          </div>
        ) : (
          "No options"
        )
      }
      data={searchResultItems || []}
    />
  );
}
