<?php

namespace App\Http\Controllers;

use App\Http\Resources\RoleCollection;
use App\Http\Resources\RolesResource;
use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $role = Role::query();

        if (request()->filled('q') && request()->q == 'all') {
            return new RoleCollection($role->select('id', 'role_name')->where('id', '!=', 5)->orderByDesc('id')->get());
        } else {
            $role = $role->orderByDesc('id')->where('id', '!=', 5)->paginate($this->pagination(request()->limit));
        }

        return new RoleCollection($role);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Role $role)
    {
        $role = Role::create([
            'role_name' => request()->name
        ]);

        return new RolesResource($role);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Role $role)
    {
        return new RolesResource($role);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Role $role)
    {
        $role = $role->update([
            'role_name' => request()->name
        ]);

        return new RolesResource($role);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Role $role)
    {
        $role->delete();
        return response(null, 204);
    }
}
