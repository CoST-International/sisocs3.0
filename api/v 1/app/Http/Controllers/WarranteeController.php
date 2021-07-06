<?php

namespace App\Http\Controllers;

use App\Http\Resources\WarranteeCollection;
use App\Http\Resources\WarranteesResource;
use App\Models\Warrantee;
use Illuminate\Http\Request;

class WarranteeController extends Controller
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
            return $guarantees->select('id', 'contract_number', 'process_number', 'contract_estimate_cost')->with('guaranteeType')->orderByDesc('id')->get();
        } else {
            $guarantees = $guarantees->with('guaranteeType')->orderByDesc('id')->paginate($this->pagination(request()->limit));
        }

        return new WarranteeCollection($guarantees);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Warrantee $guarantee)
    {
        $guarantee = Warrantee::create([
            'contract_number'   => request()->contract_number,
            'amount'            => request()->amount,
            'expiration_date'   => request()->expiration_date,
            'executions_id'     => request()->execution_id,
            'contracts_id'      => request()->contract_id,
            'waranty_types_id'  => request()->waranty_type_id,
            'statuses_id'       => in_array(auth()->user()->id, [1, 2, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21, 22, 23, 25]) ? 1 : request()->status_id,
            'user_creation'     => request()->user_creation,
            'published_at'      => request()->published_at,
        ]);

        return new WarranteesResource($guarantee);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Warrantee $guarantee)
    {
        return new WarranteesResource($guarantee->load('guaranteeType'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Warrantee $guarantee)
    {
        $guarantee->update([
            'contract_number'   => request()->contract_number,
            'amount'            => request()->amount,
            'expiration_date'   => request()->expiration_date,
            'executions_id'     => request()->execution_id,
            'contracts_id'      => request()->contract_id,
            'waranty_types_id'  => request()->waranty_type_id,
            'statuses_id'       => request()->status_id,
            'user_creation'     => request()->user_creation,
            'published_at'      => request()->published_at,
        ]);

        return new WarranteesResource($guarantee);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Warrantee $guarantee)
    {
        $guarantee->delete();
        return response(null, 204);
    }
}
