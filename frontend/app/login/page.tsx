'use client';

import http from "@/lib/http";
import { useState } from "react";

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [csrfToken, setCsrfToken] = useState<string | null>(null);

    const getCsrfToken = async () => {
        try {
            const res = await http.get("/csrf-test", {
                withCredentials: true,
            });
            setCsrfToken(res.data.csrf);
            return res.data.csrf;

        } catch (error) {
            console.error('Error fetching CSRF token:', error);
        }
    };

    const handleLogin = async () => {
        try {
            const token = csrfToken || await getCsrfToken();
            if (!token) {
                throw new Error('CSRF token not available');
            }

            await http.post("/login", { email, password }, {
                headers: {
                    'X-CSRF-TOKEN': token,
                }
            })

            await getCsrfToken();

            alert('Sikeres bejelentkezés!');
        } catch (error) {
            console.error('Login error:', error);
            alert('Hiba a bejelentkezés során. Kérlek, próbáld újra.');
        }
    };

    const fetchMe = async () => {
        try {
            const res = await http.get("/api/me", {
                headers: {
                    Accept: "application/json",
                },
            });

            console.log(res.data.user);
            return res.data.user;
        } catch (error) {
            console.error("Fetch me error:", error);
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

                            <button onClick={handleLogin} className="bg-green-400 mx-auto p-4 rounded-md lg:mb-5 text-black text-lg font-semibold">Bejelentkezés</button>
                        </div>

                    </div>
                </div>

            </div>
        </>
    );
}