<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    /**
     * PUBLIC: List all active courses (for frontend display)
     */
    public function index(Request $request)
    {
        $query = Course::where('is_active', true);

        // Filter by category
        if ($request->has('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        // Filter by level
        if ($request->has('level') && $request->level !== 'all') {
            $query->where('level', $request->level);
        }

        // Search
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhere('instructor', 'like', "%{$search}%");
            });
        }

        // Sort
        $sortBy = $request->get('sort', 'created_at');
        $sortDir = $request->get('direction', 'desc');
        $query->orderBy($sortBy, $sortDir);

        $courses = $query->get();

        return response()->json(['data' => $courses]);
    }

    /**
     * PUBLIC: Show single course detail
     */
    public function show(string $id)
    {
        $course = Course::where('is_active', true)
            ->where(function ($q) use ($id) {
                $q->where('id', $id)->orWhere('slug', $id);
            })
            ->firstOrFail();

        return response()->json(['data' => $course]);
    }

    /**
     * PUBLIC: Get popular courses for homepage
     */
    public function popular()
    {
        $courses = Course::where('is_active', true)
            ->where('is_popular', true)
            ->limit(6)
            ->get();

        return response()->json(['data' => $courses]);
    }

    /**
     * PUBLIC: Get course categories with counts
     */
    public function categories()
    {
        $categories = Course::where('is_active', true)
            ->selectRaw('category, COUNT(*) as count')
            ->groupBy('category')
            ->get();

        return response()->json(['data' => $categories]);
    }

    // ─── ADMIN ENDPOINTS ────────────────────────────────────

    /**
     * ADMIN: List all courses (including inactive)
     */
    public function adminIndex(Request $request)
    {
        $query = Course::query();

        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where('title', 'like', "%{$search}%");
        }

        $courses = $query->orderBy('created_at', 'desc')
            ->paginate($request->get('per_page', 15));

        return response()->json($courses);
    }

    /**
     * ADMIN: Create new course
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|integer|min:0',
            'sessions' => 'required|integer|min:1',
            'quota' => 'required|integer|min:1',
            'level' => 'required|in:pemula,menengah,mahir,semua',
            'category' => 'required|string',
            'instructor' => 'required|string|max:255',
        ]);

        $data = $request->all();
        $data['slug'] = \Illuminate\Support\Str::slug($request->title) . '-' . uniqid();

        $course = Course::create($data);

        return response()->json([
            'message' => 'Kelas berhasil ditambahkan.',
            'data' => $course,
        ], 201);
    }

    /**
     * ADMIN: Update course
     */
    public function update(Request $request, string $id)
    {
        $course = Course::findOrFail($id);

        $request->validate([
            'title' => 'sometimes|string|max:255',
            'price' => 'sometimes|integer|min:0',
            'level' => 'sometimes|in:pemula,menengah,mahir,semua',
        ]);

        $course->update($request->all());

        return response()->json([
            'message' => 'Kelas berhasil diupdate.',
            'data' => $course,
        ]);
    }

    /**
     * ADMIN: Delete course
     */
    public function destroy(string $id)
    {
        $course = Course::findOrFail($id);
        $course->delete();

        return response()->json([
            'message' => 'Kelas berhasil dihapus.',
        ]);
    }
}
