import PropTypes from "prop-types";
import { Wave1, Wave2 } from "../Assets/Icon/Wave";

export default function Footer({ url }) {
  if (url === "login") {
    return (
      <footer className="relative flex justify-center">
        <Wave2 />
        <h5 className="absolute bottom-0 pb-7 text-darkGray">
          Powered by KMPlus Consulting 2022
        </h5>
      </footer>
    );
  }

  if (url === "") {
    return (
      <footer className="relative flex justify-center">
        <Wave1 />
        <h5 className="absolute bottom-0 pb-7 text-darkGray">
          Powered by KMPlus Consulting 2022
        </h5>
      </footer>
    );
  }

  return (
    <footer className="flex justify-center">
      <h5 className="pb-7 text-darkGray">
        Powered by KMPlus Consulting 2022
      </h5>
    </footer>
  );
}

Footer.propTypes = {
  url: PropTypes.string.isRequired,
};
