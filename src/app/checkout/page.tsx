// src/app/checkout/page.tsx
'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from '../../context/CartContext';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function CheckoutPage() {
  const { cart } = useCart();
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cart }),
    });
    const { sessionId } = await res.json();
    const stripe = await stripePromise;
    if (stripe) {
      await stripe.redirectToCheckout({ sessionId });
    }
    setLoading(false);
  }

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ marginBottom: '1rem' }}>Checkout</h1>
      <button
        onClick={handleCheckout}
        disabled={loading || cart.length === 0}
        style={{
          padding: '0.75rem 1.5rem',
          background: '#6772e5',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: loading || cart.length === 0 ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Processing…' : 'Pay with Card'}
      </button>
    </main>
  );
}
