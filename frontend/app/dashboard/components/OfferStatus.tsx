'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MyOfferProps } from "../types/types";
import { faClock, faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import http from "@/lib/http";

export default function OfferStatus({ offer, onRefresh }: { offer: MyOfferProps, onRefresh: () => void }) {

    const acceptOffer = () => {
        try {
            console.log("Trying to accept offer with ID: ", offer.id);
            
            const res = http.put(`/api/offers/${offer.id}`, { status: "accepted" });
            
            onRefresh();
            console.log("Offer successfully updated!");

        } catch (error) {
            console.error("Error accepting offer: ", error);
        }
    };

    const rejectOffer = () => {
        try {
            console.log("Trying to reject offer with ID: ", offer.id);
            
            const res = http.put(`/api/offers/${offer.id}`, { status: "rejected" });
            
            onRefresh();
            console.log("Offer successfully updated!");

        } catch (error) {
            console.error("Error rejecting offer: ", error);
        }
    };

    const statusMap = {
        pending: {
            text: "Függőben",
            color: "text-yellow-400"
        },
        accepted: {
            text: "Elfogadva",
            color: "text-green-400"
        },
        rejected: {
            text: "Elutasítva",
            color: "text-red-400"
        },
    };

    const currentStatus = statusMap[offer.status as keyof typeof statusMap] || { text: offer.status, color: "text-gray-400" };
    return (
        <>
            <div className="flex flex-row justify-between items-center bg-[#1e1e1e] p-5 rounded-2xl text-white shadow-xl">

                {/* Bal oldal: Részletek */}
                <div className="flex flex-col gap-2">

                    <div className="flex items-center gap-3">
                        <div className="text-2xl">
                            {offer.status === 'pending' && <FontAwesomeIcon icon={faClock} className="text-yellow-500" />}
                            {offer.status === 'accepted' && <FontAwesomeIcon icon={faCircleCheck} className="text-green-500" />}
                            {offer.status === 'rejected' && <FontAwesomeIcon icon={faCircleXmark} className="text-red-600" />}
                        </div>
                        <h2 className="text-xl font-bold">{offer.offer_name}</h2>
                    </div>

                    <div className="flex">
                        <span className={`px-3 py-1 rounded-lg text-sm font-bold ${currentStatus.color}`}>
                            {currentStatus.text}
                        </span>
                    </div>

                    {offer.dated && (
                        <div className="text-gray-400 text-sm">
                            Kiadva: {offer.dated.toString()}
                        </div>
                    )}
                </div>

                {/* Jobb oldal: Gombok */}
                <div className="flex flex-col gap-2 min-w-[140px]">
                    {offer.status === 'pending' ? (
                        <>
                            <button onClick={acceptOffer} className="bg-[#00e676] hover:bg-green-500 text-black font-bold py-2 px-6 rounded-xl transition-all">
                                Elfogad
                            </button>
                            <button onClick={rejectOffer} className="bg-[#d50000] hover:bg-red-700 text-white font-bold py-2 px-6 rounded-xl transition-all">
                                Elutasít
                            </button>
                        </>
                    ) : (
                        <button className={`font-bold py-3 px-6 rounded-xl cursor-default ${offer.status === 'accepted' ? 'bg-[#00e676] text-black' : 'bg-[#d50000] text-white'}`}>
                            {offer.status === 'accepted' ? 'Elfogadva' : 'Elutasítva'}
                        </button>
                    )}
                </div>

            </div>
        </>
    );
};
