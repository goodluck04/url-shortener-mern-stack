"use client";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

function Header() {
  const pathName = usePathname();

  const currentUser = useSelector((state) => state.auth);
  // console.log(userId)
  // console.log(user);
  return (
    <div className="h-16 w-full bg-orange-200 flex justify-between items-center px-6">
      <div className=" flex items-center justify-center">
        <h1 className=" font-bold text-sm sm:text-xl flex flex-wrap">
          <span className=" text-slate-500">Url</span>
          <span className=" text-blue-700">Shortener</span>
        </h1>
      </div>

      <div>
        <Link href="/">
          <Button
            className={` text-base lg:text-lg ${
              pathName === "/" ? "font-bold text-red-400" : ""
            }`}
            variant="link"
          >
            Home
          </Button>
        </Link>
        <Link href="/explore">
          <Button
            className={` text-base lg:text-lg ${
              pathName === "/explore" ? "font-bold text-red-400" : ""
            }`}
            variant="link"
          >
            Explore
          </Button>
        </Link>
        {currentUser === "authenticated" ? (
          <Link href="/profile">
            <Button
              className={` text-base lg:text-lg ${
                pathName === "/profile" ? "font-bold text-red-400" : ""
              }`}
              variant="link"
            >
              Dashboard
            </Button>
          </Link>
        ) : (
          <Link href="/login">
            <Button className="text-base lg:text-lg" variant="link">
              Login
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
