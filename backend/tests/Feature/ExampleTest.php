<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    use RefreshDatabase;

    public function test_successful_response_on_datas(): void
    {
        DB::table('datas')->insert(['name' => 'test', 'price' => 100]);
        
        $response = $this->get('/api/datas');

        $response->assertStatus(200);
    }
}
