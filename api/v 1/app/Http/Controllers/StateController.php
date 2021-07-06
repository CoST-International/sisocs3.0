<?php

namespace App\Http\Controllers;

use App\Http\Resources\CitiesResource;
use App\Http\Resources\StateCollection;
use App\Models\State;
use Illuminate\Http\Request;

class StateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $states = State::when(request('q') && request('q') == 'all', function($query) {
            return $query->orderBy('state_name', 'asc');
        })->when(request('state'), function($query) {
            return $query->with('cities')->where('state_name', request('state'));
        })->get();

        return new StateCollection($states);
    }
}
