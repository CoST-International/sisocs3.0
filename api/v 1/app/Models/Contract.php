<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contract extends Model
{
    use HasFactory;

    protected $table = 'contracts';

    protected $fillable = [
        'process_number_standard',
        'contract_number',
        'contract_title',
        'contract_scope',
        'price_local_currency',
        'price_usd_currency',
        'start_date',
        'end_date',
        'duration',
        'awards_id',
        'organizations_id',
        'offerers_id',
        'statuses_id',
        'standard_status_id',
        'user_creation',
        'project_id',
        'ocds_generation',
        'currency_id',
    ];

    public function project() {
        return $this->belongsTo(Project::class);
    }

    public function award() {
        return $this->belongsTo(Award::class, 'awards_id');
    }

    public function status() {
        return $this->belongsTo(Status::class, 'statuses_id');
    }

    public function standardStatus() {
        return $this->belongsTo(Standardstatus::class, 'standard_status_id');
    }
}
