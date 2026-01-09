<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOfferItemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Később le kell venni a true-t és implementálni az autorizációs logikát.
    }

    public function rules(): array
    {
        return [
            
        ];
    }
}
