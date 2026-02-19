import { Course } from '@/types/course';

export const accurateCourses: Course[] = [
  {
    id: 'accurate-001',
    title: 'Accurate 5 Dasar',
    description: 'Pelatihan software Accurate 5 level dasar untuk pemula',
    fullDescription: 'Pelajari dasar-dasar penggunaan Accurate 5, mulai dari setup perusahaan, input data master, pencatatan transaksi harian, hingga generate laporan keuangan sederhana.',
    price: 25000,
    originalPrice: 50000,
    sessions: 4,
    quota: 25,
    schedule: 'Flexible',
    time: '19.00 - Selesai',
    level: 'pemula',
    category: 'accurate',
    instructor: 'M. Aziz Andriansyah, S.Pd., CAAT., CAP., CTT',
    rating: 4.8,
    students: 120,
    image: '/images/courses/coursethree.png',
    benefits: [
      'Mengenal Interface Accurate 5',
      'Setup Perusahaan Baru',
      'Input Data Master',
      'Pencatatan Transaksi Dasar'
    ],
    includes: [
      'Video Tutorial',
      'Modul PDF',
      'Grup Diskusi'
    ],
    isPopular: true
  },
  {
    id: 'accurate-002',
    title: 'Accurate 5 Menengah',
    description: 'Pelatihan Accurate 5 level menengah dengan fitur lengkap',
    fullDescription: 'Mendalami fitur Accurate 5 untuk manajemen persediaan, multi-cabang, project costing, dan laporan keuangan yang lebih kompleks.',
    price: 35000,
    originalPrice: 60000,
    sessions: 6,
    quota: 20,
    schedule: 'Flexible',
    time: '19.00 - Selesai',
    level: 'menengah',
    category: 'accurate',
    instructor: 'M. Aziz Andriansyah, S.Pd., CAAT., CAP., CTT',
    rating: 4.7,
    students: 85,
    image: '/images/courses/courseone.png',
    benefits: [
      'Manajemen Persediaan',
      'Multi-Cabang',
      'Project Costing',
      'Laporan Keuangan Lengkap'
    ],
    includes: [
      'Video Tutorial',
      'Studi Kasus',
      'Grup Diskusi'
    ]
  },
  {
    id: 'accurate-003',
    title: 'Accurate 5 Mahir',
    description: 'Pelatihan Accurate 5 level mahir untuk pengguna advanced',
    fullDescription: 'Kuasai fitur advanced Accurate 5 termasuk customisasi laporan, integrasi dengan aplikasi lain, database management, dan troubleshooting.',
    price: 50000,
    originalPrice: 80000,
    sessions: 8,
    quota: 15,
    schedule: 'Flexible',
    time: '19.00 - Selesai',
    level: 'mahir',
    category: 'accurate',
    instructor: 'M. Aziz Andriansyah, S.Pd., CAAT., CAP., CTT',
    rating: 4.9,
    students: 45,
    image: '/images/courses/coursetwo.png',
    benefits: [
      'Customisasi Laporan',
      'Integrasi Sistem',
      'Database Management',
      'Troubleshooting'
    ],
    includes: [
      'Video Advanced',
      'File Latihan',
      'Mentoring'
    ]
  },
  {
    id: 'accurate-004',
    title: 'Certified Accurate Professional (CAP)',
    description: 'Program persiapan ujian sertifikasi Accurate Professional',
    fullDescription: 'Program intensif untuk persiapan ujian sertifikasi Certified Accurate Professional. Cover semua materi ujian dengan praktik intensif dan tips lulus.',
    price: 100000,
    originalPrice: 150000,
    sessions: 12,
    quota: 10,
    schedule: 'Sabtu & Minggu',
    time: '09.00 - 12.00',
    level: 'mahir',
    category: 'accurate',
    instructor: 'M. Aziz Andriansyah, S.Pd., CAAT., CAP., CTT',
    rating: 4.9,
    students: 30,
    image: '/images/courses/coursethree.png',
    benefits: [
      'Materi Ujian Lengkap',
      'Simulasi Ujian',
      'Tips & Trik Lulus',
      'Sertifikasi Resmi'
    ],
    includes: [
      'Materi CAP',
      'Soal Latihan',
      'Simulasi Ujian'
    ],
    isPopular: true
  }
];
