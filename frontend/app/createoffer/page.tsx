'use client';

import { useState, useEffect } from "react";
import { useForm, useFieldArray, SubmitHandler, FormProvider } from "react-hook-form";

import CustomerDetails from "./components/CustomerDetails";
import OfferDetails from "./components/OfferDetails";


import { OfferItem, type CreateOfferForm } from "./types";
import EditItem from "../components/EditItem";
import OfferItemDetails from "./components/OfferItemDetails";
import OfferItemsTable from "./components/OfferItemsTable";
import { useRouter } from "next/navigation";
import { whoAmI } from "@/lib/auth";

export default function CreateOfferPage() {

    const methods = useForm<CreateOfferForm>({
        defaultValues: {
            status: "pending",
            items: [],
            "tax_percent": 27,
            "currency": "HUF",
        },
    });

    const { control, register, handleSubmit } = methods;

    const { fields, append, remove, update } = useFieldArray({
        control,
        name: "items",
    });

    const [editingItem, setEditingItem] =
        useState<OfferItem | null>(null);
    
    useEffect(() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        console.log("USE EFFECT FUT");
        console.log("API_URL:", process.env.NEXT_PUBLIC_API_URL);
    }, []);

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

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            {/* Main */}
            <main className="px-4 py-10">
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto max-w-7xl text-black rounded-lg p-6">

                        <CustomerDetails register={register} />

                        <OfferDetails />

                        <OfferItemDetails append={append} />

                        <OfferItemsTable fields={fields} remove={remove} setEditingItem={setEditingItem}/>
                        
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