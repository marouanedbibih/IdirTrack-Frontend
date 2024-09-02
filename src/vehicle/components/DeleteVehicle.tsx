import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Spinner,
  Typography,
} from "@material-tailwind/react";

interface IDeleteVehicleProps {
  open: boolean;
  onClose: () => void;
  onDelete: (isLost:boolean) => void;
  loading: boolean;
}

export const DeleteVehicle: React.FC<IDeleteVehicleProps> = ({
  open,
  onClose,
  onDelete,
  loading,
}: IDeleteVehicleProps) => {



  return (
    <Dialog
      open={open}
      handler={onClose}
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      className="min-h-20"
    >
      {loading ? (
        <div className="flex justify-center items-center p-4 ">
          <Spinner
            className="h-8 w-8"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </div>
      ) : (
        <div>
          <DialogHeader
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Lost Vehicle
          </DialogHeader>
          <DialogBody
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Typography
              color="gray"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Are you sure you want to mark this vehicle as lost?
            </Typography>
          </DialogBody>
          <DialogFooter
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Button
              variant="text"
              color="red"
              onClick={onClose}
              className="mr-1"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <span>Cancel</span>
            </Button>
            <div className="flex flex-row gap-4">
              <Button
                variant="gradient"
                color="blue-gray"
                onClick={() => onDelete(false)}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <span>Not Lost</span>
              </Button>
              <Button
                variant="gradient"
                color="red"
                onClick={() => onDelete(true)}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <span>Lost</span>
              </Button>
            </div>
          </DialogFooter>
        </div>
      )}
    </Dialog>
  );
};
