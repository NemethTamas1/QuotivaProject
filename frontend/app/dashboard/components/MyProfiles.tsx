import http from "@/lib/http";
import { profileType } from "../types/types";
import ProfileCompiler from "./ProfileCompiler";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { showInfo, showSuccess } from "@/lib/toast";

export default function MyProfiles() {

    const [isCompilerOpen, setIsCompilerOpen] = useState(false);
    const [profiles, setProfiles] = useState<profileType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { setSelectedUserProfile, selectedUserProfile } = useAuth();

    const handleProfileSave = async (data: Partial<profileType>) => {
        try {

            const res = await http.post(`/api/user-profiles`, data);

            if (res.status === 201) {
                showSuccess(data.company_name + "sikeresen mentve.")
                setIsCompilerOpen(false);
            } else {
                console.error("Hiba a profil mentésekor:", error);
                alert("Hiba történt a profil mentésekor.");
            }
        } catch (error) {
            console.error("Hálózati hiba a profil mentésekor:", error);
            alert("Hálózati hiba történt a profil mentésekor.");
        }

    };

    const fetchProfiles = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const res = await http.get('/api/user-profiles');
            const items: profileType[] = res.data?.data ?? [];
            setProfiles(items);

            if (items.length > 0 && !selectedUserProfile) setSelectedUserProfile(items[0]);
        } catch (e) {
            setError("Hiba történt a profilok betöltésekor.");
        } finally {
            setIsLoading(false);
        }
    };

    const saveProfile = async (profile: profileType) => {
        setSelectedUserProfile(profile);
        showInfo("A(z) " + profile.company_name + "sikeresen kiválasztva.");
    };

    useEffect(() => {
        fetchProfiles();
    }, [])

    return (
        <div className="p-8">
            <h1 className="text-3xl text-center text-white p-6 pb-0">Saját felhasználói profiljaim</h1>

            <div className="flex p-5">
                <button
                    onClick={() => setIsCompilerOpen(true)}
                    className="bg-green-400 text-black px-6 py-2 mx-auto rounded-lg transition-all"
                >
                    + Új profil létrehozása
                </button>
            </div>

            <div>
                {isLoading && (
                    <div className="flex justify-center items-center my-20">
                        <p className="text-xl animate-pulse">Adatok betöltése...</p>
                    </div>
                )}

                {/* Profilok listázása */}
                {!isLoading && !error && profiles.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 text-white grid-flow-row mx-auto">
                        {profiles.map((p) => (
                            <div key={p.id} className={`rounded-md w-full p-4 shadow-lg transition-all ${selectedUserProfile?.id === p.id ? "ring-2 ring-green-400 bg-[#303036]" : "bg-[#27272A]"}`}>
                                <div className="font-semibold text-lg">{p.company_name}</div>
                                <div className="text-sm text-gray-300">
                                    {p.city} {p.zip} • {p.street} {p.house_number}
                                </div>
                                <div className="text-sm text-gray-300">
                                    {p.company_email} • {p.company_phone}
                                </div>

                                {selectedUserProfile?.id === p?.id ? (
                                    <button className="disabled p-2 bg-green-300 text-black rounded-md hover:bg-green-400 transition-colors">Kiválasztva</button>
                                ) : (
                                    <button
                                        onClick={() => saveProfile(p)}
                                        className="p-2 bg-green-300 text-black rounded-md hover:bg-green-400 transition-colors"
                                    >
                                        Profil kiválasztása
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
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