<?php

namespace App\Http\Controllers;

use App\Http\Resources\TenderOffererCollection;
use App\Http\Resources\TenderOfferersResource;
use App\Models\TenderOfferer;
use Illuminate\Http\Request;

class TenderOffererController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tenderOfferer = TenderOfferer::when(request('q') && request('q') == 'all', function($query) {
            return $query->with('offerers')->orderByDesc('id');
        })->when(request('offerer'), function($query) {
            return $query->with('offerers')->where('offerer_name', request('offerer'));
        })->when(request('tender'), function($query) {
            return $query->with('offerers')->where('tenders_id', request('tender'));
        })->get();

        return new TenderOffererCollection($tenderOfferer);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(TenderOfferer $tenderOfferer)
    {
        $tenderOfferer = TenderOfferer::create([
            'tenders_id'    => request()->tender_id,
            'offerers_id'   => request()->offerer_id,
            'statuses_id'   => request()->status_id
        ]);

        return new TenderOfferersResource($tenderOfferer);
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(TenderOfferer $tenderOfferer)
    {
        $tenderOfferer->delete();
        return response(null, 204);
    }
}
