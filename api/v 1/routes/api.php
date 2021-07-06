<?php

use App\Http\Controllers\AddendumController;
use App\Http\Controllers\AdvanceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AwardController;
use App\Http\Controllers\AwardMethodController;
use App\Http\Controllers\CompletionController;
use App\Http\Controllers\StateController;
use App\Http\Controllers\TenderController;
use App\Http\Controllers\SectorController;
use App\Http\Controllers\SourceController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\PurposeController;
use App\Http\Controllers\OffererController;
use App\Http\Controllers\ContractController;
use App\Http\Controllers\OfficialController;
use App\Http\Controllers\CurrencyController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\WarranteeController;
use App\Http\Controllers\SubsectorController;
use App\Http\Controllers\OcdssectorController;
use App\Http\Controllers\PreparationController;
use App\Http\Controllers\DocumentTypeController;
use App\Http\Controllers\OrganizationController;
use App\Http\Controllers\TendermethodController;
use App\Http\Controllers\WarranteeTypeController;
use App\Http\Controllers\TenderOffererController;
use App\Http\Controllers\StandardstatusController;
use App\Http\Controllers\OrganizationUnitController;
use App\Http\Controllers\PrequalificationController;
use App\Http\Controllers\DashboardAnalyticsController;
use App\Http\Controllers\ProjectFundingSourceController;
use App\Http\Controllers\EnvironmentalCategoryController;
use App\Http\Controllers\ExecutionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {

    Route::post('me', [AuthController::class, 'me']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('register', [AuthController::class, 'register']);

});

Route::group([
    'middleware' => 'auth:api',
    'prefix' => 'v1'
], function() {

    // Route::post('token', [AuthController::class, 'token']);
    // Route::get('me', [AuthController::class, 'me']);
    // Route::post('logout', [AuthController::class, 'logout']);
    // Route::post('register', [AuthController::class, 'register']);
    // Route::get('refresh-token', [AuthController::class, 'refreshToken']);

    Route::apiResource('users', UserController::class);
    Route::apiResource('roles', RoleController::class);
    Route::apiResource('states', StateController::class);
    Route::apiResource('awards', AwardController::class);
    Route::apiResource('sectors', SectorController::class);
    Route::apiResource('tenders', TenderController::class);
    Route::apiResource('advances', AdvanceController::class);
    Route::apiResource('addenda', AddendumController::class);
    Route::apiResource('offerers', OffererController::class);
    Route::apiResource('purposes', PurposeController::class);
    Route::apiResource('projects', ProjectController::class);
    Route::apiResource('contracts', ContractController::class);
    Route::apiResource('documents', DocumentController::class);
    Route::apiResource('locations', LocationController::class);
    Route::apiResource('officials', OfficialController::class);
    Route::apiResource('currencies', CurrencyController::class);
    Route::apiResource('executions', ExecutionController::class);
    Route::apiResource('warrantees', WarranteeController::class);
    Route::apiResource('completions', CompletionController::class);
    Route::apiResource('sub-sectors', SubsectorController::class);
    Route::apiResource('preparations', PreparationController::class);
    Route::apiResource('oc4ids-sectors', OcdssectorController::class);
    Route::apiResource('organizations', OrganizationController::class);
    Route::apiResource('document-types', DocumentTypeController::class);
    Route::apiResource('warrantee-types', WarranteeTypeController::class);
    Route::apiResource('tender-offerers', TenderOffererController::class);
    Route::apiResource('standard-statuses', StandardstatusController::class);
    Route::apiResource('prequalifications', PrequalificationController::class);
    Route::apiResource('organization-units', OrganizationUnitController::class);
    Route::apiResource('funding-sources', SourceController::class)->only('index');
    Route::apiResource('dashboard-analytics', DashboardAnalyticsController::class);
    Route::apiResource('award-methods', AwardMethodController::class)->only('index');
    Route::apiResource('tender-methods', TendermethodController::class)->only('index');
    Route::apiResource('project-funding-sources', ProjectFundingSourceController::class);
    Route::apiResource('environmental-categories', EnvironmentalCategoryController::class)->only('index');
});

