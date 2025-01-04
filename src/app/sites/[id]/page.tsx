import { notFound } from "next/navigation";
import { db } from "@/db";
import Link from "next/link";
import * as actions from "@/actions";
import { SitePDFURL } from "@/components/SitePDFURL";

interface SiteShowPageProps {
  params: {
    id: string;
  };
}

export default async function SiteShowPage(props: SiteShowPageProps) {
  const { id } = await props.params;

  const site = await db.site.findFirst({
    where: { id: parseInt(id) },
  });
  console.log(site);
  if (!site) {
    return notFound();
  }

  const deleteSiteAction = actions.deleteSite.bind(null, site.id);

  const items = await db.item.findMany();
  const renderedItems = items.map((item) => {
    return (
      <div
        key={item.id}
        className="flex w-full justify-between items-center p-4 bg-gray-50 border rounded-lg border-gray-200"
      >
        <Link
          className="flex flex-1"
          href={`/sites/${site.id}/items/${item.id}`}
        >
          <p>{item.item_name}</p>
        </Link>
        <div className="font-semibold hover:text-blue-600">View</div>
      </div>
    );
  });

  return (
    <div className="flex flex-col mt-10">
      <div className="flex gap-y-5 justify-between items-center">
        <h1 className="text-2xl font-bold">Site Information</h1>
        <div className="flex gap-4">
          <Link
            href={`/sites/${site.id}/edit`}
            className="text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
          >
            Edit
          </Link>
          <form action={deleteSiteAction}>
            <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5">
              Delete
            </button>
          </form>
        </div>
      </div>
      <div className="mt-6 border rounded-lg border-gray-400 shadow p-6">
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <p className="font-semibold">Name</p>
            <p className="text-lg text-gray-600">{site.site_name}</p>
          </div>

          <div className="flex justify-between items-center">
            <p className="font-semibold">Attachment</p>
            <a
              href={site.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              File
            </a>
          </div>
          <div className="flex justify-between items-start">
            <p className="font-semibold">QR Code</p>
            <SitePDFURL site={site} />
          </div>

          <p className="font-semibold flex items-center gap-x-2">
            Items
            <span className="text-xs text-gray-600"> ({items.length})</span>
          </p>
          <div className="flex flex-col gap-y-4 max-h-[400px] overflow-scroll">
            {renderedItems}
          </div>
          <div className="flex justify-between items-start">
            <Link
              href={`/sites/${site.id}/items/new`}
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-[14px] px-5 py-2.5"
            >
              Create Item
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
