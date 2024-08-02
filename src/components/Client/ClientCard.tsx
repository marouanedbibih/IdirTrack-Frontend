"use client";
import * as React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Spinner,
} from "@material-tailwind/react";
import { useClientByIdContext } from "@/context/ClientByIdProvider";
import { getClientById } from "@/services/ClientService";
import {
  AtSymbolIcon,
  BuildingOfficeIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";
import { useParams } from "next/navigation";

export interface IClientCardProps {}

export default function ClientCard(props: IClientCardProps) {
  const params = useParams();
  const id: number = parseInt(params.id as string);
  // Client details state management
  const { clientDetails, setClientDetails } = useClientByIdContext();

  // Loading state management
  const [loading, setLoading] = React.useState<boolean>(false);

  // Fetch client details by ID
  const fetchClientDetailsbyId = (id: number) => {
    setLoading(true);
    getClientById(id)
      .then((data) => {
        setClientDetails(data.content);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log("Client details fetched");
        setLoading(false);
      });
  };

  React.useEffect(() => {
    fetchClientDetailsbyId(id);
  }, [id]);

  React.useEffect(() => {
    console.log("Client details", clientDetails);
  }, [clientDetails]);

  return (
    <Card
      className={`mt-6 w-2/5 ${
        loading ? "h-48 flex flex-1 justify-center items-center" : ""
      }`}
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
        <CardBody
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div className="w-full flex flex-1 justify-between items-center">
            <Typography
              variant="h4"
              color="blue-gray"
              className="mb-2"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {clientDetails?.name} - {clientDetails?.company}
            </Typography>
            <Typography
              variant="h6"
              className="mb-2"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {clientDetails?.createdAt}
            </Typography>
          </div>

          <div className="flex flex-col justify-center items-start gap-2">
            <div className="flex flex-row gap-2 justify-start items-center">
              <AtSymbolIcon className="h-4 w-4 text-black" />
              <Typography
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {clientDetails?.email}
              </Typography>
            </div>

            <div className="flex flex-row gap-2 justify-start items-center">
                
              <PhoneIcon className="h-4 w-4 text-black" />
              <Typography
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {clientDetails?.phone}
              </Typography>
            </div>

            <div className="flex flex-row gap-2 justify-start items-center">
              <BuildingOfficeIcon className="h-4 w-4 text-black" />
              <Typography
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {clientDetails?.address}
              </Typography>
            </div>
          </div>

          <Typography
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {clientDetails?.description}
          </Typography>
        </CardBody>
      )}
    </Card>
  );
}
