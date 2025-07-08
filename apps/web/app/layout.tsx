import './globals.css';
import React from 'react';

export const metadata = {
  title: 'Salsa Steps Viewer',
  description: 'Consume REST API from v1 backend',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <h1>Salsa Steps Viewer</h1>
        {children}
      </body>
    </html>
  );
}