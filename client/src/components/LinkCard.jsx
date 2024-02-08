"use client";
import Link from "next/link";
import Image from "next/image";
import { formateDate } from "@/lib/utils";
import { Button } from "./ui/button";
import { format } from "timeago.js";
import { useDeleteUrlMutation } from "@/redux/features/url/urlApi";
import { useEffect } from "react";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

export default function LinkCard({ link, refetch }) {
  const router = useRouter();
  const [deleteUrl, { isSuccess, isLoading, error, data }] =
    useDeleteUrlMutation({});
  const handleSubmit = async () => {
    await deleteUrl(link.shortId);
  };
  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success",
        description: data.message,
        className: "bg-green-400",
      });
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error;
        if (errorData.data?.message) {
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
    <div className="text-left">
      <div className="w-full h-auto shadow-md rounded-md">
        <div className="url-card">
          <div className="px-4 py-2">
            <p className="font-bold text-center">{link.urlName}</p>

            <p>
              Short URL:{" "}
              <a
                className="text-blue-500 line-clamp-1"
                href={`${process.env.NEXT_PUBLIC_SERVER_URI}${link.shortId}`}
              >{`${process.env.NEXT_PUBLIC_SERVER_URI}${link.shortId}`}</a>
            </p>
            <p>
              Original URL :{" "}
              <a className="text-blue-500 line-clamp-1" href={link.redirectURL}>
                {link.redirectURL}
              </a>
            </p>
            <p>Created At: {format(link.createdAt)}</p>
            <p>Updated At: {format(link.updatedAt)}</p>
            <p>Visited : {link.visitHistory.length}</p>
            <div className="flex justify-around py-2">
              <Link href={`/url/${link.shortId}`}>
                <Button className="hover:bg-slate-200" variant="outline">
                  Edit
                </Button>
              </Link>
              <Button
                onClick={handleSubmit}
                className="hover:bg-red-200"
                variant="destructive"
              >
                Delete
              </Button>
              <Link href={`/url/history/${link.shortId}`}>
                <Button className="bg-green-500 text-black hover:bg-green-200">
                  Visit History
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
