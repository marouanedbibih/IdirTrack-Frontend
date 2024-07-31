import { Typography } from "@material-tailwind/react";
import React, { ChangeEvent } from "react";

interface DateFieldProps {
  date: string;
  onChange: (date: string) => void;
  className?: string;
  label: string;
  error?: string | null;
}

const DateField: React.FC<DateFieldProps> = ({
  date,
  onChange,
  className,
  label,
  error,
}) => {
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="mb-1 flex flex-col gap-4">
      <Typography
        variant="h6"
        color="blue-gray"
        className="-mb-3"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {label}
      </Typography>
      <div className="w-full relative">
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
          // className={`w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal text-left outline-none transition-all border-2 text-sm px-3 py-3 rounded-[7px] border-gray-900 ${className} `}
          className={`w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal text-left outline-none transition-all border-2 text-sm px-3 py-3 rounded-[7px] ${
            error ? "border-red-500 placeholder-red-500" : "border-gray-900"
          } ${className}`}
        />
      </div>
      {error && (
        <Typography
          variant="small"
          color="red"
          className="mt-1"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {error}
        </Typography>
      )}
    </div>
  );
};

export default DateField;
