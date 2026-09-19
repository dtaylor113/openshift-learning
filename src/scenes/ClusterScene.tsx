import { AppMarker } from '../AppMarker';
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

export function ClusterScene({ mode }: SceneProps) {
  const b = mode === 'beginner';

  return (
    <g>
      {/* Cluster boundary */}
      <rect x="15" y="10" width="470" height="380" rx="18" fill="#E0F2F1" stroke="#4DB6AC" strokeWidth="3" />
      <text x="38" y="34" fontSize="13" fill="#00695C" fontWeight="bold">
        {b ? 'The Cluster (all machines working together)' : 'Kubernetes Cluster'}
      </text>

      {/* ---- Control Plane section ---- */}
      <rect x="35" y="45" width="435" height="100" rx="10" fill="#B2DFDB" stroke="#26A69A" strokeWidth="2" />
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
      <rect x="35" y="175" width="330" height="155" rx="10" fill="none" stroke="#9575CD" strokeWidth="1.2" strokeDasharray="5 3" />
      <text x="45" y="188" fontSize="7" fill="#4527A0" fontWeight="bold">
        {b ? '🏗️ Machine Pool (group of identical workers)' : '🏗️ Machine Pool: worker-pool (m5.xlarge)'}
      </text>

      <MiniNode x={48} y={195} label={b ? 'Worker 1 ★' : 'worker-1'} pods={5} highlighted />
      <MiniNode x={163} y={195} label={b ? 'Worker 2' : 'worker-2'} pods={4} />
      <MiniNode x={278} y={195} label={b ? 'Worker 3' : 'worker-3'} pods={6} />

      <MiniNode x={48} y={268} label={b ? 'Worker 4' : 'worker-4'} pods={3} />
      <MiniNode x={163} y={268} label={b ? 'Worker 5' : 'worker-5'} pods={5} />

      {/* Infra node */}
      <g transform="translate(378, 175)">
        <rect x="0" y="0" width="105" height="80" rx="7" fill="#E3F2FD" stroke="#42A5F5" strokeWidth="1.5" />
        <text x="8" y="15" fontSize="7" fill="#1565C0" fontWeight="bold">
          {b ? 'Infra Node' : 'infra-1'}
        </text>
        <rect x="8" y="22" width="88" height="14" rx="3" fill="#BBDEFB" />
        <text x="14" y="33" fontSize="6" fill="#0D47A1">
          {b ? 'Internet gateway' : 'Ingress Controller'}
        </text>
        <rect x="8" y="40" width="88" height="14" rx="3" fill="#BBDEFB" />
        <text x="14" y="51" fontSize="6" fill="#0D47A1">
          {b ? 'Health dashboards' : 'Monitoring'}
        </text>
        <rect x="8" y="58" width="88" height="14" rx="3" fill="#BBDEFB" />
        <text x="14" y="69" fontSize="6" fill="#0D47A1">
          {b ? 'Log collection' : 'Logging'}
        </text>
      </g>

      <AppMarker x={100} y={190} size="small" />

      {/* Arrows from control plane to workers */}
      <line x1="250" y1="145" x2="100" y2="195" stroke="#26A69A" strokeWidth="1" strokeDasharray="3 2" opacity="0.5" />
      <line x1="250" y1="145" x2="215" y2="195" stroke="#26A69A" strokeWidth="1" strokeDasharray="3 2" opacity="0.5" />
      <line x1="250" y1="145" x2="330" y2="195" stroke="#26A69A" strokeWidth="1" strokeDasharray="3 2" opacity="0.5" />
      <text x="250" y="158" fontSize="6" fill="#26A69A" textAnchor="middle" fontStyle="italic">
        {b ? 'brain tells workers what to run' : 'API server → kubelet scheduling'}
      </text>

      {/* External traffic */}
      <rect x="378" y="268" width="105" height="25" rx="6" fill="#E8EAF6" stroke="#7986CB" strokeWidth="1.5" />
      <text x="390" y="284" fontSize="7" fill="#283593" fontWeight="bold">
        {b ? '🌐 Internet in' : '🌐 Ingress'}
      </text>
      <line x1="430" y1="268" x2="430" y2="258" stroke="#42A5F5" strokeWidth="1.5" />
      <polygon points="427,261 430,254 433,261" fill="#42A5F5" />

      {/* Legend at bottom */}
      <rect x="35" y="345" width="435" height="35" rx="6" fill="rgba(255,255,255,0.6)" stroke="#B2DFDB" strokeWidth="1" />
      <text x="50" y="360" fontSize="7" fill="#00695C" fontWeight="bold">
        {b ? '💡 Control plane nodes = brain (decisions). Worker nodes = muscle (runs your stuff). They\'re different machines!' : '💡 CP nodes: API server, etcd, scheduler, controllers. Workers: kubelet + CRI-O + your pods. Separate failure domains.'}
      </text>
      <text x="50" y="372" fontSize="6" fill="#00897B">
        {b ? 'Machine Pools let you add/remove worker nodes as a group. Infra nodes handle cluster services (not your apps).' : 'Machine Pools (MachineSet + ASG). Infra nodes: tainted to only run router, monitoring, logging.'}
      </text>

    </g>
  );
}
