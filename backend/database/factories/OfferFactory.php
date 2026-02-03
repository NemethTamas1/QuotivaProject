<?php

namespace Database\Factories;

use App\Models\UserProfile;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Offer>
 */
class OfferFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "profile_id" => UserProfile::factory(),
            "offer_number" => fake()->numerify("OFF-#####"),
            "offer_name" => fake()->words(3, true),
            "status" => "pending",
            "dated" => now()->format("Y-m-d"),
            "valid_until" => now()->addDay()->format("Y-m-d"),
            "currency" => "HUF",
            "tax_percent" => 27,

            "client_name" => fake()->company(),
            "client_email" => fake()->unique()->safeEmail(),
            "client_phone" => fake()->phoneNumber(),
            "client_tax_number" => fake()->numerify('########-#-##'),
            "client_zip" => fake()->numberBetween(1000, 5000),
            "client_city" => "Budapest",
            "client_street" => fake()->streetName(),
            "client_house_number" => fake()->buildingNumber(),
        ];
    }
}
