<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('user_profiles')->insert([
            [
                'user_id' => 2,
                'company_name' => 'ElsőProfil Cég Kft.',
                'tax_number' => 'TAX123456',
                'company_email' => 'elsoprofil@gmail.com',
                'city' => 'Budapest',
                'zip' => '1111',
                'street' => 'Elsoteszt utca',
                'house_number' => 40,
                'company_phone' => '+3612345678',
            ],
            [
                'user_id' => 2,
                'company_name' => 'MásodikProfil Cég Kft.',
                'tax_number' => 'TAX123456',
                'company_email' => 'masodikprofil@gmail.com',
                'city' => 'Budapest',
                'zip' => '1111',
                'street' => 'Masodikteszt utca',
                'house_number' => 30,
                'company_phone' => '+3612345678',
            ],
        ]);
    }
}
