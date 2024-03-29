@extends('layouts.main')

@section('content')

<form action="{{ route('posts.store') }}" method="POST">
    @csrf

    Cím:<br>
    <input type="text" name="title" value="{{ old('title', '') }}">
    @error('title')
        <span class="text-red-500">{{ $message }}</span>
    @enderror
    <br><br>

    Tartalom:<br>
    <textarea name="content">{{ old('content', '') }}</textarea>
    @error('content')
        <span class="text-red-500">{{ $message }}</span>
    @enderror

    <br><br>Dátum:<br>
    <input type="date" name="date" value="{{ old('date', '') }}">
    @error('date')
        <span class="text-red-500">{{ $message }}</span>
    @enderror<br><br>

    Kategóriák:<br>
    @foreach($categories as $c)
        <input type="checkbox" name="cats[]" value="{{ $c -> id }}"> {{ $c -> name }}<br>
    @endforeach

    <button class="bg-green-500 hover:bg-green-700 active:bg-blue-700" type="submit">Mentés</button>
</form>

@endsection
