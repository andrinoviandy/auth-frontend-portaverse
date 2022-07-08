import { Outlet } from "react-router-dom";
import Logo from "../Assets/Icon/Logo";
import Footer from "../Footer";

export default function MainLayout() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div className="container mx-auto flex flex-col gap-2">
        <nav className="p-5">
          <Logo />
        </nav>

        <main className="scroll-smooth px-5">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}
