import { db } from "@/db";
import Link from "next/link";

export default async function Home() {
  const sites = await db.site.findMany();

  const renderedSites = sites.map((site) => {
    return (
      <div
        // className="flex justify-between items-center p-2 border rounded"
        className="flex justify-between items-center p-4 bg-gray-50 shadow"
        key={site.id}
      >
        <div>{site.site_name}</div>
        <Link
          className="font-semibold hover:text-blue-600"
          href={`/sites/${site.id}`}
        >
          View
        </Link>
      </div>
    );
  });

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-x-4 flex-col">
          <h1 className="text-2xl font-bold">Sites</h1>
          <p className="text-gray-500 font-semibold text-xs">
            <span>{sites.length}</span> sites
          </p>
        </div>
        <Link
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-[14px] px-5 py-2.5"
          href="/sites/new"
        >
          New
        </Link>
      </div>
      <div className="flex flex-col gap-y-4">{renderedSites}</div>
    </div>
  );
}
