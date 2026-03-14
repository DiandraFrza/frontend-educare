<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->text('description');
            $table->text('full_description')->nullable();
            $table->integer('price')->default(0);
            $table->integer('original_price')->nullable();
            $table->integer('sessions')->default(1);
            $table->integer('quota')->default(10);
            $table->string('schedule')->nullable();
            $table->string('time')->nullable();
            $table->enum('level', ['pemula', 'menengah', 'mahir', 'semua'])->default('semua');
            $table->string('category'); // akuntansi, accurate, pajak, excel, umkm, bundling
            $table->string('instructor');
            $table->decimal('rating', 2, 1)->default(0);
            $table->integer('students')->default(0);
            $table->string('image')->nullable();
            $table->json('benefits')->nullable();
            $table->json('includes')->nullable();
            $table->boolean('is_popular')->default(false);
            $table->boolean('is_new')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
