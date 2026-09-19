import { AppMarker } from '../AppMarker';
import type { SceneProps } from '../types';

export function ContainerScene({ mode }: SceneProps) {
  const b = mode === 'beginner';

  return (
    <g>
      {/* Container box */}
      <rect x="80" y="60" width="340" height="280" rx="16" fill="#E8F5E9" stroke="#81C784" strokeWidth="3" strokeDasharray="8 4" />
      <text x="100" y="88" fontSize="13" fill="#2E7D32" fontWeight="bold" fontFamily="monospace">
        {b ? '📦 Container' : '📦 Container'}
      </text>

      {/* Container image label */}
      <rect x="220" y="72" width="180" height="20" rx="6" fill="#C8E6C9" />
      <text x="230" y="86" fontSize="9" fill="#1B5E20" fontFamily="monospace">
        {b ? 'version: myapp v1.2.3' : 'image: myapp:v1.2.3'}
      </text>

      {/* Beginner: what is a container callout */}
      {b && (
        <g>
          <rect x="80" y="36" width="340" height="18" rx="4" fill="#C8E6C9" />
          <text x="100" y="49" fontSize="8" fill="#1B5E20" fontWeight="bold">
            ↓ A sealed box containing your app + everything it needs to run
          </text>
        </g>
      )}

      {/* App process inside */}
      <rect x="140" y="120" width="220" height="120" rx="10" fill="#fff" stroke="#4FC3F7" strokeWidth="2.5" />
      <rect x="136" y="116" width="228" height="128" rx="12" fill="none" stroke="#4FC3F7" strokeWidth="1" strokeOpacity="0.3" />
      <text x="160" y="145" fontSize="11" fill="#333" fontWeight="bold">
        {b ? 'Your App (myapp)' : 'App Process — PID 1'}
      </text>
      <text x="160" y="162" fontSize="9" fill="#666" fontFamily="monospace">
        {b ? 'Running and listening for requests' : 'node server.js → :8080'}
      </text>

      {/* Mini browser ghost */}
      <g opacity="0.35">
        <rect x="180" y="178" width="70" height="45" rx="4" fill="#fff" stroke="#90CAF9" strokeWidth="1" />
        <rect x="180" y="178" width="70" height="9" rx="4" fill="#E3F2FD" />
        <circle cx="186" cy="182" r="1.5" fill="#EF5350" />
        <circle cx="191" cy="182" r="1.5" fill="#FFC107" />
        <circle cx="196" cy="182" r="1.5" fill="#66BB6A" />
        <rect x="186" y="193" width="50" height="3" rx="1" fill="#E3F2FD" />
        <rect x="186" y="200" width="40" height="2" rx="1" fill="#F5F5F5" />
      </g>
      <text x="255" y="200" fontSize="7" fill="#90CAF9" fontStyle="italic">
        {b ? '← what users see' : '← served content'}
      </text>

      {/* Dependencies */}
      <rect x="110" y="253" width="110" height="24" rx="5" fill="#DCEDC8" />
      <text x="120" y="269" fontSize="8" fill="#33691E">
        {b ? 'App libraries' : 'node_modules/'}
      </text>

      <rect x="230" y="253" width="110" height="24" rx="5" fill="#DCEDC8" />
      <text x="240" y="269" fontSize="8" fill="#33691E">
        {b ? 'System tools' : 'runtime libs'}
      </text>

      <rect x="110" y="283" width="230" height="24" rx="5" fill="#DCEDC8" />
      <text x="120" y="299" fontSize="8" fill="#33691E">
        {b ? 'Mini operating system (read-only, shared)' : 'OS filesystem (read-only overlay layers)'}
      </text>

      {/* Isolation indicators */}
      <g transform="translate(100, 315)">
        <rect x="0" y="0" width="95" height="22" rx="6" fill="#A5D6A7" />
        <text x="10" y="15" fontSize="7" fill="#1B5E20" fontWeight="bold">
          {b ? '🔒 Isolated space' : '🔒 namespace'}
        </text>
      </g>
      <g transform="translate(205, 315)">
        <rect x="0" y="0" width="95" height="22" rx="6" fill="#A5D6A7" />
        <text x="10" y="15" fontSize="7" fill="#1B5E20" fontWeight="bold">
          {b ? '📊 Resource limits' : '📊 cgroups'}
        </text>
      </g>
      <g transform="translate(310, 315)">
        <rect x="0" y="0" width="95" height="22" rx="6" fill="#A5D6A7" />
        <text x="10" y="15" fontSize="7" fill="#1B5E20" fontWeight="bold">
          {b ? '📁 Own filesystem' : '📁 overlayfs'}
        </text>
      </g>

      <AppMarker x={370} y={140} />
    </g>
  );
}
