<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OfferItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "offer_id" => $this->offer_id,
            "name" => $this->name,
            "description" => $this->description,
            "quantity" => $this->quantity,
            "quantity_type" => $this->quantity_type,
            "labor_unit_price" => $this->labor_unit_price,
            "material_unit_price" => $this->material_unit_price,
        ];
    }
}
