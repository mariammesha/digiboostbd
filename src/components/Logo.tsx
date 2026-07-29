import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'combined' | 'full' | 'icon';
  light?: boolean;
  className?: string;
  href?: string | null;
}

export default function Logo({
  size = 'md',
  variant = 'combined',
  light = false,
  className = '',
  href = '/',
}: LogoProps) {
  // Dimensions mapping
  const iconSizes = {
    sm: { width: 28, height: 28, text: 'text-base', gap: 'gap-2' },
    md: { width: 36, height: 36, text: 'text-xl', gap: 'gap-2.5' },
    lg: { width: 48, height: 48, text: 'text-2xl', gap: 'gap-3' },
    xl: { width: 64, height: 64, text: 'text-3xl', gap: 'gap-4' },
  };

  const fullSizes = {
    sm: { width: 120, height: 40 },
    md: { width: 160, height: 52 },
    lg: { width: 220, height: 72 },
    xl: { width: 280, height: 92 },
  };

  const { width, height, text, gap } = iconSizes[size];

  const content = (
    <div className={`inline-flex items-center ${gap} ${className}`}>
      {variant === 'full' ? (
        <Image
          src="/logo-transparent.png"
          alt="DigiBoost BD Logo"
          width={fullSizes[size].width}
          height={fullSizes[size].height}
          className="h-auto w-auto object-contain max-h-16"
          priority
        />
      ) : variant === 'icon' ? (
        <Image
          src="/logo-icon.png"
          alt="DigiBoost BD Icon"
          width={width}
          height={height}
          className="object-contain"
          priority
        />
      ) : (
        <>
          <Image
            src="/logo-icon.png"
            alt="DigiBoost BD"
            width={width}
            height={height}
            className="object-contain shrink-0"
            priority
          />
          <span className={`font-extrabold tracking-tight ${text} ${light ? 'text-white' : 'text-brand-brown'}`}>
            DigiBoost <span className="text-brand-orange">BD</span>
          </span>
        </>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center group transition-opacity hover:opacity-90">
        {content}
      </Link>
    );
  }

  return content;
}
