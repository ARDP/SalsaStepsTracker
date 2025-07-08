'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <p>Select a view:</p>
      <ul>
        <li><Link href="/steps">View Steps (REST API)</Link></li>
      </ul>
    </div>
  );
}