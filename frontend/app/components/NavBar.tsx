'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { whoAmI } from "@/lib/auth"
import { useRouter } from "next/navigation"

export default function NavBar() {



  const handleCreateOfferLink = async () => {
    try {
      await whoAmI();
      router.push("/createoffer");
    } catch (error) {
      router.push("/login");
    }
  };

  const handleLogOut = async () => {
    try {
      const api = process.env.NEXT_PUBLIC_API_URL;

      // CSRF TOKEN
      await fetch(`${api}/sanctum/csrf-cookie`, {
        credentials: 'include'
      });
      const token = decodeURIComponent(
        document.cookie
          .split('; ')
          .find(c => c.startsWith('XSRF-TOKEN='))
          ?.split('=')[1] ?? ''
      );

      const res = await fetch(`${api}/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        }
      });
      alert("sikeres kijelentkezés")
      setIsLoggedIn(false);
      router.push("/");

    } catch (error) {
      console.error("kijelentkezési hiba: ", error)
    }
  };

  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  const router = useRouter();

  useEffect(() => {
    whoAmI()
      .then(() => setIsLoggedIn(true))
      .catch(() => setIsLoggedIn(false))
  }, [])

  return (
    <>
      <nav className="w-full py-4 flex justify-between px-3 items-center backdrop-blur-md bg-[0a0a0a]">
        <Link href="/" className="text-3xl font-semibold tracking-wide">
          Quotiva
        </Link>

        <div className="hidden md:flex gap-6 text-2xl">
          <button onClick={handleCreateOfferLink}>Új árajánlat</button>

          <Link href="/offers">Árajánlataim</Link>

          {isLoggedIn === null ? null : isLoggedIn ? (
            <button onClick={handleLogOut}>Kijelentkezés</button>
          ) : (
            <Link href="/login">Belépés</Link>
          )
          }

        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          <FontAwesomeIcon icon={faBars} />
        </button>
      </nav>

      {isOpen && (
        <div className="md:hidden bg-black border-t border-white/10">
          <div className="flex flex-col gap-4 px-4 py-4 text-xl">
            {isLoggedIn ? (
              <button onClick={handleCreateOfferLink}>Új árajánlat</button>
            ) : (
              <button onClick={() => router.push("/login")}>Új árajánlat</button>
            )}

            {isLoggedIn ? (
              <button onClick={handleLogOut}>Kijelentkezés</button>
            ) : (
              <Link href="/login">Belépés</Link>
            )}

            <Link href="/offers">Árajánlataim</Link>

            <Link href="/login">Belépés</Link>
          </div>
        </div>
      )}
    </>
  )
}
