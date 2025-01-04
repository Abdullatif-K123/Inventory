/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useActionState, useState } from "react";
import type { Item } from "@prisma/client";
import * as actions from "@/actions";
import { QRCodeImg } from "@/components/getCurrentUrl";

interface ItemEditFormProps {
  item: Item;
}

const initialState = {
  message: "",
};

export default function ItemEditForm({ item }: ItemEditFormProps) {
  const [file, setFile] = useState<File | null>(null);

  const [filePath, setFilePath] = useState(item.fileUrl);

  const [state, formAction, pending] = useActionState(
    actions.editItem,
    initialState
  );

  const formattedLastMaintenanceDate = item.last_maintenance_date
    ? item.last_maintenance_date.toISOString().split("T")[0]
    : "";

  const formattedNextMaintenanceDate = item.next_maintenance_date
    ? item.next_maintenance_date.toISOString().split("T")[0]
    : "";

  const editItemAction = actions.editItem.bind(
    null,
    item.id,
    item.site_id,
    filePath
  );

  const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    console.log("onSubmitCreateSite");

    if (!file) return;
    console.log("file exists");
    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      // console.log('res: ', res.json());

      const { success, path } = await res.json();
      console.log(success, path);

      setFilePath(path);
      console.log("....", filePath);

      // handle the error
      if (!res.ok) throw new Error(await res.text());
    } catch (e: any) {
      // Handle errors here
      console.error(e);
    }
  };

  return (
    <form action={editItemAction}>
      <div className="flex flex-col mt-5">
        <div className="flex gap-2 justify-between items-center">
          <h1 className="text-xl font-bold">Item Information</h1>
        </div>
        <div className="flex flex-col gap-5 m-10">
          <div className="flex gap-5">
            <label htmlFor="item_name" className="break-normal w-12">
              Item Name
            </label>
            <input
              name="item_name"
              id="item_name"
              className="border rounded p-2 w-full"
              defaultValue={item.item_name}
            />
          </div>
          <div className="flex gap-10">
            <label htmlFor="image" className="w-12">
              Image
            </label>
            <input
              name="file"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <button type="button" onClick={onSubmit}>
              Upload
            </button>
          </div>

          <div className="flex gap-10">
            <label htmlFor="last_maintenance_date" className="w-12 ">
              Last maintenence Date
            </label>
            <input
              type="date"
              name="last_maintenance_date"
              defaultValue={formattedLastMaintenanceDate}
            />
          </div>
          <div className="flex gap-10">
            <label htmlFor="next_maintenance_date" className="w-12">
              Next maintenence Date
            </label>
            <input
              type="date"
              name="next_maintenance_date"
              defaultValue={formattedNextMaintenanceDate}
            />
          </div>
          <div className="flex gap-5">
            <label htmlFor="qr_code" className="w-12">
              QR Code
            </label>
            <QRCodeImg />
          </div>
          <div className="flex gap-5">
            <label htmlFor="notes" className="w-12">
              Notes
            </label>
            <textarea
              className="border w-full"
              name="notes"
              defaultValue={item.notes}
            />
          </div>
        </div>
        <button type="submit" className="rounded p-2 bg-blue-200">
          Save
        </button>
      </div>
    </form>
  );
}
