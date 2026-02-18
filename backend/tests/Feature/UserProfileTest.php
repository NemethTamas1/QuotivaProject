<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserProfileTest extends TestCase
{
    use DatabaseTransactions;
    
    public function test_can_create_user_profile(): void
    {
        $user = User::factory()->create();

        $profileData = ([
            "user_id" => $user->id,
            "company_name" => "TesztProfil Kft.",
            "tax_number" => "12345678-1-12",
            "company_email" => "tesztprofilkft@gmail.com",
            "city" => "Budapest",
            "zip" => 1234,
            "street" => "Teszt utca",
            "house_number" => "12/B",
            "company_phone" => "+36901346798"
        ]);

        $response = $this->actingAs($user)->postJson('/api/user-profiles', $profileData);

        $response->assertStatus(201);
    }

    public function test_created_user_profile_is_in_database(){
        $user = User::factory()->create();

        $profileData = ([
            "user_id" => $user->id,
            "company_name" => "TesztProfil Kft.",
            "tax_number" => "12345678-1-12",
            "company_email" => "tesztprofilkft@gmail.com",
            "city" => "Budapest",
            "zip" => 1234,
            "street" => "Teszt utca",
            "house_number" => "12/B",
            "company_phone" => "+36901346798"
        ]);

        $this->actingAs($user)->postJson('/api/user-profiles', $profileData);

        $this->assertDatabaseHas("user_profiles", [
            "user_id" => $user->id,
            "company_name" => "TesztProfil Kft.",
            "tax_number" => "12345678-1-12"
        ]);
    }
}
