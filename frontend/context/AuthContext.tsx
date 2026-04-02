'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import http from '@/lib/http';
import { useRouter } from 'next/navigation';
import { profileType } from '@/app/dashboard/types/types';

export interface User {
    id: number;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    loading: boolean;
    register: (credentials: IRegisterCredentials) => void;
    login: (credentials: Partial<User>) => Promise<{ success: boolean; message?: string }>;
    logout: () => void;

    selectedUserProfile: profileType | null;
    setSelectedUserProfile: (profile: profileType | null) => void;
}

interface IRegisterCredentials {
    name: string,
    email: string,
    password:string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedUserProfile, setSelectedUserProfile] = useState<profileType | null>(null);
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
        try {
            const res = await http.get('/api/user', {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });

            if (res.status == 200) {
                setUser(res.data);
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
            
            if (res.status == 200) {
                const { token, user } = res.data.data;
                setToken(token);
                setUser(user);
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('user', JSON.stringify(user));

                await getUserData(token);

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
        setSelectedUserProfile(null);
        router.push("/");
    };

    const register = async(credentials: IRegisterCredentials) => {
        try {
            const res = await http.post("/api/register", credentials);
            alert(`A(z) ${credentials.email} sikeresen regisztrált.`);
        } catch (error) {
            alert("Sikertelen regisztráció.")
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, register, login, logout, selectedUserProfile, setSelectedUserProfile}}>
            {children}
        </AuthContext.Provider>
    );

};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;

};