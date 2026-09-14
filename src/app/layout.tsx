import type { Metadata } from "next";
import "./globals.css";

const description =
  "Consulta la agenda y conoce a los speakers y asistentes de Becoming AI Native. 5 y 6 de octubre de 2026, Napa Valley.";

export const metadata: Metadata = {
  metadataBase: new URL("https://becoming-ai-native-comunidad.alan-arg.chatgpt.site"),
  title: "La comunidad | Becoming AI Native",
  description,
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "/",
    siteName: "Becoming AI Native",
    title: "Becoming AI Native",
    description,
    images: [{
      url: "/og-social.jpg",
      width: 1200,
      height: 630,
      type: "image/jpeg",
      alt: "Becoming AI Native sobre un paisaje de Napa en ASCII y verde profundo.",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Becoming AI Native",
    description,
    images: [{
      url: "/og-social.jpg",
      alt: "Becoming AI Native sobre un paisaje de Napa en ASCII y verde profundo.",
    }],
  },
  robots: { index: false, follow: false },
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
