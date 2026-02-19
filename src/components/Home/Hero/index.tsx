"use client";

import Image from 'next/image';
import { Icon } from "@iconify/react/dist/iconify.js";
import { getImagePrefix } from '@/utils/util';
import { motion } from 'framer-motion';
import { allCourses } from '@/data/courses';

const Hero = () => {
  const stats = [
    { value: `${allCourses.length}+`, label: "Kelas Tersedia" },
    { value: "10K", label: "Mulai Harga" },
    { value: "500+", label: "Alumni" },
    { value: "4.9", label: "Rating" },
  ];

  const features = [
    "Relasi & Networking",
    "E-Book & E-Modul", 
    "Konsultasi Tutor",
    "Sertifikat Resmi"
  ];

  return (
    <section id="home-section" className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-100/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-100/20 rounded-full blur-3xl" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary-200/20 rounded-full blur-3xl" />
      
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 pt-24 pb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-8rem)]">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-soft w-fit border border-primary-100"
            >
              <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="text-sm font-medium text-secondary-700">
                {allCourses.length}+ Kelas Tersedia • Mulai 10K
              </span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-900 leading-tight">
              Pilih Kelas{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-500">
                Impianmu
              </span>
              <br />Mulai dari 10K
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
              <strong>Akuntansi, Accurate, Excel, Pajak, UMKM</strong> — semua ada! 
              Belajar dari <span className="text-secondary-700 font-semibold">M. Aziz Andriansyah, S.Pd., CAAT.</span>{" "}
              dengan harga terjangkau dan jadwal fleksibel.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 py-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-center"
                >
                  <p className="text-xl sm:text-2xl font-bold text-primary-600">{stat.value}</p>
                  <p className="text-xs text-slate-500">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <motion.a
                href="#courses"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all"
              >
                <span>Lihat Semua Kelas</span>
                <Icon icon="solar:arrow-right-linear" className="text-xl" />
              </motion.a>
              <motion.a
                href="https://instagram.com/academy_excellencee"
                target="_blank"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 bg-white text-slate-700 px-8 py-4 rounded-2xl font-semibold shadow-soft border border-slate-200 hover:border-primary-200 hover:shadow-soft-lg transition-all"
              >
                <Icon icon="tabler:brand-instagram" className="text-xl text-pink-500" />
                <span>Konsultasi Gratis</span>
              </motion.a>
            </div>

            {/* Mini Features */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-200">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-slate-600">
                  <Icon icon="solar:check-circle-bold" className="text-success text-lg" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Featured Cards */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main Card */}
              <div className="bg-white rounded-3xl shadow-soft-xl p-6 border border-slate-100">
                <h3 className="font-display font-bold text-lg text-secondary-900 mb-4">
                  Kelas Terpopuler
                </h3>
                
                <div className="space-y-3">
                  {[
                    { name: 'Praktikum Akuntansi SAK EMKM', price: '150K', students: '45' },
                    { name: 'Accurate 5 Dasar', price: '25K', students: '120' },
                    { name: 'Excel untuk Akuntansi', price: '35K', students: '100' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                      <div>
                        <p className="font-medium text-secondary-900 text-sm">{item.name}</p>
                        <p className="text-xs text-slate-500">{item.students} siswa</p>
                      </div>
                      <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-lg text-sm font-bold">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100">
                  <a 
                    href="#courses"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-secondary-50 text-secondary-700 rounded-xl font-semibold hover:bg-secondary-900 hover:text-white transition-all"
                  >
                    <span>Lihat Semua</span>
                    <Icon icon="solar:arrow-right-linear" />
                  </a>
                </div>
              </div>

              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 bg-white p-4 rounded-2xl shadow-soft-xl border border-slate-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center">
                    <Icon icon="solar:graduation-cap-linear" className="text-2xl text-primary-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-secondary-900">{allCourses.length}+</p>
                    <p className="text-sm text-slate-500">Kelas Tersedia</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
