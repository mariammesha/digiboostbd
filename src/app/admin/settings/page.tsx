import { prisma } from '@/lib/prisma';
import SettingsForm from './SettingsForm';

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

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Site Settings</h1>
      <SettingsForm initialSettings={defaultSettings} />
    </div>
  );
}
