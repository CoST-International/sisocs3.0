<?php

namespace App\Http\Controllers;

use App\Http\Resources\TenderMethodCollection;
use App\Http\Resources\TenderMethodsResource;
use App\Models\Tender;
use App\Models\Tendermethod;
use Illuminate\Http\Request;

class TendermethodController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tenderMethods = Tendermethod::query();

        if (request()->filled('q') && request()->q == 'all') {
            return $tenderMethods->select('id', 'method_name')->orderBy('id', 'asc')->get();
        } else {
            $tenderMethods = $tenderMethods->orderBy('id', 'asc')->paginate($this->pagination(request()->limit));
        }

        return new TenderMethodCollection($tenderMethods);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Tendermethod $tendermethod)
    {
        $tendermethod = Tendermethod::create([
            'code'          => request()->code,
            'method_name'   => request()->method_name,
            'acronym'       => request()->acronym,
            'method_local'  => request()->method_local
        ]);

        return new TenderMethodsResource($tendermethod);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Tendermethod $tendermethod)
    {
        return new TenderMethodsResource($tendermethod);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Tendermethod $tendermethod)
    {
        $tendermethod->update([
            'code'          => request()->code,
            'method_name'   => request()->method_name,
            'acronym'       => request()->acronym,
            'method_local'  => request()->method_local
        ]);

        return new TenderMethodsResource($tendermethod);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Tendermethod $tendermethod)
    {
        $tendermethod->delete();
        return response(null, 204);
    }
}
