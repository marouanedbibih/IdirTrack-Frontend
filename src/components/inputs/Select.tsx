import React from "react";

interface SelectOption {
  id: string;
  name: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder: string;
}

const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  placeholder,
}) => {
  const handleSelectChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(ev.target.value);
  };

  return (
    <select
      value={value}
      onChange={handleSelectChange}
      className="mb-4 outline-none bg-white w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-base transition duration-300 focus:border-gray-600"
    >
      <option value="" disabled selected>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default Select;
