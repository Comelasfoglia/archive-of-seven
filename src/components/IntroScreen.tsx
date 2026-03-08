import { CrystalSVG } from './CrystalSVG';

interface IntroScreenProps {
  title: string;
  subtitle: string;
  introText: string;
  onEnter: () => void;
}

export function IntroScreen({ title, subtitle, introText, onEnter }: IntroScreenProps) {
  return (
    <div className="fixed inset-0 bg-cavern flex flex-col items-center justify-center z-50 px-6">
      {/* Title */}
      <h1
        className="font-cinzel text-4xl md:text-6xl font-bold uppercase tracking-[0.4em] mb-2"
        style={{ color: 'var(--crystal-violet)' }}
      >
        {title.replace('Archivio — Anno 6080', 'ARCHIVIO')}
      </h1>

      {/* Subtitle */}
      <p className="font-crimson italic text-lg md:text-xl mb-10" style={{ color: 'var(--text-dim)' }}>
        "{subtitle}"
      </p>

      {/* Crystal */}
      <div className="mb-10">
        <CrystalSVG size={180} />
      </div>

      {/* Intro text */}
      <p
        className="font-crimson text-base md:text-lg max-w-xl text-center leading-relaxed mb-12"
        style={{ color: 'var(--text-primary)' }}
      >
        {introText}
      </p>

      {/* Enter button — rune style */}
      <button
        onClick={onEnter}
        className="group relative font-cinzel uppercase tracking-[0.25em] text-sm md:text-base px-10 py-4 transition-all duration-500 hover:scale-105"
        style={{
          color: 'var(--crystal-blue)',
          border: '1px solid var(--rune-dim)',
          background: 'transparent',
          clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
        }}
      >
        <span className="relative z-10">Apri l'Archivio</span>
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(135deg, rgba(79,195,247,0.1), rgba(179,157,219,0.1))',
          }}
        />
      </button>
    </div>
  );
}
