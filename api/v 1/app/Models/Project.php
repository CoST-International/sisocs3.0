<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'track_code',
        'process_number_standard',
        'project_code',
        'project_name',
        'project_description',
        'project_code_sefin',
        'project_budget',
        'project_budget_approved',
        'project_scope',
        'encironment_effect_description',
        'resettlement_description',
        'inital_lat',
        'inital_lon',
        'final_lon',
        'file_works_plan',
        'file_budget_multianual_program',
        'file_feasibility_study',
        'file_environment_effect_study',
        'file_environment_license_migration_contract',
        'file_resettlement_compesation_plan',
        'file_financing_agreement',
        'file_approval_description',
        'file_others',
        'organizations_id',
        'organization_units_id',
        'sectors_id',
        'subsectors_id',
        'purposes_id',
        'officials_id',
        'roles_id',
        'standard_status_id',
        'statuses_id',
        'ocds_generation',
        'version',
        'user_creation',
        'user_publication',
        'published_at',
        'startDate',
        'endDate',
        'durationInDays',
    ];

    public function sector() {
        return $this->belongsTo(Sector::class, 'sectors_id')->select(['id', 'code', 'sector_name']);
    }

    public function oc4idsSector() {
        return $this->belongsTo(Ocdssector::class, 'sectors_id')->select(['id', 'code', 'title']);
    }

    public function subSector() {
        return $this->belongsTo(Subsector::class, 'subsectors_id');
    }

    public function organization() {
        return $this->belongsTo(Organization::class, 'organizations_id');
    }

    public function organizationUnit() {
        return $this->belongsTo(OrganizationUnit::class, 'organization_units_id');
    }

    public function purpose() {
        return $this->belongsTo(Purpose::class, 'purposes_id')->select(['id', 'code', 'purpose_name']);
    }

    public function official() {
        return $this->belongsTo(Official::class, 'officials_id');
    }

    public function standardStatus() {
        return $this->belongsTo(Standardstatus::class, 'standard_status_id');
    }

    public function status() {
        return $this->belongsTo(Status::class, 'statuses_id');
    }

    public function preparation() {
        return $this->belongsTo(Preparation::class, 'id', 'projects_id');
    }

    public function prequalification() {
        return $this->belongsTo(Prequalification::class, 'id', 'projects_id');
    }

    public function tender() {
        return $this->belongsTo(Tender::class, 'id', 'projects_id');
    }

    public function award() {
        return $this->belongsTo(Award::class, 'id', 'project_id');
    }

    public function completion() {
        return $this->belongsTo(Completion::class, 'id', 'projects_id');
    }

    public function documents() {
        return $this->hasMany(Document::class, 'object_id');
    }

    // public function section() {
    //     return $this->hasManyThrough(Section::class, Document::class, 'object_id', 'id', 'id', 'id');
    // }


}
