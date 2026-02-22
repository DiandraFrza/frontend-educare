"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react/dist/iconify.js';
import { motion } from 'framer-motion';
import { Certificate } from '@/types/certificate';
import { getCategoryLabel, getLevelLabel } from '@/data/certificates';

interface VerificationContentProps {
  certificate: Certificate | null;
}

export default function VerificationContent({ certificate }: VerificationContentProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [verifiedAt, setVerifiedAt] = useState<string>('');

  useEffect(() => {
    // Simulate verification process
    const timer = setTimeout(() => {
      setVerifiedAt(new Date().toLocaleString('id-ID'));
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-50 dark:bg-slate-900">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-primary-200 dark:border-primary-900 border-t-primary-600 rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
            Memverifikasi Sertifikat...
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            Mohon tunggu sebentar
          </p>
        </div>
      </div>
    );
  }

  if (!certificate) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-50 dark:bg-slate-900 p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-soft p-8 text-center"
        >
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon icon="solar:shield-warning-bold" className="text-4xl text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-2xl font-display font-bold text-secondary-900 dark:text-white mb-3">
            Sertifikat Tidak Ditemukan
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Sertifikat dengan ID tersebut tidak terdaftar dalam sistem kami. 
            Pastikan QR code yang Anda scan valid dan berasal dari sertifikat asli Educare Academy.
          </p>
          <div className="flex flex-col gap-2">
            <Link
              href="/sertifikasi"
              className="flex items-center justify-center gap-2 w-full bg-secondary-900 text-white py-3 rounded-xl font-semibold hover:bg-secondary-800 transition-colors"
            >
              <Icon icon="solar:diploma-linear" />
              Lihat Daftar Sertifikasi
            </Link>
            <a
              href="https://wa.me/6288210372698"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full border border-slate-300 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
            >
              <Icon icon="tabler:brand-whatsapp" />
              Hubungi Kami
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  const isValid = certificate.status === 'active';

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-slate-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Verification Result Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl p-6 mb-6 text-center ${
            isValid 
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
              : 'bg-gradient-to-r from-red-500 to-rose-600 text-white'
          }`}
        >
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon 
              icon={isValid ? "solar:shield-check-bold" : "solar:shield-warning-bold"} 
              className="text-3xl"
            />
          </div>
          <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">
            {isValid ? 'Sertifikat Tervalidasi' : 'Sertifikat Tidak Valid'}
          </h1>
          <p className="text-white/90">
            {isValid 
              ? 'Sertifikat ini ASLI dan sudah tervalidasi dalam sistem Educare Academy' 
              : 'Sertifikat ini tidak aktif atau telah dicabut'}
          </p>
        </motion.div>

        {/* Certificate Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-soft overflow-hidden"
        >
          {/* Header with Logo */}
          <div className="bg-gradient-to-r from-secondary-900 to-secondary-800 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <Icon icon="solar:diploma-bold" className="text-2xl" />
                </div>
                <div>
                  <h2 className="font-display font-bold">Educare Academy</h2>
                  <p className="text-xs text-slate-300">Sistem Verifikasi Sertifikat</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400">Diverifikasi pada</p>
                <p className="text-sm font-mono">{verifiedAt}</p>
              </div>
            </div>
          </div>

          {/* Certificate Info */}
          <div className="p-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium mb-4">
                <Icon icon="solar:check-circle-bold" />
                Terverifikasi
              </div>
              <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-1">
                {certificate.competencyTitle}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                {certificate.competencyDescription}
              </p>
            </div>

            {/* Holder Info */}
            <div className="bg-secondary-50 dark:bg-slate-700/50 rounded-xl p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">
                    Nama Pemegang
                  </label>
                  <p className="font-semibold text-secondary-900 dark:text-white">
                    {certificate.holderName}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">
                    Nomor Sertifikat
                  </label>
                  <p className="font-mono text-sm text-secondary-900 dark:text-white">
                    {certificate.certificateNumber}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">
                    Kategori
                  </label>
                  <p className="text-secondary-900 dark:text-white">
                    {getCategoryLabel(certificate.category)}
                  </p>
                </div>
                {certificate.level && (
                  <div>
                    <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">
                      Level
                    </label>
                    <p className="text-secondary-900 dark:text-white">
                      {getLevelLabel(certificate.level)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <Icon icon="solar:calendar-bold" className="text-xl text-primary-500 mx-auto mb-2" />
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Tanggal Terbit</p>
                <p className="font-semibold text-secondary-900 dark:text-white text-sm">
                  {formatDate(certificate.issueDate)}
                </p>
              </div>
              <div className="text-center p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <Icon icon="solar:calendar-mark-bold" className="text-xl text-primary-500 mx-auto mb-2" />
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Berlaku Hingga</p>
                <p className="font-semibold text-secondary-900 dark:text-white text-sm">
                  {certificate.expiryDate ? formatDate(certificate.expiryDate) : 'Seumur Hidup'}
                </p>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-6">
              <h4 className="font-semibold text-secondary-900 dark:text-white mb-3 text-sm">
                Kompetensi yang Dimiliki:
              </h4>
              <div className="flex flex-wrap gap-2">
                {certificate.skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1.5 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 rounded-lg text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Issuer */}
            <div className="border-t border-slate-100 dark:border-slate-700 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Diterbitkan oleh</p>
                  <p className="font-semibold text-secondary-900 dark:text-white">
                    {certificate.issuerName}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {certificate.issuerTitle}
                  </p>
                </div>
                {certificate.partnerName && (
                  <div className="text-right">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Partner</p>
                    <p className="font-semibold text-secondary-900 dark:text-white text-sm">
                      {certificate.partnerName}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="bg-slate-50 dark:bg-slate-700/50 p-4 flex flex-wrap gap-2">
            <Link
              href={`/sertifikat/${certificate.id}`}
              className="flex-1 flex items-center justify-center gap-2 bg-secondary-900 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-secondary-800 transition-colors"
            >
              <Icon icon="solar:eye-linear" />
              Lihat Sertifikat
            </Link>
            <Link
              href="/sertifikasi"
              className="flex-1 flex items-center justify-center gap-2 bg-white dark:bg-slate-600 text-secondary-700 dark:text-slate-200 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-500 transition-colors"
            >
              <Icon icon="solar:diploma-linear" />
              Daftar Sertifikasi
            </Link>
          </div>
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center"
        >
          <div className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
            <Icon icon="solar:shield-check-bold" className="text-green-500" />
            <span>Verifikasi resmi oleh Educare Academy</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Untuk keamanan tambahan, Anda dapat menghubungi kami untuk konfirmasi lebih lanjut.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
