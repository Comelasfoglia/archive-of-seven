import { useState } from 'react';

export interface CharacterOption {
  name: string;
  assessment_archetype: string;
}

interface CharacterSelectScreenProps {
  characters: CharacterOption[];
  onConfirm: (character: CharacterOption) => void;
}

// Canonical characters from character_lens
export const PLACEHOLDER_CHARACTERS: CharacterOption[] = [
  { name: 'Xaroth', assessment_archetype: 'METODO' },
  { name: 'Ferro Gentile', assessment_archetype: 'TRADIZIONE' },
  { name: 'Kragath', assessment_archetype: 'IMPULSO' },
  { name: 'Tharsos', assessment_archetype: 'TRADIZIONE' },
  { name: 'Umbrus', assessment_archetype: 'MISTERO' },
  { name: 'Sentius', assessment_archetype: 'METODO' },
  { name: 'Voltar', assessment_archetype: 'MISTERO' },
  { name: 'Lunara', assessment_archetype: 'MISTERO' },
  { name: 'Nocturne', assessment_archetype: 'IMPULSO' },
  { name: 'Draxis', assessment_archetype: 'IMPULSO' },
  { name: 'Lux Fragilis', assessment_archetype: 'MISTERO' },
  { name: 'Pelagar', assessment_archetype: 'IMPULSO' },
  { name: 'Terros', assessment_archetype: 'TRADIZIONE' },
  { name: 'Pyraxis', assessment_archetype: 'IMPULSO' },
  { name: 'Aegis', assessment_archetype: 'EMPATIA' },
  { name: 'Silvana', assessment_archetype: 'MISTERO' },
  { name: 'Mortis Rex', assessment_archetype: 'TRADIZIONE' },
  { name: 'Radix Magnus', assessment_archetype: 'TRADIZIONE' },
  { name: 'Geminus', assessment_archetype: 'MISTERO' },
  { name: 'Oculus Ferox', assessment_archetype: 'METODO' },
  { name: 'Morwen', assessment_archetype: 'MISTERO' },
  { name: 'Ventus Nobilis', assessment_archetype: 'EMPATIA' },
];

export function CharacterSelectScreen({ characters, onConfirm }: CharacterSelectScreenProps) {
  const [selected, setSelected] = useState<CharacterOption | null>(null);

  return (
    <div className="fixed inset-0 flex flex-col items-center z-50 px-4 py-8 overflow-y-auto" style={{ background: 'var(--bg-deep)' }}>
      {/* Intro text */}
      <div className="max-w-lg text-center mt-8 mb-10">
        <p
          className="font-crimson text-base md:text-lg leading-relaxed"
          style={{ color: 'var(--text-primary)' }}
        >
          Prima di entrare, dicci chi sei.
        </p>
        <p
          className="font-crimson text-sm md:text-base mt-3 leading-relaxed"
          style={{ color: 'var(--text-dim)' }}
        >
          Se hai già usato il sistema di selezione, trovi il tuo nome lì.
          <br />
          Altrimenti, scegli il personaggio che senti più tuo.
        </p>
      </div>

      {/* Character grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-w-2xl w-full mb-10">
        {characters.map((char) => {
          const isSelected = selected?.name === char.name;
          return (
            <button
              key={char.name}
              onClick={() => setSelected(char)}
              className="group relative font-cinzel text-left px-4 py-3 transition-all duration-300"
              style={{
                border: `1px solid ${isSelected ? 'var(--crystal-violet)' : 'var(--rune-dim)'}`,
                background: isSelected
                  ? 'rgba(179, 157, 219, 0.08)'
                  : 'transparent',
                clipPath:
                  'polygon(6px 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0 calc(100% - 6px), 0 6px)',
              }}
            >
              <span
                className="block text-sm tracking-[0.15em] uppercase"
                style={{ color: isSelected ? 'var(--crystal-violet)' : 'var(--text-primary)' }}
              >
                {char.name}
              </span>
              <span
                className="block text-[11px] mt-1 italic"
                style={{ color: 'var(--text-dim)' }}
              >
                {char.assessment_archetype}
              </span>

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(79,195,247,0.06), rgba(179,157,219,0.06))',
                }}
              />
            </button>
          );
        })}
      </div>

      {/* Confirm button */}
      <button
        onClick={() => selected && onConfirm(selected)}
        disabled={!selected}
        className="group relative font-cinzel uppercase tracking-[0.25em] text-sm md:text-base px-10 py-4 transition-all duration-500 disabled:opacity-30 disabled:cursor-not-allowed hover:enabled:scale-105"
        style={{
          color: 'var(--crystal-blue)',
          border: '1px solid var(--rune-dim)',
          background: 'transparent',
          clipPath:
            'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
        }}
      >
        <span className="relative z-10">Entra nell'Archivio</span>
        <div
          className="absolute inset-0 opacity-0 group-hover:group-enabled:opacity-100 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(135deg, rgba(79,195,247,0.1), rgba(179,157,219,0.1))',
          }}
        />
      </button>
    </div>
  );
}
