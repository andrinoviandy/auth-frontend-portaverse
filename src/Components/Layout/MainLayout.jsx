import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Logo from "../Assets/Icon/Logo";
import Footer from "../Footer";

export default function MainLayout() {
  const [url, setUrl] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    const uri = pathname.split("/")[1];
    setUrl(uri);
  });

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

      <Footer url={url} />
    </div>
  );
}
