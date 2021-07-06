<?php

namespace App\Http\Controllers;

use App\Http\Resources\PurposeCollection;
use App\Http\Resources\PurposesResource;
use App\Models\Purpose;
use Illuminate\Http\Request;

class PurposeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $purpose = Purpose::query();

        if (request()->filled('q') && request()->q == 'all') {
            return new PurposeCollection($purpose->select('id', 'purpose_name')->orderBy('purpose_name', 'asc')->get());
        } else {
            $purpose = $purpose->orderBy('id', 'asc')->paginate($this->pagination(request()->limit));
        }

        return new PurposeCollection($purpose);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Purpose $purpose)
    {
        $purpose = Purpose::create([
            'code'          => request()->code,
            'purpose_name'  => request()->purpose_name
        ]);

        return new PurposesResource($purpose);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Purpose $purpose)
    {
        return new PurposesResource($purpose);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Purpose $purpose)
    {
        $purpose->update([
            'code'          => request()->code,
            'purpose_name'  => request()->purpose_name
        ]);

        return new PurposesResource($purpose);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Purpose $purpose)
    {
        $purpose->delete();
        return response(null, 204);
    }
}
