import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';
import type { ExplainMode } from './types';
import { ModeToggle } from './ModeToggle';
import { ExploreMore, DEEP_DIVE_LINKS } from './ExploreMore';
import { useGlossary } from './GlossaryContext';
import { GLOSSARY, createGlossarizer } from './Glossary';

type ArchView = 'today' | 'hyperfleet';

interface HyperfleetMapProps {
  mode: ExplainMode;
  onModeChange: (mode: ExplainMode) => void;
}

function TodayDiagram({ b }: { b: boolean }) {
  const { show, hide } = useGlossary();
  const tip = (term: string, label?: string) => (
    <tspan fill="#78909C" className="svg-glossary-term"
      fontFamily={term === 'clusters_mgmt' ? 'Courier New, Courier, monospace' : undefined}
      onMouseEnter={() => show(term, GLOSSARY[term])}
      onMouseLeave={hide}
    >{label || term}</tspan>
  );

  return (
    <svg viewBox="0 0 800 420" className="rosa-svg">
      {/* Red Hat centralized zone */}
      <rect x="150" y="10" width="500" height="170" rx="14" fill="#FDE8E8" stroke="#CC0000" strokeWidth="2" />
      <text x="170" y="38" fontSize="14" fill="#CC0000" fontWeight="bold">
        {b ? '🔴 Red Hat — Single Location (Virginia, USA)' : '🔴 Red Hat — us-east-1 (Centralized)'}
      </text>

      {/* OCM */}
      <rect x="170" y="55" width="200" height="55" rx="8" fill="#fff" stroke="#EF5350" strokeWidth="1.5" />
      <text x="185" y="75" fontSize="10" fill="#C62828" fontWeight="bold">🖥️ {b ? 'OCM (Your Dashboard)' : <>{tip('OCM')} Console</>}</text>
      <text x="185" y="90" fontSize="7" fill="#777" fontFamily="monospace">console.redhat.com/openshift</text>
      <text x="185" y="100" fontSize="7" fill="#777">{b ? 'Manages ALL clusters worldwide' : 'Single global endpoint'}</text>

      {/* Clusters Service API */}
      <rect x="400" y="55" width="230" height="55" rx="8" fill="#fff" stroke="#EF5350" strokeWidth="1.5" />
      <text x="415" y="75" fontSize="10" fill="#C62828" fontWeight="bold">{b ? '⚙️ Cluster Management API' : <>{tip('clusters_mgmt')} API</>}</text>
      <text x="415" y="90" fontSize="7" fill="#777" fontFamily="Courier New, Courier, monospace">api.openshift.com</text>
      <text x="415" y="100" fontSize="7" fill="#777">{b ? 'One API for everything' : 'V1 — single regional instance'}</text>

      {/* Auth */}
      <rect x="170" y="120" width="140" height="45" rx="8" fill="#fff" stroke="#EF5350" strokeWidth="1.5" />
      <text x="185" y="140" fontSize="9" fill="#C62828" fontWeight="bold">{b ? '🔑 Red Hat Login' : <>🔑 RH {tip('SSO')} (Bearer)</>}</text>
      <text x="185" y="153" fontSize="7" fill="#777">{b ? 'Username + password' : <>{tip('OAuth')}2, offline_access token</>}</text>

      {/* SRE */}
      <rect x="330" y="120" width="120" height="45" rx="8" fill="#fff" stroke="#EF5350" strokeWidth="1.5" />
      <text x="345" y="140" fontSize="9" fill="#C62828" fontWeight="bold">👷 {b ? 'SRE Team' : tip('SRE')}</text>
      <text x="345" y="153" fontSize="7" fill="#777">{b ? 'Monitors 24/7' : 'Backplane, PagerDuty'}</text>

      {/* RBAC */}
      <rect x="470" y="120" width="160" height="45" rx="8" fill="#fff" stroke="#EF5350" strokeWidth="1.5" />
      <text x="485" y="140" fontSize="9" fill="#C62828" fontWeight="bold">{b ? '👥 Permissions' : <>{tip('RBAC')} ({tip('AMS')})</>}</text>
      <text x="485" y="153" fontSize="7" fill="#777">{b ? 'Org Admin, roles' : <>Role assignments via {tip('AMS')}</>}</text>

      {/* Lines from Red Hat to clusters worldwide */}
      <line x1="300" y1="180" x2="120" y2="260" stroke="#999" strokeWidth="1.5" strokeDasharray="5 3" />
      <line x1="400" y1="180" x2="400" y2="260" stroke="#999" strokeWidth="1.5" strokeDasharray="5 3" />
      <line x1="500" y1="180" x2="680" y2="260" stroke="#999" strokeWidth="1.5" strokeDasharray="5 3" />

      {/* Distance/latency labels — Frankfurt (middle) and Tokyo connectors */}
      <text x="400" y="218" fontSize="8" fill="#999" transform="rotate(0 400 218)">{b ? '⚡ long distance' : 'cross-region latency'}</text>
      <text x="550" y="225" fontSize="8" fill="#999" transform="rotate(25 550 225)">{b ? '⚡ long distance' : 'cross-region latency'}</text>

      {/* Customer clusters worldwide */}
      {[
        { x: 30, label: b ? '🇺🇸 US East' : 'us-east-1', sublabel: b ? 'Cluster A' : 'HCP Cluster' },
        { x: 300, label: b ? '🇩🇪 Frankfurt' : 'eu-central-1', sublabel: b ? 'Cluster B' : 'HCP Cluster' },
        { x: 580, label: b ? '🇯🇵 Tokyo' : 'ap-northeast-1', sublabel: b ? 'Cluster C' : 'HCP Cluster' },
      ].map((r, i) => (
        <g key={i}>
          <rect x={r.x} y="260" width="200" height="140" rx="12" fill="#FFF8E1" stroke="#FF9900" strokeWidth="2" />
          <text x={r.x + 15} y="285" fontSize="11" fill="#E65100" fontWeight="bold">🟠 {r.label}</text>
          <rect x={r.x + 15} y="295" width="170" height="35" rx="6" fill="#EDE7F6" stroke="#CE93D8" strokeWidth="1" />
          <text x={r.x + 25} y="316" fontSize="9" fill="#6A1B9A">{r.sublabel}</text>
          <rect x={r.x + 15} y="338" width="80" height="22" rx="4" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="1" />
          <text x={r.x + 22} y="353" fontSize="7" fill="#2E7D32">Workers</text>
          <rect x={r.x + 105} y="338" width="80" height="22" rx="4" fill="#FFF3E0" stroke="#FFB74D" strokeWidth="1" />
          <text x={r.x + 112} y="353" fontSize="7" fill="#E65100">AWS Infra</text>
        </g>
      ))}

      {/* Warning callout */}
      <rect x="120" y="405" width="560" height="14" rx="4" fill="#FFF9C4" stroke="#FBC02D" strokeWidth="0.8" />
      <text x="400" y="415" textAnchor="middle" fontSize="8" fill="#F57F17" fontWeight="bold">
        {b ? '⚠️ ALL cluster metadata goes to Virginia, even for clusters in Tokyo or Frankfurt' : '⚠️ All cluster metadata stored in us-east-1 regardless of cluster region'}
      </text>
    </svg>
  );
}

function ClusterCreateDiagram({ b }: { b: boolean }) {
  const { show, hide } = useGlossary();
  const tip = (term: string, label?: string) => (
    <tspan fill="#78909C" className="svg-glossary-term"
      fontFamily={term === 'clusters_mgmt' ? 'Courier New, Courier, monospace' : undefined}
      onMouseEnter={() => show(term, GLOSSARY[term])}
      onMouseLeave={hide}
    >{label || term}</tspan>
  );

  if (b) {
    return (
      <>
        <svg viewBox="0 0 660 468" className="rosa-svg">
          {/* Aiko */}
          <rect x="10" y="10" width="640" height="40" rx="8" fill="#F3E5F5" stroke="#9C27B0" strokeWidth="1.5" />
          <text x="330" y="28" textAnchor="middle" fontSize="11" fill="#6A1B9A" fontWeight="bold">🇯🇵 Aiko opens console.redhat.com/openshift with Region set to Tokyo</text>
          <text x="330" y="43" textAnchor="middle" fontSize="9" fill="#7B1FA2">Clicks "Create Cluster" · fills in settings (VPC, node size, version)</text>

          {/* arrow */}
          <line x1="330" y1="50" x2="330" y2="66" stroke="#9C27B0" strokeWidth="1.8" />
          <polygon points="325,62 330,70 335,62" fill="#9C27B0" />
          <rect x="338" y="52" width="148" height="14" rx="3" fill="#F3E5F5" />
          <text x="344" y="63" fontSize="8.5" fill="#6A1B9A">create cluster in Tokyo</text>

          {/* UI + Translator */}
          <rect x="10" y="70" width="640" height="38" rx="8" fill="#E8EAF6" stroke="#3949AB" strokeWidth="1.2" />
          <text x="330" y="87" textAnchor="middle" fontSize="10.5" fill="#283593" fontWeight="bold">Region switcher = Tokyo → create goes only to the Tokyo Platform API</text>
          <text x="330" y="102" textAnchor="middle" fontSize="9" fill="#444">Tokyo is an example region, not an announced one. Menu options come from a backend regions API (assumption).</text>

          {/* arrow */}
          <line x1="330" y1="108" x2="330" y2="124" stroke="#E65100" strokeWidth="1.8" />
          <polygon points="325,120 330,128 335,120" fill="#E65100" />

          {/* Tokyo RC */}
          <rect x="10" y="128" width="640" height="108" rx="10" fill="#FDE8E8" stroke="#CC0000" strokeWidth="2" />
          <text x="24" y="148" fontSize="12" fill="#CC0000" fontWeight="bold">🔴 Tokyo Regional Cluster (RC) — Red Hat's infra, ap-northeast-1</text>
          <rect x="18" y="155" width="304" height="72" rx="7" fill="#fff" stroke="#EF5350" strokeWidth="1" />
          <text x="30" y="173" fontSize="10" fill="#C62828" fontWeight="bold">⚙️ Platform API</text>
          <text x="30" y="188" fontSize="9" fill="#444">Receives + validates create request</text>
          <text x="30" y="203" fontSize="9" fill="#444">Checks Cedar policies, account link</text>
          <text x="30" y="218" fontSize="9" fill="#444">Returns: cluster ID + status</text>
          <rect x="332" y="155" width="310" height="72" rx="7" fill="#E8F5E9" stroke="#66BB6A" strokeWidth="1" />
          <text x="344" y="173" fontSize="10" fill="#2E7D32" fontWeight="bold">🗄️ Aurora DB (Tokyo)</text>
          <text x="344" y="188" fontSize="9" fill="#444">Stores desired cluster state</text>
          <text x="344" y="203" fontSize="9" fill="#444">Source of truth for this region</text>
          <text x="344" y="218" fontSize="9" fill="#2E7D32" fontWeight="600">Data stays in Tokyo ✅</text>

          {/* arrow */}
          <line x1="330" y1="236" x2="330" y2="252" stroke="#7B1FA2" strokeWidth="1.8" />
          <polygon points="325,248 330,256 335,248" fill="#7B1FA2" />

          {/* Tokyo MC */}
          <rect x="10" y="256" width="640" height="80" rx="10" fill="#EDE7F6" stroke="#7B1FA2" strokeWidth="1.8" />
          <text x="24" y="274" fontSize="12" fill="#6A1B9A" fontWeight="bold">🖥 Tokyo Management Cluster (MC)</text>
          <text x="24" y="288" fontSize="9" fill="#7E57C2">Red Hat's EKS cluster in ap-northeast-1 — runs Aiko's control plane in its own isolated space</text>
          <rect x="18" y="296" width="304" height="32" rx="6" fill="#fff" stroke="#CE93D8" strokeWidth="1" />
          <text x="30" y="311" fontSize="9.5" fill="#6A1B9A" fontWeight="bold">📥 Config Sync Agent</text>
          <text x="30" y="325" fontSize="9" fill="#444">Pulls state from Aurora, applies it</text>
          <rect x="332" y="296" width="310" height="32" rx="6" fill="#FFCDD2" stroke="#EF5350" strokeWidth="1" />
          <text x="344" y="311" fontSize="9.5" fill="#B71C1C" fontWeight="bold">🧠 Aiko's Control Plane</text>
          <text x="344" y="325" fontSize="9" fill="#444">HyperShift namespace — isolated to her cluster</text>

          {/* arrow */}
          <line x1="330" y1="336" x2="330" y2="352" stroke="#FF9900" strokeWidth="1.8" />
          <polygon points="325,348 330,356 335,348" fill="#FF9900" />

          {/* Aiko's AWS Tokyo */}
          <rect x="10" y="356" width="640" height="56" rx="10" fill="#FFF8E1" stroke="#FF9900" strokeWidth="1.8" />
          <text x="24" y="376" fontSize="11" fill="#E65100" fontWeight="bold">🟠 Aiko's AWS Account — ap-northeast-1 (Tokyo)</text>
          <rect x="18" y="382" width="196" height="22" rx="5" fill="#F3E5F5" stroke="#BA68C8" strokeWidth="1" />
          <text x="30" y="396" fontSize="9" fill="#6A1B9A">Worker machines (Node Pool)</text>
          <rect x="224" y="382" width="196" height="22" rx="5" fill="#FFF3E0" stroke="#FFB74D" strokeWidth="1" />
          <text x="236" y="396" fontSize="9" fill="#E65100">VPC · EBS · Route53 · IAM</text>
          <rect x="430" y="382" width="212" height="22" rx="5" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="1" />
          <text x="442" y="396" fontSize="9" fill="#2E7D32">Aiko's apps run here 🇯🇵</text>

          {/* Result */}
          <rect x="10" y="424" width="640" height="34" rx="8" fill="#E8F5E9" stroke="#2E7D32" strokeWidth="1.5" />
          <text x="330" y="439" textAnchor="middle" fontSize="10" fill="#1B5E20" fontWeight="bold">✅ Cluster created — control plane, data, and workers all in Tokyo</text>
          <text x="330" y="455" textAnchor="middle" fontSize="9" fill="#2E7D32">Aiko used a global website, but everything that matters stays in her region</text>
        </svg>

        <div className="rosa-variant-note" style={{ borderLeft: '4px solid #7B1FA2', marginTop: '12px' }}>
          <p><strong>🌐 But when Aiko lists her clusters…</strong></p>
          <p>She stays on the same website and sets the Region switcher to Tokyo. The list calls only the Tokyo Platform API, so she sees her Tokyo clusters. Switching to Global shows the clusters on today's API. Tokyo's data stays in Tokyo; the switcher changes which API the page calls.</p>
        </div>
      </>
    );
  }

  /* Expert */
  return (
    <>
      <svg viewBox="0 0 720 476" className="rosa-svg">
        {/* Aiko */}
        <rect x="10" y="10" width="700" height="32" rx="7" fill="#F3E5F5" stroke="#9C27B0" strokeWidth="1.2" />
        <text x="360" y="24" textAnchor="middle" fontSize="9.5" fill="#6A1B9A" fontWeight="bold">🇯🇵 Aiko (ap-northeast-1) — POST /clusters (region=ap-northeast-1) via console.redhat.com/openshift · RH SSO Bearer token</text>
        <text x="360" y="36" textAnchor="middle" fontSize="8.5" fill="#7B1FA2">HostedClusterSpec: release, platform.type=AWS, networking, FIPS, nodePool config</text>

        {/* arrow */}
        <line x1="360" y1="42" x2="360" y2="56" stroke="#9C27B0" strokeWidth="1.5" />
        <polygon points="355,52 360,60 365,52" fill="#9C27B0" />

        {/* BFF */}
        <rect x="10" y="60" width="700" height="34" rx="7" fill="#FFF8E1" stroke="#F9A825" strokeWidth="1.5" />
        <text x="360" y="76" textAnchor="middle" fontSize="9.5" fill="#E65100" fontWeight="bold">Region switcher = ap-northeast-1 → one POST to that Platform API</text>
        <text x="360" y="88" textAnchor="middle" fontSize="8.5" fill="#444">No cross-region fan-out. Switcher options: assume a backend regions API (not in the blog).</text>

        {/* arrow */}
        <line x1="360" y1="94" x2="360" y2="108" stroke="#E65100" strokeWidth="1.5" />
        <polygon points="355,104 360,112 365,104" fill="#E65100" />

        {/* Tokyo RC */}
        <rect x="10" y="112" width="700" height="108" rx="9" fill="#FDE8E8" stroke="#CC0000" strokeWidth="1.8" />
        <text x="24" y="130" fontSize="10" fill="#CC0000" fontWeight="bold">🔴 RC (EKS) — ap-northeast-1 · Red Hat's account</text>
        <rect x="18" y="136" width="336" height="76" rx="6" fill="#fff" stroke="#EF5350" strokeWidth="1" />
        <text x="28" y="153" fontSize="9" fill="#C62828" fontWeight="bold">⚙️ Platform API (v1alpha1)</text>
        <text x="28" y="167" fontSize="8.5" fill="#444">Auth: {tip('SigV4')} · Authz: {tip('Cedar')} (permit ClusterAdmin action)</text>
        <text x="28" y="181" fontSize="8.5" fill="#444">Validates: account link, VPC exists, quota</text>
        <text x="28" y="195" fontSize="8.5" fill="#444">Writes to hyperfleet-db · returns 202 + cluster ID</text>
        <text x="28" y="207" fontSize="7.5" fill="#777" fontStyle="italic">{tip('DynamoDB')} fan-out triggers kube-applier reconcile</text>
        <rect x="364" y="136" width="338" height="76" rx="6" fill="#E8F5E9" stroke="#66BB6A" strokeWidth="1" />
        <text x="374" y="153" fontSize="9" fill="#2E7D32" fontWeight="bold">🗄️ hyperfleet-db ({tip('Aurora')} PostgreSQL, ap-northeast-1)</text>
        <text x="374" y="167" fontSize="8.5" fill="#444">Stores HostedCluster CR desired state</text>
        <text x="374" y="181" fontSize="8.5" fill="#444">Regional source of truth — data does not leave ap-northeast-1</text>
        <text x="374" y="195" fontSize="8.5" fill="#2E7D32" fontWeight="600">Data sovereignty: Tokyo ✅</text>
        <text x="374" y="207" fontSize="7.5" fill="#777" fontStyle="italic">{tip('DynamoDB')} GSI for read fan-out (cross-region reads only)</text>

        {/* arrow */}
        <line x1="360" y1="220" x2="360" y2="234" stroke="#7B1FA2" strokeWidth="1.5" />
        <polygon points="355,230 360,238 365,230" fill="#7B1FA2" />

        {/* MC */}
        <rect x="10" y="238" width="700" height="78" rx="9" fill="#EDE7F6" stroke="#7B1FA2" strokeWidth="1.5" />
        <text x="24" y="255" fontSize="10" fill="#6A1B9A" fontWeight="bold">🖥 MC (EKS) — ap-northeast-1 · {tip('namespace')}/Aiko-cluster-id</text>
        <rect x="18" y="262" width="336" height="46" rx="5" fill="#fff" stroke="#CE93D8" strokeWidth="1" />
        <text x="28" y="277" fontSize="9" fill="#6A1B9A" fontWeight="bold">📥 kube-applier (pull-based)</text>
        <text x="28" y="291" fontSize="8.5" fill="#444">Watches {tip('DynamoDB')} stream · applies {tip('HostedCluster')} CR</text>
        <text x="28" y="304" fontSize="8.5" fill="#444">{tip('HyperShift')} reconciles: {tip('OIDC')}, {tip('KAS')}, etcd, ingress</text>
        <rect x="364" y="262" width="338" height="46" rx="5" fill="#FFCDD2" stroke="#EF5350" strokeWidth="1" />
        <text x="374" y="277" fontSize="9" fill="#B71C1C" fontWeight="bold">🧠 HostedControlPlane (Aiko's namespace)</text>
        <text x="374" y="291" fontSize="8.5" fill="#444">{tip('RBAC')} + {tip('NetworkPolicy')} isolation · {tip('Karpenter')} provisions nodes</text>
        <text x="374" y="304" fontSize="8.5" fill="#444">Credentials via {tip('ZOA')} ({tip('Lambda')} + Trusted Actions)</text>

        {/* arrow */}
        <line x1="360" y1="316" x2="360" y2="330" stroke="#FF9900" strokeWidth="1.5" />
        <polygon points="355,326 360,334 365,326" fill="#FF9900" />

        {/* AWS */}
        <rect x="10" y="334" width="700" height="62" rx="8" fill="#FFF8E1" stroke="#FF9900" strokeWidth="1.5" />
        <text x="24" y="352" fontSize="10" fill="#E65100" fontWeight="bold">🟠 Aiko's AWS Account — ap-northeast-1</text>
        <text x="24" y="367" fontSize="8.5" fill="#444">{tip('NodePool')}: {tip('Karpenter')}-managed EC2 · {tip('VPC')}/{tip('EBS')}/{tip('Route53')}/{tip('STS')} roles · {tip('OIDC')} provider</text>
        <text x="24" y="381" fontSize="8.5" fill="#444">Workers run Aiko's pods · {tip('SRE')} access via {tip('ZOA')} only (no standing credentials)</text>

        {/* Result */}
        <rect x="10" y="408" width="700" height="22" rx="6" fill="#E8F5E9" stroke="#2E7D32" strokeWidth="1.2" />
        <text x="360" y="422" textAnchor="middle" fontSize="9" fill="#1B5E20" fontWeight="bold">✅ HostedCluster provisioned — control plane in ap-northeast-1 MC · state in ap-northeast-1 Aurora · workers in Aiko's AWS account</text>

        {/* Assumption */}
        <rect x="10" y="442" width="700" height="24" rx="6" fill="#FFF3E0" stroke="#FF9800" strokeWidth="1" />
        <text x="20" y="454" fontSize="8.5" fill="#CC0000" fontWeight="700">Assumption: </text>
        <text x="100" y="454" fontSize="8.5" fill="#444">Listing uses the same switcher: one region, one API. The regions catalog API is the open question.</text>
      </svg>

      <div className="rosa-variant-note" style={{ borderLeft: '4px solid #7B1FA2', marginTop: '12px' }}>
        <p><strong>One switcher for create and for list</strong></p>
        <p style={{ fontSize: '12px' }}>Tokyo is an example region. Red Hat has not named Tokyo or Frankfurt as regions HyperFleet will support. Create and list both follow the Region switcher. In this example, Tokyo writes and reads the ap-northeast-1 Platform API. Global reads and writes <span className="code-term">clusters_mgmt</span>. The open question is the API that fills the switcher with the regions this user is allowed to select.</p>
      </div>
    </>
  );
}

const MOCK_REGIONS = [
  'US East, Ohio - us-east-2 (AWS)',
  'EU, Frankfurt - eu-central-1 (AWS)',
  'Asia Pacific, Tokyo - ap-northeast-1 (AWS)',
  'Ashburn, Northern Virginia, USA - us-east4 (GCP)',
  'Los Angeles, California, USA - us-west2 (GCP)',
] as const;
type MockRegion = (typeof MOCK_REGIONS)[number];

const MOCK_CLUSTERS: { name: string; status: string; type: string; created: string; version: string; region: MockRegion; hyperfleet: 'Yes' | 'No' }[] = [
  { name: 'payments-prod', status: 'Ready', type: 'OSD', created: '23 Sep 2026', version: '4.21.14', region: 'Ashburn, Northern Virginia, USA - us-east4 (GCP)', hyperfleet: 'No' },
  { name: 'checkout-stage', status: 'Installing', type: 'OSD', created: '23 Sep 2026', version: '4.22.14', region: 'Los Angeles, California, USA - us-west2 (GCP)', hyperfleet: 'No' },
  { name: 'rosa-hcp-ohio', status: 'Ready', type: 'ROSA', created: '30 Jun 2026', version: '4.21.14', region: 'US East, Ohio - us-east-2 (AWS)', hyperfleet: 'No' },
  { name: 'rosa-hf-ohio-payments', status: 'Ready', type: 'ROSA', created: '04 Sep 2026', version: '4.21.14', region: 'US East, Ohio - us-east-2 (AWS)', hyperfleet: 'Yes' },
  { name: 'rosa-hf-ohio-edge', status: 'Installing', type: 'ROSA', created: '23 Sep 2026', version: '4.22.14', region: 'US East, Ohio - us-east-2 (AWS)', hyperfleet: 'Yes' },
  { name: 'rosa-hcp-frankfurt-payments', status: 'Ready', type: 'ROSA', created: '12 Aug 2026', version: '4.21.14', region: 'EU, Frankfurt - eu-central-1 (AWS)', hyperfleet: 'No' },
  { name: 'rosa-hf-frankfurt', status: 'Ready', type: 'ROSA', created: '19 Sep 2026', version: '4.21.14', region: 'EU, Frankfurt - eu-central-1 (AWS)', hyperfleet: 'Yes' },
  { name: 'osd-frankfurt-dev', status: 'Ready', type: 'OSD', created: '02 Sep 2026', version: '4.20.8', region: 'EU, Frankfurt - eu-central-1 (AWS)', hyperfleet: 'No' },
  { name: 'rosa-hcp-tokyo-edge', status: 'Ready', type: 'ROSA', created: '18 Jul 2026', version: '4.21.14', region: 'Asia Pacific, Tokyo - ap-northeast-1 (AWS)', hyperfleet: 'No' },
  { name: 'rosa-hf-tokyo', status: 'Installing', type: 'ROSA', created: '23 Sep 2026', version: '4.22.14', region: 'Asia Pacific, Tokyo - ap-northeast-1 (AWS)', hyperfleet: 'Yes' },
];

function ClusterListMock() {
  const [region, setRegion] = useState<MockRegion>('US East, Ohio - us-east-2 (AWS)');
  const [menuOpen, setMenuOpen] = useState(false);
  const [nameQuery, setNameQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const rows = MOCK_CLUSTERS.filter((cluster) => {
    if (cluster.region !== region) return false;
    if (typeFilter !== 'all' && cluster.type !== typeFilter) return false;
    if (nameQuery && !cluster.name.toLowerCase().includes(nameQuery.trim().toLowerCase())) return false;
    return true;
  });

  return (
    <>
      <p className="hf-mock-note"><em>Interactive mock — the Region dropdown, name filter, and cluster type filter all work. Creating a cluster requires a region.</em></p>
      <div className="hf-mock">
        <div className="hf-mock-crumb">
          <span>Red Hat Hybrid Cloud Console</span><span>›</span><span>OpenShift</span><span>›</span><span>Fleet management</span><span>›</span><span>Clusters</span>
        </div>
        <h3>Clusters</h3>
        <div className="hf-region-bar">
          <label htmlFor="hf-region-btn">Region:</label>
          <div className="hf-region-dd">
            <button id="hf-region-btn" type="button" className="hf-region-btn" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
              {region}
            </button>
            {menuOpen && (
              <ul className="hf-region-menu" role="listbox">
                {MOCK_REGIONS.map((option) => (
                  <li key={option}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={option === region}
                      onClick={() => { setRegion(option); setMenuOpen(false); }}
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="hf-mock-tabs">
          <button type="button" className="hf-mock-tab active">Cluster List</button>
          <button type="button" className="hf-mock-tab">Cluster Requests</button>
        </div>
        <div className="hf-mock-toolbar">
          <input value={nameQuery} onChange={(event) => setNameQuery(event.target.value)} placeholder="Filter by name or ID..." aria-label="Filter by name or ID" />
          <select value={typeFilter} aria-label="Cluster type" onChange={(event) => setTypeFilter(event.target.value)}>
            <option value="all">Cluster type</option>
            <option value="OSD">OSD</option>
            <option value="ROSA">ROSA</option>
          </select>
          <button type="button" className="hf-btn hf-btn-primary">Create cluster</button>
          <button type="button" className="hf-btn hf-btn-secondary">Register cluster</button>
          <button type="button" className="hf-linkish">View cluster archives</button>
        </div>
        <div className="hf-mock-meta">
          <span>View only my clusters</span>
          <span>{rows.length === 0 ? '0' : `1 - ${rows.length}`} of {rows.length}</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th><th>Status</th><th>Type</th><th>Created</th><th>Version</th><th>Region (Provider)</th><th>HyperFleet</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td colSpan={7}>No clusters match.</td></tr>
            ) : rows.map((cluster) => (
              <tr key={cluster.name}>
                <td><a href="#cluster-list-mock" onClick={(event) => event.preventDefault()}>{cluster.name}</a></td>
                <td><span className={`hf-status ${cluster.status === 'Ready' ? 'ready' : 'pending'}`}>{cluster.status}</span></td>
                <td>{cluster.type}</td>
                <td>{cluster.created}</td>
                <td>{cluster.version}</td>
                <td>{cluster.region}</td>
                <td>{cluster.hyperfleet}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function OverviewDiagram({ b }: { b: boolean }) {
  const { show, hide } = useGlossary();
  const tip = (term: string, label?: string) => (
    <tspan fill="#78909C" className="svg-glossary-term"
      fontFamily={term === 'clusters_mgmt' ? 'Courier New, Courier, monospace' : undefined}
      onMouseEnter={() => show(term, GLOSSARY[term])}
      onMouseLeave={hide}
    >{label || term}</tspan>
  );

  if (b) {
    return (
      <svg viewBox="0 0 660 408" className="rosa-svg">
        <rect x="10" y="10" width="640" height="40" rx="8" fill="#F5F5F5" stroke="#9E9E9E" strokeWidth="1.5" />
        <text x="330" y="28" textAnchor="middle" fontSize="11" fill="#333" fontWeight="bold">🌐 Your Browser</text>
        <text x="330" y="43" textAnchor="middle" fontSize="9" fill="#666">Same website as today: console.redhat.com/openshift</text>

        <line x1="330" y1="50" x2="330" y2="64" stroke="#E65100" strokeWidth="1.8" />
        <polygon points="325,60 330,68 335,60" fill="#E65100" />

        <rect x="10" y="72" width="640" height="56" rx="8" fill="#FFF8E1" stroke="#F9A825" strokeWidth="1.5" />
        <text x="330" y="88" textAnchor="middle" fontSize="10" fill="#CC0000" fontWeight="700">Assumption — where the menu options come from</text>
        <text x="330" y="104" textAnchor="middle" fontSize="9" fill="#444">A backend API returns the regions this user can select. Not described in the architecture blog.</text>
        <text x="330" y="118" textAnchor="middle" fontSize="9" fill="#444">Frontend will query v1 and existing multi-region clusters, then HyperFleet regions available to the user.</text>

        <line x1="330" y1="128" x2="330" y2="142" stroke="#1565C0" strokeWidth="1.8" />
        <polygon points="325,138 330,146 335,138" fill="#1565C0" />

        <rect x="10" y="150" width="640" height="108" rx="8" fill="#E8EAF6" stroke="#3949AB" strokeWidth="1.5" />
        <text x="330" y="168" textAnchor="middle" fontSize="11" fill="#283593" fontWeight="bold">🖥️ Clusters page — Region</text>
        <text x="330" y="184" textAnchor="middle" fontSize="9" fill="#444">You pick one Region. The table shows clusters there. Creating a cluster requires a region.</text>
        <rect x="24" y="192" width="612" height="16" rx="4" fill="#283593" stroke="#283593" strokeWidth="1" />
        <text x="330" y="203" textAnchor="middle" fontSize="8" fill="#fff" fontWeight="bold">US East, Ohio - us-east-2 (AWS)</text>
        <rect x="24" y="210" width="612" height="16" rx="4" fill="#fff" stroke="#90A4AE" strokeWidth="1" />
        <text x="330" y="221" textAnchor="middle" fontSize="8" fill="#546E7A">EU, Frankfurt - eu-central-1 (AWS)</text>
        <rect x="24" y="228" width="612" height="16" rx="4" fill="#fff" stroke="#90A4AE" strokeWidth="1" />
        <text x="330" y="239" textAnchor="middle" fontSize="8" fill="#546E7A">Asia Pacific, Tokyo - ap-northeast-1 (AWS)</text>

        <line x1="330" y1="258" x2="330" y2="274" stroke="#283593" strokeWidth="1.8" />
        <polygon points="325,270 330,278 335,270" fill="#283593" />
        <text x="348" y="272" fontSize="8.5" fill="#283593">list clusters in Ohio</text>

        <rect x="10" y="282" width="640" height="78" rx="8" fill="#E8EAF6" stroke="#283593" strokeWidth="1.5" />
        <text x="330" y="304" textAnchor="middle" fontSize="11" fill="#283593" fontWeight="bold">⚙️ Ohio clusters — v1 and HyperFleet</text>
        <text x="330" y="322" textAnchor="middle" fontSize="9" fill="#333">HyperFleet clusters are listed in the same region as v1 clusters.</text>
        <text x="330" y="338" textAnchor="middle" fontSize="9" fill="#333">The HyperFleet column says which rows are which.</text>
        <text x="330" y="352" textAnchor="middle" fontSize="8" fill="#777" fontStyle="italic">One region at a time — the table is not a mix of every region</text>

        <rect x="130" y="374" width="400" height="26" rx="7" fill="#E8F5E9" stroke="#2E7D32" strokeWidth="1.5" />
        <text x="330" y="391" textAnchor="middle" fontSize="10" fill="#1B5E20" fontWeight="bold">✅ Ohio table shows v1 and HyperFleet clusters together</text>
      </svg>
    );
  }

  /* Expert */
  return (
    <svg viewBox="0 0 720 396" className="rosa-svg">
      <rect x="10" y="10" width="700" height="36" rx="7" fill="#F5F5F5" stroke="#9E9E9E" strokeWidth="1.2" />
      <text x="360" y="32" textAnchor="middle" fontSize="10" fill="#333" fontWeight="bold">🌐 Browser — console.redhat.com/openshift · RH {tip('SSO')} session via consoledot chrome</text>

      <line x1="360" y1="46" x2="360" y2="58" stroke="#E65100" strokeWidth="1.5" />
      <polygon points="355,54 360,62 365,54" fill="#E65100" />

      <rect x="10" y="66" width="700" height="50" rx="7" fill="#FFF8E1" stroke="#F9A825" strokeWidth="1.5" />
      <text x="360" y="82" textAnchor="middle" fontSize="9.5" fill="#CC0000" fontWeight="700">Assumption — where the menu options come from</text>
      <text x="360" y="96" textAnchor="middle" fontSize="8.5" fill="#444">UI calls a backend API for the regions this user may select. Endpoint not in the architecture blog or the Platform API spec.</text>
      <text x="360" y="110" textAnchor="middle" fontSize="8.5" fill="#444">Frontend will query v1 and existing multi-region clusters, then HyperFleet regions available to the user.</text>

      <line x1="360" y1="116" x2="360" y2="128" stroke="#1565C0" strokeWidth="1.5" />
      <polygon points="355,124 360,132 365,124" fill="#1565C0" />

      <rect x="10" y="136" width="700" height="68" rx="7" fill="#E8EAF6" stroke="#3949AB" strokeWidth="1.5" />
      <text x="360" y="154" textAnchor="middle" fontSize="10" fill="#283593" fontWeight="bold">Region — one selection, one list</text>
      <text x="360" y="170" textAnchor="middle" fontSize="8.5" fill="#444">US East, Ohio - us-east-2 (AWS) → GET {tip('clusters_mgmt')} /clusters and that region&apos;s Platform API /clusters</text>
      <text x="360" y="186" textAnchor="middle" fontSize="8.5" fill="#444">One region list. HyperFleet Yes/No marks which rows came from which API.</text>

      <text x="190" y="206" textAnchor="middle" fontSize="7.5" fill="#757575">v1 rows in Ohio</text>
      <line x1="190" y1="210" x2="190" y2="226" stroke="#757575" strokeWidth="1.2" />
      <polygon points="185,222 190,230 195,222" fill="#757575" />
      <text x="545" y="206" textAnchor="middle" fontSize="7.5" fill="#283593">HyperFleet rows in Ohio</text>
      <line x1="545" y1="210" x2="545" y2="226" stroke="#283593" strokeWidth="1.2" />
      <polygon points="540,222 545,230 550,222" fill="#283593" />

      <rect x="10" y="234" width="360" height="72" rx="7" fill="#FDE8E8" stroke="#CC0000" strokeWidth="1.2" />
      <text x="190" y="254" textAnchor="middle" fontSize="9.5" fill="#C62828" fontWeight="bold">📡 {tip('clusters_mgmt')} (V1)</text>
      <text x="190" y="270" textAnchor="middle" fontSize="8.5" fill="#555" fontFamily="Courier New, Courier, monospace">api.openshift.com/api/clusters_mgmt/v1</text>
      <text x="190" y="286" textAnchor="middle" fontSize="8" fill="#444">HyperFleet = No in the Ohio list</text>
      <text x="190" y="300" textAnchor="middle" fontSize="8" fill="#666" fontStyle="italic">Auth: RH {tip('SSO')} bearer · same as today</text>

      <rect x="380" y="234" width="330" height="80" rx="7" fill="#E8EAF6" stroke="#283593" strokeWidth="1.2" />
      <text x="545" y="252" textAnchor="middle" fontSize="9.5" fill="#283593" fontWeight="bold">⚙️ Platform API — us-east-2</text>
      <text x="545" y="268" textAnchor="middle" fontSize="8.5" fill="#555" fontStyle="italic">URL not public (v1alpha1)</text>
      <text x="545" y="284" textAnchor="middle" fontSize="7.5" fill="#444">Same region selection as the v1 call</text>
      <text x="545" y="296" textAnchor="middle" fontSize="7.5" fill="#444">HyperFleet = Yes in the Ohio list</text>
      <text x="545" y="308" textAnchor="middle" fontSize="8" fill="#666" fontStyle="italic">Auth: {tip('SigV4')} · Authz: {tip('Cedar')}</text>

      <rect x="110" y="328" width="500" height="22" rx="6" fill="#E8F5E9" stroke="#2E7D32" strokeWidth="1.2" />
      <text x="360" y="343" textAnchor="middle" fontSize="9" fill="#1B5E20" fontWeight="bold">Both results are one Ohio table. Other regions are not called.</text>

      <rect x="10" y="362" width="700" height="22" rx="6" fill="#E3F2FD" stroke="#90CAF9" strokeWidth="1" />
      <text x="360" y="377" textAnchor="middle" fontSize="8.5" fill="#1565C0">rosa CLI is separate: rosactl login --url stores one Platform API URL and lists that region only.</text>
    </svg>
  );
}

function HyperfleetDiagram({ b }: { b: boolean }) {
  const { show, hide } = useGlossary();
  const tip = (term: string, label?: string) => (
    <tspan fill="#78909C" className="svg-glossary-term"
      fontFamily={term === 'clusters_mgmt' ? 'Courier New, Courier, monospace' : undefined}
      onMouseEnter={() => show(term, GLOSSARY[term])}
      onMouseLeave={hide}
    >{label || term}</tspan>
  );

  /* ── BEGINNER: single-region exemplar, plain English, large text ── */
  if (b) {
    return (
      <svg viewBox="0 0 680 592" className="rosa-svg">

        {/* ×3 badge */}
        <rect x="10" y="4" width="660" height="24" rx="8" fill="#E8EAF6" stroke="#7986CB" strokeWidth="1.2" />
        <text x="340" y="20" textAnchor="middle" fontSize="9" fill="#283593" fontWeight="bold">
          Frankfurt and Tokyo are example names, not an announced HyperFleet launch list. Diagram shows one region.
        </text>

        {/* ── Red Hat Regional Cluster ── */}
        <rect x="10" y="34" width="660" height="192" rx="12" fill="#FDE8E8" stroke="#CC0000" strokeWidth="2" />
        <text x="24" y="55" fontSize="13" fill="#CC0000" fontWeight="bold">🔴 Red Hat Regional Cluster</text>

        {/* Platform API */}
        <rect x="18" y="62" width="308" height="82" rx="8" fill="#fff" stroke="#EF5350" strokeWidth="1.2" />
        <text x="30" y="82" fontSize="11" fill="#C62828" fontWeight="bold">⚙️ Your Cluster Control Panel</text>
        <text x="30" y="98" fontSize="9" fill="#555">Where you send commands to create,</text>
        <text x="30" y="112" fontSize="9" fill="#555">scale, or delete clusters</text>
        <text x="30" y="131" fontSize="8" fill="#aaa" fontStyle="italic">(Platform API — uses your AWS login)</text>

        {/* Fleet DB */}
        <rect x="338" y="62" width="324" height="82" rx="8" fill="#E8F5E9" stroke="#66BB6A" strokeWidth="1.2" />
        <text x="350" y="82" fontSize="11" fill="#2E7D32" fontWeight="bold">🗄️ Cluster State Database</text>
        <text x="350" y="98" fontSize="9" fill="#555">Records the desired state of every</text>
        <text x="350" y="112" fontSize="9" fill="#555">cluster in this region right now</text>
        <text x="350" y="131" fontSize="8" fill="#aaa" fontStyle="italic">(Aurora PostgreSQL via hyperfleet-db)</text>

        {/* RHOBS */}
        <rect x="18" y="151" width="644" height="38" rx="8" fill="#E8EAF6" stroke="#7986CB" strokeWidth="1" />
        <text x="30" y="167" fontSize="10" fill="#283593" fontWeight="bold">📊 Monitoring — SRE dashboards (Grafana)</text>
        <text x="30" y="181" fontSize="9" fill="#555">Red Hat engineers watch all clusters 24 / 7 and get alerted if anything goes wrong</text>

        {/* HF Operator */}
        <rect x="18" y="195" width="644" height="24" rx="6" fill="#FFF3E0" stroke="#FFB74D" strokeWidth="1" />
        <text x="30" y="211" fontSize="9" fill="#E65100">
          ⚡ HyperFleet Operator — automatically pauses non-critical alerts while a cluster update is in progress
        </text>

        {/* ── Relay ── */}
        <line x1="340" y1="226" x2="340" y2="240" stroke="#7986CB" strokeWidth="2" strokeDasharray="5 3" />
        <rect x="60" y="240" width="560" height="26" rx="7" fill="#E8EAF6" stroke="#7986CB" strokeWidth="1.2" />
        <text x="340" y="256" textAnchor="middle" fontSize="9.5" fill="#283593" fontWeight="bold">
          📤 Settings relay — sends desired cluster state down to the Management Cluster below
        </text>
        <line x1="340" y1="266" x2="340" y2="282" stroke="#7986CB" strokeWidth="2" strokeDasharray="5 3" />
        <polygon points="334,278 340,286 346,278" fill="#7986CB" />

        {/* ── Management Cluster (MC) ── */}
        <rect x="10" y="292" width="660" height="150" rx="12" fill="#EDE7F6" stroke="#7B1FA2" strokeWidth="2" />
        <text x="24" y="312" fontSize="13" fill="#6A1B9A" fontWeight="bold">🖥 Management Cluster (MC)</text>
        <text x="24" y="327" fontSize="9" fill="#7E57C2">Red Hat's EKS cluster · same region · your control plane runs here in its own isolated space</text>

        {/* Settings Fetcher */}
        <rect x="18" y="335" width="308" height="80" rx="8" fill="#fff" stroke="#CE93D8" strokeWidth="1.2" />
        <text x="30" y="353" fontSize="11" fill="#6A1B9A" fontWeight="bold">📥 Config Sync Agent</text>
        <text x="30" y="369" fontSize="9" fill="#555">Fetches desired cluster state from</text>
        <text x="30" y="384" fontSize="9" fill="#555">the relay, applies it here</text>
        <text x="30" y="403" fontSize="8" fill="#aaa" fontStyle="italic">(kube-applier — pull-based)</text>

        {/* Control Plane Engine */}
        <rect x="338" y="335" width="324" height="80" rx="8" fill="#FFCDD2" stroke="#EF5350" strokeWidth="1.2" />
        <text x="350" y="353" fontSize="11" fill="#B71C1C" fontWeight="bold">🧠 Your Control Plane</text>
        <text x="350" y="369" fontSize="9" fill="#555">Runs in its own isolated namespace —</text>
        <text x="350" y="384" fontSize="9" fill="#555">Red Hat's infra, but only your cluster</text>
        <text x="350" y="403" fontSize="8" fill="#aaa" fontStyle="italic">(HyperShift HostedCluster)</text>

        {/* Lifecycle row */}
        <rect x="18" y="418" width="644" height="20" rx="6" fill="#fff" stroke="#CE93D8" strokeWidth="0.8" />
        <text x="30" y="432" fontSize="9.5" fill="#6A1B9A">🔑 Certificate manager · 🌐 DNS manager · 📊 Cluster health checks</text>

        {/* Arrow */}
        <line x1="340" y1="448" x2="340" y2="466" stroke="#FF9900" strokeWidth="2.5" />
        <polygon points="334,462 340,470 346,462" fill="#FF9900" />

        {/* ── Customer AWS ── */}
        <rect x="10" y="472" width="660" height="116" rx="12" fill="#FFF8E1" stroke="#FF9900" strokeWidth="2" />
        <text x="24" y="493" fontSize="13" fill="#E65100" fontWeight="bold">🟠 Your AWS Account</text>

        {/* Workers */}
        <rect x="18" y="499" width="310" height="76" rx="8" fill="#F3E5F5" stroke="#BA68C8" strokeWidth="1" strokeDasharray="4 2" />
        <text x="30" y="515" fontSize="10" fill="#6A1B9A" fontWeight="bold">Node Pool (your worker machines)</text>
        {[0, 1, 2].map(j => (
          <g key={j}>
            <rect x={30 + j * 93} y={520} width={84} height={20} rx="4" fill="#EDE7F6" stroke="#CE93D8" strokeWidth="0.8" />
            <text x={36 + j * 93} y={533} fontSize="8.5" fill="#6A1B9A">Worker {j + 1}</text>
            <rect x={30 + j * 93} y={544} width={84} height={14} rx="3" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="0.5" />
            <text x={36 + j * 93} y={554} fontSize="7.5" fill="#2E7D32">your pods</text>
          </g>
        ))}

        {/* AWS Infra */}
        <rect x="338" y="499" width="324" height="76" rx="8" fill="#FFF3E0" stroke="#FFB74D" strokeWidth="1" />
        <text x="350" y="515" fontSize="10" fill="#E65100" fontWeight="bold">🔧 AWS Infrastructure</text>
        {['🌐 Virtual network (VPC)', '💿 Storage disks (EBS)', '🔤 DNS routing (Route53)', '🔑 Access permissions (IAM)'].map((s, j) => (
          <g key={j}>
            <rect x="350" y={520 + j * 14} width="304" height="12" rx="2" fill="#fff" stroke="#FFE0B2" strokeWidth="0.5" />
            <text x="356" y={530 + j * 14} fontSize="8.5" fill="#BF360C">{s}</text>
          </g>
        ))}

        {/* Bottom callout */}
        <rect x="10" y="595" width="660" height="0" fill="none" />
      </svg>
    );
  }

  /* ── EXPERT: 3-column, viewBox 720px wide (11% bigger than 800px at same display width) ── */
  const regions = [
    { cx: 4,   label: 'us-east-1' },
    { cx: 244, label: 'eu-central-1' },
    { cx: 484, label: 'ap-northeast-1' },
  ];
  const cw = 232;

  return (
    <>
    <p className="hf-mock-note"><em>The three columns are example regions. Frankfurt (eu-central-1) and Tokyo (ap-northeast-1) are not regions Red Hat has said HyperFleet will support.</em></p>
    <svg viewBox="0 0 720 520" className="rosa-svg">
      {regions.map(({ cx, label }, i) => (
        <g key={i}>

          {/* ── RC ── */}
          <rect x={cx} y={10} width={cw} height={156} rx="10" fill="#FDE8E8" stroke="#CC0000" strokeWidth="1.8" />
          <text x={cx + 10} y={27} fontSize="9" fill="#CC0000" fontWeight="bold">
            🔴 RC (EKS) — {label}
          </text>

          {/* Platform API (left) */}
          <rect x={cx + 8} y={33} width={106} height={44} rx="5" fill="#fff" stroke="#EF5350" strokeWidth="1" />
          <text x={cx + 14} y={49} fontSize="8" fill="#C62828" fontWeight="bold">⚙️ Platform API</text>
          <text x={cx + 14} y={62} fontSize="7" fill="#777">{tip('SigV4')} auth</text>
          <text x={cx + 14} y={72} fontSize="7" fill="#777">{tip('Cedar')} authz</text>

          {/* Fleet DB (right) */}
          <rect x={cx + 118} y={33} width={106} height={44} rx="5" fill="#E8F5E9" stroke="#66BB6A" strokeWidth="1" />
          <text x={cx + 124} y={49} fontSize="8" fill="#2E7D32" fontWeight="bold">🗄️ Fleet DB</text>
          <text x={cx + 124} y={62} fontSize="7" fill="#555">{tip('Aurora')}</text>
          <text x={cx + 124} y={72} fontSize="7" fill="#555">hyperfleet-db</text>

          {/* RHOBS */}
          <rect x={cx + 8} y={83} width={216} height={32} rx="5" fill="#E8EAF6" stroke="#7986CB" strokeWidth="1" />
          <text x={cx + 14} y={97} fontSize="8" fill="#283593" fontWeight="bold">
            📊 {tip('RHOBS')}: {tip('Thanos')} · {tip('Loki')} · {tip('Alertmanager')}
          </text>
          <text x={cx + 14} y={109} fontSize="7" fill="#555">Grafana via {tip('ALB')} + RH {tip('SSO')}</text>

          {/* HF Operator */}
          <rect x={cx + 8} y={121} width={216} height={24} rx="5" fill="#FFF3E0" stroke="#FFB74D" strokeWidth="1" />
          <text x={cx + 14} y={133} fontSize="7.5" fill="#E65100">⚡ HyperFleet Operator</text>
          <text x={cx + 14} y={143} fontSize="6.5" fill="#E65100">— reconciles {tip('Alertmanager')} silences</text>

          {/* RC footer */}
          <rect x={cx + 8} y={151} width={216} height={12} rx="3" fill="rgba(204,0,0,0.07)" />
          <text x={cx + 116} y={160} textAnchor="middle" fontSize="6.5" fill="#C62828" fontStyle="italic">
            {tip('SigV4')} auth · {tip('Cedar')} authz · {tip('ZOA')} ops
          </text>

          {/* ── DynamoDB relay ── */}
          <line x1={cx + 116} y1={166} x2={cx + 116} y2={178} stroke="#7986CB" strokeWidth="1.5" strokeDasharray="3 2" />
          <rect x={cx + 58} y={178} width={116} height={18} rx="4" fill="#E8EAF6" stroke="#7986CB" strokeWidth="1" />
          <text x={cx + 116} y={190} textAnchor="middle" fontSize="6.5" fill="#283593" fontWeight="bold">
            {tip('DynamoDB')} fan-out → kube-applier
          </text>
          <line x1={cx + 116} y1={196} x2={cx + 116} y2={213} stroke="#7986CB" strokeWidth="1.5" strokeDasharray="3 2" />
          <polygon points={`${cx + 112},209 ${cx + 116},217 ${cx + 120},209`} fill="#7986CB" />

          {/* ── MC ── */}
          <rect x={cx} y={219} width={cw} height={118} rx="10" fill="#EDE7F6" stroke="#7B1FA2" strokeWidth="1.5" />
          <text x={cx + 10} y={235} fontSize="9" fill="#6A1B9A" fontWeight="bold">
            🖥 MC ({tip('EKS')})
          </text>

          {/* kube-applier */}
          <rect x={cx + 8} y={241} width={106} height={44} rx="5" fill="#fff" stroke="#CE93D8" strokeWidth="1" />
          <text x={cx + 14} y={256} fontSize="8" fill="#6A1B9A" fontWeight="bold">kube-applier</text>
          <text x={cx + 14} y={268} fontSize="7" fill="#777">pull-based</text>
          <text x={cx + 14} y={278} fontSize="7" fill="#777">replaces Maestro</text>

          {/* HyperShift */}
          <rect x={cx + 118} y={241} width={106} height={44} rx="5" fill="#FFCDD2" stroke="#EF5350" strokeWidth="1" />
          <text x={cx + 124} y={256} fontSize="8" fill="#B71C1C" fontWeight="bold">{tip('HyperShift')}</text>
          <text x={cx + 124} y={268} fontSize="7" fill="#777">HostedCluster</text>
          <text x={cx + 124} y={278} fontSize="7" fill="#777">+ NodePools</text>

          {/* Lifecycle */}
          <rect x={cx + 8} y={291} width={216} height={20} rx="5" fill="#fff" stroke="#CE93D8" strokeWidth="0.8" />
          <text x={cx + 14} y={304} fontSize="7" fill="#6A1B9A">
            {tip('CertManager')} · {tip('ExternalDNS')} · O11y ({tip('Prometheus')})
          </text>

          {/* MC footer */}
          <rect x={cx + 8} y={317} width={216} height={13} rx="3" fill="rgba(123,31,162,0.07)" />
          <text x={cx + 116} y={327} textAnchor="middle" fontSize="6.5" fill="#6A1B9A" fontStyle="italic">
            Cluster Namespace: HostedCluster + NodePools + …
          </text>

          {/* Arrow */}
          <line x1={cx + 116} y1={337} x2={cx + 116} y2={354} stroke="#FF9900" strokeWidth="1.5" />
          <polygon points={`${cx + 112},350 ${cx + 116},358 ${cx + 120},350`} fill="#FF9900" />

          {/* ── Customer AWS ── */}
          <rect x={cx} y={360} width={cw} height={118} rx="10" fill="#FFF8E1" stroke="#FF9900" strokeWidth="1.5" />
          <text x={cx + 10} y={377} fontSize="9" fill="#E65100" fontWeight="bold">🟠 Customer AWS</text>

          {/* Workers */}
          <rect x={cx + 8} y={383} width={106} height={84} rx="6" fill="#F3E5F5" stroke="#BA68C8" strokeWidth="1" strokeDasharray="4 2" />
          <text x={cx + 14} y={397} fontSize="8" fill="#6A1B9A" fontWeight="bold">{tip('Node Pool', 'NodePool')} → {tip('ASG')}</text>
          {[0, 1].map(j => (
            <g key={j}>
              <rect x={cx + 14 + j * 48} y={403} width={42} height={20} rx="3" fill="#EDE7F6" stroke="#CE93D8" strokeWidth="0.8" />
              <text x={cx + 18 + j * 48} y={416} fontSize="7" fill="#6A1B9A">worker-{j}</text>
              <rect x={cx + 14 + j * 48} y={427} width={42} height={14} rx="3" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="0.5" />
              <text x={cx + 18 + j * 48} y={437} fontSize="6.5" fill="#2E7D32">pods</text>
            </g>
          ))}

          {/* AWS Infra */}
          <rect x={cx + 118} y={383} width={106} height={84} rx="6" fill="#FFF3E0" stroke="#FFB74D" strokeWidth="1" />
          <text x={cx + 124} y={397} fontSize="8" fill="#E65100" fontWeight="bold">🔧 Infra</text>
          {[<>{tip('VPC')}</>, <>{tip('EBS')}</>, <>{tip('Route53')}</>, <>{tip('STS')} Roles</>].map((s, j) => (
            <g key={j}>
              <rect x={cx + 124} y={403 + j * 14} width={92} height={12} rx="2" fill="#fff" stroke="#FFE0B2" strokeWidth="0.5" />
              <text x={cx + 128} y={413 + j * 14} fontSize="6.5" fill="#BF360C">{s}</text>
            </g>
          ))}

        </g>
      ))}

      {/* Bottom callout */}
      <rect x="50" y="488" width="620" height="26" rx="8" fill="#E8F5E9" stroke="#66BB6A" strokeWidth="1.2" />
      <text x="360" y="499" textAnchor="middle" fontSize="8" fill="#2E7D32" fontWeight="bold">
        ✅ RC (Aurora + Platform API) fans desired state to MCs (kube-applier + HyperShift) — no cross-region state
      </text>
      <text x="360" y="511" textAnchor="middle" fontSize="7" fill="#558B2F">
        Nodes via {tip('Karpenter')} ({tip('RHEL')}/{tip('FIPS')}). No standing operator access — {tip('ZOA')}.
      </text>
    </svg>
    </>
  );
}
function AuthComparison({ b }: { b: boolean }) {
  const g = createGlossarizer();

  return (
    <div className="rosa-bridge">
      <h4>{b ? '🔑 How You Log In — Today vs HyperFleet' : '🔑 Authentication Model Comparison'}</h4>
      <div className="rosa-bridge-content">
        <div className="rosa-bridge-side">
          <strong style={{ color: '#CC0000' }}>{b ? 'Today' : <>{g('clusters_mgmt')} (V1)</>}</strong>
          <p>{b
            ? '• You log in with your Red Hat username & password\n• Your browser gets a "session pass" (token)\n• That pass is sent with every request\n• Permissions: your Red Hat org role (like "Org Admin")'
            : <>{g('• Red Hat SSO (consoledot chrome auth)\n• Bearer token in Authorization header\n• RBAC roles assigned in AMS\n• Org Admin, Cluster Editor, etc.')}</>}
          </p>
        </div>
        <div className="rosa-bridge-arrow">
          <span>{b ? 'changing to' : '→'}</span>
          <div className="rosa-bridge-arrow-line" style={{ background: 'linear-gradient(to right, #CC0000, #283593)' }} />
        </div>
        <div className="rosa-bridge-side">
          <strong style={{ color: '#283593' }}>{b ? 'HyperFleet' : 'Platform API (V2)'}</strong>
          {b ? (
            <>
              <p style={{ marginBottom: '6px' }}>
                One-time prerequisite added to <strong>ROSA HCP get-started</strong>:
              </p>
              <div style={{ background: '#1E1E1E', borderRadius: '6px', padding: '8px 12px', fontFamily: 'monospace', fontSize: '12px', color: '#CE9178', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                <span>rosa link account --hyperfleet</span>
                <button
                  onClick={() => navigator.clipboard.writeText('rosa link account --hyperfleet')}
                  style={{ background: 'none', border: '1px solid #555', borderRadius: '4px', color: '#ccc', padding: '2px 7px', fontSize: '11px', cursor: 'pointer', flexShrink: 0 }}
                  title="Copy to clipboard"
                >
                  copy
                </button>
              </div>
              <p style={{ fontSize: '12px', color: '#555' }}>
                Links your AWS account to your Red Hat org — run once, before the wizard. After that, the CLI signs requests with your AWS credentials. The website login stays a Red Hat account. <em>How that login becomes an AWS-signed call has not been determined.</em>
              </p>
              <p style={{ fontSize: '12px', color: '#555', marginTop: '6px' }}>
                Permissions become Cedar rules (e.g. "allow clusters only in Frankfurt") instead of fixed org roles.
              </p>
            </>
          ) : (
            <>
              <p style={{ marginBottom: '6px', fontSize: '12px' }}>
                New step in <strong>ROSA HCP get-started flow</strong>:
              </p>
              <div style={{ background: '#1E1E1E', borderRadius: '6px', padding: '6px 10px', fontFamily: 'monospace', fontSize: '11px', color: '#CE9178', marginBottom: '8px' }}>
                rosa link account --hyperfleet
              </div>
              <p style={{ fontSize: '12px', color: '#555' }}>{g('Maps RH org ↔ AWS IAM principal. Likely pre-populated from existing Accounts & Roles data. CLI then signs with the AWS credential chain (SigV4). How the browser login becomes an AWS-signed call has not been determined. Cedar policies replace AMS RBAC roles.')}</p>
              <p style={{ fontSize: '12px', color: '#555', marginTop: '6px' }}>{g('Console URL: console.redhat.com/openshift (unchanged). Backend API: regional endpoint — exact URL TBD (v1alpha1, not yet public; pattern: ')}<span className="code-term">api.rosa.&lt;region&gt;.openshift.com/v2alpha1/</span>{g('). Action groups: ReadOnly, ClusterAdmin, NodePoolAdmin, PolicyAdmin.')}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function CedarPolicies({ b }: { b: boolean }) {
  const g = createGlossarizer();

  return (
    <div className="rosa-bridge">
      <h4>{b ? '📋 Cedar Policies — A New Way to Control Access' : <>📋 {g('Cedar')} Authorization Model</>}</h4>
      <div className="rosa-bridge-content" style={{ flexDirection: 'column', gap: '8px' }}>
        <div className="rosa-variant-note" style={{ borderLeft: '4px solid #E65100' }}>
          <p>{b
            ? 'Instead of assigning roles like "Cluster Admin", you write rules. These rules can be very specific — like "allow this person to create clusters, but only in the Frankfurt region, and only with the \'development\' label".'
            : <>{g('Cedar')} uses default-deny, permit-unless-forbid semantics. Policies are global, attachments can be global or regional. Resources have parent-child hierarchy (Cluster → {g('NodePool')}, AccessEntry). Action groups: ReadOnly, ClusterAdmin, NodePoolAdmin, AccessEntryAdmin, LabelAdmin, PolicyAdmin.</>}
          </p>
        </div>
        {b ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div className="rosa-variant-note" style={{ borderLeft: '4px solid #2E7D32' }}>
              <p><strong>✅ Allow rule example:</strong></p>
              <p>"This AWS user can view all clusters and manage their own"</p>
            </div>
            <div className="rosa-variant-note" style={{ borderLeft: '4px solid #C62828' }}>
              <p><strong>🚫 Block rule example:</strong></p>
              <p>"Nobody can delete clusters labeled 'production' — ever, even if other rules say they can"</p>
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div className="rosa-variant-note" style={{ borderLeft: '4px solid #2E7D32' }}>
              <p><strong>permit example:</strong></p>
              <p style={{ fontFamily: 'monospace', fontSize: '11px' }}>{'permit(?principal, action in ROSA::Action::"ClusterAdmin", resource) when { context.region in ["eu-central-1"] };'}</p>
            </div>
            <div className="rosa-variant-note" style={{ borderLeft: '4px solid #C62828' }}>
              <p><strong>forbid example:</strong></p>
              <p style={{ fontFamily: 'monospace', fontSize: '11px' }}>{'forbid(?principal, action == ROSA::Action::"DeleteCluster", resource) when { resource.labels["Environment"] == "production" };'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function RegionalExample({ b }: { b: boolean }) {
  const g = createGlossarizer();

  const liStyle: React.CSSProperties = { marginBottom: '4px' };
  const olStyle: React.CSSProperties = { margin: 0, paddingLeft: '18px', fontSize: '12px', color: '#555', lineHeight: 1.75 };

  const todayItems = b
    ? [
        'Aiko in Tokyo requests a cluster in ap-northeast-1',
        'Request travels to Virginia, USA (us-east-1)',
        'OCM stores cluster metadata in Virginia',
        'Control plane managed from Virginia',
        '⚡ ~200ms latency on every API call',
        '⚠️ Cluster metadata stored outside Japan',
      ]
    : [
        <>POST <span className="code-term">api.openshift.com</span>/clusters (us-east-1)</>,
        'Cluster metadata persisted in us-east-1',
        'HyperShift reconciles on us-east-1 MC',
        'Cross-region latency for all API operations',
        'Data residency concerns for JP compliance',
      ];

  const hyperfleetItems = b
    ? [
        'Aiko requests a cluster in ap-northeast-1',
        'Request goes to the Tokyo Platform API',
        'Metadata stays in Tokyo',
        'Control plane runs on Tokyo EKS Management Cluster',
        '⚡ Low latency — everything is local',
        '✅ Data never leaves Japan',
      ]
    : [
        'SigV4-signed POST to regional Platform API (ap-northeast-1)',
        'Platform API writes to regional Aurora DB (hyperfleet-db)',
        'DynamoDB fan-out → kube-applier on EKS MC applies desired state',
        'HyperShift reconciles HostedCluster on local MC',
        'All metadata in-region — data sovereignty compliant',
      ];

  return (
    <div className="rosa-bridge">
      <h4>{b ? '🌍 Example: Aiko in Tokyo Creates a Cluster' : '🌍 Regional Flow Example'}</h4>
      <p style={{ margin: '0 0 10px', fontSize: '13px' }}><em>Tokyo is a stand-in for whatever region she is in. Red Hat has not named Tokyo or Frankfurt as regions HyperFleet will support.</em></p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#CC0000', marginBottom: '6px' }}>
            {b ? '❌ Today' : '❌ Centralized (V1)'}
          </p>
          <div className="rosa-variant-note" style={{ borderLeft: '4px solid #CC0000' }}>
            <ol style={olStyle}>
              {todayItems.map((item, i) => (
                <li key={i} style={liStyle}>{typeof item === 'string' ? (b ? item : g(item)) : item}</li>
              ))}
            </ol>
          </div>
        </div>
        <div>
          <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#2E7D32', marginBottom: '6px' }}>
            {b ? '✅ With HyperFleet' : '✅ Regional (V2)'}
          </p>
          <div className="rosa-variant-note" style={{ borderLeft: '4px solid #2E7D32' }}>
            <ol style={olStyle}>
              {hyperfleetItems.map((item, i) => (
                <li key={i} style={liStyle}>{b ? item : g(item)}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

function OcmuiImpact({ b }: { b: boolean }) {
  const g = createGlossarizer();

  return (
    <div className="rosa-bridge">
      <h4>{b ? '🖥️ Possible Changes to the OCM Website' : '🖥️ Potential OCMUI Impact Areas (pending UX design)'}</h4>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
        {([
          {
            title: b ? '🌐 Region Picker' : '🌐 Region Selector',
            desc: b ? 'A Region dropdown under the Clusters title. Values match the Region (Provider) column, such as Asia Pacific, Tokyo - ap-northeast-1 (AWS). The list shows that region. Creating a cluster requires a region.' : g('Region dropdown above the cluster-list tabs. Values match the Region (Provider) column: name, id, and provider, such as Asia Pacific, Tokyo - ap-northeast-1 (AWS). No Global entry. One selection, one region. Creating a cluster requires a region. Options assumed to come from a backend regions API.'),
            color: '#1565C0',
          },
          {
            title: b ? '📋 Cluster List' : '📋 Cluster List Coexistence',
            desc: b ? 'The list is filtered by Region. It shows clusters in the region you picked.' : g('The list is filtered by Region. One selection shows clusters in that cloud region. No documented service merges every region into one response.'),
            color: '#6A1B9A',
          },
          {
            title: b ? '🔑 Login Changes' : '🔑 Auth Integration',
            desc: b ? <>One-time setup: link your AWS account to your Red Hat org (the UI may pre-fill this from your existing ROSA setup). After that, the CLI signs with your AWS credentials. The website login stays a Red Hat account. <em>How that login becomes an AWS-signed call has not been determined.</em></> : g('One-time account-link: RH org ↔ AWS IAM principal (rosa link account --hyperfleet). CLI then signs with the AWS credential chain. How the browser login becomes an AWS-signed call has not been determined. Existing HCP Accounts & Roles info may pre-populate the link step.'),
            color: '#283593',
          },
          {
            title: b ? '➕ ROSA HCP Wizard Updates' : '➕ ROSA HCP Wizard (V2 backend)',
            desc: b ? 'The same ROSA HCP wizard — same cluster settings (region, VPC, networking, etc.). The Region switcher picks which API receives the create. If your AWS account is already linked (see Login Changes above), no extra steps.' : g('Same HostedClusterSpec fields (release, platform, networking, FIPS). The Region switcher selects which Platform API receives the create. Account-link prereq may be auto-satisfied from existing HCP Accounts & Roles data. OidcConfig as separate CRD, region = API region. Not a new wizard — adapted existing HCP flow.'),
            color: '#E65100',
          },
          {
            title: b ? '📄 Cluster Details' : '📄 Cluster Details (V2)',
            desc: b ? 'New status info like "which management cluster runs your control plane" and new permission controls' : g('New phases: WaitingForPlacement, Provisioning. Placement info (MC assignment). Cedar-based access control. NodePool (not MachinePool).'),
            color: '#00695C',
          },
          {
            title: b ? '🔄 Migration' : '🔄 V1→V2 Migration',
            desc: b ? 'A future wizard to move existing ROSA HCP clusters to the new regional system. Not designed yet.' : g('Customer migration flow. V1 to V2 API routing during transition. AWS Marketplace re-integration.'),
            color: '#C62828',
          },
        ] as { title: string; desc: ReactNode; color: string; assumption?: ReactNode; assumptionDetail?: string[] }[]).map((item, i) => (
          <div key={i} className="rosa-variant-note" style={{ borderLeft: `4px solid ${item.color}` }}>
            <p><strong>{item.title}</strong></p>
            <p style={{ whiteSpace: 'pre-line' }}>{item.desc}</p>
            {'assumption' in item && item.assumption && (
              <p style={{ fontSize: '11px', marginTop: '6px' }}>
                <span style={{ color: '#CC0000', fontWeight: 700 }}>Assumption: </span>
                <span style={{ color: '#555' }}>{item.assumption}</span>
                {'assumptionDetail' in item && Array.isArray(item.assumptionDetail) && (
                  <span>
                    {item.assumptionDetail.map((d: string, j: number) => (
                      <span key={j} style={{ display: 'block', color: '#555', marginTop: '4px' }}>{d}</span>
                    ))}
                  </span>
                )}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ApiResources({ b }: { b: boolean }) {
  const g = createGlossarizer();

  return (
    <div className="rosa-bridge">
      <h4>{b ? '🗂️ What Can You Manage? (rosa CLI)' : '🗂️ V2 API Resources (rosa --hyperfleet)'}</h4>
      <p style={{ fontSize: '11px', color: '#666', marginBottom: '8px' }}>
        {b
          ? 'Use the existing rosa CLI — just add the --hyperfleet flag to route commands to the new regional API.'
          : <>Commands use the existing <code>rosa</code> CLI with <code>--hyperfleet</code> flag — e.g. <code>rosa create cluster --hyperfleet --region ap-northeast-1</code></>}
      </p>
      <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ddd' }}>
            <th style={{ textAlign: 'left', padding: '6px' }}>{b ? 'What' : 'Resource'}</th>
            <th style={{ textAlign: 'left', padding: '6px' }}>{b ? 'What It Does' : 'Description'}</th>
            <th style={{ textAlign: 'left', padding: '6px' }}>{b ? 'CLI Command' : 'rosa --hyperfleet'}</th>
            <th style={{ textAlign: 'left', padding: '6px' }}>{b ? 'Today\'s Equivalent' : 'V1 Equivalent'}</th>
          </tr>
        </thead>
        <tbody>
          {[
            { res: 'Cluster', desc: b ? 'Your OpenShift cluster' : 'ROSA HCP cluster lifecycle', cli: 'rosa create cluster --hyperfleet', v1: <>Cluster (<span className="code-term">clusters_mgmt</span>)</> },
            { res: 'NodePool', desc: b ? 'Groups of worker machines' : 'Worker node groups per cluster', cli: 'rosa create nodepool --hyperfleet', v1: 'NodePool (HCP)' },
            { res: 'OidcConfig', desc: b ? 'Identity setup for pods' : g('OIDC issuer configuration'), cli: 'rosa create oidc-config --hyperfleet', v1: 'OidcConfig' },
            { res: b ? 'Account Link' : 'Account', desc: b ? 'Connect your AWS account to Red Hat' : 'AWS account ↔ RH org mapping', cli: 'rosa link account --hyperfleet', v1: b ? 'Not needed today' : 'N/A (implicit)' },
            { res: b ? 'Cedar Policy' : 'Policy', desc: b ? 'Permission rules' : g('Cedar permit/forbid policies'), cli: 'rosa create policy --hyperfleet', v1: b ? 'RBAC roles' : g('AMS RBAC roles') },
            { res: b ? 'VPC Setup' : 'VPC', desc: b ? 'Network setup' : g('VPC + subnets for cluster'), cli: 'rosa create vpc --hyperfleet', v1: b ? 'Manual / wizard' : g('AWS SDK in wizard') },
            { res: b ? 'IAM Setup' : 'IAM', desc: b ? 'AWS permission roles' : g('STS roles for cluster'), cli: 'rosa create iam --hyperfleet', v1: b ? 'Roles screen in wizard' : 'Manual / ocm-roles' },
          ].map((row, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '5px 6px', fontWeight: 'bold', color: '#333' }}>{row.res}</td>
              <td style={{ padding: '5px 6px', color: '#666' }}>{row.desc}</td>
              <td style={{ padding: '5px 6px', fontFamily: 'monospace', fontSize: '11px', color: '#1565C0' }}>{row.cli}</td>
              <td style={{ padding: '5px 6px', color: '#999' }}>{row.v1}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ArchCallout({ b }: { b: boolean }) {
  const g = createGlossarizer();

  return (
    <div className="rosa-bridge">
      <h4>{b ? '🗄️ How HyperFleet Stores Cluster State' : '🗄️ hyperfleet-db: PostgreSQL-Backed Controllers'}</h4>
      <div className="rosa-bridge-content" style={{ flexDirection: 'column', gap: '8px' }}>
        <div className="rosa-variant-note" style={{ borderLeft: '4px solid #2E7D32' }}>
          <p><strong>{b ? 'Two databases, two jobs' : 'Dual datastore: Aurora + DynamoDB'}</strong></p>
          <p>{b
            ? 'Every region has two databases. The main one (Aurora Postgres) keeps live cluster state for HyperFleet\'s controllers — like a highly reliable notebook for the "brain". The second (DynamoDB) is a read-only copy that each Management Cluster\'s kube-applier agent pulls from. This means a Management Cluster can keep running even while the Regional Cluster is being updated.'
            : g('Aurora (PostgreSQL): primary controller state via hyperfleet-db — a single kubernetes_resources table, GVK/namespace/name/spec/status as JSONB. DynamoDB: read-optimized fan-out to Management Clusters, pulled by kube-applier agents. Replaces Maestro (MQTT broker) — simpler to operate, aligns with ARO-HCP.')}
          </p>
        </div>
        {!b && (
          <div className="rosa-variant-note" style={{ borderLeft: '4px solid #1565C0' }}>
            <p><strong>The watermark trick (no locks, no missed events)</strong></p>
            <p>{g('Writers stamp with pg_current_xact_id(). Watchers advance bookmark to pg_snapshot_xmin()-1 — the last ID guaranteed committed. pg_notify rings a per-type doorbell (~100ms delivery); a 5s poll is the correctness backstop. Throughput: ~15k writes/s (small), ~6k writes/s (15-20KB objects), p50 write latency 3-6ms — no serialization on write path.')}</p>
          </div>
        )}
        {!b && (
          <div className="rosa-variant-note" style={{ borderLeft: '4px solid #5C6BC0' }}>
            <p><strong>🖥️ Node Provisioning: {g('Karpenter')} (not EKS Auto Mode)</strong></p>
            <p>{g('All Regional and Management Clusters migrated from EKS Auto Mode to self-managed Karpenter. This enables custom AMIs — a prerequisite for RHEL on EKS nodes, which is required for FIPS-validated cryptography (FedRAMP Moderate).')}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ZoaSection({ b }: { b: boolean }) {
  const g = createGlossarizer();

  return (
    <div className="rosa-bridge">
      <h4>{b ? '🔐 How SREs Access Your Infrastructure Safely' : <>🔐 Zero Operator Access ({g('ZOA')})</>}</h4>
      <div className="rosa-bridge-content" style={{ flexDirection: 'column', gap: '8px' }}>
        <div className="rosa-variant-note" style={{ borderLeft: '4px solid #C62828' }}>
          <p><strong>{b ? 'No standing credentials — ever' : 'No permanent, unaudited operator access'}</strong></p>
          <p>{b
            ? 'Red Hat SREs have zero permanent access to your cluster. To investigate an issue, they run a "Trusted Action" — a pre-approved, time-limited script tied to a Jira ticket and fully logged. No ticket, no access. No exceptions.'
            : g('ZOA runs on AWS Lambda (independent of Regional Cluster health). Every Trusted Action (TA) is a first-class Go package: unit-tested, RBAC-enforced at build time, linked to a Jira ticket. SigV4 auth. Sync TAs stream via Lambda Function URL (RESPONSE_STREAM, 200 MB ceiling). State in DynamoDB + S3.')
          }</p>
        </div>
        <div className="rosa-bridge-content">
          <div className="rosa-bridge-side">
            <strong style={{ color: '#C62828' }}>{b ? 'Actions available today' : 'Current TA catalog'}</strong>
            <p style={{ whiteSpace: 'pre-line' }}>{b
              ? '• Read cluster diagnostics\n• Restart or delete specific pods\n• Access guarded secrets (approved)\n• Download must-gather bundles'
              : g('• Generic Kubernetes reads (incl. CRDs)\n• Guarded secret access\n• Pod restarts and deletes\n• Selected AWS reads\n• must-gather upload → S3 (async)')}
            </p>
          </div>
          <div className="rosa-bridge-arrow">
            <span>{b ? 'coming next' : 'roadmap'}</span>
            <div className="rosa-bridge-arrow-line" />
          </div>
          <div className="rosa-bridge-side">
            <strong style={{ color: '#283593' }}>{b ? 'What\'s coming' : 'Next milestones'}</strong>
            <p style={{ whiteSpace: 'pre-line' }}>{b
              ? '• Audited shell sessions in your VPC\n• Emergency access (multi-person approval)\n• PAM integration for sensitive ops'
              : g('• rosa-boundary: audited ECS shells in target VPC (separates session mgmt from TA execution)\n• Break-glass: multi-party-approved escalated access\n• PAM integration for approval workflows')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Inner content — used when embedded inside RosaMap's 3-way toggle */
export function HyperfleetContent({ mode }: { mode: ExplainMode }) {
  const [view, setView] = useState<ArchView>('today');
  const [diagView, setDiagView] = useState<'list' | 'create' | 'platform'>('list');
  const b = mode === 'beginner';
  const activeView = b ? 'hyperfleet' : view;
  const g = createGlossarizer();

  return (
    <>
      {!b && (
      <div className="variant-toggle" style={{ marginBottom: 12, justifyContent: 'center', display: 'flex' }}>
        <button className={`variant-btn ${view === 'today' ? 'active' : ''}`} onClick={() => setView('today')}>
          Today (<span className="code-term">clusters_mgmt</span> v1)
        </button>
        <button className={`variant-btn ${view === 'hyperfleet' ? 'active' : ''}`} onClick={() => setView('hyperfleet')}>
          HyperFleet (Platform API v2)
        </button>
      </div>
      )}

      <h3 className="dd-page-title" style={{ fontSize: '1.1rem', marginBottom: 8 }}>
        <Globe size={18} className="dd-title-icon" style={{ color: '#0D47A1' }} />
        {b ? 'HyperFleet — ROSA in the AWS Region you select' : 'HyperFleet — ROSA Regional Platform (RRP)'}
      </h3>

      <div className="rosa-variant-note" style={{ borderLeft: '4px solid #F57F17', background: '#FFFDE7' }}>
        <p><strong>⚠️ {b ? 'Note' : 'Disclaimer'}</strong></p>
        <p>{b
          ? 'HyperFleet is under active development and not yet available to customers. The information below is based on publicly available open-source code. Features and designs may change before release.'
          : <>{g('Based on publicly available source code (openshift-online/rosa-hyperfleet-*). v1alpha1 — under active development, not GA. Architecture, API surface, and auth model are subject to change.')}</>}
        </p>
      </div>

      <div className="rosa-variant-note" style={{ borderLeft: '4px solid #0D47A1' }}>
        <p><strong>{activeView === 'today' ? 'Today' : 'What is HyperFleet?'}</strong></p>
        <p>{activeView === 'today'
          ? 'Today, ROSA runs management from Virginia, so the cluster and its management stay together only when the cluster is there too.'
          : 'The cluster list is filtered by Region, the same region required when you create a cluster. HyperFleet runs management in that region, so the cluster and its management stay together.'}
        </p>
      </div>

      {activeView === 'today' && (
        <div className="rosa-variant-note" style={{ borderLeft: '4px solid #6A1B9A' }}>
          <p><strong style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }}>
              <path d="M12 2.6 1.4 21.4h21.2L12 2.6z" fill="#F9A825" stroke="#F57F17" strokeWidth="1.2" strokeLinejoin="round" />
              <path d="M12 9v5.2" stroke="#3E2723" strokeWidth="2" strokeLinecap="round" />
              <circle cx="12" cy="17.5" r="1.15" fill="#3E2723" />
            </svg>
            <span>What about the multi-region support already in OCMUI?</span>
          </strong></p>
          <p style={{ marginTop: 6 }}>{<>Singapore is already a second copy of today&apos;s <span className="code-term">clusters_mgmt</span> (V1) API. Almost every cluster is managed from Virginia. Singapore is the one exception already in the website. It is the same cluster API and the same Red Hat login. The only change is the server address: <span className="code-term">api.ap-southeast-1.openshift.com</span> instead of <span className="code-term">api.openshift.com</span>. The cluster list looks up which copy a cluster belongs to, calls that copy, and shows the rows together.</>}
          </p>
          <p style={{ marginTop: 6 }}>{b
            ? <>For a deep dive into possible OCMUI code changes, click on the &apos;Expert&apos; button above.</>
            : <>The Singapore code only swaps the server address. After that, every call is still today&apos;s cluster API, sent with the Red Hat login. The one-time AWS account link does not change that. The link lets HyperFleet accept an AWS-signed call. This client still sends the Red Hat session. HyperFleet&apos;s list call is a different path, <span className="code-term">GET /clusters</span>, signed with AWS. No public hostname is defined. The closest example in the platform docs is an AWS API Gateway address, such as <span className="code-term">https://abc123.execute-api.ap-northeast-1.amazonaws.com</span>. Putting that address into the Singapore helper still sends today&apos;s requests. The reusable piece is calling one address at a time. The client that builds the request will probably need to be new.</>}
          </p>
        </div>
      )}

      {/* Cluster List / Cluster Create / Regional Platform — single row, HyperFleet tab only */}
      {activeView === 'hyperfleet' && (
        <div className="variant-toggle" style={{ marginBottom: 8, justifyContent: 'center', display: 'flex' }}>
          <button className={`variant-btn ${diagView === 'list' ? 'active' : ''}`} onClick={() => setDiagView('list')}>Cluster List</button>
          <button className={`variant-btn ${diagView === 'create' ? 'active' : ''}`} onClick={() => setDiagView('create')}>Cluster Create</button>
          <button className={`variant-btn ${diagView === 'platform' ? 'active' : ''}`} onClick={() => setDiagView('platform')}>Regional Platform</button>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={activeView + diagView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeView === 'today'
            ? <TodayDiagram b={b} />
            : diagView === 'list'
              ? <>{b && <ClusterListMock />}{!b && <OverviewDiagram b={b} />}</>
              : diagView === 'create'
                ? <ClusterCreateDiagram b={b} />
                : <HyperfleetDiagram b={b} />}
        </motion.div>
      </AnimatePresence>

      {activeView === 'hyperfleet' && diagView === 'create' && (
        <RegionalExample b={b} />
      )}
      {activeView === 'hyperfleet' && diagView !== 'create' && (
        <>
          {diagView === 'list' && <OcmuiImpact b={b} />}
          {diagView === 'list' && <AuthComparison b={b} />}
          {diagView === 'platform' && <ArchCallout b={b} />}
          {diagView === 'platform' && <CedarPolicies b={b} />}
          <ZoaSection b={b} />
          <ApiResources b={b} />
        </>
      )}

      <ExploreMore links={DEEP_DIVE_LINKS.hyperfleet} />
    </>
  );
}

/** Standalone page — used when accessed as its own deep dive tab (kept for backward compat) */
export function HyperfleetMap({ mode, onModeChange }: HyperfleetMapProps) {
  return (
    <div className="rosa-map">
      <div className="rosa-controls">
        <div style={{ flex: 1 }} />
        <ModeToggle mode={mode} onModeChange={onModeChange} />
      </div>

      <h2 className="dd-page-title">
        <Globe size={22} className="dd-title-icon" style={{ color: '#0D47A1' }} />
        ROSA HyperFleet
      </h2>

      <HyperfleetContent mode={mode} />
    </div>
  );
}
