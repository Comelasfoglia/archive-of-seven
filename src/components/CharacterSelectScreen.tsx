import { useState } from 'react';

export interface CharacterOption {
  name: string;
  assessment_archetype: string;
}

interface CharacterSelectScreenProps {
  characters: CharacterOption[];
  onConfirm: (character: CharacterOption) => void;
}

// Placeholder data until the real JSON arrives
export const PLACEHOLDER_CHARACTERS: CharacterOption[] = [
  { name: 'Kael', assessment_archetype: 'Il Cercatore' },
  { name: 'Lyra', assessment_archetype: 'La Tessitrice' },
  { name: 'Dren', assessment_archetype: 'Il Custode' },
  { name: 'Mira', assessment_archetype: 'La Veggente' },
  { name: 'Torin', assessment_archetype: 'Il Fabbro' },
  { name: 'Senna', assessment_archetype: 'La Nomade' },
  { name: 'Voss', assessment_archetype: 'Il Stratega' },
  { name: 'Elia', assessment_archetype: 'La Guaritrice' },
  { name: 'Rhan', assessment_archetype: 'Il Vagabondo' },
  { name: 'Nyx', assessment_archetype: "L'Ombra" },
  { name: 'Cael', assessment_archetype: 'Il Cronista' },
  { name: 'Iris', assessment_archetype: 'La Sognatrice' },
  { name: 'Brenn', assessment_archetype: 'Il Sentinella' },
  { name: 'Aura', assessment_archetype: 'La Risonante' },
  { name: 'Fenn', assessment_archetype: 'Il Costruttore' },
  { name: 'Liora', assessment_archetype: "L'Arcanista" },
  { name: 'Thal', assessment_archetype: 'Il Decifratore' },
  { name: 'Zara', assessment_archetype: 'La Ribelle' },
  { name: 'Orin', assessment_archetype: "L'Antico" },
  { name: 'Vera', assessment_archetype: 'La Memoria' },
  { name: 'Kira', assessment_archetype: 'La Fiamma' },
  { name: 'Syl', assessment_archetype: 'Il Silenzioso' },
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
