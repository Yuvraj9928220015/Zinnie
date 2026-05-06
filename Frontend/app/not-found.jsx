import Link from 'next/link';

export const metadata = {
  title: '404 - Page Not Found | Zinnie',
};

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '20px',
        background: '#f8f9fa',
      }}
    >
      <h1
        style={{
          fontSize: '6rem',
          fontWeight: '900',
          color: '#f0a500',
          lineHeight: 1,
          margin: 0,
        }}
      >
        404
      </h1>
      <h2 style={{ fontSize: '1.8rem', color: '#1a1a2e', margin: '16px 0 10px' }}>
        Page Not Found
      </h2>
      <p style={{ color: '#888', marginBottom: '30px', maxWidth: '400px' }}>
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        style={{
          background: '#f0a500',
          color: '#fff',
          padding: '13px 30px',
          borderRadius: '10px',
          fontWeight: '600',
          fontSize: '1rem',
          textDecoration: 'none',
        }}
      >
        Go Back Home
      </Link>
    </div>
  );
}