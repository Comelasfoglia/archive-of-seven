import { RuneSymbol } from './RuneIcons';

interface EndingScreenProps {
  ending: { title: string; text: string };
  onClose: () => void;
}

export function EndingScreen({ ending, onClose }: EndingScreenProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(7,7,16,0.92)', backdropFilter: 'blur(12px)' }}
        onClick={onClose}
      />
      <div className="relative w-full max-w-[640px] max-h-[85vh] overflow-y-auto animate-panel-enter panel-stone clip-stone p-8 md:p-12 text-center">
        <div className="flex justify-center mb-6">
          <RuneSymbol />
        </div>
        <h2
          className="font-cinzel text-3xl md:text-4xl font-bold uppercase tracking-[0.2em] mb-8"
          style={{ color: 'var(--crystal-gold)' }}
        >
          {ending.title}
        </h2>
        <div
          className="font-crimson text-lg leading-[1.9] whitespace-pre-line text-left"
          style={{ color: 'var(--text-primary)' }}
        >
          {ending.text}
        </div>
        <div className="mt-10 flex justify-center">
          <RuneSymbol />
        </div>
      </div>
    </div>
  );
}
