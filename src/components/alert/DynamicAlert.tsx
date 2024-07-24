import React, { useEffect } from "react";
import { Alert, Button, Typography } from "@material-tailwind/react";
import { MessageType } from "@/types/Basics";

// Props interface for DynamicAlert
interface AlertProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type: MessageType;
}

// Icon component based on message type
function Icon({ type }: { type: MessageType }) {
  let iconPath = "";

  switch (type) {
    case MessageType.ERROR:
      iconPath =
        "M12 3v10.5M12 17h0M4.32 4.32a9 9 0 1112.96 12.96A9 9 0 014.32 4.32z";
      break;
    case MessageType.SUCCESS:
    default:
      iconPath =
        "M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z";
      break;
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
    >
      <path d={iconPath} />
    </svg>
  );
}

// DynamicAlert component
export function DynamicAlert({
  open,
  onClose,
  title,
  message,
  type,
}: AlertProps) {
  // Determine alert background color based on type
  const alertClassName =
    type === MessageType.ERROR ? "bg-red-500" : "bg-green-500";

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // Alert auto-hide after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  return (
    <>

      <Alert
        open={open}
        className={`fixed bottom-4 right-4 z-50 max-w-sm ${alertClassName} text-white p-4 rounded-lg shadow-lg w-2/12`}
        icon={<Icon type={type} />}
        onClose={onClose}
      >
        <Typography
          variant="h5"
          color="white"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {title}
        </Typography>
        <Typography
          color="white"
          className="mt-2 font-normal"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {message}
        </Typography>
      </Alert>
    </>
  );
}
