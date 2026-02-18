<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class OfferEmailToClient extends Mailable
{
    use Queueable, SerializesModels;


    public $offer;
    public $acceptUrl;
    public $rejectUrl;

    /**
     * Create a new message instance.
     */
    public function __construct($offer, $acceptUrl, $rejectUrl)
    {
        $this->offer = $offer;
        $this->acceptUrl = $acceptUrl;
        $this->rejectUrl = $rejectUrl;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Quotiva - Árajánlat',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.offerEmailToClient',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
