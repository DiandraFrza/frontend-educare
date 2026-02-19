"use client";

import React from 'react';
import Link from 'next/link';
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from 'framer-motion';
import { CoursePackage } from '@/types/course';
import { formatPrice, getCourseById } from '@/data/courses';

interface PackageCardProps {
  package: CoursePackage;
  index?: number;
}

const PackageCard: React.FC<PackageCardProps> = ({ package: pkg, index = 0 }) => {
  const courseNames = pkg.courses
    .map(id => getCourseById(id)?.title)
    .filter(Boolean)
    .slice(0, 3);

  const moreCount = pkg.courses.length - 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`group relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden transition-all duration-300 h-full flex flex-col ${
        pkg.popular 
          ? 'shadow-soft-xl dark:shadow-slate-900/50 ring-2 ring-primary-500' 
          : 'shadow-soft dark:shadow-slate-900/50 hover:shadow-soft-xl dark:hover:shadow-slate-900/80'
      }`}
    >
      {/* Popular Badge */}
      {pkg.popular && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-center py-1.5 text-xs font-semibold">
          ⭐ Paling Populer
        </div>
      )}

      <div className={`p-6 flex flex-col flex-1 ${pkg.popular ? 'pt-10' : ''}`}>
        {/* Header */}
        <div className="mb-4">
          <h3 className="font-display font-bold text-xl text-secondary-900 dark:text-white mb-2">
            {pkg.name}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {pkg.description}
          </p>
        </div>

        {/* Course List */}
        <div className="space-y-2 mb-4 flex-1">
          {courseNames.map((name, i) => (
            <div key={i} className="flex items-start gap-2">
              <Icon icon="solar:check-circle-bold" className="text-success flex-shrink-0 mt-0.5 text-sm" />
              <span className="text-sm text-slate-700 dark:text-slate-300 line-clamp-1">{name}</span>
            </div>
          ))}
          {moreCount > 0 && (
            <div className="flex items-center gap-2">
              <Icon icon="solar:add-circle-linear" className="text-primary-500 flex-shrink-0 text-sm" />
              <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">+{moreCount} kursus lainnya</span>
            </div>
          )}
        </div>

        {/* Savings Badge */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-semibold">
            <Icon icon="solar:piggy-bank-linear" />
            Hemat {formatPrice(pkg.savings)}
          </span>
        </div>

        {/* Pricing */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-700 mb-4">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-sm text-slate-400 dark:text-slate-500 line-through">
              {formatPrice(pkg.totalPrice)}
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-secondary-900 dark:text-white">
              {formatPrice(pkg.packagePrice)}
            </span>
          </div>
        </div>

        {/* CTA */}
        <Link 
          href={`https://wa.me/?text=Saya%20tertarik%20dengan%20paket%20${encodeURIComponent(pkg.name)}`}
          target="_blank"
          className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-all ${
            pkg.popular
              ? 'bg-primary-600 text-white hover:bg-primary-700'
              : 'bg-secondary-50 dark:bg-slate-700 text-secondary-700 dark:text-slate-300 hover:bg-secondary-900 dark:hover:bg-slate-600 hover:text-white'
          }`}
        >
          <Icon icon="tabler:brand-whatsapp" className="text-base" />
          <span>Pilih Paket Ini</span>
        </Link>
      </div>
    </motion.div>
  );
};

export default PackageCard;
