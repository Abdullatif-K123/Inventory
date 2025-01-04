/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useActionState, useState } from "react";
import type { Site } from "@prisma/client";
import * as actions from "@/actions";
import { SitePDFURL } from "@/components/SitePDFURL";

interface SiteEditFormProps {
  site: Site;
}

const initialState = {
  message: "",
};

export default function SiteEditForm({ site }: SiteEditFormProps) {
  const [state, formAction, pending] = useActionState(
    actions.editSite,
    initialState
  );

  const editSiteAction = actions.editSite.bind(null, site.id);

  const [file, setFile] = useState<File | null>(null);

  const [filePath, setFilePath] = useState(site.fileUrl);

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
    <form action={editSiteAction}>
      <div className="flex flex-col mt-10 ">
        <h1 className="text-2xl font-bold mb-4">Edit site</h1>
        <div className="flex flex-col gap-y-5 border border-gray-300 p-5 rounded-lg mb-4">
          <div className="flex flex-col w-1/2">
            <label
              htmlFor="site_name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Site Name
            </label>
            <input
              name="site_name"
              id="site_name"
              defaultValue={site.site_name}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
          </div>

          <div className="mb-5">
            <p className="font-semibold mb-3">Attachment</p>
            <div className="flex gap-x-4">
              <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5">
                <input
                  name="file"
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </div>
              <button
                type="button"
                onClick={onSubmit}
                className="text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
              >
                Upload
              </button>
            </div>
          </div>
          {/* <div className="flex gap-5">
          <label htmlFor="qr_code" className="w-12">
            QR Codes
          </label>
          <SitePDFURL site={site} />
        </div> */}
        </div>
      </div>
      <button
        type="submit"
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-[14px] px-5 py-2.5"
      >
        Save Settings
      </button>
    </form>
  );
}
