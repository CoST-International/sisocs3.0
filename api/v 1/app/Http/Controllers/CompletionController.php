<?php

namespace App\Http\Controllers;

use App\Http\Resources\CompletionCollection;
use App\Http\Resources\CompletionsResource;
use App\Models\Completion;
use Illuminate\Http\Request;

class CompletionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $completion = Completion::query();

        if(!in_array(auth()->user()->user_role, [5])) {
            $organization = auth()->user()->organization->id;
            if (request()->filled('q') && request()->q == 'all') {
                return $completion->whereHas('project', function($q) use ($organization) {
                    $q->where('organizations_id', $organization);
                })->orderByDesc('id')->get();
            } else {
                $completions = $completion->whereHas('project', function($q) use ($organization) {
                    $q->where('organizations_id', $organization);
                })->orderByDesc('id')->paginate($this->pagination(request()->limit));
            }
        } else {
            if (request()->filled('q') && request()->q == 'all') {
                return $completion->select('id', 'process_number_standard', 'date')->orderByDesc('id')->get();
            } else {
                $completions = $completion->orderByDesc('id')->paginate($this->pagination(request()->limit));
            }
        }

        return new CompletionCollection($completions);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Completion $completion)
    {
        $completion = Completion::create([
            'projects_id'               => request()->project_id,
            'standard_status_id'        => request()->standard_status_id,
            'statuses_id'               => in_array(auth()->user()->id, [1, 2, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21, 22, 23, 25]) ? 1 : request()->status_id,
            'process_number_standard'   => request()->process_number_standard,
            'final_scope'               => request()->final_scope,
            'date'                      => request()->date,
            'asset_lifetime_from'       => request()->from,
            'asset_lifetime_to'         => request()->to,
            // 'asset_lifetime'            => request()->asset_lifetime,
            'change_specifications'     => request()->description,
            'justification'             => request()->justification,
            'final_cost'                => request()->final_cost,
            // 'ocds_generation'           => request()->ocds_id,

            'finalScopeDetails:'         => now()
        ]);

        return new CompletionsResource($completion);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Completion $completion)
    {
        return new CompletionsResource($completion);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Completion $completion)
    {
        $completion->update([
            'projects_id'               => request()->project_id,
            'standard_status_id'        => request()->standard_status_id,
            'statuses_id'               => request()->status_id,
            'process_number_standard'   => request()->process_number_standard,
            'final_scope'               => request()->final_scope,
            'date'                      => request()->date,
            'asset_lifetime_from'       => request()->asset_lifetime_from,
            'asset_lifetime_to'         => request()->asset_lifetime_to,
            'asset_lifetime'            => request()->asset_lifetime,
            'change_specifications'     => request()->change_specifications,
            'justification'             => request()->justification,
            'final_cost'                => request()->final_cost,
        ]);

        return new CompletionsResource($completion);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Completion $completion)
    {
        $completion->delete();
        return response(null, 204);
    }
}
