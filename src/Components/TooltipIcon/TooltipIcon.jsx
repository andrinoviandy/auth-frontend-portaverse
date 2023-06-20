import React from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import { Tooltip } from "@mantine/core";

export default function TooltipIcon({
  label,
  variant,
  color,
  labelColor,
  labelWidth,
  wrapLabel,
  position,
  iconSize,
  textAlign,
}) {
  const icon = {
    question: "ph:question-bold",
    info: "material-symbols:info-outline",
    "info-filled": "material-symbols:info",
  };
  return (
    <Tooltip
      label={label}
      withArrow
      multiline
      width={labelWidth || "auto"}
      color={labelColor}
      position={position}
    >
      <Icon icon={icon[variant]} color={color} width={iconSize} />
    </Tooltip>
  );
}

TooltipIcon.propTypes = {
  label: PropTypes.string.isRequired,
  variant: PropTypes.string,
  color: PropTypes.string,
  labelColor: PropTypes.string,
  labelWidth: PropTypes.string,
  wrapLabel: PropTypes.bool,
  position: PropTypes.string,
  iconSize: PropTypes.number,
  textAlign: PropTypes.string,
};

TooltipIcon.defaultProps = {
  variant: "question",
  color: "#016DB2",
  labelColor: "primary",
  labelWidth: "auto",
  wrapLabel: false,
  position: "top",
  iconSize: 20,
  textAlign: "left",
};
