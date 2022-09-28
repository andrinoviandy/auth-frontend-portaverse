import { Outlet } from "react-router-dom";
import PortaverseLogo from "../Assets/Pictures/PortaverseLogo.png";
import Footer from "../Footer";

export default function MainLayout() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div className="container mx-auto flex flex-col gap-2">
        <nav className="p-5">
          <img
            src={PortaverseLogo}
            alt="company_logo"
            className="h-[100px] p-2"
          />
        </nav>

        <main className="scroll-smooth px-5">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}
