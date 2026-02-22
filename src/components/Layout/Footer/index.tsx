/** @format */

"use client";

import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { allCourses, allPackages } from "@/data/courses";

const Footer = () => {
  const menuLinks = [
    { label: "Beranda", href: "/" },
    { label: "Benefit", href: "#about" },
    { label: "Kelas", href: "#courses" },
    { label: "Mentor", href: "#mentor" },
    { label: "Testimoni", href: "#testimonial" },
  ];

  const programLinks = [
    { label: "Akuntansi SAK EMKM", href: "#courses" },
    { label: "Accurate 5 (Dasar-Menengah-Mahir)", href: "#courses" },
    { label: "Microsoft Excel", href: "#courses" },
    { label: "Dasar-Dasar Pajak", href: "#courses" },
    { label: "Akuntansi UMKM", href: "#courses" },
    { label: "Paket Bundling Hemat", href: "#courses" },
  ];

  const contactInfo = [
    { icon: "tabler:map-pin", text: "Jakarta" },
    { icon: "tabler:clock", text: "Jadwal Fleksibel" },
    { icon: "tabler:users", text: `${allCourses.length}+ Kelas Tersedia` },
    { icon: "tabler:gift", text: `${allPackages.length} Paket Bundling` },
  ];

  return (
    <footer className="bg-secondary-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              {/* Logo for dark background */}
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-500 rounded-xl transform rotate-3" />
                <div className="absolute inset-0 bg-white rounded-xl flex items-center justify-center">
                  <span className="text-primary-600 font-bold text-sm tracking-wider">EDU</span>
                </div>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-display font-bold text-lg text-white">Educare</span>
                <span className="text-xs text-slate-400">Academy</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">Platform pelatihan akuntansi dengan {allCourses.length}+ kelas pilihan mulai dari 10K. Belajar dari praktisi berpengalaman dengan harga terjangkau.</p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a href="https://instagram.com/academy_excellencee" target="_blank" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-primary-500 transition-colors">
                <Icon icon="tabler:brand-instagram" className="text-xl" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-primary-500 transition-colors">
                <Icon icon="tabler:brand-whatsapp" className="text-xl" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-primary-500 transition-colors">
                <Icon icon="tabler:brand-youtube" className="text-xl" />
              </a>
            </div>
          </div>

          {/* Menu Links */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6">Menu</h4>
            <ul className="space-y-3">
              {menuLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-slate-400 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Program Links */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6">Program ({allCourses.length}+)</h4>
            <ul className="space-y-3">
              {programLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-slate-400 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6">Info</h4>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Icon icon={info.icon} className="text-primary-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-400 text-sm">{info.text}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a href={`https://wa.me/6288210372698?text=Halo%20Educare%2C%20saya%20mau%20tanya%20tentang%20kelas`} target="_blank" className="inline-flex items-center gap-2 bg-primary-600 text-white px-5 py-3 rounded-xl font-semibold text-sm mt-6 hover:bg-primary-500 transition-colors">
              <Icon icon="tabler:brand-whatsapp" />
              <span>Tanya via WA</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm text-center md:text-left">© 2025 Educare Academy. {allCourses.length}+ kelas mulai 10K.</p>
          <div className="flex items-center gap-6">
            <Link href="/kebijakan-privasi" className="text-slate-500 hover:text-white text-sm transition-colors">
              Kebijakan Privasi
            </Link>
            <Link href="/syarat-ketentuan" className="text-slate-500 hover:text-white text-sm transition-colors">
              Syarat & Ketentuan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
