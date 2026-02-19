/** @format */

"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";

const About = () => {
  const benefits = [
    {
      icon: "solar:wallet-money-linear",
      title: "Harga Terjangkau",
      description: "Kelas mulai dari 10K saja! Dari yang paling dasar sampai profesional, semua ada pilihannya.",
      highlight: "Mulai 10K",
    },
    {
      icon: "solar:folder-open-linear",
      title: "20+ Kelas Pilihan",
      description: "Pilih dari berbagai kategori: Akuntansi, Accurate, Excel, Pajak, hingga UMKM.",
      highlight: "20+ Kelas",
    },
    {
      icon: "solar:users-group-rounded-linear",
      title: "Relasi & Networking",
      description: "Bangun koneksi dengan sesama peserta dan alumni yang tersebar di berbagai perusahaan.",
      highlight: "Networking",
    },
    {
      icon: "solar:chat-dots-linear",
      title: "Konsultasi dengan Tutor",
      description: "Grup WhatsApp aktif untuk diskusi dan tanya jawab langsung dengan tutor berpengalaman.",
      highlight: "Lifetime",
    },
    {
      icon: "solar:notebook-bookmark-linear",
      title: "E-Book & E-Modul",
      description: "Materi pembelajaran eksklusif brand Educare yang bisa diakses kapan saja.",
      highlight: "Eksklusif",
    },
    {
      icon: "solar:medal-ribbon-linear",
      title: "Sertifikat Fisik",
      description: "Sertifikat penyelesaian program yang bisa digunakan untuk melamar kerja.",
      highlight: "Resmi",
    },
  ];

  const categories = [
    { icon: "solar:calculator-linear", name: "Akuntansi", count: "6 Kelas", color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" },
    { icon: "solar:monitor-linear", name: "Accurate", count: "4 Kelas", color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400" },
    { icon: "solar:document-text-linear", name: "Excel", count: "4 Kelas", color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" },
    { icon: "solar:wallet-linear", name: "Pajak", count: "4 Kelas", color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" },
    { icon: "solar:shop-linear", name: "UMKM", count: "2 Kelas", color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" },
    { icon: "solar:gift-linear", name: "Paket", count: "6 Bundling", color: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="about" className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent" />

      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
        {/* Section Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-semibold rounded-full mb-4">Kenapa Memilih Educare?</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-white mb-4">Belajar Lebih Mudah & Terjangkau</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">Educare Academy menyediakan berbagai pilihan kelas dengan harga yang ramah di kantong, tanpa mengorbankan kualitas.</p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {categories.map((cat, index) => (
            <motion.div key={index} variants={itemVariants} className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl hover:bg-white dark:hover:bg-slate-700 hover:shadow-soft dark:hover:shadow-slate-900/50 transition-all cursor-pointer group">
              <div className={`w-14 h-14 ${cat.color} rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                <Icon icon={cat.icon} className="text-2xl" />
              </div>
              <h3 className="font-semibold text-secondary-900 dark:text-slate-200 text-sm">{cat.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{cat.count}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits Grid */}
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div key={index} variants={itemVariants} className="group p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl hover:bg-white dark:hover:bg-slate-700 hover:shadow-soft-xl dark:hover:shadow-slate-900/50 transition-all duration-300 border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 bg-white dark:bg-slate-700 rounded-2xl shadow-soft flex items-center justify-center group-hover:shadow-soft-lg group-hover:scale-110 transition-all duration-300">
                  <Icon icon={benefit.icon} className="text-2xl text-primary-500 dark:text-primary-400" />
                </div>
                <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full text-xs font-bold">{benefit.highlight}</span>
              </div>
              <h3 className="font-display font-bold text-xl text-secondary-900 dark:text-white mb-2">{benefit.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Media Pembelajaran Banner */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16 bg-gradient-to-r from-secondary-900 to-secondary-800 rounded-3xl p-8 sm:p-12 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold mb-4">Media Pembelajaran Fleksibel</h3>
              <p className="text-slate-300 mb-6">Belajar dengan cara yang paling nyaman bagi kamu. Kami menyediakan berbagai platform pembelajaran yang bisa diakses dari mana saja dan kapan saja.</p>
              <div className="flex flex-wrap gap-3">
                <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                  <Icon icon="solar:play-circle-linear" />
                  Video Pembelajaran
                </span>
                <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                  <Icon icon="solar:monitor-linear" />
                  Live via Zoom
                </span>
                <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                  <Icon icon="tabler:brand-whatsapp" />
                  WhatsApp Group
                </span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: "solar:monitor-linear", name: "Zoom", sub: "Live Class" },
                { icon: "solar:play-circle-linear", name: "Video", sub: "Recorded" },
                { icon: "tabler:brand-whatsapp", name: "WA Group", sub: "Diskusi" },
              ].map((item, i) => (
                <div key={i} className="text-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/20 transition-colors">
                  <Icon icon={item.icon} className="text-3xl mx-auto mb-2 text-primary-300" />
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-slate-400">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
