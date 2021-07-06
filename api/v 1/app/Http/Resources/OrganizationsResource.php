<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrganizationsResource extends JsonResource
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
            'id'                        => $this->id ? $this->id : '',
            'identifier'                => $this->identifier,
            'organization_name'         => $this->organization_name,
            'organization_legal_name'   => $this->organization_legal_name,
        ];
    }
}
