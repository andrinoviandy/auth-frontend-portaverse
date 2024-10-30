import { Icon } from "@iconify/react";
import { Button, Modal } from "@mantine/core";

export interface ConfirmationModalTemplateProps {
  isOpen: boolean;
  variant: "safe" | "warning" | "danger";
  message: string;
  subMessage?: string;
  withCancel?: boolean;
  withConfirm?: boolean;
  handleClose: () => void;
  handleConfirm?: () => void;
  labelCancel?: string;
  labelConfirm?: string;
  width: number | string;
  buttonWidth: number | string;
  icon?: string;
}

export default function ConfirmationModalTemplate({
  isOpen,
  variant = "safe",
  message = "Are you sure want to perform this action?",
  subMessage,
  withCancel = true,
  withConfirm = true,
  handleClose,
  handleConfirm,
  labelCancel = "Tidak",
  labelConfirm = "Ya",
  width = "22vw",
  buttonWidth,

  /** Iconify's icon identifier. */
  icon,
}: ConfirmationModalTemplateProps) {
  const variantProps = {
    safe: {
      icon: "ic:round-check-circle",
      mantineColor: "primary",
      colorPrimary: "#016DB2",
      colorSecondary: "#93E2F7",
    },
    warning: {
      icon: "mingcute:warning-fill",
      mantineColor: "primary",
      colorPrimary: "#F5BB5C",
      colorSecondary: "#FBE7C5",
    },
    danger: {
      icon: "ic:round-warning",
      mantineColor: "red",
      colorPrimary: "#CB3A31",
      colorSecondary: "#FFDDDD",
    },
  };

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
      classNames={{ header: "hidden", body: "p-6" }}
      zIndex={50}
    >
      <div className="grid justify-items-center gap-4">
        {/* ICON */}
        <div
          className="flex size-28 items-center justify-center rounded-full"
          style={{
            background: variantProps[variant].colorSecondary,
          }}
        >
          <Icon
            icon={icon || variantProps[variant].icon}
            width={70}
            color={variantProps[variant].colorPrimary}
          />
        </div>
        {/* ICON */}

        <div
          className="mb-5 flex flex-col gap-2 text-center"
          style={{ width: `calc(${width}-2rem)` }}
        >
          <span className="text-xl font-bold">{message}</span>
          <span className="text-sm ">{subMessage}</span>
        </div>
      </div>
      <div className="flex justify-center gap-3">
        {withCancel && (
          <Button
            color={variantProps[variant].mantineColor}
            variant="outline"
            onClick={handleClose}
            style={{ width: buttonWidth || "auto" }}
          >
            {labelCancel}
          </Button>
        )}
        {withConfirm && (
          <Button
            color={variantProps[variant].mantineColor}
            onClick={handleConfirm}
            variant="filled"
            style={{ width: buttonWidth || "auto" }}
          >
            {labelConfirm}
          </Button>
        )}
      </div>
    </Modal>
  );
}
