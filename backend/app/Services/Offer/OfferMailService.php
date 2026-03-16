<?php

namespace App\Services\Offer;

use App\Mail\OfferEmailToClient;
use App\Models\Offer;
use Illuminate\Support\Facades\Mail;

class OfferMailService
{
    public function sendOfferToClient(Offer $offer): void
    {
        $acceptUrl = route("offer.accept", ["offer" => $offer->id]);
        $rejectUrl = route("offer.reject", ["offer" => $offer->id]);

        Mail::to($offer->client_email)->send(new OfferEmailToClient($offer, $acceptUrl, $rejectUrl));
    }
}