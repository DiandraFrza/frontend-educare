<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('registrations', function (Blueprint $table) {
            $table->id();
            $table->string('registration_number')->unique();
            $table->string('full_name');
            $table->string('institution');
            $table->string('phone');
            $table->string('email')->nullable();
            $table->enum('info_source', ['instagram', 'whatsapp', 'teman', 'facebook', 'lainnya'])->default('lainnya');
            $table->string('payment_proof')->nullable(); // file path
            $table->enum('status', ['pending', 'verified', 'rejected'])->default('pending');
            $table->text('notes')->nullable(); // catatan admin
            $table->timestamps();
        });

        // Pivot table: registrations <-> courses (many-to-many)
        Schema::create('registration_courses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('registration_id')->constrained()->onDelete('cascade');
            $table->foreignId('course_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('registration_courses');
        Schema::dropIfExists('registrations');
    }
};
