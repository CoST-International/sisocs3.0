<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProjectFundingSourcesResource extends JsonResource
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
            'track_project' => $this->track_project,
            'amount' => $this->ammount,
            'exchange_rate' => $this->exchange_rate,
            'project_id' => $this->projects_id,
            'funding_source_id' => $this->sources_id,
            'currency_id' => $this->currencies_id,
            'status_id' => $this->statuses_id,
            'fundingSources' => new SourceCollection($this->whenLoaded('fundingSource')),
            'currencies' => new CurrencyCollection($this->whenLoaded('currencies'))
        ];
    }
}
