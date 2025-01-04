"use client";

import { useEffect, useState } from "react";

export const QRCodeImg = () => {
  const [currentUrl, setCurrentUrl] = useState<string>("");

  useEffect(() => {
    // Get the full URL on the client-side
    const url = window.location.href;
    setCurrentUrl(url); // Store the URL in state
  }, []); // Empty dependency array ensures it runs once when component mounts

  return (
    <img
      className="h-auto max-w-[100px] rounded-lg"
      src={`https://api.qrserver.com/v1/create-qr-code?size=500x500&data=${currentUrl}`}
      alt="QR Code"
    />
  );
};
