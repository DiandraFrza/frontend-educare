"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from 'framer-motion';
import { allCourses, allPackages } from '@/data/courses';

const CTA = () => {
  const totalSavings = allPackages.reduce((acc, pkg) => acc + pkg.savings, 0);

  return (
    <section className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-200/20 dark:bg-primary-900/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-200/20 dark:bg-secondary-900/20 rounded-full blur-3xl" />
      
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {/* Main CTA Card */}
          <div className="bg-gradient-to-br from-secondary-900 to-secondary-800 rounded-3xl p-8 sm:p-12 text-white text-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '32px 32px'
            }} />
            
            {/* Content */}
            <div className="relative z-10">
              {/* Badge */}
              <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm text-white/90 text-sm font-semibold rounded-full mb-6 border border-white/20">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  {allCourses.length}+ Kelas Tersedia
                </span>
              </span>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Siap Mulai Belajar{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-accent-300">
                  Hari Ini?
                </span>
              </h2>

              <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                Pilih dari <strong>{allCourses.length}+ kelas</strong> mulai dari 10K saja! 
                Atau ambil <strong>bundling package</strong> untuk hemat hingga {allPackages.length}0%.
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Icon icon="solar:check-circle-bold" className="text-success" />
                  <span className="text-sm">{allCourses.length}+ Kelas</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Icon icon="solar:check-circle-bold" className="text-success" />
                  <span className="text-sm">Mulai 10K</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Icon icon="solar:check-circle-bold" className="text-success" />
                  <span className="text-sm">{allPackages.length} Paket Hemat</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Icon icon="solar:check-circle-bold" className="text-success" />
                  <span className="text-sm">Sertifikat</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href="#courses"
                  className="inline-flex items-center gap-2 bg-white text-secondary-900 px-8 py-4 rounded-2xl font-bold hover:bg-primary-50 transition-all shadow-lg hover:shadow-xl"
                >
                  <span>Lihat Semua Kelas</span>
                  <Icon icon="solar:arrow-right-linear" className="text-xl" />
                </a>
                <a 
                  href={`https://wa.me/?text=Halo%20Educare%2C%20saya%20tertarik%20dengan%20kelasnya`}
                  target="_blank"
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all border border-white/20"
                >
                  <Icon icon="tabler:brand-whatsapp" className="text-xl" />
                  <span>Konsultasi Gratis</span>
                </a>
              </div>

              {/* Contact */}
              <p className="text-slate-400 text-sm mt-8">
                Atau DM kami di{" "}
                <a 
                  href="https://instagram.com/academy_excellencee"
                  target="_blank"
                  className="text-primary-300 hover:text-white transition-colors font-medium"
                >
                  Instagram @academy_excellencee
                </a>
              </p>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "solar:shield-check-linear", text: "Garansi Belajar" },
              { icon: "solar:clock-circle-linear", text: "Akses Lifetime" },
              { icon: "solar:certificate-linear", text: "Sertifikat Resmi" },
              { icon: "solar:users-group-rounded-linear", text: "Komunitas Alumni" },
            ].map((badge, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-soft dark:shadow-slate-900/50 border border-slate-100 dark:border-slate-700"
              >
                <Icon icon={badge.icon} className="text-2xl text-primary-500 dark:text-primary-400 flex-shrink-0" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{badge.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
