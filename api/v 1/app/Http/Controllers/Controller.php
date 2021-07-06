<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    const PAGINATION_LIMIT = 100;

    public function pagination($limit)
    {
        $paginationLimit = (request()->has('limit') && is_numeric($limit) && $limit <= self::PAGINATION_LIMIT) ? $limit : self::PAGINATION_LIMIT;

        return $paginationLimit;
    }
}
