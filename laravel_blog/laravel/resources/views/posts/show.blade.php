@extends('layouts.main')

@section('content')

    @can('update', $post)
        <a href="{{ route('posts.edit', ['post' => $post ])}}">Szerkesztés</a><br>
    @endcan

    @can('delete', $post)
    <form action="{{ route('posts.destroy', ['post' => $post ])}}" method="POST">
        @csrf
        @method('DELETE')
        <a href="#" onclick="this.closest('form').submit()">Törlés</a>
    </form>
    @endcan

    <h1 class="text-xl">{{ $post -> title }}</h1>
    {{ $post -> content }}
@endsection
