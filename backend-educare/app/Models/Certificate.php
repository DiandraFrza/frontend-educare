<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Certificate extends Model
{
    use HasFactory;

    protected $fillable = [
        'certificate_number',
        'template_type',
        'holder_name',
        'holder_id',
        'holder_photo',
        'holder_birth_place',
        'holder_birth_date',
        'holder_institution',
        'competency_title',
        'competency_description',
        'course_name',
        'course_description',
        'issue_date',
        'expiry_date',
        'issuer_name',
        'issuer_title',
        'issuer_signature',
        'director_name',
        'director_title',
        'director_signature',
        'manager_name',
        'manager_title',
        'manager_signature',
        'partner_name',
        'partner_logo',
        'category',
        'level',
        'status',
        'skills',
    ];

    protected $casts = [
        'skills' => 'array',
        'holder_birth_date' => 'date',
        'issue_date' => 'date',
        'expiry_date' => 'date',
    ];

    /**
     * Generate verification URL
     */
    public function getVerificationUrlAttribute(): string
    {
        $frontendUrl = config('app.frontend_url', 'http://localhost:3000');
        return "{$frontendUrl}/verifikasi/{$this->certificate_number}";
    }
}
