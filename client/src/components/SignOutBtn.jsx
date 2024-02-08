"use client";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useLogoutQuery } from "@/redux/features/auth/authApi";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";


export default function Signout() {
  const router = useRouter();
  const [logout, setLogOut] = useState(false);
  const { isSuccess, error, data,  } = useLogoutQuery(undefined, {
    skip: !logout ? true : false
  });

  const submitHandler = () => {
    setLogOut(true);
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success",
        description: data.message,
        className: "bg-green-400",
      });
      router.push("/login");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error;
        if (errorData.data.errors) {
          setErrors(errorData.data.errors);
        } else if (errorData.data?.message) {
          setErrors({});
          toast({
            title: "Error",
            description: errorData.data.message,
            className: "bg-red-400",
          });
        }
      } else {
        console.log("an Error occured", error);
      }
    }
  }, [isSuccess, error, data]);

  return (
    <div className="ml-4">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" className="hover:bg-red-800">
            Sign Out
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Your session will expire and you have to login again to access
              Access your Links.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={submitHandler}>
              Yes Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
