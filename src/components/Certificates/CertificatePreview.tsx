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
        background: "transparent",
        lineColor: "#0f2d52",
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
      // Helper to convert image to base64
      const getImageBase64 = async (url: string): Promise<string> => {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      };

      // Generate QR Code
      const QRCode = (await import("qrcode")).default;
      const qrDataUrl = await QRCode.toDataURL(verificationUrl, {
        width: 220,
        margin: 0,
        color: { dark: "#000000", light: "#ffffff" },
      });

      // Generate Barcode
      const barcodeCanvas = document.createElement("canvas");
      JsBarcode(barcodeCanvas, certificate.certificateNumber, {
        format: "CODE128",
        width: 2,
        height: 60,
        displayValue: false,
        background: "#ffffff",
        lineColor: "#0f2d52",
        margin: 0,
      });
      const barcodeDataUrl = barcodeCanvas.toDataURL("image/png");

      // Get logo as base64
      const logoDataUrl = await getImageBase64("/images/logo/educare.png");

      // Call API to generate PDF
      const response = await fetch("/api/certificate/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          certificate,
          verificationUrl,
          type,
          qrDataUrl,
          barcodeDataUrl,
          logoDataUrl,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
        console.error("PDF API Error:", errorData);
        throw new Error(errorData.error || errorData.details || `HTTP ${response.status}`);
      }

      // Download PDF
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

  const NAVY = "#1a2f4e";
  const NAVY_LIGHT = "#1e3a5f";
  const BORDER_COLOR = "#c8d0db";

  // Debug: log certificate data
  console.log("Certificate data:", certificate);
  console.log("Director signature:", certificate.directorSignature);

  const directorName = certificate.directorName || "M. Aziz Andriansyah, S.Pd., Gr., CAAT., CAP., CTTr";
  const directorTitle = certificate.directorTitle || "Direktur Utama";
  const managerName = certificate.managerName || "Azriel Hikmal Maulana Rafi, S.Pd.";
  const managerTitle = certificate.managerTitle || "Manager Divisi Edukasi";

  const subtitle = type === "peserta" ? "KEIKUTSERTAAN KELAS INI TELAH TERVERIFIKASI" : "KOMPETENSI INI TELAH TERVALIDASI";

  const description = certificate.competencyDescription || (type === "peserta" ? `Peserta telah berpartisipasi dan menyelesaikan kelas ${certificate.competencyTitle || ""} di PT Educare Prestasi Indonesia` : "Peserta telah dinyatakan lulus dalam uji sertifikasi kompetensi di PT Educare Prestasi Indonesia");

  return (
    <div>
      {/* Scrollable wrapper */}
      <div className="overflow-auto rounded-lg print:overflow-visible">
        {/*
          OUTER WRAPPER: adds the top navy bar that bleeds above the card
          (replicating how the banner sticks out above the border in the template)
        */}
        <div
          style={{
            width: "960px",
            minWidth: "960px",
            position: "relative",
            paddingTop: "28px" /* space for the banner to bleed upward */,
            backgroundColor: "transparent",
          }}
        >
          {/* ── BANNER (overflows above the card border) ── */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: "72px",
              width: "120px",
              zIndex: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Watermark circles */}
            <div style={{ position: "absolute", top: 190, right: 440, width: 420, height: 420, borderRadius: "50%", border: "70px solid rgba(15,45,82,0.05)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: 60, right: 390, width: 300, height: 300, borderRadius: "50%", border: "50px solid rgba(15,45,82,0.04)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: 90, left: -290, width: 400, height: 400, borderRadius: "50%", border: "65px solid rgba(15,45,82,0.04)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: 340, left: -100, width: 260, height: 260, borderRadius: "50%", border: "45px solid rgba(15,45,82,0.03)", pointerEvents: "none" }} />

            <img
              alt="Educare Ribbon"
              crossOrigin="anonymous"
              style={{
                position: "absolute",
                top: 39,
                left: 20,
                width: "130px",
                height: "auto",
                zIndex: 10,
              }}
              src="/images/logo/educare.png"
            />
          </div>

          {/* ── CERTIFICATE CARD ── */}
          <div
            ref={certificateRef}
            style={{
              background: "#ffffff",
              border: `1.5px solid ${BORDER_COLOR}`,
              borderRadius: "4px",
              position: "relative",
              overflow: "visible",
              minHeight: "580px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            }}
            className="print:shadow-none"
          >
            {/* Inner border inset */}
            <div
              style={{
                position: "absolute",
                inset: "10px",
                border: `1px solid ${BORDER_COLOR}`,
                borderRadius: "2px",
                pointerEvents: "none",
                zIndex: 1,
              }}
            />

            {/* ── MAIN CONTENT ── */}
            <div style={{ padding: "44px 52px 38px 52px", position: "relative", zIndex: 5, paddingRight: "210px" }}>
              {/* Title block */}
              <div style={{ marginBottom: "16px" }}>
                <h1
                  style={{
                    fontSize: "64px",
                    fontWeight: 900,
                    color: NAVY,
                    fontFamily: "'Arial Black', 'Impact', sans-serif",
                    lineHeight: 0.95,
                    margin: 2,
                    letterSpacing: "-0.01em",
                  }}
                >
                  SERTIFIKAT
                </h1>
                <p
                  style={{
                    fontSize: "12.5px",
                    fontWeight: 700,
                    color: NAVY,
                    fontFamily: "sans-serif",
                    letterSpacing: "0.28em",
                    margin: "10px 4px",
                  }}
                >
                  {subtitle}
                </p>
              </div>

              {/* Horizontal rule */}
              <div style={{ height: "2px", background: NAVY, width: "100%", marginBottom: "16px", opacity: 0.15 }} />

              {/* Cert number badge */}
              <div style={{ marginBottom: "22px" }}>
                <span
                  style={{
                    display: "inline-block",
                    background: NAVY,
                    color: "#fff",
                    fontFamily: "monospace",
                    fontSize: "12px",
                    fontWeight: 700,
                    padding: "4px 16px",
                    letterSpacing: "0.1em",
                    borderRadius: "2px",
                  }}
                >
                  {certificate.certificateNumber}
                </span>
              </div>

              {/* Recipient name */}
              <h2
                style={{
                  fontSize: "44px",
                  fontWeight: 400,
                  color: "#111827",
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  margin: "0 0 8px",
                  lineHeight: 1.1,
                }}
              >
                {certificate.holderName}
              </h2>

              {/* Underline below name */}
              <div
                style={{
                  height: "2px",
                  background: "#111827",
                  width: "380px",
                  marginTop: "4px",
                  marginBottom: "16px",
                }}
              />

              {/* Description */}
              <p
                style={{
                  fontSize: "13.5px",
                  color: "#374151",
                  fontFamily: "sans-serif",
                  margin: "0 0 10px 0",
                  lineHeight: 1.7,
                  maxWidth: "520px",
                }}
              >
                {description}
              </p>

              {/* competencyTitle for kompetensi */}
              {type === "kompetensi" && certificate.competencyTitle && (
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    color: NAVY,
                    fontFamily: "sans-serif",
                    margin: "0 0 6px 0",
                  }}
                >
                  {certificate.competencyTitle}
                </p>
              )}

              {certificate.holderId && <p style={{ fontSize: "10px", color: "#9ca3af", fontFamily: "monospace", margin: "6px 0 0 0" }}>NIK: {certificate.holderId}</p>}

              {/* Spacer */}
              <div style={{ height: "24px" }} />

              {/* Horizontal divider before signatures */}
              <div style={{ height: "1px", background: "#d1d5db", marginBottom: "20px" }} />

              {/* Signatures row */}
              <div style={{ display: "flex", gap: "64px", alignItems: "flex-end" }}>
                {/* Director */}
                <div style={{ minWidth: "200px" }}>
                  <div style={{ height: "68px", display: "flex", alignItems: "flex-end", marginBottom: "6px" }}>
                    {certificate.directorSignature ? (
                      <img 
                        src={certificate.directorSignature} 
                        alt="TTD Direktur" 
                        style={{ height: 68, objectFit: "contain" }}
                        onError={(e) => {
                          console.error("Failed to load director signature:", certificate.directorSignature);
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div style={{ width: "180px", borderBottom: "1.5px solid #374151" }} />
                    )}
                  </div>
                  <p style={{ fontSize: "13px", fontWeight: 700, color: "#111827", fontFamily: "sans-serif", margin: "0 0 4px 0", lineHeight: 1.3 }}>{directorName}</p>
                  <div style={{ height: "1px", background: "#374151", marginBottom: "4px", width: "200px" }} />
                  <p style={{ fontSize: "12px", color: "#6b7280", fontFamily: "sans-serif", margin: 0 }}>{directorTitle}</p>
                </div>

                {/* Manager */}
                <div style={{ minWidth: "200px" }}>
                  <div style={{ height: "68px", display: "flex", alignItems: "flex-end", marginBottom: "6px" }}>{certificate.managerSignature ? <img src={certificate.managerSignature} alt="TTD Manager" style={{ height: 68, objectFit: "contain" }} /> : <div style={{ width: "180px", borderBottom: "1.5px solid #374151" }} />}</div>
                  <p style={{ fontSize: "13px", fontWeight: 700, color: "#111827", fontFamily: "sans-serif", margin: "0 0 4px 0", lineHeight: 1.3 }}>{managerName}</p>
                  <div style={{ height: "1px", background: "#374151", marginBottom: "4px", width: "200px" }} />
                  <p style={{ fontSize: "12px", color: "#6b7280", fontFamily: "sans-serif", margin: 0 }}>{managerTitle}</p>
                </div>
              </div>

              {/* Date bottom-right */}
              <div style={{ marginTop: "16px", textAlign: "left" }}>
                <p style={{ fontSize: "11px", color: "#9ca3af", fontFamily: "sans-serif", margin: 0 }}>*Diterbitkan pada, {formatDate(certificate.issueDate)}</p>
              </div>
            </div>

            {/* ── QR CODE — positioned right side of card ── */}
            <div
              style={{
                position: "absolute",
                right: "48px",
                top: "50%",
                transform: "translateY(-50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6px",
                zIndex: 10,
              }}
            >
              <div style={{ background: "#fff", padding: "8px", border: "2px solid #d1d5db", borderRadius: "4px" }}>
                <QRCodeSVG value={verificationUrl} size={110} level="H" includeMargin={false} />
              </div>
              <p style={{ fontSize: "9px", color: "#9ca3af", fontFamily: "sans-serif", margin: 0, textAlign: "center" }}>Scan untuk verifikasi</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {showPrintButton && (
        <div className="flex flex-wrap gap-2 print:hidden mt-4">
          <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 bg-secondary-900 text-white rounded-lg hover:bg-secondary-800 transition-colors text-sm">
            <Icon icon="solar:printer-linear" className="text-lg" />
            Cetak Sertifikat
          </button>
          <button onClick={handleDownload} disabled={isGenerating} className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed">
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
