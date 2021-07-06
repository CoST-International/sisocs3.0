<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AwardsResource extends JsonResource
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
            'track_award'               => $this->track_award,
            'track_tender'              => $this->track_tender,
            'process_number_standard'   => $this->process_number_standard,
            'process_number'            => $this->process_number,
            'contract_estimated_cost'   => $this->contract_estimate_cost,
            'tender_id'                 => $this->tenders_id,
            'award_method_id'           => $this->award_methods_id,
            'contract_method_id'        => $this->contract_methods_id,
            'status_id'                 => $this->statuses_id,
            'standard_status_id'        => $this->standard_status_id,
            'project_id'                => $this->project_id,
            'ocds_id'                   => $this->ocds_generation,
            'currency_id'               => $this->currency_id,
            'project'                   => new ProjectsResource($this->whenLoaded('project')),
            'status'                    => new StatusesResource($this->whenLoaded('status')),
            'standardStatus'            => new StandardstatusesResource($this->whenLoaded('standardStatus')),
        ];
    }
}
