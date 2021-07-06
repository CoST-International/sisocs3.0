<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory;

    protected $table = 'project_cities';

    protected $fillable = [
        'benefit',
        'city_code',
        'cities_id',
        'states_id',
        'statuses_id',
        'projects_id',
        'published_at',
        'user_creation',
        'date_published',
        'user_publication',
    ];

    public function cities() {
        return $this->hasMany(City::class, 'id', 'cities_id');
    }

    public function states() {
        return $this->hasMany(State::class, 'id', 'states_id');
    }
}
