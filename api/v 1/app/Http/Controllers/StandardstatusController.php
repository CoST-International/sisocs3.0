<?php

namespace App\Http\Controllers;

use App\Http\Resources\StandardstatusCollection;
use App\Models\Standardstatus;
use Illuminate\Http\Request;

class StandardstatusController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $standardStatus = Standardstatus::when(request('q') && request('q') == 'all', function($query) {
            return $query->orderBy('sections_id', 'asc');
        })->when(request('section'), function($query) {
            return $query->where('sections_id', request('section'));
        })->get();

        return new StandardstatusCollection($standardStatus);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
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
    public function destroy($id)
    {
        //
    }
}
