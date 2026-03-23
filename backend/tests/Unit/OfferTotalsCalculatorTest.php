<?php

namespace Tests\Unit\Services\Offer;

use PHPUnit\Framework\TestCase;
use App\Services\Offer\OfferTotalsCalculator;

class OfferTotalsCalculatorTest extends TestCase
{
    private OfferTotalsCalculator $calculator;

    public function setup():void{
        parent::setUp();
        $this->calculator = new OfferTotalsCalculator();
    }

    public function test_calculates_net_correctly(): void
    {
        // Arrange
        $items = [
            [
                'quantity' => 2,
                'labor_unit_price' => 500,
                'material_unit_price' => 1500
            ],
            [
                'quantity' => 1,
                'labor_unit_price' => 0,
                'material_unit_price' => 1000
            ]
        ];

        // Act
        $result = $this->calculator->calculateNetTotal($items);

        // Assert
        $this->assertEquals(5000, $result);
    }

    public function test_returns_zero_for_empty_items():void{
        // Act
        $result = $this->calculator->calculateNetTotal([]);

        // Assert
        $this->assertEquals(0, $result);
    }

    public function test_calculates_gross_correctly():void{
        // Arrange
        $netTotal = 10000;
        $taxPercent = 27;

        // Act
        $result = $this->calculator->calculateGrossTotal($netTotal, $taxPercent);
    
        // Assert
        $this->assertEquals(12700, $result);
    }
}
