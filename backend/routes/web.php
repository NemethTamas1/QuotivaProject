<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::post('/login', [AuthController::class, 'login'])->middleware('web');

Route::post("/logout", [AuthController::class, "logout"])->middleware('web');

Route::get('/csrf-test', function () {
    return response()->json([
        'csrf' => csrf_token(),
    ]);
});

Route::post('/csrf-test', function (Request $request) {
    return response()->json([
        'ok' => true,
        'token' => csrf_token(),
    ]);
});

// Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
//     return $request->user();
// });

// Route::get("/whoami", function(Request $request){
//     return $request->user() ?: 'NO USER';
// });