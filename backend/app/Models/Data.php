<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Data extends Model
{
    public $timestamps = true;

    public $table = "prod_datas";

    protected $fillable = [
        "name",
        "price"
    ];
}
