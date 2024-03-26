<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::with('user') -> get() -> sortByDesc('date');
        return view("posts.index", ['posts' => $posts]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this -> authorize('create', Post::class);

        return view('posts.create', [
            'users' => User::all(),
            'categories' => Tag::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this -> authorize('create', Post::class);

        $validated = $request -> validate(
            [
                'title' => 'required|min:3',
                'content' => 'required',
                'date' => 'required|before_or_equal:now',
                // 'user_id' => 'required|integer|exists:users,id',
                'cats[]' => 'array',
                'cats.*' => 'distinct|integer|exists:tags,id'
            ],
            [
                'title.required' => 'Erzsi, nincs cím!',
                'title.min' => 'Erzsi, adj :min betűt!'
            ]
        );

        // itt átment a validáció fixen :)
        $validated['user_id'] = Auth::id();
        $validated['date'] = \Carbon\Carbon::parse($validated['date']);
        $p = Post::create($validated);
        $p -> tags() -> sync($validated['cats'] ?? []); // n:n
        Session::flash('post-created', $validated['title']);
        return redirect() -> route('posts.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        return view('posts.show', ['post' => $post]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        $this -> authorize('update', $post);

        return view('posts.edit', ['post' => $post, 'categories' => Tag::all()]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        $this -> authorize('update', $post);

        $validated = $request -> validate(
            [
                'title' => 'required|min:3',
                'content' => 'required',
                'date' => 'required|before_or_equal:now',
                // 'user_id' => 'required|integer|exists:users,id',
                'cats[]' => 'array',
                'cats.*' => 'distinct|integer|exists:tags,id'
            ],
            [
                'title.required' => 'Erzsi, nincs cím!',
                'title.min' => 'Erzsi, adj :min betűt!'
            ]
        );

        // itt átment a validáció fixen :)
        $validated['date'] = \Carbon\Carbon::parse($validated['date']);
        $post -> update($validated);
        $post -> tags() -> sync($validated['cats'] ?? []); // n:n
        Session::flash('post-updated', $validated['title']);
        return redirect() -> route('posts.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $this -> authorize('delete', $post);
        $post -> delete();
        return redirect() -> route('posts.index');
    }
}
