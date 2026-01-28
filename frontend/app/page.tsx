'use client';

import NavBar from "./components/NavBar";
import Link from "next/link"

import { useAuth } from "@/context/AuthContext";


export default function Home() {

  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <NavBar />
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
            {user ? (
              <Link href="/createoffer" className="px-6 py-3 bg-green-500 text-black font-bold rounded-md hover:bg-green-400 transition shadow-[0_0_15px_#00ff80]">Új árajánlat készítése</Link>
            ) : (
              <Link href="/login" className="px-6 py-3 bg-green-500 text-black font-bold rounded-md hover:bg-green-400 transition shadow-[0_0_15px_#00ff80]">Új árajánlat készítése</Link>
            )}

            <Link href="#" className="px-6 py-3 border border-white/20 rounded-md hover:bg-white/10 transition">Árajánlatok megtekintése</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
