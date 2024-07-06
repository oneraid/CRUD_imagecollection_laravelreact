<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
class AuthController extends Controller
{

    public function register(Request $request)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        // Create the user
        $user = User::create([
            'name' => $request->name,
            'bio' => $request->bio,
            'pictures' => $request->pictures,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Return a successful response
        return response()->json([
            'success' => true,
            'message' => 'User registered successfully',
            'token' => $user->createToken('auth_token')->plainTextToken,
        ], 201);
    }

    public function index()
    {
        $users = User::all();

        return response()->json([
            'success' => true,
            'users' => $users,
        ], 200);
    }




    public function login(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:8',
        ]);

        if($validator->fails()){
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        if(!Auth::attempt($request->only('email', 'password'))){
            return response()->json([
                'success' => false,
                'message' => 'email or password is incorrect',
            ], 401);
        }

        $user = User::where('email', $request['email'])->first();
        return response()->json([
            'success' => true,
            'message' => 'User logged in successfully',
            'token' => $user->createToken('auth_token')->plainTextToken,
        ], 200);
    }

    public function profile(){
        $validator = auth()->user();
        return response()->json([
            'status' => true,
            'message' => 'profile user',
            'data' => $validator,
            'id' => auth()->user()->id,
        ], 200);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'status' => true,
            'message' => 'Logout successful',
        ], 200);
    }

    public function getProfile() {
        $user = Auth::user();
        return response()->json([
            'status' => true,
            'message' => 'Profile user',
            'data' => $user,
        ], 200);
    }


}
