'use client';

import { useState } from "react";

export default function RegisterPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleRegister = async () => {

        try {
            const api = process.env.NEXT_PUBLIC_API_URL;
            await fetch(`${api}/sanctum/csrf-cookie`, {
                method: 'GET',
                credentials: 'include',
            });

            const res = await fetch(`${api}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-XSRF-TOKEN': decodeURIComponent(
                        document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='))?.split('=')[1] || ''
                    ),
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                }),
                credentials: 'include',
            });

            if(res.ok) {
                console.log("Sikeres regisztráció!");
                alert("Sikeres regisztráció!");
            } else {
                const errorData = await res.json();
                console.error("Regisztrációs hiba:", errorData);
            }

        } catch (error) {
            console.error("Regisztrációs hiba:", error);
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
                        }}>Regisztráció</h1>

                        {/* Inputok */}
                        <div className="mx-auto w-7/12 flex flex-col">

                            <div className="flex flex-col gap-5">
                                <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" placeholder="Teljes név" className="text-black p-3 rounded-md" />
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="Email" className="text-black p-3 rounded-md" />
                                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Jelszó" className="text-black p-3 rounded-md" />
                            </div>

                            <button onClick={handleRegister} className="bg-green-400 mx-auto py-3 px-6 rounded-md lg:my-5 text-black text-lg font-semibold">Mentés</button>
                        </div>

                    </div>
                </div>

            </div>
        </>
    );
}