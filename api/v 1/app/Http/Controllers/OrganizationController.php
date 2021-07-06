<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrganizationCollection;
use App\Http\Resources\OrganizationsResource;
use App\Models\Organization;
use Illuminate\Http\Request;

class OrganizationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $organization = Organization::query();

        if(!in_array(auth()->user()->user_role, [5])) {
            $organizationId = auth()->user()->organization->id;
            if (request()->filled('q') && request()->q == 'all') {
                return Organization::where('id', $organizationId)->orderByDesc('id')->get();
            } else {
                $organizations = $organization->where('id', $organizationId)->orderByDesc('id')->paginate($this->pagination(request()->limit));
            }
        } else {
            if (request()->filled('q') && request()->q == 'all') {
                return Organization::select('id', 'organization_name', 'identifier')->orderBy('project_code', 'asc')->get();
            } else {
                $organizations = $organization->orderByDesc('id')->paginate($this->pagination(request()->limit));
            }
        }


        return new OrganizationCollection($organizations);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Organization $organization)
    {
        $organization = Organization::create([
            'organization_name'         => request()->organization_name,
            'organization_legal_name'   => request()->organization_legal_name,
            'identifier'                => request()->identifier,
            'description'               => request()->description,
            'address'                   => request()->address,
            'phone'                     => request()->phone,
            'postal_code'               => request()->postal_code,
            'website'                   => request()->website,
            'ocds_code'                 => request()->ocds_code,
            'code'                      => request()->code
        ]);

        return new OrganizationsResource($organization);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Organization $organization)
    {
        return new OrganizationsResource($organization);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Organization $organization)
    {
        $organization->update([
            'organization_name'         => request()->organization_name,
            'organization_legal_name'   => request()->organization_legal_name,
            'identifier'                => request()->identifier,
            'description'               => request()->description,
            'address'                   => request()->address,
            'phone'                     => request()->phone,
            'postal_code'               => request()->postal_code,
            'website'                   => request()->website,
            'ocds_code'                 => request()->ocds_code,
            'code'                      => request()->code
        ]);

        return new OrganizationsResource($organization);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Organization $organization)
    {
        $organization->delete();
        return response(null, 204);
    }
}
