<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ImageController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/profile', [AuthController::class, 'profile']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/upload', [ImageController::class, 'upload']);
    Route::get('/images', [ImageController::class, 'index']);

    Route::get('/myimages', [ImageController::class, 'myImages']);
    Route::delete('/images/{id}', [ImageController::class, 'destroy']);
    Route::put('/images/{id}', [ImageController::class, 'update']);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/users', [AuthController::class, 'index']);






// Route::get('/explore', [AuthController::class, 'index']);
// Route::get('/pin', [AuthController::class, 'index']);
// Route::get('/pinned', [AuthController::class, 'index']);
// Route::get('/explore-detail', [AuthController::class, 'index']);
// Route::get('/follows', [AuthController::class, 'index']);
// Route::get('/mypin', [AuthController::class, 'index']);
