// src/app/success/page.tsx
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>🎉 Payment Successful!</h1>
      <p>Thank you for your purchase.</p>
      <Link href="/">
        <button style={{ marginTop: '1rem' }}>Back to Home</button>
      </Link>
    </main>
  );
}
