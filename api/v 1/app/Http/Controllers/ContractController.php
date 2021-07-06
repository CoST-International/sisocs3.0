<?php

namespace App\Http\Controllers;

use App\Http\Resources\ContractCollection;
use App\Http\Resources\ContractsResource;
use App\Models\Contract;
use Illuminate\Http\Request;

class ContractController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $contracts = Contract::query();

        if(!in_array(auth()->user()->user_role, [5])) {
            $organization = auth()->user()->organization->id;
            if (request()->filled('q') && request()->q == 'all') {
                return new ContractCollection(
                    Contract::where('organizations_id', $organization)->when(request('relation') && request('relation') == 'award', function($query) {
                        return $query->orderByDesc('id');
                    })->when(request('relation') && request('relation') == 'project', function($query) {
                        return $query->with('project')->orderByDesc('id');
                    })->get()
                );

            } else {
                $contracts = $contracts->with('project')->where('organizations_id', $organization)->orderByDesc('id')->paginate($this->pagination(request()->limit));
            }
        } else {
            if (request()->filled('q') && request()->q == 'all') {

                return new ContractCollection(Contract::when(request('relation') && request('relation') == 'award', function($query) {
                    return $query->orderByDesc('id');
                })->when(request('relation') && request('relation') == 'project', function($query) {
                    return $query->with('project')->orderByDesc('id');
                })->get());

            } else {
                $contracts = $contracts->with('project')->orderByDesc('id')->paginate($this->pagination(request()->limit));
            }
        }

        return new ContractCollection($contracts);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Contract $contract)
    {

        $contract = Contract::create([
            'process_number_standard'   => request()->process_number_standard,
            'contract_number'           => request()->contract_number,
            'contract_title'            => request()->contract_title,
            'contract_scope'            => request()->contract_scope,
            'currency_id'               => request()->currency_id,
            'price_local_currency'      => request()->price_local_currency,
            'price_usd_currency'        => request()->price_usd_currency,
            'start_date'                => request()->start_date,
            'end_date'                  => request()->end_date,
            'duration'                  => request()->duration,
            'awards_id'                 => request()->award_id,
            'organizations_id'          => request()->organization_id,
            'offerers_id'               => request()->offerer_id,
            'statuses_id'               => in_array(auth()->user()->id, [1, 2, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21, 22, 23, 25]) ? 1 : request()->status_id,
            'standard_status_id'        => request()->standard_status_id,
            'user_creation'             => auth()->user()->id,
            'project_id'                => request()->project_id,
            'ocds_generation'           => request()->ocds_id
        ]);

        return new ContractsResource($contract);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Contract $contract)
    {
        return new ContractsResource(
            $contract->load([
                'award',
                'award.project',
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
    public function update(Contract $contract)
    {
        $contract->update([
            'process_number_standard'   => request()->process_number_standard,
            'contract_number'           => request()->contract_number,
            'contract_title'            => request()->contract_title,
            'contract_scope'            => request()->contract_scope,
            'currency_id'               => request()->currency_id,
            'price_local_currency'      => request()->price_local_currency,
            'price_usd_currency'        => request()->price_usd_currency,
            'start_date'                => request()->start_date,
            'end_date'                  => request()->end_date,
            'duration'                  => request()->duration,
            'awards_id'                 => request()->award_id,
            'organizations_id'          => request()->organization_id,
            'offerers_id'               => request()->offerer_id,
            'statuses_id'               => request()->status_id,
            'standard_status_id'        => request()->standard_status_id,
            'user_creation'             => auth()->user()->id,
            'project_id'                => request()->project_id
        ]);

        return new ContractsResource($contract);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Contract $contract)
    {
        $contract->delete();
        return response(null, 204);
    }
}
