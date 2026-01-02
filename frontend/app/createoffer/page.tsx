'use client';

import { useState, useEffect } from "react";
import { useForm, useFieldArray, SubmitHandler, FormProvider } from "react-hook-form";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import CustomerDetails from "./components/CustomerDetails";
import OfferDetails from "./components/OfferDetails";


import { OfferItem, type CreateOfferForm, type OfferItemInput } from "./types";
import EditItem from "../components/EditItem";
import OfferItemDetails from "./components/OfferItemDetails";

export default function CreateOfferPage() {
    const methods = useForm<CreateOfferForm>({
        defaultValues: {
            status: "pending",
            items: [],
            "tax_percent": 27,
            "currency": "HUF",
        },
    });

    const { register, handleSubmit, control } = methods;

    const { fields, append, remove, update } = useFieldArray({
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
            const response = await fetch(`${apiUrl}/api/offers`, {
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

    // Field figyelő
    useEffect(() => {
        console.log("Fields changed: ", fields);
    }, [fields]);

    const [editingItem, setEditingItem] =
        useState<OfferItem | null>(null);


    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            {/* Main */}
            <main className="px-4 py-10">
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto max-w-7xl text-black rounded-lg p-6">

                        <CustomerDetails register={register} />

                        <OfferDetails />

                        <OfferItemDetails append={append} />

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
                                                    <td className="p-2 text-lg text-black">
                                                        <FontAwesomeIcon
                                                            icon={faPenToSquare}
                                                            size="xl"
                                                            className="text-white bg-green-500 rounded-md py-1"
                                                            onClick={() => {
                                                                setEditingItem({
                                                                    _fieldId: field.id,
                                                                    name: field.name,
                                                                    quantity: field.quantity,
                                                                    quantity_type: field.quantity_type,
                                                                    labor_unit_price: field.labor_unit_price,
                                                                    material_unit_price: field.material_unit_price,
                                                                })
                                                            }} />
                                                        <FontAwesomeIcon
                                                            icon={faTrash}
                                                            size="xl"
                                                            className="text-white bg-red-500 rounded-md py-1"
                                                            onClick={() => {
                                                                const index = fields.findIndex(
                                                                    (f) => f.id === field.id
                                                                );

                                                                if (index !== -1) {
                                                                    remove(index);
                                                                }
                                                            }} />
                                                    </td>
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
                        {editingItem ? (
                            <EditItem
                                item={editingItem}
                                onClose={() => setEditingItem(null)}
                                onSave={(updatedItem) => {
                                    const index = fields.findIndex(
                                        (f) => f.id === updatedItem._fieldId
                                    );

                                    if (index !== -1) {
                                        update(index, {
                                            name: updatedItem.name,
                                            quantity: updatedItem.quantity,
                                            quantity_type: updatedItem.quantity_type,
                                            labor_unit_price: updatedItem.labor_unit_price,
                                            material_unit_price: updatedItem.material_unit_price,
                                        });
                                    }

                                    setEditingItem(null);
                                }}
                            />
                        ) : null}

                    </form>
                </FormProvider>
            </main>
        </div>
    );
}