<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/users', [AuthController::class, 'index']);

Route::group([
    'middleware' => ['auth:sanctum']
],function(){
    Route::get('/profile', [AuthController::class, 'index']);
    Route::get('/logout', [AuthController::class, 'index']);

    Route::get('/explore', [AuthController::class, 'index']);
    // Route::get('/pin', [AuthController::class, 'index']);
    // Route::get('/pinned', [AuthController::class, 'index']);
    // Route::get('/explore-detail', [AuthController::class, 'index']);
    // Route::get('/follows', [AuthController::class, 'index']);
    // Route::get('/mypin', [AuthController::class, 'index']);

});
