<?php

namespace App\Http\Controllers;

use App\Models\Offer;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOfferRequest;
use App\Http\Requests\UpdateOfferRequest;
use App\Http\Resources\OfferResource;
use App\Models\OfferItem;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use PhpParser\Node\Stmt\TryCatch;

class OfferController extends Controller
{
    public function index()
    {
        $offers = Offer::with("items")->get();

        return OfferResource::collection($offers);
    }

    public function store(StoreOfferRequest $request)
    {
        $data = $request->validated();
        $userProfileId = $request->input('user_profile_id');

        DB::beginTransaction();

        try {
            $user = Auth::user();

            if (!$user) {
                return response()->json([
                    "message" => "Unauthorized"
                ], 401);
            }
            // Ajánlat létrehozás
            $offer = Offer::create([
                "profile_id" => $userProfileId,
                "offer_number" => $this->generateOfferNumber(),
                "offer_name" => $data["offer_name"],
                "status" => $data["status"] ?? "pending",
                "dated" => $data["dated"],
                "valid_until" => $data["valid_until"],
                "currency" => $data["currency"],
                "tax_percent" => $data["tax_percent"],

                "client_name" => $data["client_name"],
                "client_email" => $data["client_email"] ?? null,
                "client_phone" => $data["client_phone"] ?? null,
                "client_tax_number" => $data["client_tax_number"] ?? null,
                "client_zip" => $data["client_zip"] ?? null,
                "client_city" => $data["client_city"] ?? null,
                "client_street" => $data["client_street"] ?? null,
                "client_house_number" => $data["client_house_number"] ?? null,
            ]);

            $netTotal = 0;

            // Tételek
            foreach ($data["items"] as $item) {
                $laborTotal = $item["quantity"] * $item["labor_unit_price"];
                $materialTotal = $item["quantity"] * $item["material_unit_price"];


                OfferItem::create([
                    "offer_id" => $offer->id,
                    "name" => $item["name"] ?? null,
                    "quantity" => $item["quantity"],
                    "quantity_type" => $item["quantity_type"],
                    "labor_unit_price" => $item["labor_unit_price"],
                    "material_unit_price" => $item["material_unit_price"],
                ]);

                $netTotal += ($laborTotal + $materialTotal);
            }

            // Ajánlat nettó és bruttó összegzése
            $grossTotal = $netTotal * (1 + $offer->tax_percent / 100);

            $offer->update([
                "net_total" => $netTotal,
                "gross_total" => $grossTotal,
            ]);

            DB::commit();

            return response()->json([
                "message" => "Offer created successfully",
                "offer" => $offer->load("items"),
            ], 201);
        } catch (\Exception $ex) {
            DB::rollback();

            return response()->json([
                "message" => "Failed to create offer",
                "error" => $ex->getMessage(),
            ], 500);
        }
    }

    public function show(Offer $offer)
    {
        //
    }

    public function update(UpdateOfferRequest $request, Offer $offer)
    {
        //
    }

    public function destroy(Offer $offer)
    {
        //
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
