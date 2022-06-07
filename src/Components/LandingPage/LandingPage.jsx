import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      <div className="flex flex-col justify-between h-[94vh]">
        <div>
          <div className="text-center pt-[8rem]">
            <h2 className="font-semibold text-4xl text-text1">
              Welcome to
            </h2>
            <h1 className=" font-semibold text-5xl pt-2 text-primary1">
              SMART SYSTEM
            </h1>
            <div className=" flex-row justify-center m-auto  max-w-[450px] pt-[1.5rem]">
              <h4 className="font-sans text-lg justify-center text-darkGrey ">
                Increase productivity through a clear understanding of
                strategic activities and ease of access to your most
                crucial knowledge.
              </h4>
            </div>

            <div className="mt-[3rem]">
              <Link
                to="login"
                className="px-[8rem] rounded-sm py-1 text-white font-sans bg-primary1"
                type="button"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>

        {/* <div>
          <Footer />
        </div> */}
      </div>
    </div>
  );
}

export default LandingPage;
