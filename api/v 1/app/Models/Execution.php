<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Execution extends Model
{
    use HasFactory;

    protected $table = 'executions';

    protected $with = [
        'contract',
        'contract.project',
        'status',
    ];

    protected $fillable = [
        'track_award',
        'track_tender',
        'vartime',
        'varprice',
        'start_date',
        'program',
        'contracts_id',
        'contacts_id',
        'status_id',
        'publication_date',
        'ocds_generation',
        'user_creation',
        'user_publication'
    ];

    public function contract() {
        return $this->belongsTo(Contract::class, 'contracts_id');
    }

    public function status() {
        return $this->belongsTo(Status::class, 'statuses_id');
    }
}
