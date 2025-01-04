import { QRCodeImg } from "@/components/getCurrentUrl";
import { db } from "@/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import * as actions from "@/actions";

interface ItemCreatePageProps {
  params: {
    id: string;
    itemId: string;
  };
}

export default async function ItemCreatePage(props: ItemCreatePageProps) {
  const { id } = await props.params;
  const { itemId } = await props.params;

  const siteId = parseInt(id);
  const item_id = parseInt(itemId);

  console.log("item", item_id);

  const item = await db.item.findFirst({
    where: { id: item_id },
  });
  console.log(item);
  if (!item) {
    return notFound();
  }

  const formattedLastMaintenanceDate = item.last_maintenance_date
    ? item.last_maintenance_date.toISOString().split("T")[0]
    : "dd/mm/yyyy";

  const formattedNextMaintenanceDate = item.next_maintenance_date
    ? item.next_maintenance_date.toISOString().split("T")[0]
    : "dd/mm/yyyy";

  const deleteItemAction = actions.deleteItem.bind(null, item.site_id, item.id);
  return (
    <div className="flex flex-col mt-10">
      <div className="flex gap-2 justify-between items-center">
        <h1 className="text-2xl font-bold">Item Information</h1>
        <div className="flex gap-4">
          <Link
            href={`/sites/${siteId}/items/${item_id}/edit`}
            className="text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
          >
            Edit
          </Link>
          <form action={deleteItemAction}>
            <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5">
              Delete
            </button>
          </form>
        </div>
      </div>
      <div className="mt-6 border rounded-lg border-gray-400 shadow p-6">
        <div className="flex flex-col gap-y-5">
          <div className="flex justify-between items-center">
            <p className="font-semibold">Name</p>
            <p className="text-lg text-gray-600">{item.item_name}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold">Image</p>
            <a
              href={item.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              File
            </a>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold">Last maintenance date</p>
            <p className="text-lg text-gray-600">
              {formattedLastMaintenanceDate}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold">Next maintenance date</p>
            <p className="text-lg text-gray-600">
              {formattedNextMaintenanceDate}
            </p>
          </div>
          <div className="flex justify-between items-start">
            <p className="font-semibold">QR code</p>
            <QRCodeImg />
          </div>
          <div className="flex flex-col">
            <p className="font-semibold">Additional notes</p>
            <p className="text-lg text-gray-600">{item.notes}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
