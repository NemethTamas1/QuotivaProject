'use client';

import { useEffect, useState } from "react";
import HomePage from "./components/HomePage";
import MyProfiles from "./components/MyProfiles";
import NavBar from "../components/NavBar";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {

    const [selectedPage, setSelectedPage] = useState<string>('Home');

    const { user } = useAuth();

    return (
        <>
            <NavBar />
            <div className="w-full flex flex-row lg:min-h-screen">
                {/* Bal oldali oldalsáv */}
                <div className="w-1/12 bg-[#27272A] relative z-10 shadow-[12px_0_24px_-12px_#18181B]">
                    <button onClick={() => setSelectedPage('Home')} className={`block text-2xl p-2 ${selectedPage === 'Home' ? 'text-green-400' : 'text-gray-200'}`}>HomePage</button>

                    <button onClick={() => setSelectedPage('myProfiles')} className={`block text-2xl p-2 ${selectedPage === 'myProfiles' ? 'text-green-400' : 'text-gray-200'}`}>Profiljaim</button>
                </div>




                {/* Jobb oldali fő tartalom */}
                <div className="w-11/12 bg-[#27272A]">
                    {selectedPage === 'Home' && (
                        <HomePage />
                    )}
                    {selectedPage === 'myProfiles' && (
                        <MyProfiles />
                    )}
                </div>
            </div>
        </>
    );
}