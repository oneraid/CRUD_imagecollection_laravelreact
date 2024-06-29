<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Image;
use Illuminate\Support\Facades\Auth;

class ImageController extends Controller
{
    public function upload(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $validatedData = $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:5048',
            'title' => 'required',
            'description' => 'required',
        ]);

        $imageFile = $request->file('image');
        $extension = $imageFile->getClientOriginalExtension();
        $imageName = time() . '.' . $extension;
        $imageFile->move(public_path('images'), $imageName);

        $dataStore = [
            'title' => $validatedData['title'],
            'description' => $validatedData['description'],
            'url' => $imageName,
            'user_id' => $user->id,
        ];

        $image = Image::create($dataStore);

        return response()->json([
            'success' => true,
            'message' => 'Image uploaded successfully',
            'data' => $image,
        ], 201);
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
            unlink($imagePath);
        }

        $image->delete();

        return response()->json(['message' => 'Image deleted successfully'], 200);
    }

    public function update(Request $request, $id)
    {
        $user = auth()->user();
        $image = Image::where('id', $id)->where('user_id', $user->id)->first();

        if (!$image) {
            return response()->json(['error' => 'Image not found or unauthorized'], 404);
        }

        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'image' => 'sometimes|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $oldImagePath = public_path('/images') . '/' . $image->url;
            if (file_exists($oldImagePath)) {
                unlink($oldImagePath);
            }

            $imagefile = $request->file('image');
            $extension = $imagefile->getClientOriginalExtension();
            $imageName = time() . '.' . $extension;
            $imagefile->move(public_path('/images'), $imageName);
            $image->url = $imageName;
        }

        $image->title = $request->title;
        $image->description = $request->description;
        $image->save();

        return response()->json(['message' => 'Image updated successfully', 'data' => $image], 200);
    }
}
