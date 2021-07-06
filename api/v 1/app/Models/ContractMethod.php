<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContractMethod extends Model
{
    use HasFactory;

    protected $table = 'contract_methods';

    protected $fillable = [
        'method_name'
    ];
}
