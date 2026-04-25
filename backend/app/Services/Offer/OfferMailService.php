<?php

namespace App\Services\Offer;

use App\Mail\OfferEmailToClient;
use App\Models\Offer;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;

class OfferMailService
{
    public function sendOfferToClient(Offer $offer): void
    {
        $acceptUrl = URL::signedRoute("offer.accept", ["offer" => $offer->id]);
        $rejectUrl = URL::signedRoute("offer.reject", ["offer" => $offer->id]);

        Mail::to($offer->client_email)->send(new OfferEmailToClient($offer, $acceptUrl, $rejectUrl));
    }
}