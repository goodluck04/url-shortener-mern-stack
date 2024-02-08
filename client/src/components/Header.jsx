"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Signout from "./SignOutBtn";

function Header() {
  const pathName = usePathname();
  const { data: currentUser, isLoading } = useLoadUserQuery({});

  const user = useSelector((state) => state.auth.user);

  // use to avaoid hydration error
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="h-16 w-full bg-orange-200 flex justify-between items-center px-6">
      <div className=" flex items-center justify-center">
        <h1 className=" font-bold text-sm sm:text-xl flex flex-wrap">
          <span className=" text-slate-500">Url</span>
          <span className=" text-blue-700">Shortener</span>
        </h1>
      </div>
      <div className="flex">
        {currentUser !== undefined && (
          <div className="flex">
            <Link href="/">
              <Button
                className={` text-base lg:text-lg ${
                  pathName === "/" ? "font-bold text-red-500" : ""
                }`}
                variant="link"
              >
                Home
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                className={` text-base lg:text-lg ${
                  pathName === "/explore" ? "font-bold text-red-500" : ""
                }`}
                variant="link"
              >
                Dashboard
              </Button>
            </Link>
            <div
              className={` text-base lg:text-lg ${
                pathName === "/dashboard" ? "font-bold text-red-500" : ""
              }`}
              variant="link"
            >
              <Signout />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
