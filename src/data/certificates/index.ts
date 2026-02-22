import { Certificate, CertificateCategory } from '@/types/certificate';

// Kategori sertifikat yang sudah disederhanakan
export const certificateCategories: CertificateCategory[] = [
  {
    id: 'teknisi-akuntansi',
    name: 'Teknisi Akuntansi',
    description: 'Sertifikasi kompetensi bidang teknisi akuntansi',
    icon: 'solar:calculator-linear',
    color: 'blue',
    count: 8
  },
  {
    id: 'komputerisasi-akuntansi',
    name: 'Komputerisasi Akuntansi',
    description: 'Sertifikasi kompetensi komputerisasi akuntansi',
    icon: 'solar:monitor-linear',
    color: 'purple',
    count: 5
  },
  {
    id: 'accurate',
    name: 'Accurate 5 dan Online',
    description: 'Sertifikasi resmi penggunaan software Accurate',
    icon: 'solar:check-circle-linear',
    color: 'green',
    count: 4
  },
  {
    id: 'microsoft-office',
    name: 'Microsoft Office',
    description: 'Sertifikasi kompetensi penggunaan Microsoft Office (Excel, Word, PowerPoint)',
    icon: 'solar:document-linear',
    color: 'emerald',
    count: 6
  },
  {
    id: 'general',
    name: 'Umum',
    description: 'Sertifikasi kelas dan pelatihan umum',
    icon: 'solar:diploma-linear',
    color: 'amber',
    count: 10
  }
];

// Sertifikat Formal (Ujian Kompetensi)
export const formalCertificates: Certificate[] = [
  {
    id: 'CERT-FORMAL-001',
    templateType: 'formal',
    certificateNumber: '001/EDU/Komp/II/2026',
    holderName: 'Sellina Aulia Putri',
    holderId: '3201011234560001',
    holderPhoto: '/images/certificates/photo-sample.jpg',
    holderBirthPlace: 'Jakarta',
    holderBirthDate: '2008-01-17',
    holderInstitution: 'SMKS ISLAM BAHAGIA',
    competencyTitle: 'Teknisi Akuntansi Yunior KKNI Level II',
    competencyDescription: 'Telah dinyatakan lulus dalam ujian sertifikasi kompetensi bidang Teknisi Akuntansi sesuai dengan Standar Kompetensi Kerja Nasional Indonesia (SKKNI)',
    issueDate: '2026-02-05',
    expiryDate: '2029-02-05',
    issuerName: 'M. Aziz Andriansyah, S.Pd., CAAT., CAP., CTT',
    issuerTitle: 'Founder & Lead Instructor Educare Academy',
    directorName: 'M. Aziz Andriansyah, S.Pd., Gr., CAAT., CAP., CTT',
    directorTitle: 'Direktur Utama',
    directorSignature: '/images/signatures/paraf-aziz.jpeg',
    managerName: 'Azrel Hikmat Maulana Rati, S.Pc.',
    managerTitle: 'Manager Divisi Edukasi',
    category: 'teknisi-akuntansi',
    level: 'professional',
    status: 'active',
    verificationUrl: '',
    partnerName: 'PT Educare Prestasi Indonesia',
    skills: [
      'Pencatatan Transaksi',
      'Penyusunan Laporan Keuangan',
      'Analisis SAK EMKM',
      'Praktik Akuntansi Manual'
    ]
  },
  {
    id: 'CERT-FORMAL-002',
    templateType: 'formal',
    certificateNumber: '002/EDU/Komp/II/2026',
    holderName: 'Ahmad Fauzi',
    holderId: '3201033456780003',
    holderBirthPlace: 'Surabaya',
    holderBirthDate: '1990-08-15',
    holderInstitution: 'Politeknik Keuangan',
    competencyTitle: 'Komputerisasi Akuntansi',
    competencyDescription: 'Telah dinyatakan lulus dalam ujian sertifikasi kompetensi bidang Komputerisasi Akuntansi',
    issueDate: '2026-02-20',
    expiryDate: '2029-02-20',
    issuerName: 'M. Aziz Andriansyah, S.Pd., CAAT., CAP., CTT',
    issuerTitle: 'Certified Instructor',
    directorName: 'M. Aziz Andriansyah, S.Pd., Gr., CAAT., CAP., CTT',
    directorTitle: 'Direktur Utama',
    managerName: 'Azrel Hikmat Maulana Rati, S.Pc.',
    managerTitle: 'Manager Divisi Edukasi',
    category: 'komputerisasi-akuntansi',
    level: 'menengah',
    status: 'active',
    verificationUrl: '',
    partnerName: 'PT Educare Prestasi Indonesia',
    skills: [
      'Penggunaan Software Akuntansi',
      'Input Data Transaksi',
      'Generate Laporan',
      'Backup dan Restore Data'
    ]
  }
];

// Sertifikat Simple (Kelas/Partisipasi)
export const simpleCertificates: Certificate[] = [
  {
    id: 'CERT-SIMPLE-001',
    templateType: 'simple',
    certificateNumber: 'EDU/CLS/2026/001',
    holderName: 'Dewi Kusuma Wardani',
    courseName: 'Microsoft Office untuk Pemula',
    courseDescription: 'Telah menyelesaikan kelas Microsoft Office untuk Pemula dan dinyatakan lulus dalam evaluasi akhir.',
    competencyTitle: 'Microsoft Office untuk Pemula',
    competencyDescription: 'Telah menyelesaikan kelas Microsoft Office untuk Pemula dan dinyatakan lulus dalam evaluasi akhir.',
    issueDate: '2026-02-10',
    issuerName: 'M. Aziz Andriansyah, S.Pd., CAAT., CAP., CTT',
    issuerTitle: 'Lead Instructor',
    category: 'microsoft-office',
    status: 'active',
    verificationUrl: '',
    skills: [
      'Microsoft Excel Dasar',
      'Microsoft Word',
      'Microsoft PowerPoint'
    ]
  },
  {
    id: 'CERT-SIMPLE-002',
    templateType: 'simple',
    certificateNumber: 'EDU/CLS/2026/002',
    holderName: 'Budi Santoso',
    courseName: 'Accurate 5 Dasar',
    courseDescription: 'Telah menyelesaikan kelas Accurate 5 Dasar dan dinyatakan kompeten dalam penggunaan software.',
    competencyTitle: 'Accurate 5 Dasar',
    competencyDescription: 'Telah menyelesaikan kelas Accurate 5 Dasar dan dinyatakan kompeten dalam penggunaan software.',
    issueDate: '2026-02-15',
    issuerName: 'M. Aziz Andriansyah, S.Pd., CAAT., CAP., CTT',
    issuerTitle: 'Lead Instructor',
    category: 'accurate',
    status: 'active',
    verificationUrl: '',
    skills: [
      'Setup Perusahaan Accurate',
      'Input Transaksi',
      'Laporan Keuangan'
    ]
  },
  {
    id: 'CERT-SIMPLE-003',
    templateType: 'simple',
    certificateNumber: 'EDU/CLS/2026/003',
    holderName: 'Siti Nurhaliza',
    courseName: 'Teknisi Akuntansi Dasar',
    courseDescription: 'Telah menyelesaikan kelas Teknisi Akuntansi Dasar dan memahami konsep akuntansi fundamental.',
    competencyTitle: 'Teknisi Akuntansi Dasar',
    competencyDescription: 'Telah menyelesaikan kelas Teknisi Akuntansi Dasar dan memahami konsep akuntansi fundamental.',
    issueDate: '2026-02-18',
    issuerName: 'M. Aziz Andriansyah, S.Pd., CAAT., CAP., CTT',
    issuerTitle: 'Lead Instructor',
    category: 'teknisi-akuntansi',
    status: 'active',
    verificationUrl: '',
    skills: [
      'Dasar Akuntansi',
      'Jurnal Umum',
      'Buku Besar'
    ]
  }
];

// Combine all certificates
export const certificates: Certificate[] = [
  ...formalCertificates,
  ...simpleCertificates
];

export const getCertificateById = (id: string): Certificate | undefined => {
  return certificates.find(cert => cert.id === id);
};

export const getCertificateByNumber = (number: string): Certificate | undefined => {
  return certificates.find(cert => cert.certificateNumber === number);
};

export const getCertificatesByCategory = (category: string): Certificate[] => {
  return certificates.filter(cert => cert.category === category);
};

export const getActiveCertificates = (): Certificate[] => {
  return certificates.filter(cert => cert.status === 'active');
};

export const getFormalCertificates = (): Certificate[] => {
  return certificates.filter(cert => cert.templateType === 'formal');
};

export const getSimpleCertificates = (): Certificate[] => {
  return certificates.filter(cert => cert.templateType === 'simple');
};

export const getCategoryById = (id: string): CertificateCategory | undefined => {
  return certificateCategories.find(cat => cat.id === id);
};

export const getLevelLabel = (level: string): string => {
  const labels: Record<string, string> = {
    'dasar': 'Dasar',
    'menengah': 'Menengah',
    'mahir': 'Mahir',
    'professional': 'Professional'
  };
  return labels[level] || level;
};

export const getLevelColor = (level: string): string => {
  const colors: Record<string, string> = {
    'dasar': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    'menengah': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    'mahir': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    'professional': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
  };
  return colors[level] || 'bg-slate-100 text-slate-700';
};

export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    'teknisi-akuntansi': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    'komputerisasi-akuntansi': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    'accurate': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    'microsoft-office': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    'general': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
  };
  return colors[category] || 'bg-slate-100 text-slate-700';
};

export const getCategoryLabel = (category: string): string => {
  const labels: Record<string, string> = {
    'teknisi-akuntansi': 'Teknisi Akuntansi',
    'komputerisasi-akuntansi': 'Komputerisasi Akuntansi',
    'accurate': 'Accurate 5 dan Online',
    'microsoft-office': 'Microsoft Office',
    'general': 'Umum'
  };
  return labels[category] || category;
};
