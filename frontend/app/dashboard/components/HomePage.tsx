'use client';

import { useAuth } from "@/context/AuthContext";
import { LineChart } from "./MonthlyIncomeGraph";
import { useEffect, useMemo, useState } from "react";
import { profileType } from "../types/types";
import http from "@/lib/http";


export default function HomePage() {

    const { user, selectedUserProfile, setSelectedUserProfile } = useAuth();

    const [offers, setOffers] = useState<any[]>([]);
    const [chartWidth, setChartWidth] = useState(800);

    const fetchProfiles = async () => {
        try {
            const res = await http.get('/api/user-profiles');
            const items: profileType[] = res.data?.data ?? [];

            if (items.length > 0 && !selectedUserProfile) setSelectedUserProfile(items[0]);
        } catch (e) {
            console.error("Hiba történt a profilok betöltésekor.");
        }
    };

    const getOffers = async () => {
        try {
            const res = await http.get("/api/offers");
            setOffers(res.data.data);
        } catch (e) {
            console.error("Hiba az ajánlatok lekérésekor.");
        }
    };

    const formattedData = useMemo(() => {

        const months = ["Jan", "Feb", "Már", "Ápr", "Máj", "Jún", "Júl", "Aug", "Sze", "Okt", "Nov", "Dec"];
        const monthlyRevenue = months.map(m => ({ month: m, revenue: 0 }));

        offers.forEach(offer => {
            if (offer.status === 'accepted' && offer.profile_id === selectedUserProfile?.id) {
                const date = new Date(offer.dated);
                const monthIndex = date.getMonth();

                const total = offer.items.reduce((sum: number, item: any) =>
                    sum + (item.quantity * (item.labor_unit_price + item.material_unit_price)), 0
                );

                if (monthIndex >= 0 && monthIndex < 12) {
                    monthlyRevenue[monthIndex].revenue += total;
                }
            }

        })
        return monthlyRevenue;

    }, [offers]);


    const handleResize = () => {
        if (window.innerWidth < 1024) {
            setChartWidth(350);
        } else {
            setChartWidth(800);
        }
        window.addEventListener('resize', handleResize);
    };

    useEffect(() => {
        fetchProfiles();
        getOffers();
        handleResize();
    }, [])

    return (
        <>
            <h1 className="text-center md:text-left text-3xl p-6 text-white">Üdvözöljük, {user?.name}👋</h1>
            <h2 className="text-xl mb-3 lg:text-2xl font-semibold text-green-400 text-center md:text-left md:pl-10 lg:pl-6" style={{
                textShadow: "0px 0px 20px rgba(34, 197, 94, 1"
            }}>
                {selectedUserProfile?.company_name} éves bevétele
            </h2>
            <div className="bg-[#1a1a1a] lg:p-4 rounded-xl inline-block">
                <LineChart
                    data={formattedData}
                    width={chartWidth}
                    height={400}
                />
            </div>
        </>
    );
}