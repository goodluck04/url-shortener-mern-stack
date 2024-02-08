
"use client"
import Header from "@/components/Header";
import Protected from "../../components/Protected";
import UserShrtLinksList from "@/components/UserLinksList";
import { useEffect, useState } from "react";

export default  function Page() {
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
        <>
          <Header />
          <div>
          </div>
          <div>
            <UserShrtLinksList />
          </div>
        </>
      </Protected>
    </>
  );
}
