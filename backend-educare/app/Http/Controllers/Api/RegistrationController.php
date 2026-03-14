<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Registration;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class RegistrationController extends Controller
{
    /**
     * PUBLIC: Submit new registration (replaces Google Form)
     */
    public function store(Request $request)
    {
        $request->validate([
            'full_name' => 'required|string|max:255',
            'institution' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email|max:255',
            'info_source' => 'required|in:instagram,whatsapp,teman,facebook,lainnya',
            'course_ids' => 'required|array|min:1',
            'course_ids.*' => 'exists:courses,id',
            'payment_proof' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ], [
            'full_name.required' => 'Nama lengkap wajib diisi.',
            'institution.required' => 'Asal instansi wajib diisi.',
            'phone.required' => 'Nomor telepon wajib diisi.',
            'info_source.required' => 'Sumber informasi wajib dipilih.',
            'course_ids.required' => 'Pilih minimal 1 kelas.',
            'course_ids.min' => 'Pilih minimal 1 kelas.',
            'payment_proof.required' => 'Bukti transfer wajib diunggah.',
            'payment_proof.max' => 'Ukuran file maksimal 2MB.',
            'payment_proof.mimes' => 'File harus berformat JPG, PNG, atau PDF.',
        ]);

        // Upload payment proof
        $paymentProofPath = null;
        if ($request->hasFile('payment_proof')) {
            $paymentProofPath = $request->file('payment_proof')
                ->store('payment-proofs', 'public');
        }

        // Create registration
        $registration = Registration::create([
            'registration_number' => Registration::generateRegistrationNumber(),
            'full_name' => $request->full_name,
            'institution' => $request->institution,
            'phone' => $request->phone,
            'email' => $request->email,
            'info_source' => $request->info_source,
            'payment_proof' => $paymentProofPath,
            'status' => 'pending',
        ]);

        // Attach selected courses
        $registration->courses()->attach($request->course_ids);

        return response()->json([
            'message' => 'Pendaftaran berhasil! Nomor pendaftaran Anda: ' . $registration->registration_number,
            'data' => [
                'registration_number' => $registration->registration_number,
                'full_name' => $registration->full_name,
                'status' => $registration->status,
                'courses' => $registration->courses()->select('courses.id', 'title', 'price')->get(),
            ],
        ], 201);
    }

    /**
     * ADMIN: List all registrations with filters
     */
    public function index(Request $request)
    {
        $query = Registration::with('courses:id,title,price');

        // Filter by status
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Search by name, phone, or registration number
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('full_name', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%")
                  ->orWhere('registration_number', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $registrations = $query->orderBy('created_at', 'desc')
            ->paginate($request->get('per_page', 15));

        // Add full URL for payment proof to each item
        $registrations->getCollection()->transform(function ($reg) {
            if ($reg->payment_proof) {
                $reg->payment_proof_url = Storage::disk('public')->url($reg->payment_proof);
            }
            return $reg;
        });

        return response()->json($registrations);
    }

    /**
     * ADMIN: Show single registration detail
     */
    public function show(string $id)
    {
        $registration = Registration::with('courses')->findOrFail($id);

        // Add full URL for payment proof
        if ($registration->payment_proof) {
            $registration->payment_proof_url = Storage::disk('public')->url($registration->payment_proof);
        }

        return response()->json(['data' => $registration]);
    }

    /**
     * ADMIN: Update registration status (verify/reject)
     */
    public function updateStatus(Request $request, string $id)
    {
        $request->validate([
            'status' => 'required|in:pending,verified,rejected',
            'notes' => 'nullable|string|max:500',
        ]);

        $registration = Registration::findOrFail($id);
        $registration->update([
            'status' => $request->status,
            'notes' => $request->notes,
        ]);

        return response()->json([
            'message' => 'Status pendaftaran berhasil diupdate.',
            'data' => $registration->load('courses'),
        ]);
    }

    /**
     * ADMIN: Delete registration
     */
    public function destroy(string $id)
    {
        $registration = Registration::findOrFail($id);

        // Delete payment proof file
        if ($registration->payment_proof) {
            Storage::disk('public')->delete($registration->payment_proof);
        }

        $registration->courses()->detach();
        $registration->delete();

        return response()->json([
            'message' => 'Pendaftaran berhasil dihapus.',
        ]);
    }
}
