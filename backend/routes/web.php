<?php

use App\Models\Offer;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/response/{id}/{status}', function ($id, $status) {
    $offer = Offer::findOrFail($id);
    $offer->update(['status' => $status]);

    return "Köszönjük a válaszát! A rendszert frissítettük.";
});

Route::get('/debug-sentry', function () {
    throw new Exception('My first Sentry error!');
});