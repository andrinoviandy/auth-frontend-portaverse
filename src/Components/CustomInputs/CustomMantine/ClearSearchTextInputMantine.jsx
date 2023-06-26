import { Icon } from "@iconify/react";
import PropTypes from "prop-types";

export const getClearableProps = (
  value,
  onClear,
  variant = "search",
) => ({
  rightSection: (
    <ClearSearchTextInputMantine
      value={value}
      onClear={onClear}
      variant={variant}
    />
  ),
  styles: {
    rightSection: { pointerEvents: !value ? "none" : undefined },
  },
});

export default function ClearSearchTextInputMantine({
  value,
  onClear,
  variant = "search",
}) {
  const iconProp = {
    search: { icon: "akar-icons:search", color: "#003F80" },
    select: { icon: "akar-icons:chevron-down" },
    date: { icon: "ic:round-date-range" },
  };

  if (
    !value ||
    (Array.isArray(value) && !value?.[0] && !value?.[1])
  ) {
    return (
      <Icon
        icon={iconProp[variant]?.icon}
        width={12}
        color={iconProp[variant]?.color}
      />
    );
  }

  return (
    <button
      type="button"
      className="cursor-pointer"
      onClick={onClear}
    >
      <Icon icon="bi:x" width={20} color="#868e96" />
    </button>
  );
}

ClearSearchTextInputMantine.propTypes = {
  value: PropTypes.string.isRequired,
  onClear: PropTypes.func.isRequired,
  variant: PropTypes.string,
};

ClearSearchTextInputMantine.defaultProps = {
  variant: "search",
};
