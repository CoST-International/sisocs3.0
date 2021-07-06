<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;

    protected $table = 'documents';

    protected $fillable = [
        'id',
        'sections_id',
        'object_id',
        'document_types_id',
        'document_path',
        'document_title',
        'document_author',
        'document_language',
        'document_published',
        'document_description',
        'document_start',
        'document_end',
        'document_format',
        'format',
        'language',
    ];

    public function section() {
        return $this->belongsTo(Section::class, 'sections_id');
    }

    public function documentType() {
        return $this->belongsTo(DocumentType::class, 'document_types_id');
    }
}
