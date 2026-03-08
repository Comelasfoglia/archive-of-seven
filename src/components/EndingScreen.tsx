import { useState, useEffect } from 'react';
import { CrystalSVG } from './CrystalSVG';

interface EndingScreenProps {
  ending: { title: string; text: string };
  playerName: string;
  onRestart: () => void;
  onReturn: () => void;
}

export function EndingScreen({ ending, playerName, onRestart, onReturn }: EndingScreenProps) {
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowOptions(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6 overflow-y-auto" style={{ background: 'var(--bg-deep)' }}>
      {/* Inverted crystal — pulses inward */}
      <div className="mb-10" style={{ animation: 'crystal-pulse-inward 3s ease-in-out infinite' }}>
        <CrystalSVG size={120} />
      </div>

      {/* Ending text */}
      <div
        className="font-crimson text-base md:text-lg max-w-[600px] text-center leading-[2] whitespace-pre-line mb-10"
        style={{ color: 'var(--text-primary)' }}
      >
        {ending.text}
      </div>

      {/* Player attribution */}
      <p
        className="font-cinzel text-xs tracking-[0.3em] uppercase mb-12"
        style={{ color: 'var(--text-dim)' }}
      >
        — {playerName}, Anno 6080
      </p>

      {/* Delayed options */}
      {showOptions && (
        <div className="flex flex-col sm:flex-row gap-4" style={{ animation: 'challenge-fade-in 2s ease-out forwards' }}>
          <button
            onClick={onRestart}
            className="group relative font-cinzel uppercase tracking-[0.2em] text-xs px-8 py-3 transition-all duration-500 hover:scale-105"
            style={{
              color: 'var(--crystal-violet)',
              border: '1px solid var(--rune-dim)',
              background: 'transparent',
              clipPath: 'polygon(6px 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0 calc(100% - 6px), 0 6px)',
            }}
          >
            <span className="relative z-10">Ricomincia con un altro personaggio</span>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'linear-gradient(135deg, rgba(179,157,219,0.08), rgba(79,195,247,0.08))' }}
            />
          </button>

          <button
            onClick={onReturn}
            className="group relative font-cinzel uppercase tracking-[0.2em] text-xs px-8 py-3 transition-all duration-500 hover:scale-105"
            style={{
              color: 'var(--crystal-blue)',
              border: '1px solid var(--rune-dim)',
              background: 'transparent',
              clipPath: 'polygon(6px 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0 calc(100% - 6px), 0 6px)',
            }}
          >
            <span className="relative z-10">Resta nell'archivio</span>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'linear-gradient(135deg, rgba(79,195,247,0.08), rgba(179,157,219,0.08))' }}
            />
          </button>
        </div>
      )}
    </div>
  );
}
