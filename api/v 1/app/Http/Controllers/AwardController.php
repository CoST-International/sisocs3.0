<?php

namespace App\Http\Controllers;

use App\Http\Resources\AwardCollection;
use App\Http\Resources\AwardsResource;
use App\Models\Award;
use Illuminate\Http\Request;
use Carbon\Carbon;

class AwardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $awards = Award::query();

        if(!in_array(auth()->user()->user_role, [5])) {
            $organization = auth()->user()->organization->id;
            if (request()->filled('q') && request()->q == 'all') {
                return new AwardCollection(
                    Award::with('project')->whereHas('project', function($q) use ($organization) {
                        $q->where('organizations_id', $organization);
                    })->when(request('relation') && request('relation') == 'no-contract', function($query) {
                        return $query->doesntHave('contract');
                    })->when(request('relation') && request('relation') == 'contract', function($query) {
                        return $query->has('contract');
                    })->orderByDesc('id')->get()
                );
            } else {
                $awards = $awards->with('project')->whereHas('project', function($q) use ($organization) {
                    $q->where('organizations_id', $organization);
                })->orderByDesc('id')->paginate($this->pagination(request()->limit));
            }
        } else {
            if (request()->filled('q') && request()->q == 'all') {
                return new AwardCollection($awards->with('project')->orderByDesc('id')->get());
            } else {
                $awards = $awards->with('project')->orderByDesc('id')->paginate($this->pagination(request()->limit));
            }
        }

        return new AwardCollection($awards);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Award $award)
    {
        $award = Award::create([
            'process_number_standard'   => request()->process_number_standard,
            'process_number'            => request()->process_number,
            'currency_id'               => request()->currency_id,
            'contract_estimate_cost'    => request()->contract_estimated_cost,
            'tenders_id'                => request()->tender_id,
            'award_methods_id'          => request()->award_method_id,
            // 'contract_methods_id'       => request()->contract_method_id,
            'statuses_id'               => in_array(auth()->user()->id, [25]) ? 1 : request()->status_id,
            'standard_status_id'        => request()->standard_status_id,
            'project_id'                => request()->project_id,
        ]);

        if ($award) {
            $award->update([
                'ocds_generation'       => 'ocds-lcuori-' . trim(str_replace(' ', '', $award->process_number)) . '-' . request()->identifier . '-' . time() . '-' . $award->id
            ]);
        }



        return new AwardsResource($award);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Award $award)
    {
        return new AwardsResource(
            $award->load([
                'status',
                'project',
                'standardStatus',
                'project.documents',
                'project.organization',
                'project.organizationUnit',
                'project.documents.section',
                'project.documents.documentType',
            ])
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Award $award)
    {
        $award->update([
            'process_number_standard'   => request()->process_number_standard,
            'process_number'            => request()->process_number,
            'currency_id'               => request()->currency_id,
            'contract_estimate_cost'    => request()->contract_estimated_cost,
            'tenders_id'                => request()->tender_id,
            'award_methods_id'          => request()->award_method_id,
            // 'contract_methods_id'       => request()->process_number_standard,
            'statuses_id'               => in_array(auth()->user()->id, [25]) ? 1 : request()->status_id,
            'standard_status_id'        => request()->standard_status_id,
            'project_id'                => request()->project_id,
            'published_at'              => in_array(request()->status_id, [2]) ? Carbon::now()->toDateTimeString() : NULL,
            'user_publication'          => in_array(request()->status_id, [2]) ? auth()->user()->id : NULL,
        ]);

        return new AwardsResource($award);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Award $award)
    {
        if(in_array(auth()->user()->user_role, [5])) {
            $award->delete();
            return response(null, 204);
        }
    }
}
