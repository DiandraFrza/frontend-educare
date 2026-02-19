import { CoursePackage } from '@/types/course';

export const bundlingPackages: CoursePackage[] = [
  {
    id: 'bundle-001',
    name: 'Paket Hemat Akuntansi Dasar',
    description: 'Paket lengkap untuk memulai karier di bidang akuntansi',
    courses: ['akuntansi-001', 'accurate-001', 'excel-001'],
    totalPrice: 185000,
    packagePrice: 140000,
    savings: 45000,
    popular: true
  },
  {
    id: 'bundle-002',
    name: 'Paket Komplit Akuntansi',
    description: 'Paket komprehensif untuk menjadi akuntan profesional',
    courses: ['akuntansi-001', 'akuntansi-002', 'akuntansi-003', 'accurate-002', 'excel-002'],
    totalPrice: 430000,
    packagePrice: 300000,
    savings: 130000
  },
  {
    id: 'bundle-003',
    name: 'Paket Accurate Mastery',
    description: 'Kuasai Accurate dari dasar hingga mahir',
    courses: ['accurate-001', 'accurate-002', 'accurate-003'],
    totalPrice: 110000,
    packagePrice: 80000,
    savings: 30000
  },
  {
    id: 'bundle-004',
    name: 'Paket Excel Profesional',
    description: 'Jadi master Excel untuk keperluan bisnis dan akuntansi',
    courses: ['excel-001', 'excel-002', 'excel-003'],
    totalPrice: 70000,
    packagePrice: 50000,
    savings: 20000
  },
  {
    id: 'bundle-005',
    name: 'Paket UMKM Lengkap',
    description: 'Semua yang dibutuhkan untuk mengelola bisnis UMKM',
    courses: ['umkm-001', 'pajak-002', 'accurate-001'],
    totalPrice: 65000,
    packagePrice: 50000,
    savings: 15000,
    popular: true
  },
  {
    id: 'bundle-006',
    name: 'Paket Certified Professional',
    description: 'Persiapan lengkap untuk ujian sertifikasi',
    courses: ['accurate-004', 'excel-004', 'akuntansi-001'],
    totalPrice: 260000,
    packagePrice: 200000,
    savings: 60000
  }
];
