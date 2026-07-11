'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Next.js caught error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-white text-black">
      <div className="max-w-2xl w-full p-6 border-2 border-red-500 rounded-lg bg-red-50">
        <h2 className="text-2xl font-bold text-red-700 mb-4">Client-Side Error Caught!</h2>
        <p className="font-mono text-sm mb-4 p-4 bg-white rounded overflow-x-auto">
          {error.message}
        </p>
        <pre className="font-mono text-xs p-4 bg-white rounded overflow-x-auto text-gray-700 whitespace-pre-wrap">
          {error.stack}
        </pre>
        <button
          onClick={() => reset()}
          className="mt-6 bg-red-600 text-white px-4 py-2 rounded font-medium"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
