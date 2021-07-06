<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ocdsstatus extends Model
{
    use HasFactory;

    protected $table = 'standard_status';

    protected $fillable = [
        'code',
        'name',
        'name_local',
        'sections_id',
    ];
}
