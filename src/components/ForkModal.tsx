import { ForkOption } from '../hooks/useArchive';
import { RuneSymbol } from './RuneIcons';

interface ForkModalProps {
  forkData: {
    label: string;
    prompt: string;
    options: ForkOption[];
  };
  onChoose: (chosenId: string, excludedId: string) => void;
}

export function ForkModal({ forkData, onChoose }: ForkModalProps) {
  const handleChoice = (chosen: ForkOption) => {
    const excluded = forkData.options.find(o => o.id !== chosen.id);
    if (excluded) {
      onChoose(chosen.id, excluded.id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop — no click to close */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(7,7,16,0.85)', backdropFilter: 'blur(8px)' }}
      />

      {/* Panel */}
      <div
        className="relative w-full max-w-[520px] panel-stone clip-stone p-6 sm:p-8 md:p-10"
        style={{ animation: 'panel-enter-flex 0.6s ease-out forwards' }}
      >
        {/* Top label */}
        <p
          className="font-mono-space text-xs tracking-[0.3em] uppercase text-center mb-4"
          style={{ color: 'var(--text-dim)' }}
        >
          BIVIO
        </p>

        {/* Title */}
        <h2
          className="font-cinzel text-xl sm:text-2xl font-semibold text-center mb-3"
          style={{ color: 'var(--text-primary)' }}
        >
          {forkData.label}
        </h2>

        {/* Prompt */}
        <p
          className="font-crimson italic text-base sm:text-lg leading-relaxed text-center mb-6"
          style={{ color: 'var(--text-dim)' }}
        >
          {forkData.prompt}
        </p>

        {/* Separator */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px" style={{ background: 'var(--border-stone)' }} />
          <RuneSymbol />
          <div className="flex-1 h-px" style={{ background: 'var(--border-stone)' }} />
        </div>

        {/* Options */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {forkData.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleChoice(option)}
              className="flex-1 text-left p-4 transition-all duration-300 hover:scale-[1.02]"
              style={{
                border: '1px solid var(--border-stone)',
                background: 'transparent',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--crystal-gold)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-stone)';
              }}
            >
              <span
                className="font-cinzel text-sm sm:text-base block mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                {option.label}
              </span>
              <span
                className="font-crimson italic text-sm block"
                style={{ color: 'var(--text-dim)' }}
              >
                {option.hint}
              </span>
            </button>
          ))}
        </div>

        {/* Footer warning */}
        <p
          className="font-crimson italic text-xs text-center"
          style={{ color: 'var(--text-dim)', opacity: 0.6 }}
        >
          La strada che non scegli non torna.
        </p>
      </div>
    </div>
  );
}
