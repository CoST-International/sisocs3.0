<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Offerer extends Model
{
    use HasFactory;

    protected $table = 'offerers';

    protected $fillable = [
        'offerer_name',
        'offerer_legal_name'
    ];
}
