import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ExplainMode } from './types';

type OsdVariant = 'aws' | 'gcp';

interface OsdMapProps {
  mode: ExplainMode;
  onModeChange: (mode: ExplainMode) => void;
}

function OsdAwsDiagram({ b }: { b: boolean }) {
  return (
    <svg viewBox="0 0 800 460" className="rosa-svg">
      {/* Red Hat zone */}
      <rect x="10" y="10" width="780" height="120" rx="14" fill="#FDE8E8" stroke="#CC0000" strokeWidth="2" />
      <text x="30" y="38" fontSize="14" fill="#CC0000" fontWeight="bold">
        🔴 {b ? 'Red Hat Manages (dedicated SRE team for YOUR cluster)' : 'Red Hat (OCM + Dedicated SRE)'}
      </text>

      {/* OCM Console */}
      <rect x="30" y="50" width="210" height="70" rx="8" fill="#fff" stroke="#EF5350" strokeWidth="1.5" />
      <text x="45" y="68" fontSize="10" fill="#C62828" fontWeight="bold">🖥️ {b ? 'Your Dashboard' : 'OCM Console'}</text>
      <text x="45" y="81" fontSize="7" fill="#777" fontFamily="monospace">console.redhat.com/openshift/</text>
      <text x="45" y="93" fontSize="7" fill="#777" fontFamily="monospace">details/&lt;cluster_id&gt;</text>
      <rect x="50" y="101" width="100" height="18" rx="9" fill="#0066CC" />
      <text x="72" y="113" fontSize="7" fill="#fff" fontWeight="bold">Open console</text>

      {/* SRE */}
      <rect x="260" y="50" width="165" height="70" rx="8" fill="#fff" stroke="#EF5350" strokeWidth="1.5" />
      <text x="275" y="68" fontSize="10" fill="#C62828" fontWeight="bold">
        {b ? '👷 Dedicated SRE Team' : '👷 SRE (Dedicated)'}
      </text>
      <text x="275" y="82" fontSize="8" fill="#777">{b ? 'A team assigned to YOUR cluster' : 'Backplane, PagerDuty, 24/7'}</text>
      <text x="275" y="94" fontSize="8" fill="#777">{b ? 'Monitoring & fixing 24/7' : 'Cluster-specific team assignment'}</text>
      <text x="275" y="106" fontSize="7" fill="#C62828" fontStyle="italic">
        {b ? '← This is what "Dedicated" means!' : ''}
      </text>

      {/* Upgrades */}
      <rect x="440" y="50" width="130" height="70" rx="8" fill="#fff" stroke="#EF5350" strokeWidth="1.5" />
      <text x="455" y="72" fontSize="10" fill="#C62828" fontWeight="bold">{b ? '⬆️ Upgrades' : '⬆️ Upgrade Policies'}</text>
      <text x="455" y="86" fontSize="8" fill="#777">{b ? 'Managed for you' : 'Scheduled, SRE-managed'}</text>

      {/* Operators */}
      <rect x="585" y="50" width="190" height="70" rx="8" fill="#fff" stroke="#EF5350" strokeWidth="1.5" />
      <text x="600" y="72" fontSize="10" fill="#C62828" fontWeight="bold">{b ? '⚙️ Cluster Software' : '⚙️ Cluster Operators'}</text>
      <text x="600" y="86" fontSize="8" fill="#777">{b ? 'Monitoring, networking, etc.' : 'Ingress, monitoring, DNS, auth'}</text>

      {/* Customer AWS Account */}
      <rect x="10" y="140" width="780" height="310" rx="14" fill="#FFF8E1" stroke="#FF9900" strokeWidth="2" />
      <text x="30" y="165" fontSize="14" fill="#E65100" fontWeight="bold">
        🟠 {b ? 'Your AWS Account (CCS — Customer Cloud Subscription)' : '🟠 Customer AWS Account (CCS Model)'}
      </text>

      {/* OSD Cluster boundary */}
      <rect x="30" y="175" width="740" height="260" rx="12" fill="rgba(255,255,255,0.5)" stroke="#FF9900" strokeWidth="1" strokeDasharray="5 3" />
      <text x="50" y="195" fontSize="11" fill="#E65100" fontWeight="bold">OSD Cluster (AWS)</text>

      {/* Control Plane */}
      <rect x="50" y="205" width="320" height="70" rx="10" fill="#FFCDD2" stroke="#EF5350" strokeWidth="2" />
      <text x="65" y="225" fontSize="10" fill="#B71C1C" fontWeight="bold">
        {b ? '🧠 Control Plane (managed by Red Hat, in your account)' : '🧠 Control Plane (3× m5.xlarge, SRE-managed)'}
      </text>
      <rect x="65" y="235" width="65" height="28" rx="4" fill="#fff" stroke="#EF9A9A" strokeWidth="1" />
      <text x="73" y="253" fontSize="7" fill="#C62828">{b ? 'Front Door' : 'API Server'}</text>
      <rect x="138" y="235" width="50" height="28" rx="4" fill="#fff" stroke="#EF9A9A" strokeWidth="1" />
      <text x="146" y="253" fontSize="7" fill="#C62828">{b ? 'Memory' : 'etcd'}</text>
      <rect x="196" y="235" width="65" height="28" rx="4" fill="#fff" stroke="#EF9A9A" strokeWidth="1" />
      <text x="204" y="253" fontSize="7" fill="#C62828">Scheduler</text>
      <rect x="269" y="235" width="85" height="28" rx="4" fill="#fff" stroke="#EF9A9A" strokeWidth="1" />
      <text x="277" y="253" fontSize="7" fill="#C62828">{b ? 'Auto-Fixer' : 'Controllers'}</text>

      {/* OCP Console */}
      <rect x="390" y="195" width="190" height="85" rx="10" fill="#E0F2F1" stroke="#4DB6AC" strokeWidth="2" />
      <text x="405" y="218" fontSize="10" fill="#00695C" fontWeight="bold">🎛️ {b ? 'Cluster Console' : 'OCP Console'}</text>
      <text x="405" y="234" fontSize="8" fill="#00897B">console-openshift-console.apps.…</text>
      <text x="405" y="250" fontSize="8" fill="#00897B">{b ? 'See pods, deployments, logs' : 'Admin + Developer perspectives'}</text>
      <text x="405" y="266" fontSize="8" fill="#00897B">{b ? 'Manage YOUR apps here' : 'Workloads, Networking, Storage'}</text>

      {/* Open Console arrow — rendered last for z-order */}
      <defs>
        <marker id="osd-aws-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#CC0000" />
        </marker>
      </defs>
      <line x1="100" y1="119" x2="392" y2="198" stroke="#CC0000" strokeWidth="2" strokeDasharray="5 3" markerEnd="url(#osd-aws-arrow)" />

      {/* Worker nodes */}
      <rect x="50" y="290" width="530" height="130" rx="10" fill="#F3E5F5" stroke="#BA68C8" strokeWidth="1.5" strokeDasharray="5 3" />
      <text x="65" y="310" fontSize="9" fill="#6A1B9A" fontWeight="bold">{b ? '🏗️ Machine Pool (your worker machines)' : '🏗️ Machine Pool → AWS ASG'}</text>

      {['Worker 1', 'Worker 2', 'Worker 3'].map((w, i) => (
        <g key={i}>
          <rect x={70 + i * 165} y={320} width="145" height="85" rx="6" fill="#EDE7F6" stroke="#CE93D8" strokeWidth="1" />
          <text x={82 + i * 165} y={336} fontSize="8" fill="#6A1B9A" fontWeight="bold">{b ? w : `worker-${i + 1}`}</text>
          <rect x={80 + i * 165} y={342} width="50" height="14" rx="3" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="0.8" />
          <rect x={80 + i * 165} y={360} width="50" height="14" rx="3" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="0.8" />
          <rect x={136 + i * 165} y={342} width="50" height="14" rx="3" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="0.8" />
          <rect x={136 + i * 165} y={360} width="50" height="14" rx="3" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="0.8" />
        </g>
      ))}

      {/* AWS infra */}
      <rect x="600" y="195" width="155" height="225" rx="10" fill="#FFF3E0" stroke="#FFB74D" strokeWidth="1.5" />
      <text x="612" y="215" fontSize="9" fill="#E65100" fontWeight="bold">{b ? '🔧 AWS Services' : '🔧 AWS Infrastructure'}</text>

      {[
        b ? 'Network (VPC)' : 'VPC + Subnets',
        b ? 'Storage disks' : 'EBS Volumes',
        b ? 'Load balancers' : 'ELB / NLB',
        b ? 'DNS' : 'Route53',
        b ? 'Image storage' : 'S3 Registry',
      ].map((item, i) => (
        <g key={i}>
          <rect x={612} y={225 + i * 28} width={130} height={22} rx={4} fill="#fff" stroke="#FFE0B2" strokeWidth="1" />
          <text x={622} y={240 + i * 28} fontSize="8" fill="#BF360C">{item}</text>
        </g>
      ))}

      {/* Credential model callout — visually distinct */}
      <rect x={612} y={225 + 5 * 28} width={130} height={22} rx={4} fill="#FFF9C4" stroke="#F9A825" strokeWidth="1.5" />
      <text x={622} y={240 + 5 * 28} fontSize="8" fill="#E65100" fontWeight="bold">
        {b ? '🔑 Access Key + Secret' : '🔑 IAM User (static keys)'}
      </text>
    </svg>
  );
}

function OsdGcpDiagram({ b }: { b: boolean }) {
  return (
    <svg viewBox="0 0 800 460" className="rosa-svg">
      {/* Red Hat zone */}
      <rect x="10" y="10" width="780" height="120" rx="14" fill="#FDE8E8" stroke="#CC0000" strokeWidth="2" />
      <text x="30" y="38" fontSize="14" fill="#CC0000" fontWeight="bold">
        🔴 {b ? 'Red Hat Manages (dedicated SRE team for YOUR cluster)' : 'Red Hat (OCM + Dedicated SRE)'}
      </text>

      {/* OCM Console */}
      <rect x="30" y="50" width="210" height="70" rx="8" fill="#fff" stroke="#EF5350" strokeWidth="1.5" />
      <text x="45" y="68" fontSize="10" fill="#C62828" fontWeight="bold">🖥️ {b ? 'Your Dashboard' : 'OCM Console'}</text>
      <text x="45" y="81" fontSize="7" fill="#777" fontFamily="monospace">console.redhat.com/openshift/</text>
      <text x="45" y="93" fontSize="7" fill="#777" fontFamily="monospace">details/&lt;cluster_id&gt;</text>
      <rect x="50" y="101" width="100" height="18" rx="9" fill="#0066CC" />
      <text x="72" y="113" fontSize="7" fill="#fff" fontWeight="bold">Open console</text>

      {/* SRE */}
      <rect x="260" y="50" width="165" height="70" rx="8" fill="#fff" stroke="#EF5350" strokeWidth="1.5" />
      <text x="275" y="68" fontSize="10" fill="#C62828" fontWeight="bold">
        {b ? '👷 Dedicated SRE Team' : '👷 SRE (Dedicated)'}
      </text>
      <text x="275" y="82" fontSize="8" fill="#777">{b ? 'A team assigned to YOUR cluster' : 'Backplane, PagerDuty, 24/7'}</text>
      <text x="275" y="94" fontSize="8" fill="#777">{b ? 'Monitoring & fixing 24/7' : ''}</text>
      <text x="275" y="106" fontSize="7" fill="#C62828" fontStyle="italic">
        {b ? '← "Dedicated" = dedicated to YOU' : ''}
      </text>

      {/* Upgrades */}
      <rect x="440" y="50" width="130" height="70" rx="8" fill="#fff" stroke="#EF5350" strokeWidth="1.5" />
      <text x="455" y="72" fontSize="10" fill="#C62828" fontWeight="bold">{b ? '⬆️ Upgrades' : '⬆️ Upgrade Policies'}</text>
      <text x="455" y="86" fontSize="8" fill="#777">{b ? 'Managed for you' : 'Scheduled, SRE-managed'}</text>

      {/* Operators */}
      <rect x="585" y="50" width="190" height="70" rx="8" fill="#fff" stroke="#EF5350" strokeWidth="1.5" />
      <text x="600" y="72" fontSize="10" fill="#C62828" fontWeight="bold">{b ? '⚙️ Cluster Software' : '⚙️ Cluster Operators'}</text>
      <text x="600" y="86" fontSize="8" fill="#777">{b ? 'Monitoring, networking, etc.' : 'Ingress, monitoring, DNS, auth'}</text>

      {/* Customer GCP Account */}
      <rect x="10" y="140" width="780" height="310" rx="14" fill="#E8F0FE" stroke="#4285F4" strokeWidth="2" />
      <text x="30" y="165" fontSize="14" fill="#1A73E8" fontWeight="bold">
        🔵 {b ? 'Your Google Cloud Project' : 'Customer GCP Project (CCS Model)'}
      </text>

      {/* OSD Cluster boundary */}
      <rect x="30" y="175" width="740" height="260" rx="12" fill="rgba(255,255,255,0.5)" stroke="#4285F4" strokeWidth="1" strokeDasharray="5 3" />
      <text x="50" y="195" fontSize="11" fill="#1A73E8" fontWeight="bold">OSD Cluster (GCP)</text>

      {/* Control Plane */}
      <rect x="50" y="205" width="320" height="70" rx="10" fill="#FFCDD2" stroke="#EF5350" strokeWidth="2" />
      <text x="65" y="225" fontSize="10" fill="#B71C1C" fontWeight="bold">
        {b ? '🧠 Control Plane (managed by Red Hat)' : '🧠 Control Plane (3× n1-standard-4, SRE-managed)'}
      </text>
      <rect x="65" y="235" width="65" height="28" rx="4" fill="#fff" stroke="#EF9A9A" strokeWidth="1" />
      <text x="73" y="253" fontSize="7" fill="#C62828">{b ? 'Front Door' : 'API Server'}</text>
      <rect x="138" y="235" width="50" height="28" rx="4" fill="#fff" stroke="#EF9A9A" strokeWidth="1" />
      <text x="146" y="253" fontSize="7" fill="#C62828">{b ? 'Memory' : 'etcd'}</text>
      <rect x="196" y="235" width="65" height="28" rx="4" fill="#fff" stroke="#EF9A9A" strokeWidth="1" />
      <text x="204" y="253" fontSize="7" fill="#C62828">Scheduler</text>
      <rect x="269" y="235" width="85" height="28" rx="4" fill="#fff" stroke="#EF9A9A" strokeWidth="1" />
      <text x="277" y="253" fontSize="7" fill="#C62828">{b ? 'Auto-Fixer' : 'Controllers'}</text>

      {/* OCP Console */}
      <rect x="390" y="195" width="190" height="85" rx="10" fill="#E0F2F1" stroke="#4DB6AC" strokeWidth="2" />
      <text x="405" y="218" fontSize="10" fill="#00695C" fontWeight="bold">🎛️ {b ? 'Cluster Console' : 'OCP Console'}</text>
      <text x="405" y="234" fontSize="8" fill="#00897B">console-openshift-console.apps.…</text>
      <text x="405" y="250" fontSize="8" fill="#00897B">{b ? 'See pods, deployments, logs' : 'Admin + Developer perspectives'}</text>
      <text x="405" y="266" fontSize="8" fill="#00897B">{b ? 'Manage YOUR apps here' : 'Workloads, Networking, Storage'}</text>

      {/* Open Console arrow */}
      <line x1="100" y1="119" x2="395" y2="200" stroke="#CC0000" strokeWidth="2" strokeDasharray="5 3" />
      <polygon points="389,197 401,203 393,209" fill="#CC0000" />

      {/* Worker nodes */}
      <rect x="50" y="290" width="530" height="130" rx="10" fill="#F3E5F5" stroke="#BA68C8" strokeWidth="1.5" strokeDasharray="5 3" />
      <text x="65" y="310" fontSize="9" fill="#6A1B9A" fontWeight="bold">{b ? '🏗️ Machine Pool (your worker machines)' : '🏗️ Machine Pool → GCE MIG'}</text>

      {['Worker 1', 'Worker 2', 'Worker 3'].map((w, i) => (
        <g key={i}>
          <rect x={70 + i * 165} y={320} width="145" height="85" rx="6" fill="#EDE7F6" stroke="#CE93D8" strokeWidth="1" />
          <text x={82 + i * 165} y={336} fontSize="8" fill="#6A1B9A" fontWeight="bold">{b ? w : `worker-${i + 1}`}</text>
          <rect x={80 + i * 165} y={342} width="50" height="14" rx="3" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="0.8" />
          <rect x={80 + i * 165} y={360} width="50" height="14" rx="3" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="0.8" />
          <rect x={136 + i * 165} y={342} width="50" height="14" rx="3" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="0.8" />
          <rect x={136 + i * 165} y={360} width="50" height="14" rx="3" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="0.8" />
        </g>
      ))}

      {/* GCP infra */}
      <rect x="600" y="195" width="155" height="225" rx="10" fill="#E8F0FE" stroke="#A8C7FA" strokeWidth="1.5" />
      <text x="612" y="215" fontSize="9" fill="#1A73E8" fontWeight="bold">{b ? '🔧 Google Cloud Services' : '🔧 GCP Infrastructure'}</text>

      {[
        b ? 'Network (VPC)' : 'VPC + Subnets',
        b ? 'Storage disks' : 'Persistent Disks',
        b ? 'Load balancers' : 'Cloud Load Balancing',
        b ? 'DNS' : 'Cloud DNS',
        b ? 'Image storage' : 'GCS Registry',
        b ? 'Permissions' : 'IAM + Service Accounts',
      ].map((item, i) => (
        <g key={i}>
          <rect x={612} y={225 + i * 28} width={130} height={22} rx={4} fill="#fff" stroke="#C2D9FC" strokeWidth="1" />
          <text x={622} y={240 + i * 28} fontSize="8" fill="#1565C0">{item}</text>
        </g>
      ))}
    </svg>
  );
}

export function OsdMap({ mode, onModeChange }: OsdMapProps) {
  const [variant, setVariant] = useState<OsdVariant>('aws');
  const b = mode === 'beginner';

  return (
    <div className="rosa-map">
      <div className="rosa-controls">
        <div className="variant-toggle">
          <button className={`variant-btn ${variant === 'aws' ? 'active' : ''}`} onClick={() => setVariant('aws')}>
            OSD on AWS
          </button>
          <button className={`variant-btn ${variant === 'gcp' ? 'active' : ''}`} onClick={() => setVariant('gcp')}>
            OSD on GCP
          </button>
        </div>
        <div className="mode-toggle">
          <button className={`mode-btn ${mode === 'beginner' ? 'active' : ''}`} onClick={() => onModeChange('beginner')}>
            🌱 Beginner
          </button>
          <button className={`mode-btn ${mode === 'expert' ? 'active' : ''}`} onClick={() => onModeChange('expert')}>
            ⚡ Expert
          </button>
        </div>
      </div>

      <h2 className="dd-page-title">🛡️ OSD — <em>OpenShift Dedicated</em></h2>

      {/* What "Dedicated" means callout — above the SVG */}
      <div className="rosa-variant-note" style={{ borderLeft: '4px solid #CC0000' }}>
        <p><strong>🛡️ {b ? 'What does "Dedicated" mean?' : 'OSD "Dedicated" Model'}</strong></p>
        <p>{b
          ? '"Dedicated" means Red Hat assigns a dedicated SRE (Site Reliability Engineering) team to manage and operate your cluster around the clock. They handle upgrades, monitoring, patching, and incident response — so your team can focus entirely on building and deploying apps. It\'s like having a dedicated building superintendent for your apartment building.'
          : 'OSD provides a dedicated SRE team per customer cluster. The SRE team manages the control plane, cluster operators, upgrades, and incident response via backplane access. Cluster-specific PagerDuty escalation. SLA-backed uptime guarantees. Available on AWS (CCS) and GCP (CCS).'}
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={variant}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {variant === 'aws' ? <OsdAwsDiagram b={b} /> : <OsdGcpDiagram b={b} />}
        </motion.div>
      </AnimatePresence>

      <div className="rosa-variant-note">
        <p>{variant === 'aws'
          ? (b
            ? '📌 OSD on AWS uses the CCS (Customer Cloud Subscription) model — the cluster runs in YOUR AWS account. Red Hat manages it, but you own the cloud resources and pay AWS directly.'
            : '📌 OSD AWS (CCS): Cluster runs in customer AWS account. Customer pays AWS directly for EC2, EBS, etc. Red Hat charges OSD subscription separately. MachineSet-based Machine Pools.')
          : (b
            ? '📌 OSD on GCP uses the CCS model — the cluster runs in YOUR Google Cloud project. Same management as AWS, just on Google\'s cloud.'
            : '📌 OSD GCP (CCS): Cluster in customer GCP project. n1-standard instances. GCE Managed Instance Groups for MachineSets. Persistent Disks for storage. Cloud DNS for cluster DNS.')
        }
        </p>
      </div>

      {/* AWS credential model — the KEY difference */}
      <div className="rosa-variant-note" style={{ borderLeft: '4px solid #FF9900' }}>
        <p><strong>🔑 {b ? 'The #1 difference on AWS: How Red Hat connects to your account' : 'AWS Credential Model: OSD vs ROSA'}</strong></p>
        <p>{b
          ? 'OSD AWS: You give Red Hat a long-lived AWS Access Key ID and Secret Access Key. Red Hat stores these credentials and uses them to manage your cluster. If they\'re compromised, an attacker could access your AWS account until you rotate them.'
          : 'OSD AWS: Static IAM user credentials (Access Key ID + Secret Access Key). Stored by Red Hat. Broad permissions. Must be manually rotated. Single point of credential compromise.'}
        </p>
        <p style={{ marginTop: '8px' }}>{b
          ? 'ROSA: Uses AWS STS (Security Token Service) with IAM Roles. No long-lived keys! Red Hat "assumes" specific roles with temporary tokens that expire automatically. Each component gets only the permissions it needs — much more secure.'
          : 'ROSA: STS (Security Token Service) with scoped IAM Roles. Temporary credentials via AssumeRoleWithWebIdentity (OIDC). Per-component roles (Installer, Support, ControlPlane, Worker). Tokens expire in ≤1 hour. Least-privilege by design.'}
        </p>
        <p style={{ marginTop: '8px', fontWeight: 600, color: '#C62828' }}>{b
          ? '⚠️ This is the main reason ROSA is recommended over OSD for new AWS clusters — it\'s significantly more secure.'
          : '⚠️ STS is the recommended credential model. OSD\'s static keys are considered legacy. New AWS deployments should use ROSA.'}
        </p>
      </div>

      <div className="rosa-bridge">
        <h4>{b ? '🔄 OSD AWS vs ROSA — Full comparison' : '🔄 OSD AWS vs ROSA Comparison'}</h4>
        <div className="rosa-bridge-content">
          <div className="rosa-bridge-side">
            <strong style={{ color: '#CC0000' }}>OSD on AWS</strong>
            <p>{b
              ? '• The original managed OpenShift on AWS\n• Uses long-lived AWS access keys 🔑\n• Available on AWS and GCP\n• Control plane always in your account\n• ~45 min to create\n• Still supported, but legacy'
              : '• Legacy managed offering\n• Static IAM credentials (Access Key + Secret)\n• AWS + GCP (CCS)\n• In-cluster control plane\n• MachineSet-based pools\n• ~45 min provisioning'}
            </p>
          </div>
          <div className="rosa-bridge-arrow">
            <span>{b ? 'Key diff: credentials' : 'Static keys → STS'}</span>
            <div className="rosa-bridge-arrow-line" style={{ background: 'linear-gradient(to right, #FF9900, #0066CC)' }} />
          </div>
          <div className="rosa-bridge-side">
            <strong style={{ color: '#CC0000' }}>ROSA</strong>
            <p>{b
              ? '• Newer, AWS-only\n• Uses temporary STS tokens 🔒 (no stored keys!)\n• Listed in AWS Marketplace (pay via AWS bill)\n• HCP: control plane in Red Hat\'s account\n• HCP: ~10 min, cheaper\n• ✅ Recommended for new clusters'
              : '• AWS-native via STS (OIDC + AssumeRole)\n• Temporary, scoped credentials\n• AWS Marketplace integration\n• Classic (in-cluster CP) or HCP (hosted CP)\n• HCP: NodePool-based, ~10 min\n• ✅ Recommended for new AWS deployments'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
