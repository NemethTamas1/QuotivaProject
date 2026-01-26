'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import http from '@/lib/http';
import { get } from 'http';
import { init } from 'next/dist/compiled/webpack/webpack';
import { useRouter } from 'next/navigation';

interface User {
    id: number;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    loading: boolean;
    login: (credentials: Partial<User>) => Promise<{ success: boolean; message?: string }>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {

        const initAuth = async () => {
            const savedToken = sessionStorage.getItem('token');

            if (savedToken) {
                setToken(savedToken);
                await getUserData(savedToken);
            }

            setLoading(false);
        };

        initAuth();

    }, []);

    const getUserData = async (authToken: string) => {
        console.log("getUserData meghívva.");
        try {
            const res = await http.get('/api/user', {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });

            if (res.status == 200) {
                setUser(res.data);
                console.log("user betöltve: ", res.data);
            }
        } catch (error) {
            console.error("Hiba a felhasználói adatok lekérésekor", error);
            sessionStorage.removeItem('token');
            setToken(null);
        }
    };

    const login = async (credentials: Partial<User>) => {
        try {
            const res = await http.post('/api/authenticate', credentials);
            const { token } = res.data.data;

            if (res.status == 200) {
                setToken(token);
                console.log("token mentés: ", token);
                sessionStorage.setItem('token', token);

                getUserData(token);

                return { success: true };
            };
            return { success: false, message: 'Invalid credentials' };

        } catch (error) {
            return { success: false, message: 'Login failed' };
        }
    }

    const logout = () => {
        setUser(null);
        setToken(null);
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        router.push("/");
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );

};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;

};