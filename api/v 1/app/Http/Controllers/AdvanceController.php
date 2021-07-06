<?php

namespace App\Http\Controllers;

use App\Models\Advance;
use App\Http\Resources\AdvanceResource;
use App\Http\Resources\AdvancesCollection;

class AdvanceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $advance = Advance::query();

        if(auth()->user()->user_role !== 5) {
            $organization = auth()->user()->organization->id;
            if (request()->filled('q') && request()->q == 'all') {
                return new AdvancesCollection($advance->orderByDesc('id')->get());
            } else {
                $advance = $advance->orderByDesc('id')->paginate($this->pagination(request()->limit));
            }
        } else {
            if (request()->filled('q') && request()->q == 'all') {
                return new AdvancesCollection($advance->orderByDesc('id')->get());
            } else {
                $advance = $advance->orderByDesc('id')->paginate($this->pagination(request()->limit));
            }
        }


        return new AdvancesCollection($advance);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Advance $advance)
    {
        $advance = Advance::create([
            'contract_number',
            'percent_programed',
            'percent_real',
            'finance_programed',
            'finance_real',
            'description_problems',
            'description_issues',
            'date_advance',
            'executions_id',
            'contracts_id',
            'status_id',
            'user_creation',
            'user_publication',
            'published_at'
        ]);

        return new AdvanceResource($advance);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Advance $advance)
    {
        return new AdvanceResource($advance);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Advance $advance)
    {
        $advance->update([
            'contract_number',
            'percent_programed',
            'percent_real',
            'finance_programed',
            'finance_real',
            'description_problems',
            'description_issues',
            'date_advance',
            'executions_id',
            'contracts_id',
            'status_id',
            'user_creation',
            'user_publication',
            'published_at'
        ]);

        return new AdvanceResource($advance);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Advance $advance)
    {
        $advance->delete();
        return response(null, 204);
    }
}
