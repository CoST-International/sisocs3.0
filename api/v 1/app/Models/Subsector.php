<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subsector extends Model
{
    use HasFactory;

    protected $table = 'subsectors';

    protected $fillable = [
        'sectors_id',
        'subsector_name'
    ];
}
