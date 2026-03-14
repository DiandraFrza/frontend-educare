<?php

namespace Database\Seeders;

use App\Models\Certificate;
use Illuminate\Database\Seeder;

class CertificateSeeder extends Seeder
{
    public function run(): void
    {
        $certificates = [
            // Formal certificates (Ujian Kompetensi)
            [
                'certificate_number' => '001/EDU/Komp/II/2026',
                'template_type' => 'formal',
                'holder_name' => 'Sellina Aulia Putri',
                'holder_id' => '3201011234560001',
                'holder_birth_place' => 'Jakarta',
                'holder_birth_date' => '2008-01-17',
                'holder_institution' => 'SMKS ISLAM BAHAGIA',
                'competency_title' => 'Teknisi Akuntansi Yunior KKNI Level II',
                'competency_description' => 'Telah dinyatakan lulus dalam ujian sertifikasi kompetensi bidang Teknisi Akuntansi sesuai dengan Standar Kompetensi Kerja Nasional Indonesia (SKKNI)',
                'issue_date' => '2026-02-05',
                'expiry_date' => '2029-02-05',
                'issuer_name' => 'M. Aziz Andriansyah, S.Pd., Gr., CAAT., CAP., CTTrr',
                'issuer_title' => 'Founder & Lead Instructor Educare Academy',
                'director_name' => 'M. Aziz Andriansyah, S.Pd., Gr., CAAT., CAP., CTTrr',
                'director_title' => 'Direktur Utama',
                'manager_name' => 'Azriel Hikmal Maulana Rafi, S.Pd.',
                'manager_title' => 'Manager Divisi Edukasi',
                'partner_name' => 'PT Educare Prestasi Indonesia',
                'category' => 'teknisi-akuntansi',
                'level' => 'professional',
                'status' => 'active',
                'skills' => ['Pencatatan Transaksi', 'Penyusunan Laporan Keuangan', 'Analisis SAK EMKM', 'Praktik Akuntansi Manual'],
            ],
            [
                'certificate_number' => '002/EDU/Komp/II/2026',
                'template_type' => 'formal',
                'holder_name' => 'Ahmad Fauzi',
                'holder_id' => '3201033456780003',
                'holder_birth_place' => 'Surabaya',
                'holder_birth_date' => '1990-08-15',
                'holder_institution' => 'Politeknik Keuangan',
                'competency_title' => 'Komputerisasi Akuntansi',
                'competency_description' => 'Telah dinyatakan lulus dalam ujian sertifikasi kompetensi bidang Komputerisasi Akuntansi',
                'issue_date' => '2026-02-20',
                'expiry_date' => '2029-02-20',
                'issuer_name' => 'M. Aziz Andriansyah, S.Pd., CAAT., CAP., CTTr',
                'issuer_title' => 'Certified Instructor',
                'director_name' => 'M. Aziz Andriansyah, S.Pd., Gr., CAAT., CAP., CTTr',
                'director_title' => 'Direktur Utama',
                'manager_name' => 'Azrel Hikmat Maulana Rati, S.Pc.',
                'manager_title' => 'Manager Divisi Edukasi',
                'partner_name' => 'PT Educare Prestasi Indonesia',
                'category' => 'komputerisasi-akuntansi',
                'level' => 'menengah',
                'status' => 'active',
                'skills' => ['Penggunaan Software Akuntansi', 'Input Data Transaksi', 'Generate Laporan', 'Backup dan Restore Data'],
            ],

            // Simple certificates (Kelas/Partisipasi)
            [
                'certificate_number' => 'EDU/CLS/2026/001',
                'template_type' => 'simple',
                'holder_name' => 'Dewi Kusuma Wardani',
                'course_name' => 'Microsoft Office untuk Pemula',
                'course_description' => 'Telah menyelesaikan kelas Microsoft Office untuk Pemula dan dinyatakan lulus dalam evaluasi akhir.',
                'competency_title' => 'Microsoft Office untuk Pemula',
                'competency_description' => 'Telah menyelesaikan kelas Microsoft Office untuk Pemula dan dinyatakan lulus dalam evaluasi akhir.',
                'issue_date' => '2026-02-10',
                'issuer_name' => 'M. Aziz Andriansyah, S.Pd., CAAT., CAP., CTTr',
                'issuer_title' => 'Lead Instructor',
                'category' => 'microsoft-office',
                'status' => 'active',
                'skills' => ['Microsoft Excel Dasar', 'Microsoft Word', 'Microsoft PowerPoint'],
            ],
            [
                'certificate_number' => 'EDU/CLS/2026/002',
                'template_type' => 'simple',
                'holder_name' => 'Budi Santoso',
                'course_name' => 'Accurate 5 Dasar',
                'course_description' => 'Telah menyelesaikan kelas Accurate 5 Dasar dan dinyatakan kompeten dalam penggunaan software.',
                'competency_title' => 'Accurate 5 Dasar',
                'competency_description' => 'Telah menyelesaikan kelas Accurate 5 Dasar dan dinyatakan kompeten dalam penggunaan software.',
                'issue_date' => '2026-02-15',
                'issuer_name' => 'M. Aziz Andriansyah, S.Pd., CAAT., CAP., CTTr',
                'issuer_title' => 'Lead Instructor',
                'category' => 'accurate',
                'status' => 'active',
                'skills' => ['Setup Perusahaan Accurate', 'Input Transaksi', 'Laporan Keuangan'],
            ],
            [
                'certificate_number' => 'EDU/CLS/2026/003',
                'template_type' => 'simple',
                'holder_name' => 'Siti Nurhaliza',
                'course_name' => 'Teknisi Akuntansi Dasar',
                'course_description' => 'Telah menyelesaikan kelas Teknisi Akuntansi Dasar dan memahami konsep akuntansi fundamental.',
                'competency_title' => 'Teknisi Akuntansi Dasar',
                'competency_description' => 'Telah menyelesaikan kelas Teknisi Akuntansi Dasar dan memahami konsep akuntansi fundamental.',
                'issue_date' => '2026-02-18',
                'issuer_name' => 'M. Aziz Andriansyah, S.Pd., CAAT., CAP., CTTr',
                'issuer_title' => 'Lead Instructor',
                'category' => 'teknisi-akuntansi',
                'status' => 'active',
                'skills' => ['Dasar Akuntansi', 'Jurnal Umum', 'Buku Besar'],
            ],
        ];

        foreach ($certificates as $cert) {
            Certificate::create($cert);
        }
    }
}
