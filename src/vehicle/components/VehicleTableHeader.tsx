import {
  PlusIcon,
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
} from "@heroicons/react/24/outline";
import {
  CardHeader,
  Typography,
  Button,
  Input,
  Chip,
  Card,
  Spinner,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import React from "react";
// Assuming you have an IVehicleTableProps interface, for example:
interface IVehicleTableHeaderProps {
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
  total: number;
}

// Updated component
export const VehicleTableHeader: React.FC<IVehicleTableHeaderProps> = ({
  onSearch,
  searchTerm,
  total,
}) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const onCreatePage = () => {
    setLoading(true);
    router.push("/vehicle/create");
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  };

  return (
    <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
      <div>
        <Typography
          variant="h5"
          color="blue-gray"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Vehicle: {total}
        </Typography>
        <Typography
          color="gray"
          className="mt-1 font-normal"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Vehicle Management Table
        </Typography>
      </div>

      <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
        <div className="flex w-full shrink-0 gap-2 md:w-max">
          <Button
            color="gray"
            variant="outlined"
            className="flex items-center gap-1 md:max-w-fit w-full"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            filter
            <AdjustmentsVerticalIcon className="w-4 h-4 text-gray-900" />
          </Button>
        </div>
        <div className="flex w-full md:w-max justify-end">
          <div className="w-1/3 md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              value={searchTerm}
              onChange={onSearch}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
        </div>
        <div className="flex w-full shrink-0 gap-2 md:w-max justify-end">
          <Button
            size="sm"
            className="flex items-center gap-2 bg-green-500 text-white hover:bg-green-600"
            onClick={onCreatePage}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {loading ? (
              <Spinner
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
            ) : (
              <>
                <PlusIcon className="h-5 w-5" /> Add New
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
