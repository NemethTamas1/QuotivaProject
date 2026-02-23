@extends('layouts.baseLayout')

@section('content')
<style>
    .shadow-accepted {
        box-shadow: 0 0 30px rgba(57, 255, 20, 0.6);
        border-color: rgba(57, 255, 20, 0.3);
        background-color: #1a1a1a;
        padding: 3rem;
        border-radius: 15px;
        text-align: center;
        border: 1px solid #333;
        max-width: 500px;
        width: 100%;
    }

    .shadow-rejected {
        box-shadow: 0 0 30px rgba(255, 49, 49, 0.6);
        border-color: rgba(255, 49, 49, 0.3);
        background-color: #1a1a1a;
        padding: 3rem;
        border-radius: 15px;
        text-align: center;
        border: 1px solid #333;
        max-width: 500px;
        width: 100%;
    }

    .neon-text-green {
        color: rgb(34, 197, 94);
        text-shadow: 0 0 10px rgb(34, 197, 94);
        font-size: 2.5rem;
        margin-bottom: 1rem;
    }

    .neon-text-red {
        color: #ff3131;
        text-shadow: 0 0 10px rgba(255, 49, 49, 0.5);
        font-size: 2.5rem;
        margin-bottom: 1rem;
    }

    .description {
        color: #cccccc;
        line-height: 1.6;
        font-size: 1.1rem;
    }

    .btn-home {
        display: inline-block;
        margin-top: 2rem;
        padding: 0.8rem 1.5rem;
        border: 1px solid #39FF14;
        color: #39FF14;
        text-decoration: none;
        border-radius: 5px;
        transition: all 0.3s ease;
    }

    .btn-home:hover {
        background-color: #39FF14;
        color: #121212;
        box-shadow: 0 0 20px #39FF14;
    }
</style>

<div class="{{ $offer->status === 'accepted' ? 'shadow-accepted' : 'shadow-rejected' }}">
    @if($offer->status === 'accepted')
        <h1 class="neon-text-green">Elfogadva.</h1>
        <p class="description"> {{ $offer->profile->company_name }} ajánlatát sikeresen elfogadta.</p>
        <p class="description"> Ezt az oldalt nyugodtan bezárhatja.</p>
    @else
        <h1 class="neon-text-red">Elutasítva.</h1>
        <p class="description">Sajnáljuk, hogy az ajánlat nem nyerte el tetszését.</p>
        <p class="description"> Ezt az oldalt nyugodtan bezárhatja.</p>
    @endif
    </div>
@endsection