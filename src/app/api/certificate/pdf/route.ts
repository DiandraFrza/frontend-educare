/** @format */

import { NextRequest, NextResponse } from "next/server";

// Certificate type definition
interface Certificate {
  certificateNumber: string;
  holderName: string;
  holderId?: string;
  competencyTitle?: string;
  competencyDescription?: string;
  directorName?: string;
  directorTitle?: string;
  directorSignature?: string;
  managerName?: string;
  managerTitle?: string;
  managerSignature?: string;
  issueDate: string;
}

export async function POST(req: NextRequest) {
  let browser = null;

  try {
    const body = await req.json();
    const {
      certificate,
      verificationUrl,
      type = "kompetensi",
      qrDataUrl,
      barcodeDataUrl,
      logoDataUrl,
      directorSigUrl,
      managerSigUrl,
    }: {
      certificate: Certificate;
      verificationUrl: string;
      type: "kompetensi" | "peserta";
      qrDataUrl: string;
      barcodeDataUrl: string;
      logoDataUrl: string;
      directorSigUrl?: string | null;
      managerSigUrl?: string | null;
    } = body;

    if (!certificate || !verificationUrl || !qrDataUrl || !barcodeDataUrl || !logoDataUrl) {
      return NextResponse.json({ error: "Missing required fields (certificate, verificationUrl, qrDataUrl, barcodeDataUrl, logoDataUrl)" }, { status: 400 });
    }

    // Dynamic import puppeteer based on environment
    const isProduction = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";

    if (isProduction) {
      // Production: Use puppeteer-core with @sparticuz/chromium
      const [{ default: puppeteer }, { default: chromium }] = await Promise.all([import("puppeteer-core"), import("@sparticuz/chromium")]);

      browser = await puppeteer.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath(),
        headless: "shell" as "shell" | boolean,
      });
    } else {
      // Local development: Use puppeteer with bundled Chromium
      const { default: puppeteer } = await import("puppeteer");
      browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
    }

    const page = await browser.newPage();

    // Set viewport to A4 landscape at 2x scale for retina quality
    await page.setViewport({
      width: 1123, // A4 landscape at 96 DPI
      height: 794,
      deviceScaleFactor: 2,
    });

    // Format date
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    };

    const directorName = certificate.directorName || "M. Aziz Andriansyah, S.Pd., Gr., CAAT., CAP., CTTr";
    const directorTitle = certificate.directorTitle || "Direktur Utama";
    const managerName = certificate.managerName || "Azriel Hikmal Maulana Rafi, S.Pd.";
    const managerTitle = certificate.managerTitle || "Manager Divisi Edukasi";
    const subtitle = type === "peserta" ? "KEIKUTSERTAAN KELAS INI TELAH TERVERIFIKASI" : "KOMPETENSI INI TELAH TERVALIDASI";
    const description = certificate.competencyDescription || (type === "peserta" ? `Peserta telah berpartisipasi dan menyelesaikan kelas ${certificate.competencyTitle || ""} di PT Educare Prestasi Indonesia` : "Peserta telah dinyatakan lulus dalam uji sertifikasi kompetensi di PT Educare Prestasi Indonesia");

    // Build HTML content - exact copy from CertificatePreview
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap');
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            width: 1123px;
            height: 794px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: white;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          }
          
          .wrapper {
            width: 960px;
            min-width: 960px;
            position: relative;
            padding-top: 28px;
            background-color: transparent;
          }
          
          /* Watermark circles */
          .circle {
            position: absolute;
            border-radius: 50%;
            pointer-events: none;
          }
          
          .circle-1 {
            top: 190px;
            right: 440px;
            width: 420px;
            height: 420px;
            border: 70px solid rgba(15,45,82,0.05);
          }
          
          .circle-2 {
            top: 60px;
            right: 390px;
            width: 300px;
            height: 300px;
            border: 50px solid rgba(15,45,82,0.04);
          }
          
          .circle-3 {
            top: 90px;
            left: -290px;
            width: 400px;
            height: 400px;
            border: 65px solid rgba(15,45,82,0.04);
          }
          
          .circle-4 {
            top: 340px;
            left: -100px;
            width: 260px;
            height: 260px;
            border: 45px solid rgba(15,45,82,0.03);
          }
          
          /* Banner container */
          .banner {
            position: absolute;
            top: 0;
            right: 72px;
            width: 120px;
            z-index: 20;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          
          /* Logo */
          .logo {
            position: absolute;
            top: 39px;
            left: 20px;
            width: 130px;
            height: auto;
            z-index: 10;
          }
          
          /* Certificate card */
          .card {
            background: #ffffff;
            border: 1.5px solid #c8d0db;
            border-radius: 4px;
            position: relative;
            overflow: visible;
            min-height: 580px;
            box-shadow: 0 4px 24px rgba(0,0,0,0.08);
          }
          
          .inner-border {
            position: absolute;
            inset: 10px;
            border: 1px solid #c8d0db;
            border-radius: 2px;
            pointer-events: none;
            z-index: 1;
          }
          
          /* Main content */
          .content {
            padding: 44px 52px 38px 52px;
            position: relative;
            z-index: 5;
            padding-right: 210px;
          }
          
          .title {
            font-size: 64px;
            font-weight: 900;
            color: #1a2f4e;
            font-family: "Arial Black", "Impact", sans-serif;
            line-height: 0.95;
            margin: 2px;
            letter-spacing: -0.01em;
          }
          
          .subtitle {
            font-size: 12.5px;
            font-weight: 700;
            color: #1a2f4e;
            font-family: sans-serif;
            letter-spacing: 0.28em;
            margin: 10px 4px;
          }
          
          .horizontal-rule {
            height: 2px;
            background: #1a2f4e;
            width: 100%;
            margin-bottom: 16px;
            opacity: 0.15;
          }
          
          .cert-badge {
            display: inline-block;
            background: #1a2f4e;
            color: #fff;
            font-family: monospace;
            font-size: 12px;
            font-weight: 700;
            padding: 4px 16px;
            letter-spacing: 0.1em;
            border-radius: 2px;
            margin-bottom: 22px;
          }
          
          .recipient-name {
            font-size: 44px;
            font-weight: 400;
            color: #111827;
            font-family: Georgia, "Times New Roman", serif;
            margin: 0 0 8px;
            line-height: 1.1;
          }
          
          .name-underline {
            height: 2px;
            background: #111827;
            width: 380px;
            margin-top: 4px;
            margin-bottom: 16px;
          }
          
          .description {
            font-size: 13.5px;
            color: #374151;
            font-family: sans-serif;
            margin: 0 0 10px 0;
            line-height: 1.7;
            max-width: 520px;
          }
          
          .competency-title {
            font-size: 15px;
            font-weight: 700;
            color: #1a2f4e;
            font-family: sans-serif;
            margin: 0 0 6px 0;
          }
          
          .nik {
            font-size: 10px;
            color: #9ca3af;
            font-family: monospace;
            margin: 6px 0 0 0;
          }
          
          .spacer {
            height: 24px;
          }
          
          .divider {
            height: 1px;
            background: #d1d5db;
            margin-bottom: 20px;
          }
          
          /* Signatures */
          .signatures {
            display: flex;
            gap: 64px;
            align-items: flex-end;
          }
          
          .signature-box {
            min-width: 200px;
          }
          
          .signature-line {
            height: 68px;
            display: flex;
            align-items: flex-end;
            margin-bottom: 6px;
          }
          
          .signature-img {
            height: 68px;
            object-fit: contain;
          }
          
          .signature-placeholder {
            width: 180px;
            border-bottom: 1.5px solid #374151;
            height: 1px;
          }
          
          .sig-name {
            font-size: 13px;
            font-weight: 700;
            color: #111827;
            font-family: sans-serif;
            margin: 0 0 4px 0;
            line-height: 1.3;
          }
          
          .sig-line {
            height: 1px;
            background: #374151;
            margin-bottom: 4px;
            width: 200px;
          }
          
          .sig-title {
            font-size: 12px;
            color: #6b7280;
            font-family: sans-serif;
            margin: 0;
          }
          
          .date {
            margin-top: 16px;
            text-align: left;
          }
          
          .date-text {
            font-size: 11px;
            color: #9ca3af;
            font-family: sans-serif;
            margin: 0;
          }
          
          /* QR Section */
          .qr-section {
            position: absolute;
            right: 48px;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 6px;
            z-index: 10;
          }
          
          .qr-border {
            background: #fff;
            padding: 8px;
            border: 2px solid #d1d5db;
            border-radius: 4px;
          }
          
          .qr-img {
            width: 110px;
            height: 110px;
          }
          
          .barcode-img {
            width: 130px;
            height: auto;
          }
          
          .scan-text {
            font-size: 9px;
            color: #9ca3af;
            font-family: sans-serif;
            margin: 0;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <!-- Banner with Logo and Watermark circles -->
          <div class="banner">
            <!-- Watermark circles -->
            <div class="circle circle-1"></div>
            <div class="circle circle-2"></div>
            <div class="circle circle-3"></div>
            <div class="circle circle-4"></div>
            
            <img class="logo" src="${logoDataUrl}" alt="Educare" />
          </div>
          
          <!-- Certificate Card -->
          <div class="card">
            <div class="inner-border"></div>
            
            <div class="content">
              <!-- Title -->
              <div style="margin-bottom: 16px;">
                <h1 class="title">SERTIFIKAT</h1>
                <p class="subtitle">${subtitle}</p>
              </div>
              
              <div class="horizontal-rule"></div>
              
              <!-- Cert Number -->
              <div style="margin-bottom: 22px;">
                <span class="cert-badge">${certificate.certificateNumber}</span>
              </div>
              
              <!-- Recipient -->
              <h2 class="recipient-name">${certificate.holderName}</h2>
              <div class="name-underline"></div>
              
              <!-- Description -->
              <p class="description">${description}</p>
              
              ${certificate.competencyTitle && type === "kompetensi" ? `<p class="competency-title">${certificate.competencyTitle}</p>` : ""}
              ${certificate.holderId ? `<p class="nik">NIK: ${certificate.holderId}</p>` : ""}
              
              <div class="spacer"></div>
              <div class="divider"></div>
              
              <!-- Signatures -->
              <div class="signatures">
                <div class="signature-box">
                  <div class="signature-line">
                    ${directorSigUrl ? `<img class="signature-img" src="${directorSigUrl}" alt="TTD Direktur" />` : `<div class="signature-placeholder"></div>`}
                  </div>
                  <p class="sig-name">${directorName}</p>
                  <div class="sig-line"></div>
                  <p class="sig-title">${directorTitle}</p>
                </div>
                
                <div class="signature-box">
                  <div class="signature-line">
                    ${managerSigUrl ? `<img class="signature-img" src="${managerSigUrl}" alt="TTD Manager" />` : `<div class="signature-placeholder"></div>`}
                  </div>
                  <p class="sig-name">${managerName}</p>
                  <div class="sig-line"></div>
                  <p class="sig-title">${managerTitle}</p>
                </div>
              </div>
              
              <!-- Date -->
              <div class="date">
                <p class="date-text">*Diterbitkan pada, ${formatDate(certificate.issueDate)}</p>
              </div>
            </div>
            
            <!-- QR Section -->
            <div class="qr-section">
              <div class="qr-border">
                <img class="qr-img" src="${qrDataUrl}" alt="QR Code" />
              </div>
              <p class="scan-text">Scan untuk verifikasi</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    // Wait for images to load
    await page.waitForSelector("img", { timeout: 5000 });

    // Generate PDF
    const pdf = await page.pdf({
      width: "297mm",
      height: "210mm",
      printBackground: true,
      preferCSSPageSize: true,
    });

    return new NextResponse(Buffer.from(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Sertifikat-${certificate.certificateNumber}.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json({ error: "Failed to generate PDF", details: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
