<?php

namespace App\Http\Controllers;

use App\Models\Offer;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOfferRequest;
use App\Http\Requests\UpdateOfferRequest;
use App\Http\Resources\OfferResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Services\Offer\OfferTotalsCalculator;
use App\Services\Offer\OfferItemService;
use App\Services\Offer\OfferMailService;
use App\Services\Offer\OfferService;

class OfferController extends Controller
{
    public function __construct(
        private OfferMailService $mailService,
        private OfferService $offerService,
    ) {}


    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->role === 'admin') {
            $offers = Offer::with(['items', 'profile'])->get();
            return OfferResource::collection($offers);
        }

        $offers = $user->offers()
            ->with(['items', 'profile'])
            ->latest()
            ->get();

        return OfferResource::collection($offers);
    }

    public function store(StoreOfferRequest $request)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(["message" => "Unauthorized"], 401);
        }

        $offer = $this->offerService->createOffer(
            $request->validated(),
            $request->input('profile_id'),
            $this->generateOfferNumber()
        );

        if ($request->send_email) {
            $this->mailService->sendOfferToClient($offer);
        }

        return response()->json([
            "message" => "Offer created successfully",
            "offer"   => $offer->load("items"),
        ], 201);
    }

    public function show(Offer $offer)
    {
        //
    }

    public function update(UpdateOfferRequest $request, Offer $offer)
    {
        $data = $request->validated();

        $offer->update([
            "status" => $data["status"],
        ]);

        return new OfferResource($offer->load("items"));
    }

    public function destroy(Offer $offer)
    {
        //
    }

    public function accept(Offer $offer)
    {
        if ($offer->status !== "pending") {
            return view("offerStatusAlreadyDecided", ["offer" => $offer]);
        };

        $offer->update([
            "status" => "accepted",
        ]);

        return view("offerStatusRedirect", ["offer" => $offer]);
    }

    public function reject(Offer $offer)
    {
        if ($offer->status !== "pending") {
            return view("offerStatusAlreadyDecided", ["offer" => $offer]);
        };

        $offer->update([
            "status" => "rejected",
        ]);

        return view("offerStatusRedirect", ["offer" => $offer]);
    }


    private function generateOfferNumber(): string
    {
        do {
            $number = str_pad(
                random_int(0, 999_999_999),
                9,
                '0',
                STR_PAD_LEFT
            );
        } while (Offer::where('offer_number', $number)->exists());

        return $number;
    }
}
