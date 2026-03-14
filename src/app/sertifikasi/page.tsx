import React from 'react';
import { Metadata } from 'next';
import ClientIcon from '@/components/SharedComponent/IconWrapper';
import { CertificateCard } from '@/components/Certificates';
import { certificateCategories, getCategoryById } from '@/data/certificates';
import HeroSub from '@/components/SharedComponent/HeroSub';
import { Certificate } from '@/types/certificate';

export const metadata: Metadata = {
  title: 'Sertifikasi Kompetensi - Educare Academy',
  description: 'Verifikasi dan lihat sertifikat kompetensi akuntansi, Accurate, pajak, dan Excel dari Educare Academy. Sertifikat dengan QR code untuk memastikan keaslian.',
  keywords: 'sertifikat kompetensi, sertifikasi akuntansi, certified accurate professional, verifikasi sertifikat',
};

async function fetchCertificates(): Promise<Certificate[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
    const serverUrl = apiUrl.replace('localhost', '127.0.0.1');
    const res = await fetch(`${serverUrl}/certificates`, {
      method: "GET",
      cache: 'no-store'
    });
    const result = await res.json();
    return Array.isArray(result.data) ? result.data : (result.data?.data || []);
  } catch {
    return [];
  }
}

export default async function SertifikasiPage() {
  const breadcrumbs = [
    { label: 'Beranda', href: '/' },
    { label: 'Sertifikasi', href: '/sertifikasi' },
  ];

  let certificates = await fetchCertificates();
  // Fallback if public fetch fails (because list is admin only)
  if (certificates.length === 0) {
    const dummy = await import('@/data/certificates');
    certificates = dummy.certificates.slice(0, 8); // Just show a few as fallback
  }

  return (
    <main>
      <HeroSub 
        title="Sertifikasi Kompetensi"
        description="Verifikasi keaslian sertifikat kompetensi dari Educare Academy. Setiap sertifikat dilengkapi dengan QR code untuk memastikan validitasnya."
        breadcrumbs={breadcrumbs}
      />

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
              <ClientIcon 
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
                  <ClientIcon icon="solar:qr-code-bold" className="text-4xl text-primary-400" />
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
                      <ClientIcon icon="solar:check-circle-bold" className="text-green-400" />
                      <span>Scan QR Code</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <ClientIcon icon="solar:check-circle-bold" className="text-green-400" />
                      <span>Lihat Detail</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <ClientIcon icon="solar:check-circle-bold" className="text-green-400" />
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
