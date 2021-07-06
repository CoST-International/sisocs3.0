<?php

namespace App\Http\Resources;

use App\Models\Organization;
use App\Models\OrganizationUnit;
use App\Models\Purpose;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class ProjectsResource extends JsonResource
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
            'track_code' => $this->track_code,
            'process_number_standard' => $this->process_number_standard,
            'project_code' => $this->project_code,
            'project_name' => $this->project_name,
            'project_description' => $this->project_description,
            'project_code_sefin' => $this->project_code_sefin,
            'project_budget' => $this->project_budget,
            'project_budget_approved' => $this->project_budget_approved,
            'project_scope' => $this->project_scope,
            'encironment_effect_description' => $this->encironment_effect_description,
            'resettlement_description' => $this->resettlement_description,
            'inital_lat' => $this->inital_lat,
            'inital_lon' => $this->inital_lon,
            'final_lon' => $this->final_lon,
            'file_works_plan' => $this->file_works_plan,
            'file_budget_multianual_program' => $this->file_budget_multianual_program,
            'file_feasibility_study' => $this->file_feasibility_study,
            'file_environment_effect_study' => $this->file_environment_effect_study,
            'file_environment_license_migration_contract' => $this->file_environment_license_migration_contract,
            'file_resettlement_compesation_plan' => $this->file_resettlement_compesation_plan,
            'file_financing_agreement' => $this->file_financing_agreement,
            'file_approval_description' => $this->file_approval_description,
            'file_others' => $this->file_others,
            'organization_id' => $this->organizations_id,
            'organization_unit_id' => $this->organization_units_id,
            'sector_id' => $this->sectors_id,
            'subsector_id' => $this->subsectors_id,
            'purpose_id' => $this->purposes_id,
            'official_id' => $this->officials_id,
            'role_id' => $this->roles_id,
            'standard_status_id' => $this->standard_status_id,
            'status_id' => $this->statuses_id,
            'ocds_generation' => $this->ocds_generation,
            'version' => $this->version,
            'user_creation' => $this->user_creation,
            'user_publication' => $this->user_publication,
            'published_at' => (Carbon::create($this->published_at))->toDateString(),
            'startDate' =>  (Carbon::create($this->startDate))->toDateString(),
            'endDate' => (Carbon::create($this->endDate))->toDateString(),
            'durationInDays' => $this->durationInDays,
            'sector' => new SectorsResource($this->whenLoaded('sector')),
            'oc4idsSector' => new OcdssectorsResource($this->whenLoaded('oc4idsSector')),
            'subSector' => new SubsectorsResource($this->whenLoaded('subSector')),
            'organization' => new OrganizationsResource($this->whenLoaded('organization')),
            'organizationUnit' => new OrganizationunitsResource($this->whenLoaded('organizationUnit')),
            'purpose' => new PurposesResource($this->whenLoaded('purpose')),
            'official' => new OfficialsResource($this->whenLoaded('official')),
            'standardStatus' => new StandardstatusesResource($this->whenLoaded('standardStatus')),
            'status' => new StatusesResource($this->whenLoaded('status')),
            'preparation' => new PreparationsResource($this->whenLoaded('preparation')),
            'prequalification' => new PrequalificationsResource($this->whenLoaded('prequalification')),
            'tender' => new TendersResource($this->whenLoaded('tender')),
            'award' => new AwardsResource($this->whenLoaded('award')),
            'documents' => new DocumentCollection($this->whenLoaded('documents')),
            'section' => new SectionsResource($this->whenLoaded('document.section')),
            'documentType' => new DocumenttypesResource($this->whenLoaded('document.documentType')),
        ];
    }
}
