import { Icon } from "@iconify/react";
import clsx from "clsx"
import PropTypes from "prop-types";
import { Rating } from "react-simple-star-rating";

export default function StarRating({
  rating,
  ratingSum,
  ratingCount,
  size,
  withAvg,
  withReviewsText,
  isCompact,
  className,
}) {
  const average =
    (rating || 0.0).toFixed(1) ||
    (ratingSum / ratingCount).toFixed(1);

  return (
    <div
      className={clsx(
        "flex flex-shrink-0 items-center font-medium",
        isCompact ? "gap-1" : "gap-2",
      )}
    >
      {withAvg && (
        <span
          className="text-yellow-400"
          style={{ fontSize: `${size * 1}px` }}
        >
          {ratingCount < 1 ? 0 : average}
        </span>
      )}
      {isCompact ? (
        <Icon
          icon="mdi:star"
          color="#FCA016"
          width={size + 2}
          height={size + 2}
        />
      ) : (
        <Rating
          className="mb-1"
          initialValue={ratingCount < 1 ? 0 : average}
          size={size + 2}
          allowHover={false}
          readonly
          fillColor="#FCA016"
        />
      )}
      <span
        className={className}
        style={{ fontSize: `${size * 1}px` }}
      >
        ({ratingCount}
        {withReviewsText && " ulasan"})
      </span>
    </div>
  );
}

StarRating.propTypes = {
  rating: PropTypes.number,
  ratingSum: PropTypes.number.isRequired,
  ratingCount: PropTypes.number.isRequired,
  size: PropTypes.number,
  withAvg: PropTypes.bool,
  withReviewsText: PropTypes.bool,
  isCompact: PropTypes.bool,
  className: PropTypes.string,
};

StarRating.defaultProps = {
  rating: 0,
  size: 15,
  withAvg: true,
  withReviewsText: false,
  isCompact: false,
  className: "",
};
