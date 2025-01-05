// "use client";
// import { redirect } from "next/navigation";
import { db } from "@/db";
// import { useActionState, useState } from "react";
// import * as actions from "@/actions";
import SiteCreationForm from "@/components/site-creation-form";
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

    return { success: true, filePath };
  }
  return <SiteCreationForm />;
}
