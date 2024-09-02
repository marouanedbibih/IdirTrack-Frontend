"use client";
import { usePathname, useRouter } from "next/navigation";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  UserIcon,
  InboxIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
  DevicePhoneMobileIcon,
  TagIcon,
  TruckIcon,
  TicketIcon,
  IdentificationIcon,
  UserGroupIcon
} from "@heroicons/react/24/solid";

interface SideBarProps {}

const menuItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: PresentationChartBarIcon,
  },
  {
    title: "Admin",
    path: "/admin",
    icon: UserIcon,
  },
  {
    title: "Manager",
    path: "/manager",
    icon: UserCircleIcon, // Change the icon as needed
  },
  {
    title: "Client",
    path: "/client",
    icon: UserGroupIcon,
  },
  {
    title: "Staffs",
    path: "/staff",
    icon: IdentificationIcon,
  },
  {
    title: "Device",
    path: "/device",
    icon: DevicePhoneMobileIcon,
  },
  {
    title: "Sim",
    path: "/sim",
    icon: TagIcon,
  },
  {
    title: "Vehicle",
    path: "/vehicle",
    icon: TruckIcon,
  },
  {
    title: "Subscription",
    path: "/subscription",
    icon: TicketIcon,
  },
];

export const SideBar: React.FC<SideBarProps> = () => {
  const pathname = usePathname() || ""; // Use usePathname from next/navigation

  const router = useRouter();

  return (
    <Card
      className="fixed h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 bg-[#06367E]"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <div className="mb-2 p-4">
        <Typography
          variant="h5"
          color="blue-gray"
          className="text-white"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          IDIRTRACK
        </Typography>
      </div>
      <List
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {menuItems.map((item) => (
          <ListItem
            key={item.title}
            color={pathname.startsWith(item.path) ? "blue" : "white"}
            className={`text-white ${
              pathname.startsWith(item.path)
                ? "bg-blue-gray-50/80 text-black"
                : ""
            }`}
            onClick={() => router.push(item.path)}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <ListItemPrefix
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <item.icon
                className="h-5 w-5"
                color={pathname.startsWith(item.path) ? "black" : "white"}
              />
            </ListItemPrefix>
            {item.title}
          </ListItem>
        ))}
      </List>
    </Card>
  );
};
