<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\User;
use Illuminate\Support\Facades\File;

class ProfileUpdateController extends Controller
{
    public function update(Request $request, User $user)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'bio' => 'nullable|string',
                'pictures' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            $user = $request->user();

            $user->name = $validatedData['name'];
            $user->bio = $validatedData['bio'];

            if ($request->hasFile('pictures')) {
                // Menghapus gambar lama jika ada
                if ($user->pictures) {
                    $this->deleteOldProfilePicture($user->pictures);
                }

                // Upload gambar baru
                $imageFile = $request->file('pictures');
                $imageName = Str::random(32) . '.' . $imageFile->getClientOriginalExtension();
                $imageFile->move(public_path('photos_profile'), $imageName);
                $user->pictures = $imageName;
            }

            $user->save();

            // Response dengan data pengguna yang diperbarui
            return response()->json(['user' => $user]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    private function deleteOldProfilePicture($path)
    {
        // Mendapatkan path file lokal dari URL gambar
        $filePath = public_path($path);

        // Memastikan file ada dan menghapusnya
        if (File::exists($filePath)) {
            File::delete($filePath);
        }
    }
}
