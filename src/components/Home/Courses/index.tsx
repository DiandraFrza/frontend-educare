"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CourseCard, PackageCard, CategoryFilter } from './components';
import { 
  allCourses, 
  allPackages, 
  courseCategories,
  getCoursesByCategory,
  getPopularCourses 
} from '@/data/courses';

const Courses: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredCourses = activeCategory === 'all' 
    ? allCourses 
    : getCoursesByCategory(activeCategory);

  const popularCourses = getPopularCourses();

  return (
    <section id="courses" className="py-24 bg-slate-50 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #1E3A5F 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-8"
        >
          <span className="inline-block px-4 py-1.5 bg-white text-primary-600 text-sm font-semibold rounded-full shadow-soft mb-4 border border-slate-100">
            Program Pelatihan
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-secondary-900 mb-4">
            Pilih Kelas Sesuai Kebutuhanmu
          </h2>
          <p className="text-slate-600 text-lg">
            Berbagai program pelatihan dari level pemula hingga mahir, 
            dengan harga yang terjangkau dan fasilitas lengkap.
          </p>
        </motion.div>

        {/* Category Filter */}
        <CategoryFilter 
          categories={courseCategories.filter(c => c.id !== 'bundling')}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6 mb-12"
        >
          <div className="text-center px-6 py-3 bg-white rounded-xl shadow-soft">
            <p className="text-2xl font-bold text-primary-600">{allCourses.length}+</p>
            <p className="text-sm text-slate-500">Kelas Tersedia</p>
          </div>
          <div className="text-center px-6 py-3 bg-white rounded-xl shadow-soft">
            <p className="text-2xl font-bold text-primary-600">Mulai 10K</p>
            <p className="text-sm text-slate-500">Harga Terjangkau</p>
          </div>
          <div className="text-center px-6 py-3 bg-white rounded-xl shadow-soft">
            <p className="text-2xl font-bold text-primary-600">500+</p>
            <p className="text-sm text-slate-500">Alumni</p>
          </div>
        </motion.div>

        {/* Popular Courses */}
        {activeCategory === 'all' && (
          <div className="mb-16">
            <h3 className="font-display text-xl font-bold text-secondary-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                <span className="text-amber-500 text-sm">★</span>
              </span>
              Kelas Populer
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularCourses.slice(0, 3).map((course, index) => (
                <CourseCard key={course.id} course={course} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* All Courses */}
        <div>
          <h3 className="font-display text-xl font-bold text-secondary-900 mb-6">
            {activeCategory === 'all' ? 'Semua Kelas' : `Kelas ${courseCategories.find(c => c.id === activeCategory)?.name}`}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
        </div>

        {/* Packages */}
        <div className="mt-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <span className="inline-block px-4 py-1.5 bg-white text-red-500 text-sm font-semibold rounded-full shadow-soft mb-4 border border-slate-100">
              Paket Hemat
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-secondary-900 mb-4">
              Bundling Package
            </h2>
            <p className="text-slate-600 text-lg">
              Pilih paket bundling untuk hemat lebih banyak! 
              Kombinasi kelas yang saling melengkapi.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allPackages.map((pkg, index) => (
              <PackageCard key={pkg.id} package={pkg} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Courses;
