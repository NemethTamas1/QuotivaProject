'use client';

export default function LoginPage() {

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
                                <input type="text" name="email" placeholder="Email" className="p-3 rounded-md" />
                                <input type="password" name="password" placeholder="Jelszó" className="p-3 rounded-md" />
                                <p className="ml-auto text-green-400">Elfelejtett jelszó?</p>
                            </div>

                            <button className="bg-green-400 mx-auto p-4 rounded-md lg:mb-5 text-black text-lg font-semibold">Bejelentkezés</button>
                        </div>

                    </div>
                </div>

            </div>
        </>
    );
}