import { Fragment } from '../hooks/useArchive';
import { FragmentIcon } from './RuneIcons';

interface MapScreenProps {
  fragments: Fragment[];
  isUnlocked: (f: Fragment) => boolean;
  isOpened: (id: string) => boolean;
  onSelect: (f: Fragment) => void;
  playerName: string;
  playerAxis: string;
  openedCount: number;
  totalCount: number;
  allMandatoryOpened: boolean;
  onFinale: () => void;
}

const typeColor: Record<string, string> = {
  documento: 'var(--crystal-blue)',
  audio: 'var(--crystal-gold)',
  oggetto: 'var(--crystal-violet)',
  testimonianza: 'var(--testimony-green)',
  diario: 'var(--diary-red)',
};

const typeGlow: Record<string, string> = {
  documento: 'node-glow-blue',
  audio: 'node-glow-gold',
  oggetto: 'node-glow-violet',
  testimonianza: 'node-glow-green',
  diario: 'node-glow-red',
};

function HexNode({
  x, y, color, label, title, unlocked, opened, glowClass, icon, onClick,
}: {
  x: number; y: number; color: string; label: string; title: string;
  unlocked: boolean; opened: boolean; glowClass: string; icon: string;
  onClick: () => void;
}) {
  const nodeSize = 48;
  return (
    <g
      transform={`translate(${x}, ${y})`}
      className={`${unlocked ? `${glowClass} animate-node-pulse cursor-pointer` : 'node-locked cursor-not-allowed'} transition-all duration-700`}
      onClick={unlocked ? onClick : undefined}
    >
      {/* Hexagon shape */}
      <polygon
        points="-24,-14 0,-28 24,-14 24,14 0,28 -24,14"
        fill={unlocked ? (opened ? 'rgba(22,22,37,0.8)' : 'rgba(22,22,37,0.95)') : 'rgba(10,10,18,0.6)'}
        stroke={unlocked ? color : 'var(--rune-dim)'}
        strokeWidth={unlocked ? 1.5 : 1}
        strokeDasharray={unlocked ? 'none' : '4 3'}
      />
      {/* Icon inside */}
      <foreignObject x={-12} y={-12} width={24} height={24}>
        <div className="flex items-center justify-center w-full h-full">
          <FragmentIcon icon={icon} size={18} color={unlocked ? color : 'var(--rune-dim)'} />
        </div>
      </foreignObject>
      {/* Read mark */}
      {opened && unlocked && (
        <polygon
          points="18,-22 24,-18 21,-14"
          fill={color}
          fillOpacity="0.6"
        />
      )}
      {/* Labels below */}
      <text
        y={38}
        textAnchor="middle"
        fill={unlocked ? 'var(--text-dim)' : 'var(--rune-dim)'}
        fontSize="9"
        fontFamily="'Space Mono', monospace"
      >
        {label}
      </text>
      <text
        y={50}
        textAnchor="middle"
        fill={unlocked ? 'var(--text-primary)' : 'var(--rune-dim)'}
        fontSize="10"
        fontFamily="'Cinzel', serif"
      >
        {title.length > 16 ? title.slice(0, 15) + '…' : title}
      </text>
      {/* Locked tooltip */}
      {!unlocked && (
        <text
          y={62}
          textAnchor="middle"
          fill="var(--rune-dim)"
          fontSize="8"
          fontFamily="'Space Mono', monospace"
        >
          {'→ ' + (label[0] === 'O' ? '' : '') + '...'}
        </text>
      )}
    </g>
  );
}

export function MapScreen({
  fragments, isUnlocked, isOpened, onSelect,
  playerName, playerAxis, openedCount, totalCount,
  allMandatoryOpened, onFinale,
}: MapScreenProps) {
  // Build connections
  const connections: { from: Fragment; to: Fragment }[] = [];
  for (const f of fragments) {
    if (f.unlocksFrom) {
      const parent = fragments.find(p => p.id === f.unlocksFrom);
      if (parent) connections.push({ from: parent, to: f });
    }
  }

  return (
    <div className="fixed inset-0 bg-cavern flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 md:px-8 py-3 border-b" style={{ borderColor: 'var(--border-stone)' }}>
        <div className="flex items-center gap-3">
          <span className="font-cinzel text-sm" style={{ color: 'var(--text-primary)' }}>{playerName}</span>
          <span className="font-mono-space text-xs" style={{ color: 'var(--text-dim)' }}>{playerAxis}</span>
        </div>
        <span className="font-cinzel text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--rune-dim)' }}>ARCHIVIO</span>
        <span className="font-mono-space text-sm" style={{ color: 'var(--text-dim)' }}>{openedCount} / {totalCount}</span>
      </header>

      {/* Map area */}
      <div className="flex-1 overflow-auto relative">
        <svg
          viewBox="0 0 1000 600"
          className="w-full min-h-[500px] md:min-h-0 md:h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Connection lines */}
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

          {/* Fragment nodes */}
          {fragments.map(f => (
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
              onClick={() => onSelect(f)}
            />
          ))}

          {/* Finale node — octagram */}
          {allMandatoryOpened && (
            <g
              transform="translate(500, 520)"
              className="cursor-pointer"
              onClick={onFinale}
              style={{ animation: 'node-pulse 1.5s ease-in-out infinite' }}
            >
              {/* Outer glow */}
              <circle cx="0" cy="0" r="40" fill="var(--crystal-gold)" fillOpacity="0.08" />
              <circle cx="0" cy="0" r="28" fill="var(--crystal-gold)" fillOpacity="0.06" />
              {/* 8-pointed star */}
              <polygon
                points="0,-30 8,-10 28,-10 12,4 18,24 0,14 -18,24 -12,4 -28,-10 -8,-10"
                fill="var(--crystal-gold)"
                fillOpacity="0.2"
                stroke="var(--crystal-gold)"
                strokeWidth="1.5"
              />
              {/* Inner diamond */}
              <polygon
                points="0,-12 12,0 0,12 -12,0"
                fill="var(--crystal-gold)"
                fillOpacity="0.5"
              />
              {/* Label */}
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

      {/* Footer */}
      <footer className="text-center py-3">
        <span className="font-crimson italic text-sm" style={{ color: 'var(--text-dim)', opacity: 0.5 }}>
          Esplora. Connetti. Ricorda.
        </span>
      </footer>
    </div>
  );
}
