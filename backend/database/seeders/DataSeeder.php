<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("datas")->insert([
            [
                "name" => "Data 1",
                "price" => 100
            ],
            [
                "name" => "Data 2",
                "price" => 200
            ],
            [
                "name" => "Data 3",
                "price" => 300
            ]
        ]);
    }
}
