<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Warrantee extends Model
{
    use HasFactory;

    protected $table = 'warranties';

    protected $fillable = [
        'contract_number',
        'amount',
        'expiration_date',
        'executions_id',
        'contracts_id',
        'waranty_types_id',
        'statuses_id',
        'user_creation',
        'published_at'
    ];

    public function warranteeType() {
        return $this->hasMany(WarranteeType::class, 'id', 'waranty_types_id');
    }
}
