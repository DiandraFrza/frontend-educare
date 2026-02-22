export interface Certificate {
  id: string;
  certificateNumber: string;
  holderName: string;
  holderId?: string;
  holderPhoto?: string;
  holderBirthPlace?: string;
  holderBirthDate?: string;
  holderInstitution?: string;
  
  // Template type: 'simple' = kelas/partisipasi, 'formal' = kompetensi/ujian
  templateType: 'simple' | 'formal';
  
  // For simple template (Kelas)
  courseName?: string;
  courseDescription?: string;
  
  // For formal template (Kompetensi)
  competencyTitle: string;
  competencyDescription: string;
  
  issueDate: string;
  expiryDate?: string;
  
  // Issuer info
  issuerName: string;
  issuerTitle: string;
  issuerSignature?: string;
  
  // For formal template - Director & Manager
  directorName?: string;
  directorTitle?: string;
  directorSignature?: string;
  managerName?: string;
  managerTitle?: string;
  managerSignature?: string;
  
  partnerName?: string;
  partnerLogo?: string;
  
  // Simplified categories
  category: 'teknisi-akuntansi' | 'komputerisasi-akuntansi' | 'accurate' | 'microsoft-office' | 'general';
  
  // Level for formal template
  level?: 'dasar' | 'menengah' | 'mahir' | 'professional';
  
  status: 'active' | 'expired' | 'revoked';
  verificationUrl: string;
  skills: string[];
}

export interface CertificateCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  count: number;
}

export interface VerificationResult {
  isValid: boolean;
  certificate?: Certificate;
  message: string;
  verifiedAt: string;
}
