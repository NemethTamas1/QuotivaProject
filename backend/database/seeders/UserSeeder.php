<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
           [
            "name" => "Tóth János",
            "email" => "tothjanos123@gmail.com",
            "password" => Hash::make("tothjanos123")
           ],
           [
            "name" => "Gipsz Jakab",
            "email" => "gipszjakab123@gmail.com",
            "password" => Hash::make("gipszjakab123")
           ] 
        ]);
    }
}
