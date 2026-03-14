<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CertificateResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $frontendUrl = config('app.frontend_url', 'http://localhost:3000');
        
        return [
            'id' => (string) $this->id,
            'certificateNumber' => $this->certificate_number,
            'holderName' => $this->holder_name,
            'holderId' => $this->holder_id,
            'holderPhoto' => $this->holder_photo,
            'participantPhoto' => $this->participant_photo,
            'holderBirthPlace' => $this->holder_birth_place,
            'holderBirthDate' => $this->holder_birth_date ? $this->holder_birth_date->toISOString() : null,
            'holderInstitution' => $this->holder_institution,
            'templateType' => $this->template_type,
            'courseName' => $this->course_name,
            'courseDescription' => $this->course_description,
            'competencyTitle' => $this->competency_title,
            'competencyDescription' => $this->competency_description,
            'issueDate' => $this->issue_date ? $this->issue_date->toISOString() : null,
            'expiryDate' => $this->expiry_date ? $this->expiry_date->toISOString() : null,
            'issuerName' => $this->issuer_name,
            'issuerTitle' => $this->issuer_title,
            'issuerSignature' => $this->issuer_signature,
            'directorName' => $this->director_name,
            'directorTitle' => $this->director_title,
            'directorSignature' => $this->director_signature,
            'managerName' => $this->manager_name,
            'managerTitle' => $this->manager_title,
            'managerSignature' => $this->manager_signature,
            'partnerName' => $this->partner_name,
            'partnerLogo' => $this->partner_logo,
            'category' => $this->category,
            'level' => $this->level,
            'status' => $this->status,
            'verificationUrl' => "{$frontendUrl}/verifikasi/{$this->certificate_number}",
            'skills' => is_array($this->skills) ? $this->skills : json_decode($this->skills, true) ?? [],
        ];
    }
}
