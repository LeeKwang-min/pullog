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
const APP_DEFAULT_TITLE = "Pullog App";
const APP_TITLE_TEMPLATE = "%s - PWA App";
const APP_DESCRIPTION = "풀업 기록을해 보세요! Pullup Log! Pullog!";

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
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
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
