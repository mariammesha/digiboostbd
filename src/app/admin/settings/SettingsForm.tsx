'use client';

import { useState } from 'react';
import { updateSiteSettings } from '@/app/admin/actions';

interface SettingsData {
  whatsappNumber: string;
  contactEmail: string;
  contactAddress: string;
  facebookUrl: string;
  instagramUrl: string;
  accentColor: string;
}

const THEME_LABELS: Record<string, { label: string; primary: string; secondary?: string }> = {
  gold: { label: 'Golden Brown (Logo)', primary: '#D4820A', secondary: '#6B3006' },
  orange: { label: 'Orange (Classic Brand)', primary: '#E8651A' },
  blue: { label: 'Blue (Corporate)', primary: '#2563EB' },
  green: { label: 'Green (Growth)', primary: '#16A34A' },
  purple: { label: 'Purple (Royal Purple)', primary: '#9333EA' },
};

export default function SettingsForm({ initialSettings }: { initialSettings: SettingsData }) {
  const [formData, setFormData] = useState<SettingsData>(initialSettings);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; themeName: string } | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      await updateSiteSettings(formData);
      const appliedTheme = THEME_LABELS[formData.accentColor]?.label || formData.accentColor;
      setToast({
        show: true,
        themeName: appliedTheme,
      });

      // Auto dismiss after 5 seconds
      setTimeout(() => {
        setToast((current) => (current?.show ? { ...current, show: false } : null));
      }, 5000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      alert('Failed to save settings: ' + message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      {/* Toast Notification Popup */}
      {toast?.show && (
        <div className="fixed top-6 right-6 z-50 max-w-md w-full animate-bounce-in">
          <div className="bg-slate-900 border-2 border-amber-500/60 text-white rounded-2xl p-5 shadow-2xl shadow-amber-950/40 backdrop-blur-md flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xl shrink-0 border border-amber-500/40">
              ✓
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-amber-300 leading-tight">Theme & Settings Applied! 🎉</h3>
              <p className="text-sm text-slate-300 mt-1">
                Your site theme has been updated to <strong className="text-amber-400 font-semibold">{toast.themeName}</strong> and applied live to the website.
              </p>
            </div>
            <button
              onClick={() => setToast(null)}
              className="text-slate-400 hover:text-white text-lg font-bold p-1 leading-none"
              aria-label="Close notification"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">WhatsApp Number</label>
          <input
            name="whatsappNumber"
            type="text"
            value={formData.whatsappNumber}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500"
            required
          />
          <p className="text-xs text-slate-500 mt-1">Include country code without +, e.g., 8801700000000</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Contact Email</label>
          <input
            name="contactEmail"
            type="email"
            value={formData.contactEmail}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Contact Address</label>
          <input
            name="contactAddress"
            type="text"
            value={formData.contactAddress}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Facebook Page URL</label>
          <input
            name="facebookUrl"
            type="url"
            value={formData.facebookUrl}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Instagram Profile URL</label>
          <input
            name="instagramUrl"
            type="url"
            value={formData.instagramUrl}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Accent Color & Theme</label>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {Object.entries(THEME_LABELS).map(([id, { label, primary, secondary }]) => (
              <label
                key={id}
                className={`flex items-center gap-2.5 p-2.5 rounded-lg border cursor-pointer transition-all ${
                  formData.accentColor === id
                    ? 'border-amber-500 bg-amber-500/10 ring-1 ring-amber-500'
                    : 'border-slate-700 bg-slate-900 hover:bg-slate-800/80'
                }`}
              >
                <input
                  type="radio"
                  name="accentColor"
                  value={id}
                  checked={formData.accentColor === id}
                  onChange={handleChange}
                  className="accent-amber-500"
                />
                <div className="flex items-center gap-1 shrink-0">
                  <span className="w-3.5 h-3.5 rounded-full inline-block shadow-sm" style={{ backgroundColor: primary }} />
                  {secondary && (
                    <span
                      className="w-3.5 h-3.5 rounded-full inline-block shadow-sm -ml-1.5 border border-slate-900"
                      style={{ backgroundColor: secondary }}
                    />
                  )}
                </div>
                <span className="text-xs font-medium text-slate-200">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-900/30"
        >
          {saving ? (
            <>
              <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              Applying Theme & Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </button>
      </form>
    </>
  );
}
