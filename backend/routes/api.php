<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DataController;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\UserProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
    return response()->json($request->user());
});

Route::middleware('auth:sanctum')->apiResource("/offers", OfferController::class);
Route::middleware('auth:sanctum')->apiResource('/user-profiles', UserProfileController::class);

// A u t h
Route::post("/register", [RegisterController::class, "store"]);

Route::post("/logout", [AuthController::class, "logout"]);

Route::post("/authenticate", [AuthController::class, "authenticate"])->name("auth.authenticate");

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
// ----------------------------------------------------------------------------------------------------

