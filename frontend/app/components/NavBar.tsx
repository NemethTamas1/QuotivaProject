'use client'

import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { useRouter } from "next/navigation"

export default function NavBar() {

  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <>
      <nav className="w-full py-4 flex justify-between px-3 items-center backdrop-blur-md bg-[0a0a0a]">
        <Link href="/" className="text-3xl font-semibold tracking-wide">
          Quotiva
        </Link>

        <div className="hidden md:flex gap-6 text-2xl">
          {user && (
            <Link href="/createoffer">Új árajánlat</Link>
          )}

          {user && (
            <Link href="/offers">Árajánlataim</Link>
          )}

          {user && (
            <Link href="/dashboard">Dashboard</Link>
          )}

          {user ? (
            <button onClick={logout}>Kijelentkezés</button>
          ) : (
            <Link href="/login">Belépés</Link>
          )}

        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          <FontAwesomeIcon icon={faBars} />
        </button>
      </nav>

      {isOpen && (
        <div className="md:hidden bg-black border-t border-white/10">
          <div className="flex flex-col gap-4 px-4 py-4 text-xl">
            {user && (
              <Link href="/createoffer">Új árajánlat</Link>
            )}

            {user ? (
              <button onClick={logout}>Kijelentkezés</button>
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
