import { AppMarker } from '../AppMarker';
import { ZoomLink } from '../ZoomLink';
import type { SceneProps } from '../types';

function MiniNode({ x, y, label, pods, highlighted, variant }: {
  x: number; y: number; label: string; pods: number; highlighted?: boolean;
  variant?: 'worker' | 'infra';
}) {
  const isInfra = variant === 'infra';
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x="0" y="0" width="105" height="62" rx="7"
        fill={highlighted ? '#EDE7F6' : isInfra ? '#E3F2FD' : '#F3E5F5'}
        stroke={highlighted ? '#4FC3F7' : isInfra ? '#42A5F5' : '#BA68C8'}
        strokeWidth={highlighted ? 2.5 : 1.5}
      />
      <text x="8" y="15" fontSize="7" fill={highlighted ? '#0277BD' : isInfra ? '#1565C0' : '#6A1B9A'} fontWeight="bold">{label}</text>
      {Array.from({ length: Math.min(pods, 6) }).map((_, i) => (
        <rect key={i} x={8 + (i % 3) * 30} y={22 + Math.floor(i / 3) * 16} width="26" height="12" rx="3"
          fill={highlighted && i === 0 ? '#E1F5FE' : '#E8F5E9'}
          stroke={highlighted && i === 0 ? '#4FC3F7' : '#A5D6A7'}
          strokeWidth={highlighted && i === 0 ? 1.5 : 0.8}
        />
      ))}
    </g>
  );
}

export function ClusterScene({ mode, onNavigate }: SceneProps) {
  const b = mode === 'beginner';

  return (
    <g>
      {/* Cluster boundary */}
      <rect x="15" y="10" width="485" height="395" rx="18" fill="#E0F2F1" stroke="#4DB6AC" strokeWidth="3" />
      <text x="38" y="34" fontSize="13" fill="#00695C" fontWeight="bold">
        {b ? 'Kubernetes Cluster (all machines working together)' : 'Kubernetes Cluster (K8s)'}
      </text>

      {/* ---- Control Plane section ---- */}
      <rect x="35" y="45" width="450" height="100" rx="10" fill="#B2DFDB" stroke="#26A69A" strokeWidth="2" />
      <text x="52" y="63" fontSize="10" fill="#004D40" fontWeight="bold">
        {b ? '🧠 Control Plane Nodes — the cluster\'s "brain" (don\'t run your apps)' : '🧠 Control Plane Nodes (×3 HA)'}
      </text>

      {/* CP components */}
      <rect x="50" y="72" width="90" height="55" rx="5" fill="#fff" stroke="#4DB6AC" strokeWidth="1.5" />
      <text x="60" y="86" fontSize="7" fill="#00695C" fontWeight="bold">{b ? 'Front Door' : 'API Server'}</text>
      <text x="60" y="98" fontSize="6" fill="#00897B">{b ? 'All commands' : 'kube-apiserver'}</text>
      <text x="60" y="108" fontSize="6" fill="#00897B">{b ? 'go through here' : 'REST + admission'}</text>
      <text x="60" y="118" fontSize="6" fill="#00897B">{b ? '' : ':6443'}</text>

      <rect x="150" y="72" width="90" height="55" rx="5" fill="#fff" stroke="#4DB6AC" strokeWidth="1.5" />
      <text x="160" y="86" fontSize="7" fill="#00695C" fontWeight="bold">{b ? 'Memory' : 'etcd'}</text>
      <text x="160" y="98" fontSize="6" fill="#00897B">{b ? 'Remembers what' : 'Raft consensus'}</text>
      <text x="160" y="108" fontSize="6" fill="#00897B">{b ? 'should be running' : 'distributed KV'}</text>
      <text x="160" y="118" fontSize="6" fill="#00897B">{b ? '& where' : '3-member quorum'}</text>

      <rect x="250" y="72" width="90" height="55" rx="5" fill="#fff" stroke="#4DB6AC" strokeWidth="1.5" />
      <text x="260" y="86" fontSize="7" fill="#00695C" fontWeight="bold">Scheduler</text>
      <text x="260" y="98" fontSize="6" fill="#00897B">{b ? 'Picks which worker' : 'Scoring + filtering'}</text>
      <text x="260" y="108" fontSize="6" fill="#00897B">{b ? 'has room for' : 'affinity, taints,'}</text>
      <text x="260" y="118" fontSize="6" fill="#00897B">{b ? 'each new pod' : 'topology spread'}</text>

      <rect x="350" y="72" width="110" height="55" rx="5" fill="#fff" stroke="#4DB6AC" strokeWidth="1.5" />
      <text x="360" y="86" fontSize="7" fill="#00695C" fontWeight="bold">{b ? 'Auto-Fixer' : 'Controller Manager'}</text>
      <text x="360" y="98" fontSize="6" fill="#00897B">{b ? '"Want 3 pods but' : '~30 reconciliation'}</text>
      <text x="360" y="108" fontSize="6" fill="#00897B">{b ? 'only 2? I\'ll fix it"' : 'loops (Deployment,'}</text>
      <text x="360" y="118" fontSize="6" fill="#00897B">{b ? '' : 'Job, GC, etc.)'}</text>

      {/* ---- Worker Nodes section ---- */}
      <text x="45" y="168" fontSize="10" fill="#6A1B9A" fontWeight="bold">
        {b ? '⚙️ Worker Nodes — where your apps actually run' : '⚙️ Worker Nodes'}
      </text>

      {/* Machine Pool overlay */}
      <rect x="35" y="178" width="340" height="170" rx="10" fill="none" stroke="#9575CD" strokeWidth="1.2" strokeDasharray="5 3" />
      <text x="48" y="196" fontSize="7" fill="#4527A0" fontWeight="bold">
        {b ? '🏗️ Machine Pool (group of identical workers)' : '🏗️ Machine Pool: worker-pool (m5.xlarge)'}
      </text>

      {[
        { x: 50, y: 204, label: b ? 'Worker Node 1 ★' : 'worker-1', pods: 5, hl: true },
        { x: 168, y: 204, label: b ? 'Worker Node 2' : 'worker-2', pods: 4 },
        { x: 50, y: 278, label: b ? 'Worker Node 3' : 'worker-3', pods: 3 },
        { x: 168, y: 278, label: b ? 'Worker Node 4' : 'worker-4', pods: 5 },
      ].map((w, i) => (
        <g key={i} style={{ cursor: onNavigate ? 'pointer' : undefined }} onClick={() => onNavigate?.(3)}>
          <MiniNode x={w.x} y={w.y} label={w.label} pods={w.pods} highlighted={w.hl} />
          <ZoomLink x={w.x + 98} y={w.y + 6} />
        </g>
      ))}

      {/* Infra node */}
      <g transform="translate(390, 178)">
        <rect x="0" y="0" width="105" height="88" rx="7" fill="#E3F2FD" stroke="#42A5F5" strokeWidth="1.5" />
        <text x="8" y="16" fontSize="7" fill="#1565C0" fontWeight="bold">
          {b ? 'Infra Node' : 'infra-1'}
        </text>
        <rect x="8" y="25" width="88" height="16" rx="3" fill="#BBDEFB" />
        <text x="14" y="37" fontSize="6" fill="#0D47A1">
          {b ? 'Internet gateway' : 'Ingress Controller'}
        </text>
        <rect x="8" y="45" width="88" height="16" rx="3" fill="#BBDEFB" />
        <text x="14" y="57" fontSize="6" fill="#0D47A1">
          {b ? 'Health dashboards' : 'Monitoring'}
        </text>
        <rect x="8" y="65" width="88" height="16" rx="3" fill="#BBDEFB" />
        <text x="14" y="77" fontSize="6" fill="#0D47A1">
          {b ? 'Log collection' : 'Logging'}
        </text>
      </g>

      <AppMarker x={102} y={230} size="small" />

      {/* Arrows from control plane to workers */}
      <line x1="250" y1="145" x2="102" y2="204" stroke="#26A69A" strokeWidth="1" strokeDasharray="3 2" opacity="0.5" />
      <line x1="250" y1="145" x2="220" y2="204" stroke="#26A69A" strokeWidth="1" strokeDasharray="3 2" opacity="0.5" />
      <line x1="250" y1="145" x2="310" y2="204" stroke="#26A69A" strokeWidth="1" strokeDasharray="3 2" opacity="0.5" />
      <text x="250" y="160" fontSize="8" fill="#00695C" textAnchor="middle" fontWeight="bold" fontStyle="italic">
        {b ? 'brain tells workers what to run' : 'API server → kubelet scheduling'}
      </text>

      {/* External traffic */}
      <rect x="390" y="280" width="105" height="25" rx="6" fill="#E8EAF6" stroke="#7986CB" strokeWidth="1.5" />
      <text x="402" y="296" fontSize="7" fill="#283593" fontWeight="bold">
        {b ? '🌐 Internet in' : '🌐 Ingress'}
      </text>
      <line x1="442" y1="280" x2="442" y2="270" stroke="#42A5F5" strokeWidth="1.5" />
      <polygon points="439,273 442,266 445,273" fill="#42A5F5" />

      {/* Legend at bottom */}
      <rect x="35" y="355" width="450" height="35" rx="6" fill="rgba(255,255,255,0.6)" stroke="#B2DFDB" strokeWidth="1" />
      <text x="50" y="370" fontSize="7" fill="#00695C" fontWeight="bold">
        {b ? '💡 Control plane nodes = brain (decisions). Worker nodes = muscle (runs your stuff). They\'re different machines!' : '💡 CP nodes: API server, etcd, scheduler, controllers. Workers: kubelet + CRI-O + your pods. Separate failure domains.'}
      </text>
      <text x="50" y="382" fontSize="6" fill="#00897B">
        {b ? 'Machine Pools let you add/remove worker nodes as a group. Infra nodes handle cluster services (not your apps).' : 'Machine Pools (MachineSet + ASG). Infra nodes: tainted to only run router, monitoring, logging.'}
      </text>

    </g>
  );
}
