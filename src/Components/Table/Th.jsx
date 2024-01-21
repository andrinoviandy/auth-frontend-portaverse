import { Icon } from "@iconify/react";
import { color } from "../../Utils/Constants";
import TooltipIcon from "../TooltipIcon/TooltipIcon";

export default function Th({
  children,
  sortValue, // "ASC" | "DESC" | null
  tooltipLabel,
  tooltipVariant = "question", // "question" || "info" || "info-filled"
  tooltipColor = "#8792A4",
  tooltipLabelColor = "dark", // Refer to Mantine color
  sortValueKeys = { ASC: "ASC", DESC: "DESC" },
  onClickSort = () => {},
  className = "",
  withSort = true,
  withTooltip = false,
}) {
  const handleClickSort = () => {
    const newSortValue =
      sortValue === sortValueKeys.ASC
        ? sortValueKeys.DESC
        : sortValueKeys.ASC;
    onClickSort(newSortValue);
  };
  return (
    <th className={className}>
      <div className="flex justify-between gap-2">
        {withTooltip ? (
          <div className="flex items-center gap-2">
            {children}
            <TooltipIcon
              color={tooltipColor}
              labelColor={tooltipLabelColor}
              variant={tooltipVariant}
              label={tooltipLabel}
              classNames={{
                tooltip: "normal-case text-center max-w-[500px]",
              }}
            />
          </div>
        ) : (
          children
        )}
        {withSort && (
          <button type="button" onClick={handleClickSort}>
            <Icon
              icon="bxs:up-arrow"
              width={9}
              color={
                sortValue === sortValueKeys.ASC
                  ? color.primary3
                  : color.grey
              }
            />
            <Icon
              icon="bxs:down-arrow"
              width={9}
              color={
                sortValue === sortValueKeys.DESC
                  ? color.primary3
                  : color.grey
              }
            />
            {/* <Icon icon="fa-solid:sort" width={10} /> */}
          </button>
        )}
      </div>
    </th>
  );
}
