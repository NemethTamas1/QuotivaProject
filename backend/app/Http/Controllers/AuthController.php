<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthRequest;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function authenticate(AuthRequest $request)
    {
        $credentials = $request->validated();

        if(Auth::attempt($credentials)){
            $token = $request->user()->createToken('app');

            return response()->json([
                "data" => [
                    "token" => $token->plainTextToken
                ]
            ]);

        } else {
            return response()->json([
                "data" => [
                    "message" => "Hibás email cím vagy jelszó."
                ]
            ], 401);
        }
    }
}
