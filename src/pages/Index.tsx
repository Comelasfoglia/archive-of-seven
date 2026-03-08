import { useState } from 'react';
import { useArchive, Fragment } from '../hooks/useArchive';
import { IntroScreen } from '../components/IntroScreen';
import { CharacterSelectScreen, CharacterOption, PLACEHOLDER_CHARACTERS } from '../components/CharacterSelectScreen';
import { MapScreen } from '../components/MapScreen';
import { FragmentModal } from '../components/FragmentModal';
import { EndingScreen } from '../components/EndingScreen';

type Screen = 'intro' | 'character-select' | 'map';

const Index = () => {
  const {
    data, loading, allFragments,
    isOpened, isUnlocked, openFragment,
    openedCount, totalCount,
    allMandatoryOpened, optionalOpenedCount,
  } = useArchive();

  const [screen, setScreen] = useState<Screen>('intro');
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

  return (
    <>
      {screen === 'intro' && (
        <IntroScreen
          title={data.meta.title}
          subtitle={data.meta.subtitle}
          introText={data.meta.intro_text}
          onEnter={() => setScreen('map')}
        />
      )}

      {screen === 'map' && (
        <MapScreen
          fragments={allFragments}
          isUnlocked={isUnlocked}
          isOpened={isOpened}
          onSelect={handleSelectFragment}
          playerName={data.meta.player.name}
          playerAxis={data.meta.player.axis}
          openedCount={openedCount}
          totalCount={totalCount}
          allMandatoryOpened={allMandatoryOpened}
          onFinale={() => setShowEnding(true)}
        />
      )}

      {selectedFragment && (
        <FragmentModal
          fragment={selectedFragment}
          onClose={() => setSelectedFragment(null)}
        />
      )}

      {showEnding && (
        <EndingScreen
          ending={ending}
          onClose={() => setShowEnding(false)}
        />
      )}
    </>
  );
};

export default Index;
