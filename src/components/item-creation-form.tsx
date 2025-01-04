"use client";

import { useActionState, useState } from "react";
import * as actions from "@/actions";
import type { Site } from "@prisma/client";

interface ItemCreationFormProps {
  siteId: number;
}
const initialState = {
  message: "",
};

export default function ItemCreationForm({ siteId }: ItemCreationFormProps) {
  const [file, setFile] = useState<File | null>(null);

  const [filePath, setFilePath] = useState(null);

  const [state, formAction, pending] = useActionState(
    actions.createItem,
    initialState
  );

  const createItemAction = actions.createItem.bind(null, siteId, filePath);

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
    <form action={createItemAction}>
      <h3 className="font-bold m-3">Create Item</h3>
      <div className="flex flex-col gap-5">
        <div className="flex gap-5">
          <label htmlFor="item_name" className="break-normal w-12">
            Item Name
          </label>
          <input
            name="item_name"
            id="item_name"
            className="border rounded p-2 w-full"
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
          <label htmlFor="last_maintenance_date" className="w-12">
            Last maintenence Date
          </label>
          <input type="date" name="last_maintenance_date" />
        </div>
        <div className="flex gap-10">
          <label htmlFor="next_maintenance_date" className="w-12">
            Next maintenence Date
          </label>
          <input type="date" name="next_maintenance_date" />
        </div>
        {/* <div className="flex gap-5">
          <label htmlFor="qr_code" className="w-12">
            QR Code
          </label>
        </div> */}
        <div className="flex gap-5">
          <label htmlFor="notes" className="w-12">
            Notes
          </label>
          <textarea className="border w-full" name="notes" />
        </div>
        <button type="submit" className="rounded p-2 bg-blue-200">
          Save
        </button>
      </div>
    </form>
  );
}
