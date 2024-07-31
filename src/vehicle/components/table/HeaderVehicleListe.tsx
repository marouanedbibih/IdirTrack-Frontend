import { PlusIcon, ArrowDownTrayIcon, MagnifyingGlassIcon, AdjustmentsVerticalIcon } from "@heroicons/react/24/outline";
import { CardHeader, Typography, Button, Input, Chip, Card } from "@material-tailwind/react";

export function HeaderVehicleListe() {
  return (
    <Card className="h-full w-full"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      <CardHeader floated={false} shadow={false} className="rounded-none"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              Vehicle: 2089
            </Typography>
            <Typography color="gray" className="mt-1 font-normal"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              Vehicle Management Table
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max justify-end">
            <Button size="sm" className="flex items-center gap-2 bg-green-500 text-white hover:bg-green-600" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <PlusIcon className="h-5 w-5" /> Add New
            </Button>
            <Button size="sm" className="flex items-center gap-2 bg-science-blue-600 text-white hover:bg-science-blue-700"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <ArrowDownTrayIcon className="h-5 w-5" /> Export
            </Button>
          </div>
        </div>
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div className="flex w-full shrink-0 gap-2 md:w-max">
          <Button
              color="gray"
              variant="outlined"
              className="flex items-center gap-1 md:max-w-fit w-full" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}              >
                filter
                <AdjustmentsVerticalIcon className="w-4 h-4 text-gray-900" />
              </Button>
          </div>
          <div className="flex w-full md:w-max justify-end">
            <div className="w-1/3 md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined}              />
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
