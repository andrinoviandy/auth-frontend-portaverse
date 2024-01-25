import clsx from "clsx";
import PropTypes from "prop-types";

export default function DashedProgressBar({
  value = 4.5,
  sectionCount = 5,
  classNames = { root: "", bar: "" },
  isRounded,
}) {
  const getWidth = (currVal, idx) => {
    const normIdx = idx + 1;
    const diff = currVal - normIdx;
    if (currVal === normIdx) return "100%";
    if (diff < 0 && diff > -1)
      return `${(1 - Math.abs(diff)) * 100}%`;
    if (currVal > normIdx) return "100%";
    if (currVal < normIdx) return "0%";
    return "0%";
  };

  return (
    <div
      style={{ width: "100%" }}
      className={clsx("flex gap-3", classNames.root)}
    >
      {Array.from({ length: sectionCount }).map((_, i) => (
        <div
          key={i}
          className={clsx(
            "bg-[#DDE1E6] h-[10px]",
            isRounded ? "rounded-md" : "",
          )}
          style={{
            width: `calc(100% / ${sectionCount})`,
          }}
        >
          <div
            className={clsx(
              "bg-[#016DB2] h-[10px] z-[2]",
              isRounded ? "rounded-md" : "",
              classNames.bar,
            )}
            style={{
              width: getWidth(value, i),
            }}
          />
        </div>
      ))}
    </div>
  );
}

DashedProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  sectionCount: PropTypes.number.isRequired,
  classNames: PropTypes.shape({
    root: PropTypes.string,
    bar: PropTypes.string,
  }),
  isRounded: PropTypes.bool,
};

DashedProgressBar.defaultProps = {
  classNames: { root: "", bar: "" },
  isRounded: false,
};
