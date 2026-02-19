"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";

export default function SyaratKetentuan() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-16">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
        {/* Header */}
        <div className="mb-12">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mb-6"
          >
            <Icon icon="solar:arrow-left-linear" className="text-xl" />
            <span>Kembali ke Beranda</span>
          </Link>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-white mb-4">
            Syarat & Ketentuan
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Terakhir diperbarui: 20 Februari 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-soft dark:shadow-slate-900/50 p-8 sm:p-12 space-y-8">
          <section>
            <h2 className="font-display text-xl font-bold text-secondary-900 dark:text-white mb-4">
              1. Penerimaan Syarat
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Dengan mendaftar dan menggunakan layanan Educare Academy, Anda menyetujui untuk terikat 
              oleh Syarat & Ketentuan ini. Jika Anda tidak setuju dengan syarat-syarat ini, 
              mohon untuk tidak menggunakan layanan kami.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-secondary-900 dark:text-white mb-4">
              2. Layanan Kami
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Educare Academy menyediakan:
            </p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 ml-4">
              <li>Kursus online dan live session tentang akuntansi, perpajakan, dan software akuntansi</li>
              <li>Materi pembelajaran dalam bentuk e-book dan video</li>
              <li>Konsultasi dengan tutor berpengalaman</li>
              <li>Sertifikat penyelesaian program</li>
              <li>Akses ke komunitas alumni</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-secondary-900 dark:text-white mb-4">
              3. Pendaftaran dan Akun
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Untuk mengakses layanan kami, Anda harus:
            </p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 ml-4">
              <li>Memberikan informasi yang akurat dan lengkap saat pendaftaran</li>
              <li>Menjaga kerahasiaan data akun Anda</li>
              <li>Bertanggung jawab atas semua aktivitas di akun Anda</li>
              <li>Segera memberitahu kami jika ada penggunaan tidak sah atas akun Anda</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-secondary-900 dark:text-white mb-4">
              4. Pembayaran dan Refund
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-400">
              <p className="leading-relaxed">
                <strong className="text-slate-800 dark:text-slate-200">Pembayaran:</strong> Semua pembayaran harus dilakukan 
                sesuai dengan harga yang tertera di website. Pembayaran dapat dilakukan melalui 
                transfer bank atau metode pembayaran lain yang tersedia.
              </p>
              <p className="leading-relaxed">
                <strong className="text-slate-800 dark:text-slate-200">Kebijakan Refund:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Pengajuan refund dapat dilakukan maksimal 7 hari setelah pembayaran</li>
                <li>Refund tidak berlaku jika sudah mengakses lebih dari 30% materi kelas</li>
                <li>Biaya administrasi 10% akan dipotong dari total refund</li>
                <li>Proses refund membutuhkan waktu 7-14 hari kerja</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-secondary-900 dark:text-white mb-4">
              5. Hak Kekayaan Intelektual
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Semua materi pembelajaran, termasuk video, e-book, modul, dan konten lainnya, 
              dilindungi oleh hak cipta. Anda dilarang:
            </p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 ml-4 mt-4">
              <li>Menggandakan, mendistribusikan, atau menjual materi kami</li>
              <li>Membagikan akses akun kepada orang lain</li>
              <li>Merekam atau mendownload video untuk distribusi</li>
              <li>Menggunakan materi untuk tujuan komersial tanpa izin</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-secondary-900 dark:text-white mb-4">
              6. Sertifikat
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Sertifikat diberikan kepada peserta yang:
            </p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 ml-4 mt-4">
              <li>Menyelesaikan minimal 80% materi kelas</li>
              <li>Mengikuti sesi live yang diwajibkan (jika ada)</li>
              <li>Menyelesaikan tugas/evaluasi (jika ada)</li>
              <li>Tidak melanggar kebijakan platform</li>
            </ul>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
              Sertifikat akan dikirimkan maksimal 14 hari kerja setelah kelas selesai 
              dalam bentuk digital (PDF) dan fisik (untuk kelas tertentu).
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-secondary-900 dark:text-white mb-4">
              7. Perilaku Pengguna
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Pengguna wajib:
            </p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 ml-4 mt-4">
              <li>Bersikap sopan dan menghormati tutor serta peserta lain</li>
              <li>Tidak menggunakan bahasa yang menyinggung atau diskriminatif</li>
              <li>Tidak melakukan spam atau promosi di dalam grup belajar</li>
              <li>Menjaga kerahasiaan informasi pribadi peserta lain</li>
            </ul>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
              Pelanggaran dapat mengakibatkan penangguhan atau penghentian akses tanpa refund.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-secondary-900 dark:text-white mb-4">
              8. Perubahan Jadwal
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Kami berhak mengubah jadwal kelas dengan pemberitahuan minimal 24 jam sebelumnya. 
              Jika terjadi pembatalan kelas dari pihak kami, peserta berhak memilih 
              jadwal alternatif atau refund penuh.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-secondary-900 dark:text-white mb-4">
              9. Batasan Tanggung Jawab
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Educare Academy tidak bertanggung jawab atas:
            </p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 ml-4 mt-4">
              <li>Kesalahan teknis di luar kendali kami</li>
              <li>Kehilangan data akibat kelalaian pengguna</li>
              <li>Hasil belajar yang bervariasi antar individu</li>
              <li>Keputusan perekrutan atau karir setelah mengikuti kelas</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-secondary-900 dark:text-white mb-4">
              10. Perubahan Syarat
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Kami dapat mengubah Syarat & Ketentuan ini kapan saja. Perubahan akan efektif 
              segera setelah diposting di website. Penggunaan berkelanjutan atas layanan kami 
              setelah perubahan berarti Anda menerima syarat yang direvisi.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-secondary-900 dark:text-white mb-4">
              11. Hukum yang Berlaku
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Syarat & Ketentuan ini diatur oleh hukum Republik Indonesia. 
              Setiap perselisihan akan diselesaikan secara musyawarah atau melalui 
              jalur hukum yang berlaku di Indonesia.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-secondary-900 dark:text-white mb-4">
              12. Hubungi Kami
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Untuk pertanyaan tentang Syarat & Ketentuan ini, silakan hubungi kami:
            </p>
            <div className="mt-4 space-y-2">
              <a 
                href="https://wa.me/6288210372698" 
                target="_blank"
                className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline"
              >
                <Icon icon="tabler:brand-whatsapp" />
                <span>+62 882-1037-2698</span>
              </a>
              <a 
                href="https://instagram.com/academy_excellencee"
                target="_blank"
                className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline"
              >
                <Icon icon="tabler:brand-instagram" />
                <span>@academy_excellencee</span>
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
