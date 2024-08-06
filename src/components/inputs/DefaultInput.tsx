import { Typography, Input } from "@material-tailwind/react";
import * as React from "react";

export interface IDefaultInputProps {
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  smallMessage: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DefaultInput: React.FC<IDefaultInputProps> = ({
  label,
  placeholder,
  value,
  error,
  smallMessage,
  onChange,
}) => {
  return (
    <div className="mb-2">
      {/* <Typography
        className={`mb-2 ${error ? "text-red-500" : ""}`}
        variant="h6"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {label}
      </Typography> */}
      <Input
      label={label}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        size="lg"
        error={Boolean(error)}
        className={` ${error ? "border-red-500 placeholder-red-500 " : ""}`}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        crossOrigin={undefined}
      />
      {error ? (
        <Typography
          variant="small"
          className="flex justify-start font-bold text-red-500 mt-2"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {error}
        </Typography>
      ) : (
        <Typography
          variant="small"
          className="flex justify-start font-bold text-blue-gray-500 mt-2"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {smallMessage}
        </Typography>
      )}
    </div>
  );
};
