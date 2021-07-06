<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class LocationsResource extends JsonResource
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
            'city_id' => $this->cities_id,
            'state_id' => $this->states_id,
            'status_id' => $this->statuses_id,
            'project_id' => $this->projects_id,
            'cities' => new CityCollection($this->whenLoaded('cities')),
            'states' => new StateCollection($this->whenLoaded('states')),
        ];
    }
}
