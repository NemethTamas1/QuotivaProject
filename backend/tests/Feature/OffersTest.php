<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class OffersTest extends TestCase
{
    use RefreshDatabase;

    public function test_example(): void
    {
        $response = $this->get('/api/offers');

        $response->assertStatus(200);
    }

    public function test_can_create_offer(): void
    {
        $offerData = [
            "offer_number" => "OFF-2025-002",
            "status" => "pending",
            "valid_until" => "2025-12-31",
            "currency" => "HUF",
            "tax_percent" => 27,

            "client_name" => "Teszt Kft.",
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
                    "quantity_type" => "darab",
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

        $response = $this->postJson('/api/offers', $offerData);

        $response
            ->assertStatus(201)
            ->assertJsonFragment([
                'offer_number' => "OFF-2025-002",
                'status' => 'pending',
                'client_name' => 'Teszt Kft.'
            ]);
    }

    public function test_created_offer_contains_must_have_data(): void
    {
        $offerData = [
            "offer_number" => "OFF-2025-002",
            "status" => "pending",
            "valid_until" => "2025-12-31",
            "currency" => "HUF",
            "tax_percent" => 27,

            "client_name" => "Teszt Kft.",
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
                    "quantity_type" => "darab",
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

        $response = $this->postJson('/api/offers', $offerData);

        $response
            ->assertJsonFragment([
                'offer_number' => "OFF-2025-002",
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
                'quantity_type' => 'darab',
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
