<?php

namespace App\Http\Controllers;

use App\Http\Resources\OcdssectorsResource;
use App\Http\Resources\OcdsstatusCollection;
use App\Http\Resources\OcdsstatusesResource;
use App\Models\Ocdsstatus;
use Illuminate\Http\Request;

class OcdsstatusController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $ocdsstatuses = Ocdsstatus::when(request('q') && request('q') == 'all', function($query) {
            return $query->orderBy('name', 'asc');
        })->when(request('name'), function($query) {
            return $query->where('name', request('name'));
        })->get();

        return new OcdsstatusCollection($ocdsstatuses);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Ocdsstatus $ocdsstatus)
    {
        $ocdsstatus = Ocdsstatus::create([
            'code'          => request()->code,
            'name'          => request()->name,
            'name_local'    => request()->name_local,
            'sections_id'   => request()->section_id,
        ]);

        return new OcdsstatusesResource($ocdsstatus);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Ocdsstatus $ocdsstatus)
    {
        return new OcdssectorsResource($ocdsstatus);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Ocdsstatus $ocdsstatus)
    {
        $ocdsstatus->update([
            'code'          => request()->code,
            'name'          => request()->name,
            'name_local'    => request()->name_local,
            'sections_id'   => request()->section_id,
        ]);

        return new OcdsstatusesResource($ocdsstatus);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Document  $document
     * @return \Illuminate\Http\Response
     */
    public function destroy(Ocdsstatus $ocdsstatus)
    {
        $ocdsstatus->delete();
        return response(null, 204);
    }
}
