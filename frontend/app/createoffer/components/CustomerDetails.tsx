'use client';

import type { UseFormRegister } from "react-hook-form";
import type { CreateOfferForm } from "@/app/createoffer/types";

interface Props {
    register: UseFormRegister<CreateOfferForm>;
}

export default function CustomerDetails({ register }: Props) {
    return (
        <>
            {/* M E G R E N D E L Ő   A D A T O K*/}
            <h2 className="text-2xl font-semibold text-green-400 mb-7" style={{
                textShadow: "0px 0px 20px rgba(34, 197, 94, 1"
            }}>Megrendelő adatai</h2>

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