"use client";

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface SimpleCertificateProps {
  certificate: {
    certificateNumber: string;
    holderName: string;
    courseName?: string;
    courseDescription?: string;
    issueDate: string;
    expiryDate?: string;
    issuerName: string;
    issuerTitle: string;
    issuerSignature?: string;
  };
  verificationUrl: string;
}

const SimpleCertificate: React.FC<SimpleCertificateProps> = ({ 
  certificate, 
  verificationUrl 
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <div className="w-full h-full bg-white p-6 sm:p-10 relative overflow-hidden">
      {/* Watermark Circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
        <div className="w-96 h-96 border-[3px] border-secondary-900 rounded-full flex items-center justify-center">
          <div className="w-80 h-80 border-[2px] border-secondary-900 rounded-full flex items-center justify-center">
            <div className="w-64 h-64 border-[2px] border-secondary-900 rounded-full flex items-center justify-center">
              <span className="text-secondary-900 text-6xl font-bold">EDU</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-28 h-28 bg-gradient-to-br from-secondary-900 to-secondary-700 rounded-br-[60px]" />
      <div className="absolute bottom-0 right-0 w-28 h-28 bg-gradient-to-tl from-secondary-900 to-secondary-700 rounded-tl-[60px]" />
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            {/* Logo */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                EDU
              </div>
              <div>
                <h2 className="text-xl font-bold text-secondary-900">Educare</h2>
                <p className="text-xs text-slate-500">Academy of Excellence</p>
              </div>
            </div>
          </div>
          
          {/* Badge / Ribbon */}
          <div className="bg-gradient-to-b from-secondary-800 to-secondary-900 text-white px-4 py-3 rounded-b-lg text-center shadow-lg">
            <p className="text-[10px] uppercase tracking-wider">Sertifikat</p>
            <p className="text-xs font-bold">Kompetensi</p>
            <div className="w-10 h-10 mx-auto mt-2 bg-white/10 rounded-full flex items-center justify-center border-2 border-white/30">
              <span className="text-lg">✓</span>
            </div>
          </div>
        </div>

        {/* Title Section with more spacing */}
        <div className="mb-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-secondary-900 tracking-tight">
            SERTIFIKAT
          </h1>
          <p className="text-sm text-slate-500 mt-2 tracking-widest uppercase">
            Kompetensi ini telah tervalidasi
          </p>
          <div className="h-0.5 w-24 bg-secondary-900 mt-3" />
        </div>

        {/* Certificate Number - Centered in box */}
        <div className="mb-6">
          <div className="bg-secondary-900 text-white px-4 py-2 rounded inline-flex items-center justify-center">
            <span className="text-sm font-mono tracking-wider">{certificate.certificateNumber}</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center">
          <p className="text-sm text-slate-600 mb-2">Diberikan kepada</p>
          
          {/* Name with more spacing from underline */}
          <div className="mb-4">
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-primary-600 pb-2">
              {certificate.holderName}
            </h1>
            <div className="w-48 h-0.5 bg-slate-800" />
          </div>
          
          <p className="text-sm text-slate-600 mb-2">Atas kelulusannya pada kelas</p>
          
          <h2 className="text-xl sm:text-2xl font-bold text-secondary-900 mb-4">
            {certificate.courseName || "Kelas Educare Academy"}
          </h2>
          
          <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
            {certificate.courseDescription || 
              "Telah dinyatakan lulus dalam uji sertifikasi kompetensi di PT Educare Prestasi Indonesia."
            }
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-end mt-6 pt-4 border-t border-slate-200">
          {/* Left - Date & Signature */}
          <div>
            <p className="text-sm text-slate-600 mb-3">
              {formatDate(certificate.issueDate)}
            </p>
            
            <div className="h-14 flex items-end mb-2">
              {certificate.issuerSignature ? (
                <img 
                  src={certificate.issuerSignature}
                  alt="Signature"
                  className="h-full object-contain"
                />
              ) : (
                <div className="w-32 border-b-2 border-slate-800" />
              )}
            </div>
            
            <p className="text-sm font-bold text-secondary-900">
              {certificate.issuerName}
            </p>
            <p className="text-xs text-slate-600">
              {certificate.issuerTitle}
            </p>
          </div>
          
          {/* Right - QR & Verification */}
          <div className="text-right">
            <div className="bg-white p-2 rounded-lg shadow-md border border-slate-200 inline-block mb-2">
              <QRCodeSVG 
                value={verificationUrl}
                size={60}
                level="M"
              />
            </div>
            <p className="text-xs text-slate-500">Verifikasi Sertifikat</p>
            <p className="text-[10px] text-slate-400">educare.id/verify</p>
            
            {certificate.expiryDate && (
              <p className="text-xs text-slate-500 mt-2">
                Berlaku hingga {formatDate(certificate.expiryDate)}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleCertificate;
