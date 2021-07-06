<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\TokenRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\OrganizationsResource;
use App\Http\Resources\RolesResource;
use App\Http\Resources\UsersResource;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
    * Create a new AuthController instance.
    *
    * @return void
    */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    public function register(RegisterRequest $request)
    {
        $user = User::create([
            'name'              => $request->name,
            'email'             => $request->email,
            'password'          => Hash::make($request->password),
            'user_role'         => $request->role_id,
            'organization_id'   => $request->organization_id,
        ]);

        return response()->json([
            'user' => $user
        ]);
    }

    /**
        * Get a JWT via given credentials.
        *
        * @return \Illuminate\Http\JsonResponse
        */
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Wrong Credentials, Try Again'], 401);
        }

        return $this->respondWithToken($token);
    }

    /**
        * Get the authenticated User.
        *
        * @return \Illuminate\Http\JsonResponse
        */
    public function me()
    {
        return new UsersResource(auth()->user());
    }

    /**
        * Log the user out (Invalidate the token).
        *
        * @return \Illuminate\Http\JsonResponse
        */
    public function logout()
    {
       auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
        * Refresh a token.
        *
        * @return \Illuminate\Http\JsonResponse
        */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
        * Get the token array structure.
        *
        * @param  string $token
        *
        * @return \Illuminate\Http\JsonResponse
        */
    protected function respondWithToken($token)
    {
        $data = [
            'user'         => new UsersResource(auth('api')->user()),
            'token'        => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ];

        return response()->json($data);
    }
}
