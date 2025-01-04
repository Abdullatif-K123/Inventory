// "use client";
// import { redirect } from "next/navigation";
import { db } from "@/db";
// import { useActionState, useState } from "react";
// import * as actions from "@/actions";
// import SiteCreationForm from "@/components/site-creation-form";
import { writeFile } from "fs/promises";
import { join } from "path";

let filePath: string | null = null;

export default function SiteCreatePage() {
  async function upload(data: FormData) {
    "use server";

    const file: File | null = data.get("file") as unknown as File;
    if (!file || !filePath) {
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

    const site = await db.site.create({
      data: {
        site_name: data.get("site_name"),
        fileUrl: filePath,
      },
    });

    console.log(site);

    return { success: true, filePath };
  }
  return (
    <form action={upload} onSubmit={(e) => e.preventDefault()}>
      <h3 className="font-bold m-3">Create site</h3>
      <div className="flex flex-col gap-5">
        <div className="flex gap-5">
          <label htmlFor="site_name" className="break-normal w-12">
            Site Name
          </label>
          <input
            name="site_name"
            id="site_name"
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="flex gap-5">
          <label htmlFor="attachment" className="w-12">
            Attachment
          </label>
          <input name="file" type="file" accept=".pdf" />
          {filePath && (
            <div className="mt-5">
              <p>File uploaded successfully:</p>
              <a
                href={filePath}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View Uploaded File
              </a>
            </div>
          )}
          {/* <input type="submit" value="Upload" /> */}
          <button type="submit">Upload</button>
        </div>
        <div className="flex gap-5">
          <label htmlFor="qr_code" className="w-12">
            QR Code
          </label>
        </div>
        <button type="submit" className="rounded p-2 bg-blue-200">
          Save
        </button>
      </div>
    </form>
  );
}
