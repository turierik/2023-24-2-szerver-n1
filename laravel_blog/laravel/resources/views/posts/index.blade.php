@extends('layouts.main')

@section('content')

    @if(Session::has('post-created'))
        <div class="bg-green-500 text-xl rounded rounded-xl text-center mb-4">
            <b>{{ Session::get('post-created') }}</b> című bejegyzés sikeresen létrehozva!
        </div>
    @endif

    @forelse($posts as $p)
        {{ $p -> date }} <a href="{{ route('posts.show', ['post' => $p]) }}">{{ $p -> title }}</a> <b>{{ $p -> user -> name }}</b><br>
    @empty
        Nincsenek bejegyzések...
    @endforelse
@endsection
