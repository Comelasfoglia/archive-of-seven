import { useState, useEffect, useCallback } from 'react';
import { Fragment } from '../hooks/useArchive';
import { FragmentIcon, RuneSymbol } from './RuneIcons';

interface FragmentModalProps {
  fragment: Fragment;
  onClose: () => void;
}

const typeColor: Record<string, string> = {
  documento: 'var(--crystal-blue)',
  audio: 'var(--crystal-gold)',
  oggetto: 'var(--crystal-violet)',
  testimonianza: 'var(--testimony-green)',
  diario: 'var(--diary-red)',
};

export function FragmentModal({ fragment, onClose }: FragmentModalProps) {
  const [showReveals, setShowReveals] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowReveals(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const color = typeColor[fragment.type] || 'var(--crystal-blue)';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(7,7,16,0.85)', backdropFilter: 'blur(8px)' }}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="relative w-full max-w-[680px] max-h-[85vh] overflow-y-auto panel-stone clip-stone p-4 sm:p-6 md:p-10"
        style={{ animation: 'panel-enter-flex 0.6s ease-out forwards' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center transition-opacity hover:opacity-100 opacity-60"
          style={{ color: 'var(--text-dim)' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16">
            <polygon points="8,1 15,8 8,15 1,8" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <line x1="5" y1="5" x2="11" y2="11" stroke="currentColor" strokeWidth="1.2" />
            <line x1="11" y1="5" x2="5" y2="11" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <FragmentIcon icon={fragment.icon} size={22} color={color} />
          <span className="font-mono-space text-xs" style={{ color: 'var(--text-dim)' }}>
            {fragment.id}
          </span>
          <span className="font-mono-space text-xs" style={{ color: 'var(--text-dim)' }}>
            {fragment.content.date}
          </span>
        </div>

        {/* Title */}
        <h2 className="font-cinzel text-2xl md:text-3xl font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
          {fragment.title}
        </h2>

        {/* Author */}
        <p className="font-crimson italic text-sm mb-4" style={{ color: 'var(--text-dim)' }}>
          {fragment.content.author}
        </p>

        {/* Separator with rune */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px" style={{ background: 'var(--border-stone)' }} />
          <RuneSymbol />
          <div className="flex-1 h-px" style={{ background: 'var(--border-stone)' }} />
        </div>

        {/* Body text */}
        <div
          className="font-crimson text-lg leading-[1.8] mb-6 whitespace-pre-line"
          style={{ color: 'var(--text-primary)' }}
        >
          {fragment.content.text}
        </div>

        {/* Notes */}
        {fragment.content.notes && (
          <div
            className="mb-6 pl-4 py-2 font-crimson text-sm leading-relaxed italic"
            style={{
              borderLeft: '2px solid var(--crystal-violet)',
              color: 'var(--text-dim)',
            }}
          >
            {fragment.content.notes}
          </div>
        )}

        {/* Reveals — delayed */}
        {showReveals && fragment.reveals && (
          <div className="animate-reveals mt-6 flex items-start gap-2">
            <RuneSymbol className="mt-1 flex-shrink-0" />
            <p className="font-crimson italic text-sm" style={{ color: 'var(--crystal-gold)' }}>
              {fragment.reveals}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
