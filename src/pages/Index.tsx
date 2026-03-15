import { useState, useEffect } from 'react';
import { useArchive, Fragment, CharacterLensEntry } from '../hooks/useArchive';
import { CharacterSelectScreen } from '../components/CharacterSelectScreen';
import { IntroScreen } from '../components/IntroScreen';
import { MapScreen } from '../components/MapScreen';
import { FragmentModal } from '../components/FragmentModal';
import { EndingScreen } from '../components/EndingScreen';

type Screen = 'character-select' | 'intro' | 'map';

// ... keep existing code (AXIS_COLORS, AXIS_PHRASES, CHARACTER_AXES, getDominantAxis)
const AXIS_COLORS: Record<string, string> = {
  PERDITA: '#8b3a3a',
  MAGIA: 'var(--crystal-violet)',
  MENTE: 'var(--crystal-blue)',
  VELOCITÀ: '#4fd4b8',
  FORZA: '#e8dcc8',
};

const AXIS_PHRASES: Record<string, string> = {
  PERDITA: "Qualcuno ha lasciato questo per qualcuno che non c'è più.\nForse sei tu.",
  MAGIA: "C'è qualcosa di vivo in questo archivio.\nNon sai ancora se ti aspettava.",
  MENTE: "Qualcuno ha costruito questo con una logica precisa.\nRiesci a vederla.",
  VELOCITÀ: "Qualcuno è passato di qui in fretta.\nHa lasciato più di quanto pensasse.",
  FORZA: "Qualcuno ha portato qualcosa di pesante fin qui.\nLo senti anche tu.",
};

const CHARACTER_AXES: Record<string, string> = {
  'Sentius': 'PERDITA',
  'Nocturne': 'PERDITA',
  'Mortis Rex': 'PERDITA',
  'Draxis': 'PERDITA',
  'Ventus Nobilis': 'PERDITA',
  'Silvana': 'PERDITA',
  'Aegis': 'PERDITA',
  'Voltar': 'PERDITA',
  'Geminus': 'PERDITA',
  'Xaroth': 'MAGIA',
  'Lunara': 'MAGIA',
  'Pyraxis': 'MAGIA',
  'Morwen': 'MAGIA',
  'Ferro Gentile': 'MENTE',
  'Lux Fragilis': 'MENTE',
  'Oculus Ferox': 'MENTE',
  'Kragath': 'VELOCITÀ',
  'Tharsos': 'FORZA',
  'Umbrus': 'FORZA',
  'Pelagar': 'FORZA',
  'Terros': 'FORZA',
  'Radix Magnus': 'FORZA',
};

function getDominantAxis(characterName: string): string {
  return CHARACTER_AXES[characterName] || 'MENTE';
}

function HomeButton({ onConfirm }: { onConfirm: () => void }) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="fixed top-3 left-3 z-[60] w-9 h-9 flex items-center justify-center transition-opacity duration-300 opacity-40 hover:opacity-90"
        title="Torna alla selezione"
        aria-label="Home"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M9 1L1 8h3v8h4v-5h2v5h4V8h3L9 1z"
            stroke="var(--text-dim)"
            strokeWidth="1.2"
            fill="none"
          />
        </svg>
      </button>

      {showConfirm && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-6">
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(7,7,16,0.85)', backdropFilter: 'blur(6px)' }}
            onClick={() => setShowConfirm(false)}
          />
          <div
            className="relative max-w-sm w-full p-6 text-center"
            style={{
              background: 'var(--bg-panel)',
              border: '1px solid var(--border-stone)',
              clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
            }}
          >
            <p className="font-crimson text-base leading-relaxed mb-2" style={{ color: 'var(--text-primary)' }}>
              Tornare alla selezione cancellerà tutti i progressi di questa sessione.
            </p>
            <p className="font-crimson italic text-sm mb-6" style={{ color: 'var(--text-dim)' }}>
              I frammenti aperti andranno persi.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowConfirm(false)}
                className="font-cinzel uppercase tracking-[0.15em] text-xs px-6 py-2 transition-all duration-300 hover:scale-105"
                style={{
                  color: 'var(--crystal-blue)',
                  border: '1px solid var(--rune-dim)',
                  background: 'transparent',
                }}
              >
                Resta
              </button>
              <button
                onClick={() => {
                  setShowConfirm(false);
                  onConfirm();
                }}
                className="font-cinzel uppercase tracking-[0.15em] text-xs px-6 py-2 transition-all duration-300 hover:scale-105"
                style={{
                  color: '#8b3a3a',
                  border: '1px solid rgba(139,58,58,0.4)',
                  background: 'transparent',
                }}
              >
                Esci
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const Index = () => {
  const {
    data, loading, allFragments, characters,
    isOpened, isUnlocked, openFragment,
    openedCount, totalCount,
    allMandatoryOpened, mandatoryOpenedCount, optionalOpenedCount,
    resetProgress,
  } = useArchive();

  const [screen, setScreen] = useState<Screen>('character-select');
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterLensEntry | null>(null);
  const [selectedFragment, setSelectedFragment] = useState<Fragment | null>(null);
  const [showEnding, setShowEnding] = useState(false);

  useEffect(() => {
    if (screen !== 'map') return;
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [screen]);

  const handleGoHome = () => {
    resetProgress();
    setSelectedCharacter(null);
    setSelectedFragment(null);
    setShowEnding(false);
    setScreen('character-select');
  };

  if (loading || !data) {
    return (
      <div className="fixed inset-0 bg-cavern flex items-center justify-center">
        <div className="animate-crystal-pulse font-cinzel tracking-[0.3em] text-sm" style={{ color: 'var(--rune-dim)' }}>
          ...
        </div>
      </div>
    );
  }

  const handleSelectFragment = (f: Fragment) => {
    openFragment(f.id);
    setSelectedFragment(f);
  };

  const ending = optionalOpenedCount >= 6 ? data.endings.deep : data.endings.surface;

  const dominantAxis = selectedCharacter ? getDominantAxis(selectedCharacter.name) : 'MENTE';
  const crystalColor = AXIS_COLORS[dominantAxis] || AXIS_COLORS.MENTE;
  const personalPhrase = AXIS_PHRASES[dominantAxis] || AXIS_PHRASES.MENTE;

  const showHomeButton = screen !== 'character-select';

  return (
    <>
      {showHomeButton && <HomeButton onConfirm={handleGoHome} />}

      {screen === 'character-select' && (
        <CharacterSelectScreen
          characters={characters}
          onConfirm={(char) => {
            setSelectedCharacter(char);
            setScreen('intro');
          }}
        />
      )}

      {screen === 'intro' && (
        <IntroScreen
          crystalColor={crystalColor}
          personalPhrase={personalPhrase}
          onEnter={() => setScreen('map')}
        />
      )}

      {screen === 'map' && (
        <MapScreen
          fragments={allFragments}
          isUnlocked={isUnlocked}
          isOpened={isOpened}
          onSelect={handleSelectFragment}
          playerName={selectedCharacter?.name ?? 'Archivista'}
          playerAxis={selectedCharacter?.assessment_archetype ?? ''}
          openedCount={openedCount}
          totalCount={totalCount}
          allMandatoryOpened={allMandatoryOpened}
          mandatoryOpenedCount={mandatoryOpenedCount}
          onFinale={() => setShowEnding(true)}
        />
      )}

      {selectedFragment && (
        <FragmentModal
          fragment={selectedFragment}
          playerName={selectedCharacter?.name ?? null}
          onClose={() => setSelectedFragment(null)}
        />
      )}

      {showEnding && (
        <EndingScreen
          ending={ending}
          playerName={selectedCharacter?.name ?? 'Archivista'}
          onRestart={() => {
            setShowEnding(false);
            setSelectedCharacter(null);
            setScreen('character-select');
          }}
          onReturn={() => {
            setShowEnding(false);
          }}
        />
      )}
    </>
  );
};

export default Index;
