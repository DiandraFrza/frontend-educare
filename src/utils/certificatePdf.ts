import jsPDF from 'jspdf';
import { Certificate } from '@/types/certificate';

// Helper to convert image to base64
const getBase64Image = async (url: string): Promise<string | null> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
};

// Format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
};

// Generate Formal Certificate PDF
export const generateFormalCertificatePDF = async (
  certificate: Certificate,
  verificationUrl: string
): Promise<void> => {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 297;
  const pageHeight = 210;
  const margin = 15;

  // Background gradient effect (simulated with rectangles)
  doc.setFillColor(255, 251, 235); // amber-50
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Outer decorative border
  doc.setDrawColor(30, 41, 59); // slate-800
  doc.setLineWidth(1.5);
  doc.rect(margin, margin, pageWidth - margin * 2, pageHeight - margin * 2);
  
  // Inner border
  doc.setLineWidth(0.5);
  doc.rect(margin + 3, margin + 3, pageWidth - margin * 2 - 6, pageHeight - margin * 2 - 6);

  // Corner decorations
  const cornerSize = 20;
  doc.setLineWidth(2);
  // Top left
  doc.line(margin + 5, margin + 5, margin + 5 + cornerSize, margin + 5);
  doc.line(margin + 5, margin + 5, margin + 5, margin + 5 + cornerSize);
  // Top right
  doc.line(pageWidth - margin - 5, margin + 5, pageWidth - margin - 5 - cornerSize, margin + 5);
  doc.line(pageWidth - margin - 5, margin + 5, pageWidth - margin - 5, margin + 5 + cornerSize);
  // Bottom left
  doc.line(margin + 5, pageHeight - margin - 5, margin + 5 + cornerSize, pageHeight - margin - 5);
  doc.line(margin + 5, pageHeight - margin - 5, margin + 5, pageHeight - margin - 5 - cornerSize);
  // Bottom right
  doc.line(pageWidth - margin - 5, pageHeight - margin - 5, pageWidth - margin - 5 - cornerSize, pageHeight - margin - 5);
  doc.line(pageWidth - margin - 5, pageHeight - margin - 5, pageWidth - margin - 5, pageHeight - margin - 5 - cornerSize);

  // Header - Company Info
  const centerX = pageWidth / 2;
  
  // Company name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(30, 41, 59);
  doc.text('PT EDUCARE PRESTASI INDONESIA', centerX, 30, { align: 'center' });
  
  // Subtitle
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text('Academy of Excellence', centerX, 36, { align: 'center' });

  // Separator line
  doc.setDrawColor(30, 41, 59);
  doc.setLineWidth(0.5);
  doc.line(centerX - 60, 40, centerX + 60, 40);

  // Certificate Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(30, 41, 59);
  doc.text('Sertifikat Kompetensi', centerX, 52, { align: 'center' });

  // Certificate Number
  doc.setFont('courier', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text(`Nomor: ${certificate.certificateNumber}`, centerX, 58, { align: 'center' });

  // Photo placeholder (left side)
  const photoSize = 35;
  const photoX = margin + 20;
  const photoY = 70;
  
  doc.setDrawColor(100, 116, 139);
  doc.setLineWidth(1);
  doc.rect(photoX, photoY, photoSize, photoSize * 1.2);
  
  // NIK below photo
  if (certificate.holderId) {
    doc.setFont('courier', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    doc.text(`NIK: ${certificate.holderId}`, photoX + photoSize / 2, photoY + photoSize * 1.2 + 4, { align: 'center' });
  }

  // Content (right side of photo)
  const contentX = photoX + photoSize + 15;
  const contentY = 75;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(71, 85, 105);
  doc.text('Diberikan kepada:', contentX, contentY);

  // Holder Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(30, 41, 59);
  doc.text(certificate.holderName, contentX, contentY + 10);

  // Birth info
  let currentY = contentY + 18;
  if (certificate.holderBirthPlace && certificate.holderBirthDate) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text(`Lahir di ${certificate.holderBirthPlace}, ${formatDate(certificate.holderBirthDate)}`, contentX, currentY);
    currentY += 5;
  }

  // Institution
  if (certificate.holderInstitution) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text(`Asal: ${certificate.holderInstitution}`, contentX, currentY);
    currentY += 8;
  }

  // Separator
  doc.setDrawColor(30, 41, 59);
  doc.setLineWidth(0.3);
  doc.line(contentX, currentY, contentX + 40, currentY);
  currentY += 8;

  // Description
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  const desc = 'Sertifikat Kompetensi ini telah tervalidasi. Peserta telah dinyatakan lulus dalam uji sertifikasi kompetensi di PT Educare Prestasi Indonesia.';
  const splitDesc = doc.splitTextToSize(desc, 140);
  doc.text(splitDesc, contentX, currentY);
  currentY += splitDesc.length * 4 + 4;

  // Competency Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(30, 41, 59);
  doc.text(certificate.competencyTitle, contentX, currentY);

  // Level badge
  if (certificate.level) {
    currentY += 8;
    const levelLabels: Record<string, string> = {
      'dasar': 'Dasar',
      'menengah': 'Menengah',
      'mahir': 'Mahir',
      'professional': 'Professional'
    };
    
    // Badge background
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(contentX, currentY - 3, 40, 6, 2, 2, 'F');
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.text(`Level: ${levelLabels[certificate.level] || certificate.level}`, contentX + 20, currentY, { align: 'center' });
  }

  // Footer - Signatures
  const footerY = pageHeight - margin - 30;
  
  // Director Signature
  const sigWidth = 50;
  const leftSigX = margin + 30;
  
  doc.setDrawColor(30, 41, 59);
  doc.setLineWidth(0.5);
  doc.line(leftSigX, footerY, leftSigX + sigWidth, footerY);
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59);
  const directorName = certificate.directorName || 'M. Aziz Andriansyah, S.Pd., Gr., CAAT., CAP., CTT';
  doc.text(directorName, leftSigX + sigWidth / 2, footerY + 4, { align: 'center' });
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text(certificate.directorTitle || 'Direktur Utama', leftSigX + sigWidth / 2, footerY + 8, { align: 'center' });

  // Manager Signature
  const rightSigX = pageWidth - margin - 30 - sigWidth;
  
  doc.line(rightSigX, footerY, rightSigX + sigWidth, footerY);
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59);
  const managerName = certificate.managerName || 'Azrel Hikmat Maulana Rati, S.Pc.';
  doc.text(managerName, rightSigX + sigWidth / 2, footerY + 4, { align: 'center' });
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text(certificate.managerTitle || 'Manager Divisi Edukasi', rightSigX + sigWidth / 2, footerY + 8, { align: 'center' });

  // Issue date
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text(`Diterbitkan di Jakarta, ${formatDate(certificate.issueDate)}`, centerX, pageHeight - margin - 10, { align: 'center' });

  // QR Code placeholder text
  doc.setFont('courier', 'normal');
  doc.setFontSize(6);
  doc.setTextColor(148, 163, 184);
  doc.text('Scan untuk verifikasi', margin + 20, pageHeight - margin - 15, { align: 'center' });

  // Save PDF
  doc.save(`Sertifikat-${certificate.certificateNumber}.pdf`);
};

// Generate Simple Certificate PDF
export const generateSimpleCertificatePDF = async (
  certificate: Certificate,
  verificationUrl: string
): Promise<void> => {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 297;
  const pageHeight = 210;

  // White background
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Decorative corners
  doc.setFillColor(30, 41, 59);
  // Top left corner
  doc.moveTo(0, 0);
  doc.lineTo(40, 0);
  doc.lineTo(0, 40);
  doc.fill();
  
  // Bottom right corner
  doc.moveTo(pageWidth, pageHeight);
  doc.lineTo(pageWidth - 40, pageHeight);
  doc.lineTo(pageWidth, pageHeight - 40);
  doc.fill();

  // Watermark circles
  doc.setDrawColor(30, 41, 59);
  doc.setLineWidth(0.2);
  const centerX = pageWidth / 2;
  const centerY = pageHeight / 2;
  
  // Outer circle
  doc.circle(centerX, centerY, 50, 'S');
  // Middle circle
  doc.circle(centerX, centerY, 40, 'S');
  // Inner circle
  doc.circle(centerX, centerY, 30, 'S');
  
  // Watermark text
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(30, 41, 59);
  doc.setTextColor(240, 240, 240);
  doc.text('EDU', centerX, centerY + 8, { align: 'center' });

  // Reset text color
  doc.setTextColor(30, 41, 59);

  // Header
  const marginX = 25;
  let currentY = 25;

  // Logo
  doc.setFillColor(37, 99, 235); // primary-600
  doc.roundedRect(marginX, currentY - 5, 12, 12, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text('EDU', marginX + 6, currentY + 1, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(30, 41, 59);
  doc.text('Educare', marginX + 18, currentY);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('Academy of Excellence', marginX + 18, currentY + 4);

  // Ribbon badge (right side)
  const ribbonX = pageWidth - 50;
  doc.setFillColor(30, 41, 59);
  doc.moveTo(ribbonX, 0);
  doc.lineTo(ribbonX + 35, 0);
  doc.lineTo(ribbonX + 35, 45);
  doc.lineTo(ribbonX + 17.5, 55);
  doc.lineTo(ribbonX, 45);
  doc.fill();
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text('SERTIFIKAT', ribbonX + 17.5, 15, { align: 'center' });
  doc.text('KOMPETENSI', ribbonX + 17.5, 22, { align: 'center' });

  // Title Section
  currentY = 55;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(32);
  doc.setTextColor(30, 41, 59);
  doc.text('SERTIFIKAT', marginX, currentY);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text('KOMPETENSI INI TELAH TERVALIDASI', marginX, currentY + 6);
  
  // Underline
  doc.setDrawColor(30, 41, 59);
  doc.setLineWidth(1);
  doc.line(marginX, currentY + 10, marginX + 60, currentY + 10);

  // Certificate Number Box
  currentY = 75;
  doc.setFillColor(30, 41, 59);
  doc.roundedRect(marginX, currentY - 4, 55, 8, 1, 1, 'F');
  doc.setFont('courier', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text(certificate.certificateNumber, marginX + 27.5, currentY, { align: 'center' });

  // Main Content
  currentY = 95;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text('Diberikan kepada', marginX, currentY);

  // Holder Name
  currentY = 110;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(37, 99, 235); // primary-600
  doc.text(certificate.holderName, marginX, currentY);
  
  // Underline for name
  doc.setDrawColor(30, 41, 59);
  doc.setLineWidth(0.5);
  doc.line(marginX, currentY + 3, marginX + 80, currentY + 3);

  // Course info
  currentY = 125;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text('Atas kelulusannya pada kelas', marginX, currentY);
  
  currentY = 135;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(30, 41, 59);
  doc.text(certificate.courseName || certificate.competencyTitle, marginX, currentY);

  // Description
  currentY = 148;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  const desc = certificate.courseDescription || certificate.competencyDescription;
  const splitDesc = doc.splitTextToSize(desc, 120);
  doc.text(splitDesc, marginX, currentY);

  // Footer - Signature and Date
  const footerY = pageHeight - 35;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text(formatDate(certificate.issueDate), marginX, footerY);
  
  // Signature line
  doc.setDrawColor(30, 41, 59);
  doc.setLineWidth(0.5);
  doc.line(marginX, footerY + 8, marginX + 50, footerY + 8);
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(30, 41, 59);
  doc.text(certificate.issuerName, marginX, footerY + 14);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text(certificate.issuerTitle, marginX, footerY + 18);

  // QR Code placeholder area (right side)
  const qrX = pageWidth - 60;
  const qrY = pageHeight - 60;
  
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.3);
  doc.rect(qrX, qrY, 35, 35);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('Verifikasi Sertifikat', qrX + 17.5, qrY + 42, { align: 'center' });
  doc.setFontSize(6);
  doc.text('educare.id/verify', qrX + 17.5, qrY + 46, { align: 'center' });

  // Save PDF
  doc.save(`Sertifikat-${certificate.certificateNumber}.pdf`);
};

// Main export function
export const generateCertificatePDF = async (
  certificate: Certificate,
  verificationUrl: string
): Promise<void> => {
  if (certificate.templateType === 'simple') {
    await generateSimpleCertificatePDF(certificate, verificationUrl);
  } else {
    await generateFormalCertificatePDF(certificate, verificationUrl);
  }
};
