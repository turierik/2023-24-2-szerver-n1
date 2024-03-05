@extends('layouts.main')

@section('content')
    <h1 class="text-xl">{{ $post -> title }}</h1>
    {{ $post -> content }}
@endsection