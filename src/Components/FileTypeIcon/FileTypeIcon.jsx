import PropTypes from "prop-types";
import Doc from "../Assets/Icon/Doc";
import Bp from "../Assets/Icon/FileTypeIcon/Bp";
import Kd from "../Assets/Icon/FileTypeIcon/Kd";
import Ll from "../Assets/Icon/FileTypeIcon/Ll";
import Gif from "../Assets/Icon/Gif";
import Jpeg from "../Assets/Icon/Jpeg";
import Jpg from "../Assets/Icon/Jpg";
import Mov from "../Assets/Icon/Mov";
import Mp4 from "../Assets/Icon/Mp4";
import Pdf from "../Assets/Icon/Pdf";
import Png from "../Assets/Icon/Png";
import Ppt from "../Assets/Icon/Ppt";
import Xls from "../Assets/Icon/Xls";

// {size} is the size of the icon
// - minus to reduce icon size
// - plus to increase icon size
// {type} is the type of the icon
// ! see the icon component for base size
function FileTypeIcon({ type, size }) {
  const comp = {
    ppt: <Ppt size={size} />,
    pptx: <Ppt size={size} />,
    doc: <Doc size={size} />,
    docx: <Doc size={size} />,
    xls: <Xls size={size} />,
    xlsx: <Xls size={size} />,
    pdf: <Pdf size={size} />,
    png: <Png size={size} />,
    jpg: <Jpg size={size} />,
    jpeg: <Jpeg size={size} />,
    gif: <Gif size={size} />,
    mp4: <Mp4 size={size} />,
    mov: <Mov size={size} />,
    // for documentation_category_id
    1: <Kd size={size} />,
    2: <Bp size={size} />,
    3: <Ll size={size} />,
  };

  if (!Object.keys(comp).includes(type)) {
    return <em>No Icon</em>;
  }

  return comp[type];
}

export default FileTypeIcon;

FileTypeIcon.propTypes = {
  type: PropTypes.string.isRequired,
  size: PropTypes.number,
};

FileTypeIcon.defaultProps = {
  size: 0,
};
