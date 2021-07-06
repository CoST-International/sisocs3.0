<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectFundingSourceCollection;
use App\Http\Resources\ProjectFundingSourcesResource;
use App\Models\ProjectFundingSource;
use Illuminate\Http\Request;

class ProjectFundingSourceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $projectFundingSources = ProjectFundingSource::when(request('q') && request('q') == 'all', function($query) {
            return $query->orderBy('id', 'asc');
        })->when(request('project'), function($query) {
            return $query->with(['fundingSource', 'currencies'])->where('projects_id', request('project'));
        })->get();

        return new ProjectFundingSourceCollection($projectFundingSources);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProjectFundingSource $projectFundingSource)
    {
        $projectFundingSource = ProjectFundingSource::create([
            'ammount'        => request()->amount,
            'projects_id'   => request()->project_id,
            'sources_id'    => request()->funding_source_id,
            'currencies_id' => request()->currency_id,
            'statuses_id'   => request()->status_id,
        ]);

        return new ProjectFundingSourcesResource($projectFundingSource);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(ProjectFundingSource $projectFundingSource)
    {
        return new ProjectFundingSourcesResource($projectFundingSource);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ProjectFundingSource $projectFundingSource)
    {
        $projectFundingSource->update([
            'ammount'       => request()->amount,
            'projects_id'   => request()->project_id,
            'sources_id'    => request()->funding_source_id,
            'currencies_id' => request()->currency_id,
            'statuses_id'   => request()->status_id,
        ]);

        return new ProjectFundingSourcesResource($projectFundingSource);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(ProjectFundingSource $projectFundingSource)
    {
        $projectFundingSource->delete();
        return response(null, 204);
    }
}
