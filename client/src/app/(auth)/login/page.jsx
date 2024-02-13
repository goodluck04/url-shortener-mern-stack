"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { toast } from "@/components/ui/use-toast";
import { useDispatch } from "react-redux";
import {  userLoggedIn2 } from "@/redux/features/auth/authSlice";

export default function Page() {
  const dispatch = useDispatch();
  const params = useSearchParams();
  const router = useRouter();
  const [authState, setAuthState] = useState({
    email: "",
    password: null,
  });

  const [login, { data, error, isSuccess, isLoading: loading }] =
    useLoginMutation({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isSuccess) {
      // console.log(data.rest)
      dispatch(userLoggedIn2({userId:data.rest._id,user:data.rest.username}))
      toast({
        title: "Success",
        description: data.message,
        className: "bg-green-400",
      });
      router.push("/");
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
  }, [isSuccess, error, data, router]);

  const submitHandler = async () => {
    await login(authState);
  };

  return (
    <div className="h-screen">
      <div className=" grid grid-cols-1 lg:grid-cols-2 ">
        <div className="hidden lg:block">
          <Image
            src="https://res.cloudinary.com/dkwacgwnd/image/upload/v1707229848/ykvjubwzah8zbqyswuci.jpg"
            width={800}
            height={800}
            alt="register logo"
            className="object-cover md:mt-20"
            unoptimized
          />
        </div>
        <div className="flex justify-center items-center mt-20 lg:mt-0">
          <div className="px-10 lg:px-32 w-full">
            {params.get("message") ? (
              <Alert
                variant="default"
                className="text-green-400 border-green-300"
              >
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>{params.get("message")}</AlertDescription>
              </Alert>
            ) : (
              <></>
            )}

            <h1 className="text-3xl lg:text-5xl font-bold">Url Shortener</h1>
            <p>Welcome Back! Make your url shorter!</p>
            <div className="mt-4">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
                onChange={(e) =>
                  setAuthState({ ...authState, email: e.target.value })
                }
              />
              <span className="text-red-700 font-bold">{errors?.email}</span>
            </div>
            <div className="mt-4">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter your password"
                onChange={(e) =>
                  setAuthState({ ...authState, password: e.target.value })
                }
              />
              <span className="text-red-700 font-bold">{errors?.password}</span>
            </div>
            <div className="mt-4">
              <Button
                variant="default"
                className="w-full bg-[#253237]"
                disabled={loading}
                onClick={submitHandler}
              >
                {loading ? "Processing" : "Login"}
              </Button>
            </div>
            <div className="mt-4 text-center">
              <strong>Don&apos;t Have an account ?</strong>
              <Link href="/register" className="pl-2 text-orange-400">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
