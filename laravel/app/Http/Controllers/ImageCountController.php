<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\LikeImage;
use App\Models\Favorites;
use App\Models\Image;

class ImageCountController extends Controller
{
    public function stats($id)
    {
        try {
            $user = Auth::user();
            if (!$user) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            $likesCount = LikeImage::where('image_id', $id)->count();
            $bookmarksCount = Favorites::where('image_id', $id)->count();
            $userLiked = LikeImage::where('user_id', $user->id)->where('image_id', $id)->exists();
            $isBookmarked = Favorites::where('user_id', $user->id)->where('image_id', $id)->exists();

            return response()->json([
                'likesCount' => $likesCount,
                'bookmarksCount' => $bookmarksCount,
                'userLiked' => $userLiked,
                'isBookmarked' => $isBookmarked
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong!', 'details' => $e->getMessage()], 500);
        }
    }
}

