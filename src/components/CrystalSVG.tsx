import { useMemo } from 'react';

interface CrystalSVGProps {
  size?: number;
  color?: string;
}

const particles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  px: `${(Math.random() - 0.5) * 80}px`,
  py: `${-30 - Math.random() * 60}px`,
  duration: `${2.5 + Math.random() * 2}s`,
  delay: `${Math.random() * 3}s`,
}));

export function CrystalSVG({ size = 160, color }: CrystalSVGProps) {
  const memoParticles = useMemo(() => particles, []);
  const mainColor = color || 'var(--crystal-blue)';
  const secondaryColor = color || 'var(--crystal-violet)';
  const gradId = useMemo(() => `crystalGrad-${Math.random().toString(36).slice(2, 8)}`, []);
  const filterId = useMemo(() => `crystalGlow-${Math.random().toString(36).slice(2, 8)}`, []);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      {memoParticles.map(p => (
        <div
          key={p.id}
          className="absolute animate-particle"
          style={{
            left: '50%',
            top: '50%',
            width: 3,
            height: 3,
            '--px': p.px,
            '--py': p.py,
            '--duration': p.duration,
            '--delay': p.delay,
          } as React.CSSProperties}
        >
          <div
            className="w-full h-full"
            style={{ background: mainColor, clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
          />
        </div>
      ))}

      <svg
        viewBox="0 0 100 140"
        width={size * 0.6}
        height={size * 0.85}
        className="animate-crystal-pulse"
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={secondaryColor} stopOpacity="0.9" />
            <stop offset="50%" stopColor={mainColor} stopOpacity="0.7" />
            <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.9" />
          </linearGradient>
          <filter id={filterId}>
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <polygon
          points="50,5 85,40 75,100 50,135 25,100 15,40"
          fill={`url(#${gradId})`}
          stroke={mainColor}
          strokeWidth="1"
          filter={`url(#${filterId})`}
        />
        <polygon
          points="50,5 65,35 50,70 35,35"
          fill={mainColor}
          fillOpacity="0.15"
          stroke={mainColor}
          strokeWidth="0.5"
          strokeOpacity="0.4"
        />
        <polygon
          points="50,70 75,100 50,135 25,100"
          fill={secondaryColor}
          fillOpacity="0.1"
          stroke={secondaryColor}
          strokeWidth="0.5"
          strokeOpacity="0.3"
        />
        <line x1="50" y1="5" x2="50" y2="135" stroke={mainColor} strokeWidth="0.3" strokeOpacity="0.5" />
      </svg>
    </div>
  );
}
