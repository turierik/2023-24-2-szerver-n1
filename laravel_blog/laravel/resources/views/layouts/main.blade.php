<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>
    <div class="container mx-auto">
        <div class="grid grid-cols-4">
            <div class="col-span-4 text-3xl text-red-500 pb-8">
                Laravel blog
            </div>
            <div class="col-span-3">
                @yield('content')
            </div>
            <div class="">
                @auth
                    Szia, {{ Auth::user() -> name }}!
                    <form class="mb-4" action="{{ route('logout') }}" method="POST">
                        @csrf
                        <button class="bg-red-700 text-white">Kijelentkezés</button>
                    </form>

                    <a href="{{ route('posts.create') }}">Új bejegyzés</a>
                @endauth

                @guest
                    <a href="{{ route('login') }}">Bejelentkezés</a>
                @endguest
            </div>
        </div>
    </div>
</body>
</html>
