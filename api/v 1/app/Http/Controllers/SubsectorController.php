<?php

namespace App\Http\Controllers;

use App\Http\Resources\SubsectorCollection;
use App\Http\Resources\SubsectorsResource;
use App\Models\Subsector;
use Illuminate\Http\Request;

class SubsectorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $subSector = Subsector::query();

        if (request()->filled('q') && request()->q == 'all') {
            return new SubsectorCollection($subSector->select('id', 'subsector_name')->orderBy('subsector_name', 'asc')->get());
        } else {
            $subSector = $subSector->orderBy('id', 'asc')->paginate($this->pagination(request()->limit));
        }

        return new SubsectorCollection($subSector);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Subsector $subsector)
    {
        $subsector = Subsector::create([
            'sectors_id'        => request()->sector_id,
            'subsector_name'    => request()->subsector_name
        ]);

        return new SubsectorsResource($subsector);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Subsector $subsector)
    {
        return new SubsectorsResource($subsector);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Subsector $subsector)
    {
        $subsector->create([
            'sectors_id'        => request()->sector_id,
            'subsector_name'    => request()->subsector_name
        ]);

        return new SubsectorsResource($subsector);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Subsector $subsector)
    {
        $subsector->delete();
        return response(null, 204);
    }
}
