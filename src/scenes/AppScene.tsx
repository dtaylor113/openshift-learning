import { AppMarker } from '../AppMarker';
import type { SceneProps } from '../types';

export function AppScene({ mode }: SceneProps) {
  const b = mode === 'beginner';

  return (
    <g>
      {/* Browser window */}
      <rect x="120" y="80" width="260" height="200" rx="12" fill="#fff" stroke="#90CAF9" strokeWidth="3" />
      {/* Title bar */}
      <rect x="120" y="80" width="260" height="32" rx="12" fill="#E3F2FD" />
      <rect x="120" y="100" width="260" height="12" fill="#E3F2FD" />
      {/* Traffic lights */}
      <circle cx="138" cy="96" r="5" fill="#EF5350" />
      <circle cx="154" cy="96" r="5" fill="#FFC107" />
      <circle cx="170" cy="96" r="5" fill="#66BB6A" />
      {/* URL bar */}
      <rect x="190" y="88" width="170" height="16" rx="8" fill="#fff" stroke="#BBDEFB" strokeWidth="1.5" />
      <text x="210" y="100" fontSize="8" fill="#1565C0" fontFamily="monospace">myapp.example.com</text>

      {/* App content area */}
      <rect x="135" y="125" width="230" height="12" rx="3" fill="#E3F2FD" />
      <rect x="135" y="145" width="180" height="8" rx="3" fill="#F5F5F5" />
      <rect x="135" y="158" width="200" height="8" rx="3" fill="#F5F5F5" />
      <rect x="135" y="171" width="160" height="8" rx="3" fill="#F5F5F5" />

      {/* Button */}
      <rect x="135" y="195" width="70" height="24" rx="6" fill="#4FC3F7" />
      <text x="152" y="211" fontSize="9" fill="#fff" fontWeight="bold">Get Started</text>

      {/* Decorative card */}
      <rect x="240" y="190" width="110" height="70" rx="6" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="1" />
      <rect x="250" y="200" width="90" height="8" rx="2" fill="#E0E0E0" />
      <rect x="250" y="214" width="70" height="6" rx="2" fill="#EEEEEE" />
      <rect x="250" y="226" width="80" height="6" rx="2" fill="#EEEEEE" />

      {/* Callout: what the browser is */}
      {b && (
        <g>
          <rect x="120" y="56" width="260" height="18" rx="4" fill="#E3F2FD" />
          <text x="140" y="69" fontSize="8" fill="#1565C0" fontWeight="bold">
            ↑ Your user's web browser — they typed in the address above
          </text>
        </g>
      )}

      {/* User icon */}
      <g transform="translate(250, 340)">
        <circle cx="0" cy="-12" r="14" fill="#FFE0B2" stroke="#FB8C00" strokeWidth="2" />
        <circle cx="0" cy="-16" r="6" fill="#FB8C00" />
        <path d="M-10,-4 Q0,8 10,-4" fill="#FB8C00" />
        {/* WiFi waves */}
        <path d="M25,-30 Q35,-40 45,-30" fill="none" stroke="#4FC3F7" strokeWidth="2" strokeLinecap="round" />
        <path d="M28,-25 Q35,-32 42,-25" fill="none" stroke="#4FC3F7" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M31,-20 Q35,-24 39,-20" fill="none" stroke="#4FC3F7" strokeWidth="1" strokeLinecap="round" />
      </g>

      {/* User label */}
      <text x="250" y="372" fontSize="8" fill="#FB8C00" textAnchor="middle" fontWeight="bold">
        {b ? 'A person using your app' : 'End user (HTTP client)'}
      </text>

      {/* Request arrow */}
      <line x1="280" y1="315" x2="280" y2="285" stroke="#4FC3F7" strokeWidth="2" strokeDasharray="4 3" />
      <polygon points="275,288 280,278 285,288" fill="#4FC3F7" />
      <text x="290" y="302" fontSize="8" fill="#4FC3F7" fontFamily="monospace">
        {b ? 'request' : 'HTTP GET'}
      </text>

      {/* App marker */}
      <AppMarker x={370} y={140} />
    </g>
  );
}
