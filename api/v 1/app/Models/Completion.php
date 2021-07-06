<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Completion extends Model
{
    use HasFactory;

    protected $table = 'completions';

    protected $fillable = [
        'projects_id',
        'standard_status_id',
        'statuses_id',
        'process_number_standard',
        'final_scope',
        'date',
        'asset_lifetime_from',
        'asset_lifetime_to',
        'asset_lifetime',
        'change_specifications',
        'justification',
        'final_cost',
        'finalScopeDetails:',
        // 'ocds_generation'
    ];

    public function project() {
        return $this->hasMany(Project::class, 'id', 'projects_id');
    }
}
