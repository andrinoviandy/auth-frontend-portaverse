import { Dialog, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import { ActionIcon } from "@mantine/core";
import PropTypes from "prop-types";
import { Fragment } from "react";

export default function SectionModalTemplate({
  isOpen,
  handleClose,
  withCloseButton,
  withFooter,
  title,
  footerElement,
  children,
  height,
  width,
  classNames = {
    modal: "",
    body: "",
  },
  isNotOverflow = false,
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => true}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`w-[${width}] transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all ${classNames.modal}`}
              >
                <div className="flex items-center justify-between p-5 border-b">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-bold leading-6 text-gray-900 font-secondary"
                  >
                    {title}
                  </Dialog.Title>
                  {withCloseButton && (
                    <ActionIcon
                      onClick={handleClose}
                      variant="transparent"
                    >
                      <Icon
                        icon="bi:x"
                        className="text-darkGrey"
                        width={30}
                      />
                    </ActionIcon>
                  )}
                </div>
                <div
                  className={`max-h-[${height}] ${
                    !isNotOverflow
                      ? " overflow-y-auto scroll-smooth"
                      : ""
                  } ${classNames.body}`}
                >
                  {children}
                </div>
                {withFooter && (
                  <div className="w-full flex gap-3 justify-end bg-bg4 p-5 rounded-b-md border-t">
                    {footerElement}
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

SectionModalTemplate.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  withCloseButton: PropTypes.bool,
  withFooter: PropTypes.bool,
  title: PropTypes.string,
  footerElement: PropTypes.element,
  children: PropTypes.element,
  width: PropTypes.string,
  height: PropTypes.string,
  classNames: PropTypes.shape({
    modal: PropTypes.string,
    body: PropTypes.string,
  }),
};

SectionModalTemplate.defaultProps = {
  withCloseButton: false,
  withFooter: true,
  title: "",
  footerElement: <div />,
  children: <div />,
  width: "40vw",
  height: "30vh",
  classNames: {
    modal: "",
    body: "",
  },
};
