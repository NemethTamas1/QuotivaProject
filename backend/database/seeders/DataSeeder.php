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
        DB::table("dev_datas")->insert([
            [
                "name" => "Test 1",
                "price" => 100
            ],
            [
                "name" => "Test 2",
                "price" => 200
            ],
            [
                "name" => "Test 3",
                "price" => 300
            ]
        ]);
    }
}
