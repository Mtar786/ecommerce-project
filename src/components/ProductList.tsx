// src/components/ProductList.tsx
'use client';

import React from 'react';
import { ProductType, useCart } from '../context/CartContext';

export function ProductList({ products }: { products: ProductType[] }) {
  const { addToCart } = useCart();

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {products.map((p) => (
        <li
          key={p.id}
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '1rem',
          }}
        >
          {p.imageUrl && (
            <img
              src={p.imageUrl}
              alt={p.name}
              width={150}
              height={150}
              style={{ objectFit: 'cover', marginBottom: '0.5rem' }}
            />
          )}
          <h2>{p.name}</h2>
          <p style={{ fontWeight: 'bold' }}>${p.price.toFixed(2)}</p>
          {p.description && <p>{p.description}</p>}
          <button
             onClick={() => {
              console.log('👉 Button clicked for product:', p);
              addToCart(p);
            }}
            style={{
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '4px',
              background: '#0070f3',
              color: '#fff',
              cursor: 'pointer',
              marginTop: '0.5rem',
            }}
          >
            Add to Cart
          </button>
        </li>
      ))}
    </ul>
  );
}
