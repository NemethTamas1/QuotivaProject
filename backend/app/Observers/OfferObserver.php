<?php

namespace App\Observers;

use App\Mail\NotifyClientOfferAccept;
use App\Mail\NotifyClientOfferRejection;
use App\Mail\NotifyUserOfOfferAccepted;
use App\Mail\NotifyUserOfOfferRejected;
use App\Mail\NotifyUserOfOfferStatus;
use App\Mail\OfferStatusAccepted;
use App\Mail\OfferStatusRejected;
use App\Models\Offer;
use Illuminate\Support\Facades\Mail;

class OfferObserver
{
    /**
     * Handle the Offer "created" event.
     */
    public function created(Offer $offer): void
    {
        //
    }

    /**
     * Handle the Offer "updated" event.
     */
    public function updated(Offer $offer): void
    {
        if($offer->status === "accepted"){

            //Ha el lett fogadva, értesül a user és a kliens is.
            Mail::to($offer->profile->user->email)->send(new NotifyUserOfOfferAccepted($offer));
            Mail::to($offer->client_email)->send(new NotifyClientOfferAccept($offer));

        } else if($offer->status === "rejected"){

            //Ha el lett utasítva, értesül a user és a kliens is.
            Mail::to($offer->profile->user->email)->send(new NotifyUserOfOfferRejected($offer));
            Mail::to($offer->client_email)->send(new NotifyClientOfferRejection($offer));

        }
    }

    /**
     * Handle the Offer "deleted" event.
     */
    public function deleted(Offer $offer): void
    {
        //
    }

    /**
     * Handle the Offer "restored" event.
     */
    public function restored(Offer $offer): void
    {
        //
    }

    /**
     * Handle the Offer "force deleted" event.
     */
    public function forceDeleted(Offer $offer): void
    {
        //
    }
}
