'use client';

import { useState, useEffect } from "react";

export default function Home() {
  const [message, setMessage] = useState<String>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    fetch(`${apiUrl}/api/datas`)
    .then(res => res.json())
    .then(data => {
      setMessage(data.message);
      setLoading(false);
    })
    .catch(err => {
      console.error("Error fetching API:", err);
      setMessage("Error fetching API");
      setLoading(false);
    })
    ,[];
  });

  return (
         <div className="p-4">
           <h1 className="text-2xl font-bold">Quotiva Frontend</h1>
           {loading ? (
             <p>Betöltés...</p>
           ) : (
             <p className="text-lg">API üzenet: {message}</p>
           )}
         </div>
       );
}
