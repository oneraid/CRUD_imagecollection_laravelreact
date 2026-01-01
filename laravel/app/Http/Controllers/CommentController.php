<?php

namespace App\Http\Controllers;

use App\Models\Comments;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function index(Request $request)
{
    try {
        $imageId = $request->query('image_id');

        // Lakukan validasi jika parameter image_id tidak ada
        if (!$imageId) {
            return response()->json(['error' => 'Parameter image_id is required'], 400);
        }

        $comments = Comments::with(['user', 'image'])
            ->where('image_id', $imageId)
            ->get();

        return response()->json($comments);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}


    public function show($id)
    {
        $comment = Comments::with(['user', 'image'])->find($id);

        if (!$comment) {
            return response()->json(['message' => 'Comment not found'], 404);
        }

        return response()->json($comment);
    }

    public function store(Request $request)
    {
        $request->validate([
            'image_id' => 'required|exists:image,id',
            'text' => 'required|string|max:255',
        ]);

        $comment = Comments::create([
            'user_id' => Auth::id(),
            'image_id' => $request->image_id,
            'text' => $request->text,
        ]);

        $comment->load('user', 'image'); // Load relationships

        return response()->json($comment, 201);
    }

    public function update(Request $request, $id)
    {
        $comment = Comments::find($id);

        if (!$comment) {
            return response()->json(['message' => 'Comment not found'], 404);
        }

        $user = Auth::user();

        // Otorisasi manual
        if ($comment->user_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'text' => 'required|string|max:255',
        ]);

        $comment->update($request->only('text'));

        return response()->json($comment);
    }

    public function destroy($id)
    {
        $comment = Comments::find($id);

        if (!$comment) {
            return response()->json(['message' => 'Comment not found'], 404);
        }

        $user = Auth::user();

        // Otorisasi manual
        if ($comment->user_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $comment->delete();

        return response()->json(['message' => 'Comment deleted successfully']);
    }
}
