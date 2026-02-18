'use client'

import http from "@/lib/http";
import OfferStatus from "./OfferStatus";
import { useState, useEffect } from "react";
import { MyOfferProps } from "../types/types";
import { useAuth } from "@/context/AuthContext";
import HasNoProfile from "@/app/components/HasNoProfile";
import { faRightLong } from "@fortawesome/free-solid-svg-icons/faRightLong";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons/faLeftLong";
export default function MyOffers() {

    const [data, setData] = useState<MyOfferProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { selectedUserProfile } = useAuth();
    const [currentPage, setCurrentPage] = useState<number>(0);

    const pageSize = 5;
    const start = currentPage * pageSize;
    const end = start + pageSize;


    const getOfferDatas = async () => {
        setLoading(true);
        try {
            const res = await http.get('/api/offers');
            setData(res.data.data);
            console.log("Teszt ajánlatok sikeresen lekérve.");

        } catch (error) {
            console.error("Hiba a teszt ajánlatok lekérésekor: ", error);
        } finally {
            setLoading(false);
        }
    };

    const userProfileOffers = data.filter(offer => offer.profile_id === selectedUserProfile?.id);
    const currentOffers = userProfileOffers.slice(start, end);

    const nextPage = () => {
        if ((currentPage + 1) * pageSize < userProfileOffers.length) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(prev => prev - 1);
        }
    };

    useEffect(() => {
        getOfferDatas();
        setCurrentPage(0);
    }, [selectedUserProfile?.id]);


    return (
        <>
            <h1 className="text-center font-semibold text-2xl my-7">{selectedUserProfile?.company_name} kiadott árajánlatai</h1>

            {loading ? (
                <div className="flex justify-center items-center my-20">
                    <p className="text-xl animate-pulse">Adatok betöltése...</p>
                </div>
            ) : (
                <div className="bg-[#1a1a1a] w-full flex flex-col gap-4 px-2 animate-in fade-in duration-500">

                    {selectedUserProfile === null && <HasNoProfile />}

                    {selectedUserProfile !== null && userProfileOffers.length === 0 ? (
                        <div className="bg-gray-800 rounded-md mx-5 my-10 p-5 text-center shadow-inner">
                            <p className="text-gray-300">
                                A(z) <span className="font-bold text-white">{selectedUserProfile?.company_name}</span> még egyetlen ajánlatot sem adott ki.
                            </p>
                        </div>
                    ) : (
                        currentOffers.map((offer) => (
                            <OfferStatus key={offer.id} offer={offer} onRefresh={getOfferDatas} />
                        ))
                    )}

                    <div className="justify-center flex gap-10 mb-10">
                        <button onClick={prevPage} className="text-4xl"><FontAwesomeIcon icon={faLeftLong} /></button>
                        <p className="text-3xl">{currentPage + 1}. oldal</p>
                        <button onClick={nextPage} className="text-4xl"><FontAwesomeIcon icon={faRightLong} /></button>
                    </div>
                </div>
            )}
        </>
    );
};