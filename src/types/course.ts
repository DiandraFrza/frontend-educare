export interface Course {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  price: number;
  originalPrice?: number;
  sessions: number;
  quota: number;
  schedule: string;
  time: string;
  level: 'pemula' | 'menengah' | 'mahir' | 'semua';
  category: CourseCategory;
  instructor: string;
  rating: number;
  students: number;
  image: string;
  benefits: string[];
  includes: string[];
  isPopular?: boolean;
  isNew?: boolean;
}

export type CourseCategory = 
  | 'akuntansi'
  | 'accurate'
  | 'pajak'
  | 'excel'
  | 'sertifikasi'
  | 'umkm'
  | 'bundling'
  | 'webinar';

export interface CourseCategoryInfo {
  id: CourseCategory;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface CoursePackage {
  id: string;
  name: string;
  description: string;
  courses: string[];
  totalPrice: number;
  packagePrice: number;
  savings: number;
  popular?: boolean;
}
