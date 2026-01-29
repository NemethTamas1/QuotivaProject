'use client';

import { useState, useEffect } from "react";
import { useForm, useFieldArray, SubmitHandler, FormProvider } from "react-hook-form";
import { pdf } from '@react-pdf/renderer';
import { OfferPDFDocument } from "./pdfexport/OfferDocumentPDF";

import CustomerDetails from "./components/CustomerDetails";
import OfferDetails from "./components/OfferDetails";


import { OfferItem, type CreateOfferForm } from "./types";
import EditItem from "../components/EditItem";
import OfferItemDetails from "./components/OfferItemDetails";
import OfferItemsTable from "./components/OfferItemsTable";
import http from "@/lib/http";
import NavBar from "../components/NavBar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function CreateOfferPage() {

    const methods = useForm<CreateOfferForm>({
        defaultValues: {
            status: "pending",
            items: [],
            "tax_percent": 27,
            "currency": "HUF",
        },
    });

    const { user } = useAuth();
    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(true);

    const {selectedUserProfile} = useAuth();

    const { control, register, handleSubmit } = methods;

    const { fields, append, remove, update } = useFieldArray({
        control,
        name: "items",
    });

    const [editingItem, setEditingItem] =
        useState<OfferItem | null>(null);

    useEffect(() => {
        if (!user) router.push("/");
        else setLoading(false);
    }, []);

    const onSubmit: SubmitHandler<CreateOfferForm> = async (data) => {

        try {

            const payload = {...data, user_profile_id: selectedUserProfile?.id};
            const response = await http.post(`/api/offers`, payload);

            if (response.status !== 201) {
                throw new Error("Sikertelen létrehozás backenden");
            }

            try {
                const doc = <OfferPDFDocument data={data} profile={selectedUserProfile} user={user}/>;
                const blob = await pdf(doc).toBlob();   

                const pdfUrl = URL.createObjectURL(blob);

                const link = document.createElement('a');
                link.href = pdfUrl;
                link.download = `ajanlat_${data.client_name.replace(/\s+/g, '_')}.pdf`;
                document.body.appendChild(link);
                link.click();

                document.body.removeChild(link);
                URL.revokeObjectURL(pdfUrl);
                console.log("PDF download started.");
            } catch (pdfError) {
                console.error("Error generating or downloading PDF", pdfError);
            }

        } catch (error) {
            console.error("Error while creating offer", error);
        }
    };


    if (loading || !user) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                <p>Betöltés...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            {/* Main */}
            <NavBar />
            <main className="px-4 py-10">
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto max-w-7xl text-black rounded-lg p-6">

                        <CustomerDetails register={register} />

                        <OfferDetails />

                        <OfferItemDetails append={append} />

                        <OfferItemsTable fields={fields} remove={remove} setEditingItem={setEditingItem} />

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