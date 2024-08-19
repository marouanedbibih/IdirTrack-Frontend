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

const Login: React.FC = () => {
  // Auth request local state
  const [authRequest, setAuthRequest] = React.useState<IAuth>({
    username: "",
    password: "",
  });

  // Token state provider context
  const { token, setTokenInLocalStorage, getTokenFromLocalStorage } =
    useGlobalContext();
  // Role state provider context
  const { role, setRoleInLocalStorage, getRoleFromLocalStorage } =
    useGlobalContext();

  // Next.js router for navigation
  const router = useRouter();

  // Check for token and role on component mount
  useEffect(() => {
    const storedToken = getTokenFromLocalStorage();
    const storedRole = getRoleFromLocalStorage();
    if (storedToken && storedRole) {
      // Redirect to dashboard if token and role exist
      router.push("/dashboard");
    }
  }, [router, getTokenFromLocalStorage, getRoleFromLocalStorage]);

  /**
   * Handle login function
   */

  const handleLogin = async () => {
    loginAPI(authRequest)
      .then((res) => {
        console.log(res);
        // Set token and role in localStorage
        setTokenInLocalStorage(res.content.token);
        setRoleInLocalStorage(res.content.role);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("finally");
      });
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-blue-gray-50 w-full h-screen p-4 gap-4">
      <Card
        className="p-4 "
        shadow={false}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Typography
          variant="h4"
          color="blue-gray"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Login
        </Typography>
        <Typography
          color="gray"
          className="mt-1 font-normal"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Nice to meet you! Enter your details to Login.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography
              variant="h6"
              color="blue-gray"
              className="-mb-3"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Username
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
              onChange={(e) =>
                setAuthRequest({
                  ...authRequest,
                  username: e.target.value,
                })
              }
            />
            <Typography
              variant="h6"
              color="blue-gray"
              className="-mb-3"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
              onChange={(e) =>
                setAuthRequest({
                  ...authRequest,
                  password: e.target.value,
                })
              }
            />
          </div>

          <Button
            className="mt-6"
            fullWidth
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            onClick={handleLogin}
          >
            login
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
