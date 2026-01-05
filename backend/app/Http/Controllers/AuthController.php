<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(AuthRequest $request)
    {
        $credentials = $request->validated();

        if (! Auth::attempt($credentials)) {
            return response()->json(["message" => "Hibás email vagy jelszó."], 401);
        }

        $request->session()->regenerate();

        return response()->json([
            "message" => "Sikeres bejelentkezés.",
            "user" => Auth::user()
        ], 200);
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            "message" => "Sikeres kijelentkezés."
        ], 200);
    }

    public function me(Request $request)
    {
        return response()->json([
            "user" => $request->user()
        ], 200);
    }
}
