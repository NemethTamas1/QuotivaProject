<?php

namespace Tests\Feature;

use App\Models\Offer;
use App\Models\OfferItem;
use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class OffersTest extends TestCase
{
    use DatabaseTransactions;

    public function test_admin_can_get_all_offers_that_there_is(): void
    {
        $initialCount = Offer::count();

        $admin = User::factory()->create([
            'role' => "admin"
        ]);

        $user1 = User::factory()->create();
        $user2 = User::factory()->create();

        $profile1 = UserProfile::factory()->create(["user_id" => $user1->id]);
        $profile2 = UserProfile::factory()->create(["user_id" => $user2->id]);

        Offer::factory()
            ->count(2)
            ->has(OfferItem::factory()->count(3), "items")
            ->create([
                "profile_id" => $profile1->id
            ]);

        Offer::factory()
            ->count(1)
            ->has(OfferItem::factory()->count(3), "items")
            ->create([
                "profile_id" => $profile2->id
            ]);

        $afterCount = Offer::count();

        $response = $this->actingAs($admin)->get('/api/offers');

        $response->assertStatus(200);
        $response->assertJsonCount($initialCount + 3, "data");
    }

    public function test_user_can_not_get_all_the_offers_there_is(): void
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();

        $profile1 = UserProfile::factory()->create(["user_id" => $user1->id]);
        $profile2 = UserProfile::factory()->create(["user_id" => $user2->id]);

        Offer::factory()
            ->count(2)
            ->has(OfferItem::factory()->count(3), "items")
            ->create([
                "profile_id" => $profile1->id
            ]);

        Offer::factory()
            ->count(1)
            ->has(OfferItem::factory()->count(3), "items")
            ->create([
                "profile_id" => $profile2->id
            ]);

        $response = $this->actingAs($user1)->getJson('/api/offers');

        $response->assertStatus(200);
        $response->assertJsonCount(2, "data");
    }

    public function test_user_can__get_all_the_offers_they_created(): void
    {
        $user1 = User::factory()->create();

        $profile1 = UserProfile::factory()->create(["user_id" => $user1->id]);
        $profile2 = UserProfile::factory()->create(["user_id" => $user1->id]);

        Offer::factory()
            ->count(2)
            ->has(OfferItem::factory()->count(3), "items")
            ->create([
                "profile_id" => $profile1->id
            ]);

        Offer::factory()
            ->count(1)
            ->has(OfferItem::factory()->count(3), "items")
            ->create([
                "profile_id" => $profile2->id
            ]);

        $response = $this->actingAs($user1)->getJson('/api/offers');

        $response->assertStatus(200);
        $response->assertJsonCount(3, "data");
    }

    public function test_can_create_offer_with_correct_fields(): void
    {
        $user = User::factory()->create();
        $profile = UserProfile::factory()->create(["user_id" => $user->id]);

        $data = Offer::factory()->make([
            'profile_id' => $profile->id,
            'client_zip' => '1114',
        ])->toArray();

        $items = OfferItem::factory()->count(3)->make()->toArray();
        $data['items'] = $items;

        $response = $this->actingAs($user)->postJson('/api/offers', $data);

        $response->assertStatus(201);
    }

    public function test_created_offer_is_in_database(): void
    {
        $user = User::factory()->create();
        $profile = UserProfile::factory()->create(["user_id" => $user->id]);

        $data = Offer::factory()->make([
            'profile_id' => $profile->id,
            'client_zip' => '1114',
        ])->toArray();

        $items = OfferItem::factory()->count(3)->make()->toArray();
        $data['items'] = $items;

        $response = $this->actingAs($user)->postJson('/api/offers', $data);

        $response->assertStatus(201);

        $createdId = $response->json('offer.id');

        $this->assertDatabaseHas("offers", [
            "id" => $createdId,
            "profile_id" => $profile->id,
            "client_name" => $data["client_name"],
            "client_zip" => $data["client_zip"]
        ]);
    }

    public function test_can_not_create_offer_with_invalid_offer_name_field(): void
    {
        $user = User::factory()->create();
        $profile = UserProfile::factory()->create(["user_id" => $user->id]);

        $data = Offer::factory()->make([
            'profile_id' => $profile->id,
            'offer_name' => null,
        ])->toArray();

        $items = OfferItem::factory()->count(3)->make()->toArray();
        $data['items'] = $items;

        $response = $this->actingAs($user)->postJson('/api/offers', $data);

        $response->assertStatus(422);
    }

    public function test_can_not_create_offer_with_invalid_status_field(): void
    {
        $user = User::factory()->create();
        $profile = UserProfile::factory()->create(["user_id" => $user->id]);

        $data = Offer::factory()->make([
            'profile_id' => $profile->id,
            'status' => null,
        ])->toArray();

        $items = OfferItem::factory()->count(3)->make()->toArray();
        $data['items'] = $items;

        $response = $this->actingAs($user)->postJson('/api/offers', $data);

        $response->assertStatus(422);
    }

    public function test_can_not_create_offer_with_invalid_dated_field(): void
    {
        $user = User::factory()->create();
        $profile = UserProfile::factory()->create(["user_id" => $user->id]);

        $data = Offer::factory()->make([
            'profile_id' => $profile->id,
            'dated' => null,
        ])->toArray();

        $items = OfferItem::factory()->count(3)->make()->toArray();
        $data['items'] = $items;

        $response = $this->actingAs($user)->postJson('/api/offers', $data);

        $response->assertStatus(201);
    }

    public function test_can_not_create_offer_with_invalid_valid_until_field(): void
    {
        $user = User::factory()->create();
        $profile = UserProfile::factory()->create(["user_id" => $user->id]);

        $data = Offer::factory()->make([
            'profile_id' => $profile->id,
            'valid_until' => null,
        ])->toArray();

        $items = OfferItem::factory()->count(3)->make()->toArray();
        $data['items'] = $items;

        $response = $this->actingAs($user)->postJson('/api/offers', $data);

        $response->assertStatus(201);
    }

    public function test_can_not_create_offer_with_invalid_currency_field(): void
    {
        $user = User::factory()->create();
        $profile = UserProfile::factory()->create(["user_id" => $user->id]);

        $data = Offer::factory()->make([
            'profile_id' => $profile->id,
            'currency' => null,
        ])->toArray();

        $items = OfferItem::factory()->count(3)->make()->toArray();
        $data['items'] = $items;

        $response = $this->actingAs($user)->postJson('/api/offers', $data);

        $response->assertStatus(422);
    }

    public function test_can_not_create_offer_with_invalid_tax_percent_field(): void
    {
        $user = User::factory()->create();
        $profile = UserProfile::factory()->create(["user_id" => $user->id]);

        $data = Offer::factory()->make([
            'profile_id' => $profile->id,
            'tax_percent' => 200,
        ])->toArray();

        $items = OfferItem::factory()->count(3)->make()->toArray();
        $data['items'] = $items;

        $response = $this->actingAs($user)->postJson('/api/offers', $data);

        $response->assertStatus(422);
    }

    public function test_can_not_create_offer_with_pre_defined_net_total_field(): void
    {
        $user = User::factory()->create();
        $profile = UserProfile::factory()->create(["user_id" => $user->id]);

        $data = Offer::factory()->make([
            'profile_id' => $profile->id,
            'net_total' => 1000,
        ])->toArray();

        $items = OfferItem::factory()->count(3)->make()->toArray();
        $data['items'] = $items;

        $response = $this->actingAs($user)->postJson('/api/offers', $data);

        $response->assertStatus(422);
    }

    public function test_can_not_create_offer_with_pre_defined_gross_total_field(): void
    {
        $user = User::factory()->create();
        $profile = UserProfile::factory()->create(["user_id" => $user->id]);

        $data = Offer::factory()->make([
            'profile_id' => $profile->id,
            'gross_total' => 1000,
        ])->toArray();

        $items = OfferItem::factory()->count(3)->make()->toArray();
        $data['items'] = $items;

        $response = $this->actingAs($user)->postJson('/api/offers', $data);

        $response->assertStatus(422);
    }

    public function test_can_not_create_offer_with_invalid_client_name_field(): void
    {
        $user = User::factory()->create();
        $profile = UserProfile::factory()->create(["user_id" => $user->id]);

        $data = Offer::factory()->make([
            'profile_id' => $profile->id,
            'client_name' => null,
        ])->toArray();

        $items = OfferItem::factory()->count(3)->make()->toArray();
        $data['items'] = $items;

        $response = $this->actingAs($user)->postJson('/api/offers', $data);

        $response->assertStatus(422);
    }

    public function test_can_not_create_offer_with_invalid_client_email_field(): void
    {
        $user = User::factory()->create();
        $profile = UserProfile::factory()->create(["user_id" => $user->id]);

        $data = Offer::factory()->make([
            'profile_id' => $profile->id,
            'client_email' => "testemail.gmail.com",
        ])->toArray();

        $items = OfferItem::factory()->count(3)->make()->toArray();
        $data['items'] = $items;

        $response = $this->actingAs($user)->postJson('/api/offers', $data);

        $response->assertStatus(422);
    }

    public function test_can_create_offer_with_empty_client_email_field(): void
    {
        $user = User::factory()->create();
        $profile = UserProfile::factory()->create(["user_id" => $user->id]);

        $data = Offer::factory()->make([
            'profile_id' => $profile->id,
            'client_email' => null,
        ])->toArray();

        $items = OfferItem::factory()->count(3)->make()->toArray();
        $data['items'] = $items;

        $response = $this->actingAs($user)->postJson('/api/offers', $data);

        $response->assertStatus(201);
    }

    public function test_can_create_offer_with_empty_phone_field(): void
    {
        $user = User::factory()->create();
        $profile = UserProfile::factory()->create(["user_id" => $user->id]);

        $data = Offer::factory()->make([
            'profile_id' => $profile->id,
            'client_phone' => null,
        ])->toArray();

        $items = OfferItem::factory()->count(3)->make()->toArray();
        $data['items'] = $items;

        $response = $this->actingAs($user)->postJson('/api/offers', $data);

        $response->assertStatus(201);
    }

    public function test_can_not_create_offer_with_too_long_client_phone_field(): void
    {
        $user = User::factory()->create();
        $profile = UserProfile::factory()->create(["user_id" => $user->id]);

        $data = Offer::factory()->make([
            'profile_id' => $profile->id,
            'client_phone' => "+36701111111111111111",
        ])->toArray();

        $items = OfferItem::factory()->count(3)->make()->toArray();
        $data['items'] = $items;

        $response = $this->actingAs($user)->postJson('/api/offers', $data);

        $response->assertStatus(422);
    }

    public function test_can_create_offer_with_empty_tax_number_field(): void
    {
        $user = User::factory()->create();
        $profile = UserProfile::factory()->create(["user_id" => $user->id]);

        $data = Offer::factory()->make([
            'profile_id' => $profile->id,
            'tax_number' => null,
        ])->toArray();

        $items = OfferItem::factory()->count(3)->make()->toArray();
        $data['items'] = $items;

        $response = $this->actingAs($user)->postJson('/api/offers', $data);

        $response->assertStatus(201);
    }

    public function test_can_not_create_offer_with_too_long_client_tax_number_field(): void
    {
        $user = User::factory()->create();
        $profile = UserProfile::factory()->create(["user_id" => $user->id]);

        $data = Offer::factory()->make([
            'profile_id' => $profile->id,
            'client_tax_number' => "11111111111111111111111111",
        ])->toArray();

        $items = OfferItem::factory()->count(3)->make()->toArray();
        $data['items'] = $items;

        $response = $this->actingAs($user)->postJson('/api/offers', $data);

        $response->assertStatus(422);
    }

    public function test_can_not_create_offer_with_empty_client_zip_field(): void
    {
        $user = User::factory()->create();
        $profile = UserProfile::factory()->create(["user_id" => $user->id]);

        $data = Offer::factory()->make([
            'profile_id' => $profile->id,
            'client_zip' => null,
        ])->toArray();

        $items = OfferItem::factory()->count(3)->make()->toArray();
        $data['items'] = $items;

        $response = $this->actingAs($user)->postJson('/api/offers', $data);

        $response->assertStatus(422);
    }

    public function test_can_not_create_offer_with_invalid_client_zip_field(): void
    {
        $user = User::factory()->create();
        $profile = UserProfile::factory()->create(["user_id" => $user->id]);

        $data = Offer::factory()->make([
            'profile_id' => $profile->id,
            'client_zip' => "test",
        ])->toArray();

        $items = OfferItem::factory()->count(3)->make()->toArray();
        $data['items'] = $items;

        $response = $this->actingAs($user)->postJson('/api/offers', $data);

        $response->assertStatus(422);
    }

    public function test_can_not_create_offer_with_too_long_client_zip_field(): void
    {
        $user = User::factory()->create();
        $profile = UserProfile::factory()->create(["user_id" => $user->id]);

        $data = Offer::factory()->make([
            'profile_id' => $profile->id,
            'client_zip' => 11111,
        ])->toArray();

        $items = OfferItem::factory()->count(3)->make()->toArray();
        $data['items'] = $items;

        $response = $this->actingAs($user)->postJson('/api/offers', $data);

        $response->assertStatus(422);
    }

    public function test_can_not_create_offer_with_empty_client_city_field(): void
    {
        $user = User::factory()->create();
        $profile = UserProfile::factory()->create(["user_id" => $user->id]);

        $data = Offer::factory()->make([
            'profile_id' => $profile->id,
            'client_city' => null,
        ])->toArray();

        $items = OfferItem::factory()->count(3)->make()->toArray();
        $data['items'] = $items;

        $response = $this->actingAs($user)->postJson('/api/offers', $data);

        $response->assertStatus(422);
    }

    public function test_can_not_create_offer_with_invalid_client_city_field(): void
    {
        $user = User::factory()->create();
        $profile = UserProfile::factory()->create(["user_id" => $user->id]);

        $data = Offer::factory()->make([
            'profile_id' => $profile->id,
            'client_city' => 1,
        ])->toArray();

        $items = OfferItem::factory()->count(3)->make()->toArray();
        $data['items'] = $items;

        $response = $this->actingAs($user)->postJson('/api/offers', $data);

        $response->assertStatus(422);
    }

    public function test_can_not_create_offer_with_too_long_client_city_field(): void
    {
        $user = User::factory()->create();
        $profile = UserProfile::factory()->create(["user_id" => $user->id]);

        $data = Offer::factory()->make([
            'profile_id' => $profile->id,
            'client_city' => fake()->lexify(str_repeat('a', 101)),
        ])->toArray();

        $items = OfferItem::factory()->count(3)->make()->toArray();
        $data['items'] = $items;

        $response = $this->actingAs($user)->postJson('/api/offers', $data);

        $response->assertStatus(422);
    }

    public function test_can_not_create_offer_with_empty_client_street_field(): void
    {
        $user = User::factory()->create();
        $profile = UserProfile::factory()->create(["user_id" => $user->id]);

        $data = Offer::factory()->make([
            'profile_id' => $profile->id,
            'client_street' => null,
        ])->toArray();

        $items = OfferItem::factory()->count(3)->make()->toArray();
        $data['items'] = $items;

        $response = $this->actingAs($user)->postJson('/api/offers', $data);

        $response->assertStatus(422);
    }

    public function test_can_not_create_offer_with_invalid_client_street_field(): void
    {
        $user = User::factory()->create();
        $profile = UserProfile::factory()->create(["user_id" => $user->id]);

        $data = Offer::factory()->make([
            'profile_id' => $profile->id,
            'client_street' => 1,
        ])->toArray();

        $items = OfferItem::factory()->count(3)->make()->toArray();
        $data['items'] = $items;

        $response = $this->actingAs($user)->postJson('/api/offers', $data);

        $response->assertStatus(422);
    }

    public function test_can_not_create_offer_with_too_long_client_street_field(): void
    {
        $user = User::factory()->create();
        $profile = UserProfile::factory()->create(["user_id" => $user->id]);

        $data = Offer::factory()->make([
            'profile_id' => $profile->id,
            'client_street' => fake()->lexify(str_repeat('a', 51)),
        ])->toArray();

        $items = OfferItem::factory()->count(3)->make()->toArray();
        $data['items'] = $items;

        $response = $this->actingAs($user)->postJson('/api/offers', $data);

        $response->assertStatus(422);
    }

    public function test_can_not_create_offer_with_empty_client_house_number_field(): void
    {
        $user = User::factory()->create();
        $profile = UserProfile::factory()->create(["user_id" => $user->id]);

        $data = Offer::factory()->make([
            'profile_id' => $profile->id,
            'client_house_number' => null,
        ])->toArray();

        $items = OfferItem::factory()->count(3)->make()->toArray();
        $data['items'] = $items;

        $response = $this->actingAs($user)->postJson('/api/offers', $data);

        $response->assertStatus(422);
    }

    public function test_can_not_create_offer_with_invalid_client_house_number_field(): void
    {
        $user = User::factory()->create();
        $profile = UserProfile::factory()->create(["user_id" => $user->id]);

        $data = Offer::factory()->make([
            'profile_id' => $profile->id,
            'client_house_number' => 1,
        ])->toArray();

        $items = OfferItem::factory()->count(3)->make()->toArray();
        $data['items'] = $items;

        $response = $this->actingAs($user)->postJson('/api/offers', $data);

        $response->assertStatus(422);
    }

    public function test_can_not_create_offer_with_too_long_client_house_number_field(): void
    {
        $user = User::factory()->create();
        $profile = UserProfile::factory()->create(["user_id" => $user->id]);

        $data = Offer::factory()->make([
            'profile_id' => $profile->id,
            'client_house_number' => fake()->lexify(str_repeat('?', 11)),
        ])->toArray();

        $items = OfferItem::factory()->count(3)->make()->toArray();
        $data['items'] = $items;

        $response = $this->actingAs($user)->postJson('/api/offers', $data);

        $response->assertStatus(422);
    }

    public function test_can_not_create_offer_with_missing_items_field(): void
    {
        $user = User::factory()->create();
        $profile = UserProfile::factory()->create(["user_id" => $user->id]);

        $data = Offer::factory()->make([
            'profile_id' => $profile->id,
        ])->toArray();

        $items = OfferItem::factory()->count(0)->make()->toArray();
        $data['items'] = $items;

        $response = $this->actingAs($user)->postJson('/api/offers', $data);

        $response->assertStatus(422);
    }

    public function test_can_not_create_offer_with_missing_item_name_field(): void
    {
        $user = User::factory()->create();
        $profile = UserProfile::factory()->create(["user_id" => $user->id]);

        $data = Offer::factory()->make([
            'profile_id' => $profile->id,
        ])->toArray();

        $data['items'] = [
            [
                "name" => null,
                "quantity" => 1,
                "quantity_type" => "db",
                "labor_unit_price" => 0,
                "material_unit_price" => 0,
            ]
        ];

        $response = $this->actingAs($user)->postJson('/api/offers', $data);

        $response->assertStatus(422);
    }
}
