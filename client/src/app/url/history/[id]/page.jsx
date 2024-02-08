"use client";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useGetUrlHistoryQuery } from "@/redux/features/url/urlApi";
import { useRouter } from "next/navigation";
import { format } from "timeago.js";

export default function Page({ params }) {
  const id = params?.id;

  const router = useRouter();

  const { data } = useGetUrlHistoryQuery(id, {});
  return (
    <div>
      <Header />
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <div className="font-bold text-3xl py-8">Visited History...</div>
        {data && data.visitHistory.length !== 0 && (
          <div>
            <div className="overflow-x-auto">
              <table className="table-auto border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2">Timestamp</th>
                    <th className="px-4 py-2">ID</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.visitHistory.length !== 0 &&
                    [...data.visitHistory].reverse().map((item) => (
                      <tr key={item._id} className="border-b border-gray-200">
                        <td className="px-4 py-2">{format(item.timestamp)}</td>
                        <td className="px-4 py-2">{item._id}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {data?.visitHistory?.length === 0 && (<h1>No Visitited History</h1>)}
      </div>
    </div>
  );
}
