"use client";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import exp from "constants";
import FormField from "../form/FormField";
import SelectField from "../form/SelectField";
// import { useVehicleContext } from "@/contexts/VehicleProvider";
import { ChangeEvent } from "react";


const formFields = [
  {
    type: 'text',
    label: 'Matricule',
    placeholder: 'Enter matricule',
    name: 'matricule',
  },
  {
    type: 'select',
    label: 'Client',
    name: 'client',
    options: [
      'Client 1',
      'Client 2',
      'Client 3',
    ],
  },
  {
    type: 'select',
    label: 'Vehicle Type',
    name: 'vehicleType',
    options: [
      'Type 1',
      'Type 2',
      'Type 3',
    ],
  },
];
function VehicleForm() {

  // const {vehicleFormData} = useVehicleContext();
  return (
    <Card
      color="white"
      shadow={false}
      className="w-1/2 rounded-xl p-4 flex flex-col"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}    >
      <form className="w-full">
        <div className="mb-1 flex flex-col gap-6">
          {formFields.map((field, index) => {
            if (field.type === 'text') {
              return (
                <FormField
                  key={index}
                  label={field.label} placeholder={""} value={""} onChange={function (event: ChangeEvent<HTMLInputElement>): void {
                    throw new Error("Function not implemented.");
                  } }                  // placeholder={field.placeholder}
                  // value={formData[field.name]}
                  // onChange={handleChange}
                />
              );
            } else if (field.type === 'select') {
              return (
                <SelectField
                  key={index}
                  label={field.label}
                  options={field.options}
                  // value={formData[field.name]}
                  // onChange={(value) => handleSelectChange(field.name, value)}
                />
              );
            }
            return null;
          })}
        </div>
        <Button className="mt-6" fullWidth color="green"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          Submit
        </Button>
      </form>
    </Card>
  );
}

export default VehicleForm;
