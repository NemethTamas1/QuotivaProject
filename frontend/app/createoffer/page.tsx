'use client';

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import type { CreateOfferForm } from "./types";
import type { QuantityType } from "./types";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";

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
        quantity_type: "darab",
        labor_unit_price: 0,
        material_unit_price: 0,
    });

    const { register, handleSubmit, control } = useForm<CreateOfferForm>({
        defaultValues: {
            status: "pending",
            currency: "HUF",
            tax_percent: 27,
            items: [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "items",
    });

    const onSubmit: SubmitHandler<CreateOfferForm> = (data) => {
        console.log("SUBMIT PAYLOAD: ", data);
    };

    useEffect(() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        console.log("USE EFFECT FUT");
        console.log("API_URL:", process.env.NEXT_PUBLIC_API_URL);
    }, []);

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            {/* NavBar */}
            <nav className="w-full py-4 flex justify-between px-3 items-center backdrop-blur-md bg-black">
                <Link href="/" className="text-3xl font-semibold tracking-wide">
                    Quotiva
                </Link>

                <div className="hidden md:flex gap-6 text-2xl">
                    <Link href="#" className="hover:text-green-400 transition">Új árajánlat</Link>
                    <Link href="#" className="hover:text-green-400 transition">Árajánlataim</Link>
                    <Link href="#" className="hover:text-green-400 transition">Belépés</Link>
                </div>

                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                </div>
            </nav>
            {isOpen && (
                <div
                    className={
                        `md:hidden overflow-hidden transition-all duration-300 bg-black border-t border-white/10
      ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`
                    }
                >
                    <div className="flex flex-col gap-4 px-4 py-4 text-xl">
                        <a href="#" className="hover:text-green-400 transition">Új árajánlat</a>
                        <a href="#" className="hover:text-green-400 transition">Árajánlataim</a>
                        <a href="#" className="hover:text-green-400 transition">Belépés</a>
                    </div>
                </div>
            )}


            {/* Main */}
            <main className="flex-1 px-4 py-10 flex justify-center">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-7xl bg-white text-black rounded-lg p-6 space-y-6">
                    {/* A J Á N L A T */}
                    <h1 className="text-2xl font-semibold text-center">
                        Új árajánlat
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1">Ajánlat száma</label>
                            <input
                                {...register("offer_number")}
                                className="w-full border rounded px-3 py-2"
                                placeholder="OFF-2025-002"
                            />
                        </div>

                        <div>
                            <label className="block mb-1">Ajánlat neve</label>
                            <input
                                {...register("offer_name")}
                                className="w-full border rounded px-3 py-2"
                                placeholder="Kazán szerelés"
                            />
                        </div>

                        <div>
                            <label className="block mb-1">Keltezés</label>
                            <input
                                type="date"
                                {...register("dated")}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block mb-1">Érvényes eddig</label>
                            <input
                                type="date"
                                {...register("valid_until")}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                    </div>


                    {/* Ü G Y F É L  A D A T O K */}
                    <h2 className="text-xl font-medium">Ügyfél adatok</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            {...register("client_name")}
                            placeholder="Cégnév"
                            className="border rounded px-3 py-2"
                        />
                        <input
                            {...register("client_email")}
                            placeholder="Email"
                            type="email"
                            className="border rounded px-3 py-2"
                        />
                        <input
                            {...register("client_phone")}
                            placeholder="Telefon"
                            className="border rounded px-3 py-2"
                        />
                        <input
                            {...register("client_tax_number")}
                            placeholder="Adószám"
                            className="border rounded px-3 py-2"
                        />

                        <input
                            {...register("client_zip", { valueAsNumber: true })}
                            placeholder="Irányítószám"
                            className="border rounded px-3 py-2"
                        />

                        <input
                            {...register("client_city")}
                            placeholder="Város"
                            className="border rounded px-3 py-2"
                        />

                        <input
                            {...register("client_street")}
                            placeholder="Utca"
                            className="border rounded px-3 py-2"
                        />

                        <input
                            {...register("client_house_number")}
                            placeholder="Házszám"
                            className="border rounded px-3 py-2"
                        />
                    </div>

                    {/* T É T E L E K */}
                    <h2 className="text-xl font-medium">Tétel hozzáadása</h2>

                    <div className="rounded-lg border p-4 grid grid-cols-1 md:grid-cols-6 gap-3">
                        <div className="md:col-span-2">
                            <label className="block text-sm mb-1">Tétel megnevezése</label>
                            <input
                                value={newItem.name}
                                onChange={(e) =>
                                    setNewItem({ ...newItem, name: e.target.value })
                                }
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm mb-1">Mennyiség</label>
                            <input
                                type="number"
                                value={newItem.quantity}
                                onChange={(e) =>
                                    setNewItem({ ...newItem, quantity: Number(e.target.value) })
                                }
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm mb-1">Egység</label>
                            <select
                                value={newItem.quantity_type}
                                onChange={(e) =>
                                    setNewItem({
                                        ...newItem,
                                        quantity_type: e.target.value as "ora" | "darab" | "fm" | "m2" | "m3" | "kg",
                                    })
                                }
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="darab">db</option>
                                <option value="ora">óra</option>
                                <option value="fm">fm</option>
                                <option value="m2">m2</option>
                                <option value="ora">óra</option>
                                <option value="kg">kg</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm mb-1">Munkadíj egységár</label>
                            <input
                                type="number"
                                value={newItem.labor_unit_price}
                                onChange={(e) =>
                                    setNewItem({
                                        ...newItem,
                                        labor_unit_price: Number(e.target.value),
                                    })
                                }
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm mb-1">Anyag egységár</label>
                            <input
                                type="number"
                                value={newItem.material_unit_price}
                                onChange={(e) =>
                                    setNewItem({
                                        ...newItem,
                                        material_unit_price: Number(e.target.value),
                                    })
                                }
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        <div className="flex items-end">
                            <button
                                type="button"
                                onClick={() => {
                                    append(newItem);
                                    setNewItem({
                                        name: "",
                                        quantity: 1,
                                        quantity_type: "darab",
                                        labor_unit_price: 0,
                                        material_unit_price: 0,
                                    });
                                }}
                                className="w-full bg-green-500 text-black py-2 rounded"
                            >
                                Hozzáad
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
                    >
                        Ajánlat mentése
                    </button>
                </form>
            </main>
        </div>
    );
}