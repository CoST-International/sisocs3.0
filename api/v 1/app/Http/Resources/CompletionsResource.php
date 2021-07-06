<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CompletionsResource extends JsonResource
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
            'standard_status_id' => $this->standard_status_id,
            'status_id' => $this->status_id,
            'process_number_standard' => $this->process_number_standard,
            'final_scope' => $this->final_scope,
            'date' => $this->date,
            'from' => $this->asset_lifetime_from,
            'to' => $this->asset_lifetime_to,
            'description' => $this->description,
            'change_description' => $this->change_description,
            'justification' => $this->justification,
            'final_cost' => $this->final_cost,
            'project' => new ProjectsResource($this->whenLoaded('project'))
        ];
    }
}
