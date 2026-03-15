import { useState } from 'react';
import { useArchive, Fragment } from '../hooks/useArchive';
import { CharacterSelectScreen, CharacterOption, PLACEHOLDER_CHARACTERS } from '../components/CharacterSelectScreen';
import { IntroScreen } from '../components/IntroScreen';
import { MapScreen } from '../components/MapScreen';
import { FragmentModal } from '../components/FragmentModal';
import { EndingScreen } from '../components/EndingScreen';

type Screen = 'character-select' | 'intro' | 'map';

// Axis → crystal color mapping
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

// Character → dominant axis mapping (priority: PERDITA > MAGIA > MENTE > VELOCITÀ > FORZA)
const CHARACTER_AXES: Record<string, string> = {
  // PERDITA wins
  'Sentius': 'PERDITA',
  'Draxis': 'PERDITA',
  'Ventus Nobilis': 'PERDITA',
  'Silvana': 'PERDITA',
  'Aegis': 'PERDITA',
  'Geminus': 'PERDITA',
  'Voltar': 'PERDITA',
  // MAGIA wins (not already in PERDITA)
  'Xaroth': 'MAGIA',
  'Lunara': 'MAGIA',
  'Pyraxis': 'MAGIA',
  'Morwen': 'MAGIA',
  // MENTE
  'Ferro Gentile': 'MENTE',
  'Lux Fragilis': 'MENTE',
  'Oculus Ferox': 'MENTE',
  'Nocturne': 'MENTE',
  'Mortis Rex': 'MENTE',
  // FORZA
  'Kragath': 'FORZA',
  'Tharsos': 'FORZA',
  'Umbrus': 'FORZA',
  'Pelagar': 'FORZA',
  'Terros': 'FORZA',
  'Radix Magnus': 'FORZA',
};

function getDominantAxis(characterName: string): string {
  return CHARACTER_AXES[characterName] || 'MENTE';
}

const Index = () => {
  const {
    data, loading, allFragments,
    isOpened, isUnlocked, openFragment,
    openedCount, totalCount,
    allMandatoryOpened, mandatoryOpenedCount, optionalOpenedCount,
  } = useArchive();

  const [screen, setScreen] = useState<Screen>('character-select');
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterOption | null>(null);
  const [selectedFragment, setSelectedFragment] = useState<Fragment | null>(null);
  const [showEnding, setShowEnding] = useState(false);

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

  return (
    <>
      {screen === 'character-select' && (
        <CharacterSelectScreen
          characters={PLACEHOLDER_CHARACTERS}
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
