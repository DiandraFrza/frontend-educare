<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Registration;
use App\Models\Certificate;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * ADMIN: Get dashboard statistics
     */
    public function stats()
    {
        return response()->json([
            'data' => [
                'total_registrations' => Registration::count(),
                'pending_registrations' => Registration::where('status', 'pending')->count(),
                'verified_registrations' => Registration::where('status', 'verified')->count(),
                'rejected_registrations' => Registration::where('status', 'rejected')->count(),
                'total_courses' => Course::where('is_active', true)->count(),
                'total_certificates' => Certificate::count(),
                'active_certificates' => Certificate::where('status', 'active')->count(),
                'recent_registrations' => Registration::with('courses:id,title')
                    ->orderBy('created_at', 'desc')
                    ->limit(5)
                    ->get(['id', 'registration_number', 'full_name', 'status', 'created_at']),
            ],
        ]);
    }
}
