<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prequalification extends Model
{
    use HasFactory;

    protected $table = 'calification';

    protected $with = [
        'status'
    ];

    protected $fillable = [
        'projects_id',
        'process_number_standard',
        'process_number',
        'date_start',
        'status_id',
        'standard_status_id',
        'date_end',
        'published_at'
    ];

    public function project() {
        return $this->hasMany(Project::class, 'id', 'projects_id');
    }

    public function status() {
        return $this->belongsTo(Status::class);
    }

    public function standardStatus() {
        return $this->belongsTo(Standardstatus::class);
    }
}
