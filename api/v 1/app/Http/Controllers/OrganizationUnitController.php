<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrganizationunitCollection;
use App\Http\Resources\OrganizationunitsResource;
use App\Models\OrganizationUnit;
use Illuminate\Http\Request;

class OrganizationUnitController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $organizationUnits = OrganizationUnit::query();
        if(!in_array(auth()->user()->user_role, [5])) {
            $organizationId = auth()->user()->organization->id;
            if (request()->filled('q') && request()->q == 'all') {
                return new OrganizationunitCollection(OrganizationUnit::where('organizations_id', $organizationId)->orderByDesc('id')->get());
            } else {
                $organizationUnits = $organizationUnits->where('organizations_id', $organizationId)->orderByDesc('id')->paginate($this->pagination(request()->limit));
            }
        } else {
            if (request()->filled('q') && request()->q == 'all') {
                return new OrganizationunitCollection(OrganizationUnit::orderByDesc('id')->get());
            } else {
                $organizationUnits = $organizationUnits->orderByDesc('id')->paginate($this->pagination(request()->limit));
            }
        }

        return new OrganizationunitCollection($organizationUnits);
    }

     /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(OrganizationUnit $organizationUnit)
    {
        $organizationUnit = OrganizationUnit::create([
            'unit_name'         => request()->name,
            'organizations_id'  => request()->organization_id,
        ]);

        return new OrganizationunitsResource($organizationUnit);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(OrganizationUnit $organizationUnit)
    {
        return new OrganizationunitsResource($organizationUnit);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(OrganizationUnit $organizationUnit)
    {
        $organizationUnit->update([
            'unit_name'         => request()->name,
            'organizations_id'  => request()->organization_id,
        ]);

        return new OrganizationunitsResource($organizationUnit);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(OrganizationUnit $organizationUnit)
    {
        $organizationUnit->delete();
        return response(null, 204);
    }
}
