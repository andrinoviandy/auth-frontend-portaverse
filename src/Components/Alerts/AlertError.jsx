import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import QuestionIcon from "../Assets/QuestionIcon";

// eslint-disable-next-line react/prop-types
function AlertError({ isError, setIsError }) {
  const buttonRef = useRef(null);
  const HandleAlert = () => {
    setIsError(false);
  };
  return (
    <Transition appear show={isError} as={Fragment}>
      <Dialog
        as="div"
        initialFocus={buttonRef}
        className="fixed inset-0 z-[9999] overflow-y-auto bg-gray-900/60"
        onClose={() => false}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 " />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle "
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block overflow-hidden text-center align-middle transition-all transform w-[552px] bg-white shadow-md rounded font-sans">
              <div className="grid px-8 pt-8 pb-3 gap-7">
                <div className="grid gap-8 justify-items-center">
                  <QuestionIcon />
                  <span className="font-medium text-xl">
                    Something wrong!
                  </span>
                </div>
                <div className="flex justify-center gap-3">
                  <button
                    type="button"
                    ref={buttonRef}
                    onClick={HandleAlert}
                    className="my-1.5"
                  >
                    <div className="rounded bg-primary1 text-bg2">
                      <h5 className="py-3 px-8 text-xs font-semibold">
                        Try again
                      </h5>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default AlertError;
