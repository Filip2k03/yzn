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

export const metadata: Metadata = {
  title: "Yuzana, RN — VIP Clearance | Incident #408",
  description:
    "A hyper-luxurious mobile-first apology microsite for Nurse Yuzana — peace treaty inbound.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#09090B",
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
