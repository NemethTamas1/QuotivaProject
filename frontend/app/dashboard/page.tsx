'use client';

import { useState } from "react";
import HomePage from "./components/HomePage";
import MyProfiles from "./components/MyProfiles";
import NavBar from "../components/NavBar";

export default function Dashboard() {

    const [selectedPage, setSelectedPage] = useState<string>('Home');

    return (
        <>
            <NavBar />
            <div className="w-full flex flex-col lg:flex-row lg:min-h-screen">
                {/* Bal oldali oldalsáv */}
                <div className="w-full flex flex-row lg:block lg:w-1/12 bg-[#27272A] relative z-10 shadow-[12px_0_24px_-12px_#18181B]">
                    <button onClick={() => setSelectedPage('Home')} className={`mx-auto block text-2xl p-2 ${selectedPage === 'Home' ? 'text-green-400' : 'text-gray-200'}`}>Főoldal</button>

                    <button onClick={() => setSelectedPage('myOffers')} className={`mx-auto block text-2xl p-2 ${selectedPage === 'myOffers' ? 'text-green-400' : 'text-gray-200'}`}>Árajánlatok</button>

                    <button onClick={() => setSelectedPage('myProfiles')} className={`mx-auto block text-2xl p-2 ${selectedPage === 'myProfiles' ? 'text-green-400' : 'text-gray-200'}`}>Profiljaim</button>
                </div>




                {/* Jobb oldali fő tartalom */}
                <div className="lg:w-11/12 h-screen w-screen bg-[#27272A]">
                    {selectedPage === 'Home' && (
                        <HomePage />
                    )}
                    {/* {selectedPage === 'myOffers' && (
                        <MyOffers />
                    )} */}
                    {selectedPage === 'myProfiles' && (
                        <MyProfiles />
                    )}
                </div>
            </div>
        </>
    );
}