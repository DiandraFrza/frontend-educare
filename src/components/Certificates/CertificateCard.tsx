"use client";

import React from 'react';
import Link from 'next/link';
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from 'framer-motion';
import { Certificate } from '@/types/certificate';
import { getLevelLabel, getLevelColor, getCategoryLabel, getCategoryColor } from '@/data/certificates';

interface CertificateCardProps {
  certificate: Certificate;
  index?: number;
}

const CertificateCard: React.FC<CertificateCardProps> = ({ certificate, index = 0 }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group bg-white dark:bg-slate-800 rounded-2xl shadow-soft dark:shadow-slate-900/50 overflow-hidden hover:shadow-soft-xl dark:hover:shadow-slate-900/80 transition-all duration-300"
    >
      {/* Header with decorative pattern */}
      <div className="relative h-24 bg-gradient-to-r from-secondary-900 via-secondary-800 to-secondary-700 overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-32 h-32 border-4 border-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-24 h-24 border-4 border-white rounded-full translate-x-1/3 translate-y-1/3" />
          <div className="absolute top-1/2 left-1/2 w-16 h-16 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        </div>
        
        {/* Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${getCategoryColor(certificate.category)}`}>
            {getCategoryLabel(certificate.category)}
          </span>
        </div>
        
        {certificate.level && (
          <div className="absolute top-3 right-3">
            <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${getLevelColor(certificate.level)}`}>
              {getLevelLabel(certificate.level)}
            </span>
          </div>
        )}

        {/* Certificate icon */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
          <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full shadow-soft flex items-center justify-center border-4 border-secondary-100 dark:border-slate-700">
            <Icon icon="solar:diploma-bold" className="text-3xl text-secondary-600 dark:text-secondary-400" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pt-10 pb-5 px-5">
        {/* Certificate Number */}
        <div className="text-center mb-4">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full">
            {certificate.certificateNumber}
          </span>
        </div>

        {/* Holder Name */}
        <h3 className="text-center font-display font-bold text-lg text-secondary-900 dark:text-white mb-2 line-clamp-1">
          {certificate.holderName}
        </h3>

        {/* Competency Title */}
        <p className="text-center text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 min-h-[40px]">
          {certificate.competencyTitle}
        </p>

        {/* Info */}
        <div className="flex items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-4">
          <span className="flex items-center gap-1">
            <Icon icon="solar:calendar-linear" className="text-primary-500 dark:text-primary-400" />
            {formatDate(certificate.issueDate)}
          </span>
          <span className="flex items-center gap-1">
            <Icon icon="solar:check-circle-linear" className="text-green-500" />
            Valid
          </span>
        </div>

        {/* Skills Preview */}
        <div className="flex flex-wrap gap-1 justify-center mb-4">
          {certificate.skills.slice(0, 3).map((skill, i) => (
            <span 
              key={i}
              className="text-[10px] px-2 py-0.5 bg-secondary-50 dark:bg-slate-700 text-secondary-700 dark:text-slate-300 rounded-full"
            >
              {skill}
            </span>
          ))}
          {certificate.skills.length > 3 && (
            <span className="text-[10px] px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-full">
              +{certificate.skills.length - 3}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link 
            href={`/sertifikat/${certificate.id}`}
            className="flex-1 flex items-center justify-center gap-1.5 bg-secondary-50 dark:bg-slate-700 text-secondary-700 dark:text-slate-300 py-2 rounded-xl text-xs font-semibold hover:bg-secondary-900 dark:hover:bg-slate-600 hover:text-white transition-all"
          >
            <Icon icon="solar:eye-linear" className="text-sm" />
            <span>Lihat</span>
          </Link>
          <Link 
            href={`/verifikasi/${certificate.id}`}
            className="flex-1 flex items-center justify-center gap-1.5 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 py-2 rounded-xl text-xs font-semibold hover:bg-primary-600 dark:hover:bg-primary-600 hover:text-white transition-all"
          >
            <Icon icon="solar:qr-code-linear" className="text-sm" />
            <span>Verifikasi</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CertificateCard;
