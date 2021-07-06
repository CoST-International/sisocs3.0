<?php

namespace App\Http\Controllers;

use App\Http\Resources\PrequalificationCollection;
use App\Http\Resources\PrequalificationsResource;
use App\Models\Prequalification;
use Illuminate\Http\Request;
use Carbon\Carbon;

class PrequalificationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $prequalifications = Prequalification::query();

        if(!in_array(auth()->user()->user_role, [5])) {
            $organization = auth()->user()->organization->id;
            if (request()->filled('q') && request()->q == 'all') {
                return $prequalifications->whereHas('project', function($q) use ($organization) {
                    $q->where('organizations_id', $organization);
                })->orderByDesc('id')->get();
            } else {
                $prequalifications = $prequalifications->whereHas('project', function($q) use ($organization) {
                    $q->where('organizations_id', $organization);
                })->orderByDesc('id')->paginate($this->pagination(request()->limit));
            }
        } else {
            if (request()->filled('q') && request()->q == 'all') {
                return $prequalifications->orderByDesc('id')->get();
            } else {
                $prequalifications = $prequalifications->orderByDesc('id')->paginate($this->pagination(request()->limit));
            }
        }

        return new PrequalificationCollection($prequalifications);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Prequalification $prequalification)
    {
        $prequalification = Prequalification::create([
            'projects_id'               => request()->project_id,
            'process_number_standard'   => request()->process_number_standard,
            'process_number'            => request()->process_number,
            'date_start'                => request()->date_start,
            'status_id'                 => in_array(auth()->user()->id, [25]) ? 1 : request()->status_id,
            'standard_status_id'        => request()->standard_status_id,
            'date_end'                  => request()->date_end
        ]);

        return new PrequalificationsResource($prequalification);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Prequalification $prequalification)
    {
        return new PrequalificationsResource(
            $prequalification->load([
                'status',
                'project',
                'standardStatus',
                'project.documents',
                'project.documents.section',
                'project.documents.documentType',
                'project.organization',
                'project.organizationUnit',
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
    public function update(Prequalification $prequalification)
    {
        $prequalification->update([
            'date_end'                  => request()->date_end,
            'projects_id'               => request()->project_id,
            'date_start'                => request()->date_start,
            'process_number'            => request()->process_number,
            'standard_status_id'        => request()->standard_status_id,
            'process_number_standard'   => request()->process_number_standard,
            'status_id'                 => in_array(auth()->user()->id, [25]) ? 1 : request()->status_id,
            'published_at'              => in_array(request()->status_id, [2]) ? Carbon::now()->toDateTimeString() : NULL,
        ]);

        return new PrequalificationsResource($prequalification);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Prequalification $prequalification)
    {
        $prequalification->delete();
        return response(null, 204);
    }
}
