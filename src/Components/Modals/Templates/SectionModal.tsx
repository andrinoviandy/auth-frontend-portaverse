import { Icon } from "@iconify/react";
import { ActionIcon, Modal, Title } from "@mantine/core";
import { ReactNode } from "react";

import cn from "../../../Utils/Helpers/cn";

interface SectionModalTemplateProps {
  isOpen: boolean;
  handleClose: () => void;
  withCloseButton?: boolean;
  withFooter?: boolean;
  title: string;
  footerElement?: ReactNode;
  children: ReactNode;
  height?: number | string;
  width?: number | string;
  zIndex?: number;
  classNames?: {
    modal?: string;
    body?: string;
    footer?: string;
  };
}

export default function SectionModalTemplate({
  isOpen,
  handleClose,
  withCloseButton = true,
  withFooter = true,
  title,
  footerElement,
  children,
  height = "30vh",
  width = "40vw",
  zIndex = 50,
  classNames = {
    modal: "",
    body: "",
    footer: "",
  },
}: SectionModalTemplateProps) {
  return (
    <Modal
      opened={isOpen}
      onClose={handleClose}
      size={width}
      centered
      padding={0}
      overlayProps={{ opacity: 0.1 }}
      transitionProps={{ duration: 300 }}
      radius="md"
      removeScrollProps={{ noIsolation: true }}
      classNames={{
        header: "hidden",
        content: classNames.modal,
      }}
      zIndex={zIndex}
      closeOnClickOutside={false}
    >
      <div className="flex items-center justify-between border-b px-5 py-3">
        <Title order={6} ff="text">
          {title}
        </Title>
        {withCloseButton && (
          <ActionIcon onClick={handleClose} variant="transparent">
            <Icon icon="bi:x" className="text-darkGrey" width={30} />
          </ActionIcon>
        )}
      </div>

      <div
        style={{ maxHeight: height }}
        className={cn(
          "scroll-style-3 overflow-y-auto scroll-smooth",
          classNames.body,
        )}
      >
        {children}
      </div>
      {withFooter && (
        <div
          className={cn(
            "flex w-full justify-end gap-3 rounded-b-md border-t bg-bg4 p-5",
            classNames.footer,
          )}
        >
          {footerElement}
        </div>
      )}
    </Modal>
  );
}
