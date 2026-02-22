import React from 'react';
import { Metadata } from 'next';
import { Icon } from '@iconify/react/dist/iconify.js';
import { CertificateCard } from '@/components/Certificates';
import { certificates, certificateCategories, getCategoryById } from '@/data/certificates';
import HeroSub from '@/components/SharedComponent/HeroSub';

export const metadata: Metadata = {
  title: 'Sertifikasi Kompetensi - Educare Academy',
  description: 'Verifikasi dan lihat sertifikat kompetensi akuntansi, Accurate, pajak, dan Excel dari Educare Academy. Sertifikat dengan QR code untuk memastikan keaslian.',
  keywords: 'sertifikat kompetensi, sertifikasi akuntansi, certified accurate professional, verifikasi sertifikat',
};

export default function SertifikasiPage() {
  const breadcrumbs = [
    { label: 'Beranda', href: '/' },
    { label: 'Sertifikasi', href: '/sertifikasi' },
  ];

  return (
    <main>
      <HeroSub 
        title="Sertifikasi Kompetensi"
        description="Verifikasi keaslian sertifikat kompetensi dari Educare Academy. Setiap sertifikat dilengkapi dengan QR code untuk memastikan validitasnya."
        breadcrumbs={breadcrumbs}
      />

      {/* Statistics Section */}
      <section className="py-12 bg-secondary-50 dark:bg-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: 'solar:diploma-bold', value: '500+', label: 'Sertifikat Terbit' },
              { icon: 'solar:users-group-rounded-bold', value: '500+', label: 'Peserta Tersertifikasi' },
              { icon: 'solar:check-circle-bold', value: '100%', label: 'Terverifikasi' },
              { icon: 'solar:shield-check-bold', value: '5', label: 'Kategori Kompetensi' },
            ].map((stat, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl p-4 text-center shadow-soft"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon icon={stat.icon} className="text-2xl text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-1">
                  {stat.value}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-secondary-900 dark:text-white mb-4">
              Kategori Sertifikasi
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Pilih kategori sertifikasi sesuai bidang kompetensi yang ingin Anda verifikasi
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {certificateCategories.map((category) => (
              <div 
                key={category.id}
                className="group bg-white dark:bg-slate-800 rounded-xl p-4 text-center shadow-soft hover:shadow-soft-xl transition-all cursor-pointer border border-transparent hover:border-primary-200 dark:hover:border-primary-800"
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 transition-colors bg-${category.color}-100 dark:bg-${category.color}-900/30`}>
                  <Icon 
                    icon={category.icon} 
                    className={`text-2xl text-${category.color}-600 dark:text-${category.color}-400`}
                  />
                </div>
                <h3 className="font-semibold text-secondary-900 dark:text-white mb-1 text-sm">
                  {category.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-2">
                  {category.description}
                </p>
                <span className="text-xs font-medium text-primary-600 dark:text-primary-400">
                  {category.count} Sertifikat
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates List */}
      <section className="py-12 bg-secondary-50 dark:bg-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-secondary-900 dark:text-white mb-2">
                Daftar Sertifikat
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Contoh sertifikat yang telah diterbitkan oleh Educare Academy
              </p>
            </div>
            
            {/* Search Box */}
            <div className="relative max-w-sm w-full">
              <input
                type="text"
                placeholder="Cari nomor sertifikat..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Icon 
                icon="solar:magnifer-linear" 
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {certificates.map((certificate, index) => (
              <CertificateCard 
                key={certificate.id} 
                certificate={certificate}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Verification Info Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-secondary-900 to-secondary-800 rounded-2xl p-6 md:p-10 text-white">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon icon="solar:qr-code-bold" className="text-4xl text-primary-400" />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-bold mb-2">
                    Cara Verifikasi Sertifikat
                  </h3>
                  <p className="text-slate-300 mb-4 text-sm">
                    Setiap sertifikat Educare Academy dilengkapi dengan QR code unik. 
                    Scan QR code menggunakan kamera smartphone Anda untuk memverifikasi keaslian sertifikat.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <div className="flex items-center gap-2 text-xs">
                      <Icon icon="solar:check-circle-bold" className="text-green-400" />
                      <span>Scan QR Code</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Icon icon="solar:check-circle-bold" className="text-green-400" />
                      <span>Lihat Detail</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Icon icon="solar:check-circle-bold" className="text-green-400" />
                      <span>Validasi Instan</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
