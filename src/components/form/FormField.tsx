import { FC, ChangeEvent } from "react";
import { Typography, Input } from "@material-tailwind/react";

interface FormFieldProps {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
  smallMessage?: string;
}

const FormField: FC<FormFieldProps> = ({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  error,
  smallMessage,
}) => {
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
      <Input
        type={type}
        size="lg"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`!border-t-blue-gray-200 focus:!border-science-blue-700"`}
        labelProps={{
          className: "before:content-none after:content-none",
        }}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        crossOrigin={undefined}
        error={error ? true : false}
      />
      {error ? (
        <Typography
          variant="small"
          className="flex justify-start font-bold text-red-500 "
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {error}
        </Typography>
      ) : (
        <Typography
          variant="small"
          className="flex justify-start font-bold text-blue-gray-500"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {
            // smallMessage
            smallMessage
          }
        </Typography>
      )}
    </div>
  );
};

export default FormField;
