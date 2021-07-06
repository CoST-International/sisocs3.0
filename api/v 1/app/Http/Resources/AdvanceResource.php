<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AdvanceResource extends JsonResource
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
            'contract_number' => $this->contract_number,
            'percent_programed' => $this->percent_programed,
            'percent_real' => $this->percent_real,
            'finance_programed' => $this->finance_programed,
            'finance_real' => $this->finance_real,
            'description_problems' => $this->description_problems,
            'description_issues' => $this->description_issues,
            'date_advance' => $this->date_advance,
            'execution_id' => $this->executions_id,
            'contract_id' => $this->contracts_id,
            'statu_id' => $this->status_id,
            'user_creation' => $this->user_creation,
            'user_publication' => $this->user_publication,
            'published_at' => $this->published_at
        ];
    }
}
