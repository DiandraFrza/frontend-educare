import { Course } from '@/types/course';

export const pajakCourses: Course[] = [
  {
    id: 'pajak-001',
    title: 'Dasar-Dasar Perpajakan',
    description: 'Pengenalan sistem perpajakan Indonesia untuk pemula',
    fullDescription: 'Pelajari dasar-dasar perpajakan di Indonesia: jenis-jenis pajak, NPWP, kewajiban perpajakan, dan cara menghitung pajak dasar untuk individu dan perusahaan.',
    price: 25000,
    originalPrice: 40000,
    sessions: 4,
    quota: 25,
    schedule: 'Selasa & Jumat',
    time: '19.00 - Selesai',
    level: 'pemula',
    category: 'pajak',
    instructor: 'M. Aziz Andriansyah, S.Pd., CAAT., CAP., CTT',
    rating: 4.8,
    students: 90,
    image: '/images/courses/coursetwo.png',
    benefits: [
      'Mengenal Jenis Pajak',
      'Cara Daftar NPWP',
      'Kewajiban Perpajakan',
      'Perhitungan Dasar'
    ],
    includes: [
      'Video Pembelajaran',
      'Modul Pajak',
      'Grup Diskusi'
    ],
    isPopular: true
  },
  {
    id: 'pajak-002',
    title: 'Pajak untuk UMKM',
    description: 'Panduan perpajakan khusus untuk pelaku usaha mikro dan kecil',
    fullDescription: 'Pelajari kewajiban perpajakan khusus UMKM: PP 23/2018, perhitungan PPh final, pelaporan SPT Tahunan, dan tips penghematan pajak yang legal.',
    price: 35000,
    originalPrice: 50000,
    sessions: 6,
    quota: 20,
    schedule: 'Selasa & Jumat',
    time: '19.00 - Selesai',
    level: 'pemula',
    category: 'pajak',
    instructor: 'M. Aziz Andriansyah, S.Pd., CAAT., CAP., CTT',
    rating: 4.9,
    students: 75,
    image: '/images/courses/coursethree.png',
    benefits: [
      'PP 23/2018',
      'PPh Final UMKM',
      'Pelaporan SPT',
      'Tax Planning UMKM'
    ],
    includes: [
      'Video Tutorial',
      'Template SPT',
      'Konsultasi'
    ]
  },
  {
    id: 'pajak-003',
    title: 'Webinar Perpajakan Terkini',
    description: 'Update regulasi perpajakan terbaru dan implikasinya',
    fullDescription: 'Webinar singkat tentang perubahan regulasi perpajakan terkini, termasuk UU HPP, tarif PPN baru, dan kebijakan pemerintah terbaru.',
    price: 20000,
    sessions: 1,
    quota: 50,
    schedule: 'Sabtu',
    time: '14.00 - 16.00',
    level: 'semua',
    category: 'pajak',
    instructor: 'M. Aziz Andriansyah, S.Pd., CAAT., CAP., CTT',
    rating: 4.7,
    students: 200,
    image: '/images/courses/courseone.png',
    benefits: [
      'Update Regulasi',
      'Q&A Session',
      'Materi Presentasi',
      'Recording'
    ],
    includes: [
      'Live Webinar',
      'Recording',
      'PDF Materi'
    ],
    isNew: true
  },
  {
    id: 'pajak-004',
    title: 'Praktik Lapor SPT Tahunan',
    description: 'Praktik langsung pelaporan SPT Tahunan PPh Orang Pribadi',
    fullDescription: 'Praktik step-by-step pengisian dan pelaporan SPT Tahunan PPh OP menggunakan e-Filing DJP Online. Cocok untuk karyawan dan profesional.',
    price: 30000,
    originalPrice: 45000,
    sessions: 3,
    quota: 20,
    schedule: 'Minggu',
    time: '09.00 - 12.00',
    level: 'pemula',
    category: 'pajak',
    instructor: 'M. Aziz Andriansyah, S.Pd., CAAT., CAP., CTT',
    rating: 4.8,
    students: 60,
    image: '/images/courses/coursetwo.png',
    benefits: [
      'Step-by-Step e-Filing',
      'Formulir 1770/1770S',
      'Bukti Potong',
      'Cara Bayar Pajak'
    ],
    includes: [
      'Video Tutorial',
      'Panduan PDF',
      'Grup Konsultasi'
    ]
  }
];
