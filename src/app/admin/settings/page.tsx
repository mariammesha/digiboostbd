import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export default async function SettingsPage() {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: 'singleton' },
  });

  const defaultSettings = settings || {
    whatsappNumber: '8801700000000',
    contactEmail: 'hello@digiboostbd.com',
    contactAddress: 'Dhaka, Bangladesh',
    accentColor: 'orange',
  };

  async function updateSettings(formData: FormData) {
    'use server';
    const whatsappNumber = formData.get('whatsappNumber') as string;
    const contactEmail = formData.get('contactEmail') as string;
    const contactAddress = formData.get('contactAddress') as string;
    const accentColor = formData.get('accentColor') as string;

    await prisma.siteSettings.upsert({
      where: { id: 'singleton' },
      update: { whatsappNumber, contactEmail, contactAddress, accentColor },
      create: {
        id: 'singleton',
        whatsappNumber,
        contactEmail,
        contactAddress,
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
          <label className="block text-sm font-medium text-slate-300 mb-2">Accent Color</label>
          <div className="flex gap-4">
            {['orange', 'blue', 'green', 'purple'].map((color) => (
              <label key={color} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="accentColor"
                  value={color}
                  defaultChecked={defaultSettings.accentColor === color}
                  className="accent-orange-500"
                />
                <span className="capitalize text-slate-200">{color}</span>
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
