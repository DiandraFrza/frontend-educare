<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
    use HasFactory;

    protected $fillable = [
        'registration_number',
        'full_name',
        'institution',
        'phone',
        'email',
        'info_source',
        'payment_proof',
        'status',
        'notes',
    ];

    protected $casts = [
        'status' => 'string',
    ];

    public function courses()
    {
        return $this->belongsToMany(Course::class, 'registration_courses');
    }

    /**
     * Generate unique registration number
     * Format: REG-YYYYMMDD-XXXX
     */
    public static function generateRegistrationNumber(): string
    {
        $date = now()->format('Ymd');
        $prefix = "REG-{$date}-";

        $lastRegistration = self::where('registration_number', 'like', "{$prefix}%")
            ->orderBy('registration_number', 'desc')
            ->first();

        if ($lastRegistration) {
            $lastNumber = (int) substr($lastRegistration->registration_number, -4);
            $newNumber = str_pad($lastNumber + 1, 4, '0', STR_PAD_LEFT);
        } else {
            $newNumber = '0001';
        }

        return $prefix . $newNumber;
    }
}
