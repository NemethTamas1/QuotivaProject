'use client';

import { profileType } from "../types/types";
import ProfileCompiler from "./ProfileCompiler";
import { useState } from "react";

export default function MyProfiles() {

    const [isCompilerOpen, setIsCompilerOpen] = useState(false);

    const handleProfileSave = async (data: Partial<profileType>) => {
        try {
            console.log("Profil mentés próba:", data);

            const api = process.env.NEXT_PUBLIC_API_URL;
            await fetch(`${api}/sanctum/csrf-cookie`, { credentials: 'include' });
            const res = await fetch(`${api}/api/user-profiles`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                console.log("Profil sikeresen mentve.");
                alert("Profil sikeresen mentve.");
                setIsCompilerOpen(false);
            } else {
                const error = await res.json();
                console.error("Hiba a profil mentésekor:", error);
                alert("Hiba történt a profil mentésekor.");
            }
        } catch (error) {
            console.error("Hálózati hiba a profil mentésekor:", error);
            alert("Hálózati hiba történt a profil mentésekor.");
        }

    };

    return (
        <div className="p-8">
            <h1 className="text-2xl text-center my-10">Profiljaim</h1>

            <div className="flex justify-center">
                <button
                    onClick={() => setIsCompilerOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all"
                >
                    + Új profil létrehozása
                </button>
            </div>

            {isCompilerOpen && (
                <ProfileCompiler
                    onClose={() => setIsCompilerOpen(false)}
                    onSave={handleProfileSave}
                />
            )}
        </div>
    );
}