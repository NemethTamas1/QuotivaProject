<?php

namespace App\Http\Controllers;

use App\Models\UserProfile;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserProfileRequest;
use App\Http\Requests\UpdateUserProfileRequest;
use App\Http\Resources\UserProfileResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserProfileController extends Controller
{

    public function activate(Request $request, UserProfile $userProfile)
    {
        if ($userProfile->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        $user = $request->user();
        $user->active_user_profile_id = $userProfile->id;
        $user->save();

        return response()->json(['message' => 'User profile activated successfully.']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = Auth::id();

        $profiles = UserProfile::where('user_id', $userId)->get();

        return UserProfileResource::collection($profiles);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserProfileRequest $request)
    {
        $data = $request->validated();

        $userProfile = UserProfile::create($data);

        return new UserProfileResource($userProfile);
    }

    /**
     * Display the specified resource.
     */
    public function show(UserProfile $userProfile)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserProfileRequest $request, UserProfile $userProfile)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserProfile $userProfile)
    {
        //
    }
}
