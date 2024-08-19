"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  BuildingStorefrontIcon,
  TruckIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const menuItems = [
  {
    title: "Dashboard",
    icon: PresentationChartBarIcon,
    items: [
      { title: "Analytics", path: "/analytics" },
      { title: "Reporting", path: "/reporting" },
      { title: "Projects", path: "/projects" },
    ],
  },
  {
    title: "Users",
    icon: UsersIcon,
    items: [
      { title: "Client", path: "/client" },
      { title: "Manager", path: "/manager" },
      { title: "Staff", path: "/staff" },
    ],
  },
  {
    title: "Stock",
    icon: BuildingStorefrontIcon,
    items: [
      { title: "Sims", path: "/sim" },
      { title: "Devices", path: "/device" },
    ],
  },
  {
    title: "Vehicles",
    icon: TruckIcon,
    items: [
      { title: "Vehicles", path: "/vehicle" },
      { title: "Boitiers", path: "/boitier" },
    ],
  },

  { title: "Log Out", icon: PowerIcon, path: "/logout" },
];

export function SidebarWithContentSeparator() {
  const [open, setOpen] = React.useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const handleOpen = (value: any) => {
    setOpen(open === value ? 0 : value);
  };

  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleClick = (path) => {
    if (isMounted) {
      router.push(path);
    }
  };

  {
    // bg-[#06367E] text-white
  }

  return (
    <Card
      className="fixed top-5 left-5 h-[calc(100vh-2rem)] w-1/2 max-w-[20rem] p-4 shadow-xl shadow-white-900/5 bg-[#06367E]"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <div className="mb-2 p-4">
        <Typography variant="h5" color="white">
          Sidebar
        </Typography>
      </div>
      <List>
        {menuItems.map((item, index) =>
          item.items ? (
            <Accordion
              key={index + 1}
              open={open === index + 1}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === index + 1 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === index + 1}>
                <AccordionHeader
                  onClick={() => handleOpen(index + 1)}
                  className="border-b-0 p-3 bg-transparent"
                >
                  <ListItemPrefix>
                    <item.icon className="h-5 w-5 text-white" />
                  </ListItemPrefix>
                  <Typography color="white" className="mr-auto font-normal">
                    {item.title}
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1 bg-[#06367E]">
                <List className="p-0">
                  {item.items.map((subItem, subIndex) => (
                    <ListItem
                      key={subIndex + 1}
                      onClick={() => handleClick(subItem.path)}
                      className="text-white hover:bg-white hover:bg-opacity-20 hover:text-white"
                    >
                      <ListItemPrefix>
                        <ChevronRightIcon
                          strokeWidth={3}
                          className="h-3 w-5 text-white"
                        />
                      </ListItemPrefix>
                      {subItem.title}
                    </ListItem>
                  ))}
                </List>
              </AccordionBody>
            </Accordion>
          ) : (
            <ListItem
              key={index + 1}
              onClick={() => handleClick(item.path)}
              className="text-white hover:bg-blue-gray-700"
            >
              <ListItemPrefix>
                <item.icon className="h-5 w-5 text-white" />
              </ListItemPrefix>
              {item.title}
              {item.badge && (
                <ListItemSuffix>
                  <Chip
                    value={item.badge}
                    size="sm"
                    variant="ghost"
                    color="white"
                    className="rounded-full"
                  />
                </ListItemSuffix>
              )}
            </ListItem>
          )
        )}
      </List>
    </Card>
  );
}
