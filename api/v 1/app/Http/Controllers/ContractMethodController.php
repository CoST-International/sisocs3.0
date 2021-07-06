<?php

namespace App\Http\Controllers;

use App\Http\Resources\ContractMethodCollection;
use App\Http\Resources\ContractMethodsResource;
use App\Http\Resources\ContractsResource;
use App\Models\ContractMethod;
use Illuminate\Http\Request;

class ContractMethodController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $contractMethods = ContractMethod::query();

        if (request()->filled('q') && request()->q == 'all') {
            return new ContractMethodCollection($contractMethods->select('id', 'method_name')->orderBy('method_name', 'asc')->get());
        } else {
            $contractMethods = $contractMethods->orderBy('id', 'asc')->paginate($this->pagination(request()->limit));
        }

        return new ContractMethodCollection($contractMethods);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ContractMethod $contractMethod)
    {
        $contractMethod = ContractMethod::create([
            'method_name' => request()->name
        ]);

        return new ContractMethodsResource($contractMethod);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(ContractMethod $contractMethod)
    {
        return new ContractMethodsResource($contractMethod);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ContractMethod $contractMethod)
    {
        $contractMethod->update([
            'method_name' => request()->name
        ]);

        return new ContractMethodsResource($contractMethod);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(ContractMethod $contractMethod)
    {
        $contractMethod->delete();
        return response(null, 204);
    }
}
