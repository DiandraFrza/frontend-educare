"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from 'framer-motion';
import { Course } from '@/types/course';
import { formatPrice, getLevelLabel, getLevelColor } from '@/data/courses';
import { getImagePrefix } from '@/utils/util';

interface CourseCardProps {
  course: Course;
  index?: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, index = 0 }) => {
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Icon 
            key={i}
            icon={i < Math.floor(rating) ? "solar:star-bold" : "solar:star-linear"}
            className={`text-xs ${i < Math.floor(rating) ? 'text-amber-400' : 'text-slate-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group bg-white rounded-2xl shadow-soft overflow-hidden hover:shadow-soft-xl transition-all duration-300 h-full flex flex-col"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <Image 
          src={`${getImagePrefix()}${course.image}`}
          alt={course.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${getLevelColor(course.level)}`}>
            {getLevelLabel(course.level)}
          </span>
          {course.isPopular && (
            <span className="px-2.5 py-1 bg-amber-100 text-amber-700 rounded-lg text-xs font-medium">
              Populer
            </span>
          )}
          {course.isNew && (
            <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium">
              Baru
            </span>
          )}
        </div>

        {/* Price Badge */}
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-secondary-900 rounded-lg text-sm font-bold shadow-soft">
            {formatPrice(course.price)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          {renderStars(course.rating)}
          <span className="text-xs text-slate-500">({course.rating})</span>
          <span className="text-xs text-slate-400">• {course.students} siswa</span>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-lg text-secondary-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-600 line-clamp-2 mb-3 flex-1">
          {course.description}
        </p>

        {/* Info Row */}
        <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
          <span className="flex items-center gap-1">
            <Icon icon="solar:calendar-linear" className="text-primary-500" />
            {course.sessions}x Pertemuan
          </span>
          <span className="flex items-center gap-1">
            <Icon icon="solar:users-group-rounded-linear" className="text-primary-500" />
            Max {course.quota}
          </span>
        </div>

        {/* Instructor */}
        <div className="flex items-center gap-2 mb-4 pt-3 border-t border-slate-100">
          <div className="w-7 h-7 bg-primary-100 rounded-full flex items-center justify-center">
            <Icon icon="solar:user-linear" className="text-primary-600 text-xs" />
          </div>
          <span className="text-xs text-slate-600 truncate">{course.instructor.split(',')[0]}</span>
        </div>

        {/* CTA */}
        <Link 
          href={`https://wa.me/?text=Saya%20tertarik%20dengan%20kursus%20${encodeURIComponent(course.title)}`}
          target="_blank"
          className="flex items-center justify-center gap-2 w-full bg-secondary-50 text-secondary-700 py-2.5 rounded-xl text-sm font-semibold hover:bg-secondary-900 hover:text-white transition-all"
        >
          <Icon icon="tabler:brand-whatsapp" className="text-base" />
          <span>Daftar via WhatsApp</span>
        </Link>
      </div>
    </motion.div>
  );
};

export default CourseCard;
