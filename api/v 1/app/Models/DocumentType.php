<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocumentType extends Model
{
    use HasFactory;

    protected $table = 'document_types';

    protected $fillable = [
        'type',
        'type_local',
        'sections_id'
    ];

    public function section() {
        return $this->belongsTo(Section::class, 'id', 'sections_id');
    }
}
