<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Award extends Model
{
    use HasFactory;

    protected $table = 'awards';

    protected $with = [
        'status'
    ];

    protected $fillable = [
        'track_award',
        'track_tender',
        'process_number_standard',
        'process_number',
        'contract_estimate_cost',
        'tenders_id',
        'award_methods_id',
        'contract_methods_id',
        'statuses_id',
        'standard_status_id',
        'project_id',
        'published_at',
        'user_publication',
        'currency_id',
        'ocds_generation',
    ];

    public function contract()
    {
        return $this->belongsTo(Contract::class, 'id', 'awards_id');
    }

    public function project() {
        return $this->hasOne(Project::class, 'id', 'project_id');
    }

    public function tender() {
        return $this->belongsTo(Tender::class, 'id', 'tenders_id');
    }

    public function status() {
        return $this->belongsTo(Status::class, 'statuses_id');
    }

    public function standardStatus() {
        return $this->belongsTo(Standardstatus::class, 'standard_status_id');
    }

}
