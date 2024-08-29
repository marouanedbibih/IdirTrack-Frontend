import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Spinner,
} from "@material-tailwind/react";

interface DeleteConfirmationDialogProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  loading: boolean;
  message: string;
  cancelText?: string;
  confirmText?: string;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  open,
  handleClose,
  handleConfirm,
  loading,
  message,
  cancelText = "Cancel",
  confirmText = "Confirm",
}) => {
  return (
    <Dialog
      open={open}
      handler={handleClose}
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <DialogHeader
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        Confirm Deletion
      </DialogHeader>
      <DialogBody
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {message}
      </DialogBody>
      {loading ? (
        <div className="flex justify-center items-center p-4">
          <Spinner
            className="h-8 w-8"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </div>
      ) : (
        <DialogFooter
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Button
            variant="text"
            color="red"
            onClick={handleClose}
            className="mr-1"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <span>{cancelText}</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={handleConfirm}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <span>{confirmText}</span>
          </Button>
        </DialogFooter>
      )}
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
