/** @format */

"use client";

import React, { useRef, useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { QRCodeSVG } from "qrcode.react";
import JsBarcode from "jsbarcode";
import { Certificate } from "@/types/certificate";

interface CertificatePreviewProps {
  certificate: Certificate;
  verificationUrl: string;
  showPrintButton?: boolean;
  type?: "kompetensi" | "peserta";
}

const CertificatePreview: React.FC<CertificatePreviewProps> = ({ certificate, verificationUrl, showPrintButton = true, type = "kompetensi" }) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const barcodeRef = useRef<SVGSVGElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (barcodeRef.current && certificate.certificateNumber) {
      JsBarcode(barcodeRef.current, certificate.certificateNumber, {
        format: "CODE128",
        width: 1.5,
        height: 28,
        displayValue: false,
        margin: 0,
      });
    }
  }, [certificate.certificateNumber]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handlePrint = () => window.print();

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const getImageBase64 = async (url: string): Promise<string | null> => {
        try {
          const response = await fetch(url);
          if (!response.ok) return null;
          const blob = await response.blob();
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
        } catch {
          return null;
        }
      };

      const QRCode = (await import("qrcode")).default;
      const qrDataUrl = await QRCode.toDataURL(verificationUrl, {
        width: 60,
        margin: 0,
        color: { dark: "#1e3a5f", light: "#ffffff" },
      });

      // Get logo images
      const logoDataUrl = await getImageBase64("/images/logo/logoedu.svg");
      const academyLogoUrl = await getImageBase64("/images/logo/academy-excellence.png");
      
      // Get signature images if available
      const directorSigUrl = certificate.directorSignature ? await getImageBase64(certificate.directorSignature) : null;
      const managerSigUrl = certificate.managerSignature ? await getImageBase64(certificate.managerSignature) : null;

      const response = await fetch("/api/certificate/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          certificate,
          verificationUrl,
          type,
          qrDataUrl,
          barcodeDataUrl: qrDataUrl, // Using QR as barcode for now
          logoDataUrl: logoDataUrl || academyLogoUrl || "",
          directorSigUrl,
          managerSigUrl,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(errorData.error || errorData.details || `HTTP ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Sertifikat-${certificate.certificateNumber}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Download error:", e);
      alert(`Gagal generate PDF: ${e instanceof Error ? e.message : "Unknown error"}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const NAVY = "#1e3a5f";
  const TEXT_DARK = "#1f2937";
  const TEXT_MUTED = "#6b7280";
  const BORDER_COLOR = "#e5e7eb";

  const directorName = certificate.directorName || "M. Aziz Andriansyah, S.Pd., Gr., CAAT., CAP., CTTr";
  const directorTitle = certificate.directorTitle || "Direktur Utama";
  const managerName = certificate.managerName || "Azriel Hikmal Maulana Rafi, S.Pd.";
  const managerTitle = certificate.managerTitle || "Manager Divisi Edukasi";

  // Corner decoration component
  const CornerDecoration = ({ position }: { position: "tl" | "tr" | "bl" | "br" }) => {
    const baseStyle: React.CSSProperties = {
      position: "absolute",
      width: "50px",
      height: "50px",
      borderColor: NAVY,
      borderStyle: "solid",
      zIndex: 10,
    };

    const thickness = "4px";

    const positions: Record<string, React.CSSProperties> = {
      tl: { top: "25px", left: "25px", borderWidth: `${thickness} 0 0 ${thickness}` },
      tr: { top: "25px", right: "25px", borderWidth: `${thickness} ${thickness} 0 0` },
      bl: { bottom: "25px", left: "25px", borderWidth: `0 0 ${thickness} ${thickness}` },
      br: { bottom: "25px", right: "25px", borderWidth: `0 ${thickness} ${thickness} 0` },
    };

    return <div style={{ ...baseStyle, ...positions[position] }} />;
  };

  return (
    <div>
      {/* Scrollable wrapper */}
      <div className="overflow-auto rounded-lg print:overflow-visible">
        <div
          style={{
            width: "900px",
            minWidth: "900px",
            position: "relative",
            backgroundColor: "transparent",
          }}
        >
          {/* ── CERTIFICATE CARD ── */}
          <div
            ref={certificateRef}
            style={{
              background: "#ffffff",
              position: "relative",
              overflow: "hidden",
              minHeight: "640px",
              boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
            }}
            className="print:shadow-none"
          >
            {/* Abstract Watermark Background */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1,
                pointerEvents: "none",
              }}
            >
              {/* Abstract geometric watermark */}
              <svg width="500" height="500" viewBox="0 0 500 500" style={{ opacity: 0.03 }}>
                <circle cx="250" cy="250" r="200" fill="none" stroke={NAVY} strokeWidth="2" />
                <circle cx="250" cy="250" r="150" fill="none" stroke={NAVY} strokeWidth="1.5" />
                <circle cx="250" cy="250" r="100" fill="none" stroke={NAVY} strokeWidth="1" />
                <polygon points="250,50 450,350 50,350" fill="none" stroke={NAVY} strokeWidth="1" />
                <polygon points="250,450 50,150 450,150" fill="none" stroke={NAVY} strokeWidth="1" />
              </svg>
            </div>

            {/* Corner Decorations */}
            <CornerDecoration position="tl" />
            <CornerDecoration position="tr" />
            <CornerDecoration position="bl" />
            <CornerDecoration position="br" />

            {/* ── HEADER ── */}
            <div style={{ padding: "30px 60px 0", position: "relative", zIndex: 5 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {/* Left Logo - EDUCARE ACADEMY */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <img
                    src="/images/logo/logoedu.svg"
                    alt="Educare Logo"
                    style={{ height: "48px", width: "auto", objectFit: "contain" }}
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = "none";
                      const sibling = target.nextElementSibling as HTMLElement;
                      if (sibling) sibling.style.display = "flex";
                    }}
                  />
                  <div style={{ display: "none", alignItems: "center", gap: "8px" }}>
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        background: NAVY,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span style={{ color: "#fff", fontSize: "20px", fontWeight: 700, fontStyle: "italic" }}>e</span>
                    </div>
                    <div>
                      <p style={{ fontSize: "11px", color: NAVY, fontWeight: 700, letterSpacing: "0.05em", margin: 0, lineHeight: 1.2 }}>EDUCARE</p>
                      <p style={{ fontSize: "11px", color: NAVY, fontWeight: 700, letterSpacing: "0.05em", margin: 0, lineHeight: 1.2 }}>ACADEMY</p>
                    </div>
                  </div>
                </div>

                {/* Center Title */}
                <div style={{ textAlign: "center", flex: 1, padding: "0 20px" }}>
                  <p style={{ fontSize: "20px", color: NAVY, fontWeight: 800, letterSpacing: "0.01em", margin: "0 0 4px", fontFamily: "poppins, sans-serif" }}>PT EDUCARE PRESTASI INDONESIA</p>
                  <p style={{ fontSize: "13px", color: TEXT_MUTED, fontStyle: "italic", margin: 0, letterSpacing: "0.18em", fontFamily: "poppins, sans-serif" }}>ACADEMY OF EXCELLENT</p>
                </div>

                {/* Right Logo - Academy of Excellence emblem - DIperbesar */}
                <div style={{ width: "100px", height: "100px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <img
                    src="/images/logo/academy-excellence.png"
                    alt="Academy of Excellence"
                    style={{ width: "80px", height: "80px", objectFit: "contain" }}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = "block";
                    }}
                  />
                  <svg width="75" height="75" viewBox="0 0 60 60" fill="none" style={{ display: "none" }}>
                    <circle cx="30" cy="30" r="28" stroke={NAVY} strokeWidth="1.5" />
                    <circle cx="30" cy="30" r="23" stroke={NAVY} strokeWidth="0.8" />
                    <path d="M18 22 L30 18 L42 22 L42 38 L30 34 L18 38 Z" stroke={NAVY} strokeWidth="1.2" fill="none" />
                    <path d="M30 18 L30 34" stroke={NAVY} strokeWidth="1.2" />
                    <path d="M30 10 L31.5 14.5 L36 14.5 L32.5 17 L34 21.5 L30 19 L26 21.5 L27.5 17 L24 14.5 L28.5 14.5 Z" fill={NAVY} opacity="0.7" />
                    <defs>
                      <path id="circle-path" d="M 30,30 m -20,0 a 20,20 0 1,1 40,0 a 20,20 0 1,1 -40,0" />
                    </defs>
                  </svg>
                </div>
              </div>

              {/* Horizontal Line */}
              <div style={{ height: "1.5px", width: "100%", background: `${NAVY}35`, marginTop: "18px" }} />
            </div>

            {/* ── MAIN CONTENT ── */}
            <div style={{ padding: "28px 60px 40px", position: "relative", zIndex: 5 }}>
              {/* Certificate Title */}
              <div style={{ textAlign: "center", marginBottom: "10px" }}>
                <h1 style={{ fontSize: "26px", fontWeight: 800, color: NAVY, margin: 0, letterSpacing: "0.04em", textTransform: "uppercase", fontFamily: "Georgia, serif" }}>SERTIFIKAT KOMPETENSI</h1>
              </div>

              {/* Decorative Line */}
              <div style={{ height: "1px", width: "600px", margin: "0 auto 18px auto", background: "linear-gradient(to right, transparent, #9ca3af, transparent)" }} />

              {/* Certificate Number Badge */}
              <div style={{ textAlign: "center", marginBottom: "12px" }}>
                <span style={{ display: "inline-block", background: NAVY, color: "#fff", fontSize: "10px", fontWeight: 600, padding: "2px 6px", letterSpacing: "0.06em", borderRadius: "2px" }}>{certificate.certificateNumber}</span>
              </div>

              {/* Main Layout */}
              <div style={{ display: "flex", gap: "35px" }}>
                {/* Left Side - Photo & QR - POSISI BARCODE DI BAWAH FOTO */}
                <div style={{ width: "120px", flexShrink: 0 }}>
                  {/* Photo */}
                  <div
                    style={{
                      width: "110px",
                      height: "140px",
                      border: `1.5px solid ${BORDER_COLOR}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#f9fafb",
                      marginBottom: "12px",
                      overflow: "hidden",
                    }}
                  >
                    {certificate.holderPhoto ? <img src={certificate.holderPhoto} alt={certificate.holderName} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <Icon icon="solar:user-bold" style={{ fontSize: "50px", color: `${NAVY}30` }} />}
                  </div>

                  {/* QR Code - POSISI DI BAWAH FOTO */}
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <QRCodeSVG value={verificationUrl} size={60} level="H" includeMargin={false} fgColor={NAVY} />
                  </div>
                </div>

                {/* Right Side - Content */}
                <div style={{ flex: 1, paddingTop: "10px" }}>
                  {/* Diberikan kepada */}
                  <div>
                    <p style={{ fontSize: "12px", color: TEXT_DARK, margin: 0, fontFamily: "poppins, sans-serif" }}>Diberikan kepada:</p>
                  </div>

                  {/* Nama - Font Georgia */}
                  <h2 style={{ fontSize: "30px", fontWeight: 600, color: NAVY, letterSpacing: "0.01em", fontFamily: "Georgia, serif", margin: "0 0 6px 0" }}>{certificate.holderName}</h2>

                  {/* Lahir */}
                  {(certificate.holderBirthPlace || certificate.holderBirthDate) && (
                    <p style={{ fontSize: "11.5px", color: TEXT_DARK, marginBottom: "14px", fontFamily: "poppins, sans-serif" }}>
                      {certificate.holderBirthPlace && `Lahir di ${certificate.holderBirthPlace}`}
                      {certificate.holderBirthDate && certificate.holderBirthPlace && ", "}
                      {certificate.holderBirthDate && formatDate(certificate.holderBirthDate)}
                    </p>
                  )}

                  {/* Deskripsi */}
                  <p
                    style={{
                      fontSize: "14.5px",
                      color: TEXT_DARK,
                      lineHeight: "1.7",
                      margin: "0 0 28px",
                      fontFamily: "poppins, sans-serif",
                      maxWidth: "85%", // <── Membatasi agar teks tidak melampaui 85% lebar area
                      textAlign: "justify", // Opsional: agar sisi kiri dan kanan tetap rapi
                    }}
                  >
                    Telah mengikuti Uji Sertifikasi Kompetensi dan telah dinyatakan <strong>Kompeten</strong> Pada uji sertifikasi {certificate.competencyTitle} di PT Educare Prestasi Indonesia
                  </p>

                  {/* Signatures - Layout seperti gambar ke-3 */}
                  {/* ── AREA TANDA TANGAN & TANGGAL ── */}
                  <div style={{ position: "relative", marginTop: "60px", marginRight: "20px", zIndex: 100 }}>
                    {" "}
                    {/* Ubah marginTop ini untuk turunkan seluruh blok */}
                    {/* Baris Tanda Tangan */}
                    {/* ── AREA TANDA TANGAN ── */}
                    <div
                      style={{
                        display: "flex",
                        gap: "40px", // Jarak antar dua blok tanda tangan
                        justifyContent: "space-between", // Memisahkan kiri dan kanan secara maksimal
                        marginTop: "50px",
                        position: "relative",
                      }}
                    >
                      {/* Director - Sisi Kiri (Pak Aziz) */}
                      <div
                        style={{
                          textAlign: "left", // <── Membuat nama rata kiri
                          width: "350px", // <── Diperlebar agar gelar tidak turun ke bawah
                          paddingLeft: "20px",
                        }}
                      >
                        <div style={{ height: "65px", display: "flex", alignItems: "flex-end", justifyContent: "flex-start", marginBottom: "8px" }}>{certificate.directorSignature ? <img src={certificate.directorSignature} alt="TTD" style={{ height: "60px", objectFit: "contain" }} /> : <div style={{ width: "200px", borderBottom: `1px solid ${NAVY}40` }} />}</div>

                        {/* Nama Aziz - Ditambahkan whiteSpace agar tidak memotong */}
                        <p
                          style={{
                            fontSize: "11px",
                            fontWeight: 600,
                            color: TEXT_DARK,
                            margin: 0,
                            whiteSpace: "nowrap", // <── Memastikan nama tetap satu baris
                          }}
                        >
                          {directorName}
                        </p>

                        <div style={{ width: "250px", height: "1.2px", background: NAVY, margin: "5px 0" }} />
                        <p style={{ fontSize: "10px", color: TEXT_MUTED, margin: 0 }}>{directorTitle}</p>
                      </div>

                      {/* Manager - Sisi Kanan (Pak Azriel) */}
                      <div
                        style={{
                          textAlign: "center", // Sisi kanan biasanya tetap center agar estetik
                          width: "250px",
                        }}
                      >
                        <div style={{ height: "65px", display: "flex", alignItems: "flex-end", justifyContent: "center", marginBottom: "8px" }}>{certificate.managerSignature ? <img src={certificate.managerSignature} alt="TTD" style={{ height: "60px", objectFit: "contain" }} /> : <div style={{ width: "160px", borderBottom: `1px solid ${NAVY}40` }} />}</div>
                        <p style={{ fontSize: "11px", fontWeight: 600, color: TEXT_DARK, margin: 0 }}>{managerName}</p>
                        <div style={{ width: "170px", height: "1.2px", background: NAVY, margin: "5px auto" }} />
                        <p style={{ fontSize: "10px", color: TEXT_MUTED, margin: 0 }}>{managerTitle}</p>
                      </div>
                    </div>
                    {/* Tanggal Jakarta */}
                    <div
                      style={{
                        textAlign: "right",
                        position: "absolute", // Pakai absolute agar benar-benar bebas
                        bottom: "-40px", // <── BEBAS: Atur jarak dari bawah area ttd
                        right: "0px", // <── BEBAS: Atur jarak dari kanan
                        fontFamily: "poppins, sans-serif",
                      }}
                    >
                      <p style={{ fontSize: "11px", color: TEXT_DARK, marginBottom: "20px" }}>Jakarta, {formatDate(certificate.issueDate)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {showPrintButton && (
        <div className="flex flex-wrap gap-2 print:hidden mt-4">
          <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm">
            <Icon icon="solar:printer-linear" className="text-lg" />
            Cetak Sertifikat
          </button>
          <button onClick={handleDownload} disabled={isGenerating} className="flex items-center gap-2 px-4 py-2 bg-[#1e3a5f] text-white rounded-lg hover:bg-[#152a45] transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed">
            <Icon icon={isGenerating ? "solar:hourglass-linear" : "solar:download-linear"} className="text-lg" />
            {isGenerating ? "Generating..." : "Download PDF"}
          </button>
          <a href={verificationUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm">
            <Icon icon="solar:qr-code-linear" className="text-lg" />
            Lihat Verifikasi
          </a>
        </div>
      )}
    </div>
  );
};

export default CertificatePreview;
