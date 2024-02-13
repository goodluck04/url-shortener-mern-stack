"use client";
import React, { useEffect, useState } from "react";

import { redirect, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import {
  useEditUrlMutation,
  useGetLinkQuery,
} from "@/redux/features/url/urlApi";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Protected from "@/components/Protected";

export default function AddLink({ params }) {
  const linkId = params?.id;
  const router = useRouter();
  const { toast } = useToast();
  const [errors, setErrors] = useState({});
  const [linkState, setLinkState] = useState({
    url: "",
    urlName: "",
  });

  const { data: linkData, isSuccess: linkDataSuccess } = useGetLinkQuery(
    linkId,
    {}
  );
  const [editUrl, { data, isLoading, isSuccess, error }] = useEditUrlMutation(
    {}
  );

  useEffect(() => {
    if (linkDataSuccess) {
      setLinkState({
        url: linkData.redirectURL,
        urlName: linkData.urlName,
      });
    }
    if (isSuccess) {
      toast({
        title: "Success",
        description: data.message,
        className: "bg-green-400",
      });
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
  }, [isSuccess, error, data, linkDataSuccess]);

  const submitHandler = async () => {
    const id = linkId;
    const userId = linkData.userId;
    const url = linkState.url;
    const urlName = linkState.urlName;

    await editUrl({ id, userId, url, urlName });
    router.push("/dashboard");
  };

  return (
    <>
      <Protected>
        <>
          <Header />
          <div className="flex flex-col mt-10  w-[80%]">
            <div className="w-full flex flex-col ml-20">
              <h1 className="">Get Your Url Short </h1>
              <div className="mt-4">
                <Label htmlFor="title">Your Long Url</Label>
                <Input
                  type="text"
                  id="url"
                  placeholder="http://example.com"
                  value={linkState.url}
                  onChange={(e) =>
                    setLinkState({ ...linkState, url: e.target.value })
                  }
                />
                <span className="text-red-400 font-bold">{errors?.url}</span>
              </div>
              <div className="mt-4">
                <Label htmlFor="title">Enter Url Name (Optional)</Label>
                <Input
                  type="text"
                  id="urlName"
                  placeholder="Ex - google meet"
                  value={linkState.urlName}
                  onChange={(e) =>
                    setLinkState({ ...linkState, urlName: e.target.value })
                  }
                />
                <span className="text-red-400 font-bold">
                  {errors?.urlName}
                </span>
              </div>
              {
                <div className="mt-4 flex flex-col">
                  <Button onClick={submitHandler} disabled={isLoading}>
                    {isLoading ? "Updating Link" : "Updated Link"}
                  </Button>
                </div>
              }
            </div>
          </div>
        </>
      </Protected>
    </>
  );
}
