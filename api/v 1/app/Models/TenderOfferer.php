<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TenderOfferer extends Model
{
    use HasFactory;

    protected $table = 'tender_offerers';

    protected $fillable = [
        'tenders_id',
        'offerers_id',
        'statuses_id'
    ];

    public function offerers() {
        return $this->hasMany(Offerer::class, 'id', 'offerers_id');
    }
}
