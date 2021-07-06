<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\ProjectCollection;
use App\Http\Resources\ProjectsResource;
use Carbon\Carbon;

class ProjectController extends Controller
{
    protected $project;

    public function __constructor(Project $project) {
        $this->project = $project;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $projects = Project::query();

        if(!in_array(auth()->user()->user_role, [5])) {
            $organization = auth()->user()->organization->id;
            if (request()->filled('q') && request()->q == 'all') {
                return new ProjectCollection(
                Project::where('organizations_id', $organization)->select('id', 'process_number_standard', 'project_name', 'organizations_id')->when(request('relation') && request('relation') == 'no-preparation', function($query) {
                    return $query->doesntHave('preparation')->orderByDesc('id');
                })->when(request('relation') && request('relation') == 'no-prequalification', function($query) {
                    return $query->has('preparation')->doesntHave('prequalification')->orderByDesc('id');
                })->when(request('relation') && request('relation') == 'prequalification', function($query) {
                    return $query->has('prequalification')->orderByDesc('id');
                })->when(request('relation') && request('relation') == 'tender', function($query) {
                    return $query->with(['tender', 'organization'])->has('tender')->orderByDesc('id');
                })->when(request('relation') && request('relation') == 'no-tender', function($query) {
                    return $query->has('prequalification')->doesntHave('tender')->orderByDesc('id');
                })->when(request('relation') && request('relation') == 'only-award', function($query) {
                    return $query->with('award')->has('award')->doesntHave('award.contract')->orderByDesc('id');
                })->when(request('relation') && request('relation') == 'only-contract', function($query) {
                    return $query->with('award')->has('award.contract')->orderByDesc('id');
                })->get());

            } else if(request()->filled('page') || request()->filled('limit')) {
                $projects = $projects->where('organizations_id', $organization)->orderByDesc('id')->paginate($this->pagination(request()->limit));
            } else {
                $projects = $projects->where('organizations_id', $organization)->orderByDesc('id')->paginate($this->pagination(request()->limit));
            }
        } else {
            if (request()->filled('q') && request()->q == 'all') {
                return new ProjectCollection(Project::when(request('relation') && request('relation') == 'no-preparation', function($query) {
                    return $query->doesntHave('preparation')->orderByDesc('id');
                })->when(request('relation') && request('relation') == 'no-prequalification', function($query) {
                    return $query->doesntHave('prequalification')->orderByDesc('id');
                })->when(request('relation') && request('relation') == 'prequalification', function($query) {
                    return $query->has('prequalification')->orderByDesc('id');
                })->when(request('relation') && request('relation') == 'tender', function($query) {
                    return $query->with(['tender', 'organization'])->has('tender')->orderByDesc('id');
                })->when(request('relation') && request('relation') == 'no-tender', function($query) {
                    return $query->doesntHave('tender')->orderByDesc('id');
                })->when(request('relation') && request('relation') == 'only-award', function($query) {
                    return $query->with('award')->has('award')->doesntHave('award.contract')->orderByDesc('id');
                })->get());

            } else if(request()->filled('page') || request()->filled('limit')) {
                $projects = $projects->orderByDesc('id')->paginate($this->pagination(request()->limit));
            } else {
                $projects = $projects->orderByDesc('id')->paginate($this->pagination(request()->limit));
            }
        }

        return new ProjectCollection($projects);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Project $project)
    {
        $project = Project::create([
            'process_number_standard' => 'oc4ids-qu8r7p-' . request()->identifier . '-' . time(),
            'sectors_id'              => request()->sector_id,
            'standard_status_id'      => request()->standard_status_id,
            'statuses_id'             => in_array(auth()->user()->user_role, [25]) ? 1 : request()->status_id,
            'purposes_id'             => request()->purpose_id,
            'officials_id'            => request()->official_id,
            'subsectors_id'           => request()->subsector_id,
            'organizations_id'        => request()->organization_id,
            'project_code'            => request()->project_code,
            'project_name'            => request()->project_name,
            'project_code_sefin'      => request()->project_code_sefin,
            'project_description'     => request()->project_description,
            // 'published_at'            => Carbon::now()->toDateTimeString(),
            'user_creation'           => auth()->user()->id,

            'durationInDays'          => 0,
        ]);

        if ($project) {
            $project->update([
                'process_number_standard' => 'oc4ids-qu8r7p-' . request()->identifier . '-' . time() . '-' . $project->id
            ]);
        }

        return new ProjectsResource($project);
    }

     /**
     * Display the specified resource.
     *
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function show(Project $project)
    {
        return new ProjectsResource($project->load([
            'sector', 'subSector', 'organization', 'organizationUnit',
            'purpose', 'official', 'oc4idsSector', 'standardStatus',
            'status', 'documents', 'documents.section', 'documents.documentType'
        ]));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Project $project)
    {
        $project->update([
            'sectors_id'              => request()->sector_id,
            'standard_status_id'      => request()->standard_status_id,
            'statuses_id'             => in_array(auth()->user()->user_role, [25]) ? 1 : request()->status_id,
            'purposes_id'             => request()->purpose_id,
            'officials_id'            => request()->official_id,
            'subsectors_id'           => request()->subsector_id,
            'organizations_id'        => request()->organization_id,
            'project_code'            => request()->project_code,
            'project_name'            => request()->project_name,
            'project_code_sefin'      => request()->project_code_sefin,
            'project_description'     => request()->project_description,
            'published_at'            => in_array(request()->status_id, [2]) ? Carbon::now()->toDateTimeString() : NULL,
            'user_publication'        => in_array(request()->status_id, [2]) ? auth()->user()->id : NULL,

            'durationInDays'          => 0,
        ]);

        return new ProjectsResource($project);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Project $project)
    {
        if(in_array(auth()->user()->user_role, [5])) {
            $project->delete();
            return response(null, 204);
        }
    }
}
