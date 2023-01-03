import PropTypes from "prop-types";
import { forwardRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Bell from "../../Assets/Icon/Bell";
import MenuFill from "../../Assets/Icon/MenuFill";
import Messages from "../../Assets/Icon/Messages";
import PortaLogo from "../../Assets/Pictures/PortaLogo.png";
import Notification from "../../Notification";
import HelpCenter from "./HelpCenter";
import NavbarSearch from "./NavbarSearch";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = forwardRef((props, ref) => {
  const { extendSidebar, setExtendSidebar } = props;
  const navigate = useNavigate();

  return (
    <nav className="flex flex-wrap items-center justify-between bg-white h-14 border-gray-200 px-4 py-2.5 drop-shadow-sm sticky top-0 z-20">
      <div className="flex self-center items-center gap-5">
        <div ref={ref} className="flex items-center">
          <button
            type="button"
            onClick={() => setExtendSidebar(!extendSidebar)}
          >
            <MenuFill width={33} />
          </button>
        </div>

        <Link to="/home">
          <img
            src={PortaLogo}
            alt="company_logo"
            className="h-[40px] p-2"
          />
        </Link>

        {/* <Menu>
          <Menu.Target>
            <div className="flex items-center gap-1 py-1 px-3 rounded-md bg-primary1/10 text-primary1 font-semibold cursor-pointer">
              <span>KMS</span>
              <Icon icon="bxs:down-arrow" width={12} />
            </div>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item>
              <a href={import.meta.env.VITE_LMS_URL}>LMS</a>
            </Menu.Item>
            <Menu.Item>
              <a href={import.meta.env.VITE_TMS_URL}>TMS</a>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu> */}
      </div>

      <div className="flex items-center w-400 gap-6">
        <NavbarSearch />

        <div className="flex justify-center items-center gap-2">
          <div className="flex justify-center items-center gap-3.5">
            <button
              type="button"
              onClick={() => navigate("/messaging")}
            >
              <Messages />
            </button>

            <HelpCenter />

            <Notification icon={<Bell />} />

            <hr className="border-r h-6 mx-1" />
          </div>

          <ProfileDropdown />
        </div>
      </div>
    </nav>
  );
});

export default Navbar;

Navbar.propTypes = {
  extendSidebar: PropTypes.bool.isRequired,
  setExtendSidebar: PropTypes.func.isRequired,
};
