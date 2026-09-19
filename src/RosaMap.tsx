import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ExplainMode } from './types';

type RosaVariant = 'classic' | 'hcp';

interface RosaMapProps {
  mode: ExplainMode;
  onModeChange: (mode: ExplainMode) => void;
}

function ClassicDiagram({ b }: { b: boolean }) {
  return (
    <svg viewBox="0 0 800 420" className="rosa-svg">
      {/* Red Hat zone */}
      <rect x="10" y="10" width="780" height="100" rx="14" fill="#FDE8E8" stroke="#CC0000" strokeWidth="2" />
      <text x="30" y="38" fontSize="14" fill="#CC0000" fontWeight="bold">
        {b ? '🔴 Red Hat Manages' : '🔴 Red Hat (OCM + SRE)'}
      </text>

      {/* OCM Console */}
      <rect x="30" y="50" width="200" height="48" rx="8" fill="#fff" stroke="#EF5350" strokeWidth="1.5" />
      <text x="45" y="70" fontSize="10" fill="#C62828" fontWeight="bold">🖥️ {b ? 'Your Dashboard' : 'OCM Console'}</text>
      <text x="45" y="84" fontSize="7" fill="#999" fontFamily="monospace">console.redhat.com/openshift</text>

      {/* SRE */}
      <rect x="250" y="50" width="130" height="48" rx="8" fill="#fff" stroke="#EF5350" strokeWidth="1.5" />
      <text x="265" y="70" fontSize="10" fill="#C62828" fontWeight="bold">{b ? '👷 SRE Team' : '👷 SRE'}</text>
      <text x="265" y="84" fontSize="7" fill="#999">{b ? '24/7 monitoring' : 'Backplane, PagerDuty'}</text>

      {/* Upgrades */}
      <rect x="400" y="50" width="130" height="48" rx="8" fill="#fff" stroke="#EF5350" strokeWidth="1.5" />
      <text x="415" y="70" fontSize="10" fill="#C62828" fontWeight="bold">{b ? '⬆️ Upgrades' : '⬆️ CVO'}</text>
      <text x="415" y="84" fontSize="7" fill="#999">{b ? 'Managed for you' : 'Upgrade policies'}</text>

      {/* Operators */}
      <rect x="550" y="50" width="220" height="48" rx="8" fill="#fff" stroke="#EF5350" strokeWidth="1.5" />
      <text x="565" y="70" fontSize="10" fill="#C62828" fontWeight="bold">{b ? '⚙️ Cluster Software' : '⚙️ Cluster Operators'}</text>
      <text x="565" y="84" fontSize="7" fill="#999">{b ? 'Monitoring, networking, storage' : 'Ingress, monitoring, DNS, auth'}</text>

      {/* "Open Console" arrow */}
      <line x1="230" y1="74" x2="265" y2="170" stroke="#CC0000" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="220" y="125" fontSize="8" fill="#CC0000" fontWeight="bold" transform="rotate(25, 220, 125)">{b ? '"Open Console"' : 'OCP URL →'}</text>

      {/* Customer AWS Account */}
      <rect x="10" y="120" width="780" height="290" rx="14" fill="#FFF8E1" stroke="#FF9900" strokeWidth="2" />
      <text x="30" y="145" fontSize="14" fill="#E65100" fontWeight="bold">
        {b ? '🟠 Your AWS Account' : '🟠 Customer AWS Account'}
      </text>

      {/* ROSA Cluster boundary */}
      <rect x="30" y="155" width="740" height="240" rx="12" fill="rgba(255,255,255,0.5)" stroke="#FF9900" strokeWidth="1" strokeDasharray="5 3" />
      <text x="50" y="175" fontSize="11" fill="#E65100" fontWeight="bold">ROSA Classic Cluster</text>

      {/* Control Plane — INSIDE customer AWS */}
      <rect x="50" y="185" width="320" height="70" rx="10" fill="#FFCDD2" stroke="#EF5350" strokeWidth="2" />
      <text x="65" y="205" fontSize="10" fill="#B71C1C" fontWeight="bold">
        {b ? '🧠 Control Plane (managed by Red Hat, runs HERE)' : '🧠 Control Plane (3× m5.xlarge, SRE-managed)'}
      </text>
      <rect x="65" y="215" width="65" height="28" rx="4" fill="#fff" stroke="#EF9A9A" strokeWidth="1" />
      <text x="73" y="233" fontSize="7" fill="#C62828">{b ? 'Front Door' : 'API Server'}</text>
      <rect x="138" y="215" width="50" height="28" rx="4" fill="#fff" stroke="#EF9A9A" strokeWidth="1" />
      <text x="146" y="233" fontSize="7" fill="#C62828">{b ? 'Memory' : 'etcd'}</text>
      <rect x="196" y="215" width="65" height="28" rx="4" fill="#fff" stroke="#EF9A9A" strokeWidth="1" />
      <text x="204" y="233" fontSize="7" fill="#C62828">Scheduler</text>
      <rect x="269" y="215" width="85" height="28" rx="4" fill="#fff" stroke="#EF9A9A" strokeWidth="1" />
      <text x="277" y="233" fontSize="7" fill="#C62828">{b ? 'Auto-Fixer' : 'Controllers'}</text>

      {/* OCP Console */}
      <rect x="400" y="185" width="180" height="70" rx="10" fill="#E0F2F1" stroke="#4DB6AC" strokeWidth="2" />
      <text x="415" y="205" fontSize="10" fill="#00695C" fontWeight="bold">🎛️ {b ? 'Cluster Console' : 'OCP Console'}</text>
      <text x="415" y="220" fontSize="7" fill="#00897B">console-openshift-console.apps.…</text>
      <text x="415" y="235" fontSize="7" fill="#00897B">{b ? 'See pods, deployments, logs' : 'Admin + Developer perspectives'}</text>
      <text x="415" y="248" fontSize="7" fill="#00897B">{b ? 'Manage YOUR apps here' : 'Workloads, Networking, Storage, RBAC'}</text>

      {/* Worker nodes */}
      <rect x="50" y="270" width="530" height="110" rx="10" fill="#F3E5F5" stroke="#BA68C8" strokeWidth="1.5" strokeDasharray="5 3" />
      <text x="65" y="290" fontSize="9" fill="#6A1B9A" fontWeight="bold">{b ? '🏗️ Machine Pool (your worker machines)' : '🏗️ Machine Pool → AWS ASG'}</text>

      {['Worker 1', 'Worker 2', 'Worker 3'].map((w, i) => (
        <g key={i}>
          <rect x={70 + i * 165} y={300} width="145" height="65" rx="6" fill="#EDE7F6" stroke="#CE93D8" strokeWidth="1" />
          <text x={82 + i * 165} y={316} fontSize="8" fill="#6A1B9A" fontWeight="bold">{b ? w : `worker-${i + 1}`}</text>
          <rect x={80 + i * 165} y={322} width="50" height="14" rx="3" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="0.8" />
          <rect x={80 + i * 165} y={340} width="50" height="14" rx="3" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="0.8" />
          <rect x={136 + i * 165} y={322} width="50" height="14" rx="3" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="0.8" />
          <rect x={136 + i * 165} y={340} width="50" height="14" rx="3" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="0.8" />
        </g>
      ))}

      {/* AWS infra */}
      <rect x="600" y="185" width="155" height="195" rx="10" fill="#FFF3E0" stroke="#FFB74D" strokeWidth="1.5" />
      <text x="612" y="205" fontSize="9" fill="#E65100" fontWeight="bold">{b ? '🔧 AWS Services' : '🔧 AWS Infrastructure'}</text>

      {[
        b ? 'Network (VPC)' : 'VPC + Subnets',
        b ? 'Storage disks' : 'EBS Volumes',
        b ? 'Load balancers' : 'NLB / ALB',
        b ? 'DNS' : 'Route53',
        b ? 'Image storage' : 'S3 Registry',
        b ? 'Permissions' : 'IAM Roles (STS)',
      ].map((item, i) => (
        <g key={i}>
          <rect x={612} y={215 + i * 25} width={130} height={20} rx={4} fill="#fff" stroke="#FFE0B2" strokeWidth="1" />
          <text x={622} y={229 + i * 25} fontSize="8" fill="#BF360C">{item}</text>
        </g>
      ))}
    </svg>
  );
}

function HcpDiagram({ b }: { b: boolean }) {
  return (
    <svg viewBox="0 0 800 440" className="rosa-svg">
      {/* Red Hat zone — bigger, includes control plane */}
      <rect x="10" y="10" width="780" height="180" rx="14" fill="#FDE8E8" stroke="#CC0000" strokeWidth="2" />
      <text x="30" y="38" fontSize="14" fill="#CC0000" fontWeight="bold">
        {b ? '🔴 Red Hat Manages (including the cluster brain)' : '🔴 Red Hat (OCM + SRE + Hosted Control Plane)'}
      </text>

      {/* OCM Console */}
      <rect x="30" y="50" width="195" height="48" rx="8" fill="#fff" stroke="#EF5350" strokeWidth="1.5" />
      <text x="45" y="70" fontSize="10" fill="#C62828" fontWeight="bold">🖥️ {b ? 'Your Dashboard' : 'OCM Console'}</text>
      <text x="45" y="84" fontSize="7" fill="#999" fontFamily="monospace">console.redhat.com/openshift</text>

      {/* SRE */}
      <rect x="240" y="50" width="120" height="48" rx="8" fill="#fff" stroke="#EF5350" strokeWidth="1.5" />
      <text x="255" y="70" fontSize="10" fill="#C62828" fontWeight="bold">{b ? '👷 SRE Team' : '👷 SRE'}</text>
      <text x="255" y="84" fontSize="7" fill="#999">{b ? '24/7 monitoring' : 'Backplane, PagerDuty'}</text>

      {/* Upgrades */}
      <rect x="375" y="50" width="120" height="48" rx="8" fill="#fff" stroke="#EF5350" strokeWidth="1.5" />
      <text x="390" y="70" fontSize="10" fill="#C62828" fontWeight="bold">{b ? '⬆️ Upgrades' : '⬆️ HyperShift'}</text>
      <text x="390" y="84" fontSize="7" fill="#999">{b ? 'Managed for you' : 'Hosted control planes'}</text>

      {/* Operators */}
      <rect x="510" y="50" width="260" height="48" rx="8" fill="#fff" stroke="#EF5350" strokeWidth="1.5" />
      <text x="525" y="70" fontSize="10" fill="#C62828" fontWeight="bold">{b ? '⚙️ Cluster Software' : '⚙️ Cluster Operators'}</text>
      <text x="525" y="84" fontSize="7" fill="#999">{b ? 'Monitoring, networking, storage' : 'Ingress, monitoring, DNS, auth'}</text>

      {/* Control Plane — INSIDE Red Hat's zone */}
      <rect x="30" y="108" width="740" height="70" rx="10" fill="#FFCDD2" stroke="#EF5350" strokeWidth="2" />
      <text x="50" y="128" fontSize="10" fill="#B71C1C" fontWeight="bold">
        {b ? '🧠 Control Plane (runs in Red Hat\'s AWS — you never see these machines!)' : '🧠 Hosted Control Plane (Red Hat\'s AWS account, HyperShift-managed)'}
      </text>
      <rect x="50" y="138" width="65" height="28" rx="4" fill="#fff" stroke="#EF9A9A" strokeWidth="1" />
      <text x="58" y="156" fontSize="7" fill="#C62828">{b ? 'Front Door' : 'API Server'}</text>
      <rect x="123" y="138" width="50" height="28" rx="4" fill="#fff" stroke="#EF9A9A" strokeWidth="1" />
      <text x="131" y="156" fontSize="7" fill="#C62828">{b ? 'Memory' : 'etcd'}</text>
      <rect x="181" y="138" width="65" height="28" rx="4" fill="#fff" stroke="#EF9A9A" strokeWidth="1" />
      <text x="189" y="156" fontSize="7" fill="#C62828">Scheduler</text>
      <rect x="254" y="138" width="85" height="28" rx="4" fill="#fff" stroke="#EF9A9A" strokeWidth="1" />
      <text x="262" y="156" fontSize="7" fill="#C62828">{b ? 'Auto-Fixer' : 'Controllers'}</text>

      {/* OCP Console in Red Hat zone */}
      <rect x="500" y="108" width="260" height="70" rx="10" fill="#E0F2F1" stroke="#4DB6AC" strokeWidth="2" />
      <text x="515" y="128" fontSize="10" fill="#00695C" fontWeight="bold">🎛️ {b ? 'Cluster Console' : 'OCP Console'}</text>
      <text x="515" y="143" fontSize="7" fill="#00897B">console-openshift-console.apps.…</text>
      <text x="515" y="158" fontSize="7" fill="#00897B">{b ? 'See pods, apps, logs — manage YOUR stuff' : 'Admin + Developer perspectives'}</text>
      <text x="515" y="170" fontSize="7" fill="#00897B">{b ? '' : 'Workloads, Networking, Storage, RBAC'}</text>

      {/* "Open Console" arrow */}
      <line x1="225" y1="74" x2="500" y2="128" stroke="#CC0000" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="340" y="95" fontSize="8" fill="#CC0000" fontWeight="bold">{b ? '"Open Console"' : 'OCP URL →'}</text>

      {/* PrivateLink connection */}
      <rect x="340" y="190" width="120" height="30" rx="6" fill="#E8EAF6" stroke="#7986CB" strokeWidth="1.5" />
      <text x="355" y="210" fontSize="9" fill="#283593" fontWeight="bold">{b ? '🔒 Secure link' : '🔒 PrivateLink'}</text>
      <line x1="400" y1="178" x2="400" y2="190" stroke="#7986CB" strokeWidth="2" />
      <line x1="400" y1="220" x2="400" y2="240" stroke="#7986CB" strokeWidth="2" />

      {/* Customer AWS Account — smaller, only workers */}
      <rect x="10" y="230" width="780" height="200" rx="14" fill="#FFF8E1" stroke="#FF9900" strokeWidth="2" />
      <text x="30" y="255" fontSize="14" fill="#E65100" fontWeight="bold">
        {b ? '🟠 Your AWS Account (only worker machines here!)' : '🟠 Customer AWS Account (workers only)'}
      </text>

      {/* Worker nodes */}
      <rect x="30" y="270" width="560" height="145" rx="10" fill="#F3E5F5" stroke="#BA68C8" strokeWidth="1.5" strokeDasharray="5 3" />
      <text x="45" y="290" fontSize="9" fill="#6A1B9A" fontWeight="bold">{b ? '🏗️ Node Pool (your worker machines)' : '🏗️ Node Pool → AWS ASG'}</text>

      {['Worker 1', 'Worker 2', 'Worker 3'].map((w, i) => (
        <g key={i}>
          <rect x={50 + i * 175} y={300} width="155" height="100" rx="6" fill="#EDE7F6" stroke="#CE93D8" strokeWidth="1" />
          <text x={62 + i * 175} y={316} fontSize="8" fill="#6A1B9A" fontWeight="bold">{b ? w : `worker-${i + 1}`}</text>
          <rect x={60 + i * 175} y={322} width="55" height="14" rx="3" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="0.8" />
          <text x={65 + i * 175} y={332} fontSize="6" fill="#2E7D32">myapp</text>
          <rect x={60 + i * 175} y={340} width="55" height="14" rx="3" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="0.8" />
          <rect x={120 + i * 175} y={322} width="55" height="14" rx="3" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="0.8" />
          <rect x={120 + i * 175} y={340} width="55" height="14" rx="3" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="0.8" />
          <rect x={60 + i * 175} y={360} width="55" height="14" rx="3" fill="#E1F5FE" stroke="#81D4FA" strokeWidth="0.8" />
          <rect x={120 + i * 175} y={360} width="55" height="14" rx="3" fill="#E1F5FE" stroke="#81D4FA" strokeWidth="0.8" />
        </g>
      ))}

      {/* AWS infra */}
      <rect x="610" y="270" width="165" height="145" rx="10" fill="#FFF3E0" stroke="#FFB74D" strokeWidth="1.5" />
      <text x="622" y="290" fontSize="9" fill="#E65100" fontWeight="bold">{b ? '🔧 AWS Services' : '🔧 AWS Infra'}</text>

      {[
        b ? 'Network (VPC)' : 'VPC + PrivateLink',
        b ? 'Storage disks' : 'EBS Volumes',
        b ? 'Load balancers' : 'NLB / ALB',
        b ? 'DNS' : 'Route53',
        b ? 'Permissions' : 'IAM Roles (STS)',
      ].map((item, i) => (
        <g key={i}>
          <rect x={622} y={300 + i * 22} width={140} height={18} rx={4} fill="#fff" stroke="#FFE0B2" strokeWidth="1" />
          <text x={632} y={313 + i * 22} fontSize="7" fill="#BF360C">{item}</text>
        </g>
      ))}
    </svg>
  );
}

function IamRbacBridge({ b }: { b: boolean }) {
  return (
    <div className="rosa-bridge">
      <h4>{b ? '🔑 How permissions connect' : '🔑 IAM ↔ RBAC Bridge'}</h4>
      <div className="rosa-bridge-content">
        <div className="rosa-bridge-side">
          <strong style={{ color: '#FF9900' }}>{b ? 'AWS Permissions' : 'AWS IAM Roles (STS)'}</strong>
          <p>{b
            ? 'Control what the cluster can do in AWS (create machines, access storage)'
            : 'Installer, Support, ControlPlane, Worker roles. Scoped to specific AWS API actions.'}
          </p>
        </div>
        <div className="rosa-bridge-arrow">
          <span>{b ? 'IRSA connects them' : 'IRSA / Pod Identity'}</span>
          <div className="rosa-bridge-arrow-line" />
        </div>
        <div className="rosa-bridge-side">
          <strong style={{ color: '#1565C0' }}>{b ? 'Cluster Permissions' : 'K8s RBAC'}</strong>
          <p>{b
            ? 'Control what users and apps can do INSIDE the cluster (view pods, create deployments)'
            : 'Roles → RoleBindings (namespaced). ClusterRoles → ClusterRoleBindings. ServiceAccounts for workload identity.'}
          </p>
        </div>
      </div>
      <p className="rosa-bridge-note">
        {b
          ? '💡 A pod (your app) can use IRSA to access AWS services (like S3) without storing credentials — the ServiceAccount gets a temporary AWS token automatically.'
          : '💡 IRSA: ServiceAccount annotated with IAM role ARN → projected token volume → STS AssumeRoleWithWebIdentity → scoped AWS credentials injected at pod level.'}
      </p>
    </div>
  );
}

export function RosaMap({ mode, onModeChange }: RosaMapProps) {
  const [variant, setVariant] = useState<RosaVariant>('classic');
  const b = mode === 'beginner';

  return (
    <div className="rosa-map">
      <div className="rosa-controls">
        <div className="mode-toggle">
          <button className={`mode-btn ${mode === 'beginner' ? 'active' : ''}`} onClick={() => onModeChange('beginner')}>
            🌱 Beginner
          </button>
          <button className={`mode-btn ${mode === 'expert' ? 'active' : ''}`} onClick={() => onModeChange('expert')}>
            ⚡ Expert
          </button>
        </div>
        <div className="variant-toggle">
          <button className={`variant-btn ${variant === 'classic' ? 'active' : ''}`} onClick={() => setVariant('classic')}>
            ROSA Classic
          </button>
          <button className={`variant-btn ${variant === 'hcp' ? 'active' : ''}`} onClick={() => setVariant('hcp')}>
            ROSA HCP
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={variant}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {variant === 'classic' ? <ClassicDiagram b={b} /> : <HcpDiagram b={b} />}
        </motion.div>
      </AnimatePresence>

      <div className="rosa-variant-note">
        {variant === 'classic' ? (
          <p>{b
            ? '📌 In ROSA Classic, the control plane runs on machines in YOUR AWS account. Red Hat manages it, but you pay for those EC2 instances. Machine Pools use MachineSets.'
            : '📌 Classic: 3 control plane nodes (m5.xlarge) in-cluster. Customer pays for CP EC2. MachineSet-based Machine Pools → ASGs. SRE access via backplane.'}
          </p>
        ) : (
          <p>{b
            ? '📌 In ROSA HCP, the control plane runs in Red Hat\'s AWS account — you never see or pay for those machines. Only your worker nodes are in your AWS account. This is simpler, cheaper, and faster to set up (~10 minutes).'
            : '📌 HCP: Control plane in Red Hat\'s AWS via HyperShift. Customer only pays for worker EC2. NodePool-based (not MachineSet). PrivateLink connects CP ↔ workers. ~10 min provisioning. Lower CP cost.'}
          </p>
        )}
      </div>

      <IamRbacBridge b={b} />
    </div>
  );
}
