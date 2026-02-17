<?php

namespace App\Providers;

use App\Models\Offer;
use App\Models\User;
use App\Observers\OfferObserver;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Model::shouldBeStrict();

        Offer::observe(OfferObserver::class);

        Gate::define("admin-only", function(User $user){
            return $user->role === "admin";
        });
    }
}
