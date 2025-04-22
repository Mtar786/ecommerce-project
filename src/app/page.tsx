// src/app/page.tsx
import { PrismaClient, Product } from '@prisma/client';

//
// In development, we want to reuse the client to avoid exhausting connections.
// In production this is a no-op.
//
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma =
  global.prisma ||
  new PrismaClient();

if (process.env.NODE_ENV === 'development') {
  global.prisma = prisma;
}

export default async function Home() {
  // Fetch all products, newest first
  const products: Product[] = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
        Our Products
      </h1>

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

            <h2 style={{ margin: '0.5rem 0' }}>{p.name}</h2>
            <p style={{ margin: '0.25rem 0', fontWeight: 'bold' }}>
              ${p.price.toFixed(2)}
            </p>
            {p.description && (
              <p style={{ margin: '0.25rem 0' }}>{p.description}</p>
            )}

            <button
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
    </main>
  );
}
