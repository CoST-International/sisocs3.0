<?php

namespace App\Http\Controllers;

use App\Http\Resources\SectorCollection;
use App\Http\Resources\SectorsResource;
use App\Models\Sector;
use Illuminate\Http\Request;

class SectorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $sector = Sector::query();

        if (request()->filled('q') && request()->q == 'all') {
            return new SectorCollection($sector->select('id', 'sector_name')->orderBy('sector_name', 'asc')->get());
        } else {
            $sector = $sector->orderBy('id', 'asc')->paginate($this->pagination(request()->limit));
        }

        return new SectorCollection($sector);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Sector $sector)
    {
        $sector = Sector::create([
            'code'                  => request()->code,
            'sector_name'           => request()->sector_name,
            'description'           => request()->description,
            'standard_sectors_id'   => request()->standard_sector_id,
            'enable'                => request()->enable
        ]);

        return new SectorsResource($sector);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Sector $sector)
    {
        return new SectorsResource($sector);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Sector $sector)
    {
        $sector->update([
            'code'                  => request()->code,
            'sector_name'           => request()->sector_name,
            'description'           => request()->description,
            'standard_sectors_id'   => request()->standard_sector_id,
            'enable'                => request()->enable
        ]);

        return new SectorsResource($sector);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Sector $sector)
    {
        $sector->delete();
        return response(null, 204);
    }
}
