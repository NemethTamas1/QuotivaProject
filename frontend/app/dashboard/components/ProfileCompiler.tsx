'use client';

import { useState, useEffect } from "react";
import { profileType } from "../types/types";

interface Props {
    profile?: profileType;
    onSave: (item: Partial<profileType>) => void;
    onClose: () => void;
}

export default function ProfileCompiler({ profile, onSave, onClose }: Props) {
    const [formData, setFormData] = useState<Partial<profileType>>({
        user_id: 2,
        company_name: '',
        tax_number: '',
        company_phone: '',
        company_email: '',
        city: '',
        zip: null,
        ...profile
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-2xl text-slate-800">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {profile?.user_id ? 'Profil szerkesztése' : 'Új profil létrehozása'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Cégnév</label>
                        <input
                            name="company_name"
                            value={formData.company_name || ''}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Adószám</label>
                            <input
                                name="tax_number"
                                value={formData.tax_number || ''}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Irányítószám</label>
                            <input
                                name="zip"
                                value={formData.zip || ''}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Város</label>
                        <input
                            name="city"
                            value={formData.city || ''}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Utca</label>
                        <input
                            name="street"
                            value={formData.street || ''}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Házszám</label>
                        <input
                            name="house_number"
                            value={formData.house_number || ''}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Email cím</label>
                        <input
                            type="email"
                            name="company_email"
                            value={formData.company_email || ''}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Telefonszám</label>
                        <input
                            type="tel"
                            name="company_phone"
                            value={formData.company_phone || ''}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-8">
                    <button 
                        onClick={onClose}
                        className="px-5 py-2.5 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        Mégse
                    </button>
                    <button
                        onClick={() => onSave(formData)}
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors"
                    >
                        {profile?.user_id ? 'Változtatások mentése' : 'Profil létrehozása'}
                    </button>
                </div>
            </div>
        </div>
    );
}