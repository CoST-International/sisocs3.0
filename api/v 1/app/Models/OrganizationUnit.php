<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrganizationUnit extends Model
{
    use HasFactory;

    protected $table = 'organization_units';

    protected $with = [
       'organization'
    ];

    protected $fillable = [
        'unit_name',
        'organizations_id'
    ];

    public function organization() {
        return $this->hasOne(Organization::class, 'id', 'organizations_id')->select('id', 'organization_name', 'organization_legal_name', 'identifier');
    }
}
