'use client'

import { useState } from "react";
import type { OfferItem } from "@/app/createoffer/types";

export default function EditItem({
    item,
    onSave,
    onClose,
}: {
    item: OfferItem
    onSave: (item: OfferItem) => void;
    onClose: () => void;
}) {
    const [form, setForm] = useState(item);
}



    return (
        <div className="w-5/12 rounded-md bg-white">
            <input type="text" placeholder="Tétel neve"/>
            <input type="text" placeholder="Mennyiség"/>
            <input type="text" placeholder="Munkadíj egységár"/>
            <input type="text" placeholder="Anyag egységár"/>
        </div>
    );
}