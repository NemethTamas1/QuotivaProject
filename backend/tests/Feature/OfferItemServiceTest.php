<?php

namespace Tests\Feature\Services\Offer;

use Tests\TestCase;
use App\Models\Offer;
use App\Models\OfferItem;
use App\Services\Offer\OfferItemService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class OfferItemServiceTest extends TestCase
{
    use DatabaseTransactions;

    private OfferItemService $service;

    protected function setUp():void{
        parent::setUp();
        $this->service = new OfferItemService();
    }

    public function test_it_can_create_multiple_items_for_an_offer(): void
    {
        // Arrange
        $offer = Offer::factory()->create();

        $itemsData = [
            [
                'name' => 'Festés',
                'quantity' => 10,
                'quantity_type' => 'm2',
                'labor_unit_price' => 1500,
                'material_unit_price' => 500,
            ],
            [
                'name' => 'Glettelés',
                'quantity' => 5,
                'quantity_type' => 'm2',
                'labor_unit_price' => 800,
                'material_unit_price' => 200,
            ],
        ];

        // Act
        $this->service->createItems($offer, $itemsData);

        // Assert
        $this->assertDatabaseCount('offer_items', 2);
    }
}
