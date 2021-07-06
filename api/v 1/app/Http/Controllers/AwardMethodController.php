<?php

namespace App\Http\Controllers;

use App\Http\Resources\AwardMethodCollection;
use App\Http\Resources\AwardsResource;
use App\Models\Award;
use App\Models\AwardMethod;
use Illuminate\Http\Request;
use Carbon\Carbon;

class AwardMethodController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $awardMethods = AwardMethod::query();

        if (request()->filled('q') && request()->q == 'all') {
            return new AwardMethodCollection($awardMethods->get());
        } else {
            $awardMethods = $awardMethods->paginate($this->pagination(request()->limit));
        }

        return new AwardMethodCollection($awardMethods);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Award $award)
    {

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Award $award)
    {

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Award $award)
    {

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Award $award)
    {
        
    }
}
