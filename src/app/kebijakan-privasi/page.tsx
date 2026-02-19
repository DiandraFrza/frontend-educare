"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";

export default function KebijakanPrivasi() {
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
            Kebijakan Privasi
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Terakhir diperbarui: 20 Februari 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-soft dark:shadow-slate-900/50 p-8 sm:p-12 space-y-8">
          <section>
            <h2 className="font-display text-xl font-bold text-secondary-900 dark:text-white mb-4">
              1. Pendahuluan
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Educare Academy (&quot;kami&quot;, &quot;kita&quot;, atau &quot;milik kami&quot;) berkomitmen untuk melindungi privasi Anda. 
              Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, dan melindungi 
              informasi pribadi Anda saat menggunakan platform kami.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-secondary-900 dark:text-white mb-4">
              2. Informasi yang Kami Kumpulkan
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Kami dapat mengumpulkan informasi berikut dari Anda:
            </p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 ml-4">
              <li>Nama lengkap</li>
              <li>Alamat email</li>
              <li>Nomor telepon/WhatsApp</li>
              <li>Informasi pembayaran</li>
              <li>Data akses dan aktivitas pembelajaran</li>
              <li>Informasi perangkat dan browser</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-secondary-900 dark:text-white mb-4">
              3. Penggunaan Informasi
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Informasi Anda digunakan untuk:
            </p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 ml-4">
              <li>Memproses pendaftaran dan pembayaran kelas</li>
              <li>Memberikan akses ke materi pembelajaran</li>
              <li>Mengirimkan informasi penting terkait kelas</li>
              <li>Memberikan sertifikat setelah menyelesaikan program</li>
              <li>Meningkatkan kualitas layanan kami</li>
              <li>Menghubungi Anda terkait program dan penawaran</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-secondary-900 dark:text-white mb-4">
              4. Perlindungan Data
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Kami menggunakan langkah-langkah keamanan teknis dan organisasi yang sesuai untuk melindungi 
              informasi pribadi Anda dari akses tidak sah, perubahan, pengungkapan, atau penghancuran. 
              Data sensitif seperti informasi pembayaran dienkripsi menggunakan teknologi SSL.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-secondary-900 dark:text-white mb-4">
              5. Berbagi Informasi
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Kami tidak menjual, memperdagangkan, atau menyewakan informasi pribadi Anda kepada pihak ketiga. 
              Informasi Anda hanya dapat dibagikan dengan:
            </p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 ml-4 mt-4">
              <li>Penyedia layanan pembayaran yang terpercaya</li>
              <li>Platform pengiriman sertifikat</li>
              <li>Jika diwajibkan oleh hukum</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-secondary-900 dark:text-white mb-4">
              6. Hak Anda
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Anda memiliki hak untuk:
            </p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 ml-4">
              <li>Mengakses informasi pribadi Anda</li>
              <li>Meminta koreksi data yang tidak akurat</li>
              <li>Meminta penghapusan data Anda</li>
              <li>Menolak penggunaan data untuk marketing</li>
              <li>Menarik persetujuan penggunaan data</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-secondary-900 dark:text-white mb-4">
              7. Cookies
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Kami menggunakan cookies untuk meningkatkan pengalaman pengguna, menganalisis trafik, 
              dan mengingat preferensi Anda. Anda dapat mengatur browser untuk menolak cookies, 
              namun hal ini dapat mempengaruhi fungsionalitas platform.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-secondary-900 dark:text-white mb-4">
              8. Perubahan Kebijakan
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan akan 
              diumumkan melalui email atau notifikasi di platform. Penggunaan berkelanjutan 
              atas layanan kami setelah perubahan berarti Anda menerima kebijakan yang direvisi.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-secondary-900 dark:text-white mb-4">
              9. Hubungi Kami
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami:
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
