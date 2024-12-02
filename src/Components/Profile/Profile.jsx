import PropTypes from "prop-types";

import ProfilePicture from "../ProfilePicture";

export default function Profile({
  alt,
  img,
  name,
  subName,
  subSubName,
  badgeIcon,
  rightIcon,
  withImage,
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
        <ProfilePicture
          alt={alt}
          name={name}
          imageUrl={img}
          size={40}
          badgeIcon={badgeIcon}
          className="shrink-0"
        />
      )}
      <div
        className={`flex flex-col items-start justify-center text-start ${classNames.textWrapper}`}
      >
        <div className="flex items-center gap-2">
          <p className={`font-medium ${classNames.name}`}>{name}</p>
          {rightIcon}
        </div>
        <p
          className={`text-sm font-normal text-darkGrey ${classNames.subName}`}
        >
          {subName}
        </p>
        <p
          className={`text-sm font-normal text-darkGrey ${classNames.subSubName}`}
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
