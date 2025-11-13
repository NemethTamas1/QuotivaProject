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
        DB::table("prod_datas")->insert([
            [
                "name" => "Test Prod Data 1",
                "price" => 100
            ],
            [
                "name" => "Test Prod Data 2",
                "price" => 200
            ],
            [
                "name" => "Test Prod Data 3",
                "price" => 300
            ]
        ]);
    }
}
