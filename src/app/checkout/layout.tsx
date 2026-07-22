import { CheckoutHeader } from '@/components/layout/CheckoutHeader';

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CheckoutHeader />
      <main className="flex-1">{children}</main>
    </>
  );
}
