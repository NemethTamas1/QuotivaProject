<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Models\User;

class RegisterController extends Controller
{
    public function store(RegisterRequest $request){

        $data = $request->validated();

        $user = User::create($data);

        return response()->json([
            "message" => "A(z) $user->email sikeresen regisztrált.",
            "user" => $user
        ], 201);
    }
}
