import { Navbar } from "@mantine/core";

export default function LandingPageAuthorized() {
  return (
    <div>
      <Navbar />
      <div className="flex justify-between items-center font-bold text-2xl">
        <p>Mengubungkan BUMN 1 Pelabuhan</p>
        <p>
          Bersama <span className="text-primary1">Portaverse</span>
        </p>
      </div>
    </div>
  );
}
