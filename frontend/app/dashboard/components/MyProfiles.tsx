import http from "@/lib/http";
import { profileType } from "../types/types";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { showInfo, showSuccess } from "@/lib/toast";
import ProfileModal from "./ProfileModal";

export default function MyProfiles() {

    const [profiles, setProfiles] = useState<profileType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { setSelectedUserProfile, selectedUserProfile } = useAuth();
    const [modalConfig, setModalConfig] = useState<{ mode: 'create' | 'update' | 'delete', profile?: profileType } | null>(null);

    const handleModalConfirm = async (data?: Partial<profileType>) => {
        if (!modalConfig) return;

        const { mode, profile } = modalConfig;

        try {
            if (mode === 'create') {
                await http.post('/api/user-profiles', data);
                showSuccess("Profil létrehozva");
            } else if (mode === 'update' && profile) {
                await http.put(`/api/user-profiles/${profile.id}`, data);
                showSuccess("Profil frissítve");
            } else if (mode === 'delete' && profile) {
                await http.delete(`/api/user-profiles/${profile.id}`);
                showSuccess("Profil törölve");
            }

            setModalConfig(null);
            fetchProfiles();
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
            <h1 className="text-3xl text-center text-white p-6 pb-0">Felhasználói profiljaim</h1>
            <p className=" text-center opacity-50 ">A kiválasztott profilhoz mérten jelennek meg a grafikonok értékei, illetve azokkal hozza létre a kiadott árajánlatot.</p>



            <div>
                {isLoading && (
                    <div className="flex justify-center items-center my-20">
                        <p className="text-xl animate-pulse">Adatok betöltése...</p>
                    </div>
                )}

                {/* Profilok listázása */}
                {!isLoading && !error && profiles.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 mt-5 gap-4 text-white grid-flow-row mx-auto">
                        {profiles.map((p) => (
                            <div key={p.id} className={`rounded-md w-full p-4 shadow-lg transition-all ${selectedUserProfile?.id === p.id ? "ring-2 ring-green-400 bg-[#303036]" : "bg-[#27272A]"}`}>
                                <div className="font-semibold text-lg">{p.company_name}</div>
                                <div className="text-sm text-gray-300">
                                    {p.city} {p.zip} • {p.street} {p.house_number}
                                </div>
                                <div className="text-sm text-gray-300">
                                    {p.company_email} • {p.company_phone}
                                </div>


                                <div className="grid grid-cols-3 justify-items-center mt-3">
                                    <div className="flex justify-center">
                                        {selectedUserProfile?.id === p?.id ? (
                                            // Aktív
                                            <button className="w-full py-2 px-4 text-sm bg-green-300 text-black rounded-md cursor-default shadow-inner">Aktív</button>
                                        ) : (
                                            // Kiválaszás
                                            <button
                                                onClick={() => saveProfile(p)}
                                                className="w-full py-2 px-4 text-sm bg-green-300 text-black rounded-md hover:bg-green-400 transition-all duration-200"
                                            >
                                                Kiválasztás
                                            </button>
                                        )}
                                    </div>

                                    <div className="flex justify-center">
                                        <button className="w-full py-2 px-4 text-sm bg-orange-300 text-black rounded-md hover:bg-green-400 transition-all duration-200" onClick={() => setModalConfig({ mode: 'update', profile: p })}>Módosítás</button>
                                    </div>

                                    <div className="flex justify-center">
                                        <button className="w-full py-2 px-4 text-sm bg-red-400 text-black rounded-md hover:bg-green-400 transition-all duration-200" onClick={() => setModalConfig({ mode: 'delete', profile: p })}>Törlés</button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="flex p-5">
                            <button
                                onClick={() => setModalConfig({ mode: 'create' })}
                                className="bg-green-400 text-black px-6 py-2 mx-auto rounded-lg transition-all"
                            >
                                + Új profil létrehozása
                            </button>
                        </div>
                    </div>
                )}
            </div>


            {modalConfig && (
                <ProfileModal
                    mode={modalConfig.mode}
                    profile={modalConfig.profile}
                    onClose={() => setModalConfig(null)}
                    onConfirm={handleModalConfirm}
                />
            )}
        </div>
    );
}