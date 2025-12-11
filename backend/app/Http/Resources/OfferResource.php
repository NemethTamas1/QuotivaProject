<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OfferResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "offer_number" => $this->offer_number,
            "customer_id" => $this->customer_id,
            "status" => $this->status,
            "valid_until" => $this->valid_until,
            "currency" => $this->currency,
            "tax_percent" => $this->tax_percent,
            "net_total" => $this->net_total,
            "gross_total" => $this->gross_total,
            "client_name" => $this->client_name,
            "client_phone" => $this->client_phone,
            "client_tax_number" => $this->client_tax_number,
            "client_zip" => $this->client_zip,
            "client_city" => $this->client_city,
            "client_street" => $this->client_street,
            "client_house_number" => $this->client_house_number,
            "items" => OfferItemResource::collection($this->whenLoaded('items')),
        ];
    }
}
