<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\UsersResource;
use App\Http\Resources\UserCollection;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::query();

        if(auth()->user()->user_role !== 5) {
            $organization = auth()->user()->organization->id;
            $userId = auth()->user()->id;
            return new UserCollection(
                User::where([ ['id', '!=', $userId], ['organization_id', $organization]])->orderByDesc('id')->get()
            );
        } else {
            return User::orderByDesc('id')->paginate($this->pagination(request()->limit));
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return new UsersResource($user->load([
            'role', 'organization',
        ]));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(User $user)
    {
        $user->update([
            'name'              => request()->name,
            // 'email'             => request()->email,
            'password'          => Hash::make(request()->password),
            'user_role'         => request()->role_id,
            'organization_id'   => request()->organization_id,
        ]);

        return new UsersResource($user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response(null, 204);
    }
}
