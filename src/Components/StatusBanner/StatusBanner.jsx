import { Icon } from "@iconify/react";
import { clsx } from "@mantine/core";
import PropTypes from "prop-types";
import { color } from "../../Utils/Constants";

export default function StatusBanner({
  message,
  submessage,
  variant,
  optionalComponent,
  className,
}) {
  const VARIANT = {
    error: {
      icon: "mdi:warning-circle",
      style: "bg-danger1 text-danger3",
      iconColor: color.danger3,
    },
    warning: {
      icon: "mdi:warning-circle",
      style: "bg-warning1 text-warning3",
      text: "text-warning3",
    },
    success: {
      icon: "akar-icons:circle-check-fill",
      style: "bg-success1 text-success3",
      iconColor: color.success3,
    },
    accent: {
      icon: "mdi:warning-circle-outline",
      style: "bg-accent1 text-accent3",
      text: "text-accent3",
    },
    decline: {
      icon: "ep:circle-close-filled",
      style: "bg-danger1 ",
      text: "text-base font-normal",
      iconColor: color.danger3,
    },
    accept: {
      icon: "ep:circle-check-filled",
      style: "bg-success1 ",
      text: "text-base font-normal",
      iconColor: color.success3,
    },
  };
  return (
    <div
      className={clsx(
        "flex flex-col px-4 py-3 rounded-md ",
        VARIANT[variant].style,
        className,
      )}
    >
      <div className={clsx("flex gap-3 items-start", VARIANT)}>
        <Icon
          icon={VARIANT[variant].icon}
          width={24}
          className="flex-shrink-0"
          color={VARIANT[variant]?.iconColor || color.text1}
        />
        <div>
          <p
            className={`font-medium text-sm ${
              VARIANT[variant].text
                ? VARIANT[variant].text
                : "text-black"
            } `}
          >
            {message}
          </p>
          {submessage && (
            <p
              className={`font-medium text-sm mt-1 ${
                VARIANT[variant].text
                  ? VARIANT[variant].text
                  : "text-black "
              } `}
            >
              {submessage}
            </p>
          )}
        </div>
      </div>

      {optionalComponent}
    </div>
  );
}

StatusBanner.propTypes = {
  message: PropTypes.string,
  submessage: PropTypes.string,
  variant: PropTypes.string,
  optionalComponent: PropTypes.element,
  className: PropTypes.string,
};

StatusBanner.defaultProps = {
  message: "Something went wrong",
  submessage: null,
  variant: "error",
  optionalComponent: null,
  className: "",
};
