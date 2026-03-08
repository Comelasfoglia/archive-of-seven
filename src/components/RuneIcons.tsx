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
      <rect x="3" y="3" width="18" height="18" stroke={color} strokeWidth="1.5" fill="none"
        style={{ clipPath: 'polygon(4px 0, calc(100% - 4px) 0, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px), 0 4px)' }}
      />
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
};

export function FragmentIcon({ icon, ...props }: IconProps & { icon: string }) {
  const Comp = iconMap[icon] || ScrollIcon;
  return <Comp {...props} />;
}
