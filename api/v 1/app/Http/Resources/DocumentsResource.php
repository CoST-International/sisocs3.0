<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DocumentsResource extends JsonResource
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
            'section_id' => $this->sections_id,
            'project_id' => $this->object_id,
            'document_type_id' => $this->document_types_id,
            'document_path' => $this->document_path,
            'document_title' => $this->document_title,
            'document_author' => $this->document_author,
            'document_language' => $this->document_language,
            'document_published' => $this->document_published,
            'document_start' => $this->document_start,
            'document_end' => $this->document_end,
            'document_format' => $this->document_format,
            'section'   => new SectionsResource($this->whenLoaded('section')),
            'documentType'   => new DocumenttypesResource($this->whenLoaded('documentType'))
        ];
    }
}
