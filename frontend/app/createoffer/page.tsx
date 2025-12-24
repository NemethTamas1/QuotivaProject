'use client';

import { useState, useEffect } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import Link from "next/link";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";


import type { CreateOfferForm } from "./types";
import type { QuantityType } from "./types";

export default function CreateOfferPage() {

    const [isOpen, setIsOpen] = useState(false);

    const [newItem, setNewItem] = useState<{
        name: string,
        quantity: number,
        quantity_type: QuantityType,
        labor_unit_price: number,
        material_unit_price: number,
    }>({
        name: "",
        quantity: 1,
        quantity_type: "db",
        labor_unit_price: 0,
        material_unit_price: 0,
    });

    const { register, handleSubmit, control } = useForm<CreateOfferForm>({
        defaultValues: {
            status: "pending",
            currency: "HUF",
            tax_percent: 27, // Később ki kell venni, hogy állítani lehessen. (alanyi adómentes)
            items: [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "items",
    });

    const onSubmit: SubmitHandler<CreateOfferForm> = async (data) => {
        console.log("SUBMIT PAYLOAD: ", data);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        if (!apiUrl) {
            console.error("API URL is not defined");
            return;
        };

        try {
            const response = await fetch("http://localhost:8000/api/offers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(data),
            });


            if (!response.ok) {
                console.log("Offer creation failed.");
            }

            console.log("Offer created successfully.");

        } catch (error) {
            console.error("Error while creating offer", error);
        }
    };

    useEffect(() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        console.log("USE EFFECT FUT");
        console.log("API_URL:", process.env.NEXT_PUBLIC_API_URL);
    }, []);

    // Nettó sorösszeg
    const netLaborTotal = newItem.quantity > 0 && newItem.labor_unit_price > 0
        ? newItem.quantity * newItem.labor_unit_price
        : 0;

    // Bruttó sorösszeg
    const netMaterialTotal = newItem.quantity > 0 && newItem.material_unit_price > 0
        ? newItem.quantity * newItem.material_unit_price
        : 0;

    const hasValidLaborValue: boolean =
        newItem.quantity > 0 &&
        newItem.labor_unit_price > 0;

    const hasValidMaterialValue: boolean =
        newItem.quantity > 0 &&
        newItem.material_unit_price > 0;

        

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            {/* Main */}
            <main className="px-4 py-10">

                <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto max-w-7xl text-black rounded-lg p-6">

                    {/* M E G R E N D E L Ő  A D A T O K */}
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
                        </div>
                    </div>



                    {/* T É T E L E K */}
                    <h2 className="text-2xl font-semibold text-green-400" style={{
                        textShadow: "0px 0px 20px rgba(34, 197, 94, 1"
                    }}>Tétel hozzáadása</h2>

                    <div className="relative">
                        <div className="absolute -inset-1.5 bg-green-500 rounded-md blur-sm opacity-25"></div>
                        <div className="rounded-md p-3 flex flex-row bg-slate-900 my-7 relative">
                            <div className="mx-1 flex-col">
                                <label className="block font-semibold mb-1 text-white">Tétel megnevezése</label>
                                <input
                                    value={newItem.name}
                                    onChange={(e) =>
                                        setNewItem({ ...newItem, name: e.target.value })
                                    }
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>

                            <div className="mx-1 flex flex-col w-1/6">
                                <label className="block font-semibold text-white mb-1">Mennyiség</label> {/* input group? */}

                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        value={newItem.quantity}
                                        onChange={(e) =>
                                            setNewItem({ ...newItem, quantity: Number(e.target.value) })
                                        }
                                        className="w-5/12 border rounded px-3 py-2"
                                    />

                                    <select
                                        value={newItem.quantity_type}
                                        onChange={(e) =>
                                            setNewItem({
                                                ...newItem,
                                                quantity_type: e.target.value as "ora" | "db" | "fm" | "m2" | "m3" | "kg",
                                            })
                                        }
                                        className="w-5/12 border rounded px-3 py-2"
                                    >
                                        <option value="db">db</option>
                                        <option value="ora">óra</option>
                                        <option value="fm">fm</option>
                                        <option value="m2">m2</option>
                                        <option value="ora">óra</option>
                                        <option value="kg">kg</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block font-semibold text-white mb-1">Munkadíj egységár</label>
                                <input
                                    type="number"
                                    value={newItem.labor_unit_price}
                                    onChange={(e) =>
                                        setNewItem({
                                            ...newItem,
                                            labor_unit_price: Number(e.target.value),
                                        })
                                    }
                                    className="w-10/12 border rounded px-3 py-2"
                                />
                                {hasValidLaborValue && (
                                    <p className="opacity-50 text-white">= {netLaborTotal} Ft</p>
                                )}
                            </div>

                            <div>
                                <label className="block font-semibold text-white mb-1">Anyag egységár</label>
                                <input
                                    type="number"
                                    value={newItem.material_unit_price}
                                    onChange={(e) =>
                                        setNewItem({
                                            ...newItem,
                                            material_unit_price: Number(e.target.value),
                                        })
                                    }
                                    className="w-10/12 border rounded px-3 py-2"
                                />
                                {hasValidMaterialValue && (
                                    <p className="opacity-50 text-white">= {netMaterialTotal} Ft</p>
                                )}

                            </div>

                            <div className="flex align-middle items-end">
                                <button
                                    type="button"
                                    onClick={() => {
                                        append(newItem);
                                        setNewItem({
                                            name: "",
                                            quantity: 1,
                                            quantity_type: "db",
                                            labor_unit_price: 0,
                                            material_unit_price: 0,
                                        });
                                    }}
                                    className="w-full bg-green-500 text-black p-3 rounded"
                                >
                                    Hozzáad
                                </button>
                            </div>
                        </div>

                    </div>


                    {/* T É T E L E K  T Á B L Á Z A T A */}
                    <div className="relative w-full rounded-md">

                        <div className="absolute -inset-1.5 bg-green-500 rounded-md blur-sm opacity-25"></div>

                        <div className="relative rounded-md overflow-hidden bg-slate-900">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="text-green-500 p-3 text-lg">Tétel megnevezés</th>
                                        <th className="text-green-500 p-3 text-lg">Mennyiség</th>
                                        <th className="text-green-500 p-3 text-lg">Munkadíj egységár</th>
                                        <th className="text-green-500 p-3 text-lg">Anyag egységár</th>
                                        <th className="text-green-500 p-3 text-lg">Munkadíj</th>
                                        <th className="text-green-500 p-3 text-lg">Anyagdíj</th>
                                        <th className="text-green-500 p-3 text-lg">Műveletek</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fields.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="text-center py-10 text-lg text-slate-400">
                                                Nincsenek még hozzáadott tételek.
                                            </td>
                                        </tr>
                                    ) : (
                                        fields.map((field) => (
                                            <tr key={field.id} className="border-t text-center odd:bg-white even:bg-green-200">
                                                <td className="p-2 text-lg text-black">{field.name}</td>
                                                <td className="p-2 text-lg text-black">{field.quantity} Ft</td>
                                                <td className="p-2 text-lg text-black">{field.labor_unit_price} Ft</td>
                                                <td className="p-2 text-lg text-black">{field.material_unit_price} Ft</td>
                                                <td className="p-2 text-lg text-black">{field.quantity * field.labor_unit_price} Ft</td>
                                                <td className="p-2 text-lg text-black">{field.quantity * field.material_unit_price} Ft</td>
                                                <td className="p-2 text-lg text-black"><FontAwesomeIcon icon={faPenToSquare} size="xl" className="text-white bg-green-500 rounded-md py-1"/> <FontAwesomeIcon icon={faTrash} size="xl" className="text-white bg-red-500 rounded-md py-1"/></td>
                                            </tr> 
                                        ))
                                    )}
                                </tbody>

                            </table>
                        </div>
                    </div>



                    <button type="submit" className="w-2/12 bg-green-600 text-black font-semibold text-lg py-3 rounded hover:bg-green-700 transition my-7"
>
                        Ajánlat létrehozása
                    </button>
                </form>
            </main>
        </div>
    );
}