<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'description',
        'full_description',
        'price',
        'original_price',
        'sessions',
        'quota',
        'schedule',
        'time',
        'level',
        'category',
        'instructor',
        'rating',
        'students',
        'image',
        'benefits',
        'includes',
        'is_popular',
        'is_new',
        'is_active',
    ];

    protected $casts = [
        'benefits' => 'array',
        'includes' => 'array',
        'is_popular' => 'boolean',
        'is_new' => 'boolean',
        'is_active' => 'boolean',
        'price' => 'integer',
        'original_price' => 'integer',
        'rating' => 'decimal:1',
    ];

    public function registrations()
    {
        return $this->belongsToMany(Registration::class, 'registration_courses');
    }
}
