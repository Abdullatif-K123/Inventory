"use client";

import type { Site } from "@prisma/client";
import { useEffect, useState } from "react";

interface SiteEditFormProps {
  site: Site;
}

export const SitePDFURL = ({ site }: SiteEditFormProps) => {
  const [baseUrl, setBaseUrl] = useState<string>("");

  useEffect(() => {
    // Get the full URL on the client-side
    const url = window.location.origin;
    setBaseUrl(url); // Store the URL in state
  }, []); // Empty dependency array ensures it runs once when component mounts
  return (
    <img
      className="h-auto max-w-[100px] rounded-lg"
      src={`https://api.qrserver.com/v1/create-qr-code?size=500x500&data=${
        baseUrl + site.fileUrl
      }`}
    />
  );
};
