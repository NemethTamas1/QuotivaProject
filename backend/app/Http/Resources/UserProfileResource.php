<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserProfileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'user_id' =>$this->user_id,
            'company_name' => $this->company_name,
            'tax_number' => $this->tax_number,
            'company_email' => $this->company_email,
            'city' => $this->city,
            'zip' => $this->zip,
            'street' => $this->street,
            'house_number' => $this->house_number,
            'company_phone' => $this->company_phone
        ];
    }
}
