/** @format */

import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { CertificatePreview } from "@/components/Certificates";
import { getCertificateById, getCategoryLabel, getLevelLabel } from "@/data/certificates";
import HeroSub from "@/components/SharedComponent/HeroSub";

import { certificates } from "@/data/certificates";

interface SertifikatPageProps {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  return certificates.map((certificate) => ({
    id: certificate.id,
  }));
}

export async function generateMetadata({ params }: SertifikatPageProps): Promise<Metadata> {
  const certificate = getCertificateById(params.id);

  if (!certificate) {
    return {
      title: "Sertifikat Tidak Ditemukan - Educare Academy",
    };
  }

  return {
    title: `${certificate.competencyTitle} - ${certificate.holderName}`,
    description: `Sertifikat kompetensi ${getCategoryLabel(certificate.category)} untuk ${certificate.holderName}. Diterbitkan oleh Educare Academy.`,
  };
}

export default function SertifikatPage({ params }: SertifikatPageProps) {
  const certificate = getCertificateById(params.id);

  if (!certificate) {
    notFound();
  }

  const verificationUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/verifikasi/${certificate.id}`;

  const breadcrumbs = [
    { label: "Beranda", href: "/" },
    { label: "Sertifikasi", href: "/sertifikasi" },
    { label: certificate.holderName, href: `/sertifikat/${certificate.id}` },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <main className="bg-slate-50 dark:bg-slate-900 min-h-screen">
      <div className="text-slate-900 dark:text-white">
        <HeroSub title="Detail Sertifikat" description={`Sertifikat kompetensi atas nama ${certificate.holderName}`} breadcrumbs={breadcrumbs} />
      </div>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Certificate Preview */}
            <div className="lg:col-span-2">
              <CertificatePreview certificate={certificate} verificationUrl={verificationUrl} />
            </div>

            {/* Certificate Info Sidebar */}
            <div className="space-y-6">
              {/* Status Card */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-soft p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="font-display font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Icon icon="solar:info-circle-linear" className="text-primary-500" />
                  Informasi Sertifikat
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Nomor Sertifikat</label>
                    <p className="font-mono text-sm text-slate-900 dark:text-white font-medium">{certificate.certificateNumber}</p>
                  </div>

                  <div>
                    <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Status</label>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm font-medium text-green-600 dark:text-green-400 capitalize">{certificate.status === "active" ? "Aktif" : certificate.status}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Kategori</label>
                      <span className="text-sm text-slate-900 dark:text-white">{getCategoryLabel(certificate.category)}</span>
                    </div>
                    {certificate.level && (
                      <div>
                        <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Level</label>
                        <span className="text-sm text-slate-900 dark:text-white">{getLevelLabel(certificate.level)}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Tanggal Terbit</label>
                    <p className="text-sm text-slate-900 dark:text-white">{formatDate(certificate.issueDate)}</p>
                  </div>

                  {certificate.expiryDate && (
                    <div>
                      <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Berlaku Hingga</label>
                      <p className="text-sm text-slate-900 dark:text-white">{formatDate(certificate.expiryDate)}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Issuer Info */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-soft p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="font-display font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Icon icon="solar:verified-check-linear" className="text-primary-500" />
                  Penerbit
                </h3>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{certificate.issuerName}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{certificate.issuerTitle}</p>
                  </div>

                  {certificate.partnerName && (
                    <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
                      <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Partner Sertifikasi</label>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{certificate.partnerName}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Signatures Info Card */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-soft p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="font-display font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Icon icon="solar:pen-new-square-linear" className="text-primary-500" />
                  Paraf Pengesah
                </h3>

                <div className="space-y-4">
                  {/* Director */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon icon="solar:user-id-bold" className="text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{certificate.directorName || "M. Aziz Andriansyah, S.Pd., Gr., CAAT., CAP., CTTr"}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{certificate.directorTitle || "Direktur Utama"}</p>
                    </div>
                  </div>

                  {/* Manager */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-secondary-100 dark:bg-secondary-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon icon="solar:user-id-bold" className="text-secondary-600 dark:text-secondary-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{certificate.managerName || " Azriel Hikmal Maulana Rafi, S.Pd."}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{certificate.managerTitle || "Manager Divisi Edukasi"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Info Card */}
              <div className="bg-gradient-to-br from-secondary-900 to-secondary-800 rounded-xl shadow-soft p-6 text-white">
                <h3 className="font-display font-bold mb-4 flex items-center gap-2">
                  <Icon icon="solar:buildings-bold" />
                  Badan Usaha
                </h3>

                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-secondary-200 text-xs">NIB</p>
                    <p className="font-mono text-white">2712240057221</p>
                  </div>
                  <div>
                    <p className="text-secondary-200 text-xs">KBLI</p>
                    <p className="font-mono text-white">71201, 78493, 85499</p>
                  </div>
                  <div>
                    <p className="text-secondary-200 text-xs">Nomor AHU</p>
                    <p className="font-mono text-white">AHU-00351.AH.01.30 Tahun 2025</p>
                  </div>
                  <div>
                    <p className="text-secondary-200 text-xs">Nomor Kegiatan Usaha</p>
                    <p className="font-mono text-white">2024-2270-9124-0002-2075</p>
                  </div>
                  <div className="pt-2 border-t border-secondary-700">
                    <p className="text-secondary-200 text-xs">Alamat</p>
                    <p className="text-white text-xs leading-relaxed">Jl. Jembatan Besi XII, RT.012/RW.009, Kel. Jembatan Besar, Kec. Tambora, Jakarta Barat 11320</p>
                  </div>
                </div>
              </div>

              {/* Skills Card */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-soft p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="font-display font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Icon icon="solar:stars-linear" className="text-primary-500" />
                  Kompetensi
                </h3>
                <div className="flex flex-wrap gap-2">
                  {certificate.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl shadow-soft p-6 text-white">
                <h3 className="font-display font-bold mb-3 flex items-center gap-2">
                  <Icon icon="solar:shield-check-bold" />
                  Verifikasi Cepat
                </h3>
                <p className="text-sm text-primary-100 mb-4">Pastikan keaslian sertifikat ini dengan memindai QR code atau mengunjungi halaman verifikasi.</p>
                <Link href={`/verifikasi/${certificate.id}`} className="flex items-center justify-center gap-2 w-full bg-white text-primary-700 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-50 transition-colors">
                  <Icon icon="solar:qr-code-linear" />
                  Verifikasi Sekarang
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
