<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Preparation extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'preparation';

    protected $with = [
        'status'
    ];

    protected $fillable = [
        'projects_id',
        'officials_id',
        'statuses_id',
        'process_number_standard',
        'project_scope',
        'project_budget',
        'project_budget_approved',
        'organization_units_id',
        'currencies_id',
        'environmental_categories_id',
        'standard_status_id',
        'start_date',
        'end_date',
    ];

    public function project() {
        return $this->hasMany(Project::class, 'id', 'projects_id');
    }

    public function status() {
        return $this->belongsTo(Status::class, 'statuses_id');
    }

    public function standardStatus() {
        return $this->belongsTo(Standardstatus::class, 'standard_status_id');
    }

    public function organizationUnit() {
        return $this->belongsTo(OrganizationUnit::class, 'organization_units_id');
    }

    public function environmentCategory() {
        return $this->belongsTo(EnvironmentalCategory::class, 'environmental_categories_id');
    }

    public function currency() {
        return $this->belongsTo(Currency::class, 'currencies_id');
    }
}
