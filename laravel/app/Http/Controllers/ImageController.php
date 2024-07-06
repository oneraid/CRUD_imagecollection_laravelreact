<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Image;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ImageController extends Controller
{
    public function upload(Request $request)
    {
        try {
            $user = Auth::user();

            if (!$user) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:10048',
                'title' => 'required|string|max:258',
                'description' => 'required|string',
            ]);

            $imageFile = $request->file('image');
            $imageName = Str::random(32) . "." . $imageFile->getClientOriginalExtension();
            $imageFile->move(public_path('images'), $imageName);

            $imageUrl = asset('images/' . $imageName);

            $image = Image::create([
                'title' => $request->title,
                'description' => $request->description,
                'image' => $imageName,
                'url' => $imageUrl,
                'user_id' => $user->id,
            ]);

            return response()->json([
                'message' => 'Image uploaded successfully',
                'data' => $image,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function index()
    {
        $images = Image::with('user')->get();
        return response()->json($images);
    }

    public function myImages()
    {
        $user = auth()->user();

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $images = Image::where('user_id', $user->id)->get();
        return response()->json($images);
    }

    public function destroy($id)
{
    $user = auth()->user();
    $image = Image::where('id', $id)->where('user_id', $user->id)->first();

    if (!$image) {
        return response()->json(['error' => 'Image not found or unauthorized'], 404);
    }

    $imagePath = public_path('/images') . '/' . $image->url;
    if (file_exists($imagePath)) {
        unlink($imagePath); // Menghapus file dari direktori
    }

    $image->delete();

    return response()->json(['message' => 'Image deleted successfully'], 200);
}

    public function update(Request $request, $id)
    {
        try {
            $user = Auth::user();
            $image = Image::find($id);

            if (!$image) {
                return response()->json(['error' => 'Image not found'], 404);
            }

            if ($user->id !== $image->user_id) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            $request->validate([
                'title' => 'required|string|max:258',
                'description' => 'required|string',
                'image' => 'sometimes|image|mimes:jpeg,png,jpg,gif,svg|max:10048',
            ]);

            if ($request->hasFile('image')) {
                $currentImage = public_path('images') . '/' . $image->image;
                if (file_exists($currentImage)) {
                    @unlink($currentImage);
                }

                $newImageName = Str::random(32) . "." . $request->file('image')->getClientOriginalExtension();
                $request->file('image')->move(public_path('images'), $newImageName);
                $image->image = $newImageName;
                $image->url = asset('images/' . $newImageName);
            }

            $image->title = $request->title;
            $image->description = $request->description;
            $image->save();

            return response()->json([
                'message' => 'Image updated successfully',
                'data' => $image,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
{
    try {
        $image = Image::findOrFail($id);
        $user = $image->user()->first();

        $uploadedBy = $user ? $user->name : 'Unknown';

        // Tambahkan informasi pengguna dan waktu unggah ke dalam array respons
        $imageData = [
            'id' => $image->id,
            'title' => $image->title,
            'description' => $image->description,
            'url' => $image->url,
            'uploaded_by' => $uploadedBy,
            'created_at' => $image->created_at->toDateTimeString(), // Ubah format waktu jika perlu
        ];

        return response()->json($imageData);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Image not found'], 404);
    }
}


}
