<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CertificateController extends Controller
{
    /**
     * PUBLIC: Verify certificate by number
     */
    public function verify(Request $request)
    {
        $number = $request->query('number');

        if (!$number) {
            return response()->json([
                'is_valid' => false,
                'message' => 'Nomor sertifikat wajib diisi.',
                'verified_at' => now()->toISOString(),
            ], 400);
        }

        $certificate = Certificate::where('certificate_number', $number)->first();

        if (! $certificate) {
            return response()->json([
                'is_valid' => false,
                'message' => 'Sertifikat dengan nomor tersebut tidak ditemukan.',
                'verified_at' => now()->toISOString(),
            ], 404);
        }

        return response()->json([
            'success' => true,
            'is_valid' => $certificate->status === 'active',
            'message' => $certificate->status === 'active'
                ? 'Sertifikat valid dan aktif.'
                : 'Sertifikat tidak aktif (status: ' . $certificate->status . ').',
            'data' => new \App\Http\Resources\CertificateResource($certificate),
            'verified_at' => now()->toISOString(),
        ]);
    }

    /**
     * PUBLIC: List recent active certificates
     */
    public function publicIndex(Request $request)
    {
        $certificates = Certificate::where('status', 'active')
            ->orderBy('issue_date', 'desc')
            ->paginate($request->get('limit', 10));

        return \App\Http\Resources\CertificateResource::collection($certificates);
    }

    /**
     * PUBLIC: Show single certificate by ID
     */
    public function publicShow($id)
    {
        $certificate = Certificate::find($id);

        if (!$certificate) {
            return response()->json([
                'success' => false,
                'message' => 'Sertifikat tidak ditemukan.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => new \App\Http\Resources\CertificateResource($certificate)
        ]);
    }


    /**
     * ADMIN: List all certificates with filters
     */
    public function index(Request $request)
    {
        $query = Certificate::query();

        if ($request->has('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        if ($request->has('template_type') && $request->template_type !== 'all') {
            $query->where('template_type', $request->template_type);
        }

        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('holder_name', 'like', "%{$search}%")
                  ->orWhere('certificate_number', 'like', "%{$search}%")
                  ->orWhere('competency_title', 'like', "%{$search}%");
            });
        }

        $certificates = $query->orderBy('issue_date', 'desc')
            ->paginate($request->get('per_page', 15));

        return response()->json($certificates);
    }

    /**
     * ADMIN: Show single certificate
     */
    public function show(string $id)
    {
        $certificate = Certificate::findOrFail($id);

        return response()->json(['data' => $certificate]);
    }

    /**
     * ADMIN: Create new certificate
     */
    public function store(Request $request)
    {
        $request->validate([
            'certificate_number' => 'required|string|unique:certificates,certificate_number',
            'template_type' => 'required|in:simple,formal',
            'holder_name' => 'required|string|max:255',
            'competency_title' => 'required|string|max:255',
            'issue_date' => 'required|date',
            'issuer_name' => 'required|string|max:255',
            'issuer_title' => 'required|string|max:255',
            'category' => 'required|string',
            'status' => 'required|in:active,expired,revoked',
            'skills' => 'nullable|array',
            'director_signature' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:2048',
            'manager_signature' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:2048',
            'participant_photo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $data = $request->except(['director_signature', 'manager_signature', 'participant_photo']);

        if ($request->hasFile('director_signature')) {
            $path = $request->file('director_signature')->store('public/signatures');
            $data['director_signature'] = Storage::url($path);
        }

        if ($request->hasFile('manager_signature')) {
            $path = $request->file('manager_signature')->store('public/signatures');
            $data['manager_signature'] = Storage::url($path);
        }

        if ($request->hasFile('participant_photo')) {
            $path = $request->file('participant_photo')->store('public/photos');
            $data['participant_photo'] = Storage::url($path);
        }

        $certificate = Certificate::create($data);

        return response()->json([
            'message' => 'Sertifikat berhasil dibuat.',
            'data' => $certificate,
        ], 201);
    }

    /**
     * ADMIN: Update certificate
     */
    public function update(Request $request, string $id)
    {
        $certificate = Certificate::findOrFail($id);

        $request->validate([
            'certificate_number' => 'sometimes|string|unique:certificates,certificate_number,' . $id,
            'template_type' => 'sometimes|in:simple,formal',
            'holder_name' => 'sometimes|string|max:255',
            'status' => 'sometimes|in:active,expired,revoked',
            'director_signature' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:2048',
            'manager_signature' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:2048',
            'participant_photo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $data = $request->except(['director_signature', 'manager_signature', 'participant_photo']);

        if ($request->hasFile('director_signature')) {
            // Hapus file lama jika ada
            if ($certificate->director_signature) {
                $oldPath = str_replace('/storage/', '', $certificate->director_signature);
                Storage::delete('public/' . $oldPath);
            }
            $path = $request->file('director_signature')->store('public/signatures');
            $data['director_signature'] = Storage::url($path);
        }

        if ($request->hasFile('manager_signature')) {
            // Hapus file lama jika ada
            if ($certificate->manager_signature) {
                $oldPath = str_replace('/storage/', '', $certificate->manager_signature);
                Storage::delete('public/' . $oldPath);
            }
            $path = $request->file('manager_signature')->store('public/signatures');
            $data['manager_signature'] = Storage::url($path);
        }

        if ($request->hasFile('participant_photo')) {
            if ($certificate->participant_photo) {
                $oldPath = str_replace('/storage/', '', $certificate->participant_photo);
                Storage::delete('public/' . $oldPath);
            }
            $path = $request->file('participant_photo')->store('public/photos');
            $data['participant_photo'] = Storage::url($path);
        }

        $certificate->update($data);

        return response()->json([
            'message' => 'Sertifikat berhasil diupdate.',
            'data' => $certificate,
        ]);
    }

    /**
     * ADMIN: Delete certificate
     */
    public function destroy(string $id)
    {
        $certificate = Certificate::findOrFail($id);
        $certificate->delete();

        return response()->json([
            'message' => 'Sertifikat berhasil dihapus.',
        ]);
    }
}
