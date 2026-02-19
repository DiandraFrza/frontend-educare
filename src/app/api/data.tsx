// Legacy exports - maintained for backward compatibility
// New code should import from '@/data/courses' instead

export {
  // Re-export all courses and packages from new structure
  allCourses as courseData,
  allPackages as bundlingPackages,
  courseCategories,
  getCoursesByCategory,
  getPopularCourses,
  getNewCourses,
  getCourseById,
  formatPrice,
  getLevelLabel,
  getLevelColor,
} from '@/data/courses';

// Legacy mentor data
export const MentorData = [
  {
    profession: 'Certified Accounting & Tax Trainer (CAAT, CAP, CTT)',
    name: 'M. Aziz Andriansyah, S.Pd.',
    imgSrc: '/images/mentor/user3.png',
  },
  {
    profession: 'Praktisi Akuntansi & Pengajar Profesional',
    name: 'M. Aziz Andriansyah, S.Pd.',
    imgSrc: '/images/mentor/user2.png',
  },
  {
    profession: 'Spesialis SAK EMKM & Accurate',
    name: 'M. Aziz Andriansyah, S.Pd.',
    imgSrc: '/images/mentor/user1.png',
  },
  {
    profession: 'Trainer Siap Berkarier Sebagai Akuntan',
    name: 'M. Aziz Andriansyah, S.Pd.',
    imgSrc: '/images/mentor/user3.png',
  },
];

// Legacy testimonial data
export const TestimonialData = [
  {
    name: "Ahmad Wijaya",
    profession: 'Peserta Kelas Praktikum Akuntansi',
    comment: 'Kelasnya sangat praktis! Dari nol sampai bisa membuat laporan keuangan sesuai SAK EMKM. Trainernya sabar dan mudah dipahami.',
    imgSrc: '/images/testimonial/user.svg',
    rating: 5
  },
  {
    name: "Siti Rahmawati",
    profession: 'Fresh Graduate Akuntansi',
    comment: 'Setelah ikut kelas di Educare, saya jadi lebih siap menghadapi dunia kerja. Materinya relevan dengan kebutuhan industri.',
    imgSrc: '/images/mentor/user2.png',
    rating: 5
  },
  {
    name: "Budi Santoso",
    profession: 'Owner UMKM',
    comment: 'Belajar Accurate dengan harga terjangkau (cuma 150K!) tapi manfaatnya luar biasa. Pembukuan usaha saya jadi rapi.',
    imgSrc: '/images/mentor/user3.png',
    rating: 5
  },
  {
    name: "Dewi Kusuma",
    profession: 'Mahasiswa Akuntansi',
    comment: 'Benefitnya banyak! Dapat e-book, e-modul, sertifikat, dan konsultasi dengan tutor. Limited 10 peserta jadi lebih fokus.',
    imgSrc: '/images/mentor/user1.png',
    rating: 5
  },
  {
    name: "Rini Susanti",
    profession: 'Karyawan Bagian Keuangan',
    comment: 'Pembelajarannya fleksibel via Zoom dan video pembelajaran. Bisa tanya-tanya di grup WhatsApp juga. Sangat recommended!',
    imgSrc: '/images/mentor/user2.png',
    rating: 5
  },
  {
    name: "Hendra Gunawan",
    profession: 'Peserta Kelas Accurate',
    comment: 'Sekarang saya sudah mahir menggunakan software Accurate untuk mengelola keuangan. Terima kasih Pak Aziz dan Educare!',
    imgSrc: '/images/mentor/user3.png',
    rating: 5
  },
];

// Legacy companies data
export const TruestedCompanies = [
  { imgSrc: "/images/companies/accurate.svg" },
  { imgSrc: "/images/companies/ojk.svg" },
  { imgSrc: "/images/companies/umk.svg" },
  { imgSrc: "/images/companies/smk.svg" },
  { imgSrc: "/images/companies/airbnb.svg" },
  { imgSrc: "/images/companies/fedex.svg" },
  { imgSrc: "/images/companies/google.svg" },
  { imgSrc: "/images/companies/hubspot.svg" }
];

// Legacy stats data
export const StatsData = [
  { value: "20+", label: "Kelas Tersedia" },
  { value: "10K", label: "Mulai Harga" },
  { value: "500+", label: "Alumni" },
  { value: "98%", label: "Kepuasan" }
];

// Legacy services data
export const ServicesData = [
  {
    icon: "solar:notebook-bookmark-outline",
    title: "Kursus Online",
    description: "Praktikum akuntansi sesuai SAK EMKM dengan limited 10 peserta per kelas, via Zoom dan video pembelajaran."
  },
  {
    icon: "solar:buildings-outline",
    title: "Pelatihan Corporate",
    description: "Program in-house training untuk perusahaan yang ingin meningkatkan kompetensi tim keuangan."
  },
  {
    icon: "solar:chart-2-outline",
    title: "Jasa Laporan Keuangan",
    description: "Layanan pembuatan laporan keuangan profesional untuk UMKM dan perusahaan."
  },
  {
    icon: "solar:users-group-rounded-linear",
    title: "Persiapan Karier Akuntan",
    description: "Program siap berkarier sebagai akuntan dengan sertifikasi dan relasi industri."
  }
];
