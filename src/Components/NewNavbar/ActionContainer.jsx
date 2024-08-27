/* eslint-disable react/jsx-props-no-spreading */
import clsx from "clsx"
import { forwardRef, useMemo } from "react";

const ActionContainer = forwardRef((props, ref) => {
  const { children, isActive, className = "", ...rest } = props;

  const isActiveDropdown = useMemo(() => {
    return !!props?.["aria-expanded"];
  }, [props]);

  return (
    <button
      ref={ref}
      {...rest}
      type="button"
      style={{ width: "2.5rem", height: "2.5rem" }}
      className={clsx(
        "flex mx-auto justify-center rounded-md select-none cursor-pointer items-center transition-all duration-150",
        "hover:bg-bg2 hover:text-primary3 hover:fill-primary3",
        isActive || isActiveDropdown
          ? "bg-bg2 text-primary3 fill-primary3"
          : "text-darkGrey fill-darkGrey",
        className,
      )}
    >
      {children}
    </button>
  );
});

export default ActionContainer;
