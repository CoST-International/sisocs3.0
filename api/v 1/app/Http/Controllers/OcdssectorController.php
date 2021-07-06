<?php

namespace App\Http\Controllers;

use App\Http\Resources\OcdssectorCollection;
use App\Models\Ocdssector;
use Illuminate\Http\Request;

class OcdssectorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $ocdsSector = Ocdssector::query();

        if (request()->filled('q') && request()->q == 'all') {
            return new OcdssectorCollection($ocdsSector->select('id', 'code', 'title')->orderBy('title', 'asc')->get());
        } else {
            $ocdsSector = $ocdsSector->orderBy('id', 'asc')->paginate($this->pagination(request()->limit));
        }

        return new OcdssectorCollection($ocdsSector);
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
