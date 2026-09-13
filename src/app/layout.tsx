import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "La comunidad | Becoming AI Native",
  description:
    "Conoce a los speakers y asistentes de Becoming AI Native. 5 y 6 de octubre de 2026, Napa Valley.",
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
