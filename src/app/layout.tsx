import type { Metadata, Viewport } from "next";
import { Cinzel, JetBrains_Mono, Outfit } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const siteUrl = "https://yzn-iota.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Yuzana, RN — VIP Clearance",
  description:
    "For my favorite girl — a soft, luxurious apology for Nurse Yuzana. Swipe to forgive.",
  applicationName: "Yuzana VIP Clearance",
  authors: [{ name: "Your Bestie" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Yuzana VIP Clearance",
    title: "Yuzana, RN — VIP Clearance",
    description:
      "For my favorite girl — a soft, luxurious apology for Nurse Yuzana. Swipe to forgive.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yuzana, RN — VIP Clearance",
    description:
      "For my favorite girl — a soft, luxurious apology for Nurse Yuzana. Swipe to forgive.",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Yuzana",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#10080C",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${outfit.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="h-full overflow-hidden bg-obsidian font-sans">{children}</body>
    </html>
  );
}
