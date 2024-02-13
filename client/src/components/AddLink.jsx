"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Clipboard, ClipboardCheck } from "lucide-react";
import { useGenerateUrlMutation } from "@/redux/features/url/urlApi";

export default function AddLink() {
  const { toast } = useToast();

  const [clear, setClear] = useState(false);
  const [errors, setErrors] = useState({});
  const [shortUrlState, setShortUrlState] = useState("");
  const [copied, setCopied] = useState(false);
  const [linkState, setLinkState] = useState({
    url: "",
    urlName: "",
  });
  const [generateUrl, { data, isLoading, isSuccess, error }] =
    useGenerateUrlMutation({});

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success",
        description: data.message,
        className: "bg-green-400",
      });
      setShortUrlState(process.env.NEXT_PUBLIC_SERVER_URI + data.id);
      setClear(true);
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

  const submitHandler = async () => {
    await generateUrl(linkState);
  };
  
  const clearFields = () => {
    setLinkState({ url: "", urlName: "" });
    setShortUrlState("");
    setClear(false);
  };

  return (
    <div className="flex flex-col mt-10  w-[80%]">
      <div className="w-full flex flex-col ml-20">
        <h1 className="text-center text-3xl p-4">Get Your Url Short </h1>
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
          <span className="text-red-400 font-bold">{errors?.urlName}</span>
        </div>
        {shortUrlState && (
          <div className="mt-4">
            <Label htmlFor="description">Copy Your Short Url</Label>
            <div className="flex gap-6">
              <Input
                className=" w-[80%]"
                readOnly
                type="text"
                id="title"
                value={shortUrlState}
              />
              {!copied && (
                <>
                  <Clipboard
                    value={shortUrlState}
                    onClick={() => {
                      navigator.clipboard.writeText(shortUrlState);
                      setCopied(true);
                      setTimeout(() => {
                        setCopied(false);
                      }, 2000);
                    }}
                    className="w-8 h-10 cursor-pointer"
                  />
                </>
              )}
              {copied && (
                <div className="flex items-center gap-1">
                  <ClipboardCheck className="w-8 h-10 cursor-pointer" />
                  <p>Link copied!</p>
                </div>
              )}
            </div>
          </div>
        )}
        {clear ? (
          <div className="mt-4 flex flex-col">
            <Button onClick={clearFields}>Reset Field</Button>
          </div>
        ) : (
          <div className="mt-4 flex flex-col">
            <Button onClick={submitHandler} disabled={isLoading}>
              {isLoading ? "Generating short Link" : "Generate Link"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
