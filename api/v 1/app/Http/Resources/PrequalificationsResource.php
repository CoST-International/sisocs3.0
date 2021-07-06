<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class PrequalificationsResource extends JsonResource
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
            'process_number_standard' => $this->process_number_standard,
            'process_number' => $this->process_number,
            'date_start' => $this->date_start,
            'status_id' => $this->status_id,
            'standard_status_id' => $this->standard_status_id,
            'date_end' => $this->date_end,
            'published_at' => (Carbon::create($this->published_at))->toDateString(),
            'status' => new StatusesResource($this->whenLoaded('status')),
            'project' => new ProjectCollection($this->whenLoaded('project')),
            'standardStatus' => new StandardstatusesResource($this->whenLoaded('standardStatus')),
        ];
    }
}
