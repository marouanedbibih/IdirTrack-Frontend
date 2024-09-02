import { useStaffContext } from "../StaffProvider";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Input } from "@material-tailwind/react";
import { useSearchStaffs } from "../hooks/StaffHooks";
interface SearchStaffProps {}
export const SearchStaff: React.FC<
  SearchStaffProps
> = ({}: SearchStaffProps) => {
  // Basics states
  const { initPagination, setFetching, setSearch } = useSearchStaffs();

  // On search Functions
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    initPagination();
    if (e.target.value !== "") {
      setFetching({ normal: false, filter: false, search: true });
      setSearch(e.target.value);
    } else {
      setFetching({ normal: true, filter: false, search: false });
      setSearch("");
    }
  };

  return (
    <div className="w-full md:w-72">
      <Input
        label="Search"
        icon={<MagnifyingGlassIcon className="h-5 w-5" />}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        crossOrigin={undefined}
        onChange={onSearch}
      />
    </div>
  );
};
