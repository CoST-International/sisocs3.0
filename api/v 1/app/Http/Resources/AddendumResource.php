<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class AddendumResource extends JsonResource
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
            'modify'                    => $this->n_modify,
            'modification_type'         => $this->modification_type,
            'description'               => $this->description,
            'justification'             => $this->modification_type,
            'contract_price'            => $this->current_price,
            'currenct_contract_scope'   => $this->current_contract_scope,
            'addendum'                  => $this->addendum,
            'date'                      => (Carbon::create($this->date))->toDateString(),
            'contract_date'             => (Carbon::create($this->contract_date))->toDateString(),
            'contract_id'               => $this->contracts_id,
            'status_id'                 => $this->statuses_id,
            'user_creation'             => $this->user_creation,
            'published_at'              => (Carbon::create($this->published_at))->toDateString(),
            'currency_id'               => $this->currency_id,
            'contract'                  => new ContractsResource($this->whenLoaded('contract')),
            'status'                    => new StatusesResource($this->whenLoaded('status')),
        ];
    }
}
