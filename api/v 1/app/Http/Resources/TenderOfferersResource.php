<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TenderOfferersResource extends JsonResource
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
            'tender_id' => $this->tenders_id,
            'offerer_id' => $this->offerers_id,
            'status_id' => $this->statuses_id,
            'offerers' => new OffererCollection($this->whenLoaded('offerers'))
        ];
    }
}
