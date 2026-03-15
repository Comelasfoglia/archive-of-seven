import { useState, useEffect, useRef } from 'react';
import { Fragment } from '../hooks/useArchive';
import { FragmentIcon } from './RuneIcons';

interface MapScreenProps {
  fragments: Fragment[];
  isUnlocked: (f: Fragment) => boolean;
  isOpened: (id: string) => boolean;
  isExcluded: (id: string) => boolean;
  onSelect: (f: Fragment) => void;
  playerName: string;
  playerAxis: string;
  openedCount: number;
  totalCount: number;
  allMandatoryOpened: boolean;
  onFinale: () => void;
  mandatoryOpenedCount: number;
}

const typeColor: Record<string, string> = {
  documento: 'var(--crystal-blue)',
  documento_alterato: 'var(--crystal-blue)',
  audio: 'var(--crystal-gold)',
  oggetto: 'var(--crystal-violet)',
  testimonianza: 'var(--testimony-green)',
  diario: 'var(--diary-red)',
  voce: 'var(--crystal-gold)',
  indice: 'var(--crystal-blue)',
  lettera: 'var(--crystal-violet)',
  lista: 'var(--crystal-blue)',
  mappa: 'var(--crystal-gold)',
  cifrato: 'var(--crystal-violet)',
  riflessione: 'var(--diary-red)',
  momento: 'var(--crystal-gold)',
};

const typeGlow: Record<string, string> = {
  documento: 'node-glow-blue',
  documento_alterato: 'node-glow-blue',
  audio: 'node-glow-gold',
  oggetto: 'node-glow-violet',
  testimonianza: 'node-glow-green',
  diario: 'node-glow-red',
  voce: 'node-glow-gold',
  indice: 'node-glow-blue',
  lettera: 'node-glow-violet',
  lista: 'node-glow-blue',
  mappa: 'node-glow-gold',
  cifrato: 'node-glow-violet',
  riflessione: 'node-glow-red',
  momento: 'node-glow-gold',
};

function ReadRune({ color }: { color: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10">
      <polygon points="5,0 10,5 5,10 0,5" fill={color} fillOpacity="0.5" />
      <circle cx="5" cy="5" r="1.5" fill={color} fillOpacity="0.8" />
    </svg>
  );
}

function HexNode({
  x, y, color, label, title, unlocked, opened, excluded, glowClass, icon, onClick,
  prerequisiteTitle, prerequisiteIcon, prerequisiteColor,
  prerequisitePos, justUnlocked,
  onHover,
}: {
  x: number; y: number; color: string; label: string; title: string;
  unlocked: boolean; opened: boolean; excluded: boolean; glowClass: string; icon: string;
  onClick: () => void;
  prerequisiteTitle?: string;
  prerequisiteIcon?: string;
  prerequisiteColor?: string;
  prerequisitePos?: { x: number; y: number };
  justUnlocked?: boolean;
  onHover?: (hovering: boolean) => void;
}) {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => { setHovered(true); onHover?.(true); };
  const handleMouseLeave = () => { setHovered(false); onHover?.(false); };

  // Excluded nodes: very dim, grayscale, not clickable
  if (excluded) {
    return (
      <g
        transform={`translate(${x}, ${y})`}
        className="cursor-not-allowed transition-all duration-700"
        style={{ transform: `translate(${x}px, ${y}px)`, opacity: 0.2, filter: 'grayscale(1) sepia(0.3)' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <polygon
          points="-24,-14 0,-28 24,-14 24,14 0,28 -24,14"
          fill="rgba(10,10,18,0.6)"
          stroke="var(--rune-dim)"
          strokeWidth="1"
          strokeDasharray="4 3"
        />
        <foreignObject x={-12} y={-12} width={24} height={24}>
          <div className="flex items-center justify-center w-full h-full">
            <FragmentIcon icon={icon} size={18} color="var(--rune-dim)" />
          </div>
        </foreignObject>
        {/* Small X mark */}
        <text
          x={16} y={22}
          textAnchor="middle"
          fill="var(--text-dim)"
          fontSize="8"
          fontFamily="'Space Mono', monospace"
          fillOpacity="0.5"
        >
          ✕
        </text>
        <text y={38} textAnchor="middle" fill="var(--rune-dim)" fontSize="9" fontFamily="'Space Mono', monospace">
          {label}
        </text>
        <text y={50} textAnchor="middle" fill="var(--rune-dim)" fontSize="10" fontFamily="'Cinzel', serif">
          {title.length > 16 ? title.slice(0, 15) + '…' : title}
        </text>
        {/* Excluded tooltip */}
        {hovered && (
          <g>
            <rect
              x={-90} y={-52} width={180} height={22} rx={2}
              fill="rgba(10,10,18,0.92)"
              stroke="var(--border-stone)"
              strokeWidth="0.5"
            />
            <text
              y={-37}
              textAnchor="middle"
              fill="var(--text-dim)"
              fontSize="9"
              fontFamily="'Crimson Pro', serif"
              fontStyle="italic"
            >
              Hai scelto un'altra strada.
            </text>
          </g>
        )}
      </g>
    );
  }

  const openedScale = opened && unlocked ? 'scale(0.9)' : 'scale(1)';
  const openedGlowClass = opened && unlocked ? '' : glowClass;
  const openedGlowReduced = opened && unlocked ? 'node-glow-read' : '';

  return (
    <g
      transform={`translate(${x}, ${y})`}
      className={`${unlocked ? `${openedGlowClass} ${openedGlowReduced} ${justUnlocked ? 'animate-unlock-pulse' : 'animate-node-pulse'} cursor-pointer` : 'node-locked cursor-not-allowed'} transition-all duration-700`}
      onClick={unlocked ? onClick : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ transform: `translate(${x}px, ${y}px)` }}
    >
      <g style={{ transform: openedScale, transformOrigin: '0 0', transition: 'transform 0.5s ease' }}>
        <polygon
          points="-24,-14 0,-28 24,-14 24,14 0,28 -24,14"
          fill={unlocked ? (opened ? 'rgba(22,22,37,0.8)' : 'rgba(22,22,37,0.95)') : 'rgba(10,10,18,0.6)'}
          stroke={unlocked ? color : 'var(--rune-dim)'}
          strokeWidth={unlocked ? 1.5 : 1}
          strokeDasharray={unlocked ? 'none' : '4 3'}
        />
        <foreignObject x={-12} y={-12} width={24} height={24}>
          <div className="flex items-center justify-center w-full h-full">
            <FragmentIcon icon={icon} size={18} color={unlocked ? color : 'var(--rune-dim)'} />
          </div>
        </foreignObject>
        {opened && unlocked && (
          <foreignObject x={12} y={12} width={14} height={14}>
            <ReadRune color={color} />
          </foreignObject>
        )}
        {!unlocked && prerequisiteIcon && prerequisiteColor && (
          <foreignObject x={14} y={14} width={14} height={14}>
            <div className="flex items-center justify-center w-full h-full" style={{ opacity: 0.6 }}>
              <FragmentIcon icon={prerequisiteIcon} size={10} color={prerequisiteColor} />
            </div>
          </foreignObject>
        )}
      </g>
      <text y={38} textAnchor="middle" fill={unlocked ? 'var(--text-dim)' : 'var(--rune-dim)'} fontSize="9" fontFamily="'Space Mono', monospace">
        {label}
      </text>
      <text y={50} textAnchor="middle" fill={unlocked ? 'var(--text-primary)' : 'var(--rune-dim)'} fontSize="10" fontFamily="'Cinzel', serif">
        {title.length > 16 ? title.slice(0, 15) + '…' : title}
      </text>
      {!unlocked && hovered && prerequisiteTitle && (
        <g>
          <rect x={-90} y={-52} width={180} height={22} rx={2} fill="rgba(10,10,18,0.92)" stroke="var(--border-stone)" strokeWidth="0.5" />
          <text y={-37} textAnchor="middle" fill="var(--text-dim)" fontSize="9" fontFamily="'Crimson Pro', serif" fontStyle="italic">
            {`Leggi prima: ${prerequisiteTitle}`}
          </text>
        </g>
      )}
      {!unlocked && hovered && prerequisitePos && (
        <line
          x1={0} y1={0}
          x2={prerequisitePos.x - x} y2={prerequisitePos.y - y}
          stroke="var(--text-dim)" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.5"
          className="animate-dash"
        />
      )}
    </g>
  );
}

export function MapScreen({
  fragments, isUnlocked, isOpened, isExcluded, onSelect,
  playerName, playerAxis, openedCount, totalCount,
  allMandatoryOpened, onFinale, mandatoryOpenedCount,
}: MapScreenProps) {
  const [justUnlockedIds, setJustUnlockedIds] = useState<Set<string>>(new Set());
  const prevOpenedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const currentOpened = new Set(fragments.filter(f => isOpened(f.id)).map(f => f.id));
    const newlyOpened = [...currentOpened].filter(id => !prevOpenedRef.current.has(id));

    if (newlyOpened.length > 0) {
      const newlyUnlocked = new Set<string>();
      for (const f of fragments) {
        if (f.unlocksFrom && newlyOpened.includes(f.unlocksFrom) && !currentOpened.has(f.id)) {
          newlyUnlocked.add(f.id);
        }
      }
      if (newlyUnlocked.size > 0) {
        setJustUnlockedIds(newlyUnlocked);
        const timer = setTimeout(() => setJustUnlockedIds(new Set()), 3000);
        return () => clearTimeout(timer);
      }
    }
    prevOpenedRef.current = currentOpened;
  }, [fragments, isOpened]);

  // Build connections — skip excluded nodes
  const connections: { from: Fragment; to: Fragment }[] = [];
  for (const f of fragments) {
    if (f.unlocksFrom && !isExcluded(f.id)) {
      const parent = fragments.find(p => p.id === f.unlocksFrom);
      if (parent) connections.push({ from: parent, to: f });
    }
  }

  const fragmentById = Object.fromEntries(fragments.map(f => [f.id, f]));

  return (
    <div className="fixed inset-0 bg-cavern flex flex-col">
      <header className="border-b" style={{ borderColor: 'var(--border-stone)' }}>
        <div className="flex items-center justify-center px-4 md:px-8 pt-3 pb-1">
          <span className="font-cinzel text-xs tracking-[0.3em] uppercase ml-8 md:ml-0" style={{ color: 'var(--rune-dim)' }}>ARCHIVIO</span>
        </div>
        <div className="flex items-center justify-between px-4 md:px-8 pb-3">
          <div className="flex items-center gap-3">
            <span className="font-cinzel text-sm" style={{ color: 'var(--text-primary)' }}>{playerName}</span>
            <span className="font-mono-space text-xs" style={{ color: 'var(--text-dim)' }}>{playerAxis}</span>
          </div>
          {allMandatoryOpened ? (
            <span className="font-cinzel text-lg" style={{ color: 'var(--crystal-gold)' }}>⊕</span>
          ) : (
            <span className="font-mono-space text-sm" style={{ color: 'var(--text-dim)' }}>{mandatoryOpenedCount} / 6</span>
          )}
        </div>
      </header>

      <div className="flex-1 overflow-auto relative">
        <svg
          viewBox="0 0 1000 600"
          className="w-full min-h-[500px] md:min-h-0 md:h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {connections.map(({ from, to }) => (
            <line
              key={`${from.id}-${to.id}`}
              x1={from.position.x * 10}
              y1={from.position.y * 6}
              x2={to.position.x * 10}
              y2={to.position.y * 6}
              stroke="var(--crystal-blue)"
              strokeOpacity="0.2"
              strokeWidth="1"
              className="connection-line"
            />
          ))}

          {fragments.map(f => {
            const prereq = f.unlocksFrom ? fragmentById[f.unlocksFrom] : null;
            const prereqColor = prereq ? (typeColor[prereq.type] || 'var(--crystal-blue)') : undefined;
            const excluded = isExcluded(f.id);
            return (
              <HexNode
                key={f.id}
                x={f.position.x * 10}
                y={f.position.y * 6}
                color={typeColor[f.type] || 'var(--crystal-blue)'}
                glowClass={typeGlow[f.type] || 'node-glow-blue'}
                label={f.id}
                title={f.title}
                icon={f.icon}
                unlocked={isUnlocked(f)}
                opened={isOpened(f.id)}
                excluded={excluded}
                onClick={() => onSelect(f)}
                prerequisiteTitle={prereq?.title}
                prerequisiteIcon={prereq?.icon}
                prerequisiteColor={prereqColor}
                prerequisitePos={prereq ? { x: prereq.position.x * 10, y: prereq.position.y * 6 } : undefined}
                justUnlocked={justUnlockedIds.has(f.id)}
              />
            );
          })}

          {allMandatoryOpened && (
            <g
              transform="translate(500, 520)"
              className="cursor-pointer"
              onClick={onFinale}
              style={{ animation: 'node-pulse 1.5s ease-in-out infinite' }}
            >
              <circle cx="0" cy="0" r="40" fill="var(--crystal-gold)" fillOpacity="0.08" />
              <circle cx="0" cy="0" r="28" fill="var(--crystal-gold)" fillOpacity="0.06" />
              <polygon
                points="0,-30 8,-10 28,-10 12,4 18,24 0,14 -18,24 -12,4 -28,-10 -8,-10"
                fill="var(--crystal-gold)"
                fillOpacity="0.2"
                stroke="var(--crystal-gold)"
                strokeWidth="1.5"
              />
              <polygon
                points="0,-12 12,0 0,12 -12,0"
                fill="var(--crystal-gold)"
                fillOpacity="0.5"
              />
              <text
                y={46}
                textAnchor="middle"
                fill="var(--crystal-gold)"
                fontSize="11"
                fontFamily="'Cinzel', serif"
                fontWeight="700"
                letterSpacing="0.4em"
              >
                FINE
              </text>
            </g>
          )}
        </svg>
      </div>

      <footer className="text-center py-3">
        <span className="font-crimson italic text-sm" style={{ color: 'var(--text-dim)', opacity: 0.5 }}>
          Esplora. Connetti. Ricorda.
        </span>
      </footer>
    </div>
  );
}
