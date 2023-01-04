import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

export default function ProfilePicture({
  className,
  alt,
  img,
  style,
  name,
}) {
  const ref = useRef();
  useEffect(() => {
    if (ref?.current) {
      ref.current.style.fontSize = `${ref.current.offsetWidth / 2}px`;
    }
  }, [ref]);

  if (!img) {
    return (
      <div
        ref={ref}
        className={`flex items-center justify-center bg-primary3 text-white text-center ${className} cursor-default`}
      >
        {name
          .split(" ")
          .slice(0, 2)
          .map((item) => item[0])
          .join("")
          .toUpperCase()}
      </div>
    );
  }

  return (
    <img
      src={img}
      alt={alt}
      className={className}
      style={style}
      loading="lazy"
    />
  );
}

ProfilePicture.propTypes = {
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object]),
  alt: PropTypes.string,
  img: PropTypes.string,
  name: PropTypes.string,
};

ProfilePicture.defaultProps = {
  className: "",
  alt: "",
  style: {},
  img: "",
  name: "Unknown",
};
