import PropTypes from "prop-types";
import ProfilePicture from "../ProfilePicture/ProfilePicture";

export default function ProfilePictureWithBadge({
  className,
  alt,
  img,
  name,
  style,
  badgeIcon,
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
        />
        <div className="absolute top-4 right-0">{badgeIcon}</div>
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
      <div className="absolute top-4 right-0">{badgeIcon}</div>
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
};

ProfilePictureWithBadge.defaultProps = {
  className: "",
  alt: "",
  style: {},
  img: "",
  name: "",
};
