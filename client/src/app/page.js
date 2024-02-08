"use client"
import Image from "next/image";
import { useSelector } from "react-redux";
import Header from "@/components/Header";
import Protected from "@/components/Protected";
import AddLink from "@/components/AddLink";
import { useEffect, useState } from "react";


export default function Page() {

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <Protected>
        <Header />
        <div>
          <AddLink />
        </div>
      </Protected>
    </>
  );
}
