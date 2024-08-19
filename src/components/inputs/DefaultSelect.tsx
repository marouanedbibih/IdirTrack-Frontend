import React from "react";
import { Select, Option, Typography } from "@material-tailwind/react";

interface DefaultSelectProps {
  label: string;
  value: string | undefined;
  onChange: (value: string) => void;
  options: { id: number | string; name: string }[];
  loading: boolean;
  error?: string;
  smallMessage?: string;
  className?: string;
  menuClassName?: string;
}

const DefaultSelect: React.FC<DefaultSelectProps> = ({
  label,
  value,
  onChange,
  options,
  loading,
  error,
  smallMessage,
  className,
  menuClassName,
}) => {
  return (
    <div className={`${className} w-full`}>
      <Select
        label={label}
        value={value}
        onChange={(val) => onChange(val || "")}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        error={error ? true : false}
        menuProps={{ className: menuClassName }}
      >
        {loading ? (
          <Option value="0">Loading...</Option>
        ) : (
          options.map((option) => (
            <Option key={option.id} value={option.id.toString()}>
              {option.name}
            </Option>
          ))
        )}
      </Select>
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

export default DefaultSelect;
