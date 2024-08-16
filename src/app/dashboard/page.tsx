"use client";
import React, { useEffect } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { IAuth } from "@/auth/auth";
import { loginAPI } from "@/auth/AuthService";
import { useGlobalContext } from "@/context/GlobalProvider";

import { useRouter } from "next/navigation";

const Dashboard: React.FC = () => {


  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-blue-gray-50 w-full h-screen p-4 gap-4">

      <h1>
        Dashboard
      </h1>
    </div>
  );
};

export default Dashboard;
