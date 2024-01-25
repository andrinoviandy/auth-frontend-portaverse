import { Tooltip, clsx } from "@mantine/core";
import PropTypes from "prop-types";
import { useMemo } from "react";
import trimString from "../../Utils/Helpers/trimString";

function Badge({
  variant = "primary",
  rounded = "none",
  value,
  customClasses = "",
  customTextClasses = "",
  maxLength = 50,
  withTooltip = false,
  rootFitContent = false,
}) {
  const roundedClass = useMemo(() => {
    const classes = "";
    if (rounded !== "none") return `rounded-${rounded}`;
    return classes;
  }, [rounded]);

  const classNames = useMemo(() => {
    let classes = "";
    switch (variant) {
      case "primary":
        classes = "bg-[#C9F3FB] text-[#016DB2] border-[#C9F3FB]";
        break;
      case "primary-border":
        classes = "bg-[#C9F3FB] text-[#016DB2] border-[#016DB2]";
        break;
      case "primary-outline":
        classes = "bg-white text-[#016DB2] border-[#016DB2]";
        break;
      case "green":
        classes = "bg-[#F4FBF4] text-[#4BB543]  border-[#B8E3B5]";
        break;
      case "yellow":
        classes = "bg-[#FEF9F1] text-[#F5BB5C] border-[#F9D79F]";
        break;
      case "red":
        classes = "bg-[#FFF4F2] text-[#CB3A31] border-[#EEB4B0]";
        break;
      case "purple":
        classes = "bg-[#F0F3FF] text-[#3267E3] border-[#B1C5F6]";
        break;
      case "gray":
        classes = "bg-[#F2F4F8] text-darkGrey border-darkGrey";
        break;
      case "gray-outline":
        classes = "bg-[#F2F4F8] text-darkGrey border-darkGrey";
        break;
      case "white":
        classes = "bg-white text-darkGrey border-darkGrey";
        break;
      case "blue":
        classes = "bg-info1 text-info3 border-info3";
        break;
      default:
        classes = "bg-[#C9F3FB] text-[#016DB2] border-[#C9F3FB]";
    }

    return `${classes} ${roundedClass}`;
  }, [variant]);

  if (withTooltip) {
    return (
      <Tooltip
        label={value}
        classNames={{
          tooltip: "max-w-[350px] whitespace-normal text-center",
        }}
        color="primary"
      >
        <div
          className={`flex flex-col items-center ${
            rootFitContent ? "w-fit" : ""
          }`}
        >
          <div
            className={clsx(
              "py-1 px-2 font-medium rounded w-fit border text-center",
              classNames,
              customTextClasses,
            )}
          >
            {value ? trimString(value, maxLength) : ""}
          </div>
        </div>
      </Tooltip>
    );
  }

  return (
    <div
      className={`flex flex-col${
        rootFitContent ? "w-fit" : ""
      } ${customClasses}`}
    >
      <div
        className={clsx(
          "py-1 px-2 font-medium rounded w-fit border text-center",
          classNames,
          customTextClasses,
        )}
      >
        {value ? trimString(value, maxLength) : ""}
      </div>
    </div>
  );
}

Badge.propTypes = {
  variant: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  rounded: PropTypes.string,
  customTextClasses: PropTypes.string,
  maxLength: PropTypes.number,
  withTooltip: PropTypes.bool,
  rootFitContent: PropTypes.bool,
  customClasses: PropTypes.string,
};

Badge.defaultProps = {
  rounded: "none",
  customTextClasses: "",
  maxLength: 50,
  withTooltip: false,
  rootFitContent: false,
  customClasses: "items-center",
};

export default Badge;
