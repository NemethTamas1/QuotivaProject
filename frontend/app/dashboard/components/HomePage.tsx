'use client';

import { useAuth } from "@/context/AuthContext";


export default function HomePage() {

    const { user } = useAuth();


    return (
        <>
            <h1 className="text-3xl p-6">Üdvözöljük, {user?.name}👋</h1>
        </>
    );
}