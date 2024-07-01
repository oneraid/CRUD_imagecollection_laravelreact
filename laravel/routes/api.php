<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\LikeImageController;
use App\Http\Controllers\FavoritesController;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/users', [AuthController::class, 'index']);


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/profile', [AuthController::class, 'profile']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/upload', [ImageController::class, 'upload']);
    Route::get('/images', [ImageController::class, 'index']);
    Route::get('/images/{id}', [ImageController::class, 'show']);
    Route::put('/images/{id}', [ImageController::class, 'update']);
    Route::delete('/images/{id}', [ImageController::class, 'destroy']);
    Route::get('/myimages', [ImageController::class, 'myImages']);

    Route::post('/images/{id}/like', [LikeImageController::class, 'like']);
    Route::delete('/images/{id}/unlike', [LikeImageController::class, 'unlike']);
    Route::get('/images/{id}/likesCount', [LikeImageController::class, 'likesCount']);
    Route::get('/images/{id}/isLiked', [LikeImageController::class, 'isLiked']);

    Route::post('/images/{id}/bookmark', [FavoritesController::class, 'bookmark']);
    Route::delete('/images/{id}/unbookmark', [FavoritesController::class, 'unbookmark']);
    Route::get('/images/{id}/isBookmarked', [FavoritesController::class, 'isBookmarked']);
    Route::get('/images/{id}/bookmarksCount', [FavoritesController::class, 'bookmarksCount']);
    Route::get('/myBookmarks', [FavoritesController::class, 'myBookmarks']);

});


