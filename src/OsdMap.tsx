import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server } from 'lucide-react';
import type { ExplainMode } from './types';
import { ApiCallChain } from './ApiCallChain';
import { ModeToggle } from './ModeToggle';
import { ExploreMore, DEEP_DIVE_LINKS } from './ExploreMore';
import { useGlossary } from './GlossaryContext';
import { GLOSSARY, createGlossarizer } from './Glossary';

type InfraModel = 'ccs' | 'rh-account';
type CloudProvider = 'aws' | 'gcp';

interface OsdMapProps {
  mode: ExplainMode;
  onModeChange: (mode: ExplainMode) => void;
}

interface DiagramProps {
  b: boolean;
  cloud: CloudProvider;
  infraModel: InfraModel;
}

function OsdDiagram({ b, cloud, infraModel }: DiagramProps) {
  const { show, hide } = useGlossary();
  const tip = (term: string, label?: string) => (
    <tspan fill="#78909C" className="svg-glossary-term"
      onMouseEnter={() => show(term, GLOSSARY[term])}
      onMouseLeave={hide}
    >{label || term}</tspan>
  );

  const isRh = infraModel === 'rh-account';
  const isAws = cloud === 'aws';

  // Cloud-specific colors and labels
  const cloudColor = isAws ? '#FF9900' : '#4285F4';
  const cloudBg = isAws ? '#FFF8E1' : '#E8F0FE';
  const cloudStroke = isAws ? '#FF9900' : '#4285F4';
  const cloudTextColor = isAws ? '#E65100' : '#1A73E8';
  const cloudIcon = isAws ? '☁️' : '☁️';
  const cloudName = isAws ? 'AWS' : 'GCP';
  const infraBorderColor = isAws ? '#FFE0B2' : '#C2D9FC';
  const infraBg = isAws ? '#FFF3E0' : '#E8F0FE';
  const infraStroke = isAws ? '#FFB74D' : '#A8C7FA';
  const infraTextColor = isAws ? '#E65100' : '#1A73E8';

  // Cloud zone label
  const cloudZoneLabel = isRh
    ? (b
      ? `${cloudIcon} ${cloudName} (Red Hat's account — you don't touch this)`
      : `${cloudIcon} RH-owned ${isAws ? 'AWS Account' : 'GCP Project'}`)
    : (b
      ? `${cloudIcon} Your ${isAws ? 'AWS Account' : 'Google Cloud Project'} (CCS — Customer Cloud Subscription)`
      : `${cloudIcon} Customer ${isAws ? 'AWS Account' : 'GCP Project'} (CCS Model)`);

  // Instance types
  const cpInstanceType = isAws ? '3× m5.xlarge' : '3× n1-standard-4';
  const poolBackend = isAws ? 'AWS ASG' : 'GCE MIG';

  // Cloud infra items
  const infraItems = isAws
    ? [
        b ? 'Network (VPC)' : 'VPC + Subnets',
        b ? 'Storage disks' : 'EBS Volumes',
        b ? 'Load balancers' : 'ELB / NLB',
        b ? 'DNS' : 'Route53',
        b ? 'Image storage' : 'S3 Registry',
      ]
    : [
        b ? 'Network (VPC)' : 'VPC + Subnets',
        b ? 'Storage disks' : 'Persistent Disks',
        b ? 'Load balancers' : 'Cloud Load Balancing',
        b ? 'DNS' : 'Cloud DNS',
        b ? 'Image storage' : 'GCS Registry',
        b ? 'Permissions' : 'IAM + Service Accounts',
      ];

  // Credential callout (AWS CCS only — static keys)
  const showCredentialCallout = isAws && !isRh;

  // Layout: RH Account wraps everything in red zone; CCS has separate red + cloud zones
  const redZoneHeight = isRh ? 440 : 120;
  const cloudZoneY = isRh ? 145 : 140;
  const cloudZoneHeight = isRh ? 290 : 310;
  const cloudZoneFill = isRh ? `rgba(${isAws ? '255,248,225' : '232,240,254'},0.5)` : cloudBg;
  const cloudZoneStrokeWidth = isRh ? 1.5 : 2;
  const cloudZoneStrokeDash = isRh ? '5 3' : undefined;

  const markerId = `osd-${cloud}-${infraModel}-arrow`;

  return (
    <svg viewBox="0 0 800 460" className="rosa-svg">
      {/* Red Hat zone */}
      <rect x="10" y="10" width="780" height={redZoneHeight} rx="14" fill="#FDE8E8" stroke="#CC0000" strokeWidth="2" />
      <text x="30" y="38" fontSize="14" fill="#CC0000" fontWeight="bold">
        🔴 {isRh
          ? (b ? `Red Hat Manages EVERYTHING (including the ${cloudName} account!)` : <>Red Hat ({tip('OCM')} + {tip('SRE')} + {cloudName} Account)</>)
          : (b ? 'Red Hat Manages (dedicated SRE team for YOUR cluster)' : <>Red Hat ({tip('OCM')} + Dedicated {tip('SRE')})</>)
        }
      </text>
      {isRh && (
        <text x="30" y="55" fontSize="9" fill="#C62828">
          {b ? `You don't need your own ${cloudName} account — Red Hat provides it all` : `Infrastructure in RH-owned ${isAws ? 'AWS account' : 'GCP project'}. Costs bundled in OSD subscription.`}
        </text>
      )}

      {/* OCM Console */}
      <rect x="30" y={isRh ? 65 : 50} width="210" height="70" rx="8" fill="#fff" stroke="#EF5350" strokeWidth="1.5" />
      <text x="45" y={isRh ? 83 : 68} fontSize="10" fill="#C62828" fontWeight="bold">🖥️ {b ? 'Your Dashboard' : <>{tip('OCM')} Console</>}</text>
      <text x="45" y={isRh ? 96 : 81} fontSize="7" fill="#777" fontFamily="monospace">console.redhat.com/openshift/</text>
      <text x="45" y={isRh ? 108 : 93} fontSize="7" fill="#777" fontFamily="monospace">details/&lt;cluster_id&gt;</text>
      <rect x="50" y={isRh ? 116 : 101} width="100" height="18" rx="9" fill="#0066CC" />
      <text x="72" y={isRh ? 128 : 113} fontSize="7" fill="#fff" fontWeight="bold">Open console</text>

      {/* SRE */}
      <rect x="260" y={isRh ? 65 : 50} width="165" height="70" rx="8" fill="#fff" stroke="#EF5350" strokeWidth="1.5" />
      <text x="275" y={isRh ? 83 : 68} fontSize="10" fill="#C62828" fontWeight="bold">
        {b ? '👷 Dedicated SRE Team' : <>👷 {tip('SRE')} (Dedicated)</>}
      </text>
      <text x="275" y={isRh ? 97 : 82} fontSize="8" fill="#777">{b ? 'A team assigned to YOUR cluster' : 'Backplane, PagerDuty, 24/7'}</text>
      <text x="275" y={isRh ? 109 : 94} fontSize="8" fill="#777">{b ? 'Monitoring & fixing 24/7' : ''}</text>
      {!isRh && (
        <text x="275" y="106" fontSize="7" fill="#C62828" fontStyle="italic">
          {b ? '← This is what "Dedicated" means!' : ''}
        </text>
      )}

      {/* Upgrades */}
      <rect x="440" y={isRh ? 65 : 50} width="130" height="70" rx="8" fill="#fff" stroke="#EF5350" strokeWidth="1.5" />
      <text x="455" y={isRh ? 87 : 72} fontSize="10" fill="#C62828" fontWeight="bold">{b ? '⬆️ Upgrades' : '⬆️ Upgrade Policies'}</text>
      <text x="455" y={isRh ? 101 : 86} fontSize="8" fill="#777">{b ? 'Managed for you' : 'Scheduled, SRE-managed'}</text>

      {/* Operators */}
      <rect x="585" y={isRh ? 65 : 50} width="190" height="70" rx="8" fill="#fff" stroke="#EF5350" strokeWidth="1.5" />
      <text x="600" y={isRh ? 87 : 72} fontSize="10" fill="#C62828" fontWeight="bold">{b ? '⚙️ Cluster Software' : '⚙️ Cluster Operators'}</text>
      <text x="600" y={isRh ? 101 : 86} fontSize="8" fill="#777">{b ? 'Monitoring, networking, etc.' : 'Ingress, monitoring, DNS, auth'}</text>

      {/* Cloud Account zone */}
      <rect
        x={isRh ? 30 : 10}
        y={cloudZoneY}
        width={isRh ? 740 : 780}
        height={cloudZoneHeight}
        rx={isRh ? 12 : 14}
        fill={cloudZoneFill}
        stroke={cloudStroke}
        strokeWidth={cloudZoneStrokeWidth}
        strokeDasharray={cloudZoneStrokeDash}
      />
      <text x={isRh ? 50 : 30} y={cloudZoneY + 25} fontSize={isRh ? 11 : 14} fill={cloudTextColor} fontWeight="bold">
        {cloudZoneLabel}
      </text>

      {/* OSD Cluster boundary */}
      <rect
        x={isRh ? 50 : 30}
        y={cloudZoneY + 35}
        width={isRh ? 500 : 740}
        height={isRh ? 240 : 260}
        rx={isRh ? 10 : 12}
        fill="rgba(255,255,255,0.5)"
        stroke={cloudColor}
        strokeWidth="1"
        strokeDasharray="5 3"
      />
      <text x={isRh ? 70 : 50} y={cloudZoneY + 55} fontSize="11" fill={cloudTextColor} fontWeight="bold">
        OSD Cluster ({cloudName})
      </text>

      {/* Control Plane */}
      <rect x={isRh ? 70 : 50} y={cloudZoneY + 65} width="320" height={isRh ? 60 : 70} rx="10" fill="#FFCDD2" stroke="#EF5350" strokeWidth="2" />
      <text x={isRh ? 85 : 65} y={cloudZoneY + 85} fontSize="10" fill="#B71C1C" fontWeight="bold">
        {b
          ? (isRh ? '🧠 Control Plane (managed by Red Hat)' : '🧠 Control Plane (managed by Red Hat, in your account)')
          : `🧠 Control Plane (${cpInstanceType}, SRE-managed)`
        }
      </text>
      {(b ? ['Front Door', 'Memory', 'Scheduler', 'Auto-Fixer'] : [<>{'API Server'}</>, tip('etcd'), 'Scheduler', 'Controllers']).map((label, i) => {
        const widths = [65, 50, 65, 85];
        const xOffset = [0, 73, 131, 204];
        const baseX = isRh ? 85 : 65;
        return (
          <g key={i}>
            <rect x={baseX + xOffset[i]} y={cloudZoneY + 95} width={widths[i]} height={isRh ? 22 : 28} rx="4" fill="#fff" stroke="#EF9A9A" strokeWidth="1" />
            <text x={baseX + xOffset[i] + 8} y={cloudZoneY + (isRh ? 110 : 113)} fontSize="7" fill="#C62828">{label}</text>
          </g>
        );
      })}

      {/* OCP Console */}
      <rect x={isRh ? 400 : 390} y={cloudZoneY + (isRh ? 60 : 55)} width={isRh ? 140 : 190} height={isRh ? 70 : 85} rx="10" fill="#E0F2F1" stroke="#4DB6AC" strokeWidth="2" />
      <text x={isRh ? 412 : 405} y={cloudZoneY + (isRh ? 80 : 78)} fontSize="10" fill="#00695C" fontWeight="bold">🎛️ {b ? 'Cluster Console' : <>{tip('OCP')} Console</>}</text>
      <text x={isRh ? 412 : 405} y={cloudZoneY + (isRh ? 96 : 94)} fontSize={isRh ? 7 : 8} fill="#00897B">console-openshift-console.apps.…</text>
      <text x={isRh ? 412 : 405} y={cloudZoneY + (isRh ? 110 : 110)} fontSize={isRh ? 7 : 8} fill="#00897B">{b ? 'See pods, deployments, logs' : 'Admin + Developer perspectives'}</text>
      {!isRh && (
        <text x="405" y={cloudZoneY + 126} fontSize="8" fill="#00897B">{b ? 'Manage YOUR apps here' : 'Workloads, Networking, Storage'}</text>
      )}

      {/* Open Console dashed arrow */}
      <defs>
        <marker id={markerId} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#CC0000" />
        </marker>
      </defs>
      <line
        x1="100"
        y1={isRh ? 134 : 119}
        x2={isRh ? 402 : 392}
        y2={cloudZoneY + (isRh ? 62 : 58)}
        stroke="#CC0000"
        strokeWidth="2"
        strokeDasharray="5 3"
        markerEnd={`url(#${markerId})`}
      />

      {/* Worker nodes */}
      <rect x={isRh ? 70 : 50} y={cloudZoneY + (isRh ? 140 : 150)} width={isRh ? 470 : 530} height={isRh ? 120 : 130} rx="10" fill="#F3E5F5" stroke="#BA68C8" strokeWidth="1.5" strokeDasharray="5 3" />
      <text x={isRh ? 85 : 65} y={cloudZoneY + (isRh ? 160 : 170)} fontSize="9" fill="#6A1B9A" fontWeight="bold">
        {b ? <>🏗️ {tip('Machine Pool')} (your worker machines)</> : <>🏗️ {tip('Machine Pool')} → {isAws ? <>{tip('AWS')} {tip('ASG')}</> : <>{tip('GCP')} {tip('MIG')}</>}</>}
      </text>

      {['Worker 1', 'Worker 2', 'Worker 3'].map((w, i) => {
        const baseX = isRh ? 90 : 70;
        const spacing = isRh ? 145 : 165;
        const boxW = isRh ? 125 : 145;
        const boxH = isRh ? 75 : 85;
        const wY = cloudZoneY + (isRh ? 170 : 180);
        return (
          <g key={i}>
            <rect x={baseX + i * spacing} y={wY} width={boxW} height={boxH} rx="6" fill="#EDE7F6" stroke="#CE93D8" strokeWidth="1" />
            <text x={baseX + 12 + i * spacing} y={wY + 16} fontSize="8" fill="#6A1B9A" fontWeight="bold">{b ? w : `worker-${i + 1}`}</text>
            <rect x={baseX + 10 + i * spacing} y={wY + 22} width="45" height={isRh ? 12 : 14} rx="3" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="0.8" />
            <rect x={baseX + 10 + i * spacing} y={wY + (isRh ? 38 : 40)} width="45" height={isRh ? 12 : 14} rx="3" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="0.8" />
            <rect x={baseX + 60 + i * spacing} y={wY + 22} width="45" height={isRh ? 12 : 14} rx="3" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="0.8" />
            <rect x={baseX + 60 + i * spacing} y={wY + (isRh ? 38 : 40)} width="45" height={isRh ? 12 : 14} rx="3" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="0.8" />
          </g>
        );
      })}

      {/* Cloud infra sidebar */}
      <rect
        x={isRh ? 560 : 600}
        y={cloudZoneY + (isRh ? 38 : 55)}
        width={isRh ? 195 : 155}
        height={isRh ? 240 : 225}
        rx="10"
        fill={infraBg}
        stroke={infraStroke}
        strokeWidth="1.5"
      />
      <text x={isRh ? 572 : 612} y={cloudZoneY + (isRh ? 58 : 75)} fontSize="9" fill={infraTextColor} fontWeight="bold">
        {b ? `🔧 ${cloudName} Services` : `🔧 ${cloudName} Infrastructure`}
      </text>

      {infraItems.map((item, i) => (
        <g key={i}>
          <rect
            x={isRh ? 572 : 612}
            y={cloudZoneY + (isRh ? 68 : 85) + i * 28}
            width={isRh ? 170 : 130}
            height={22}
            rx={4}
            fill="#fff"
            stroke={infraBorderColor}
            strokeWidth="1"
          />
          <text
            x={isRh ? 582 : 622}
            y={cloudZoneY + (isRh ? 83 : 100) + i * 28}
            fontSize="8"
            fill={isAws ? '#BF360C' : '#1565C0'}
          >
            {item}
          </text>
        </g>
      ))}

      {/* Credential callout for AWS CCS */}
      {showCredentialCallout && (
        <g>
          <rect x={612} y={cloudZoneY + 85 + infraItems.length * 28} width={130} height={22} rx={4} fill="#FFF9C4" stroke="#F9A825" strokeWidth="1.5" />
          <text x={622} y={cloudZoneY + 100 + infraItems.length * 28} fontSize="8" fill="#E65100" fontWeight="bold">
            {b ? '🔑 Access Key + Secret' : <>🔑 {tip('IAM')} User (static keys)</>}
          </text>
        </g>
      )}

      {/* RH Account cost callout */}
      {isRh && (
        <g>
          <text x={isRh ? 572 : 612} y={cloudZoneY + 68 + infraItems.length * 28 + 14} fontSize="8" fill="#C62828" fontWeight="bold">
            {b ? '💰 All costs bundled in your' : '💰 Infra costs included in'}
          </text>
          <text x={isRh ? 572 : 612} y={cloudZoneY + 68 + infraItems.length * 28 + 26} fontSize="8" fill="#C62828" fontWeight="bold">
            {b ? 'Red Hat subscription!' : 'OSD subscription'}
          </text>
        </g>
      )}
    </svg>
  );
}

export function OsdMap({ mode, onModeChange }: OsdMapProps) {
  const [infraModel, setInfraModel] = useState<InfraModel>('ccs');
  const [cloud, setCloud] = useState<CloudProvider>('aws');
  const b = mode === 'beginner';
  const g = createGlossarizer();

  return (
    <div className="rosa-map">
      <div className="rosa-controls">
        <div className="variant-toggle">
          <button className={`variant-btn ${infraModel === 'ccs' ? 'active' : ''}`} onClick={() => setInfraModel('ccs')}>
            {b ? '🔑 Your Cloud Account (CCS)' : 'CCS (Customer Cloud Sub)'}
          </button>
          <button className={`variant-btn ${infraModel === 'rh-account' ? 'active' : ''}`} onClick={() => setInfraModel('rh-account')}>
            {b ? '🔴 Red Hat\'s Cloud Account' : 'Red Hat Cloud Account'}
          </button>
        </div>
        <ModeToggle mode={mode} onModeChange={onModeChange} />
      </div>

      <h2 className="dd-page-title">
        <Server size={22} className="dd-title-icon" style={{ color: '#CC0000' }} />
        OSD — <em>OpenShift Dedicated</em>
      </h2>

      {/* What "Dedicated" means callout — above the SVG */}
      <div className="rosa-variant-note" style={{ borderLeft: '4px solid #CC0000' }}>
        <p><strong>🛡️ {b ? 'What does "Dedicated" mean?' : 'OSD "Dedicated" Model'}</strong></p>
        <p>{b
          ? '"Dedicated" means Red Hat assigns a dedicated SRE (Site Reliability Engineering) team to manage and operate your cluster around the clock. They handle upgrades, monitoring, patching, and incident response — so your team can focus entirely on building and deploying apps. It\'s like having a dedicated building superintendent for your apartment building.'
          : <>{g('OSD provides a dedicated SRE team per customer cluster. The SRE team manages the Control Plane, cluster operators, upgrades, and incident response via backplane access. Cluster-specific PagerDuty escalation. SLA-backed uptime guarantees. Available on AWS and GCP, CCS or Red Hat cloud account models.')}</>}
        </p>
      </div>

      {/* Cloud provider sub-toggle */}
      <div className="variant-toggle" style={{ marginBottom: 12, justifyContent: 'center', display: 'flex' }}>
        <button className={`variant-btn ${cloud === 'aws' ? 'active' : ''}`} onClick={() => setCloud('aws')}>
          <img src={import.meta.env.BASE_URL + 'logos/aws.svg'} alt="AWS" className="variant-logo" /> AWS
        </button>
        <button className={`variant-btn ${cloud === 'gcp' ? 'active' : ''}`} onClick={() => setCloud('gcp')}>
          <img src={import.meta.env.BASE_URL + 'logos/gcp.svg'} alt="GCP" className="variant-logo" /> GCP
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${infraModel}-${cloud}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <OsdDiagram b={b} cloud={cloud} infraModel={infraModel} />
        </motion.div>
      </AnimatePresence>

      <div className="rosa-variant-note">
        <p>{infraModel === 'ccs'
          ? (b
            ? `📌 CCS Model: The cluster runs in YOUR ${cloud === 'aws' ? 'AWS account' : 'Google Cloud project'}. You pay ${cloud === 'aws' ? 'AWS' : 'Google'} directly for compute, storage, and networking. Red Hat manages the cluster but you own the cloud resources.`
            : <>{g(`📌 OSD ${cloud.toUpperCase()} (CCS): Cluster in customer ${cloud === 'aws' ? 'AWS account' : 'GCP project'}. Customer pays ${cloud === 'aws' ? 'AWS' : 'GCP'} directly. Customer provides ${cloud === 'aws' ? 'IAM credentials' : 'service account credentials'}. ${cloud === 'aws' ? 'm5.xlarge instances. ASG-based' : 'n1-standard instances. GCE MIG-based'} Machine Pools.`)}</>)
          : (b
            ? `📌 Red Hat Account Model: The cluster runs in a ${cloud === 'aws' ? 'AWS account' : 'Google Cloud project'} owned by Red Hat. You don't need your own ${cloud === 'aws' ? 'AWS' : 'GCP'} account! All infrastructure costs are bundled into your OSD subscription.`
            : <>{g(`📌 OSD ${cloud.toUpperCase()} (RH Account): Cluster in RH-owned ${cloud === 'aws' ? 'AWS account' : 'GCP project'}. Infrastructure costs bundled in OSD subscription. No customer cloud credentials needed. Simplified billing.`)}</>)
        }
        </p>
      </div>

      <div className="rosa-variant-note" style={{ borderLeft: '4px solid #7B1FA2' }}>
        <p><strong>🏢 {b ? 'Two ways to pay for the cloud infrastructure' : 'Infrastructure Models: CCS vs Red Hat Account'}</strong></p>
        <p>{b
          ? '• CCS (Customer Cloud Subscription): The cluster runs in YOUR cloud account. You pay the cloud provider (AWS/GCP) directly for compute, storage, and networking. Red Hat charges a separate OSD subscription fee. You have full visibility into your cloud bill.'
          : '• CCS: Cluster in customer-owned cloud account. Customer pays cloud provider directly. Full billing visibility. Customer provides cloud credentials to Red Hat for provisioning.'}
        </p>
        <p style={{ marginTop: '8px' }}>{b
          ? '• Red Hat cloud account: The cluster runs in a cloud account owned by Red Hat. You don\'t need your own AWS/GCP account! Infrastructure costs are bundled into your Red Hat subscription — simpler billing, but less cloud-level visibility.'
          : '• Red Hat cloud account: Cluster in RH-owned cloud project. Infrastructure costs bundled in OSD subscription. No customer cloud credentials needed. Less granular cost attribution.'}
        </p>
      </div>

      <ApiCallChain mode={mode} variant={cloud === 'aws' ? 'osd-aws' : 'osd-gcp'} />

      {/* AWS credential model — the KEY difference */}
      <div className="rosa-variant-note" style={{ borderLeft: '4px solid #FF9900' }}>
        <p><strong>🔑 {b ? 'The #1 difference on AWS: How Red Hat connects to your account' : <>{g('AWS')} Credential Model: {g('OSD')} vs {g('ROSA')}</>}</strong></p>
        <p>{b
          ? 'OSD AWS: You give Red Hat a long-lived AWS Access Key ID and Secret Access Key. Red Hat stores these credentials and uses them to manage your cluster. If they\'re compromised, an attacker could access your AWS account until you rotate them.'
          : <>{g('OSD')} {g('AWS')}: Static {g('IAM')} user credentials (Access Key ID + Secret Access Key). Stored by Red Hat. Broad permissions. Must be manually rotated. Single point of credential compromise.</>}
        </p>
        <p style={{ marginTop: '8px' }}>{b
          ? 'ROSA: Uses AWS STS (Security Token Service) with IAM Roles. No long-lived keys! Red Hat "assumes" specific roles with temporary tokens that expire automatically. Each component gets only the permissions it needs — much more secure.'
          : <>{g('ROSA')}: {g('STS')} (Security Token Service) with scoped {g('IAM')} Roles. Temporary credentials via AssumeRoleWithWebIdentity ({g('OIDC')}). Per-component roles (Installer, Support, ControlPlane, Worker). Tokens expire in ≤1 hour. Least-privilege by design.</>}
        </p>
        <p style={{ marginTop: '8px', fontWeight: 600, color: '#C62828' }}>{b
          ? '⚠️ This is the main reason ROSA is recommended over OSD for new AWS clusters — it\'s significantly more secure.'
          : <>{g('⚠️ STS is the recommended credential model. OSD\'s static keys are considered legacy. New AWS deployments should use ROSA.')}</>}
        </p>
      </div>

      <div className="rosa-bridge">
        <h4>{b ? '🔄 OSD AWS vs ROSA — Full comparison' : '🔄 OSD AWS vs ROSA Comparison'}</h4>
        <div className="rosa-bridge-content">
          <div className="rosa-bridge-side">
            <strong style={{ color: '#CC0000' }}>OSD on AWS</strong>
            <p>{b
              ? '• The original managed OpenShift on AWS\n• Uses long-lived AWS access keys 🔑\n• Available on AWS and GCP\n• Control plane always in your account\n• ~45 min to create\n• Still supported, but legacy'
              : <>{g('• Legacy managed offering\n• Static IAM credentials (Access Key + Secret)\n• AWS + GCP (CCS)\n• In-cluster Control Plane\n• MachineSet-based pools\n• ~45 min provisioning')}</>}
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
              : <>{g('• AWS-native via STS (OIDC + AssumeRole)\n• Temporary, scoped credentials\n• AWS Marketplace integration\n• Classic (in-cluster CP) or HCP (hosted CP)\n• HCP: NodePool-based, ~10 min\n• ✅ Recommended for new AWS deployments')}</>}
            </p>
          </div>
        </div>
      </div>

      <ExploreMore links={DEEP_DIVE_LINKS.osd} />
    </div>
  );
}
