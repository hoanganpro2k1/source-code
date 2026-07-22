import { cookies } from 'next/headers';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

export default async function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  return (
    <>
      <Header initialAccessToken={accessToken} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
