import { useState } from 'react';
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
      <text x="415" y="90" fontSize="7" fill="#777" fontFamily="monospace">api.openshift.com</text>
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
  const { show, hide } = useGlossary();
  const tip = (term: string, label?: string) => (
    <tspan fill="#78909C" className="svg-glossary-term"
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
        <text x="340" y="20" textAnchor="middle" fontSize="10" fill="#283593" fontWeight="bold">
          🌍 Three independent copies: 🇺🇸 US East · 🇩🇪 Frankfurt · 🇯🇵 Tokyo — diagram shows one
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
        <rect x="148" y="240" width="384" height="26" rx="7" fill="#E8EAF6" stroke="#7986CB" strokeWidth="1.2" />
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
          <p>{b
            ? '• You log in with your AWS credentials (like the AWS Console)\n• Your AWS account is linked to your Red Hat org (one-time setup)\n• Permissions: Cedar "rules" you write — much more flexible\n• Example: "This user can create clusters, but only in Frankfurt"'
            : <>{g('• AWS IAM SigV4 request signing\n• Principal linked to RH user via rosactl link account\n• Cedar policies: permit/forbid with resource labels, context.region\n• Action groups: ReadOnly, ClusterAdmin, NodePoolAdmin, PolicyAdmin')}</>}
          </p>
        </div>
      </div>
      <div className="rosa-variant-note" style={{ borderLeft: '4px solid #7986CB', marginTop: '12px' }}>
        <p><strong>{b ? 'Wait — what about the OCM website?' : 'Browser Authentication'}</strong></p>
        <p>{b
          ? 'Today, your browser talks to the OCM API using your Red Hat login — simple. With HyperFleet, the API expects AWS-style credentials, but browsers can\'t easily do that. So a "translator" is being built — you\'ll still log in with your Red Hat account on the website, and a backend service converts it into something the new API understands. This is being designed now (not built yet).'
          : <>{g('SigV4')} signing requires {g('AWS')} credentials not available in browser JavaScript. A POST /token exchange endpoint is being designed to convert RH {g('SSO')} sessions into V2-compatible short-lived tokens, enabling the {g('OCM')} Console to call the Platform {g('API')} without exposing {g('AWS')} credentials client-side. (A {g('BFF')} proxy is one candidate approach.)</>}
        </p>
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
        'POST api.openshift.com/clusters (us-east-1)',
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
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#CC0000', marginBottom: '6px' }}>
            {b ? '❌ Today' : '❌ Centralized (V1)'}
          </p>
          <div className="rosa-variant-note" style={{ borderLeft: '4px solid #CC0000' }}>
            <ol style={olStyle}>
              {todayItems.map((item, i) => (
                <li key={i} style={liStyle}>{b ? item : g(item)}</li>
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
        {[
          {
            title: b ? '🌐 Region Picker' : '🌐 Region Selector',
            desc: b ? 'A new dropdown to choose which region you\'re looking at — or "All Regions" to see everything' : g('Masthead or toolbar region scope. "All Regions" parallel fetch vs single-region view. Extends existing MultiRegion components.'),
            color: '#1565C0',
          },
          {
            title: b ? '📋 Cluster List' : '📋 Cluster List Coexistence',
            desc: b ? 'Old and new clusters will appear together. New ones will show which region they\'re in more prominently' : g('V1 + V2 clusters in same list during migration. Region column, platform version badge. Different available actions per API version.'),
            color: '#6A1B9A',
          },
          {
            title: b ? '🔑 Login Changes' : '🔑 Auth Integration',
            desc: b ? 'You\'ll still use your Red Hat login on the website — a backend "translator" handles the new API credentials' : g('Token exchange or BFF proxy. Browser session → V2-compatible credentials. Transparent to end user.'),
            color: '#283593',
          },
          {
            title: b ? '➕ ROSA HCP Wizard Updates' : '➕ ROSA HCP Wizard (V2 backend)',
            desc: b ? 'The existing ROSA HCP wizard would talk to the new regional API instead. New prerequisite: link your AWS account first. Same cluster settings (region, VPC, networking, etc.).' : g('Same HostedClusterSpec fields (release, platform, networking, FIPS). V2 backend: account linking prereq, OidcConfig as separate CRD, region = API region. Not a separate wizard — adapted existing HCP flow.'),
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
            { res: 'Cluster', desc: b ? 'Your OpenShift cluster' : 'ROSA HCP cluster lifecycle', cli: 'rosa create cluster --hyperfleet', v1: 'Cluster (clusters_mgmt)' },
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
  const b = mode === 'beginner';
  const g = createGlossarizer();

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
          ? 'HyperFleet is under active development and not yet available to customers. An internal preview is targeted for Q1 2027. The information below is based on publicly available open-source code. Features and designs may change before release.'
          : <>{g('Based on publicly available source code (openshift-online/rosa-hyperfleet-*). v1alpha1 — under active development, not GA. Internal preview targeted Q1 2027. Architecture, API surface, and auth model are subject to change.')}</>}
        </p>
      </div>

      <div className="rosa-variant-note" style={{ borderLeft: '4px solid #0D47A1' }}>
        <p><strong>{b ? 'What is HyperFleet?' : 'HyperFleet Overview'}</strong></p>
        <p>{b
          ? 'Today, all ROSA cluster management runs from a single location in the USA (Virginia). HyperFleet changes this — Red Hat will run management services in every major AWS region. This means your cluster data stays in your country, your API calls are faster, and if one region has problems, others keep running.'
          : <>{g('ROSA Regional Platform (RRP) distributes ROSA HCP management to per-region EKS Regional Clusters (RC), each backed by Aurora PostgreSQL (via hyperfleet-db) and driving one or more Management Clusters (MC) via DynamoDB fan-out and kube-applier agents. New Platform API (v1alpha1) with AWS IAM SigV4 auth and Cedar-based authorization. ROSA HCP only, AWS only.')}</>}
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

      {view === 'hyperfleet' && (
        <>
          <RegionalExample b={b} />
          <ArchCallout b={b} />
          <AuthComparison b={b} />
          <CedarPolicies b={b} />
          <ZoaSection b={b} />
          <ApiResources b={b} />
          <OcmuiImpact b={b} />
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
