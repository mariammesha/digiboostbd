import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export default async function SettingsPage() {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: 'singleton' },
  });

  const defaultSettings = settings || {
    whatsappNumber: '8801752993428',
    contactEmail: 'dgboostbd@gmail.com',
    contactAddress: 'Sylhet, Bangladesh',
    facebookUrl: 'https://www.facebook.com/share/1Dd569DHdW/',
    instagramUrl: 'https://www.instagram.com/dgboost.bd?igsh=a3U4Ynk5NG1yNzlr',
    accentColor: 'gold',
  };

  async function updateSettings(formData: FormData) {
    'use server';
    const whatsappNumber = formData.get('whatsappNumber') as string;
    const contactEmail = formData.get('contactEmail') as string;
    const contactAddress = formData.get('contactAddress') as string;
    const facebookUrl = formData.get('facebookUrl') as string;
    const instagramUrl = formData.get('instagramUrl') as string;
    const accentColor = formData.get('accentColor') as string;

    await prisma.siteSettings.upsert({
      where: { id: 'singleton' },
      update: { whatsappNumber, contactEmail, contactAddress, facebookUrl, instagramUrl, accentColor },
      create: {
        id: 'singleton',
        whatsappNumber,
        contactEmail,
        contactAddress,
        facebookUrl,
        instagramUrl,
        accentColor,
      },
    });

    revalidatePath('/', 'layout');
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Site Settings</h1>

      <form action={updateSettings} className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">WhatsApp Number</label>
          <input
            name="whatsappNumber"
            type="text"
            defaultValue={defaultSettings.whatsappNumber}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
            required
          />
          <p className="text-xs text-slate-500 mt-1">Include country code without +, e.g., 8801700000000</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Contact Email</label>
          <input
            name="contactEmail"
            type="email"
            defaultValue={defaultSettings.contactEmail}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Contact Address</label>
          <input
            name="contactAddress"
            type="text"
            defaultValue={defaultSettings.contactAddress}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Facebook Page URL</label>
          <input
            name="facebookUrl"
            type="url"
            defaultValue={defaultSettings.facebookUrl}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Instagram Profile URL</label>
          <input
            name="instagramUrl"
            type="url"
            defaultValue={defaultSettings.instagramUrl}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Accent Color & Theme</label>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {[
              { id: 'gold', label: 'Golden Brown (Logo)', primary: '#D4820A', secondary: '#6B3006' },
              { id: 'orange', label: 'Orange', primary: '#E8651A' },
              { id: 'blue', label: 'Blue', primary: '#2563EB' },
              { id: 'green', label: 'Green', primary: '#16A34A' },
              { id: 'purple', label: 'Purple', primary: '#9333EA' },
            ].map(({ id, label, primary, secondary }) => (
              <label key={id} className="flex items-center gap-2.5 p-2.5 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800/80 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="accentColor"
                  value={id}
                  defaultChecked={defaultSettings.accentColor === id}
                  className="accent-amber-500"
                />
                <div className="flex items-center gap-1 shrink-0">
                  <span className="w-3.5 h-3.5 rounded-full inline-block shadow-sm" style={{ backgroundColor: primary }} />
                  {secondary && <span className="w-3.5 h-3.5 rounded-full inline-block shadow-sm -ml-1.5 border border-slate-900" style={{ backgroundColor: secondary }} />}
                </div>
                <span className="text-xs font-medium text-slate-200">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-500 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
}
