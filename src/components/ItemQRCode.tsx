"use client";

import type { Item } from "@prisma/client";
import { useEffect, useState } from "react";

interface ItemProps {
  item: Item;
}

export const ItemQRCode = ({ item }: ItemProps) => {
  const [baseUrl, setBaseUrl] = useState<string>("");

  useEffect(() => {
    // Get the full URL on the client-side
    const url = window.location.origin;
    setBaseUrl(url); // Store the URL in state
  }, []); // Empty dependency array ensures it runs once when component mounts
  return (
    <img
      src={`https://api.qrserver.com/v1/create-qr-code?size=500x500&data=${
        baseUrl + item.fileUrl
      }`}
    />
  );
};
