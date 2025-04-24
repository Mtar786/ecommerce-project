// src/app/cancel/page.tsx
import Link from 'next/link';

export default function CancelPage() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>❌ Payment Canceled</h1>
      <p>Your payment was not completed.</p>
      <Link href="/cart">
        <button style={{ marginTop: '1rem' }}>Back to Cart</button>
      </Link>
    </main>
  );
}
