"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  useLoginMutation,
  useSignupMutation,
} from "@/redux/features/auth/authApi";
import { toast } from "@/components/ui/use-toast";

export default function Register() {
  const router = useRouter();
  const [authState, setAuthState] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [signup, { data, error, isSuccess, isLoading: loading }] =
    useSignupMutation({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration successful";
      router.push(`/login?message=${data.message}`);
    }
    if (error) {
      if ("data" in error) {
        const errorData = error;
        if (errorData.data.errors) {
          setErrors(errorData.data.errors);
        } else if (errorData.data?.message) {
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

  const register = async () => {
    await signup(authState);
  };

  return (
    <div className="h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 ">
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
            <h1 className="text-3xl lg:text-5xl font-bold">Url Shortener</h1>
            <p>Explore the worlds best designs for your next project.</p>
            <div className="mt-4">
              <Label htmlFor="name">User Name</Label>
              <Input
                type="text"
                id="name"
                placeholder="Enter your name"
                onChange={(e) =>
                  setAuthState({ ...authState, username: e.target.value })
                }
              />
              <span className="text-red-700 font-bold">{errors?.username}</span>
            </div>
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
              <Label htmlFor="cpassword">Confirm Password</Label>
              <Input
                type="password"
                id="cpassword"
                placeholder="Confirm password"
                onChange={(e) =>
                  setAuthState({
                    ...authState,
                    password_confirmation: e.target.value,
                  })
                }
              />
            </div>
            <div className="mt-4">
              <Button
                variant="default"
                className="w-full"
                onClick={register}
                disabled={loading}
              >
                {loading ? "Processing" : "Register"}
              </Button>
            </div>
            <div className="mt-4 text-center">
              <strong>Already Have an account ?</strong>
              <Link href="/login" className="pl-2 text-orange-400">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
