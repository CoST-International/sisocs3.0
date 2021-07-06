<?php

namespace App\Http\Resources;

use App\Models\OrganizationUnit;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class PreparationsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'project_id' => $this->projects_id,
            'official_id' => $this->officials_id,
            'status_id' => $this->statuses_id,
            'process_number_standard' => $this->process_number_standard,
            'project_scope' => $this->project_scope,
            'project_budget' => $this->project_budget,
            'project_budget_approval_date' => (Carbon::create($this->project_budget_approved))->toDateString(),
            'organization_unit_id' => $this->organization_units_id,
            'currency_id' => $this->currencies_id,
            'environmental_category_id' => $this->environmental_categories_id,
            'standard_status_id' => $this->standard_status_id,
            'start_date' => (Carbon::create($this->start_date))->toDateString(),
            'end_date' => (Carbon::create($this->end_date))->toDateString(),
            'status' => new StatusesResource($this->whenLoaded('status')),
            'standardStatus' => new StandardstatusesResource($this->whenLoaded('standardStatus')),
            'project' => new ProjectCollection($this->whenLoaded('project')),
            'documents' => new DocumentCollection($this->whenLoaded('project.documents')),
            'organizationUnit' => new OrganizationunitsResource($this->whenLoaded('organizationUnit')),
            'environmentCategory' => new EnvironmentalCategoriesResource($this->whenLoaded('environmentCategory')),
            'currency' => new CurrenciesResource($this->whenLoaded('currency')),
        ];
    }
}
