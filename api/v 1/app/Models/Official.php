<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Official extends Model
{
    use HasFactory;

    protected $table = 'officials';

    protected $with = [
        'organization',
        'organizationUnit'
    ];

    protected $fillable = [
        'organizations_id',
        'organization_units_id',
        'official_name',
        'position',
        'email',
        'phone'
    ];

    public function organization() {
        return $this->belongsTo(Organization::class, 'organizations_id');
    }

    public function organizationUnit() {
        return $this->belongsTo(OrganizationUnit::class, 'organization_units_id');
    }
}
