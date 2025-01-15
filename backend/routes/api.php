<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProvinceController;
use App\Http\Controllers\DistrictController;
use App\Http\Controllers\SubdistrictController;
use App\Http\Controllers\WardController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\NavigationMenuController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\ContingentController; 
use App\Http\Controllers\TeamMemberController;
use App\Http\Controllers\DocumentController;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    $user = $request->user();

    // Eager-load group and roles
    $user->load(['group.roles']);

    // Add role names to the response
    $roles = $user->group ? $user->group->roles->pluck('name') : [];

    return [
        'user' => $user,
        'role_names' => $roles, // Returns a list of role names
    ];
});

// Menus
Route::middleware('auth:sanctum')->get('/menus', [MenuController::class, 'index']);

//Provinces
Route::apiResource('provinces', ProvinceController::class);
//Districts
Route::apiResource('districts', DistrictController::class);
//Subdistricts
Route::apiResource('subdistricts', SubdistrictController::class);
//Wards
Route::apiResource('wards', WardController::class);

//Navigation Menus
Route::get('navigation-menus/fetch-all', [NavigationMenuController::class, 'fetchAllNavigation']);
Route::apiResource('navigation-menus', NavigationMenuController::class);

//Contingents
Route::get('contingents/fetch-all', [ContingentController::class, 'index']);
Route::apiResource('contingents', ContingentController::class);

//Team Members
Route::apiResource('team-members', TeamMemberController::class);

//Documents
Route::get('/download-document/{filename}', [DocumentController::class, 'download']);


//Auth
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);