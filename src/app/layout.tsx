// src/app/layout.tsx
'use client';

import './globals.css';
import { CartProvider } from '../context/CartContext';
import Link from 'next/link';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <header
            style={{
              padding: '1rem',
              borderBottom: '1px solid #eee',
              marginBottom: '2rem',
            }}
          >
            <Link href="/" style={{ marginRight: '1rem' }}>
              Home
            </Link>
            <Link href="/cart">Cart</Link>
          </header>

          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
