import PropTypes from "prop-types";
import ProfilePictureWithBadge from "../ProfilePictureWithBadge";

export default function Profile({
  alt,
  img,
  name,
  subName,
  subSubName,
  badgeIcon,
  rightIcon,
  withImage,
  noImgVariant = "light",
  classNames = {
    root: "",
    textWrapper: "",
    name: "",
    subName: "",
    subSubName: "",
    profilePicture: "",
  },
}) {
  return (
    <div className={`flex gap-3 ${classNames.root}`}>
      {withImage && (
        <ProfilePictureWithBadge
          noImgVariant={noImgVariant}
          alt={alt}
          name={name}
          img={img}
          badgeIcon={badgeIcon}
          className={`h-[40px] w-[40px] rounded-full shrink-0 ${classNames.profilePicture}`}
        />
      )}
      <div
        className={`flex flex-col text-start items-start justify-center ${classNames.textWrapper}`}
      >
        <div className="flex items-center gap-2">
          <p className={`font-medium ${classNames.name}`}>{name}</p>
          {rightIcon}
        </div>
        <p
          className={`font-normal text-sm text-darkGrey ${classNames.subName}`}
        >
          {subName}
        </p>
        <p
          className={`font-normal text-sm text-darkGrey ${classNames.subSubName}`}
        >
          {subSubName}
        </p>
      </div>
    </div>
  );
}

Profile.propTypes = {
  alt: PropTypes.string,
  img: PropTypes.string,
  name: PropTypes.string.isRequired,
  subName: PropTypes.string,
  subSubName: PropTypes.string,
  badgeIcon: PropTypes.element,
  rightIcon: PropTypes.element,
  withImage: PropTypes.bool,
  noImgVariant: PropTypes.string,
  classNames: PropTypes.oneOfType([PropTypes.object]),
};

Profile.defaultProps = {
  alt: "",
  img: "",
  subName: "",
  subSubName: "",
  badgeIcon: null,
  rightIcon: null,
  withImage: true,
  noImgVariant: "light",
  classNames: {
    root: "",
    textWrapper: "",
    name: "",
    subName: "",
    profilePicture: "",
  },
};
