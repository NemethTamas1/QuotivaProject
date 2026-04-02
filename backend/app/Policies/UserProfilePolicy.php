<?php

namespace App\Policies;

use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Auth\Access\Response;

class UserProfilePolicy
{
    public function delete(User $user, UserProfile $userProfile) :Response {
        return $user->id === $userProfile->user_id
            ? Response::allow()
            : Response::deny();
    }

    public function update(User $user, UserProfile $userProfile) :Response {
        return $user->id === $userProfile->user_id
            ? Response::allow()
            : Response::deny();
    }
    
}
