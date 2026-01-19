<?php

use App\Http\Controllers\DataController;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\UserProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get("/test", function () {
    return response()->json(["message" => "API teszt backendről"]);
});

Route::apiResource("/datas", DataController::class);

Route::apiResource("/offers", OfferController::class);

Route::apiResource("/user-profiles", UserProfileController::class);

Route::post("/register", [RegisterController::class, "store"]);

Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
    return response()->json($request->user());
});