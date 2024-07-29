import { CardFooter, Button, IconButton, Card } from "@material-tailwind/react";

export function FooterVehicleListe() {
  return (
    <Card className="h-full w-1/2" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
    <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      <Button variant="outlined" size="sm"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        Previous
      </Button>
      <div className="flex items-center gap-2">
        <IconButton variant="outlined" size="sm"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          1
        </IconButton>
        <IconButton variant="text" size="sm"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          2
        </IconButton>
        <IconButton variant="text" size="sm"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          3
        </IconButton>
        <IconButton variant="text" size="sm"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          ...
        </IconButton>
        <IconButton variant="text" size="sm"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          8
        </IconButton>
        <IconButton variant="text" size="sm"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          9
        </IconButton>
        <IconButton variant="text" size="sm"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          10
        </IconButton>
      </div>
      <Button variant="outlined" size="sm"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        Next
      </Button>
    </CardFooter>
    </Card>
  );
}
