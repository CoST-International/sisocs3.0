<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OfficialsResource extends JsonResource
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
            'official_name' => $this->official_name,
            'position' => $this->position,
            'email' => $this->email,
            'phone' => $this->phone,
            'organization_id' => $this->organizations_id,
            'organization_unit_id' => $this->organizations_unit_id,
            'organization' => new OrganizationsResource($this->whenLoaded('organization')),
            'organizationUnit' => new OrganizationunitsResource($this->whenLoaded('organizationUnit'))
        ];
    }
}
