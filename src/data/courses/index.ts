import { Course, CoursePackage, CourseCategoryInfo } from '@/types/course';
import { akuntansiCourses } from './akuntansi';
import { accurateCourses } from './accurate';
import { excelCourses } from './excel';
import { pajakCourses } from './pajak';
import { umkmCourses } from './umkm';
import { bundlingPackages } from './bundling';

export * from './akuntansi';
export * from './accurate';
export * from './excel';
export * from './pajak';
export * from './umkm';
export * from './bundling';

export const allCourses: Course[] = [
  ...akuntansiCourses,
  ...accurateCourses,
  ...excelCourses,
  ...pajakCourses,
  ...umkmCourses
];

export const allPackages: CoursePackage[] = bundlingPackages;

export const courseCategories: CourseCategoryInfo[] = [
  {
    id: 'akuntansi',
    name: 'Akuntansi',
    description: 'Praktikum akuntansi sesuai SAK EMKM',
    icon: 'solar:calculator-linear',
    color: '#3B82F6'
  },
  {
    id: 'accurate',
    name: 'Accurate',
    description: 'Pelatihan software Accurate 5',
    icon: 'solar:monitor-linear',
    color: '#1E3A5F'
  },
  {
    id: 'excel',
    name: 'Excel',
    description: 'Microsoft Excel untuk bisnis',
    icon: 'solar:document-text-linear',
    color: '#10B981'
  },
  {
    id: 'pajak',
    name: 'Pajak',
    description: 'Dasar-dasar perpajakan',
    icon: 'solar:wallet-linear',
    color: '#F59E0B'
  },
  {
    id: 'umkm',
    name: 'UMKM',
    description: 'Panduan bisnis & akuntansi UMKM',
    icon: 'solar:shop-linear',
    color: '#8B5CF6'
  },
  {
    id: 'bundling',
    name: 'Paket',
    description: 'Paket bundling hemat',
    icon: 'solar:gift-linear',
    color: '#EF4444'
  }
];

export const getCoursesByCategory = (category: string): Course[] => {
  return allCourses.filter(course => course.category === category);
};

export const getPopularCourses = (): Course[] => {
  return allCourses.filter(course => course.isPopular);
};

export const getNewCourses = (): Course[] => {
  return allCourses.filter(course => course.isNew);
};

export const getCourseById = (id: string): Course | undefined => {
  return allCourses.find(course => course.id === id);
};

export const getPackageById = (id: string): CoursePackage | undefined => {
  return allPackages.find(pkg => pkg.id === id);
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

export const getLevelLabel = (level: string): string => {
  const labels: Record<string, string> = {
    'pemula': 'Pemula',
    'menengah': 'Menengah',
    'mahir': 'Mahir',
    'semua': 'Semua Level'
  };
  return labels[level] || level;
};

export const getLevelColor = (level: string): string => {
  const colors: Record<string, string> = {
    'pemula': 'bg-green-100 text-green-700',
    'menengah': 'bg-blue-100 text-blue-700',
    'mahir': 'bg-purple-100 text-purple-700',
    'semua': 'bg-gray-100 text-gray-700'
  };
  return colors[level] || 'bg-gray-100 text-gray-700';
};
