import { Course } from '@/types/course';

export const umkmCourses: Course[] = [
  {
    id: 'umkm-001',
    title: 'Akuntansi untuk UMKM',
    description: 'Panduan praktis pembukuan dan laporan keuangan untuk pelaku UMKM',
    fullDescription: 'Pelajari cara menyusun pembukuan sederhana untuk UMKM, menghitung modal, laba rugi, dan membuat laporan keuangan yang mudah dipahami.',
    price: 15000,
    originalPrice: 30000,
    sessions: 5,
    quota: 25,
    schedule: 'Flexible',
    time: '19.00 - Selesai',
    level: 'pemula',
    category: 'umkm',
    instructor: 'M. Aziz Andriansyah, S.Pd., CAAT., CAP., CTT',
    rating: 4.9,
    students: 150,
    image: '/images/courses/coursethree.png',
    benefits: [
      'Pembukuan Sederhana',
      'Hitung Modal & Laba',
      'Laporan Keuangan UMKM',
      'Tips Kelola Keuangan'
    ],
    includes: [
      'Video Tutorial',
      'Template Excel',
      'Grup Konsultasi'
    ],
    isPopular: true
  },
  {
    id: 'umkm-002',
    title: 'Digital Marketing untuk UMKM',
    description: 'Strategi pemasaran digital untuk mengembangkan bisnis UMKM',
    fullDescription: 'Pelajari strategi pemasaran digital: social media marketing, content strategy, SEO dasar, dan online advertising untuk mengembangkan usaha.',
    price: 35000,
    originalPrice: 50000,
    sessions: 6,
    quota: 20,
    schedule: 'Sabtu',
    time: '14.00 - 17.00',
    level: 'pemula',
    category: 'umkm',
    instructor: 'M. Aziz Andriansyah, S.Pd., CAAT., CAP., CTT',
    rating: 4.7,
    students: 80,
    image: '/images/courses/courseone.png',
    benefits: [
      'Social Media Strategy',
      'Content Planning',
      'SEO Dasar',
      'Online Advertising'
    ],
    includes: [
      'Video Tutorial',
      'Template Content',
      'Checklist Marketing'
    ],
    isNew: true
  }
];
