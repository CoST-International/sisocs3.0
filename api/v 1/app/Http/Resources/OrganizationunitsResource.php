<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrganizationunitsResource extends JsonResource
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
            'name' => $this->unit_name,
            'organization_id' => $this->organizations_id,
            'organization' => new OrganizationsResource($this->whenLoaded('organization'))
        ];
    }
}
