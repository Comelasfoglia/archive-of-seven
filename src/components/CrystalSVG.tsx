import { useMemo } from 'react';

const particles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  px: `${(Math.random() - 0.5) * 80}px`,
  py: `${-30 - Math.random() * 60}px`,
  duration: `${2.5 + Math.random() * 2}s`,
  delay: `${Math.random() * 3}s`,
}));

export function CrystalSVG({ size = 160 }: { size?: number }) {
  const memoParticles = useMemo(() => particles, []);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Particles */}
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
            style={{ background: 'var(--crystal-blue)', clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
          />
        </div>
      ))}

      {/* Crystal */}
      <svg
        viewBox="0 0 100 140"
        width={size * 0.6}
        height={size * 0.85}
        className="animate-crystal-pulse"
      >
        <defs>
          <linearGradient id="crystalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--crystal-violet)" stopOpacity="0.9" />
            <stop offset="50%" stopColor="var(--crystal-blue)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="var(--crystal-violet)" stopOpacity="0.9" />
          </linearGradient>
          <filter id="crystalGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Main crystal body */}
        <polygon
          points="50,5 85,40 75,100 50,135 25,100 15,40"
          fill="url(#crystalGrad)"
          stroke="var(--crystal-blue)"
          strokeWidth="1"
          filter="url(#crystalGlow)"
        />
        {/* Inner facets */}
        <polygon
          points="50,5 65,35 50,70 35,35"
          fill="var(--crystal-blue)"
          fillOpacity="0.15"
          stroke="var(--crystal-blue)"
          strokeWidth="0.5"
          strokeOpacity="0.4"
        />
        <polygon
          points="50,70 75,100 50,135 25,100"
          fill="var(--crystal-violet)"
          fillOpacity="0.1"
          stroke="var(--crystal-violet)"
          strokeWidth="0.5"
          strokeOpacity="0.3"
        />
        {/* Center line */}
        <line x1="50" y1="5" x2="50" y2="135" stroke="var(--crystal-blue)" strokeWidth="0.3" strokeOpacity="0.5" />
      </svg>
    </div>
  );
}
