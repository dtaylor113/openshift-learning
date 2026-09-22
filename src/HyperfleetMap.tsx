import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';
import type { ExplainMode } from './types';
import { ModeToggle } from './ModeToggle';
import { ExploreMore, DEEP_DIVE_LINKS } from './ExploreMore';

type ArchView = 'today' | 'hyperfleet';

interface HyperfleetMapProps {
  mode: ExplainMode;
  onModeChange: (mode: ExplainMode) => void;
}

function TodayDiagram({ b }: { b: boolean }) {
  return (
    <svg viewBox="0 0 800 420" className="rosa-svg">
      {/* Red Hat centralized zone */}
      <rect x="150" y="10" width="500" height="170" rx="14" fill="#FDE8E8" stroke="#CC0000" strokeWidth="2" />
      <text x="170" y="38" fontSize="14" fill="#CC0000" fontWeight="bold">
        {b ? '🔴 Red Hat — Single Location (Virginia, USA)' : '🔴 Red Hat — us-east-1 (Centralized)'}
      </text>

      {/* OCM */}
      <rect x="170" y="55" width="200" height="55" rx="8" fill="#fff" stroke="#EF5350" strokeWidth="1.5" />
      <text x="185" y="75" fontSize="10" fill="#C62828" fontWeight="bold">🖥️ {b ? 'OCM (Your Dashboard)' : 'OCM Console'}</text>
      <text x="185" y="90" fontSize="7" fill="#777" fontFamily="monospace">console.redhat.com/openshift</text>
      <text x="185" y="100" fontSize="7" fill="#777">{b ? 'Manages ALL clusters worldwide' : 'Single global endpoint'}</text>

      {/* Clusters Service API */}
      <rect x="400" y="55" width="230" height="55" rx="8" fill="#fff" stroke="#EF5350" strokeWidth="1.5" />
      <text x="415" y="75" fontSize="10" fill="#C62828" fontWeight="bold">{b ? '⚙️ Cluster Management API' : '⚙️ clusters_mgmt API'}</text>
      <text x="415" y="90" fontSize="7" fill="#777" fontFamily="monospace">api.openshift.com</text>
      <text x="415" y="100" fontSize="7" fill="#777">{b ? 'One API for everything' : 'V1 — single regional instance'}</text>

      {/* Auth */}
      <rect x="170" y="120" width="140" height="45" rx="8" fill="#fff" stroke="#EF5350" strokeWidth="1.5" />
      <text x="185" y="140" fontSize="9" fill="#C62828" fontWeight="bold">{b ? '🔑 Red Hat Login' : '🔑 RH SSO (Bearer)'}</text>
      <text x="185" y="153" fontSize="7" fill="#777">{b ? 'Username + password' : 'OAuth2, offline_access token'}</text>

      {/* SRE */}
      <rect x="330" y="120" width="120" height="45" rx="8" fill="#fff" stroke="#EF5350" strokeWidth="1.5" />
      <text x="345" y="140" fontSize="9" fill="#C62828" fontWeight="bold">👷 {b ? 'SRE Team' : 'SRE'}</text>
      <text x="345" y="153" fontSize="7" fill="#777">{b ? 'Monitors 24/7' : 'Backplane, PagerDuty'}</text>

      {/* RBAC */}
      <rect x="470" y="120" width="160" height="45" rx="8" fill="#fff" stroke="#EF5350" strokeWidth="1.5" />
      <text x="485" y="140" fontSize="9" fill="#C62828" fontWeight="bold">{b ? '👥 Permissions' : '👥 RBAC (AMS)'}</text>
      <text x="485" y="153" fontSize="7" fill="#777">{b ? 'Org Admin, roles' : 'Role assignments via AMS'}</text>

      {/* Lines from Red Hat to clusters worldwide */}
      <line x1="300" y1="180" x2="120" y2="260" stroke="#999" strokeWidth="1.5" strokeDasharray="5 3" />
      <line x1="400" y1="180" x2="400" y2="260" stroke="#999" strokeWidth="1.5" strokeDasharray="5 3" />
      <line x1="500" y1="180" x2="680" y2="260" stroke="#999" strokeWidth="1.5" strokeDasharray="5 3" />

      {/* Distance/latency labels */}
      <text x="170" y="225" fontSize="8" fill="#999" transform="rotate(-25 170 225)">{b ? '⚡ long distance' : 'cross-region latency'}</text>
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

function HyperfleetDiagram({ b }: { b: boolean }) {
  return (
    <svg viewBox="0 0 800 430" className="rosa-svg">
      {/* Three regional Platform API zones */}
      {[
        { x: 10, region: b ? '🇺🇸 US East' : 'us-east-1', color: '#CC0000', bgColor: '#FDE8E8' },
        { x: 275, region: b ? '🇩🇪 Frankfurt' : 'eu-central-1', color: '#CC0000', bgColor: '#FDE8E8' },
        { x: 540, region: b ? '🇯🇵 Tokyo' : 'ap-northeast-1', color: '#CC0000', bgColor: '#FDE8E8' },
      ].map((r, i) => (
        <g key={i}>
          {/* Red Hat regional zone */}
          <rect x={r.x} y="10" width="250" height="195" rx="12" fill={r.bgColor} stroke={r.color} strokeWidth="2" />
          <text x={r.x + 12} y="32" fontSize="11" fill={r.color} fontWeight="bold">🔴 {r.region}</text>

          {/* Platform API */}
          <rect x={r.x + 12} y="42" width="226" height="48" rx="8" fill="#fff" stroke="#EF5350" strokeWidth="1.5" />
          <text x={r.x + 22} y="60" fontSize="9" fill="#C62828" fontWeight="bold">{b ? '⚙️ Regional API' : '⚙️ Platform API'}</text>
          <text x={r.x + 22} y="78" fontSize="7" fill="#777">
            {b ? 'Manages clusters in THIS region only' : 'SigV4 auth, Cedar authz, regional scope'}
          </text>

          {/* EKS MC */}
          <rect x={r.x + 12} y="98" width="110" height="45" rx="6" fill="#FFCDD2" stroke="#EF5350" strokeWidth="1.2" />
          <text x={r.x + 22} y="115" fontSize="8" fill="#B71C1C" fontWeight="bold">{b ? '🧠 Brains (EKS)' : '🧠 EKS MC'}</text>
          <text x={r.x + 22} y="132" fontSize="7" fill="#777">{b ? 'Runs control planes' : 'HyperShift + CPs'}</text>

          {/* SRE */}
          <rect x={r.x + 130} y="98" width="108" height="45" rx="6" fill="#fff" stroke="#EF5350" strokeWidth="1.2" />
          <text x={r.x + 140} y="115" fontSize="8" fill="#C62828" fontWeight="bold">👷 {b ? 'SRE' : 'SRE'}</text>
          <text x={r.x + 140} y="132" fontSize="7" fill="#777">{b ? 'Regional ops team' : 'RHOBS, alerts'}</text>

          {/* Auth */}
          <rect x={r.x + 12} y="152" width="110" height="40" rx="6" fill="#E8EAF6" stroke="#7986CB" strokeWidth="1.2" />
          <text x={r.x + 22} y="168" fontSize="8" fill="#283593" fontWeight="bold">{b ? '🔑 AWS Login' : '🔑 SigV4 + Cedar'}</text>
          <text x={r.x + 22} y="182" fontSize="7" fill="#777">{b ? 'Your AWS credentials' : 'IAM auth, policy eval'}</text>

          {/* Data badge */}
          <rect x={r.x + 130} y="152" width="108" height="40" rx="6" fill="#E8F5E9" stroke="#66BB6A" strokeWidth="1.2" />
          <text x={r.x + 140} y="168" fontSize="8" fill="#2E7D32" fontWeight="bold">{b ? '📍 Data stays here' : '📍 Data residency'}</text>
          <text x={r.x + 140} y="182" fontSize="7" fill="#777">{b ? 'Never leaves region' : 'Metadata in-region'}</text>

          {/* Connection line down to customer zone */}
          <line x1={r.x + 125} y1="205" x2={r.x + 125} y2="250" stroke="#7986CB" strokeWidth="2" />
          <polygon points={`${r.x + 121},246 ${r.x + 125},254 ${r.x + 129},246`} fill="#7986CB" />

          {/* Customer AWS zone */}
          <rect x={r.x} y="255" width="250" height="120" rx="12" fill="#FFF8E1" stroke="#FF9900" strokeWidth="2" />
          <text x={r.x + 12} y="278" fontSize="10" fill="#E65100" fontWeight="bold">
            {b ? '🟠 Your AWS Account' : '🟠 Customer AWS'}
          </text>

          {/* Workers */}
          <rect x={r.x + 12} y="288" width="140" height="72" rx="6" fill="#F3E5F5" stroke="#BA68C8" strokeWidth="1" strokeDasharray="4 2" />
          <text x={r.x + 20} y="303" fontSize="8" fill="#6A1B9A" fontWeight="bold">{b ? 'Node Pool' : 'NodePool → ASG'}</text>
          {[0, 1].map(j => (
            <g key={j}>
              <rect x={r.x + 20 + j * 65} y={310} width="58" height="20" rx="3" fill="#EDE7F6" stroke="#CE93D8" strokeWidth="0.8" />
              <text x={r.x + 26 + j * 65} y={323} fontSize="6" fill="#6A1B9A">{b ? `Worker ${j + 1}` : `worker-${j}`}</text>
              <rect x={r.x + 20 + j * 65} y={334} width="58" height="16" rx="3" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="0.5" />
              <text x={r.x + 26 + j * 65} y={345} fontSize="5.5" fill="#2E7D32">pods</text>
            </g>
          ))}

          {/* AWS infra */}
          <rect x={r.x + 162} y="288" width="76" height="72" rx="6" fill="#FFF3E0" stroke="#FFB74D" strokeWidth="1" />
          <text x={r.x + 170} y="303" fontSize="7" fill="#E65100" fontWeight="bold">{b ? 'AWS' : 'Infra'}</text>
          {[b ? 'VPC' : 'VPC', b ? 'Storage' : 'EBS', b ? 'DNS' : 'R53', b ? 'Roles' : 'STS'].map((s, j) => (
            <g key={j}>
              <rect x={r.x + 168} y={308 + j * 13} width="64" height="11" rx="2" fill="#fff" stroke="#FFE0B2" strokeWidth="0.5" />
              <text x={r.x + 174} y={316 + j * 13} fontSize="5.5" fill="#BF360C">{s}</text>
            </g>
          ))}
        </g>
      ))}

      {/* Bottom success callout */}
      <rect x="120" y="385" width="560" height="36" rx="8" fill="#E8F5E9" stroke="#66BB6A" strokeWidth="1.2" />
      <text x="400" y="400" textAnchor="middle" fontSize="9" fill="#2E7D32" fontWeight="bold">
        {b ? '✅ Each region is independent — faster, resilient, and data stays in-country' : '✅ Regional isolation: independent API, data residency, reduced blast radius'}
      </text>
      <text x="400" y="414" textAnchor="middle" fontSize="7" fill="#558B2F">
        {b ? 'If one region has problems, the others keep running!' : 'Per-region availability — no single point of failure'}
      </text>
    </svg>
  );
}

function AuthComparison({ b }: { b: boolean }) {
  return (
    <div className="rosa-bridge">
      <h4>{b ? '🔑 How You Log In — Today vs HyperFleet' : '🔑 Authentication Model Comparison'}</h4>
      <div className="rosa-bridge-content">
        <div className="rosa-bridge-side">
          <strong style={{ color: '#CC0000' }}>{b ? 'Today' : 'clusters_mgmt (V1)'}</strong>
          <p>{b
            ? '• You log in with your Red Hat username & password\n• Your browser gets a "session pass" (token)\n• That pass is sent with every request\n• Permissions: your Red Hat org role (like "Org Admin")'
            : '• Red Hat SSO (consoledot chrome auth)\n• Bearer token in Authorization header\n• RBAC roles assigned in AMS\n• Org Admin, Cluster Editor, etc.'}
          </p>
        </div>
        <div className="rosa-bridge-arrow">
          <span>{b ? 'changing to' : '→'}</span>
          <div className="rosa-bridge-arrow-line" style={{ background: 'linear-gradient(to right, #CC0000, #283593)' }} />
        </div>
        <div className="rosa-bridge-side">
          <strong style={{ color: '#283593' }}>{b ? 'HyperFleet' : 'Platform API (V2)'}</strong>
          <p>{b
            ? '• You log in with your AWS credentials (like the AWS Console)\n• Your AWS account is linked to your Red Hat org (one-time setup)\n• Permissions: Cedar "rules" you write — much more flexible\n• Example: "This user can create clusters, but only in Frankfurt"'
            : '• AWS IAM SigV4 request signing\n• Principal linked to RH user via rosactl link account\n• Cedar policies: permit/forbid with resource labels, context.region\n• Action groups: ReadOnly, ClusterAdmin, NodePoolAdmin, PolicyAdmin'}
          </p>
        </div>
      </div>
      <div className="rosa-variant-note" style={{ borderLeft: '4px solid #7986CB', marginTop: '12px' }}>
        <p><strong>{b ? 'Wait — what about the OCM website?' : 'Browser Authentication'}</strong></p>
        <p>{b
          ? 'Today, your browser talks to the OCM API using your Red Hat login — simple. With HyperFleet, the API expects AWS-style credentials, but browsers can\'t easily do that. So a "translator" is being built — you\'ll still log in with your Red Hat account on the website, and a backend service converts it into something the new API understands. This is being designed now (not built yet).'
          : 'SigV4 signing requires AWS credentials not available in browser JavaScript. A POST /token exchange endpoint is being designed to convert RH SSO sessions into V2-compatible short-lived tokens, enabling the OCM Console to call the Platform API without exposing AWS credentials client-side.'}
        </p>
      </div>
    </div>
  );
}

function CedarPolicies({ b }: { b: boolean }) {
  return (
    <div className="rosa-bridge">
      <h4>{b ? '📋 Cedar Policies — A New Way to Control Access' : '📋 Cedar Authorization Model'}</h4>
      <div className="rosa-bridge-content" style={{ flexDirection: 'column', gap: '8px' }}>
        <div className="rosa-variant-note" style={{ borderLeft: '4px solid #E65100' }}>
          <p>{b
            ? 'Instead of assigning roles like "Cluster Admin", you write rules. These rules can be very specific — like "allow this person to create clusters, but only in the Frankfurt region, and only with the \'development\' label".'
            : 'Cedar uses default-deny, permit-unless-forbid semantics. Policies are global, attachments can be global or regional. Resources have parent-child hierarchy (Cluster → NodePool, AccessEntry). Action groups: ReadOnly, ClusterAdmin, NodePoolAdmin, AccessEntryAdmin, LabelAdmin, PolicyAdmin.'}
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
  return (
    <div className="rosa-bridge">
      <h4>{b ? '🌍 Example: Aiko in Tokyo Creates a Cluster' : '🌍 Regional Flow Example'}</h4>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#CC0000', marginBottom: '6px' }}>
            {b ? '❌ Today' : '❌ Centralized (V1)'}
          </p>
          <div className="rosa-variant-note" style={{ borderLeft: '4px solid #CC0000' }}>
            <p>{b
              ? '1. Aiko in Tokyo requests a cluster in ap-northeast-1\n2. Request travels to Virginia, USA (us-east-1)\n3. OCM stores cluster metadata in Virginia\n4. Control plane managed from Virginia\n5. ⚡ ~200ms latency on every API call\n6. ⚠️ Cluster metadata stored outside Japan'
              : '1. POST api.openshift.com/clusters (us-east-1)\n2. Cluster metadata persisted in us-east-1\n3. HyperShift reconciles on us-east-1 MC\n4. Cross-region latency for all API operations\n5. Data residency concerns for JP compliance'}
            </p>
          </div>
        </div>
        <div>
          <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#2E7D32', marginBottom: '6px' }}>
            {b ? '✅ With HyperFleet' : '✅ Regional (V2)'}
          </p>
          <div className="rosa-variant-note" style={{ borderLeft: '4px solid #2E7D32' }}>
            <p>{b
              ? '1. Aiko requests a cluster in ap-northeast-1\n2. Request goes to the Tokyo Platform API\n3. Metadata stays in Tokyo\n4. Control plane runs on Tokyo EKS MC\n5. ⚡ Low latency — everything is local\n6. ✅ Data never leaves Japan'
              : '1. SigV4-signed POST to regional API Gateway (ap-northeast-1)\n2. Platform API stores in regional DynamoDB\n3. Placement CRD assigns to local EKS MC\n4. HyperShift reconciles HostedCluster on local MC\n5. All metadata in-region — data sovereignty compliant'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function OcmuiImpact({ b }: { b: boolean }) {
  return (
    <div className="rosa-bridge">
      <h4>{b ? '🖥️ Possible Changes to the OCM Website' : '🖥️ Potential OCMUI Impact Areas (pending UX design)'}</h4>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
        {[
          {
            title: b ? '🌐 Region Picker' : '🌐 Region Selector',
            desc: b ? 'A new dropdown to choose which region you\'re looking at — or "All Regions" to see everything' : 'Masthead or toolbar region scope. "All Regions" parallel fetch vs single-region view. Extends existing MultiRegion components.',
            color: '#1565C0',
          },
          {
            title: b ? '📋 Cluster List' : '📋 Cluster List Coexistence',
            desc: b ? 'Old and new clusters will appear together. New ones will show which region they\'re in more prominently' : 'V1 + V2 clusters in same list during migration. Region column, platform version badge. Different available actions per API version.',
            color: '#6A1B9A',
          },
          {
            title: b ? '🔑 Login Changes' : '🔑 Auth Integration',
            desc: b ? 'You\'ll still use your Red Hat login on the website — a backend "translator" handles the new API credentials' : 'Token exchange or BFF proxy. Browser session → V2-compatible credentials. Transparent to end user.',
            color: '#283593',
          },
          {
            title: b ? '➕ ROSA HCP Wizard Updates' : '➕ ROSA HCP Wizard (V2 backend)',
            desc: b ? 'The existing ROSA HCP wizard would talk to the new regional API instead. New prerequisite: link your AWS account first. Same cluster settings (region, VPC, networking, etc.).' : 'Same HostedClusterSpec fields (release, platform, networking, FIPS). V2 backend: account linking prereq, OidcConfig as separate CRD, region = API region. Not a separate wizard — adapted existing HCP flow.',
            color: '#E65100',
          },
          {
            title: b ? '📄 Cluster Details' : '📄 Cluster Details (V2)',
            desc: b ? 'New status info like "which management cluster runs your control plane" and new permission controls' : 'New phases: WaitingForPlacement, Provisioning. Placement info (MC assignment). Cedar-based access control. NodePool (not MachinePool).',
            color: '#00695C',
          },
          {
            title: b ? '🔄 Migration' : '🔄 V1→V2 Migration',
            desc: b ? 'A future wizard to move existing ROSA HCP clusters to the new regional system. Not designed yet.' : 'Customer migration flow. V1 to V2 API routing during transition. AWS Marketplace re-integration.',
            color: '#C62828',
          },
        ].map((item, i) => (
          <div key={i} className="rosa-variant-note" style={{ borderLeft: `4px solid ${item.color}` }}>
            <p><strong>{item.title}</strong></p>
            <p style={{ whiteSpace: 'pre-line' }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ApiResources({ b }: { b: boolean }) {
  return (
    <div className="rosa-bridge">
      <h4>{b ? '🗂️ What Can You Manage? (CLI: rosactl)' : '🗂️ V2 API Resources & rosactl Commands'}</h4>
      <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ddd' }}>
            <th style={{ textAlign: 'left', padding: '6px' }}>{b ? 'What' : 'Resource'}</th>
            <th style={{ textAlign: 'left', padding: '6px' }}>{b ? 'What It Does' : 'Description'}</th>
            <th style={{ textAlign: 'left', padding: '6px' }}>{b ? 'CLI Command' : 'rosactl'}</th>
            <th style={{ textAlign: 'left', padding: '6px' }}>{b ? 'Today\'s Equivalent' : 'V1 Equivalent'}</th>
          </tr>
        </thead>
        <tbody>
          {[
            { res: 'Cluster', desc: b ? 'Your OpenShift cluster' : 'ROSA HCP cluster lifecycle', cli: 'cluster create/list/delete', v1: 'Cluster (clusters_mgmt)' },
            { res: 'NodePool', desc: b ? 'Groups of worker machines' : 'Worker node groups per cluster', cli: 'nodepool create/list/delete', v1: 'NodePool (HCP)' },
            { res: 'OidcConfig', desc: b ? 'Identity setup for pods' : 'OIDC issuer configuration', cli: 'oidc create/list/delete', v1: 'OidcConfig' },
            { res: b ? 'Account Link' : 'Account', desc: b ? 'Connect your AWS account to Red Hat' : 'AWS account ↔ RH org mapping', cli: 'link account', v1: b ? 'Not needed today' : 'N/A (implicit)' },
            { res: b ? 'Cedar Policy' : 'Policy', desc: b ? 'Permission rules' : 'Cedar permit/forbid policies', cli: 'policy create/attach', v1: b ? 'RBAC roles' : 'AMS RBAC roles' },
            { res: b ? 'VPC Setup' : 'VPC', desc: b ? 'Network setup' : 'VPC + subnets for cluster', cli: 'vpc create/list/delete', v1: b ? 'Manual / wizard' : 'AWS SDK in wizard' },
            { res: b ? 'IAM Setup' : 'IAM', desc: b ? 'AWS permission roles' : 'STS roles for cluster', cli: 'iam create/list/delete', v1: b ? 'Roles screen in wizard' : 'Manual / ocm-roles' },
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

/** Inner content — used when embedded inside RosaMap's 3-way toggle */
export function HyperfleetContent({ mode }: { mode: ExplainMode }) {
  const [view, setView] = useState<ArchView>('today');
  const b = mode === 'beginner';

  return (
    <>
      <div className="variant-toggle" style={{ marginBottom: 12, justifyContent: 'center', display: 'flex' }}>
        <button className={`variant-btn ${view === 'today' ? 'active' : ''}`} onClick={() => setView('today')}>
          {b ? 'Today (Centralized)' : 'clusters_mgmt (V1)'}
        </button>
        <button className={`variant-btn ${view === 'hyperfleet' ? 'active' : ''}`} onClick={() => setView('hyperfleet')}>
          {b ? 'HyperFleet (Regional)' : 'Platform API (V2)'}
        </button>
      </div>

      <h3 className="dd-page-title" style={{ fontSize: '1.1rem', marginBottom: 8 }}>
        <Globe size={18} className="dd-title-icon" style={{ color: '#0D47A1' }} />
        {b ? 'HyperFleet — ROSA Goes Regional' : 'HyperFleet — ROSA Regional Platform (RRP)'}
      </h3>

      <div className="rosa-variant-note" style={{ borderLeft: '4px solid #F57F17', background: '#FFFDE7' }}>
        <p><strong>⚠️ {b ? 'Note' : 'Disclaimer'}</strong></p>
        <p>{b
          ? 'HyperFleet is under active development and not yet available to customers. The information below is based on publicly available open-source code. Features and designs may change before release.'
          : 'Based on publicly available source code (openshift-online/rosa-hyperfleet-*). v1alpha1 — under active development, not GA. Architecture, API surface, and auth model are subject to change.'}
        </p>
      </div>

      <div className="rosa-variant-note" style={{ borderLeft: '4px solid #0D47A1' }}>
        <p><strong>{b ? 'What is HyperFleet?' : 'HyperFleet Overview'}</strong></p>
        <p>{b
          ? 'Today, all ROSA cluster management runs from a single location in the USA (Virginia). HyperFleet changes this — Red Hat will run management services in every major AWS region. This means your cluster data stays in your country, your API calls are faster, and if one region has problems, others keep running.'
          : 'ROSA Regional Platform (RRP) distributes ROSA HCP management from centralized us-east-1 to per-region EKS Management Clusters. New Platform API (v1alpha1) with AWS IAM SigV4 auth and Cedar-based authorization replaces clusters_mgmt for regional clusters. ROSA HCP only, AWS only.'}
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {view === 'today' ? <TodayDiagram b={b} /> : <HyperfleetDiagram b={b} />}
        </motion.div>
      </AnimatePresence>

      <RegionalExample b={b} />
      <AuthComparison b={b} />
      <CedarPolicies b={b} />
      <ApiResources b={b} />
      <OcmuiImpact b={b} />

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
