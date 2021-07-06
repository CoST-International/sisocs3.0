<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TendersResource extends JsonResource
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
            'process_number'            => $this->process_number,
            'process_name'              => $this->process_name,
            'project_id'                => $this->projects_id,
            'contract_type_id'          => $this->contract_types_id,
            'tender_method_id'          => $this->tender_methods_id,
            'standard_status_id'        => $this->standard_status_id,
            'status_id'                 => $this->statuses_id,
            'ocds_id'                   => $this->ocds_generation,
            'status'                    => new StatusesResource($this->whenLoaded('status')),
            'project'                   => new ProjectCollection($this->whenLoaded('project')),
            'tenderMethod'              => new TenderMethodsResource($this->whenLoaded('tenderMethod')),
            'contractType'              => new ContractTypesResource($this->whenLoaded('contractType')),
            'standardStatus'            => new StandardstatusesResource($this->whenLoaded('standardStatus')),
        ];
    }
}
