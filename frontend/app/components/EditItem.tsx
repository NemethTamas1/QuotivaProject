'use client'

import { useEffect, useState } from "react";
import { OfferItem } from "../createoffer/types";

interface Props {
    item: OfferItem;
    onSave: (item: OfferItem) => void;
    onClose: () => void;
}

export default function EditItem({ item, onSave, onClose }: Props) {
    const [form, setForm] = useState(item);

    useEffect(() => {
        setForm(item);
    }, [item]);

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="w-5/12 rounded-md bg-white p-6 space-y-3 text-black">
                <h2 className="text-xl font-bold">Tétel szerkesztése</h2>

                <input
                    value={form.name}
                    onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                    }
                    className="w-full border p-2"
                />

                <input
                    type="number"
                    value={form.quantity}
                    onChange={(e) =>
                        setForm({ ...form, quantity: Number(e.target.value) })
                    }
                    className="w-full border p-2"
                />

                <input
                    type="number"
                    value={form.labor_unit_price}
                    onChange={(e) =>
                        setForm({ ...form, labor_unit_price: Number(e.target.value) })
                    }
                    className="w-full border p-2"
                />

                <input
                    type="number"
                    value={form.material_unit_price}
                    onChange={(e) =>
                        setForm({ ...form, material_unit_price: Number(e.target.value) })
                    }
                    className="w-full border p-2"
                />

                <div className="flex justify-end gap-2">
                    <button onClick={onClose}>Mégse</button>
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded"
                        onClick={() => onSave(form)}
                    >
                        Mentés
                    </button>
                </div>
            </div>
        </div>
    );
};


