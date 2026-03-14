<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create default admin user
        User::create([
            'name' => 'Admin Educare',
            'email' => 'admin@educareacademy.my.id',
            'password' => Hash::make('educare2026'),
            'role' => 'superadmin',
        ]);

        // Seed courses & certificates
        $this->call([
            CourseSeeder::class,
            CertificateSeeder::class,
        ]);
    }
}
