<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

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
        return view('posts.create', [
            'users' => User::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request -> validate(
            [
                'title' => 'required|min:3',
                'content' => 'required',
                'date' => 'required|before_or_equal:now',
                'user_id' => 'required|integer|exists:users,id'
            ],
            [
                'title.required' => 'Erzsi, nincs cím!',
                'title.min' => 'Erzsi, adj :min betűt!'
            ]
        );

        // itt átment a validáció fixen :)
        $validated['date'] = \Carbon\Carbon::parse($validated['date']);
        Post::create($validated);
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        //
    }
}
