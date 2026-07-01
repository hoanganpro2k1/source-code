import { cn } from '@/lib/utils';
import type { Metadata, Viewport } from 'next';
import { cookies } from 'next/headers';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  title: {
    default: 'Đồ Án 24h - Kho Source Code & Đồ Án Chất Lượng Cao',
    template: '%s | Đồ Án 24h',
  },
  description:
    'Đồ Án 24h là nền tảng mua bán source code, đồ án tốt nghiệp uy tín dành cho sinh viên và lập trình viên.',
  openGraph: {
    title: 'Đồ Án 24h - Kho Source Code & Đồ Án Chất Lượng Cao',
    description:
      'Đồ Án 24h là nền tảng mua bán source code, đồ án tốt nghiệp uy tín dành cho sinh viên và lập trình viên.',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Đồ Án 24h',
    images: [
      {
        url: '/logo-meta.png',
        width: 1200,
        height: 630,
        alt: 'Đồ Án 24h Logo',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Đồ Án 24h - Kho Source Code & Đồ Án Chất Lượng Cao',
    description:
      'Đồ Án 24h là nền tảng mua bán source code, đồ án tốt nghiệp uy tín dành cho sinh viên và lập trình viên.',
    images: ['/logo-meta.png'],
  },
  icons: {
    icon: [
      { url: '/logo.jpg', sizes: '32x32', type: 'image/jpeg' },
      { url: '/logo.jpg', sizes: '192x192', type: 'image/jpeg' },
      { url: '/logo.jpg', sizes: '512x512', type: 'image/jpeg' },
    ],
    shortcut: '/logo.jpg',
    // Apple Touch Icon - hiển thị khi Add to Home Screen trên iOS
    apple: [
      { url: '/logo.jpg', sizes: '180x180', type: 'image/jpeg' },
    ],
  },
  manifest: '/manifest.json',
};

// Tách themeColor ra viewport export (Next.js App Router yêu cầu)
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#060816' },
    { media: '(prefers-color-scheme: light)', color: '#7C4DFF' },
  ],
};

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/providers/auth-provider';
import QueryProvider from '@/providers/query-provider';
import { Toaster } from 'sonner';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Đọc accessToken từ cookie (chỉ chạy trên Server)
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  return (
    <html lang="vi" suppressHydrationWarning className={cn('h-full', 'antialiased', inter.variable, 'font-sans')}>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <QueryProvider>
            <AuthProvider initialAccessToken={accessToken}>
              <Header initialAccessToken={accessToken} />
              <main className="flex-1">{children}</main>
              <Footer />
              <Toaster richColors closeButton duration={2000} position="bottom-right" />
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
