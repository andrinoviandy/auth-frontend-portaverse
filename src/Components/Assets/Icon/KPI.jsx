import PropTypes from "prop-types";

export default function KPI({
  backgroundColor,
  color,
  width,
  height,
}) {
  return (
    <div
      className="flex items-center justify-center rounded-md"
      style={{
        background: backgroundColor,
        color,
        width,
        height,
        fontSize: width / 2.8,
      }}
    >
      <p className="font-bold">KPI</p>
    </div>
  );
}

KPI.propTypes = {
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

KPI.defaultProps = {
  backgroundColor: "rgb(1 109 178)",
  color: "white",
  width: 28,
  height: 28,
};
