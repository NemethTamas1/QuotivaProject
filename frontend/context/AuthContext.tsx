'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { whoAmI } from '@/lib/auth';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    user: any;
    isLoggedIn: boolean;
    loading: boolean;
    checkAuth: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<any>(null);
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    const checkAuth = async () => {
        try {
            const userData = await whoAmI();
            setUser(userData);
            setLoggedIn(true);
        } catch (error) {
            setUser(null);
            setLoggedIn(false);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            const api = process.env.NEXT_PUBLIC_API_URL;
            await fetch(`${api}/logout`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                }
            });

        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            setUser(null);
            setLoggedIn(false);
            router.push("/");
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, loading, checkAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );

};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;

};