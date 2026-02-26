/** @format */

import { NextRequest, NextResponse } from "next/server";

// Certificate type definition
interface Certificate {
  certificateNumber: string;
  holderName: string;
  holderId?: string;
  holderPhoto?: string;
  holderBirthPlace?: string;
  holderBirthDate?: string;
  competencyTitle?: string;
  competencyDescription?: string;
  directorName?: string;
  directorTitle?: string;
  directorSignature?: string;
  managerName?: string;
  managerTitle?: string;
  managerSignature?: string;
  issueDate: string;
  category?: string;
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

    if (!certificate || !verificationUrl || !qrDataUrl || !logoDataUrl) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Dynamic import puppeteer based on environment
    const isProduction = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";

    if (isProduction) {
      const [{ default: puppeteer }, { default: chromium }] = await Promise.all([import("puppeteer-core"), import("@sparticuz/chromium")]);

      browser = await puppeteer.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath(),
        headless: "shell" as "shell" | boolean,
      });
    } else {
      const { default: puppeteer } = await import("puppeteer");
      browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
    }

    const page = await browser.newPage();

    // Set viewport - A4 Landscape
    await page.setViewport({
      width: 1123,
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

    const NAVY = "#1e3a5f";
    const TEXT_DARK = "#1f2937";
    const TEXT_MUTED = "#6b7280";
    const BORDER_COLOR = "#e5e7eb";

    const directorName = certificate.directorName || "M. Aziz Andriansyah, S.Pd., Gr., CAAT., CAP., CTTr";
    const directorTitle = certificate.directorTitle || "Direktur Utama";
    const managerName = certificate.managerName || "Azriel Hikmal Maulana Rafi, S.Pd.";
    const managerTitle = certificate.managerTitle || "Manager Divisi Edukasi";

    // Format nama file: Sertifikat_nama_EducareAcademy
    const sanitizedHolderName = certificate.holderName.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_]/g, "");
    const filename = `Sertifikat_${sanitizedHolderName}_EducareAcademy.pdf`;

    // Build HTML content - exact match with CertificatePreview
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&family=Georgia&display=swap" rel="stylesheet">
        <style>
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
            font-family: "Poppins", -apple-system, BlinkMacSystemFont, sans-serif;
          }
          
          .wrapper {
            width: 900px;
            min-width: 900px;
            position: relative;
            background-color: transparent;
          }
          
          /* Certificate Card */
          .card {
            background: #ffffff;
            position: relative;
            overflow: hidden;
            min-height: 640px;
            box-shadow: 0 8px 40px rgba(0,0,0,0.08);
          }
          
          /* Corner Decorations */
          .corner {
            position: absolute;
            width: 50px;
            height: 50px;
            border-color: ${NAVY};
            border-style: solid;
            z-index: 10;
          }
          
          .corner-tl { top: 25px; left: 25px; border-width: 4px 0 0 4px; }
          .corner-tr { top: 25px; right: 25px; border-width: 4px 4px 0 0; }
          .corner-bl { bottom: 25px; left: 25px; border-width: 0 0 4px 4px; }
          .corner-br { bottom: 25px; right: 25px; border-width: 0 4px 4px 0; }
          
          /* Watermark */
          .watermark {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 1;
            pointer-events: none;
            opacity: 0.03;
          }
          
          /* Header */
          .header {
            padding: 30px 60px 0;
            position: relative;
            z-index: 5;
          }
          
          .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          
          .header-left {
            display: flex;
            align-items: center;
            gap: 10px;
          }
          
          .header-left img {
            height: 48px;
            width: auto;
            object-fit: contain;
          }
          
          .header-center {
            text-align: center;
            flex: 1;
            padding: 0 20px;
          }
          
          .header-center .company {
            font-size: 20px;
            color: ${NAVY};
            font-weight: 800;
            letter-spacing: 0.01em;
            margin: 0 0 4px;
            font-family: "Poppins", sans-serif;
          }
          
          .header-center .subtitle {
            font-size: 13px;
            color: ${TEXT_MUTED};
            font-style: italic;
            margin: 0;
            letter-spacing: 0.18em;
            font-family: "Poppins", sans-serif;
          }
          
          .header-right {
            width: 100px;
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }
          
          .header-right img {
            width: 80px;
            height: 80px;
            object-fit: contain;
          }
          
          .header-line {
            height: 1.5px;
            width: 100%;
            background: ${NAVY}35;
            margin-top: 18px;
          }
          
          /* Main Content */
          .content {
            padding: 28px 60px 40px;
            position: relative;
            z-index: 5;
          }
          
          .cert-title {
            text-align: center;
            margin-bottom: 10px;
          }
          
          .cert-title h1 {
            font-size: 26px;
            font-weight: 800;
            color: ${NAVY};
            margin: 0;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            font-family: "Georgia", serif;
          }
          
          .title-line {
            height: 1px;
            width: 600px;
            margin: 0 auto 18px auto;
            background: linear-gradient(to right, transparent, #9ca3af, transparent);
          }
          
          .cert-number {
            text-align: center;
            margin-bottom: 12px;
          }
          
          .cert-number span {
            display: inline-block;
            background: ${NAVY};
            color: #fff;
            font-size: 10px;
            font-weight: 600;
            padding: 2px 6px;
            letter-spacing: 0.06em;
            border-radius: 2px;
          }
          
          /* Main Layout */
          .main-layout {
            display: flex;
            gap: 35px;
          }
          
          /* Left Side - Photo & QR */
          .left-section {
            width: 120px;
            flex-shrink: 0;
          }
          
          .photo-box {
            width: 110px;
            height: 140px;
            border: 1.5px solid ${BORDER_COLOR};
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f9fafb;
            margin-bottom: 12px;
            overflow: hidden;
          }
          
          .photo-box img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          .photo-placeholder {
            font-size: 50px;
            color: ${NAVY}30;
          }
          
          .qr-box {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          
          .qr-box img {
            width: 60px;
            height: 60px;
          }
          
          /* Right Side - Content */
          .right-section {
            flex: 1;
            padding-top: 10px;
          }
          
          .label {
            font-size: 12px;
            color: ${TEXT_DARK};
            margin: 0;
            font-family: "Poppins", sans-serif;
          }
          
          .holder-name {
            font-size: 30px;
            font-weight: 600;
            color: ${NAVY};
            letter-spacing: 0.01em;
            font-family: "Georgia", serif;
            margin: 0 0 6px 0;
          }
          
          .birth-info {
            font-size: 11.5px;
            color: ${TEXT_DARK};
            margin-bottom: 14px;
            font-family: "Poppins", sans-serif;
          }
          
          .description {
            font-size: 14.5px;
            color: ${TEXT_DARK};
            line-height: 1.7;
            margin: 0 0 28px;
            font-family: "Poppins", sans-serif;
            max-width: 85%;
          }
          
          /* Signatures Area */
          .signatures-area {
            position: relative;
            margin-top: 60px;
            margin-right: 20px;
            z-index: 100;
          }
          
          .signatures-row {
            display: flex;
            gap: 40px;
            justify-content: space-between;
            margin-top: 50px;
            position: relative;
          }
          
          .sig-left {
            text-align: left;
            width: 350px;
            padding-left: 20px;
          }
          
          .sig-right {
            text-align: center;
            width: 250px;
          }
          
          .sig-line-box {
            height: 65px;
            display: flex;
            align-items: flex-end;
            margin-bottom: 8px;
          }
          
          .sig-left .sig-line-box {
            justify-content: flex-start;
          }
          
          .sig-right .sig-line-box {
            justify-content: center;
          }
          
          .sig-img {
            height: 60px;
            object-fit: contain;
          }
          
          .sig-placeholder {
            width: 200px;
            border-bottom: 1px solid ${NAVY}40;
            height: 1px;
          }
          
          .sig-right .sig-placeholder {
            width: 160px;
          }
          
          .sig-name {
            font-size: 11px;
            font-weight: 600;
            color: ${TEXT_DARK};
            margin: 0;
            white-space: nowrap;
          }
          
          .sig-underline {
            width: 250px;
            height: 1.2px;
            background: ${NAVY};
            margin: 5px 0;
          }
          
          .sig-right .sig-underline {
            width: 170px;
            margin: 5px auto;
          }
          
          .sig-title {
            font-size: 10px;
            color: ${TEXT_MUTED};
            margin: 0;
          }
          
          /* Date */
          .date-box {
            text-align: right;
            position: absolute;
            bottom: -40px;
            right: 0px;
            font-family: "Poppins", sans-serif;
          }
          
          .date-box p {
            font-size: 11px;
            color: ${TEXT_DARK};
            margin-bottom: 20px;
          }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="card">
            <!-- Corner Decorations -->
            <div class="corner corner-tl"></div>
            <div class="corner corner-tr"></div>
            <div class="corner corner-bl"></div>
            <div class="corner corner-br"></div>
            
            <!-- Watermark -->
            <div class="watermark">
              <svg width="500" height="500" viewBox="0 0 500 500">
                <circle cx="250" cy="250" r="200" fill="none" stroke="${NAVY}" stroke-width="2" />
                <circle cx="250" cy="250" r="150" fill="none" stroke="${NAVY}" stroke-width="1.5" />
                <circle cx="250" cy="250" r="100" fill="none" stroke="${NAVY}" stroke-width="1" />
                <polygon points="250,50 450,350 50,350" fill="none" stroke="${NAVY}" stroke-width="1" />
                <polygon points="250,450 50,150 450,150" fill="none" stroke="${NAVY}" stroke-width="1" />
              </svg>
            </div>
            
            <!-- Header -->
            <div class="header">
              <div class="header-content">
                <div class="header-left">
                  <img src="${logoDataUrl}" alt="Educare Logo" />
                </div>
                <div class="header-center">
                  <p class="company">PT EDUCARE PRESTASI INDONESIA</p>
                  <p class="subtitle">ACADEMY OF EXCELLENT</p>
                </div>
                <div class="header-right">
                  <img src="${logoDataUrl}" alt="Academy of Excellence" />
                </div>
              </div>
              <div class="header-line"></div>
            </div>
            
            <!-- Main Content -->
            <div class="content">
              <div class="cert-title">
                <h1>SERTIFIKAT KOMPETENSI</h1>
              </div>
              <div class="title-line"></div>
              <div class="cert-number">
                <span>${certificate.certificateNumber}</span>
              </div>
              
              <div class="main-layout">
                <!-- Left Side -->
                <div class="left-section">
                  <div class="photo-box">
                    ${certificate.holderPhoto ? `<img src="${certificate.holderPhoto}" alt="${certificate.holderName}" />` : `<div class="photo-placeholder">👤</div>`}
                  </div>
                  <div class="qr-box">
                    <img src="${qrDataUrl}" alt="QR Code" />
                  </div>
                </div>
                
                <!-- Right Side -->
                <div class="right-section">
                  <p class="label">Diberikan kepada:</p>
                  <h2 class="holder-name">${certificate.holderName}</h2>
                  
                  ${(certificate.holderBirthPlace || certificate.holderBirthDate) ? `
                  <p class="birth-info">
                    ${certificate.holderBirthPlace ? `Lahir di ${certificate.holderBirthPlace}` : ""}
                    ${certificate.holderBirthDate && certificate.holderBirthPlace ? ", " : ""}
                    ${certificate.holderBirthDate ? formatDate(certificate.holderBirthDate) : ""}
                  </p>
                  ` : ""}
                  
                  <p class="description">
                    Telah mengikuti Uji Sertifikasi Kompetensi dan telah dinyatakan <strong>Kompeten</strong> Pada uji sertifikasi ${certificate.competencyTitle} di PT Educare Prestasi Indonesia
                  </p>
                  
                  <div class="signatures-area">
                    <div class="signatures-row">
                      <div class="sig-left">
                        <div class="sig-line-box">
                          ${directorSigUrl ? `<img class="sig-img" src="${directorSigUrl}" alt="TTD" />` : `<div class="sig-placeholder"></div>`}
                        </div>
                        <p class="sig-name">${directorName}</p>
                        <div class="sig-underline"></div>
                        <p class="sig-title">${directorTitle}</p>
                      </div>
                      
                      <div class="sig-right">
                        <div class="sig-line-box">
                          ${managerSigUrl ? `<img class="sig-img" src="${managerSigUrl}" alt="TTD" />` : `<div class="sig-placeholder"></div>`}
                        </div>
                        <p class="sig-name">${managerName}</p>
                        <div class="sig-underline"></div>
                        <p class="sig-title">${managerTitle}</p>
                      </div>
                    </div>
                    
                    <div class="date-box">
                      <p>Jakarta, ${formatDate(certificate.issueDate)}</p>
                    </div>
                  </div>
                </div>
              </div>
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
        "Content-Disposition": `attachment; filename="${filename}"`,
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
