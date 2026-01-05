<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserProfile extends Model
{
    public $timestamps = true;

    public $table = 'user_profiles';

    protected $fillable = [
        'user_id',
        'company_name',
        'tax_number',
        'company_email',
        'city',
        'zip',
        'street',
        'house_number',
        'company_phone'
    ];

    public function user():BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
