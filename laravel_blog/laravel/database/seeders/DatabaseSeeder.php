<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Post;
use App\Models\Tag;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $users = collect();
        for ($i = 0; $i < 10; $i++){
            $user = User::create([
                'email' => 'user'.$i.'@szerveroldali.hu',
                'name' => fake('hu_HU') -> name(),
                'password' => password_hash('password', PASSWORD_DEFAULT),
                'is_admin' => rand(1, 5) < 2
            ]);
            $users -> add($user);
        }

        $posts = collect();
        for ($i = 0; $i < 10; $i++){
            $post = Post::create([
                'title' => fake() -> sentence(),
                'content' => fake() -> text(),
                'date' => fake() -> dateTime(),
                'user_id' => $users -> random() -> id
            ]);
            $posts -> add($post);
        }

        for ($i = 0; $i < 5; $i++){
            $tag = Tag::create([
                'name' => fake() -> word()
            ]);

            // n:n kapcsolat:
            // - attach
            // - detach
            // - sync
            // - toggle

            $tag -> posts() -> sync(
                $posts -> random(rand(2, 5)) -> pluck('id')
            );
        }
    }
}
