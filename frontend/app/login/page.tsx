'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // function getCookie(name: string): string | undefined {
    //     if (typeof document === 'undefined') return undefined;

    //     const value = `; ${document.cookie}`;
    //     const parts = value.split(`; ${name}=`);

    //     if (parts.length === 2) {
    //         const lastPart = parts.pop();
    //         if (lastPart) {
    //             return decodeURIComponent(lastPart.split(';').shift() || '');
    //         }
    //     }
    //     return undefined;
    // }

    const login = async () => {
        const api = process.env.NEXT_PUBLIC_API_URL;

        try {
            await fetch(`${api}/sanctum/csrf-cookie`, { credentials: 'include' });

            const res = await fetch(`${api}/login`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (res.ok) {
                console.log("Sikeres bejelentkezés!");
                //router.push('/dashboard');
            } else {
                const errorData = await res.json();
                console.error("Login hiba:", errorData);
            }
        } catch (err) {
            console.error("Hiba:", err);
        }
    };

    return (
        <>
            <div>
                <div className="relative w-3/12 mx-auto lg:my-20">

                    <div className="absolute -inset-1.5 bg-green-500 rounded-md blur-sm opacity-25 z-0"></div>
                    <div className="relative bg-gray-900 rounded-md mx-auto">
                        <h1 className="text-center text-3xl text-green-400 my-5 lg:pt-5 font-semibold" style={{
                            textShadow: "0px 0px 20px rgba(34, 197, 94, 1"
                        }}>Bejelentkezés</h1>

                        {/* Inputok */}
                        <div className="mx-auto w-7/12 flex flex-col gap-5">

                            <div className="flex flex-col gap-5">
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="Email" className="text-black p-3 rounded-md" />
                                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Jelszó" className="text-black p-3 rounded-md" />
                                <p className="ml-auto text-green-400">Elfelejtett jelszó?</p>
                            </div>

                            <button onClick={login} className="bg-green-400 mx-auto p-4 rounded-md lg:mb-5 text-black text-lg font-semibold">Bejelentkezés</button>
                        </div>

                    </div>
                </div>

            </div>
        </>
    );

};