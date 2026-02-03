<?php

namespace Database\Factories;

use App\Models\Offer;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class OfferItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
        'offer_id' => Offer::factory(),
        'name' => fake()->sentence(3),
        'quantity' => fake()->numberBetween(1, 10),
        'quantity_type' => 'ora',
        'labor_unit_price' => 8000,
        'material_unit_price' => 0,
    ];
    }
}
