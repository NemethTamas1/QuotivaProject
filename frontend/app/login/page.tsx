'use client';

import { useState } from "react";
import Link from "next/dist/client/link";
import { useRouter } from "next/navigation";
import NavBar from "../components/NavBar";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();
    const { login } = useAuth();

    const handleLogin = async () => {
        setError(null);

        try {
            const res = await login({ email, password } as any);

            if (res.success) router.push("/dashboard");
            console.log("lefutott az átirányítás")
        } catch (error) {
            console.error('Hiba a bejelentkezés során', error);
            setError("Hiba a bejelentkezés során");
        }
    };

    return (
        <>
            <NavBar />
            <div>
                <div className="relative w-10/12 lg:w-3/12 my-36 mx-auto lg:my-20">

                    <div className="absolute -inset-1.5 bg-green-500 rounded-md blur-sm opacity-25 z-0"></div>
                    <div className="relative bg-gray-900 rounded-md mx-auto">
                        <h1 className="text-center text-3xl text-green-400 my-5 pt-8 lg:pt-5 font-semibold" style={{
                            textShadow: "0px 0px 20px rgba(34, 197, 94, 1"
                        }}>Bejelentkezés</h1>

                        {/* Inputok */}
                        <div className="mx-auto w-7/12 flex flex-col">

                            <div className="flex flex-col gap-5">
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="Email" className="text-black p-3 rounded-md" />
                                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Jelszó" className="text-black p-3 rounded-md" />
                                <p className="ml-auto text-green-400 mb-5">Elfelejtett jelszó?</p>
                            </div>

                            <button onClick={handleLogin} className="bg-green-400 mx-auto p-4 rounded-md mb-5 text-black text-lg font-semibold">Bejelentkezés</button>

                            <p className="text-center mb-5">Nincs fiókod? <Link href="/register" className="text-green-400">Regisztrálj itt</Link></p>
                        </div>

                    </div>
                </div>

            </div>
        </>
    );

};