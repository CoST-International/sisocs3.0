<?php

namespace App\Http\Controllers;

use App\Models\Disbursement;
use App\Http\Resources\DisbursementCollection;
use App\Http\Resources\DisbursementsResource;

class DisbursementController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $disbursement = Disbursement::query();

        if (request()->filled('q') && request()->q == 'all') {
            return $disbursement->orderByDesc('id')->get();
        } else {
            $disbursement = $disbursement->orderByDesc('id')->paginate($this->pagination(request()->limit));
        }

        return new DisbursementCollection($disbursement);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Disbursement $disbursement)
    {
        $disbursement = Disbursement::create([
            'contracts_id'  => request()->contract_id,
            'date'          => request()->date,
            'currencies_id' => request()->currency_id,
            'amount'        => request()->amount,
            'description'   => request()->description,
            'order'         => request()->order,
            'executions_id' => request()->execution_id,
            'statuses_id'   => in_array(auth()->user()->id, [1, 2, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21, 22, 23, 25]) ? 1 : request()->status_id,
            'user_creation' => request()->user_creation,
            'published_at'  => request()->published_at,
        ]);

        return new DisbursementsResource($disbursement);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Disbursement $disbursement)
    {
        return new DisbursementsResource($disbursement);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Disbursement $disbursement)
    {
        $disbursement->update([
            'contracts_id'  => request()->contract_id,
            'date'          => request()->date,
            'currencies_id' => request()->currency_id,
            'amount'        => request()->amount,
            'description'   => request()->description,
            'order'         => request()->order,
            'executions_id' => request()->execution_id,
            'statuses_id'   => request()->status_id,
            'user_creation' => request()->user_creation,
            'published_at'  => request()->published_at,
        ]);

        return new DisbursementsResource($disbursement);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Disbursement $disbursement)
    {
        $disbursement->delete();
        return response(null, 204);
    }
}
