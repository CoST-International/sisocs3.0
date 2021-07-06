<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
    use HasFactory;

    protected $table = 'organizations';

    protected $fillable = [
        'organization_name',
        'organization_legal_name',
        'identifier',
        'description',
        'address',
        'phone',
        'postal_code',
        'website',
        'ocds_code',
        'code'
    ];


}
