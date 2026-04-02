<?php

namespace App\Services\Offer;

class OfferTotalsCalculator
{
    public function calculateNetTotal(array $items):float{
        return collect($items)->sum(function ($item) {
            return $item['quantity'] * ($item['labor_unit_price'] + $item['material_unit_price']);
        });
    }

    public function calculateGrossTotal(float $netTotal, float $taxPercent): float
    {
        return $netTotal * (1 + $taxPercent / 100);
    }
}