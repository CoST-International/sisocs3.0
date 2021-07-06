<?php

namespace App\Http\Controllers;

use App\Http\Resources\LocationCollection;
use App\Http\Resources\LocationsResource;
use App\Models\Location;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $locations = Location::when(request('q') && request('q') == 'all', function($query) {
            return $query->orderBy('id', 'asc');
        })->when(request('project'), function($query) {
            return $query->with(['states', 'cities'])->where('projects_id', request('project'));
        })->get();

        return new LocationCollection($locations);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Location $location)
    {
        $location = Location::create([
            'cities_id'   => request()->city_id,
            'states_id'   => request()->state_id,
            'statuses_id' => request()->status_id,
            'projects_id' => request()->project_id,
        ]);

        return new LocationsResource($location);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Location  $location
     * @return \Illuminate\Http\Response
     */
    public function destroy(Location $location)
    {
        $location->delete();
        return response(null, 204);
    }
}
