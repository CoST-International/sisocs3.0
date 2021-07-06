<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Addendum extends Model
{
    use HasFactory;

    protected $table = 'amendments';

    protected $with = [
        'contract',
        'contract.project',
        'status',
    ];

    protected $fillable = [
        'track_engage',
        'track_ammendment',
        'n_modify',
        'modification_type',
        'description',
        'justification',
        'current_price',
        'current_contract_scope',
        'addendum',
        'date',
        'contract_date',
        'contracts_id',
        'statuses_id',
        'user_creation',
        'currency_id',
    ];

    public function contract() {
        return $this->belongsTo(Contract::class, 'contracts_id');
    }

    public function status() {
        return $this->belongsTo(Status::class, 'statuses_id');
    }
}
