"use client";
import { ChangeEvent, FC, useState } from "react";
import { Typography } from "@material-tailwind/react";
import Select from "../inputs/Select";

interface SelectOption {
  id: string;
  name: string;
}

interface SelectFieldProps {
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (value:any) => void;
  placeholder?: string;
}

const SelectField: FC<SelectFieldProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = "Select an option",
}) => {
  return (
    <div className="mb-1 flex flex-col gap-6">
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

      <div className="w-72">
        <Select 
          value={value}
          onChange={onChange}
          options={options}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default SelectField;
