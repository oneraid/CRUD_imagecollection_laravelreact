<?php

namespace App\Http\Controllers;

use App\Models\Favorites;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class FavoritesController extends Controller
{
    public function bookmark($id)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        try {
            DB::beginTransaction();

            $exists = Favorites::where('user_id', $user->id)->where('image_id', $id)->exists();
            if ($exists) {
                return response()->json(['message' => 'Already bookmarked'], 200);
            }

            Favorites::create([
                'user_id' => $user->id,
                'image_id' => $id,
            ]);

            DB::commit();

            return response()->json(['message' => 'Image bookmarked successfully'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Something went wrong', 'message' => $e->getMessage()], 500);
        }
    }

    public function unbookmark($id)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        try {
            DB::beginTransaction();

            Favorites::where('user_id', $user->id)->where('image_id', $id)->delete();

            DB::commit();

            return response()->json(['message' => 'Image unbookmarked successfully'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Something went wrong', 'message' => $e->getMessage()], 500);
        }
    }

    public function isBookmarked($id)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $isBookmarked = Favorites::where('user_id', $user->id)->where('image_id', $id)->exists();

        return response()->json(['isBookmarked' => $isBookmarked], 200);
    }

    public function bookmarksCount($id)
    {
        $count = Favorites::where('image_id', $id)->count();

        return response()->json(['bookmarksCount' => $count], 200);
    }

    public function myBookmarks()
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Memuat relasi `image` dan `user`
        $bookmarkedImages = Favorites::where('user_id', $user->id)
            ->with('image', 'image.user') // Load the image and its user relation
            ->get();

        return response()->json($bookmarkedImages);
    }

}

