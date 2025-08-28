import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import type React from "react"
import ClientLayout from "./client-layout"

export const metadata: Metadata = {
  title: "TalentConnect - Bolsa de Trabajo Perú | Empleos y Oportunidades Laborales",
  description:
    "La mejor plataforma de empleos en Perú. Encuentra trabajo, conecta talento con empresas. Bolsa de trabajo profesional para Lima, Arequipa, Trujillo y todo el Perú. Empleos remotos, presenciales y freelance.",
  keywords: [
    "bolsa de trabajo peru",
    "empleos peru",
    "trabajo lima",
    "oportunidades laborales",
    "buscar empleo",
    "reclutamiento peru",
    "jobs peru",
    "trabajo remoto",
    "empleos arequipa",
    "trabajo trujillo",
    "bolsa laboral",
    "portal de empleos",
    "recursos humanos",
    "cv peru",
    "curriculum vitae",
    "entrevistas trabajo",
    "empresas peru",
    "talento humano",
    "carrera profesional",
    "empleos cusco",
    "trabajo piura",
    "empleos ica",
    "trabajo huancayo",
    "empleos chiclayo",
    "trabajo tacna",
    "empleos latinoamerica",
    "trabajo colombia",
    "empleos ecuador",
    "trabajo chile",
    "empleos bolivia",
  ],
  authors: [{ name: "TalentConnect" }],
  creator: "TalentConnect",
  publisher: "TalentConnect",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://talentconnect.pe"),
  alternates: {
    canonical: "/",
    languages: {
      "es-PE": "/es-pe",
      "es-ES": "/es",
      "en-US": "/en",
    },
  },
  openGraph: {
    title: "TalentConnect - La Mejor Bolsa de Trabajo en Perú",
    description:
      "Conecta con las mejores oportunidades laborales en Perú. Plataforma profesional de empleos para candidatos y empresas. ¡Encuentra tu trabajo ideal hoy!",
    url: "https://talentconnect.pe",
    siteName: "TalentConnect",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TalentConnect - Bolsa de Trabajo Perú",
      },
    ],
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TalentConnect - Bolsa de Trabajo Perú",
    description:
      "La plataforma líder de empleos en Perú. Conecta talento excepcional con oportunidades laborales únicas.",
    images: ["/twitter-image.jpg"],
    creator: "@TalentConnectPE",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
    yahoo: "yahoo-site-verification-code",
  },
  category: "employment",
  classification: "Business",
  generator: "TalentConnect PWA",
  applicationName: "TalentConnect",
  referrer: "origin-when-cross-origin",
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "TalentConnect",
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#3b82f6" }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="TalentConnect" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="theme-color" content="#ffffff" />

        {/* Geo tags para Perú */}
        <meta name="geo.region" content="PE" />
        <meta name="geo.country" content="Peru" />
        <meta name="geo.placename" content="Lima, Peru" />
        <meta name="ICBM" content="-12.046374, -77.042793" />

        {/* Structured Data para SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "TalentConnect",
              alternateName: "TalentConnect Perú",
              url: "https://talentconnect.pe",
              description: "La mejor plataforma de empleos en Perú. Conecta talento con oportunidades laborales.",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://talentconnect.pe/buscar?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
              sameAs: [
                "https://facebook.com/talentconnectpe",
                "https://twitter.com/talentconnectpe",
                "https://linkedin.com/company/talentconnectpe",
                "https://instagram.com/talentconnectpe",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+51-1-234-5678",
                contactType: "customer service",
                areaServed: "PE",
                availableLanguage: ["Spanish", "English"],
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: "Av. Javier Prado Este 123",
                addressLocality: "Lima",
                addressRegion: "Lima",
                postalCode: "15036",
                addressCountry: "PE",
              },
            }),
          }}
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
