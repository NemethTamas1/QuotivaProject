'use client';

import { useState } from "react";
import HomePage from "./components/HomePage";
import MyProfiles from "./components/MyProfiles";
import Home from "../page";

export default function Dashboard(){

    const [selectedPage, setSelectedPage] = useState<string>('Home');

    return (
        <>
            <div className="w-full flex flex-row lg:min-h-screen">
                {/* Bal oldali oldalsáv */}
                <div className="w-1/12 bg-red-400">
                    <button onClick={() => setSelectedPage('Home')} className="block text-2xl p-2">HomePage</button>
                    <button onClick={() => setSelectedPage('myProfiles')} className="block text-2xl p-2">Profiljaim</button>
                </div>




                {/* Jobb oldali fő tartalom */}
                <div className="w-11/12 bg-blue-400">
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