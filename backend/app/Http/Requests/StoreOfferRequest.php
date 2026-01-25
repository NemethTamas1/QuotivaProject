<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOfferRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            // Alap
            //"user_id" => ["required", "exists:users,id"],
            "offer_name" => ["required", "string", "max:100"],
            "status" => ["nullable", "string", "in:pending,accepted,rejected"],
            "dated" => ["nullable", "date"],
            "valid_until" => ["nullable", "date"],
            "currency" => ["required", "string", "max:10", "in:USD,EUR,HUF"],
            "tax_percent" => ["required", "integer", "min:0", "max:27"],
            "net_total" => ["prohibited"],
            "gross_total" => ["prohibited"],

            // Ügyfél
            "client_name" => ["required", "string", "max:100"],
            "client_email" => ["nullable", "string", "email:rfc", "max:50"],
            "client_phone" => ["nullable", "string", "max:50"],
            "client_tax_number" => ["nullable", "string", "max:50"],
            "client_zip" => ["required", "integer", "digits:4"],
            "client_city" => ["required", "string", "max:100"],
            "client_street" => ["required", "string", "max:100"],
            "client_house_number" => ["required", "string", "max:20"],

            // Tételek tömbje
            "items" => ["required", "array", "min:1"],

            // Tételek egyedi szabályai
            "items.*.name"              => ["required", "string"],
            "items.*.quantity"          => ["required", "numeric", "min:0"],
            "items.*.quantity_type"     => ["required", "string", "in:db,ora,kg,fm,m2,m3"],
            "items.*.labor_unit_price"  => ["required", "numeric", "min:0"],
            "items.*.material_unit_price" => ["required", "numeric", "min:0"],
        ];
    }
}
