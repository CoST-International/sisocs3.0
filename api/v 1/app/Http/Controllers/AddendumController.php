<?php

namespace App\Http\Controllers;

use App\Models\Addendum;
use App\Http\Resources\AddendumResource;
use App\Http\Resources\AddendaCollection;
use Carbon\Carbon;

class AddendumController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $addendum = Addendum::query();

        if(auth()->user()->user_role !== 5) {
            $organization = auth()->user()->organization->id;
            if (request()->filled('q') && request()->q == 'all') {
                return new AddendumResource(Addendum::with('contract', 'contract.project')->whereHas('contract', function($query) use ($organization){
                    $query->where('organizations_id', $organization);
                })->orderByDesc('id')->get());
            } else {
                $addenda = $addendum->whereHas('contract', function($query) use ($organization){
                    $query->with('contract', 'contract.project')->where('organizations_id', $organization);
                })->orderByDesc('id')->paginate($this->pagination(request()->limit));
            }
        } else {
            if (request()->filled('q') && request()->q == 'all') {
                return $addendum->with('contract', 'contract.project')->orderByDesc('id')->get();
            } else {
                $addenda = $addendum->with('contract', 'contract.project')->orderByDesc('id')->paginate($this->pagination(request()->limit));
            }
        }

        return new AddendaCollection($addenda);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Addendum $addenda)
    {
        $addenda = Addendum::create([
            'modification_type'         => request()->modification_type,
            'justification'             => request()->justification,
            'current_price'             => request()->contract_price,
            'currency_id'               => request()->currency_id,
            'currenct_contract_scope'   => request()->currenct_contract_scope,
            'date'                      => request()->date,
            'contract_date'             => request()->contract_date,
            'contracts_id'              => request()->contract_id,
            'statuses_id'               => in_array(auth()->user()->id, [25]) ? 1 : request()->status_id,
            'standard_status_id'        => request()->standard_status_id,
            'user_creation'             => auth()->user()->id,
            'published_at'              => in_array(request()->status_id, [2]) ? Carbon::now()->toDateTimeString() : '',
        ]);

        return new AddendumResource($addenda->load('contract'));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Addendum $addenda)
    {
        return new AddendumResource($addenda);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Addendum $addenda)
    {
        $addenda->update([
            'modification_type'         => request()->modification_type,
            'justification'             => request()->justification,
            'current_price'             => request()->contract_price,
            'currency_id'               => request()->currency_id,
            'currenct_contract_scope'   => request()->currenct_contract_scope,
            'date'                      => request()->date,
            'contract_date'             => request()->contract_date,
            'contracts_id'              => request()->contract_id,
            'statuses_id'               => in_array(auth()->user()->user_role, [25]) ? 1 : request()->status_id,
            'standard_status_id'        => request()->standard_status_id,
            'published_at'              => in_array(request()->status_id, [2]) ? Carbon::now()->toDateTimeString() : '',
        ]);

        return new AddendumResource($addenda);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Addendum $addendum)
    {
        $addendum->delete();
        return response(null, 204);
    }
}
