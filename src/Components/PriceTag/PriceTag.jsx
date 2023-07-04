import { Icon } from "@iconify/react";
import PropTypes from "prop-types";

export default function PriceTag({
  price,
  size,
  classNames = {
    icon: "",
    wrapper: "",
    price: "",
  },
}) {
  const formattedPrice = Intl.NumberFormat("id").format(price);
  return (
    <div
      className={`flex gap-1 items-center ${classNames.wrapper}`}
      style={{ fontSize: `${size * 1}px` }}
    >
      <Icon
        icon="healthicons:coins"
        className={`text-primary3 ${classNames.icon}`}
        width={size + 3}
      />
      <span
        className={`text-primary3 font-semibold ${classNames.price}`}
        style={{ fontSize: `${size * 1}px` }}
      >
        {price ? formattedPrice : "Gratis"}
      </span>
    </div>
  );
}

PriceTag.propTypes = {
  price: PropTypes.number.isRequired,
  size: PropTypes.number,
  classNames: PropTypes.oneOfType([PropTypes.object]),
};

PriceTag.defaultProps = {
  size: 20,
  classNames: {
    icon: "",
    wrapper: "",
    price: "",
  },
};
