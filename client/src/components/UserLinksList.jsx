"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import LinkCard from "@/components/LinkCard";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useGetUsersAllUrlsQuery } from "@/redux/features/url/urlApi";



export default function UserShrtLinksList() {
  const {data:userData} = useLoadUserQuery({})
  const {data,refetch} = useGetUsersAllUrlsQuery(userData.id,{refetchOnMountOrArgChange:true});


  return (
    <div>
      <div className=" container mt-5">
        <div className=" text-center">
          <h1 className=" text-3xl">Hello , {userData.username}</h1>
          <div className="mt-5 flex justify-center items-center"></div>
          <div className="flex justify-center items-center mt-10">
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-16">
              {data && data.length !== 0 ? (
                data.map((link) => <LinkCard key={link.id} link={link} refetch={refetch} />)
              ) : (
                <div>
                  <h1>No Link Found</h1>
                  <h1>Create Your First Link</h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
