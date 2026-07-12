'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  clientId: string;
}

export default function ReportUploadForm({ clientId }: Props) {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !file) return;

    setStatus('uploading');
    setErrorMsg('');

    const formData = new FormData();
    formData.append('clientId', clientId);
    formData.append('title', title.trim());
    formData.append('file', file);

    try {
      const res = await fetch('/api/reports/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      setStatus('success');
      setTitle('');
      setFile(null);
      if (fileRef.current) fileRef.current.value = '';

      // Refresh the page data so the new report appears in the list
      router.refresh();

      // Reset success state after a moment
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }

  return (
    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
      <h3 className="font-medium text-sm text-slate-300 mb-3">Upload New Report</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Report Title (e.g., July SEO Audit)"
          required
          disabled={status === 'uploading'}
          className="bg-slate-800 border border-slate-600 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500 disabled:opacity-50"
        />

        <div>
          <label className="block text-xs text-slate-400 mb-1">PDF File (max 20 MB)</label>
          <input
            ref={fileRef}
            type="file"
            accept="application/pdf,.pdf"
            required
            disabled={status === 'uploading'}
            onChange={e => setFile(e.target.files?.[0] ?? null)}
            className="block w-full text-sm text-slate-400
              file:mr-3 file:py-1.5 file:px-3
              file:rounded file:border-0
              file:text-xs file:font-semibold
              file:bg-slate-700 file:text-slate-200
              hover:file:bg-slate-600
              disabled:opacity-50 cursor-pointer"
          />
          {file && (
            <p className="text-xs text-slate-500 mt-1 truncate">
              Selected: {file.name} ({(file.size / 1024).toFixed(0)} KB)
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === 'uploading' || !title.trim() || !file}
          className="bg-orange-600 hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2 rounded text-sm transition-colors mt-1"
        >
          {status === 'uploading' ? 'Uploading…' : 'Upload Report'}
        </button>

        {status === 'success' && (
          <p className="text-green-400 text-xs font-medium text-center">
            ✓ Report uploaded successfully!
          </p>
        )}
        {status === 'error' && (
          <p className="text-red-400 text-xs font-medium text-center">{errorMsg}</p>
        )}
      </form>
    </div>
  );
}
