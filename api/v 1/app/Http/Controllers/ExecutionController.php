<?php

namespace App\Http\Controllers;

use App\Http\Resources\ExecutionCollection;
use App\Http\Resources\ExecutionsResource;
use App\Models\Execution;
use Illuminate\Http\Request;
use Carbon\Carbon;

class ExecutionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $execution = Execution::query();

        if(auth()->user()->user_role !== 5) {
            $organization = auth()->user()->organization->id;
            if (request()->filled('q') && request()->q == 'all') {
                return new ExecutionCollection(Execution::with('contract', 'contract.project')->whereHas('contract', function($query) use ($organization){
                    $query->where('organizations_id', $organization);
                })->orderByDesc('id')->get());
            } else {
                $execution = $execution->whereHas('contract', function($query) use ($organization){
                    $query->with('contract', 'contract.project')->where('organizations_id', $organization);
                })->orderByDesc('id')->paginate($this->pagination(request()->limit));
            }
        } else {
            if (request()->filled('q') && request()->q == 'all') {
                return $execution->with('contract', 'contract.project')->orderByDesc('id')->get();
            } else {
                $execution = $execution->with('contract', 'contract.project')->orderByDesc('id')->paginate($this->pagination(request()->limit));
            }
        }

        return new ExecutionCollection($execution);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Execution $execution)
    {
        $execution = Execution::create([
            'vartime'           => request('var_time'),
            'varprice'          => request('var_price'),
            'start_date'        => request('start_date'),
            'program'           => request('program'),
            'contracts_id'      => request('contract_id'),
            'contacts_id'       => request('contact_id'),
            'statuses_id'       => in_array(auth()->user()->id, [25]) ? 1 : request()->status_id,
            'ocds_generation'   => request('ocds'),
            'user_creation'     => auth()->user()->id,
            'published_at'      => in_array(request()->status_id, [2]) ? Carbon::now()->toDateTimeString() : NULL,
            'user_publication'  => in_array(request()->status_id, [2]) ? auth()->user()->id : NULL,
        ]);

        return new ExecutionsResource($execution);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Execution $execution)
    {
        return new ExecutionsResource($execution);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Execution $execution)
    {
        $execution->update([
            'vartime'           => request('var_time'),
            'varprice'          => request('var_price'),
            'start_date'        => request('start_date'),
            'program'           => request('program'),
            'contracts_id'      => request('contract_id'),
            'contacts_id'       => request('contact_id'),
            'statuses_id'       => in_array(auth()->user()->id, [25]) ? 1 : request()->status_id,
            'ocds_generation'   => request('ocds'),
            'user_creation'     => auth()->user()->id,
            'published_at'      => in_array(request()->status_id, [2]) ? Carbon::now()->toDateTimeString() : NULL,
            'user_publication'  => in_array(request()->status_id, [2]) ? auth()->user()->id : NULL,
        ]);

        return new ExecutionsResource($execution);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Execution $execution)
    {
        if(in_array(auth()->user()->user_role, [5])) {
            $execution->delete();
            return response(null, 204);
        }
    }
}
