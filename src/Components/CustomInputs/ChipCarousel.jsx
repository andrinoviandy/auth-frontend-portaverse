import { Icon } from "@iconify/react";
import PropTypes from "prop-types";
import { useRef } from "react";

export default function ChipCarousel({ data, value, onClick }) {
  const sliderRef = useRef(null);
  const handleSlideLeft = () => {
    sliderRef.current.scrollLeft = sliderRef.current.scrollLeft - 100;
  };

  const handleSlideRight = () => {
    sliderRef.current.scrollLeft = sliderRef.current.scrollLeft + 100;
  };

  return (
    <div className="flex items-center w-full py-2">
      <button
        type="button"
        className="static m-0 text-darkGrey mr-5"
        onClick={handleSlideLeft}
      >
        <Icon icon="ooui:previous-ltr" width={24} />
      </button>
      <div
        ref={sliderRef}
        className="w-[75vw] h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth hide-scrollbar-1 hide-scrollbar-2 flex gap-3"
      >
        {[{ label: "All", value: null }, ...data].map((item) => (
          <button
            key={item?.value}
            type="button"
            className={
              value === item?.value
                ? "border-2 border-primary3 p-2 px-4 text-primary3 bg-primary1 rounded-md"
                : "border-2 p-2 px-4 text-darkGrey hover:bg-bg2 rounded-md"
            }
            onClick={() => onClick(item?.value)}
          >
            {item?.label}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="static m-0 text-darkGrey ml-5"
        onClick={handleSlideRight}
      >
        <Icon icon="ooui:previous-rtl" width={24} />
      </button>
    </div>
  );
}

ChipCarousel.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
    }),
  ),
  value: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
  onClick: PropTypes.func,
};

ChipCarousel.defaultProps = {
  data: [],
  value: null,
  onClick: () => {},
};
