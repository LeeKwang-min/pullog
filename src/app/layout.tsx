import type { Metadata, Viewport } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { DateProvider } from "@/context/PullupDateContext";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const APP_NAME = "Pullog";
const APP_DEFAULT_TITLE = "Pullog";
const APP_TITLE_TEMPLATE = "Pullog - %s";
const APP_DESCRIPTION = "풀업을 기록해 보세요! Pullup Log! Pullog!";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    url: "https://pullog.vercel.app/",
    locale: "ko_KR",
    images: [
      {
        url: "https://private-user-images.githubusercontent.com/42432989/378151841-ec99d570-4d9c-439a-bffa-e5ea7bf077c4.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjkzOTg3NjcsIm5iZiI6MTcyOTM5ODQ2NywicGF0aCI6Ii80MjQzMjk4OS8zNzgxNTE4NDEtZWM5OWQ1NzAtNGQ5Yy00MzlhLWJmZmEtZTVlYTdiZjA3N2M0LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEwMjAlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMDIwVDA0Mjc0N1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWRiYWY5ZDkyZTE0ZTBhZDVkZDE3NzQ1ODI4MmFmNTI0ZTExNDU1ZTY0NThlMDMzMWE5YzQ2OTI5YmFiZjI4OWEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.8O03yRzZ3XYKhc0R6vBke2GpG4M1naNoJMAiUMMRu68",
        width: 360,
        height: 680,
        alt: "Pullog Thumbnail",
      },
    ],
  },
  twitter: {
    card: "summary",
    site: APP_NAME,
    creator: "LEE KWANGMIN",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  keywords: ["pullog", "pullup", "log", "철봉", "풀업", "기록", "분석"],
  creator: "Lee Kwangmin",
  publisher: "Lee Kwangmin",
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={cn(
          "min-h-dvh bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <DateProvider>{children}</DateProvider>
        <Toaster />
      </body>
    </html>
  );
}
