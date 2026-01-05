<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'user_id' => ['required|exists:users,id'],
            'company_name' => ['required', 'string', 'max:50'],
            'tax_number' => ['nullable', 'integer', "digits:11"],
            'company_email' => ['required', 'email:rfc', 'max:50'],
            'city' => ['required', 'string', 'max:30'],
            'zip' => ['required', 'integer', "digits:4"],
            'street' => ['required', 'string', 'max:50'],
            'house_number' => ['required', 'string', 'max:10'],
            'company_phone' => ['nullable', 'string', 'max:25']
        ];
    }
}
