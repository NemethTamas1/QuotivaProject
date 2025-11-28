'use client';

import { useState, useEffect } from "react";

export default function Home() {
  const [rawData, setRawData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  console.log("USE EFFECT FUT");
  console.log("API_URL:", process.env.NEXT_PUBLIC_API_URL);

  fetch(`${apiUrl}/api/datas`)
    .then(res => res.json())
    .then(data => {
      setRawData(data);
      setLoading(false);
    })
    .catch(err => {
      console.error("Error fetching API:", err);
      setLoading(false);
    });
}, []);


return (
  <div className="p-4">
    <h1 className="text-2xl text-center text-cyan-500 font-bold">Quotiva Frontend</h1>

    {loading ? (
      <p>Betöltés...</p>
    ) : (
      <pre style={{ whiteSpace: "pre-wrap" }}>
        {JSON.stringify(rawData, null, 2)}
      </pre>
    )}
  </div>
);
}
