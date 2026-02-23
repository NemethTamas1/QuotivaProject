'use client';

import Link from "next/link";
import NavBar from "./NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function HasNoProfile() {

    return (
        <>
            <div className="min-h-[calc(100vh-64px)] bg-[#1a1a1a] flex flex-col items-center justify-center text-white p-4">
                <div className="max-w-md w-full text-center space-y-6 bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-2xl">

                    <div className="mx-auto w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center">
                        <span className="text-yellow-500 text-3xl"><FontAwesomeIcon icon={faTriangleExclamation} /></span>
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold tracking-tight">
                            Nincs aktív profilja
                        </h1>
                        <p className="text-gray-400">
                            Az ajánlatok létrehozásához előbb el kell készítenie a saját profilját.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3">
                        {/* <Link href="/dashboard" className="w-full py-3 px-4 bg-green-400 text-black font-semibold rounded-lg hover:bg-green-300 transition-all active:scale-95">
                            Vissza a Dashboardra
                        </Link> */}

                        <p className="text-lg text-gray-500 italic">
                            A profilokat a kezelőfelület menüponton belül találja.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}