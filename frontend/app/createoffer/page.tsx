'use client';

import { useState, useEffect, useMemo } from "react";
import { useForm, useFieldArray, SubmitHandler, FormProvider, useWatch } from "react-hook-form";
import { showError, showSuccess } from "@/lib/toast";
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
import { profileType } from "../dashboard/types/types";
import SumCalculations from "./components/SumCalculations";
import HasNoProfile from "../components/HasNoProfile";

export default function CreateOfferPage() {

    const [loading, setLoading] = useState<boolean>(true);
    const [profiles, setProfiles] = useState<profileType[]>([]);
    const [hasNoProfile, setHasNoProfile] = useState<boolean>(false);

    const methods = useForm<CreateOfferForm>({
        defaultValues: {
            status: "pending",
            items: [],
            "tax_percent": 27,
            "currency": "HUF",
        },
    });



    const router = useRouter();
    const { selectedUserProfile, user } = useAuth();
    const { control, register, handleSubmit } = methods;
    const { fields, append, remove, update } = useFieldArray({
        control,
        name: "items",
    });

    const allFields = useWatch({
        control: control
    });

    const items = useWatch({
        name: "items",
        control: control
    });

    const missingInputs = useMemo(() => {
        const list = [];

        if (!allFields.client_name) list.push("Név");
        if (!allFields.client_email) list.push("Email");
        if (!allFields.client_zip) list.push("Irányítószám");
        if (!allFields.client_city) list.push("Város");
        if (!allFields.client_street) list.push("Utca");
        if (!allFields.client_house_number) list.push("Házszám");
        if (!allFields.offer_name) list.push("Ajánlat neve");

        if (items.length === 0) list.push("Legalább egy tétel");

        return list;
    }, [allFields]);

    const tax = useWatch({
        name: "tax_percent",
        control: control
    });

    const currency = useWatch({
        name: "currency",
        control: control
    });



    const fetchProfiles = async () => {
        try {
            setLoading(true);
            const res = await http.get('/api/user-profiles');
            const items: profileType[] = res.data?.data ?? [];
            setProfiles(items);

            if (items.length == 0) setHasNoProfile(true);
        } catch (e) {
            throw new Error("Hiba történt a profilok betöltésekor.");
        } finally {
            setLoading(false);
        }
    };

    const [editingItem, setEditingItem] =
        useState<OfferItem | null>(null);

    useEffect(() => {
        if (!user) {
            router.push("/")
        };
        fetchProfiles();
    }, [user]);

    const onSubmit: SubmitHandler<CreateOfferForm> = async (data) => {

        try {

            if (missingInputs.length > 0) {
                showError(`Kérem töltse ki a következő mezőket: ${missingInputs.join(", ")}`);
                return;
            }

            const payload = {
                ...data,
                profile_id: selectedUserProfile?.id,
                send_email: data.action_type === "email_only" || data.action_type === "both",
            };
            const response = await http.post(`/api/offers`, payload);

            if (response.status == 201) {
                showSuccess("Sikeres ajánlat létrehozás!")
            } else {
                throw new Error("Sikertelen létrehozás backenden");
            }

            if (data.action_type === 'pdf_only' || data.action_type === 'both') {
                try {
                    const doc = <OfferPDFDocument data={data} profile={selectedUserProfile} user={user} />;
                    const blob = await pdf(doc).toBlob();

                    const pdfUrl = URL.createObjectURL(blob);

                    const link = document.createElement('a');
                    link.href = pdfUrl;
                    link.download = `ajanlat_${data.client_name.replace(/\s+/g, '_')}.pdf`;
                    document.body.appendChild(link);
                    link.click();

                    document.body.removeChild(link);
                    URL.revokeObjectURL(pdfUrl);
                } catch (pdfError) {
                    console.error("Error generating or downloading PDF", pdfError);
                }
            }

        } catch (error) {
            console.error("Error while creating offer", error);
        }
    };


    if (loading || !user) {
        return (
            <>
                <NavBar />
                <div className="min-h-screen bg-black flex items-center justify-center text-white">
                    <p>Betöltés...</p>
                </div>
            </>
        );
    }

    if (hasNoProfile) {
        return (
            <>
                <NavBar />
                <HasNoProfile />
            </>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            {/* Main */}
            <NavBar />
            <main className="px-4 py-10">
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto max-w-7xl text-black rounded-lg p-2 lg:p-6">

                        <CustomerDetails register={register} />

                        <OfferDetails />

                        <OfferItemDetails append={append} />

                        <OfferItemsTable fields={fields} remove={remove} setEditingItem={setEditingItem} />

                        <SumCalculations items={items} tax={tax} currency={currency} />

                        <div className="w-full flex flex-col lg:flex-row gap-4 justify-center items-center my-7">
                            {/* 1. OPCIÓ: Csak mentés és PDF */}
                            <button
                                type="submit"
                                onClick={() => methods.setValue('action_type', 'pdf_only')}
                                className="w-full lg:w-auto px-6 bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition"
                            >
                                Mentés és PDF letöltése
                            </button>

                            {/* 2. OPCIÓ: Mentés és Email küldés */}
                            <button
                                type="submit"
                                onClick={() => methods.setValue('action_type', 'email_only')}
                                className="w-full lg:w-auto px-6 bg-purple-600 text-white font-semibold py-3 rounded hover:bg-purple-700 transition"
                            >
                                Mentés és Küldés Emailben
                            </button>

                            {/* 3. OPCIÓ: Mindkettő egyszerre */}
                            <button
                                type="submit"
                                onClick={() => methods.setValue('action_type', 'both')}
                                className="w-full lg:w-auto px-6 bg-green-600 text-black font-semibold py-3 rounded hover:bg-green-700 transition"
                            >
                                Mentés, PDF + Email küldése
                            </button>
                        </div>
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