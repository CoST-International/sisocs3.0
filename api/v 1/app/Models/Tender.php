<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tender extends Model
{
    use HasFactory;

    protected $table = 'tenders';

    protected $with = [
        'status'
    ];

    protected $fillable = [
        'process_number_standard',
        'process_number',
        'process_name',
        'projects_id',
        'contract_types_id',
        'tender_methods_id',
        'standard_status_id',
        'statuses_id',
        'organizations_id',
        'published_at',
        'user_publication',
        'user_creation',
        'roles_id',
        'ocds_generation'
    ];

    public function status() {
        return $this->belongsTo(Status::class, 'statuses_id');
    }


    public function award() {
        return $this->hasMany(Award::class, 'id', 'tenders_id');
    }

    public function project() {
        return $this->hasMany(Project::class, 'id', 'projects_id');
    }

    public function tenderMethod() {
        return $this->hasOne(Tendermethod::class, 'id', 'tender_methods_id');
    }

    public function contractType() {
        return $this->hasOne(ContractType::class, 'id', 'contract_types_id');
    }

    public function standardStatus() {
        return $this->belongsTo(Standardstatus::class, 'standard_status_id');
    }
}
