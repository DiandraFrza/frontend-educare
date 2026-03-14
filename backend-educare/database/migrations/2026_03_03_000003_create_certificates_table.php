<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('certificates', function (Blueprint $table) {
            $table->id();
            $table->string('certificate_number')->unique();
            $table->enum('template_type', ['simple', 'formal'])->default('simple');

            // Holder info
            $table->string('holder_name');
            $table->string('holder_id')->nullable(); // NIK
            $table->string('holder_photo')->nullable();
            $table->string('holder_birth_place')->nullable();
            $table->date('holder_birth_date')->nullable();
            $table->string('holder_institution')->nullable();

            // Competency
            $table->string('competency_title');
            $table->text('competency_description')->nullable();

            // Course (for simple template)
            $table->string('course_name')->nullable();
            $table->text('course_description')->nullable();

            // Dates
            $table->date('issue_date');
            $table->date('expiry_date')->nullable();

            // Issuer
            $table->string('issuer_name');
            $table->string('issuer_title');
            $table->string('issuer_signature')->nullable();

            // Director & Manager (for formal template)
            $table->string('director_name')->nullable();
            $table->string('director_title')->nullable();
            $table->string('director_signature')->nullable();
            $table->string('manager_name')->nullable();
            $table->string('manager_title')->nullable();
            $table->string('manager_signature')->nullable();

            // Partner
            $table->string('partner_name')->nullable();
            $table->string('partner_logo')->nullable();

            // Classification
            $table->string('category')->default('general');
            $table->string('level')->nullable();
            $table->enum('status', ['active', 'expired', 'revoked'])->default('active');
            $table->json('skills')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('certificates');
    }
};
