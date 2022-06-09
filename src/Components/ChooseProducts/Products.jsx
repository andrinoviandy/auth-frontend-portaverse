export default function Products() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-row justify-evenly">
        <div className="m-10 bg-bg1 hover:bg-primary1 cursor-pointer">
          <button
            type="button"
            onClick={() => {
              window.location.href = import.meta.env.VITE_KMS_URL;
            }}
          >
            <h1 className="p-[3.5rem] font-semibold text-3xl text-primary1 hover:text-white">
              KMS
            </h1>
          </button>
        </div>

        <div className="m-10 bg-bg1 hover:bg-primary1 cursor-pointer">
          <button
            type="button"
            onClick={() => {
              window.location.href = import.meta.env.VITE_LMS_URL;
            }}
          >
            <h1 className="p-[3.5rem] font-semibold text-3xl text-primary1 hover:text-white">
              LMS
            </h1>
          </button>
        </div>

        <div className="m-10 bg-bg1 hover:bg-primary1 cursor-pointer">
          <button
            type="button"
            onClick={() => {
              window.location.href = import.meta.env.VITE_TMS_URL;
            }}
          >
            <h1 className="p-[3.5rem] font-semibold text-3xl text-primary1 hover:text-white">
              TMS
            </h1>
          </button>
        </div>
      </div>
    </div>
  );
}
