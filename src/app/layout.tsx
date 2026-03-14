import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import SiteWrapper from "@/components/Layout/SiteWrapper";

const font = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${font.className}`}>
        <ThemeProvider
          attribute="class"
          enableSystem={true}
          defaultTheme="light"
        >
          <SiteWrapper>
            {children}
          </SiteWrapper>
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
