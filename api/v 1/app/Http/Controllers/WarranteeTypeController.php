<?php

namespace App\Http\Controllers;

use App\Http\Resources\WarranteeCollection;
use App\Http\Resources\WarranteesResource;
use App\Models\Warrantee;
use App\Models\WarranteeType;
use Illuminate\Http\Request;

class WarranteeTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $guarantees = Warrantee::query();

        if (request()->filled('q') && request()->q == 'all') {
            return $guarantees->select('id', 'type_name')->orderBy('id', 'asc')->get();
        } else {
            $guarantees = $guarantees->orderBy('id', 'asc')->paginate($this->pagination(request()->limit));
        }

        return new WarranteeCollection($guarantees);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(WarranteeType $warranteeType)
    {
        $warranteeType = WarranteeType::create([
            'type_name' => request()->name
        ]);

        return new WarranteesResource($warranteeType);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(WarranteeType $warranteeType)
    {
        return new WarranteesResource($warranteeType);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(WarranteeType $warranteeType)
    {
        $warranteeType->update([
            'type_name' => request()->name
        ]);

        return new WarranteesResource($warranteeType);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(WarranteeType $warranteeType)
    {
        $warranteeType->delete();
        return response(null, 204);
    }
}
