<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class OffersTest extends TestCase
{
    use DatabaseTransactions;

    public function test_can_get_all_offers(): void
    {
        $user = User::create([
            'name' => "Admin",
            'email' => "adminemail@gmail.com",
            'password' => "adminpassword",
            'role' => "admin"
        ]);

        $response = $this->actingAs($user)->get('/api/offers');

        $response->assertStatus(200);
    }

    public function test_can_create_offer(): void
    {
        $user = User::factory()->create();

        $profile = UserProfile::create([
            "user_id" => 1,
            "company_name" => "TesztProfil Kft.",
            "tax_number" => 12345678 - 1 - 12,
            "company_email" => "tesztprofilkft@gmail.com",
            "city" => "Budapest",
            "zip" => 1234,
            "street" => "Teszt utca",
            "house_number" => "12/B",
            "company_phone" => "+36901346798"
        ]);

        $offerData = [
            "user_profile_id" => $profile->user_id,
            "offer_number" => "OFF123456",
            "offer_name" => "Test offer",
            "status" => "pending",
            "dated" => "2025-12-30",
            "valid_until" => "2025-12-31",
            "currency" => "HUF",
            "tax_percent" => 27,

            "client_name" => "Teszt Kft.",
            "client_email" => "tesztemail@gmail.com",
            "client_phone" => "+3612345678",
            "client_tax_number" => "12345678-1-42",
            "client_zip" => "1011",
            "client_city" => "Budapest",
            "client_street" => "Fő utca",
            "client_house_number" => "12",

            "items" => [

                [
                    "name" => "Csövezés kiépítése",
                    "quantity" => 5,
                    "quantity_type" => "ora",
                    "labor_unit_price" => 8000,
                    "material_unit_price" => 0
                ],
                [
                    "name" => "PVC cső 50mm",
                    "quantity" => 3,
                    "quantity_type" => "db",
                    "labor_unit_price" => 0,
                    "material_unit_price" => 1500
                ],
                [
                    "name" => "Kazán bekötés",
                    "quantity" => 1,
                    "quantity_type" => "ora",
                    "labor_unit_price" => 12000,
                    "material_unit_price" => 0
                ]
            ]
        ];

        $response = $this->actingAs($user)->postJson('/api/offers', $offerData);

        $response
            ->assertStatus(201)
            ->assertJsonFragment([
                'offer_name' => "Test offer",
                'status' => 'pending',
                'client_name' => 'Teszt Kft.'
            ]);
    }

    public function test_created_offer_contains_must_have_data(): void
    {
        $user = User::factory()->create();

        $profile = UserProfile::create([
            "user_id" => 1,
            "company_name" => "TesztProfil Kft.",
            "tax_number" => 12345678 - 1 - 12,
            "company_email" => "tesztprofilkft@gmail.com",
            "city" => "Budapest",
            "zip" => 1234,
            "street" => "Teszt utca",
            "house_number" => "12/B",
            "company_phone" => "+36901346798"
        ]);

        $offerData = [
            "user_profile_id" => $profile->user_id,
            "offer_number" => "OFF123456",
            "offer_name" => "Test offer",
            "status" => "pending",
            "dated" => "2025-12-30",
            "valid_until" => "2025-12-31",
            "currency" => "HUF",
            "tax_percent" => 27,

            "client_name" => "Teszt Kft.",
            "client_email" => "tesztemail@gmail.com",
            "client_phone" => "+3612345678",
            "client_tax_number" => "12345678-1-42",
            "client_zip" => "1011",
            "client_city" => "Budapest",
            "client_street" => "Fő utca",
            "client_house_number" => "12",

            "items" => [

                [
                    "name" => "Csövezés kiépítése",
                    "quantity" => 5,
                    "quantity_type" => "ora",
                    "labor_unit_price" => 8000,
                    "material_unit_price" => 0
                ],
                [
                    "name" => "PVC cső 50mm",
                    "quantity" => 3,
                    "quantity_type" => "db",
                    "labor_unit_price" => 0,
                    "material_unit_price" => 1500
                ],
                [
                    "name" => "Kazán bekötés",
                    "quantity" => 1,
                    "quantity_type" => "ora",
                    "labor_unit_price" => 12000,
                    "material_unit_price" => 0
                ]
            ]
        ];

        $response = $this->actingAs($user)->postJson('/api/offers', $offerData);

        $response
            ->assertJsonFragment([
                'offer_name' => "Test offer",
                'status' => 'pending',
                'client_name' => 'Teszt Kft.',
                'net_total' => 56500,
                'gross_total' => 71755,
            ])
            ->assertJsonFragment([
                'name' => 'Csövezés kiépítése',
                'quantity' => 5,
                'quantity_type' => 'ora',
                'labor_unit_price' => 8000,
                'material_unit_price' => 0,
            ])

            ->assertJsonFragment([
                'name' => 'PVC cső 50mm',
                'quantity' => 3,
                'quantity_type' => 'db',
                'labor_unit_price' => 0,
                'material_unit_price' => 1500,
            ])

            ->assertJsonFragment([
                'name' => 'Kazán bekötés',
                'quantity' => 1,
                'quantity_type' => 'ora',
                'labor_unit_price' => 12000,
                'material_unit_price' => 0,
            ]);
    }
}
