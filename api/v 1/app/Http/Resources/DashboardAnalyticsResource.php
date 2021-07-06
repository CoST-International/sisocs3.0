<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DashboardAnalyticsResource extends JsonResource
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
            'numOfProjects'     => $this->totalOfProjects,
            'numOfTenders'      => $this->totalTenders,
            'numOfAwards'       => $this->totalAwards,
            'numOfContracts'    => $this->totalContracts
        ];
    }
}
