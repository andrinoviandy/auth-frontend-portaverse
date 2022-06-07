import { Outlet } from "react-router-dom";
import Logo from "../Assets/Icon/Logo";

export default function MainLayout() {
  return (
    <>
      <nav className="top-0 bg-white h-14 pt-4 sm:px-10 md:pl-36 md:pr-20 font-semibold text-primary1 text-xl mt-2">
        <Logo />
      </nav>

      <main className="flex min-h-screen bg-bg1 scroll-smooth text-text1 overflow-x-hidden">
        <Outlet />
      </main>

      <footer>
        <h5 className=" text-center text-grey pb-[2rem]">
          Powered by KMPlus Consulting 2022
        </h5>
      </footer>
    </>
  );
}
