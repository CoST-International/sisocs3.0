<?php

namespace App\Http\Controllers;

use App\Http\Resources\PreparationCollection;
use App\Http\Resources\PreparationsResource;
use App\Models\Preparation;
use Illuminate\Http\Request;

class PreparationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $preparations = Preparation::query();

        if(!in_array(auth()->user()->user_role, [5])) {
            $organization = auth()->user()->organization->id;
            if (request()->filled('q') && request()->q == 'all') {
                return $preparations->whereHas('project', function($q) use ($organization) {
                    $q->where('organizations_id', $organization);
                })->orderByDesc('id')->get();
            } else {
                $preparations = $preparations->whereHas('project', function($q) use ($organization) {
                    $q->where('organizations_id', $organization);
                })->orderByDesc('id')->paginate($this->pagination(request()->limit));
            }
        } else {
            if (request()->filled('q') && request()->q == 'all') {
                return $preparations->select('id', 'process_number_standard', 'project_budget', 'project_budget_approved', 'project_budget')->orderByDesc('id')->get();
            } else {
                $preparations = $preparations->orderByDesc('id')->paginate($this->pagination(request()->limit));
            }
        }



        return new PreparationCollection($preparations);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Preparation $preparation)
    {
        $preparation = Preparation::create([
            'projects_id'                   => request()->project_id,
            'statuses_id'                   => in_array(auth()->user()->id, [25]) ? 1 : request()->status_id,
            'process_number_standard'       => request()->process_number_standard,
            'project_scope'                 => request()->project_scope,
            'project_budget'                => request()->project_budget,
            'project_budget_approved'       => request()->project_budget_approval_date,
            'organization_units_id'         => request()->organization_unit_id,
            'currencies_id'                 => request()->currency_id,
            'environmental_categories_id'   => request()->environmental_category_id,
            'standard_status_id'            => request()->standard_status_id,
            'start_date'                    => request()->start_date,
            'end_date'                      => request()->end_date,
        ]);

        return new PreparationsResource($preparation);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Preparation $preparation)
    {
        return new PreparationsResource($preparation->load([
            'status', 'project', 'project.documents', 'standardStatus', 'currency',
            'project.documents.section', 'project.documents.documentType', 'organizationUnit',
            'environmentCategory'
        ]));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Preparation $preparation)
    {
        $preparation->update([
            // 'projects_id'                   => request()->project_id,
            'statuses_id'                   => in_array(auth()->user()->id, [25]) ? 1 : request()->status_id,
            'process_number_standard'       => request()->process_number_standard,
            'project_scope'                 => request()->project_scope,
            'project_budget'                => request()->project_budget,
            'project_budget_approved'       => request()->project_budget_approval_date,
            'organization_units_id'         => request()->organization_unit_id,
            'currencies_id'                 => request()->currency_id,
            'environmental_categories_id'   => request()->environmental_category_id,
            'standard_status_id'            => request()->standard_status_id,
            'start_date'                    => request()->start_date,
            'end_date'                      => request()->end_date,
        ]);

        return new PreparationsResource($preparation);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Preparation $preparation)
    {
        $preparation->delete();
        return response(null, 204);
    }
}
