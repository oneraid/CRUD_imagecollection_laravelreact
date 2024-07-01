<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\LikeImage;
use App\Models\Image;

class LikeImageController extends Controller
{
    public function like($id)
    {
        try {
            $user = Auth::user();
            if (!$user) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            $like = LikeImage::where('user_id', $user->id)->where('image_id', $id)->first();

            if ($like) {
                return response()->json(['message' => 'Already liked'], 200);
            }

            LikeImage::create([
                'user_id' => $user->id,
                'image_id' => $id,
            ]);

            return response()->json(['message' => 'Liked successfully'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong!', 'details' => $e->getMessage()], 500);
        }
    }

    public function unlike($id)
    {
        try {
            $user = Auth::user();
            if (!$user) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            $like = LikeImage::where('user_id', $user->id)->where('image_id', $id)->first();

            if (!$like) {
                return response()->json(['message' => 'Not liked yet'], 200);
            }

            $like->delete();

            return response()->json(['message' => 'Unliked successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong!', 'details' => $e->getMessage()], 500);
        }
    }

    public function likesCount($id)
    {
        try {
            $likesCount = LikeImage::where('image_id', $id)->count();
            return response()->json(['likesCount' => $likesCount], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong!', 'details' => $e->getMessage()], 500);
        }
    }

    public function isLiked($id)
    {
        try {
            $user = Auth::user();
            if (!$user) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            $userLiked = LikeImage::where('user_id', $user->id)->where('image_id', $id)->exists();
            return response()->json(['userLiked' => $userLiked], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong!', 'details' => $e->getMessage()], 500);
        }
    }
}
