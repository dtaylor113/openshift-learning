import { AppMarker } from '../AppMarker';
import { ZoomLink } from '../ZoomLink';
import type { SceneProps } from '../types';

export function PodScene({ mode, onNavigate }: SceneProps) {
  const b = mode === 'beginner';

  return (
    <g>
      {/* ---- Deployment overlay (management context, not a wrapper) ---- */}
      <rect x="15" y="8" width="470" height="195" rx="14" fill="none" stroke="#E57373" strokeWidth="2" strokeDasharray="6 4" />
      <rect x="20" y="12" width="200" height="16" rx="4" fill="#FFEBEE" />
      <text x="28" y="24" fontSize="8" fill="#C62828" fontWeight="bold">
        {b ? '📋 Deployment: "keep 3 copies running"' : '📋 Deployment: myapp (replicas: 3)'}
      </text>

      {/* ---- Pod (primary, detailed) ---- */}
      <rect x="25" y="35" width="220" height="160" rx="14" fill="#FFF3E0" stroke="#FFB74D" strokeWidth="2.5" />
      <text x="42" y="55" fontSize="11" fill="#E65100" fontWeight="bold">
        {b ? 'Pod (one or more containers)' : 'Pod: myapp-7d4f8b-x2k9p'}
      </text>

      {/* App container — clickable to zoom into Container level */}
      <g style={{ cursor: onNavigate ? 'pointer' : undefined }} onClick={() => onNavigate?.(1)}>
      <rect x="38" y="65" width="95" height="80" rx="8" fill="#E8F5E9" stroke="#4FC3F7" strokeWidth="2" />
      <text x="48" y="80" fontSize="8" fill="#2E7D32" fontWeight="bold">
        {b ? '📦 Container' : '📦 Container: app'}
      </text>
      <ZoomLink x={115} y={68} />
      <text x="48" y="92" fontSize="7" fill="#333" fontWeight="bold">myapp</text>
      <text x="48" y="104" fontSize="6" fill="#666">
        {b ? 'Handles requests' : ':8080'}
      </text>
      <rect x="45" y="110" width="80" height="14" rx="3" fill="#FFF9C4" />
      <text x="50" y="120" fontSize="6" fill="#F57F17">
        {b ? '❤️ Health check' : 'probe: /healthz'}
      </text>
      <rect x="45" y="127" width="80" height="12" rx="3" fill="#DCEDC8" />
      <text x="50" y="136" fontSize="6" fill="#33691E">
        {b ? '💾 Storage' : 'vol: /data'}
      </text>
      </g>

      {/* Sidecar container */}
      <rect x="142" y="65" width="95" height="80" rx="8" fill="#E3F2FD" stroke="#64B5F6" strokeWidth="1.5" />
      <text x="152" y="80" fontSize="8" fill="#1565C0" fontWeight="bold">
        {b ? '📦 Helper' : '📦 envoy-proxy'}
      </text>
      <text x="152" y="92" fontSize="7" fill="#333">
        {b ? 'Auto-security' : 'mTLS'}
      </text>
      <text x="152" y="104" fontSize="6" fill="#666">
        {b ? 'Log shipping' : 'metrics + logs'}
      </text>
      <rect x="149" y="110" width="80" height="14" rx="3" fill="#E1F5FE" />
      <text x="154" y="120" fontSize="6" fill="#0277BD">
        {b ? '🔒 Encrypts traffic' : 'L7 traffic shaping'}
      </text>

      {/* Dotted network lines between containers */}
      <line x1="133" y1="85" x2="142" y2="85" stroke="#FFB74D" strokeWidth="1.5" strokeDasharray="3 2" />
      <line x1="133" y1="100" x2="142" y2="100" stroke="#FFB74D" strokeWidth="1.5" strokeDasharray="3 2" />
      <line x1="133" y1="115" x2="142" y2="115" stroke="#FFB74D" strokeWidth="1.5" strokeDasharray="3 2" />

      {/* Shared network label */}
      <rect x="38" y="152" width="196" height="16" rx="4" fill="#FFE0B2" />
      <text x="48" y="163" fontSize="7" fill="#E65100" fontWeight="bold">
        {b ? '🌐 Connected via shared network (localhost)' : '🌐 Shared net namespace (localhost)'}
      </text>

      {/* ---- Replica pods (smaller, show the "3 copies" concept) ---- */}
      <rect x="260" y="35" width="100" height="100" rx="10" fill="#FFF3E0" stroke="#FFB74D" strokeWidth="1.5" opacity="0.8" />
      <text x="272" y="52" fontSize="8" fill="#E65100" fontWeight="bold">
        {b ? 'Copy 2' : 'pod-a8m3n'}
      </text>
      <rect x="270" y="58" width="35" height="22" rx="4" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="1" />
      <text x="276" y="72" fontSize="6" fill="#2E7D32">app</text>
      <rect x="310" y="58" width="35" height="22" rx="4" fill="#E3F2FD" stroke="#90CAF9" strokeWidth="1" />
      <text x="316" y="72" fontSize="6" fill="#1565C0">{b ? 'helper' : 'envoy'}</text>
      <line x1="305" y1="67" x2="310" y2="67" stroke="#FFB74D" strokeWidth="1" strokeDasharray="2 1" />

      <rect x="375" y="35" width="100" height="100" rx="10" fill="#FFF3E0" stroke="#FFB74D" strokeWidth="1.5" opacity="0.8" />
      <text x="387" y="52" fontSize="8" fill="#E65100" fontWeight="bold">
        {b ? 'Copy 3' : 'pod-q5w7r'}
      </text>
      <rect x="385" y="58" width="35" height="22" rx="4" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="1" />
      <text x="391" y="72" fontSize="6" fill="#2E7D32">app</text>
      <rect x="425" y="58" width="35" height="22" rx="4" fill="#E3F2FD" stroke="#90CAF9" strokeWidth="1" />
      <text x="431" y="72" fontSize="6" fill="#1565C0">{b ? 'helper' : 'envoy'}</text>
      <line x1="420" y1="67" x2="425" y2="67" stroke="#FFB74D" strokeWidth="1" strokeDasharray="2 1" />


      {/* "identical copies" label */}
      <text x="270" y="145" fontSize="7" fill="#BF360C" fontStyle="italic">
        {b ? '← identical copies, managed by the Deployment' : '← ReplicaSet pods (same spec, unique names)'}
      </text>

      {/* ---- Autoscaler overlay ---- */}
      <rect x="370" y="160" width="115" height="30" rx="6" fill="#FCE4EC" stroke="#F48FB1" strokeWidth="1.5" />
      <text x="382" y="174" fontSize="7" fill="#AD1457" fontWeight="bold">
        {b ? '📈 Auto-scaler' : 'HPA'}
      </text>
      <text x="382" y="185" fontSize="6" fill="#C2185B">
        {b ? 'Adds copies when busy' : 'min:2 max:10 cpu:70%'}
      </text>

      {/* ---- Service overlay ---- */}
      <rect x="40" y="215" width="430" height="65" rx="12" fill="#E8EAF6" stroke="#7986CB" strokeWidth="2.5" />
      <text x="65" y="236" fontSize="11" fill="#283593" fontWeight="bold">
        {b ? 'Service: one stable address for all copies' : 'Service: myapp-svc'}
      </text>
      <text x="65" y="252" fontSize="8" fill="#3949AB">
        {b ? 'Users hit this → traffic spreads to any healthy copy ⚖️' : 'ClusterIP: 172.30.45.120 • Port: 80 → 8080 • selector: app=myapp'}
      </text>
      <text x="65" y="266" fontSize="7" fill="#5C6BC0">
        {b ? 'If one copy is down, the Service skips it automatically' : 'EndpointSlices track pod IPs; kube-proxy rewrites via iptables DNAT'}
      </text>

      {/* Arrows from service up to pods */}
      <line x1="135" y1="215" x2="135" y2="200" stroke="#7986CB" strokeWidth="1.5" strokeDasharray="3 2" />
      <polygon points="131,203 135,195 139,203" fill="#7986CB" />
      <line x1="310" y1="215" x2="310" y2="140" stroke="#7986CB" strokeWidth="1.5" strokeDasharray="3 2" />
      <polygon points="306,143 310,135 314,143" fill="#7986CB" />
      <line x1="425" y1="215" x2="425" y2="140" stroke="#7986CB" strokeWidth="1.5" strokeDasharray="3 2" />
      <polygon points="421,143 425,135 429,143" fill="#7986CB" />

      {/* Internet traffic arrow into service */}
      <text x="250" y="310" fontSize="8" fill="#5C6BC0" textAnchor="middle">
        {b ? '🌐 Internet traffic enters here' : '🌐 Ingress / Route → Service'}
      </text>
      <line x1="250" y1="298" x2="250" y2="282" stroke="#7986CB" strokeWidth="2" />
      <polygon points="246,285 250,278 254,285" fill="#7986CB" />

      {/* Relationship callout */}
      <rect x="40" y="325" width="430" height="45" rx="8" fill="rgba(255,255,255,0.7)" stroke="#E0E0E0" strokeWidth="1" />
      <text x="55" y="342" fontSize="8" fill="#555" fontWeight="bold">
        {b ? '💡 How these pieces work together:' : '💡 Deployment + Service are controllers:'}
      </text>
      <text x="55" y="358" fontSize="7" fill="#777">
        {b
          ? 'Deployment → creates & maintains copies  |  Service → routes traffic to them  |  Auto-scaler → adds/removes copies'
          : 'Deployment → manages ReplicaSet → owns Pods  |  Service → selects Pods by label  |  HPA → scales replica count'}
      </text>

      <AppMarker x={88} y={85} size="small" />

    </g>
  );
}
