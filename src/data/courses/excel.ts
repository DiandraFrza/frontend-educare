import { Course } from '@/types/course';

export const excelCourses: Course[] = [
  {
    id: 'excel-001',
    title: 'Microsoft Excel Dasar',
    description: 'Pelatihan Excel dasar untuk pemula yang ingin menguasai spreadsheet',
    fullDescription: 'Pelajari dasar-dasar Microsoft Excel mulai dari pengenalan interface, formula dasar, formatting, hingga pembuatan grafik sederhana. Cocok untuk pemula.',
    price: 10000,
    originalPrice: 25000,
    sessions: 4,
    quota: 30,
    schedule: 'Flexible',
    time: '19.00 - Selesai',
    level: 'pemula',
    category: 'excel',
    instructor: 'M. Aziz Andriansyah, S.Pd., CAAT., CAP., CTT',
    rating: 4.8,
    students: 200,
    image: '/images/courses/courseone.png',
    benefits: [
      'Interface Excel',
      'Formula Dasar (SUM, AVERAGE)',
      'Formatting & Styling',
      'Pembuatan Grafik'
    ],
    includes: [
      'Video Tutorial',
      'File Latihan',
      'Grup WhatsApp'
    ],
    isPopular: true
  },
  {
    id: 'excel-002',
    title: 'Microsoft Excel Menengah',
    description: 'Pelatihan Excel level menengah dengan formula advanced dan analisis data',
    fullDescription: 'Mendalami Excel dengan formula advanced seperti VLOOKUP, IF nested, PivotTable, dan analisis data untuk keperluan akuntansi dan bisnis.',
    price: 25000,
    originalPrice: 40000,
    sessions: 6,
    quota: 25,
    schedule: 'Flexible',
    time: '19.00 - Selesai',
    level: 'menengah',
    category: 'excel',
    instructor: 'M. Aziz Andriansyah, S.Pd., CAAT., CAP., CTT',
    rating: 4.7,
    students: 150,
    image: '/images/courses/coursetwo.png',
    benefits: [
      'Formula Advanced (VLOOKUP, INDEX, MATCH)',
      'PivotTable & PivotChart',
      'Data Validation',
      'Conditional Formatting'
    ],
    includes: [
      'Video Tutorial',
      'Template Excel',
      'Studi Kasus'
    ]
  },
  {
    id: 'excel-003',
    title: 'Microsoft Excel untuk Akuntansi',
    description: 'Penerapan Excel khusus untuk pekerjaan akuntansi dan keuangan',
    fullDescription: 'Pelajari penggunaan Excel spesifik untuk akuntansi: pembuatan buku besar, neraca saldo, laporan keuangan, depreciation, dan amortisasi.',
    price: 35000,
    originalPrice: 50000,
    sessions: 8,
    quota: 20,
    schedule: 'Flexible',
    time: '19.00 - Selesai',
    level: 'menengah',
    category: 'excel',
    instructor: 'M. Aziz Andriansyah, S.Pd., CAAT., CAP., CTT',
    rating: 4.9,
    students: 100,
    image: '/images/courses/coursethree.png',
    benefits: [
      'Template Akuntansi Excel',
      'Buku Besar Digital',
      'Laporan Keuangan Otomatis',
      'Depreciation Calculator'
    ],
    includes: [
      'Video Tutorial',
      'Template Akuntansi',
      'File Latihan'
    ],
    isPopular: true
  },
  {
    id: 'excel-004',
    title: 'Sertifikasi Microsoft Excel',
    description: 'Pelatihan & Uji Sertifikasi Microsoft Excel resmi',
    fullDescription: 'Program persiapan ujian sertifikasi Microsoft Excel. Mendapatkan sertifikat resmi setelah lulus ujian yang diadakan oleh lembaga terakreditasi.',
    price: 10000,
    originalPrice: 20000,
    sessions: 6,
    quota: 25,
    schedule: 'Minggu',
    time: '09.00 - 15.00',
    level: 'menengah',
    category: 'excel',
    instructor: 'M. Aziz Andriansyah, S.Pd., CAAT., CAP., CTT',
    rating: 4.8,
    students: 80,
    image: '/images/courses/courseone.png',
    benefits: [
      'Persiapan Ujian',
      'Simulasi Test',
      'Sertifikat Resmi',
      'CV Boost'
    ],
    includes: [
      'Materi Ujian',
      'Latihan Soal',
      'Ujian Sertifikasi'
    ]
  }
];
