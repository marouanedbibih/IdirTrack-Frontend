import React from "react";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import {
  CardHeader,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import { useSimContext } from "@/sim/SimProvider";

interface SimTableHeaderProps {
  title: string;
  subtitle: string;
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDownload: () => void;
}

const SimTableHeader: React.FC<SimTableHeaderProps> = ({
  title,
  subtitle,
  onSearch,
  onDownload,
}) => {
  const { isCreateSimModalOpen, setIsCreateSimModalOpen } = useSimContext();

  // Hande create device modal open
  const handleCreateSimModalOpen = () => {
    setIsCreateSimModalOpen(true);
  };
  return (
    <CardHeader
      floated={false}
      shadow={false}
      className="rounded-none"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
        <div>
          <Typography
            variant="h5"
            color="blue-gray"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {title}
          </Typography>
          <Typography
            color="gray"
            className="mt-1 font-normal"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {subtitle}
          </Typography>
        </div>
        <div className="flex w-full shrink-0 gap-2 md:w-max">
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              onChange={onSearch}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
          <Button
            className="flex items-center gap-3"
            onClick={onDownload}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Download
          </Button>
          <Button
            className="flex items-center gap-3"
            onClick={handleCreateSimModalOpen}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            color="green"
          >
            <PlusIcon strokeWidth={2} className="h-4 w-4" /> New
          </Button>
        </div>
      </div>
    </CardHeader>
  );
};

export default SimTableHeader;
