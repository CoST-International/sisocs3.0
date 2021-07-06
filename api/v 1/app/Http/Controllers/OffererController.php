<?php

namespace App\Http\Controllers;

use App\Http\Resources\OffererCollection;
use App\Http\Resources\OfferersResource;
use App\Models\Offerer;
use Illuminate\Http\Request;

class OffererController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $offerers = Offerer::when(request('q') && request('q') == 'all', function($query) {
            return $query->orderBy('offerer_name', 'asc');
        })->when(request('offerer'), function($query) {
            return $query->where('offerer_name', request('offerer'));
        })->get();

        return new OffererCollection($offerers);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Offerer $offerer)
    {
        $offerer = Offerer::create([
            'offerer_name'          => request()->offerer_name,
            'offerer_legal_name'    => request()->offerer_legal_name
        ]);

        return new OfferersResource($offerer);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Offerer $offerer)
    {
        return new OfferersResource($offerer);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Offerer $offerer)
    {
        $offerer->update([
            'offerer_name'          => request()->offerer_name,
            'offerer_legal_name'    => request()->offerer_legal_name
        ]);

        return new OfferersResource($offerer);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Offerer $offerer)
    {
        if(in_array(auth()->user()->user_role, [5])) {
            $offerer->delete();
            return response(null, 204);
        }
    }
}
