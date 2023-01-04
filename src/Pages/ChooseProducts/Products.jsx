export default function Products() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-row justify-evenly">
        <a
          href={import.meta.env.VITE_KMS_URL}
          className="m-10 bg-bg1 hover:bg-primary3 cursor-pointer p-[3.5rem] font-semibold text-3xl text-primary3 hover:text-white"
        >
          KMS
        </a>

        <a
          href={import.meta.env.VITE_LMS_URL}
          className="m-10 bg-bg1 hover:bg-primary3 cursor-pointer p-[3.5rem] font-semibold text-3xl text-primary3 hover:text-white"
        >
          LMS
        </a>

        <a
          href={import.meta.env.VITE_TMS_URL}
          className="m-10 bg-bg1 hover:bg-primary3 cursor-pointer p-[3.5rem] font-semibold text-3xl text-primary3 hover:text-white"
        >
          TMS
        </a>
      </div>
    </div>
  );
}
