"use client"
import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getImagePrefix } from "@/utils/util";
import { motion } from 'framer-motion';
import { allCourses } from "@/data/courses";

const Mentor = () => {
  const certifications = [
    { code: "CAAT", full: "Certified Accounting & Tax Trainer", desc: "Sertifikasi trainer akuntansi & pajak" },
    { code: "CAP", full: "Certified Accurate Professional", desc: "Sertifikasi professional Accurate" },
    { code: "CTT", full: "Certified Tax Trainer", desc: "Sertifikasi trainer perpajakan" },
  ];

  const expertise = [
    { icon: "solar:calculator-linear", title: "Akuntansi", desc: "SAK EMKM & Standar Akuntansi" },
    { icon: "solar:monitor-linear", title: "Accurate", desc: "Software Akuntansi" },
    { icon: "solar:document-text-linear", title: "Laporan Keuangan", desc: "Pembuatan & Analisis" },
    { icon: "solar:wallet-linear", title: "Perpajakan", desc: "Dasar-dasar Pajak" },
    { icon: "solar:chart-linear", title: "Excel", desc: "Spreadsheet Profesional" },
    { icon: "solar:shop-linear", title: "UMKM", desc: "Akuntansi Bisnis Kecil" },
  ];

  return (
    <section id="mentor" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-50/50 to-transparent" />
      
      <div className='container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 relative z-10'>
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-white text-primary-600 text-sm font-semibold rounded-full shadow-soft mb-4 border border-slate-100">
            Mentor Kami
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-secondary-900 mb-4">
            Belajar dari Praktisi Berpengalaman
          </h2>
          <p className="text-slate-600 text-lg">
            Semua kelas dibimbing oleh trainer profesional dengan pengalaman 
            lebih dari 10 tahun di bidang akuntansi dan perpajakan.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Profile Image & Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative bg-gradient-to-br from-primary-100 to-secondary-100 rounded-3xl p-2">
                <div className="bg-white rounded-2xl overflow-hidden aspect-[4/5] relative">
                  <Image 
                    src={`${getImagePrefix()}images/mentor/user3.png`}
                    alt="M. Aziz Andriansyah - Trainer Educare Academy"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              
              {/* Floating Stats Cards */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-soft-xl border border-slate-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                    <Icon icon="solar:book-open-linear" className="text-2xl text-primary-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-secondary-900">{allCourses.length}+</p>
                    <p className="text-sm text-slate-500">Kelas Dibuat</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute -top-6 -left-6 bg-white p-4 rounded-2xl shadow-soft-xl border border-slate-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                    <Icon icon="solar:users-group-rounded-linear" className="text-2xl text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-secondary-900">500+</p>
                    <p className="text-sm text-slate-500">Alumni</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Info */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Name & Title */}
            <div>
              <h3 className="font-display text-3xl sm:text-4xl font-bold text-secondary-900 mb-2">
                M. Aziz Andriansyah, S.Pd.
              </h3>
              <p className="text-lg text-primary-600 font-medium">
                Founder & Lead Trainer Educare Academy
              </p>
            </div>

            {/* Bio */}
            <p className="text-slate-600 leading-relaxed">
              Praktisi akuntansi dan perpajakan dengan pengalaman lebih dari 10 tahun. 
              Telah membantu ratusan siswa dan profesional menguasai akuntansi dari dasar 
              hingga mahir. Memiliki passion dalam mengajar dan berbagi ilmu praktis 
              yang bisa langsung diterapkan.
            </p>

            {/* Certifications */}
            <div className="space-y-3">
              <h4 className="font-semibold text-secondary-900">Sertifikasi:</h4>
              <div className="flex flex-wrap gap-3">
                {certifications.map((cert, index) => (
                  <div 
                    key={index}
                    className="group relative"
                  >
                    <span className="inline-flex flex-col items-center bg-white px-4 py-3 rounded-xl font-semibold text-sm border border-slate-100 shadow-soft hover:shadow-soft-lg transition-all cursor-help min-w-[100px]">
                      <span className="text-primary-600 text-lg">{cert.code}</span>
                      <span className="text-xs text-slate-500 font-normal text-center leading-tight mt-1">
                        {cert.full}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Expertise */}
            <div>
              <h4 className="font-semibold text-secondary-900 mb-3">Keahlian:</h4>
              <div className="grid grid-cols-2 gap-3">
                {expertise.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-xl shadow-soft">
                    <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon icon={item.icon} className="text-primary-600" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-secondary-900 text-sm">{item.title}</h5>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4 flex flex-wrap gap-4">
              <a 
                href="https://instagram.com/academy_excellencee"
                target="_blank"
                className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
              >
                <Icon icon="tabler:brand-instagram" className="text-xl" />
                <span>Follow Instagram</span>
              </a>
              <a 
                href="#courses"
                className="inline-flex items-center gap-2 text-secondary-700 font-semibold hover:text-primary-600 transition-colors px-6 py-3"
              >
                <span>Lihat Kelas</span>
                <Icon icon="solar:arrow-right-linear" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: "10+", label: "Tahun Pengalaman" },
            { value: `${allCourses.length}+`, label: "Kelas Dibuat" },
            { value: "500+", label: "Alumni Terbantu" },
            { value: "50+", label: "Batch Kelas" },
          ].map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 bg-white rounded-2xl shadow-soft hover:shadow-soft-lg transition-all"
            >
              <p className="font-display text-3xl sm:text-4xl font-bold text-primary-600 mb-1">
                {stat.value}
              </p>
              <p className="text-slate-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Mentor;
