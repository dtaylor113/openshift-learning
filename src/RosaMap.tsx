import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud } from 'lucide-react';
import type { ExplainMode } from './types';
import { ApiCallChain } from './ApiCallChain';
import { ModeToggle } from './ModeToggle';
import { ExploreMore, DEEP_DIVE_LINKS } from './ExploreMore';
import { HyperfleetContent } from './HyperfleetMap';
import { useGlossary } from './GlossaryContext';
import { GLOSSARY, createGlossarizer } from './Glossary';

export type RosaVariant = 'classic' | 'hcp' | 'hyperfleet';

interface RosaMapProps {
  mode: ExplainMode;
  onModeChange: (mode: ExplainMode) => void;
  initialVariant?: RosaVariant;
}

function ClassicDiagram({ b }: { b: boolean }) {
  const { show, hide } = useGlossary();
  const tip = (term: string, label?: string) => (
    <tspan fill="#78909C" className="svg-glossary-term"
      onMouseEnter={() => show(term, GLOSSARY[term])}
      onMouseLeave={hide}
    >{label || term}</tspan>
  );

  return (
    <svg viewBox="0 0 800 440" className="rosa-svg">
      {/* Red Hat zone */}
      <rect x="10" y="10" width="780" height="110" rx="14" fill="#FDE8E8" stroke="#CC0000" strokeWidth="2" />
      <text x="30" y="38" fontSize="14" fill="#CC0000" fontWeight="bold">
        {b ? '🔴 Red Hat Manages' : <>🔴 Red Hat ({tip('OCM')} + {tip('SRE')})</>}
      </text>

      {/* OCM Console */}
      <rect x="30" y="48" width="210" height="64" rx="8" fill="#fff" stroke="#EF5350" strokeWidth="1.5" />
      <text x="45" y="66" fontSize="10" fill="#C62828" fontWeight="bold">🖥️ {b ? 'Cluster Details' : <>{tip('OCM')} Console</>}</text>
      <text x="45" y="79" fontSize="7" fill="#777" fontFamily="monospace">console.redhat.com/openshift/</text>
      <text x="45" y="89" fontSize="7" fill="#777" fontFamily="monospace">details/&lt;cluster_id&gt;</text>
      {/* "Open Console" button */}
      <rect x="50" y="96" width="100" height="18" rx="9" fill="#0066CC" />
      <text x="72" y="108" fontSize="7" fill="#fff" fontWeight="bold">Open console</text>

      {/* SRE */}
      <rect x="260" y="48" width="140" height="64" rx="8" fill="#fff" stroke="#EF5350" strokeWidth="1.5" />
      <text x="275" y="66" fontSize="10" fill="#C62828" fontWeight="bold">{b ? '👷 Site Reliability' : <>👷 {tip('SRE')}</>}</text>
      <text x="275" y="79" fontSize="8" fill="#777">{b ? 'Red Hat\'s ops team — monitors' : 'Backplane, PagerDuty'}</text>
      <text x="275" y="91" fontSize="8" fill="#777">{b ? '& fixes your cluster 24/7' : ''}</text>

      {/* Upgrades */}
      <rect x="415" y="48" width="130" height="64" rx="8" fill="#fff" stroke="#EF5350" strokeWidth="1.5" />
      <text x="430" y="70" fontSize="10" fill="#C62828" fontWeight="bold">{b ? '⬆️ Upgrades' : <>⬆️ {tip('CVO')}</>}</text>
      <text x="430" y="84" fontSize="8" fill="#777">{b ? 'Managed for you' : 'Upgrade policies'}</text>

      {/* Operators */}
      <rect x="560" y="48" width="215" height="64" rx="8" fill="#fff" stroke="#EF5350" strokeWidth="1.5" />
      <text x="575" y="70" fontSize="10" fill="#C62828" fontWeight="bold">{b ? '⚙️ Cluster Software' : '⚙️ Cluster Operators'}</text>
      <text x="575" y="84" fontSize="8" fill="#777">{b ? 'Monitoring, networking, storage' : 'Ingress, monitoring, DNS, auth'}</text>

      {/* Customer AWS Account */}
      <rect x="10" y="130" width="780" height="300" rx="14" fill="#FFF8E1" stroke="#FF9900" strokeWidth="2" />
      <text x="30" y="155" fontSize="14" fill="#E65100" fontWeight="bold">
        {b ? '🟠 Your AWS Account' : '🟠 Customer AWS Account'}
      </text>

      {/* ROSA Cluster boundary */}
      <rect x="30" y="165" width="740" height="250" rx="12" fill="rgba(255,255,255,0.5)" stroke="#FF9900" strokeWidth="1" strokeDasharray="5 3" />
      <text x="50" y="185" fontSize="11" fill="#E65100" fontWeight="bold">ROSA Classic Cluster</text>

      {/* Control Plane — INSIDE customer AWS */}
      <rect x="50" y="195" width="320" height="70" rx="10" fill="#FFCDD2" stroke="#EF5350" strokeWidth="2" />
      <text x="65" y="215" fontSize="10" fill="#B71C1C" fontWeight="bold">
        {b ? '🧠 Control Plane (managed by Red Hat, runs HERE)' : '🧠 Control Plane (3× m5.xlarge, SRE-managed)'}
      </text>
      <rect x="65" y="225" width="65" height="28" rx="4" fill="#fff" stroke="#EF9A9A" strokeWidth="1" />
      <text x="73" y="243" fontSize="7" fill="#C62828">{b ? 'Front Door' : 'API Server'}</text>
      <rect x="138" y="225" width="50" height="28" rx="4" fill="#fff" stroke="#EF9A9A" strokeWidth="1" />
      <text x="146" y="243" fontSize="7" fill="#C62828">{b ? 'Memory' : tip('etcd')}</text>
      <rect x="196" y="225" width="65" height="28" rx="4" fill="#fff" stroke="#EF9A9A" strokeWidth="1" />
      <text x="204" y="243" fontSize="7" fill="#C62828">Scheduler</text>
      <rect x="269" y="225" width="85" height="28" rx="4" fill="#fff" stroke="#EF9A9A" strokeWidth="1" />
      <text x="277" y="243" fontSize="7" fill="#C62828">{b ? 'Auto-Fixer' : 'Controllers'}</text>

      {/* OCP Console */}
      <rect x="390" y="185" width="190" height="85" rx="10" fill="#E0F2F1" stroke="#4DB6AC" strokeWidth="2" />
      <text x="405" y="208" fontSize="10" fill="#00695C" fontWeight="bold">🎛️ {b ? 'Cluster Console' : <>{tip('OCP')} Console</>}</text>
      <text x="405" y="224" fontSize="8" fill="#00897B">console-openshift-console.apps.…</text>
      <text x="405" y="240" fontSize="8" fill="#00897B">{b ? 'See pods, deployments, logs' : 'Admin + Developer perspectives'}</text>
      <text x="405" y="256" fontSize="8" fill="#00897B">{b ? 'Manage YOUR apps here' : <>Workloads, Networking, Storage, {tip('RBAC')}</>}</text>

      {/* "Open Console" arrow — rendered last so it's on top of all boxes */}
      <defs>
        <marker id="rosa-classic-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#CC0000" />
        </marker>
      </defs>
      <line x1="100" y1="114" x2="392" y2="188" stroke="#CC0000" strokeWidth="2" strokeDasharray="5 3" markerEnd="url(#rosa-classic-arrow)" />

      {/* Worker nodes */}
      <rect x="50" y="280" width="530" height="120" rx="10" fill="#F3E5F5" stroke="#BA68C8" strokeWidth="1.5" strokeDasharray="5 3" />
      <text x="65" y="300" fontSize="9" fill="#6A1B9A" fontWeight="bold">{b ? <>🏗️ {tip('Machine Pool')} (your worker machines)</> : <>🏗️ {tip('Machine Pool')} → {tip('AWS')} {tip('ASG')}</>}</text>

      {['Worker 1', 'Worker 2', 'Worker 3'].map((w, i) => (
        <g key={i}>
          <rect x={70 + i * 165} y={310} width="145" height="75" rx="6" fill="#EDE7F6" stroke="#CE93D8" strokeWidth="1" />
          <text x={82 + i * 165} y={326} fontSize="8" fill="#6A1B9A" fontWeight="bold">{b ? w : `worker-${i + 1}`}</text>
          <rect x={80 + i * 165} y={332} width="50" height="14" rx="3" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="0.8" />
          <rect x={80 + i * 165} y={350} width="50" height="14" rx="3" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="0.8" />
          <rect x={136 + i * 165} y={332} width="50" height="14" rx="3" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="0.8" />
          <rect x={136 + i * 165} y={350} width="50" height="14" rx="3" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="0.8" />
        </g>
      ))}

      {/* AWS infra */}
      <rect x="600" y="195" width="155" height="205" rx="10" fill="#FFF3E0" stroke="#FFB74D" strokeWidth="1.5" />
      <text x="612" y="215" fontSize="9" fill="#E65100" fontWeight="bold">{b ? '🔧 AWS Services' : '🔧 AWS Infrastructure'}</text>

      {(b ? [
        'Network (VPC)',
        'Storage disks',
        'Load balancers',
        'DNS',
        'Image storage',
        'Permissions',
      ] : [
        <>{tip('VPC')} + Subnets</>,
        <>{tip('EBS')} Volumes</>,
        <>{tip('NLB')} / {tip('ALB')}</>,
        'Route53',
        'S3 Registry',
        <>{tip('IAM')} Roles ({tip('STS')})</>,
      ]).map((item, i) => (
        <g key={i}>
          <rect x={612} y={225 + i * 28} width={130} height={22} rx={4} fill="#fff" stroke="#FFE0B2" strokeWidth="1" />
          <text x={622} y={240 + i * 28} fontSize="8" fill="#BF360C">{item}</text>
        </g>
      ))}
    </svg>
  );
}

function HcpDiagram({ b }: { b: boolean }) {
  const { show, hide } = useGlossary();
  const tip = (term: string, label?: string) => (
    <tspan fill="#78909C" className="svg-glossary-term"
      onMouseEnter={() => show(term, GLOSSARY[term])}
      onMouseLeave={hide}
    >{label || term}</tspan>
  );

  return (
    <svg viewBox="0 0 800 510" className="rosa-svg">
      {/* Red Hat zone — bigger, includes control plane */}
      <rect x="10" y="10" width="780" height="230" rx="14" fill="#FDE8E8" stroke="#CC0000" strokeWidth="2" />
      <text x="30" y="38" fontSize="14" fill="#CC0000" fontWeight="bold">
        {b ? '🔴 Red Hat Manages (including the cluster brain)' : <>🔴 Red Hat ({tip('OCM')} + {tip('SRE')} + Hosted {tip('Control Plane')})</>}
      </text>

      {/* OCM Console */}
      <rect x="30" y="48" width="210" height="64" rx="8" fill="#fff" stroke="#EF5350" strokeWidth="1.5" />
      <text x="45" y="66" fontSize="10" fill="#C62828" fontWeight="bold">🖥️ {b ? 'Cluster Details' : <>{tip('OCM')} Console</>}</text>
      <text x="45" y="79" fontSize="7" fill="#777" fontFamily="monospace">console.redhat.com/openshift/</text>
      <text x="45" y="89" fontSize="7" fill="#777" fontFamily="monospace">details/&lt;cluster_id&gt;</text>
      {/* "Open Console" button */}
      <rect x="50" y="96" width="100" height="18" rx="9" fill="#0066CC" />
      <text x="72" y="108" fontSize="7" fill="#fff" fontWeight="bold">Open console</text>

      {/* SRE */}
      <rect x="260" y="48" width="140" height="64" rx="8" fill="#fff" stroke="#EF5350" strokeWidth="1.5" />
      <text x="275" y="66" fontSize="10" fill="#C62828" fontWeight="bold">{b ? '👷 Site Reliability' : <>👷 {tip('SRE')}</>}</text>
      <text x="275" y="79" fontSize="8" fill="#777">{b ? 'Red Hat\'s ops team — monitors' : 'Backplane, PagerDuty'}</text>
      <text x="275" y="91" fontSize="8" fill="#777">{b ? '& fixes your cluster 24/7' : ''}</text>

      {/* Upgrades */}
      <rect x="415" y="48" width="120" height="64" rx="8" fill="#fff" stroke="#EF5350" strokeWidth="1.5" />
      <text x="430" y="70" fontSize="10" fill="#C62828" fontWeight="bold">{b ? '⬆️ Upgrades' : <>⬆️ {tip('HyperShift')}</>}</text>
      <text x="430" y="84" fontSize="8" fill="#777">{b ? 'Managed for you' : 'Hosted control planes'}</text>

      {/* Operators */}
      <rect x="550" y="48" width="225" height="64" rx="8" fill="#fff" stroke="#EF5350" strokeWidth="1.5" />
      <text x="565" y="70" fontSize="10" fill="#C62828" fontWeight="bold">{b ? '⚙️ Cluster Software' : '⚙️ Cluster Operators'}</text>
      <text x="565" y="84" fontSize="8" fill="#777">{b ? 'Monitoring, networking, storage' : 'Ingress, monitoring, DNS, auth'}</text>

      {/* OCP Console in Red Hat zone — under "Cluster Details" with gap */}
      <rect x="30" y="140" width="270" height="80" rx="10" fill="#E0F2F1" stroke="#4DB6AC" strokeWidth="2" />
      <text x="48" y="162" fontSize="10" fill="#00695C" fontWeight="bold">🎛️ {b ? 'Cluster Console' : <>{tip('OCP')} Console</>}</text>
      <text x="48" y="178" fontSize="8" fill="#00897B">console-openshift-console.apps.…</text>
      <text x="48" y="194" fontSize="8" fill="#00897B">{b ? 'See pods, apps, logs — manage YOUR stuff' : 'Admin + Developer perspectives'}</text>
      <text x="48" y="208" fontSize="8" fill="#00897B">{b ? '' : <>Workloads, Networking, Storage, {tip('RBAC')}</>}</text>

      {/* "Open Console" arrow — dashed line with gap between button and console */}
      <defs>
        <marker id="rosa-hcp-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#CC0000" />
        </marker>
      </defs>
      <line x1="100" y1="114" x2="100" y2="138" stroke="#CC0000" strokeWidth="2" strokeDasharray="4 3" markerEnd="url(#rosa-hcp-arrow)" />

      {/* Control Plane — INSIDE Red Hat's zone, on the right */}
      <rect x="320" y="140" width="450" height="80" rx="10" fill="#FFCDD2" stroke="#EF5350" strokeWidth="2" />
      <text x="340" y="160" fontSize="10" fill="#B71C1C" fontWeight="bold">
        {b ? '🧠 Control Plane (in Red Hat\'s AWS — you never see these!)' : <>🧠 Hosted {tip('Control Plane')} (Red Hat's {tip('AWS')}, {tip('HyperShift')})</>}
      </text>
      <rect x="340" y="170" width="65" height="28" rx="4" fill="#fff" stroke="#EF9A9A" strokeWidth="1" />
      <text x="348" y="188" fontSize="7" fill="#C62828">{b ? 'Front Door' : 'API Server'}</text>
      <rect x="413" y="170" width="50" height="28" rx="4" fill="#fff" stroke="#EF9A9A" strokeWidth="1" />
      <text x="421" y="188" fontSize="7" fill="#C62828">{b ? 'Memory' : tip('etcd')}</text>
      <rect x="471" y="170" width="65" height="28" rx="4" fill="#fff" stroke="#EF9A9A" strokeWidth="1" />
      <text x="479" y="188" fontSize="7" fill="#C62828">Scheduler</text>
      <rect x="544" y="170" width="85" height="28" rx="4" fill="#fff" stroke="#EF9A9A" strokeWidth="1" />
      <text x="552" y="188" fontSize="7" fill="#C62828">{b ? 'Auto-Fixer' : 'Controllers'}</text>

      {/* Customer AWS Account — smaller, only workers */}
      <rect x="10" y="290" width="780" height="200" rx="14" fill="#FFF8E1" stroke="#FF9900" strokeWidth="2" />
      <text x="30" y="315" fontSize="14" fill="#E65100" fontWeight="bold">
        {b ? '🟠 Your AWS Account (only worker machines here!)' : '🟠 Customer AWS Account (workers only)'}
      </text>

      {/* PrivateLink connection — rendered after AWS zone so it's on top */}
      <rect x="340" y="248" width="120" height="30" rx="6" fill="#E8EAF6" stroke="#7986CB" strokeWidth="1.5" />
      <text x="355" y="268" fontSize="9" fill="#283593" fontWeight="bold">{b ? '🔒 Secure link' : <>🔒 {tip('PrivateLink')}</>}</text>
      <line x1="400" y1="220" x2="400" y2="248" stroke="#7986CB" strokeWidth="2" />
      <line x1="400" y1="278" x2="400" y2="320" stroke="#7986CB" strokeWidth="2" />
      <polygon points="396,316 400,324 404,316" fill="#7986CB" />

      {/* Worker nodes */}
      <rect x="30" y="330" width="560" height="145" rx="10" fill="#F3E5F5" stroke="#BA68C8" strokeWidth="1.5" strokeDasharray="5 3" />
      <text x="45" y="350" fontSize="9" fill="#6A1B9A" fontWeight="bold">{b ? <>🏗️ {tip('Node Pool')} (your worker machines)</> : <>🏗️ {tip('Node Pool')} → {tip('AWS')} {tip('ASG')}</>}</text>

      {['Worker 1', 'Worker 2', 'Worker 3'].map((w, i) => (
        <g key={i}>
          <rect x={50 + i * 175} y={360} width="155" height="100" rx="6" fill="#EDE7F6" stroke="#CE93D8" strokeWidth="1" />
          <text x={62 + i * 175} y={376} fontSize="8" fill="#6A1B9A" fontWeight="bold">{b ? w : `worker-${i + 1}`}</text>
          <rect x={60 + i * 175} y={382} width="55" height="14" rx="3" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="0.8" />
          <text x={65 + i * 175} y={392} fontSize="6" fill="#2E7D32">myapp</text>
          <rect x={60 + i * 175} y={400} width="55" height="14" rx="3" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="0.8" />
          <rect x={120 + i * 175} y={382} width="55" height="14" rx="3" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="0.8" />
          <rect x={120 + i * 175} y={400} width="55" height="14" rx="3" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="0.8" />
          <rect x={60 + i * 175} y={420} width="55" height="14" rx="3" fill="#E1F5FE" stroke="#81D4FA" strokeWidth="0.8" />
          <rect x={120 + i * 175} y={420} width="55" height="14" rx="3" fill="#E1F5FE" stroke="#81D4FA" strokeWidth="0.8" />
        </g>
      ))}

      {/* AWS infra */}
      <rect x="610" y="330" width="165" height="145" rx="10" fill="#FFF3E0" stroke="#FFB74D" strokeWidth="1.5" />
      <text x="622" y="350" fontSize="9" fill="#E65100" fontWeight="bold">{b ? '🔧 AWS Services' : '🔧 AWS Infra'}</text>

      {(b ? [
        'Network (VPC)',
        'Storage disks',
        'Load balancers',
        'DNS',
        'Permissions',
      ] : [
        <>{tip('VPC')} + {tip('PrivateLink')}</>,
        <>{tip('EBS')} Volumes</>,
        <>{tip('NLB')} / {tip('ALB')}</>,
        'Route53',
        <>{tip('IAM')} Roles ({tip('STS')})</>,
      ]).map((item, i) => (
        <g key={i}>
          <rect x={622} y={360 + i * 22} width={140} height={18} rx={4} fill="#fff" stroke="#FFE0B2" strokeWidth="1" />
          <text x={632} y={373 + i * 22} fontSize="7" fill="#BF360C">{item}</text>
        </g>
      ))}
    </svg>
  );
}

function IamRbacBridge({ b }: { b: boolean }) {
  const g = createGlossarizer();

  return (
    <div className="rosa-bridge">
      <h4>{b ? '🔑 How permissions connect' : <>🔑 {g('IAM')} ↔ {g('RBAC')} Bridge</>}</h4>
      <div className="rosa-bridge-content">
        <div className="rosa-bridge-side">
          <strong style={{ color: '#FF9900' }}>{b ? 'AWS Permissions' : <>{g('AWS')} {g('IAM')} Roles ({g('STS')})</>}</strong>
          <p>{b
            ? 'Control what the cluster can do in AWS (create machines, access storage)'
            : <>{g('Installer, Support, ControlPlane, Worker roles. Scoped to specific AWS API actions.')}</>}
          </p>
        </div>
        <div className="rosa-bridge-arrow">
          <span>{b ? 'IAM Roles for Service Accounts' : <>{g('IRSA')} / Pod Identity</>}</span>
          <div className="rosa-bridge-arrow-line" />
        </div>
        <div className="rosa-bridge-side">
          <strong style={{ color: '#1565C0' }}>{b ? 'Cluster Permissions' : <>{g('K8s')} {g('RBAC')}</>}</strong>
          <p>{b
            ? 'Control what users and apps can do INSIDE the cluster (view pods, create deployments)'
            : <>{g('Roles → RoleBindings (namespaced). ClusterRoles → ClusterRoleBindings. ServiceAccounts for workload identity.')}</>}
          </p>
        </div>
      </div>
      <p className="rosa-bridge-note">
        {b
          ? '💡 A pod (your app) can use "IAM Roles for Service Accounts" (IRSA) to access AWS services (like S3) without storing credentials — it gets a temporary AWS token automatically.'
          : <>💡 {g('IRSA')}: ServiceAccount annotated with {g('IAM')} role ARN → projected token volume → {g('STS')} AssumeRoleWithWebIdentity → scoped {g('AWS')} credentials injected at pod level.</>}
      </p>
    </div>
  );
}

export function RosaMap({ mode, onModeChange, initialVariant }: RosaMapProps) {
  const [variant, setVariant] = useState<RosaVariant>(initialVariant || 'classic');
  const b = mode === 'beginner';
  const g = createGlossarizer();

  const changeVariant = (v: RosaVariant) => {
    setVariant(v);
    window.location.hash = v === 'hyperfleet' ? 'hyperfleet' : 'rosa';
  };

  return (
    <div className="rosa-map">
      <div className="rosa-controls">
        <div className="variant-toggle">
          <button className={`variant-btn ${variant === 'classic' ? 'active' : ''}`} onClick={() => changeVariant('classic')}>
            ROSA Classic
          </button>
          <button className={`variant-btn ${variant === 'hcp' ? 'active' : ''}`} onClick={() => changeVariant('hcp')}>
            ROSA HCP
          </button>
          <button className={`variant-btn ${variant === 'hyperfleet' ? 'active' : ''}`} onClick={() => changeVariant('hyperfleet')}
            style={variant === 'hyperfleet' ? { borderColor: '#0D47A1', color: '#0D47A1' } : undefined}
          >
            HyperFleet
          </button>
        </div>
        <ModeToggle mode={mode} onModeChange={onModeChange} />
      </div>

      <h2 className="dd-page-title">
        <Cloud size={22} className="dd-title-icon" style={{ color: '#CC0000' }} />
        ROSA — <em>Red Hat OpenShift Service on AWS</em>
      </h2>

      {variant !== 'hyperfleet' && (
        <div className="rosa-variant-note">
          {variant === 'classic' ? (
            <p>{b
              ? '📌 In ROSA Classic, the control plane runs on machines in YOUR AWS account. Red Hat manages it, but you pay for those cloud machines. Machine Pools let you add or remove groups of worker machines.'
              : <>📌 {g('Classic')}: 3 {g('Control Plane')} nodes (m5.xlarge) in-cluster. Customer pays for CP EC2. {g('MachineSet')}-based {g('Machine Pool', 'Machine Pools')} → {g('ASG', 'ASGs')}. {g('SRE')} access via backplane.</>}
            </p>
          ) : (
            <p>{b
              ? '📌 In ROSA HCP, the control plane runs in Red Hat\'s AWS account — you never see or pay for those machines. Only your worker nodes are in your AWS account. This is simpler, cheaper, and faster to set up (~10 minutes).'
              : <>📌 {g('HCP')}: {g('Control Plane')} in Red Hat's {g('AWS')} via {g('HyperShift')}. Customer only pays for worker EC2. {g('Node Pool', 'NodePool')}-based (not {g('MachineSet')}). {g('PrivateLink')} connects CP ↔ workers. ~10 min provisioning. Lower CP cost.</>}
            </p>
          )}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={variant}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {variant === 'classic' && <ClassicDiagram b={b} />}
          {variant === 'hcp' && <HcpDiagram b={b} />}
          {variant === 'hyperfleet' && <HyperfleetContent mode={mode} />}
        </motion.div>
      </AnimatePresence>

      {variant !== 'hyperfleet' && (
        <>
          <ApiCallChain mode={mode} variant={variant === 'classic' ? 'rosa-classic' : 'rosa-hcp'} />
          <IamRbacBridge b={b} />
          <ExploreMore links={DEEP_DIVE_LINKS.rosa} />
        </>
      )}
    </div>
  );
}
