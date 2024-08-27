import React from "react";
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
  UsersIcon,
  BuildingStorefrontIcon,
  TruckIcon,
  PowerIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

// Map of icon components
const icons = {
  PresentationChartBarIcon,
  UsersIcon,
  BuildingStorefrontIcon,
  TruckIcon,
  PowerIcon,
};

const menuItems = [
  {
    title: "Dashboard",
    icon: "PresentationChartBarIcon",
    path: "/dashboard",
  },
  {
    title: "Client",
    icon: "UsersIcon",
    path: "/client",
  },
  {
    title: "Manager",
    icon: "UsersIcon",
    path: "/manager",
  },
  {
    title: "Staff",
    icon: "UsersIcon",
    path: "/staff",
  },
  {
    title: "Sims",
    icon: "BuildingStorefrontIcon",
    path: "/sim",
  },
  {
    title: "Devices",
    icon: "BuildingStorefrontIcon",
    path: "/device",
  },
  {
    title: "Vehicles",
    icon: "TruckIcon",
    path: "/vehicle",
  },
  {
    title: "Boitiers",
    icon: "TruckIcon",
    path: "/boitier",
  },
  {
    title: "Log Out",
    icon: "PowerIcon",
    path: "/logout",
  },
];

export function DefaultSidebar() {
  const router = useRouter();

  const handleClick = (path: string) => {
    router.push(path);
  };

  // Group items by parent
  const groupedItems: Record<string, typeof menuItems> = menuItems.reduce((acc, item) => {
    if (item.parent) {
      if (!acc[item.parent]) acc[item.parent] = [];
      acc[item.parent].push(item);
    } else {
      acc[item.title] = [item];
    }
    return acc;
  }, {} as Record<string, typeof menuItems>);

  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Sidebar
        </Typography>
      </div>
      <List>
        {Object.entries(groupedItems).map(([key, items], index) =>
          items.length > 1 ? (
            <React.Fragment key={index}>
              <ListItem className="p-0">
                <ListItemPrefix>
                  {React.createElement(icons[items[0].icon], { className: "h-5 w-5" })}
                </ListItemPrefix>
                <Typography variant="h6" color="blue-gray" className="mr-auto">
                  {key}
                </Typography>
              </ListItem>
              {items.map((subItem, subIndex) => (
                <ListItem
                  key={subIndex}
                  onClick={() => handleClick(subItem.path)}
                  className="text-blue-gray-800 hover:bg-blue-gray-100"
                >
                  <ListItemPrefix>
                    <ChevronRightIcon className="h-4 w-4" />
                  </ListItemPrefix>
                  {subItem.title}
                </ListItem>
              ))}
            </React.Fragment>
          ) : (
            items.map((item, itemIndex) => (
              <ListItem
                key={itemIndex}
                onClick={() => handleClick(item.path)}
                className="text-blue-gray-800 hover:bg-blue-gray-100"
              >
                <ListItemPrefix>
                  {React.createElement(icons[item.icon], { className: "h-5 w-5" })}
                </ListItemPrefix>
                {item.title}
                {item.title === "Inbox" && (
                  <ListItemSuffix>
                    <Chip
                      value="14"
                      size="sm"
                      variant="ghost"
                      color="blue-gray"
                      className="rounded-full"
                    />
                  </ListItemSuffix>
                )}
              </ListItem>
            ))
          )
        )}
      </List>
    </Card>
  );
}
