/* eslint-disable react/prop-types */
import { Icon } from "@iconify/react";
import { Anchor, Loader, Select } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useMemo, useState } from "react";

import SMEIcon from "../Assets/Icon/SME";
import ProfilePicture from "../ProfilePicture";
import {
  BASE_PROXY,
  SEARCH_ENGINE_ENDPOINT,
} from "../../Networks/endpoint";
import { Networks } from "../../Networks/factory";
import { color, COURSE_TYPES } from "../../Utils/Constants";
import trimString from "../../Utils/Helpers/trimString";

const mapTrainer = {
  External: {
    label: "Eksternal",
  },
  Internal: {
    label: "Internal",
  },
};

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

function EmployeeTypeItem({
  avatar,
  withAvatar = false,
  isSme = false,
  employeeName,
  employeeNumber,
  positionName,
}) {
  return (
    <div className="flex max-w-full items-center gap-2">
      <div className="block">
        {withAvatar ? (
          <ProfilePicture
            alt="avatar"
            name={employeeName}
            imageUrl={avatar}
            size={24}
            badgeIcon={isSme ? <SMEIcon size={12} /> : null}
            className="border"
          />
        ) : (
          <Icon
            width={24}
            height={24}
            color={color.primary3}
            icon="bx:user-circle"
          />
        )}
      </div>
      <div className="w-full text-sm font-medium text-coffee">
        {employeeName}
        <span className="w-full truncate font-normal text-darkGrey">
          {employeeNumber && <> &bull; {employeeNumber}</>}
          {positionName && (
            <> &bull; {trimString(positionName, 30)}</>
          )}
        </span>
      </div>
    </div>
  );
}

function TrainerTypeItem({
  avatar,
  isSme = false,
  trainerName,
  trainerType,
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="block">
        <ProfilePicture
          alt="avatar"
          name={trainerName}
          imageUrl={avatar}
          size={24}
          badgeIcon={isSme ? <SMEIcon size={12} /> : null}
          className="border"
        />
      </div>
      <div className="text-sm font-medium text-coffee">
        {trainerName}
        <span className="font-normal text-darkGrey">
          {" "}
          - {trainerType}
        </span>
      </div>
    </div>
  );
}
function PostTypeItem({ postContent = "", postType = "Post" }) {
  return (
    <div className="flex items-center gap-2">
      <div className="block">
        <Icon
          width={16}
          height={16}
          color={color.primary3}
          icon="bi:file-post"
        />
      </div>
      <div className="text-sm font-medium text-coffee">
        {trimString(postContent, 50)}
        <span className="font-normal text-darkGrey">
          {" "}
          - {postType}
        </span>
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
        employeeNumber={data.employeeNumber}
        positionName={data.positionName}
      />
    ),
    href: (data) =>
      `${import.meta.env.VITE_KMS_URL}/employees/detail/${data.id}`,
  },
  trainer: {
    group: "Trainer",
    render: (data) => (
      <TrainerTypeItem
        avatar={data.avatar}
        isSme={data.isSme}
        trainerName={data.trainerName}
        trainerType={data.trainerType}
      />
    ),
    // TODO: Integrate href for trainer to pool of trainer detail page (not developed yet)
    href: () => "",
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
  socmed: {
    group: "Social Media Profile",
    render: (data) => (
      <EmployeeTypeItem
        avatar={data.avatar}
        isSme={data.isSme}
        employeeName={data.employeeName}
        withAvatar
        employeeNumber={data.employeeNumber}
        positionName={data.positionName}
      />
    ),
    href: (data) =>
      `${import.meta.env.VITE_KMS_URL}/home/detail/${data.id}`,
  },
  post: {
    group: "Post",
    render: (data) => (
      <PostTypeItem
        postContent={data.postContent}
        postType={data.postType}
      />
    ),
    href: (data) =>
      `${import.meta.env.VITE_KMS_URL}/home?post=${data.id}`,
  },
  survey: {
    group: "Survey",
    render: (data) => (
      <PostTypeItem
        postContent={data.postContent}
        postType={data.postType}
      />
    ),
    href: (data) =>
      `${import.meta.env.VITE_KMS_URL}/home?post=${data.id}`,
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
              positionName: e?.describe?.position,
              employeeNumber: e?.describe?.nipp,
            };
          } else if (e.type === "trainer") {
            data = {
              avatar: e?.describe?.avatar,
              isSme: e?.describe?.is_sme,
              trainerName: e.display,
              trainerType:
                mapTrainer?.[e?.describe?.type_trainer]?.label,
            };
          } else if (e.type === "document") {
            data = {
              filetype: e?.describe?.type_file,
              filename: e.display,
              fileUrl: e?.describe?.link_file,
            };
          } else if (e.type === "socmed") {
            data = {
              avatar: e?.describe?.social_media_avatar,
              isSme: e?.describe?.is_sme,
              employeeName: e?.display,
              employeeNumber: e?.describe?.nipp,
            };
          } else if (e.type === "post") {
            const { display } = e || {};
            const div = document.createElement("div");
            div.innerHTML = display;
            const parsedDisplay =
              div.textContent || div.innerText || "";

            data = {
              postContent: parsedDisplay,
              postType: e?.describe?.category_post,
            };
          } else if (e.type === "survey") {
            const { display } = e || {};
            const div = document.createElement("div");
            div.innerHTML = display;
            const parsedDisplay =
              div.textContent || div.innerText || "";

            data = {
              postContent: parsedDisplay,
              postType: e?.describe?.category_post,
            };
          }
          return {
            ...e,
            value: e.id,
            label: `${e.display} ${e?.describe?.nipp} ${e?.describe?.position}`,
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
          <div className="flex w-full items-center justify-center">
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
