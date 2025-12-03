'use client';

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Home() {

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    console.log("USE EFFECT FUT");
    console.log("API_URL:", apiUrl);
  });

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* NavBar */}
      <nav className="w-full py-4 flex justify-between px-3 items-center backdrop-blur-md bg-black">
        <Link href="/" className="text-3xl font-semibold tracking-wide">
          Quotiva
        </Link>

        <div className="hidden md:flex gap-6 text-2xl">
          <Link href="#" className="hover:text-green-400 transition">Új árajánlat</Link>
          <Link href="#" className="hover:text-green-400 transition">Árajánlataim</Link>
          <Link href="#" className="hover:text-green-400 transition">Belépés</Link>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </nav>
      {isOpen && (
        <div
          className={
            `md:hidden overflow-hidden transition-all duration-300 bg-black border-t border-white/10
      ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`
          }
        >
          <div className="flex flex-col gap-4 px-4 py-4 text-xl">
            <a href="#" className="hover:text-green-400 transition">Új árajánlat</a>
            <a href="#" className="hover:text-green-400 transition">Árajánlataim</a>
            <a href="#" className="hover:text-green-400 transition">Belépés</a>
          </div>
        </div>
      )}


      {/* Main */}
      <main className="flex-1 flex items-center justify-center text-center px-4">
        <div>
          <h2 className="text-3xl sm:text-5xl font-bold leading-snug">
            Köszöntünk a Quotiva oldalán,
            <br /> egy egyszerű, de
            <span className="text-green-400 drop-shadow-[0_0_10px_#00ff80]">
              {" "}hatékony
            </span>
            {" "}
            árajánlat készítő oldalon.
          </h2>

          <p className="mt-6 mx-auto text-white/60 max-w-xl auto">
            Készítsen gyorsan, tisztán és profin árajánlatokat modern felületen, átlátható tételekkel, és automatikus összesítéssel.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <a href="#" className="px-6 py-3 bg-green-500 text-black font-bold rounded-md hover:bg-green-400 transition shadow-[0_0_15px_#00ff80]">Új árajánlat készítése</a>

            <a href="#" className="px-6 py-3 border border-white/20 rounded-md hover:bg-white/10 transition">Árajánlatok megtekintése</a>
          </div>
        </div>
      </main>
    </div>
  );
}
