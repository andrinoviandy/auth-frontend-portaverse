import PropTypes from "prop-types";
import ProfilePicture from "../ProfilePicture/ProfilePicture";

export default function ProfilePictureWithBadge({
  className,
  alt,
  img,
  name,
  style,
  badgeIcon,
  noImgVariant = "default",
}) {
  if (!img) {
    return (
      <div className="relative">
        <ProfilePicture
          className={className}
          alt={alt}
          img={img}
          style={style}
          name={name}
          noImgVariant={noImgVariant}
        />
        <div className="absolute bottom-0 right-0">{badgeIcon}</div>
      </div>
    );
  }

  return (
    <div className="relative">
      <ProfilePicture
        className={className}
        alt={alt}
        img={img}
        style={style}
        name={name}
      />
      <div className="absolute bottom-0 right-0">{badgeIcon}</div>
    </div>
  );
}

ProfilePictureWithBadge.propTypes = {
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object]),
  alt: PropTypes.string,
  img: PropTypes.string,
  name: PropTypes.string,
  badgeIcon: PropTypes.element.isRequired,
  noImgVariant: PropTypes.string,
};

ProfilePictureWithBadge.defaultProps = {
  className: "",
  alt: "",
  style: {},
  img: "",
  name: "",
  noImgVariant: "default",
};
