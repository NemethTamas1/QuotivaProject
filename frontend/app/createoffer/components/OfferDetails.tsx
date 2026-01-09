'use client';

import { useFormContext } from "react-hook-form";
import type { CreateOfferForm } from "@/app/createoffer/types";
import { AllCurrencies } from "@/app/createoffer/types";


export default function OfferDetails() {
    const { register, watch, setValue } = useFormContext<CreateOfferForm>();
    const taxPercent = watch("tax_percent") ?? 27;
    const hasTax = taxPercent === 27;
    return (
        <>
            {/* A J Á N L A T  N E V E */}
            <div className="relative">

                <div className="absolute -inset-1.5 bg-green-500 rounded-md blur-sm opacity-25"></div>
                <div className="bg-slate-900 flex flex-row flex-wrap gap-5 p-3 rounded-md my-7 relative">
                    <div>
                        <label className="block mb-1 text-white">Ajánlat neve</label>
                        <input
                            {...register("offer_name")}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Kazán szerelés"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-white">Kelt</label>
                        <input
                            type="date"
                            {...register("dated")}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-white">Érvényes eddig</label>
                        <input
                            type="date"
                            {...register("valid_until")}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-white">Pénznem</label>
                        <select {...register("currency")} className="w-full border rounded px-3 py-2">
                            {AllCurrencies.map((currency) => (
                                <option key={currency} value={currency}>{currency}</option>
                            ))}
                        </select>
                    </div>


                    <div>
                        <label className="block mb-2 text-white">Áfa kulcs</label>

                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-400">0%</span>
                            <input type="hidden" {...register("tax_percent", { valueAsNumber: true })} />
                            <button
                                type="button"
                                onClick={() => setValue("tax_percent", hasTax ? 0 : 27, {
                                    shouldDirty: true,
                                    shouldTouch: true,
                                    shouldValidate: true,
                                })}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${hasTax ? "bg-green-500" : "bg-gray-400"}`}>
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${hasTax ? "translate-x-6" : "translate-x-1"}`} />
                            </button>

                            <span className="text-sm text-gray-400">27%</span>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};