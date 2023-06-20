import { Icon } from "@iconify/react";
import { Avatar, Progress, Text, Tooltip } from "@mantine/core";
import dayjs from "dayjs";
import React from "react";
import formatLearningHours from "../../Utils/Helpers/formatLearningHours";
import toFixedTrim from "../../Utils/Helpers/toFixedTrim";
import trimString from "../../Utils/Helpers/trimString";
import PriceTag from "../PriceTag";
import StarRating from "../StarRating/StarRating";

export default function CourseCardNew({
  courseData,
  href,
  withVendor = true,
  withRating = true,
  withLearningHour = true,
  withPrice = true,
  withProgress = false,
  classNames = { root: "" },
}) {
  const {
    id,
    name,
    description,
    price,
    coverImg,
    startDate,
    endDate,
    rating,
    ratingCount,
    learningHour,
    progress,
    subcon, // object of { name, avatar }
    vendor, // object of { name, avatar }
  } = courseData;

  const formattedDate = endDate ? (
    <>
      <span>{dayjs(startDate).format("D MMMM YYYY")}</span>
      <span>&nbsp;-&nbsp;</span>
      <span>{dayjs(endDate).format("D MMMM YYYY")}</span>
    </>
  ) : (
    "Dapat Diakses Kapanpun"
  );

  return (
    <div
      className={`bg-white h-[330px] rounded-lg border ${classNames.root}`}
    >
      <a
        href={href || `${import.meta.env.VITE_LMS_URL}/explore/${id}`}
      >
        <div className="relative">
          <img
            src={coverImg}
            alt="course"
            className="rounded-t-lg w-full h-28 object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col justify-between gap-3 p-4 h-[220px]">
          <div className="flex flex-col gap-1">
            {withPrice && (
              <PriceTag
                price={price}
                classNames={{
                  price: '"text-primary3 font-semibold"',
                }}
                size={20}
              />
            )}
            <Tooltip
              label={name}
              withinPortal
              classNames={{
                tooltip:
                  "text-center whitespace-normal max-w-[250px]",
              }}
            >
              <h4 className="font-semibold text-base line-clamp-2 break-words">
                {name}
              </h4>
            </Tooltip>
            <Tooltip
              label={formattedDate}
              withinPortal
              classNames={{
                tooltip:
                  "text-center whitespace-normal max-w-[250px]",
              }}
            >
              <p className="flex gap-1 text-darkGrey font-medium text-sm flex-wrap line-clamp-1">
                {formattedDate}
              </p>
            </Tooltip>
            {/* <p className="text-darkGrey line-clamp-3 text-sm break-words">
              {description}
            </p> */}
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-sm">
              {withRating && (
                <StarRating
                  rating={+rating || 0}
                  ratingCount={+ratingCount || 0}
                  isCompact
                />
              )}
              {withRating && withLearningHour && (
                <div className="h-full w-[1px] bg-gray-200" />
              )}
              {withLearningHour && (
                <div className="flex items-center gap-2 text-primary3">
                  <Icon icon="mdi:clock-outline" width={14} />
                  <p className="font-medium">
                    {formatLearningHours(learningHour || 0)}
                  </p>
                </div>
              )}
            </div>

            {withProgress && (
              <div className="flex flex-col gap-1">
                <p className="text-darkGrey">
                  {toFixedTrim(progress || 0, 2)}% Complete
                </p>
                <Progress value={progress || 0} />
              </div>
            )}

            <div className="flex gap-2">
              {withVendor && (
                <div className="flex items-center gap-1">
                  <Avatar
                    radius="xl"
                    size="sm"
                    src={vendor?.avatar}
                  />
                  <Tooltip
                    label={vendor?.name}
                    disabled={vendor?.name?.length < 8}
                  >
                    <Text
                      color="dimmed"
                      size="xs"
                      className="font-medium"
                    >
                      {trimString(vendor?.name || "No Name", 8)}
                    </Text>
                  </Tooltip>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Avatar radius="xl" size="sm" src={subcon?.avatar} />
                <Tooltip
                  label={subcon?.name}
                  disabled={subcon?.name?.length < 8}
                >
                  <Text
                    color="dimmed"
                    size="xs"
                    className="font-medium"
                  >
                    {trimString(subcon?.name || "No Name", 8)}
                  </Text>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
