import type { SceneProps } from '../types';
import { AppMarker } from '../AppMarker';
import { ZoomLink } from '../ZoomLink';

function FeatureCard({ x, y, icon, title, subtitle, w }: {
  x: number; y: number; icon: string; title: string; subtitle: string; w?: number;
}) {
  const width = w || 120;
  return (
    <g>
      <rect x={x} y={y} width={width} height="50" rx="8" fill="#fff" stroke="#E0E0E0" strokeWidth="1.5" />
      <text x={x + 10} y={y + 18} fontSize="8" fill="#333" fontWeight="bold">{icon} {title}</text>
      <text x={x + 10} y={y + 32} fontSize="6" fill="#777">{subtitle}</text>
    </g>
  );
}

const CLUSTER_NAMES = [
  'My OCP Cluster 1',
  'My OCP Cluster 2',
  'My OCP Cluster 3',
  'My OCP Cluster 4',
];

export function OcmScene({ mode, onDeepDive, onNavigate }: SceneProps) {
  const b = mode === 'beginner';

  // Actual OCM cluster detail tabs (from TabsRow.helper.tsx in uhc-portal)
  const detailTabs = [
    { label: 'Overview', desc: b ? 'Status & cost' : 'Status, billing' },
    { label: b ? 'Access control' : 'Access control', desc: b ? 'Users & login' : 'IDPs, RBAC' },
    { label: 'Add-ons', desc: b ? 'Extra features' : 'OLM add-ons' },
    { label: b ? 'Cluster history' : 'Cluster history', desc: b ? 'Logs & events' : 'Audit log' },
    { label: 'Networking', desc: b ? 'Ingress & VPC' : 'Ingress, VPC' },
    { label: b ? 'Machine pools' : 'Machine pools', desc: b ? 'Add workers' : 'CRUD + autoscaler' },
    { label: 'Support', desc: b ? 'Get help' : 'Cases, SLAs' },
    { label: b ? 'Upgrades' : 'Settings', desc: b ? 'OCP versions' : 'Upgrade policy' },
  ];

  const detailsX = 25;
  const detailsW = 310;

  return (
    <g>
      {/* OCM boundary */}
      <rect x="10" y="8" width="470" height="405" rx="20" fill="#FFEBEE" stroke="#EE0000" strokeWidth="3" />
      <text x="35" y="32" fontSize="13" fill="#CC0000" fontWeight="bold">
        {b ? 'OpenShift Cluster Manager (OCM) — Your Fleet Command Center' : 'OCM'}
      </text>
      <text x="35" y="46" fontSize="7" fill="#CC0000" fontFamily="monospace">
        console.redhat.com/openshift
      </text>

      {/* Cluster List area */}
      <rect x="25" y="58" width="310" height="160" rx="12" fill="#FDE8E8" stroke="#EF5350" strokeWidth="1.5" />
      <text x="38" y="76" fontSize="9" fill="#C62828" fontWeight="bold">
        {b ? '📋 Your Clusters' : '📋 Cluster List'}
      </text>

      {/* Named cluster cards — 4 clusters in 2×2 grid */}
      {CLUSTER_NAMES.map((name, i) => (
        <g
          key={i}
          style={{ cursor: onNavigate ? 'pointer' : undefined }}
          onClick={() => onNavigate?.(5)}
        >
          <rect x={35 + (i % 2) * 150} y={84 + Math.floor(i / 2) * 42} width="135" height="34" rx="6" fill="#fff" stroke="#E0E0E0" strokeWidth="1.5" />
          <circle cx={47 + (i % 2) * 150} cy={97 + Math.floor(i / 2) * 42} r="4" fill="#66BB6A" />
          <text x={55 + (i % 2) * 150} y={99 + Math.floor(i / 2) * 42} fontSize="7" fill="#333" fontWeight="bold">{name}</text>
          <rect x={55 + (i % 2) * 150} y={103 + Math.floor(i / 2) * 42} width={40 + (i % 2) * 20} height="5" rx="2.5" fill="#F5F5F5" />
          <ZoomLink parentX={35 + (i % 2) * 150} parentY={84 + Math.floor(i / 2) * 42} parentW={135} parentH={34} />
        </g>
      ))}

      <AppMarker x={135} y={97} size="small" />

      {/* Create + Register buttons — left-aligned, with fast CSS tooltips */}
      <g className="svg-tooltip-trigger" style={{ cursor: 'pointer' }} onClick={() => onDeepDive?.()}>
        <rect x="35" y="174" width="100" height="28" rx="14" fill="#0066CC" />
        <text x="50" y="192" fontSize="8" fill="#fff" fontWeight="bold">Create cluster</text>
        <ZoomLink parentX={35} parentY={174} parentW={100} parentH={28} />
        <rect className="svg-tooltip-hitarea" x="35" y="174" width="100" height="28" fill="transparent" />
        <g className="svg-tooltip" transform="translate(35, 208)">
          <rect x="0" y="0" width={b ? 200 : 190} height="18" rx="4" fill="#333" opacity="0.92" />
          <text x="6" y="13" fontSize="5.5" fill="#fff">
            {b ? 'Provisions a new managed cluster (ROSA, OSD, etc.)' : 'Provision new managed cluster via clusters_mgmt API'}
          </text>
        </g>
      </g>
      <g className="svg-tooltip-trigger" style={{ cursor: 'default' }}>
        <rect x="142" y="174" width="88" height="28" rx="14" fill="#fff" stroke="#0066CC" strokeWidth="1.5" />
        <text x="152" y="192" fontSize="7" fill="#0066CC" fontWeight="bold">Register cluster</text>
        <rect className="svg-tooltip-hitarea" x="142" y="174" width="88" height="28" fill="transparent" />
        <g className="svg-tooltip" transform="translate(142, 208)">
          <rect x="0" y="0" width={b ? 210 : 200} height="18" rx="4" fill="#333" opacity="0.92" />
          <text x="6" y="13" fontSize="5.5" fill="#fff">
            {b ? 'Brings an existing cluster (self-managed OCP, ARO) into OCM' : 'Import existing cluster via cluster-registration-operator'}
          </text>
        </g>
      </g>

      {/* Dashed line from Cluster 4 to Cluster Details */}
      <defs>
        <marker id="ocm-detail-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#CC0000" />
        </marker>
      </defs>
      {/* Per-cluster details callout */}
      <rect x={detailsX} y="228" width={detailsW} height="130" rx="10" fill="#fff" stroke="#E0E0E0" strokeWidth="1.5" />
      <text x="38" y="246" fontSize="9" fill="#333" fontWeight="bold">
        {b ? '🔍 Cluster Details' : '🔍 Cluster Details Page'}
      </text>

      {/* Red dashed arrow — rendered after details bg so it's on top */}
      <line x1="250" y1="160" x2="250" y2="244" stroke="#CC0000" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#ocm-detail-arrow)" />

      {/* Actual OCM tabs — 2 rows of 4 */}
      {detailTabs.map((tab, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const tw = 70;
        const tg = 4;
        const tx = detailsX + 8 + col * (tw + tg);
        const ty = 254 + row * 30;
        return (
          <g key={i}>
            <rect x={tx} y={ty} width={tw} height="26" rx="4"
              fill={i === 0 ? '#E3F2FD' : '#F5F5F5'}
              stroke={i === 0 ? '#42A5F5' : '#E0E0E0'}
              strokeWidth={i === 0 ? 1.2 : 0.8}
            />
            <text x={tx + 4} y={ty + 11} fontSize="5.5" fill={i === 0 ? '#1565C0' : '#555'} fontWeight="bold">{tab.label}</text>
            <text x={tx + 4} y={ty + 21} fontSize="4.5" fill={i === 0 ? '#42A5F5' : '#999'}>{tab.desc}</text>
          </g>
        );
      })}

      {/* Open console button in details */}
      <g style={{ cursor: 'pointer' }} onClick={() => onDeepDive?.('ocp-console')}>
        <rect x="35" y="318" width="86" height="20" rx="10" fill="#0066CC" />
        <text x="47" y="332" fontSize="6.5" fill="#fff" fontWeight="bold">Open console</text>
        <ZoomLink parentX={35} parentY={318} parentW={86} parentH={20} />
      </g>
      <text x="130" y="332" fontSize="6" fill="#888" fontStyle="italic">
        {b ? 'launches OCP Console for this cluster' : '→ OCP Console (per-cluster UI)'}
      </text>
      <text x="35" y="352" fontSize="5" fill="#aaa">
        {b ? 'Not all tabs appear for every cluster type' : 'Tab visibility varies by product type'}
      </text>

      {/* Right sidebar: tools & downloads */}
      <rect x="345" y="58" width="125" height="300" rx="10" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="1" />
      <text x="358" y="76" fontSize="8" fill="#333" fontWeight="bold">
        {b ? '🧰 Tools' : '🧰 Platform Services'}
      </text>

      <FeatureCard x={352} y={84} icon="📊" title={b ? 'Dashboard' : 'Dashboard'} subtitle={b ? 'Cluster health, CPU, memory' : 'Fleet overview, utilization'} w={112} />
      <FeatureCard x={352} y={142} icon="📥" title={b ? 'Downloads' : 'Downloads'} subtitle={b ? 'oc CLI, rosa CLI, pull secret' : 'oc, rosa, pull-secret, RHCOS'} w={112} />
      <FeatureCard x={352} y={200} icon="🔧" title={b ? 'Assisted Installer' : 'AI Wizard'} subtitle={b ? 'Install on bare metal' : 'Agent-based IPI, bare-metal'} w={112} />
      <FeatureCard x={352} y={258} icon="📋" title={b ? 'Quota' : 'Quota'} subtitle={b ? 'How many clusters allowed' : 'Subscription entitlements'} w={112} />

      {/* Bottom callout */}
      <rect x="25" y="368" width="445" height="38" rx="8" fill="rgba(255,255,255,0.85)" stroke="#FFCDD2" strokeWidth="1" />
      <text x="40" y="385" fontSize="7" fill="#C62828" fontWeight="bold">
        {b ? '💡 OCM manages all your clusters, no matter what type or where they run'
           : '💡 OCM SaaS: clusters_mgmt + accounts_mgmt APIs. UI at console.redhat.com/openshift (uhc-portal)'}
      </text>
      <text x="40" y="398" fontSize="5.5" fill="#888">
        {b ? 'Each cluster type (ROSA, OSD, etc.) is a different "franchise model" — click Create cluster to explore ↑'
           : 'Product IDs: ROSA (MOA), ROSA HCP (MOA_HOSTEDCONTROLPLANE), OSD, OCP_ASSISTEDINSTALL'}
      </text>
    </g>
  );
}
