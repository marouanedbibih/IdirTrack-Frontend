import {
  AdjustmentsVerticalIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { CardHeader, Typography, Button, Card } from "@material-tailwind/react";
import { SearchSubscription } from "./SearchSubscription";
interface SubscriptionHeaderProps {}
export const SubscriptionHeader: React.FC<SubscriptionHeaderProps> = ({}) => {
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
        <div className="flex w-full shrink-0 gap-2 md:w-max justify-end flex-1">
          <SearchSubscription />
          <Button
            className="flex items-center gap-2"
            color="black"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            // onClick={handleOpenFilterForm}
          >
            Filter
            <AdjustmentsVerticalIcon strokeWidth={3} className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </CardHeader>
  );
};
