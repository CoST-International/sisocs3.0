<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectFundingSource extends Model
{
    use HasFactory;

    protected $table = 'project_sources';

    protected $fillable = [
        'track_project',
        'ammount',
        'exchange_rate',
        'projects_id',
        'sources_id',
        'currencies_id',
        'statuses_id',
    ];

    public function standardStatus() {
        return $this->belongsTo(Standardstatus::class, 'statuses_id', 'standard_status_id');
    }

    public function fundingSource() {
        return $this->hasMany(Source::class, 'id', 'sources_id');
    }

    public function currencies() {
        return $this->hasMany(Currency::class, 'id', 'currencies_id');
    }
}
