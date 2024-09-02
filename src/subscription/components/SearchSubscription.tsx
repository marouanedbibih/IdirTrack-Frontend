import { Input } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchForSubscriptions } from "../hooks/useFetchSubscription";

interface SearchSubscriptionProps {}
export const SearchSubscription: React.FC<SearchSubscriptionProps> = ({}) => {
  // Search subscription Hooks
  const { setSearchKeyword, setFetching, initPagination } =
    useSearchForSubscriptions();

  // On search subscription
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    initPagination();
    if (e.target.value !== "") {
      setFetching({ normal: false, filter: false, search: true });
      setSearchKeyword(e.target.value);
    } else {
      setFetching({ normal: true, filter: false, search: false });
      setSearchKeyword("");
    }
  };

  return (
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
  );
};
