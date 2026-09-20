import { useState } from 'react';
import type { SceneProps } from '../types';

type Variant = 'classic' | 'hcp';

function VariantToggle({ variant, onChange }: { variant: Variant; onChange: (v: Variant) => void }) {
  return (
    <g>
      <rect
        x="155" y="12" width="80" height="18" rx="9"
        fill={variant === 'classic' ? '#FF6D00' : '#E0E0E0'}
        style={{ cursor: 'pointer' }}
        onClick={() => onChange('classic')}
      />
      <text
        x="195" y="24" fontSize="7" fill={variant === 'classic' ? '#fff' : '#666'}
        textAnchor="middle" fontWeight="bold"
        style={{ cursor: 'pointer', pointerEvents: 'none' }}
      >
        ROSA Classic
      </text>
      <rect
        x="240" y="12" width="70" height="18" rx="9"
        fill={variant === 'hcp' ? '#FF6D00' : '#E0E0E0'}
        style={{ cursor: 'pointer' }}
        onClick={() => onChange('hcp')}
      />
      <text
        x="275" y="24" fontSize="7" fill={variant === 'hcp' ? '#fff' : '#666'}
        textAnchor="middle" fontWeight="bold"
        style={{ cursor: 'pointer', pointerEvents: 'none' }}
      >
        ROSA HCP
      </text>
    </g>
  );
}

export function ClusterTypesScene({ mode }: SceneProps) {
  const b = mode === 'beginner';
  const [variant, setVariant] = useState<Variant>('classic');
  const isClassic = variant === 'classic';

  return (
    <g>
      <text x="20" y="24" fontSize="11" fill="#E65100" fontWeight="bold">
        {b ? 'How is your OpenShift cluster hosted?' : 'Cluster Deployment Variants'}
      </text>

      <VariantToggle variant={variant} onChange={setVariant} />

      {/* Red Hat zone */}
      <rect x="15" y="38" width="460" height={isClassic ? 70 : 130} rx="12" fill="#FDE8E8" stroke="#CC0000" strokeWidth="2" />
      <text x="30" y="55" fontSize="9" fill="#CC0000" fontWeight="bold">
        🔴 {b ? 'Red Hat Manages' : 'Red Hat (OCM + SRE)'}
      </text>

      {/* OCM + SRE boxes in Red Hat zone */}
      <rect x="30" y="62" width="110" height="36" rx="6" fill="#fff" stroke="#EF5350" strokeWidth="1" />
      <text x="40" y="76" fontSize="7" fill="#C62828" fontWeight="bold">🖥️ {b ? 'Cluster Details' : 'OCM Console'}</text>
      <rect x="45" y="82" width="60" height="12" rx="6" fill="#0066CC" />
      <text x="55" y="91" fontSize="5" fill="#fff" fontWeight="bold">Open console</text>

      <rect x="150" y="62" width="95" height="36" rx="6" fill="#fff" stroke="#EF5350" strokeWidth="1" />
      <text x="160" y="76" fontSize="7" fill="#C62828" fontWeight="bold">{b ? '👷 SRE Team' : '👷 SRE'}</text>
      <text x="160" y="88" fontSize="5" fill="#777">{b ? '24/7 monitoring & fixes' : 'Backplane, PagerDuty'}</text>

      <rect x="255" y="62" width="95" height="36" rx="6" fill="#fff" stroke="#EF5350" strokeWidth="1" />
      <text x="265" y="76" fontSize="7" fill="#C62828" fontWeight="bold">{b ? '⬆️ Upgrades' : isClassic ? '⬆️ CVO' : '⬆️ HyperShift'}</text>
      <text x="265" y="88" fontSize="5" fill="#777">{b ? 'Managed for you' : 'Upgrade policies'}</text>

      <rect x="360" y="62" width="105" height="36" rx="6" fill="#fff" stroke="#EF5350" strokeWidth="1" />
      <text x="370" y="76" fontSize="7" fill="#C62828" fontWeight="bold">{b ? '⚙️ Cluster Software' : '⚙️ Operators'}</text>
      <text x="370" y="88" fontSize="5" fill="#777">{b ? 'Monitoring, networking' : 'Ingress, DNS, auth'}</text>

      {/* HCP: Control Plane inside Red Hat zone */}
      {!isClassic && (
        <g>
          <rect x="30" y="105" width="435" height="52" rx="8" fill="#FFCDD2" stroke="#EF5350" strokeWidth="1.5" />
          <text x="45" y="120" fontSize="8" fill="#B71C1C" fontWeight="bold">
            {b ? '🧠 Control Plane (in Red Hat\'s AWS — you never see these!)' : '🧠 Hosted Control Plane (HyperShift)'}
          </text>
          <rect x="45" y="128" width="50" height="20" rx="3" fill="#fff" stroke="#EF9A9A" strokeWidth="1" />
          <text x="52" y="141" fontSize="5" fill="#C62828">{b ? 'Front Door' : 'API Server'}</text>
          <rect x="100" y="128" width="40" height="20" rx="3" fill="#fff" stroke="#EF9A9A" strokeWidth="1" />
          <text x="107" y="141" fontSize="5" fill="#C62828">{b ? 'Memory' : 'etcd'}</text>
          <rect x="145" y="128" width="50" height="20" rx="3" fill="#fff" stroke="#EF9A9A" strokeWidth="1" />
          <text x="152" y="141" fontSize="5" fill="#C62828">Scheduler</text>
          <rect x="200" y="128" width="60" height="20" rx="3" fill="#fff" stroke="#EF9A9A" strokeWidth="1" />
          <text x="207" y="141" fontSize="5" fill="#C62828">{b ? 'Auto-Fixer' : 'Controllers'}</text>
        </g>
      )}

      {/* PrivateLink for HCP */}
      {!isClassic && (
        <g>
          <rect x="200" y="162" width="80" height="18" rx="4" fill="#E8EAF6" stroke="#7986CB" strokeWidth="1" />
          <text x="213" y="174" fontSize="6" fill="#283593" fontWeight="bold">{b ? '🔒 Secure link' : '🔒 PrivateLink'}</text>
          <line x1="240" y1="157" x2="240" y2="162" stroke="#7986CB" strokeWidth="1.5" />
          <line x1="240" y1="180" x2="240" y2="190" stroke="#7986CB" strokeWidth="1.5" />
          <polygon points="237,187 240,193 243,187" fill="#7986CB" />
        </g>
      )}

      {/* AWS zone */}
      <rect x="15" y={isClassic ? 115 : 195} width="460" height={isClassic ? 185 : 130} rx="12" fill="#FFF8E1" stroke="#FF9900" strokeWidth="2" />
      <text x="30" y={isClassic ? 132 : 212} fontSize="9" fill="#E65100" fontWeight="bold">
        {isClassic
          ? (b ? '🟠 Your AWS Account' : '🟠 Customer AWS Account')
          : (b ? '🟠 Your AWS Account (workers only!)' : '🟠 Customer AWS (workers only)')
        }
      </text>

      {/* Classic: Control Plane inside AWS */}
      {isClassic && (
        <g>
          <rect x="30" y="140" width="290" height="52" rx="8" fill="#FFCDD2" stroke="#EF5350" strokeWidth="1.5" />
          <text x="45" y="155" fontSize="8" fill="#B71C1C" fontWeight="bold">
            {b ? '🧠 Control Plane (managed by Red Hat, runs HERE)' : '🧠 Control Plane (3× m5.xlarge)'}
          </text>
          <rect x="45" y="162" width="50" height="20" rx="3" fill="#fff" stroke="#EF9A9A" strokeWidth="1" />
          <text x="52" y="175" fontSize="5" fill="#C62828">{b ? 'Front Door' : 'API Server'}</text>
          <rect x="100" y="162" width="40" height="20" rx="3" fill="#fff" stroke="#EF9A9A" strokeWidth="1" />
          <text x="107" y="175" fontSize="5" fill="#C62828">{b ? 'Memory' : 'etcd'}</text>
          <rect x="145" y="162" width="50" height="20" rx="3" fill="#fff" stroke="#EF9A9A" strokeWidth="1" />
          <text x="152" y="175" fontSize="5" fill="#C62828">Scheduler</text>
          <rect x="200" y="162" width="60" height="20" rx="3" fill="#fff" stroke="#EF9A9A" strokeWidth="1" />
          <text x="207" y="175" fontSize="5" fill="#C62828">{b ? 'Auto-Fixer' : 'Controllers'}</text>
        </g>
      )}

      {/* OCP Console */}
      <rect x={isClassic ? 330 : 330} y={isClassic ? 140 : 218} width="135" height="52" rx="8" fill="#E0F2F1" stroke="#4DB6AC" strokeWidth="1.5" />
      <text x={isClassic ? 340 : 340} y={isClassic ? 155 : 233} fontSize="7" fill="#00695C" fontWeight="bold">🎛️ {b ? 'Cluster Console' : 'OCP Console'}</text>
      <text x={isClassic ? 340 : 340} y={isClassic ? 167 : 245} fontSize="5" fill="#00897B">{b ? 'Pods, deployments, logs' : 'Admin + Dev perspectives'}</text>
      <text x={isClassic ? 340 : 340} y={isClassic ? 179 : 257} fontSize="5" fill="#00897B">{b ? 'Manage YOUR apps here' : 'Workloads, RBAC, Storage'}</text>

      {/* Worker nodes */}
      <rect x="30" y={isClassic ? 200 : 218} width="290" height={isClassic ? 88 : 95} rx="8" fill="#F3E5F5" stroke="#BA68C8" strokeWidth="1" strokeDasharray="4 3" />
      <text x="40" y={isClassic ? 214 : 232} fontSize="7" fill="#6A1B9A" fontWeight="bold">
        {isClassic
          ? (b ? '🏗️ Machine Pool' : '🏗️ Machine Pool → ASG')
          : (b ? '🏗️ Node Pool' : '🏗️ Node Pool → ASG')
        }
      </text>
      {[0, 1, 2].map(i => (
        <g key={i}>
          <rect x={40 + i * 90} y={isClassic ? 220 : 238} width="80" height="55" rx="5" fill="#EDE7F6" stroke="#CE93D8" strokeWidth="0.8" />
          <text x={48 + i * 90} y={isClassic ? 232 : 250} fontSize="6" fill="#6A1B9A" fontWeight="bold">{b ? `Worker ${i + 1}` : `worker-${i + 1}`}</text>
          <rect x={46 + i * 90} y={isClassic ? 236 : 254} width="28" height="10" rx="2" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="0.5" />
          <rect x={46 + i * 90} y={isClassic ? 249 : 267} width="28" height="10" rx="2" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="0.5" />
          <rect x={78 + i * 90} y={isClassic ? 236 : 254} width="28" height="10" rx="2" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="0.5" />
          <rect x={78 + i * 90} y={isClassic ? 249 : 267} width="28" height="10" rx="2" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="0.5" />
        </g>
      ))}

      {/* "Open Console" arrow */}
      <line x1="75" y1="94" x2={isClassic ? 340 : 340} y2={isClassic ? 145 : 222} stroke="#CC0000" strokeWidth="1.5" strokeDasharray="4 3" />
      <polygon
        points={isClassic
          ? '335,142 346,148 338,152'
          : '335,219 346,225 338,229'
        }
        fill="#CC0000"
      />

      {/* Key difference callout */}
      <rect x="15" y={isClassic ? 308 : 333} width="460" height="42" rx="8" fill="rgba(255,255,255,0.8)" stroke="#E0E0E0" strokeWidth="1" />
      <text x="30" y={isClassic ? 324 : 349} fontSize="7" fill="#333" fontWeight="bold">
        {isClassic
          ? (b ? '📌 Classic: Control plane runs in YOUR AWS — Red Hat manages it, you pay for those machines'
                : '📌 Classic: 3 CP nodes (m5.xlarge) in-cluster. Customer pays for CP EC2. STS auth via IAM roles.')
          : (b ? '📌 HCP: Control plane in Red Hat\'s AWS — you never see or pay for it. Simpler, cheaper, ~10 min setup'
                : '📌 HCP: CP in Red Hat\'s AWS via HyperShift. Customer only pays for worker EC2. PrivateLink. ~10 min provision.')
        }
      </text>
      <text x="30" y={isClassic ? 340 : 365} fontSize="6" fill="#666">
        {b ? 'Switch between Classic and HCP above to see how the control plane moves ↑' : 'Toggle variants above to compare control plane placement'}
      </text>

      {/* Other cluster types sidebar */}
      <rect x="15" y={isClassic ? 358 : 383} width="460" height="30" rx="6" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="1" />
      <text x="30" y={isClassic ? 377 : 402} fontSize="6" fill="#555" fontWeight="bold">
        {b ? 'Other ways to run OpenShift:' : 'Other products:'}
      </text>
      <text x="190" y={isClassic ? 377 : 402} fontSize="6" fill="#888">
        {b ? 'OSD (AWS/GCP)  •  Assisted Installer (bare metal)  •  Register your own cluster' : 'OSD AWS/GCP (IAM user)  •  OCP Assisted Install  •  Registered (any OCP 4.x)'}
      </text>
    </g>
  );
}
