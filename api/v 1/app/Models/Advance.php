<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Advance extends Model
{
    use HasFactory;

    protected $table = 'advances';

    protected $fillable = [
        'contract_number',
        'percent_programed',
        'percent_real',
        'finance_programed',
        'finance_real',
        'description_problems',
        'description_issues',
        'date_advance',
        'executions_id',
        'contracts_id',
        'status_id',
        'user_creation',
        'user_publication',
        'published_at'
    ];
}
