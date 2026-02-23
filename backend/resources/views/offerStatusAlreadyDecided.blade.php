@extends('layouts.baseLayout')

@section('content')
<style>
    .status-card {
        background-color: #1a1a1a;
        padding: 3rem;
        border-radius: 15px;
        text-align: center;
        border: 1px solid #333;
        max-width: 500px;
        width: 100%;
    }

    .text-white {
        color: white;
        text-shadow: 0 0 10px white;
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
</style>

<div class="status-card">
    <h1 class="text-white">Az ajánlat már nem módosítható.</h1>
</div>
@endsection