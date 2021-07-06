<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class WarranteesResource extends JsonResource
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
            'contract_number'   => $this->contract_number,
            'amount'            => $this->amount,
            'expiration_date'   => $this->expiration_date,
            'execution_id'      => $this->executions_id,
            'contract_id'       => $this->contracts_id,
            'waranty_type_id'   => $this->waranty_types_id,
            'status_id'         => $this->statuses_id,
            'user_creation'     => $this->user_creation,
            'published_at'      => $this->published_at,
        ];
    }
}
