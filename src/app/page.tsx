/** @format */

import React from "react";
import Hero from "@/components/Home/Hero";
import About from "@/components/Home/About";
import Courses from "@/components/Home/Courses";
import Mentor from "@/components/Home/Mentor";
import Testimonial from "@/components/Home/Testimonials";
import CTA from "@/components/Home/CTA";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Educare Academy - 20+ Kelas Akuntansi, Excel, Accurate & Pajak",
  description: "Pilih dari 20+ kelas: Akuntansi SAK EMKM, Accurate 5, Microsoft Excel, Pajak, UMKM. Harga mulai 10K. Belajar dari M. Aziz Andriansyah, S.Pd., CAAT.",
  keywords: "kursus akuntansi, pelatihan accurate, kursus excel, pajak umkm, sak emkm, educare academy, Jakarta",
  openGraph: {
    title: "Educare Academy - 20+ Kelas Mulai dari 10K",
    description: "Akuntansi, Excel, Accurate, Pajak. Pilih kelas sesuai kebutuhanmu!",
    type: "website",
  },
};

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <About />
      <Courses />
      <Mentor />
      <Testimonial />
      <CTA />
    </main>
  );
}
