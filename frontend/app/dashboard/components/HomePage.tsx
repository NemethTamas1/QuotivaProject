'use client';

import { useEffect, useState } from "react";
import { whoAmI } from "@/lib/auth";

interface User {
    name: string
}

export default function HomePage() {

    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await whoAmI();
                setUser(userData);
            } catch (error) {
                console.error("Nem sikerült lekérni a felhasználót:", error);
            } finally{
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (!user) return null;

    return (

        <>
            <h1 className="text-3xl p-6">Üdvözöljük, {user.name}👋</h1>
        </>
    );
}