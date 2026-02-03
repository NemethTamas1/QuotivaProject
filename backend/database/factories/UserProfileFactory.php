<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserProfile>
 */
class UserProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'company_name' => fake()->company(),
            'tax_number' => fake()->numerify("########-#-##"),
            'company_email' => fake()->email(),
            'city' => fake()->city(),
            'zip' => fake()->numerify("####"),
            'street' => fake()->streetAddress(),
            'house_number' => fake()->streetAddress(),
            'company_phone' => fake()->phoneNumber()
        ];
    }
}
