<?php

namespace App\Http\Controllers;

use App\Http\Resources\CurrenciesResource;
use App\Http\Resources\CurrencyCollection;
use App\Models\Currency;
use Illuminate\Http\Request;

class CurrencyController extends Controller
{
     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $currenceies = Currency::query();

        if (request()->filled('q') && request()->q == 'all') {
            return $currenceies->select('id', 'currency_name')->orderBy('id', 'asc')->get();
        } else {
            $currenceies = $currenceies->orderBy('id', 'asc')->paginate($this->pagination(request()->limit));
        }

        return new CurrencyCollection($currenceies);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Currency $currency)
    {
        $currency = Currency::create([
            'code'          => request()->code,
            'currency_name' => request()->name,
        ]);

        return new CurrenciesResource($currency);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Currency $currency)
    {
        return new CurrenciesResource($currency);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Currency $currency)
    {
        $currency->update([
            'code'          => request()->code,
            'currency_name' => request()->name,
        ]);

        return new CurrenciesResource($currency);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Currency $currency)
    {
        $currency->delete();
        return response(null, 204);
    }
}
