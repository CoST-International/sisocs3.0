<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ContractsResource extends JsonResource
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
            'id'                        => $this->id,
            'process_number_standard'   => $this->process_number_standard,
            'contract_number'           => $this->contract_number,
            'contract_title'            => $this->contract_title,
            'contract_scope'            => $this->contract_scope,
            'price_local_currency'      => $this->price_local_currency,
            'currency_id'               => $this->currency_id,
            'price_usd_currency'        => $this->price_usd_currency,
            'start_date'                => $this->start_date,
            'end_date'                  => $this->end_date,
            'duration'                  => $this->duration,
            'award_id'                  => $this->awards_id,
            'organization_id'           => $this->organizations_id,
            'offerer_id'                => $this->offerers_id,
            'status_id'                 => $this->statuses_id,
            'standard_status_id'        => $this->standard_status_id,
            'user_creation'             => $this->user_creation,
            'project_id'                => $this->project_id,
            'ocds_id'                   => $this->ocds_generation,
            'project'                   => new ProjectsResource($this->whenLoaded('project')),
            'award'                     => new AwardsResource($this->whenLoaded('award'))
        ];
    }
}
