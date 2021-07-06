<?php

namespace App\Http\Controllers;

use App\Http\Resources\DashboardAnalyticsResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardAnalyticsController extends Controller
{
    public function __construct()
    {

    }

    public function index()
    {
        if(!in_array(auth('api')->user()->user_role, [5])) {
            $organization = auth('api')->user()->organization->id;
            $dashboardSummary = DB::select(
                DB::raw("
                    SELECT
                        COUNT(project.id) AS totalOfProjects,
                        (
                            SELECT COUNT(tender.id) FROM tenders AS tender WHERE tender.organizations_id = '$organization'
                        ) AS totalTenders,
                        (
                            SELECT COUNT(award.id) FROM awards AS award LEFT JOIN projects pjt ON pjt.id = award.project_id WHERE pjt.organizations_id = '$organization'
                        ) AS totalAwards,
                        (
                            SELECT COUNT(contract.id) FROM contracts AS contract WHERE contract.organizations_id = '$organization'
                        ) AS totalContracts
                    FROM projects AS project WHERE project.organizations_id = '$organization' ")
            );
        } else {
            $dashboardSummary = DB::select(
                DB::raw("
                    SELECT
                        COUNT(project.id) AS totalOfProjects,
                        (
                            SELECT COUNT(tender.id) FROM tenders AS tender
                        ) AS totalTenders,
                        (
                            SELECT COUNT(award.id) FROM awards AS award
                        ) AS totalAwards,
                        (
                            SELECT COUNT(contract.id) FROM contracts AS contract
                        ) AS totalContracts
                    FROM projects AS project
                ")
            );
        }


        return new DashboardAnalyticsResource($dashboardSummary[0]);
    }
}
