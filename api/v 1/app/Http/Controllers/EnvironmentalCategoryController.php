<?php

namespace App\Http\Controllers;

use App\Http\Resources\EnvironmentalCategoryCollection;
use App\Models\EnvironmentalCategory;
use Illuminate\Http\Request;

class EnvironmentalCategoryController extends Controller
{
     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $environmentalCategories = EnvironmentalCategory::query();

        if (request()->filled('q') && request()->q == 'all') {
            return $environmentalCategories->select('id', 'category_name')->orderBy('id', 'asc')->get();
        } else {
            $environmentalCategories = $environmentalCategories->orderBy('id', 'asc')->paginate($this->pagination(request()->limit));
        }

        return new EnvironmentalCategoryCollection($environmentalCategories);
    }
}
