import { motion } from 'framer-motion';

interface AppMarkerProps {
  x: number;
  y: number;
  size?: 'normal' | 'small';
}

/**
 * Pulsing blue beacon. Placed in each scene on the element containing
 * the user's application. The minimap has the "myapp" label — no need
 * to duplicate it here.
 */
export function AppMarker({ x, y, size = 'normal' }: AppMarkerProps) {
  const r = size === 'small' ? 3 : 5;
  const pulseR = size === 'small' ? 6 : 10;

  return (
    <g>
      <motion.circle
        cx={x} cy={y} r={pulseR}
        fill="none" stroke="#4FC3F7" strokeWidth={1.5}
        animate={{ r: [pulseR, pulseR * 2, pulseR], opacity: [0.5, 0, 0.5] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      />
      <motion.circle
        cx={x} cy={y} r={r * 2}
        fill="#4FC3F7" opacity={0.15}
        animate={{ r: [r * 2, r * 2.5, r * 2], opacity: [0.15, 0.08, 0.15] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      />
      <circle cx={x} cy={y} r={r} fill="#4FC3F7" stroke="#fff" strokeWidth={1.5} />
      <circle cx={x} cy={y} r={r * 0.4} fill="#fff" />
    </g>
  );
}
