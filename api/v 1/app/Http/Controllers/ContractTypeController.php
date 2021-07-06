<?php

namespace App\Http\Controllers;

use App\Http\Resources\ContractTypeCollection;
use App\Http\Resources\ContractTypesResource;
use App\Models\ContractType;
use Illuminate\Http\Request;

class ContractTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $contractType = ContractType::query();

        if (request()->filled('q') && request()->q == 'all') {
            return new ContractTypeCollection($contractType->select('id', 'type_name')->orderBy('type_name', 'asc')->get());
        } else {
            $contractType = $contractType->orderBy('id', 'asc')->paginate($this->pagination(request()->limit));
        }

        return new ContractTypeCollection($contractType);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ContractType $contractType)
    {
        $contractType = ContractType::create([
            'code'          => request()->code,
            'type_name'     => request()->type_name,
            'type_local'    => request()->type_local,
        ]);

        return new ContractTypesResource($contractType);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(ContractType $contractType)
    {
        return new ContractTypesResource($contractType);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ContractType $contractType)
    {
        $contractType->update([
            'code'          => request()->code,
            'type_name'     => request()->type_name,
            'type_local'    => request()->type_local,
        ]);

        return new ContractTypesResource($contractType);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(ContractType $contractType)
    {
        $contractType->delete();
        return response(null, 204);
    }
}
