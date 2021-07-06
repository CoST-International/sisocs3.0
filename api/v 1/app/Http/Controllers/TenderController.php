<?php

namespace App\Http\Controllers;

use App\Http\Resources\TenderCollection;
use App\Http\Resources\TendersResource;
use App\Models\Organization;
use App\Models\Tender;
use Illuminate\Http\Request;
use Carbon\Carbon;

class TenderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tenders = Tender::query();

        if(!in_array(auth()->user()->user_role, [5])) {
            $organization = auth()->user()->organization->id;
            if (request()->filled('q') && request()->q == 'all') {
                return $tenders->with('project')->where('organizations_id', $organization)->orderByDesc('id')->get();
            } else {
                $tenders = $tenders->with('project')->where('organizations_id', $organization)->orderByDesc('id')->paginate($this->pagination(request()->limit));
            }
        } else {
            if (request()->filled('q') && request()->q == 'all') {
                return $tenders->with('project')->select('id', 'process_number_standard', 'process_number', 'process_name')->orderByDesc('id')->get();
            } else {
                $tenders = $tenders->with('project')->orderByDesc('id')->paginate($this->pagination(request()->limit));
            }
        }

        return new TenderCollection($tenders);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Tender $tender)
    {
        $tender = Tender::create([
            'process_number_standard'   => request()->process_number_standard,
            'process_number'            => request()->process_number,
            'process_name'              => request()->process_name,
            'projects_id'               => request()->project_id,
            'contract_types_id'         => request()->contract_type_id,
            'tender_methods_id'         => request()->tender_method_id,
            'standard_status_id'        => request()->standard_status_id,
            'roles_id'                  => auth()->user()->user_role,
            'statuses_id'               => in_array(auth()->user()->user_role, [25]) ? 1 : request()->status_id,
            'organizations_id'          => in_array(auth()->user()->user_role, [5]) ? request()->organization_id : auth()->user()->organization->id,
            'user_creation'             => auth()->user()->id
        ]);

        return new TendersResource($tender);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Tender $tender)
    {
        return new TendersResource(
            $tender->load([
                'status',
                'project',
                'standardStatus',
                'project.documents',
                'project.documents.section',
                'project.documents.documentType',
                'project.organization',
                'project.organizationUnit',
                'tenderMethod',
                'contractType'
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
    public function update(Tender $tender)
    {
        $tender->update([
            'process_number_standard'   => request()->process_number_standard,
            'process_number'            => request()->process_number,
            'process_name'              => request()->process_name,
            'projects_id'               => request()->project_id,
            'contract_types_id'         => request()->contract_type_id,
            'tender_methods_id'         => request()->tender_method_id,
            'standard_status_id'        => request()->standard_status_id,
            'statuses_id'               => in_array(auth()->user()->user_role, [25]) ? 1 : request()->status_id,
            'organizations_id'          => in_array(auth()->user()->user_role, [5]) ? request()->organization_id : auth()->user()->organization->id,
            'published_at'              => (in_array(request()->status_id, [2]) && in_array(auth()->user()->user_role, [5, 24, 26])) ? Carbon::now()->toDateTimeString() : NULL,
            'user_publication'          => (in_array(request()->status_id, [2]) && in_array(auth()->user()->user_role, [5, 24, 26])) ? auth()->user()->user_role : NULL
        ]);

        return new TendersResource($tender);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Tender $tender)
    {
        if(in_array(auth()->user()->user_role, [5])) {
            $tender->delete();
            return response(null, 204);
        }
    }
}
