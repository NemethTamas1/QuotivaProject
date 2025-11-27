<?php

use App\Http\Controllers\DataController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get("/test", function(){
    return response()->json(["message" => "API teszt backendről"]);
});

Route::apiResource("/datas", DataController::class);