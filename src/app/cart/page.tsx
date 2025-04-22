// src/app/cart/page.tsx
'use client';

import React from 'react';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty. <Link href="/">Go shopping!</Link></p>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cart.map((item) => (
              <li
                key={item.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid #eee',
                  padding: '0.5rem 0',
                }}
              >
                <span>
                  {item.name} — ${item.price.toFixed(2)}
                </span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    padding: '0.25rem 0.5rem',
                    border: '1px solid #e00',
                    borderRadius: '4px',
                    background: '#fee',
                    color: '#a00',
                    cursor: 'pointer',
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <p style={{ fontWeight: 'bold', marginTop: '1rem' }}>
            Total: ${total.toFixed(2)}
          </p>

          <Link href="/checkout">
            <button
              style={{
                padding: '0.5rem 1rem',
                border: 'none',
                borderRadius: '4px',
                background: '#28a745',
                color: '#fff',
                cursor: 'pointer',
                marginTop: '1rem',
              }}
            >
              Proceed to Checkout
            </button>
          </Link>
        </>
      )}
    </main>
  );
}
