<?php

namespace App\Services\Offer;

use App\Models\Offer;
use Illuminate\Support\Facades\DB;

class OfferService
{
    public function __construct(
        private OfferItemService $itemService,
        private OfferTotalsCalculator $calculator,
    ) {}

    public function createOffer(array $data, int $profileId, string $offerNumber): Offer
    {
        return DB::transaction(function () use ($data, $profileId, $offerNumber) {
            $offer = Offer::create([
                "profile_id"           => $profileId,
                "offer_number"         => $offerNumber,
                "offer_name"           => $data["offer_name"],
                "status"               => $data["status"] ?? "pending",
                "dated"                => $data["dated"],
                "valid_until"          => $data["valid_until"],
                "currency"             => $data["currency"],
                "tax_percent"          => $data["tax_percent"],
                "client_name"          => $data["client_name"],
                "client_email"         => $data["client_email"] ?? null,
                "client_phone"         => $data["client_phone"] ?? null,
                "client_tax_number"    => $data["client_tax_number"] ?? null,
                "client_zip"           => $data["client_zip"] ?? null,
                "client_city"          => $data["client_city"] ?? null,
                "client_street"        => $data["client_street"] ?? null,
                "client_house_number"  => $data["client_house_number"] ?? null,
            ]);

            $this->itemService->createItems($offer, $data["items"]);

            $netTotal   = $this->calculator->calculateNetTotal($data["items"]);
            $grossTotal = $this->calculator->calculateGrossTotal($netTotal, $offer->tax_percent);

            $offer->update([
                "net_total"   => $netTotal,
                "gross_total" => $grossTotal,
            ]);

            return $offer;
        });
    }
}