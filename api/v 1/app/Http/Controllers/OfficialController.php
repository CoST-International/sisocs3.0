<?php

namespace App\Http\Controllers;

use App\Http\Resources\OfficialCollection;
use App\Http\Resources\OfficialsResource;
use App\Models\Official;
use Illuminate\Http\Request;

class OfficialController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $official = Official::query();
        if(!in_array(auth()->user()->user_role, [5])) {
            $organizationId = auth()->user()->organization->id;
            if (request()->filled('q') && request()->q == 'all') {
                return new OfficialCollection(Official::with(['organization', 'organizationUnit'])->where('organizations_id', $organizationId)->orderByDesc('id')->get());
            } else {
                $officials = $official->with(['organization', 'organizationUnit'])->where('organizations_id', $organizationId)->orderByDesc('id')->paginate($this->pagination(request()->limit));
            }
        } else {
            if (request()->filled('q') && request()->q == 'all') {
                return new OfficialCollection(Official::with(['organization', 'organizationUnit'])->orderByDesc('id')->get());
            } else {
                $officials = $official->with(['organization', 'organizationUnit'])->orderByDesc('id')->paginate($this->pagination(request()->limit));
            }
        }


        return new OfficialCollection($officials);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Official $official)
    {
        $official = Official::create([
            'organizations_id'      => request()->organization_id,
            'organization_units_id' => request()->organization_unit_id,
            'official_name'         => request()->official_name,
            'position'              => request()->position,
            'email'                 => request()->email,
            'phone'                 => request()->phone
        ]);

        return new OfficialsResource($official);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Official $official)
    {
        return new OfficialsResource($official);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Official $official)
    {
        $official->update([
            'organizations_id'      => request()->organization_id,
            'organization_units_id' => request()->organization_unit_id,
            'official_name'         => request()->official_name,
            'position'              => request()->position,
            'email'                 => request()->email,
            'phone'                 => request()->phone
        ]);

        return new OfficialsResource($official);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Official $official)
    {
        $official->delete();
        return response(null, 204);
    }
}
