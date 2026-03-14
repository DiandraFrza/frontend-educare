<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\RegistrationController;
use App\Http\Controllers\Api\CertificateController;
use App\Http\Controllers\Api\DashboardController;

/*
|--------------------------------------------------------------------------
| API Routes - Educare Academy
|--------------------------------------------------------------------------
|
| PUBLIC routes: accessible without authentication
| ADMIN routes: require Sanctum token (login first)
|
*/

// ─── PUBLIC ROUTES ──────────────────────────────────────────

// Auth
Route::post('/auth/login', [AuthController::class, 'login']);

// Courses (public - for frontend display)
Route::get('/courses', [CourseController::class, 'index']);
Route::get('/courses/popular', [CourseController::class, 'popular']);
Route::get('/courses/categories', [CourseController::class, 'categories']);
Route::get('/courses/{id}', [CourseController::class, 'show']);

// Registration (public - submit form)
Route::post('/registrations', [RegistrationController::class, 'store']);

// Certificate list (public)
Route::get('/certificates', [CertificateController::class, 'publicIndex']);
Route::get('/certificates/{id}', [CertificateController::class, 'publicShow']);

// Certificate verification (public) - menggunakan query parameter: ?number=xxx
Route::get('/certificates/verify', [CertificateController::class, 'verify']);


// ─── ADMIN ROUTES (Protected by Sanctum) ────────────────────

Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    // Dashboard
    Route::get('/dashboard/stats', [DashboardController::class, 'stats']);

    // Courses (admin CRUD)
    Route::get('/admin/courses', [CourseController::class, 'adminIndex']);
    Route::post('/admin/courses', [CourseController::class, 'store']);
    Route::put('/admin/courses/{id}', [CourseController::class, 'update']);
    Route::delete('/admin/courses/{id}', [CourseController::class, 'destroy']);

    // Registrations (admin)
    Route::get('/admin/registrations', [RegistrationController::class, 'index']);
    Route::get('/admin/registrations/{id}', [RegistrationController::class, 'show']);
    Route::put('/admin/registrations/{id}/status', [RegistrationController::class, 'updateStatus']);
    Route::delete('/admin/registrations/{id}', [RegistrationController::class, 'destroy']);

    // Certificates (admin CRUD)
    Route::get('/admin/certificates', [CertificateController::class, 'index']);
    Route::get('/admin/certificates/{id}', [CertificateController::class, 'show']);
    Route::post('/admin/certificates', [CertificateController::class, 'store']);
    Route::put('/admin/certificates/{id}', [CertificateController::class, 'update']);
    Route::delete('/admin/certificates/{id}', [CertificateController::class, 'destroy']);
});
