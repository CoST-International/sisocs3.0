<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ExecutionsResource extends JsonResource
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
            'vartime' => $this->vartime,
            'varprice' => $this->varprice,
            'start_date' => $this->start_date,
            'program' => $this->program,
            'contract_id' => $this->contracts_id,
            'contact_id' => $this->contacts_id,
            'status_id' => $this->statuses_id,
            'ocds' => $this->ocds_generation,
            'contracts' => new ContractsResource($this->whenLoaded('contracts'))
        ];
    }
}
