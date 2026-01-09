<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OfferItem extends Model
{
    public $timestamps = false;

    public $table = "offer_items";

    protected $fillable = [
        "offer_id",
        "name",
        "quantity",
        "quantity_type",
        "labor_unit_price",
        "material_unit_price",
    ];

    public function offer():BelongsTo
    {
        return $this->belongsTo(Offer::class);
    }

    // Egy sorra az össz nettó érték
    public function calculateTotals():void
    {
        $this->labor_total = $this->quantity * $this->labor_unit_price;
        $this->material_total = $this->quantity * $this->material_unit_price;
    }
}
