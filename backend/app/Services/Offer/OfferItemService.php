<?php

namespace App\Services\Offer;

use App\Models\Offer;
use App\Models\OfferItem;

class OfferItemService
{
    public function createItems(Offer $offer, array $items): void
    {
        foreach ($items as $item) {
            OfferItem::create([
                "offer_id"             => $offer->id,
                "name"                 => $item["name"] ?? null,
                "quantity"             => $item["quantity"],
                "quantity_type"        => $item["quantity_type"],
                "labor_unit_price"     => $item["labor_unit_price"],
                "material_unit_price"  => $item["material_unit_price"],
            ]);
        }
    }
}