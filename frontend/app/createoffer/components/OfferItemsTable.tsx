'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { OfferItem, OfferItemInput } from "../types";

interface Props {
    fields: (OfferItemInput & { id: string })[];
    remove: (index: number) => void;
    setEditingItem: (item: OfferItem) => void;
};

export default function OfferItemsTable({ fields, remove, setEditingItem }: Props) {

    return (
        <>
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
        </>
    );
};