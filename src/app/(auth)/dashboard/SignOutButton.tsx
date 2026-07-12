'use client';

import { signOut } from 'next-auth/react';

export default function SignOutButton() {
  return (
    <button
      id="signout-btn"
      onClick={() => signOut({ callbackUrl: '/login' })}
      className="signout-btn"
    >
      Sign Out
      <style jsx>{`
        .signout-btn {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 0.5rem;
          color: rgba(248, 250, 252, 0.75);
          font-size: 0.85rem;
          font-weight: 500;
          padding: 0.45rem 1rem;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
          font-family: inherit;
        }

        .signout-btn:hover {
          background: rgba(239, 68, 68, 0.15);
          border-color: rgba(239, 68, 68, 0.35);
          color: #fca5a5;
        }
      `}</style>
    </button>
  );
}
