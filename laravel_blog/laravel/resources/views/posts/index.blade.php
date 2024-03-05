@extends('layouts.main')

@section('content')
    @foreach($posts as $p)
        {{ $p -> date }} <a href="{{ route('posts.show', ['post' => $p]) }}">{{ $p -> title }}</a> <b>{{ $p -> user -> name }}</b><br>
    @endforeach
@endsection