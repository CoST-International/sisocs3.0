<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Disbursement extends Model
{
    use HasFactory;

    protected $table = 'disbursements';

    protected $fillable = [
        'contracts_id',
        'date',
        'currencies_id',
        'amount',
        'description',
        'order',
        'executions_id',
        'statuses_id',
        'user_creation',
        'published_at'
    ];
}
