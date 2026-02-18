<?php

namespace Database\Seeders;

use App\Models\Offer;
use App\Models\OfferItem;
use App\Models\UserProfile;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class OfferSeeder extends Seeder
{
    public function run(): void
    {
        $profiles = UserProfile::where('user_id', [1, 2])->get();

        foreach ($profiles as $profile) {

            for ($month = 1; $month <= 12; $month++) {

                $offersPerMonth = 5;

                for ($i = 0; $i < $offersPerMonth; $i++) {
                    $randomDate = Carbon::create(2026, $month, rand(1, 28));

                    Offer::factory()
                        ->has(OfferItem::factory()->count(5), 'items')
                        ->create([
                            'profile_id' => $profile->id,
                            'dated' => $randomDate->format('Y-m-d'),
                            'valid_until' => $randomDate->copy()->addDays(15)->format('Y-m-d'),
                            "status" => "accepted"
                        ]);
                }
            }
        }
    }
}
