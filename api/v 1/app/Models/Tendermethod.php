<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tendermethod extends Model
{
    use HasFactory;

    protected $table = 'tender_methods';

    protected $fillable = [
        'code',
        'method_name',
        'acronym',
        'method_local'
    ];
}
