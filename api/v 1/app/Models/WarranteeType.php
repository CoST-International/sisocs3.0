<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WarranteeType extends Model
{
    use HasFactory;

    protected $table = 'warranty_types';

    protected $fillable = [
        'type_name'
    ];
}
