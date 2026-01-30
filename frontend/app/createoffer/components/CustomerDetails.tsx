'use client';

import type { UseFormRegister } from "react-hook-form";
import type { CreateOfferForm } from "@/app/createoffer/types";
import { useAuth } from "@/context/AuthContext";
import { profileType } from "@/app/dashboard/types/types";
import { useEffect, useState } from "react";
import http from "@/lib/http";

interface Props {
    register: UseFormRegister<CreateOfferForm>;
}


export default function CustomerDetails({ register }: Props) {
    const {selectedUserProfile, setSelectedUserProfile} = useAuth();

    const fetchProfiles = async () => {
        try {
            const res = await http.get('/api/user-profiles');
            const items: profileType[] = res.data?.data ?? [];

            if (items.length > 0 && !selectedUserProfile) setSelectedUserProfile(items[0]);
        } catch (e) {
            console.error("Hiba történt a profilok betöltésekor.");
        }
    };

    useEffect(() => {
        fetchProfiles()
    }, [])
    return (
        <>
            {/* M E G R E N D E L Ő   A D A T O K*/}
            <div className="flex flex-row justify-between items-baseline mb-7">
                <h2 className="text-2xl font-semibold text-green-400" style={{
                    textShadow: "0px 0px 20px rgba(34, 197, 94, 1"
                }}>
                    Megrendelő adatai
                </h2>

                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400 font-medium italic">Profil:</span>
                    <span className="text-lg font-bold text-green-400 bg-green-400/10 px-3 py-1 rounded-full border border-green-400/20 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                        {selectedUserProfile?.company_name || "Nincs kiválasztva"}
                    </span>
                </div>
            </div>

            <div className="relative">
                <div className="absolute -inset-1.5 bg-green-500 rounded-md blur-sm opacity-25"></div>

                <div className="bg-slate-900 flex flex-row flex-wrap gap-5 p-3 rounded-md relative">
                    <div>
                        <label className="block mb-1 text-white">Név*</label>
                        <input
                            {...register("client_name")}
                            placeholder="Teszt Kft."
                            className="border rounded w-full px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-white">Email*</label>
                        <input
                            {...register("client_email")}
                            placeholder="tesztcegkft@gmail.com"
                            type="email"
                            className="border rounded w-full px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-white">Telefonszám</label>
                        <input
                            {...register("client_phone")}
                            placeholder="+36 20 123 4567"
                            className="border rounded w-full px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-white">Adószám <i>(cég esetén)</i></label>
                        <input
                            {...register("client_tax_number")}
                            placeholder="12345678-1-12"
                            className="border rounded w-full px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-white">Irányítószám*</label>
                        <input
                            type="number"
                            inputMode="numeric"
                            pattern="[0-9]"
                            {...register("client_zip", { valueAsNumber: true })}
                            placeholder="1111"
                            className="border rounded w-full px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-white">Város*</label>
                        <input
                            {...register("client_city")}
                            placeholder="Budapest"
                            className="border rounded w-full px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-white">Utca*</label>
                        <input
                            {...register("client_street")}
                            placeholder="Teszt utca"
                            className="border rounded w-full px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-white">Házszám*</label>
                        <input
                            {...register("client_house_number")}
                            placeholder="11"
                            className="border rounded w-full px-3 py-2"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};