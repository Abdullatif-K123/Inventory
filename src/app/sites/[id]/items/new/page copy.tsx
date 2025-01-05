// "use client";
// import { redirect } from "next/navigation";
import { db } from "@/db";
// import { useActionState, useState } from "react";
// import * as actions from "@/actions";
// import SiteCreationForm from "@/components/site-creation-form";
import { writeFile } from "fs/promises";
import { join } from "path";

let filePath: string | null = null;

export default function ItemCreatePage() {
  async function upload(data: FormData): Promise<void> {
    "use server";

    const file: File | null = data.get("file") as unknown as File;
    if (!file) {
      return; //throw new Error("No file uploaded");
    }

    // data.set('file', file)

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // With the file data in the buffer, you can do whatever you want with it.
    // For this, we'll just write it to the filesystem in a new location
    // const path = join("/", "tmp", file.name);
    const path = join(process.cwd(), "public", "uploads", file.name);
    filePath = `/uploads/${file.name}`;
    console.log("======", filePath);
    await writeFile(path, buffer);
    // console.log(`open ${path} to see the uploaded file`);
    const siteName = data.get("site_name");
    if (!siteName || typeof siteName !== "string") {
      throw new Error("Invalid or missing site_name");
    }
    const site = await db.site.create({
      data: {
        site_name: siteName,
        fileUrl: filePath,
      },
    });

    console.log(site);

    // return { success: true, filePath };
  }
  return (
    <form action={upload}>
      <h3 className="font-bold m-3">Create Item</h3>
      <div className="flex flex-col gap-5">
        <div className="flex gap-5">
          <label htmlFor="site_name" className="break-normal w-12">
            Item Name
          </label>
          <input
            name="site_name"
            id="site_name"
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="flex gap-10">
          <label htmlFor="image" className="w-12">
            Image
          </label>
          <input name="image" type="file" accept=".png" />
          <button type="submit">Upload</button>
        </div>

        <div className="flex gap-10">
          <label htmlFor="qr_code" className="w-12">
            Last maintenence Date
          </label>
          <input type="date" />
        </div>
        <div className="flex gap-10">
          <label htmlFor="qr_code" className="w-12">
            Next maintenence Date
          </label>
          <input type="date" />
        </div>
        <div className="flex gap-5">
          <label htmlFor="qr_code" className="w-12">
            QR Code
          </label>
        </div>
        <div className="flex gap-5">
          <label htmlFor="qr_code" className="w-12">
            Notes
          </label>
          <textarea className="border w-full" />
        </div>
        <button type="submit" className="rounded p-2 bg-blue-200">
          Save
        </button>
      </div>
    </form>
  );
}
