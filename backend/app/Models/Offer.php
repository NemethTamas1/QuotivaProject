<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Offer extends Model
{
    public $table = "offers";

    public $timestamps = true;

    protected $fillable = [
        "offer_number",
        "status",
        "valid_until",
        "currency",
        "tax_percent",
        "net_total",
        "gross_total",

        "client_name",
        "client_phone",
        "client_tax_number",
        "client_zip",
        "client_city",
        "client_street",
        "client_house_number",

        "items"
    ];

    public function items():HasMany
    {
        return $this->hasMany(OfferItem::class);
    }

    public function user():BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
