interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export function ScrollIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <polygon points="12,2 22,7 22,17 12,22 2,17 2,7" stroke={color} strokeWidth="1.5" fill="none" />
      <line x1="7" y1="9" x2="17" y2="9" stroke={color} strokeWidth="1" />
      <line x1="7" y1="12" x2="17" y2="12" stroke={color} strokeWidth="1" />
      <line x1="7" y1="15" x2="14" y2="15" stroke={color} strokeWidth="1" />
    </svg>
  );
}

export function WaveIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <polygon points="12,2 22,7 22,17 12,22 2,17 2,7" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M6 12 Q8 8, 10 12 Q12 16, 14 12 Q16 8, 18 12" stroke={color} strokeWidth="1.2" fill="none" />
    </svg>
  );
}

export function CrystalIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <polygon points="12,2 20,8 17,20 7,20 4,8" stroke={color} strokeWidth="1.5" fill="none" />
      <line x1="12" y1="2" x2="12" y2="20" stroke={color} strokeWidth="0.8" />
      <line x1="4" y1="8" x2="20" y2="8" stroke={color} strokeWidth="0.8" />
    </svg>
  );
}

export function EyeIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <polygon points="12,1 23,12 12,23 1,12" stroke={color} strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.2" fill="none" />
      <circle cx="12" cy="12" r="1" fill={color} />
    </svg>
  );
}

export function BookIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="3" width="18" height="18" stroke={color} strokeWidth="1.5" fill="none" />
      <line x1="12" y1="3" x2="12" y2="21" stroke={color} strokeWidth="1" />
      <line x1="7" y1="8" x2="11" y2="8" stroke={color} strokeWidth="0.8" />
      <line x1="7" y1="11" x2="11" y2="11" stroke={color} strokeWidth="0.8" />
      <line x1="13" y1="8" x2="17" y2="8" stroke={color} strokeWidth="0.8" />
      <line x1="13" y1="11" x2="17" y2="11" stroke={color} strokeWidth="0.8" />
    </svg>
  );
}

export function SealIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <polygon points="12,2 22,7 22,17 12,22 2,17 2,7" stroke={color} strokeWidth="1.5" fill="none" />
      <polygon points="12,6 17,9 17,15 12,18 7,15 7,9" stroke={color} strokeWidth="1" fill="none" />
      <circle cx="12" cy="12" r="2" stroke={color} strokeWidth="1" fill="none" />
    </svg>
  );
}

export function MapIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <polygon points="12,1 23,12 12,23 1,12" stroke={color} strokeWidth="1.5" fill="none" />
      <circle cx="8" cy="10" r="1" fill={color} />
      <circle cx="15" cy="9" r="1" fill={color} />
      <circle cx="12" cy="14" r="1" fill={color} />
      <line x1="8" y1="10" x2="15" y2="9" stroke={color} strokeWidth="0.6" strokeDasharray="2 2" />
      <line x1="15" y1="9" x2="12" y2="14" stroke={color} strokeWidth="0.6" strokeDasharray="2 2" />
    </svg>
  );
}

export function KeyIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <polygon points="12,2 22,7 22,17 12,22 2,17 2,7" stroke={color} strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="9" r="3" stroke={color} strokeWidth="1.2" fill="none" />
      <line x1="12" y1="12" x2="12" y2="18" stroke={color} strokeWidth="1.2" />
      <line x1="12" y1="16" x2="15" y2="16" stroke={color} strokeWidth="1" />
    </svg>
  );
}

export function FinaleIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <polygon points="12,1 15,8 23,9 17,14 19,22 12,18 5,22 7,14 1,9 9,8" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.2" />
    </svg>
  );
}

// --- New icons for v0.3 fragment types ---

export function StampIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="4" y="4" width="16" height="16" stroke={color} strokeWidth="1.5" fill="none" />
      <rect x="7" y="7" width="10" height="10" stroke={color} strokeWidth="0.8" fill="none" />
      <circle cx="12" cy="12" r="2.5" stroke={color} strokeWidth="1" fill="none" />
      <line x1="4" y1="4" x2="7" y2="7" stroke={color} strokeWidth="0.6" />
      <line x1="20" y1="4" x2="17" y2="7" stroke={color} strokeWidth="0.6" />
      <line x1="4" y1="20" x2="7" y2="17" stroke={color} strokeWidth="0.6" />
      <line x1="20" y1="20" x2="17" y2="17" stroke={color} strokeWidth="0.6" />
    </svg>
  );
}

export function BreakIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <polygon points="12,2 22,7 22,17 12,22 2,17 2,7" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M8 8 L12 12 L8 16" stroke={color} strokeWidth="1.2" fill="none" />
      <line x1="14" y1="8" x2="14" y2="16" stroke={color} strokeWidth="1.2" />
    </svg>
  );
}

export function QuillIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M18 3 C14 7, 10 13, 8 19" stroke={color} strokeWidth="1.3" fill="none" />
      <path d="M8 19 L6 21 L7 18 Z" fill={color} fillOpacity="0.5" stroke={color} strokeWidth="0.8" />
      <path d="M18 3 C19 5, 16 9, 14 11" stroke={color} strokeWidth="0.8" fill="none" strokeDasharray="2 2" />
    </svg>
  );
}

export function EnvelopeIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="6" width="18" height="12" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M3 6 L12 13 L21 6" stroke={color} strokeWidth="1" fill="none" />
    </svg>
  );
}

export function ListIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <polygon points="12,2 22,7 22,17 12,22 2,17 2,7" stroke={color} strokeWidth="1.5" fill="none" />
      <circle cx="8" cy="9" r="1" fill={color} />
      <line x1="11" y1="9" x2="17" y2="9" stroke={color} strokeWidth="0.8" />
      <circle cx="8" cy="12" r="1" fill={color} />
      <line x1="11" y1="12" x2="17" y2="12" stroke={color} strokeWidth="0.8" />
      <circle cx="8" cy="15" r="1" fill={color} />
      <line x1="11" y1="15" x2="17" y2="15" stroke={color} strokeWidth="0.8" />
    </svg>
  );
}

export function CompassIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" fill="none" />
      <polygon points="12,4 14,10 12,12 10,10" fill={color} fillOpacity="0.5" stroke={color} strokeWidth="0.6" />
      <polygon points="12,20 10,14 12,12 14,14" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="0.6" />
      <circle cx="12" cy="12" r="1.5" fill={color} fillOpacity="0.4" />
    </svg>
  );
}

export function VoiceAIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <polygon points="12,1 23,12 12,23 1,12" stroke={color} strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="10" r="3" stroke={color} strokeWidth="1" fill="none" />
      <path d="M8 16 Q12 20 16 16" stroke={color} strokeWidth="1" fill="none" />
    </svg>
  );
}

export function VoiceBIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <polygon points="12,1 23,12 12,23 1,12" stroke={color} strokeWidth="1.5" fill="none" />
      <circle cx="10" cy="10" r="2.5" stroke={color} strokeWidth="0.8" fill="none" />
      <circle cx="14" cy="10" r="2.5" stroke={color} strokeWidth="0.8" fill="none" />
      <path d="M8 16 Q12 19 16 16" stroke={color} strokeWidth="1" fill="none" />
    </svg>
  );
}

export function LockIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="6" y="11" width="12" height="9" stroke={color} strokeWidth="1.5" fill="none" rx="1" />
      <path d="M9 11 V8 A3 3 0 0 1 15 8 V11" stroke={color} strokeWidth="1.2" fill="none" />
      <circle cx="12" cy="15.5" r="1.5" fill={color} fillOpacity="0.5" />
    </svg>
  );
}

export function SelfIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="9" r="3" stroke={color} strokeWidth="1" fill="none" />
      <path d="M7 19 Q12 14 17 19" stroke={color} strokeWidth="1" fill="none" />
    </svg>
  );
}

export function ThresholdIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <line x1="4" y1="20" x2="4" y2="4" stroke={color} strokeWidth="1.5" />
      <line x1="20" y1="20" x2="20" y2="4" stroke={color} strokeWidth="1.5" />
      <line x1="4" y1="4" x2="8" y2="4" stroke={color} strokeWidth="1" />
      <line x1="16" y1="4" x2="20" y2="4" stroke={color} strokeWidth="1" />
      <line x1="4" y1="20" x2="8" y2="20" stroke={color} strokeWidth="1" />
      <line x1="16" y1="20" x2="20" y2="20" stroke={color} strokeWidth="1" />
      <circle cx="12" cy="12" r="2" fill={color} fillOpacity="0.4" stroke={color} strokeWidth="1" />
    </svg>
  );
}

export function RuneSymbol({ className }: { className?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" className={className}>
      <polygon points="6,0 12,6 6,12 0,6" fill="var(--crystal-gold)" fillOpacity="0.6" />
    </svg>
  );
}

const iconMap: Record<string, React.ComponentType<IconProps>> = {
  scroll: ScrollIcon,
  wave: WaveIcon,
  crystal: CrystalIcon,
  eye: EyeIcon,
  book: BookIcon,
  seal: SealIcon,
  map: MapIcon,
  key: KeyIcon,
  finale: FinaleIcon,
  stamp: StampIcon,
  break: BreakIcon,
  quill: QuillIcon,
  envelope: EnvelopeIcon,
  list: ListIcon,
  compass: CompassIcon,
  voice_a: VoiceAIcon,
  voice_b: VoiceBIcon,
  lock: LockIcon,
  self: SelfIcon,
  threshold: ThresholdIcon,
};

export function FragmentIcon({ icon, ...props }: IconProps & { icon: string }) {
  const Comp = iconMap[icon] || ScrollIcon;
  return <Comp {...props} />;
}
