import { useState, useCallback } from 'react';
import { CrystalSVG } from './CrystalSVG';

interface IntroScreenProps {
  crystalColor: string;
  personalPhrase: string;
  onEnter: () => void;
}

export function IntroScreen({ crystalColor, personalPhrase, onEnter }: IntroScreenProps) {
  const [exploding, setExploding] = useState(false);

  const handleEnter = useCallback(() => {
    setExploding(true);
    setTimeout(onEnter, 1200);
  }, [onEnter]);

  return (
    <div
      className="fixed inset-0 bg-cavern flex flex-col items-center justify-center z-50 px-6"
      style={exploding ? { animation: 'intro-fade-out 1.2s ease-in forwards' } : undefined}
    >
      {/* Title */}
      <h1
        className="font-cinzel text-4xl md:text-6xl font-bold uppercase tracking-[0.4em] mb-2"
        style={{ color: crystalColor }}
      >
        ARCHIVIO
      </h1>

      {/* Personal phrase */}
      <p
        className="font-crimson italic text-base md:text-lg max-w-md text-center leading-relaxed mb-10"
        style={{ color: 'var(--text-dim)' }}
      >
        {personalPhrase}
      </p>

      {/* Crystal */}
      <div
        className="mb-10"
        style={exploding ? {
          animation: 'crystal-explode 1.2s ease-out forwards',
          '--explode-color': crystalColor,
        } as React.CSSProperties : undefined}
      >
        <CrystalSVG size={180} color={crystalColor} />
      </div>

      {/* Enter button */}
      {!exploding && (
        <button
          onClick={handleEnter}
          className="group relative font-cinzel uppercase tracking-[0.25em] text-sm md:text-base px-10 py-4 transition-all duration-500 hover:scale-105"
          style={{
            color: crystalColor,
            border: '1px solid var(--rune-dim)',
            background: 'transparent',
            clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
          }}
        >
          <span className="relative z-10">Apri l'Archivio</span>
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `linear-gradient(135deg, ${crystalColor}1a, ${crystalColor}0d)`,
            }}
          />
        </button>
      )}
    </div>
  );
}
