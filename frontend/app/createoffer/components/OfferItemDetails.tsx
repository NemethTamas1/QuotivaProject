'use client';

import type { OfferItemInput } from "@/app/createoffer/types";
import { useState } from "react";

interface Props{
    append: (item: OfferItemInput) => void;
}

export default function OfferItemDetails({ append }: Props) {

    const [newItem, setNewItem] = useState<OfferItemInput>({
        name: "",
        quantity: 1,
        quantity_type: "db",
        labor_unit_price: 0,
        material_unit_price: 0,
    });

    // Nettó sorösszeg
    const netLaborTotal = newItem.quantity > 0 && newItem.labor_unit_price > 0
        ? newItem.quantity * newItem.labor_unit_price
        : 0;

    const hasValidLaborValue: boolean =
        newItem.quantity > 0 &&
        newItem.labor_unit_price > 0;

    // Bruttó sorösszeg
    const netMaterialTotal = newItem.quantity > 0 && newItem.material_unit_price > 0
        ? newItem.quantity * newItem.material_unit_price
        : 0;

    const hasValidMaterialValue: boolean =
        newItem.quantity > 0 &&
        newItem.material_unit_price > 0;

    return (
        <>
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
                                console.log("Appending new item: ", newItem);
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
        </>
    );
};