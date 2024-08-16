import * as React from "react";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import { useManagerContext } from "../ManagerProvider";
import { searchManagersAPI } from "../ManagerServices";
export interface IManagerHeaderProps {}

export default function ManagerHeader(props: IManagerHeaderProps) {
  // Manager list state management
  const { setManagerList } = useManagerContext();

  // Pagination state management
  const { setPagination } = useManagerContext();

  // Search state management
  const { search, setSearch } = useManagerContext();

  // Loading state management
  const { tableLoading, setTableLoading } = useManagerContext();

  // Handel open form
  const { handleOpenForm } = useManagerContext();

  /**
   * Fetch the searched Manager list
   * This function is used to fetch the Manager list based on the search value, from the service and update the state
   * of the Manager list, the pagination and the loading state
   * @param search The value to search for
   * @param page The page number
   * @param size The size of the page
   * @returns void
   */
  const fetchSearchedManagerList = (
    search: string,
    page: number,
    size: number
  ) => {
    setTableLoading(true);
    searchManagersAPI(search, page, size)
      .then((data) => {
        setManagerList(data.content);
        setPagination({
          currentPage: data.metadata?.currentPage ?? 1,
          totalPages: data.metadata?.totalPages ?? 1,
          size: data.metadata?.size ?? 5,
          totalElements: data.metadata?.totalElements ?? 0,
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTableLoading(false);
      });
  };

  return (
    <Card
      className="h-full w-full"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
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
              Total Managers: 20
            </Typography>
            <Typography
              color="gray"
              className="mt-1 font-normal"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              This is a list of all Managers in the system
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
                onChange={(e) => {
                  fetchSearchedManagerList(e.target.value, 1, 5);
                }}
              />
            </div>
            <Button
              className="flex items-center gap-3"
              size="sm"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              color="green"
              onClick={handleOpenForm}
            >
              <PlusCircleIcon strokeWidth={2} className="h-4 w-4" /> New Manager
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
