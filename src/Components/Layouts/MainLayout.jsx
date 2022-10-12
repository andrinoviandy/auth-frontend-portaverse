import { Outlet } from "react-router-dom";
import Footer from "../Footer";

export default function MainLayout() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div className="container mx-auto flex flex-col gap-2">
        {/* <nav className="p-5">
          <img
            src={PortaverseLogo}
            alt="company_logo"
            className="h-[100px] p-2"
          />
        </nav> */}

        <main className="scroll-smooth px-5 h-[calc(100vh-200px)] flex flex-col items-center justify-center pt-20">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}
