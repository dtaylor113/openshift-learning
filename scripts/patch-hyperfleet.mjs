import { readFileSync, writeFileSync } from 'fs';

let src = readFileSync('src/HyperfleetMap.tsx', 'utf8');

const oldStart = src.indexOf('function HyperfleetDiagram({ b }: { b: boolean }) {');
const oldEnd   = src.indexOf('\nfunction AuthComparison');

const newFn = `function HyperfleetDiagram({ b }: { b: boolean }) {
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
      <svg viewBox="0 0 680 572" className="rosa-svg">

        {/* ×3 badge */}
        <rect x="10" y="4" width="660" height="24" rx="8" fill="#E8EAF6" stroke="#7986CB" strokeWidth="1.2" />
        <text x="340" y="20" textAnchor="middle" fontSize="10" fill="#283593" fontWeight="bold">
          🌍 Three independent copies: 🇺🇸 US East · 🇩🇪 Frankfurt · 🇯🇵 Tokyo — diagram shows one
        </text>

        {/* ── Red Hat Regional Cluster ── */}
        <rect x="10" y="34" width="660" height="174" rx="12" fill="#FDE8E8" stroke="#CC0000" strokeWidth="2" />
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
        <line x1="340" y1="212" x2="340" y2="228" stroke="#7986CB" strokeWidth="2" strokeDasharray="5 3" />
        <rect x="148" y="228" width="384" height="26" rx="7" fill="#E8EAF6" stroke="#7986CB" strokeWidth="1.2" />
        <text x="340" y="244" textAnchor="middle" fontSize="9.5" fill="#283593" fontWeight="bold">
          📤 Settings relay — sends desired cluster state down to the computer below
        </text>
        <line x1="340" y1="254" x2="340" y2="270" stroke="#7986CB" strokeWidth="2" strokeDasharray="5 3" />
        <polygon points="334,266 340,274 346,266" fill="#7986CB" />

        {/* ── Management Computer ── */}
        <rect x="10" y="276" width="660" height="148" rx="12" fill="#EDE7F6" stroke="#7B1FA2" strokeWidth="2" />
        <text x="24" y="297" fontSize="13" fill="#6A1B9A" fontWeight="bold">🖥 Management Computer</text>

        {/* Settings Fetcher */}
        <rect x="18" y="303" width="308" height="80" rx="8" fill="#fff" stroke="#CE93D8" strokeWidth="1.2" />
        <text x="30" y="321" fontSize="11" fill="#6A1B9A" fontWeight="bold">📥 Settings Fetcher</text>
        <text x="30" y="337" fontSize="9" fill="#555">Reads the relay above and applies</text>
        <text x="30" y="352" fontSize="9" fill="#555">the settings to run your cluster here</text>
        <text x="30" y="372" fontSize="8" fill="#aaa" fontStyle="italic">(kube-applier — pull-based)</text>

        {/* Control Plane Engine */}
        <rect x="338" y="303" width="324" height="80" rx="8" fill="#FFCDD2" stroke="#EF5350" strokeWidth="1.2" />
        <text x="350" y="321" fontSize="11" fill="#B71C1C" fontWeight="bold">🧠 Control Plane Engine</text>
        <text x="350" y="337" fontSize="9" fill="#555">Runs your OpenShift cluster's</text>
        <text x="350" y="352" fontSize="9" fill="#555">"brain" — API, scheduling, self-healing</text>
        <text x="350" y="372" fontSize="8" fill="#aaa" fontStyle="italic">(HyperShift — one per customer cluster)</text>

        {/* Lifecycle row */}
        <rect x="18" y="389" width="644" height="26" rx="6" fill="#fff" stroke="#CE93D8" strokeWidth="0.8" />
        <text x="30" y="406" fontSize="9.5" fill="#6A1B9A">🔑 Certificate manager · 🌐 DNS manager · 📊 Cluster health checks</text>

        {/* Arrow */}
        <line x1="340" y1="428" x2="340" y2="446" stroke="#FF9900" strokeWidth="2.5" />
        <polygon points="334,442 340,450 346,442" fill="#FF9900" />

        {/* ── Customer AWS ── */}
        <rect x="10" y="452" width="660" height="116" rx="12" fill="#FFF8E1" stroke="#FF9900" strokeWidth="2" />
        <text x="24" y="473" fontSize="13" fill="#E65100" fontWeight="bold">🟠 Your AWS Account</text>

        {/* Workers */}
        <rect x="18" y="479" width="310" height="76" rx="8" fill="#F3E5F5" stroke="#BA68C8" strokeWidth="1" strokeDasharray="4 2" />
        <text x="30" y="495" fontSize="10" fill="#6A1B9A" fontWeight="bold">Node Pool (your worker machines)</text>
        {[0, 1, 2].map(j => (
          <g key={j}>
            <rect x={30 + j * 93} y={500} width={84} height={20} rx="4" fill="#EDE7F6" stroke="#CE93D8" strokeWidth="0.8" />
            <text x={36 + j * 93} y={513} fontSize="8.5" fill="#6A1B9A">Worker {j + 1}</text>
            <rect x={30 + j * 93} y={524} width={84} height={14} rx="3" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="0.5" />
            <text x={36 + j * 93} y={534} fontSize="7.5" fill="#2E7D32">your pods</text>
          </g>
        ))}

        {/* AWS Infra */}
        <rect x="338" y="479" width="324" height="76" rx="8" fill="#FFF3E0" stroke="#FFB74D" strokeWidth="1" />
        <text x="350" y="495" fontSize="10" fill="#E65100" fontWeight="bold">🔧 AWS Infrastructure</text>
        {['🌐 Virtual network (VPC)', '💿 Storage disks (EBS)', '🔤 DNS routing (Route53)', '🔑 Access permissions (IAM)'].map((s, j) => (
          <g key={j}>
            <rect x="350" y={500 + j * 14} width="304" height="12" rx="2" fill="#fff" stroke="#FFE0B2" strokeWidth="0.5" />
            <text x="356" y={510 + j * 14} fontSize="8.5" fill="#BF360C">{s}</text>
          </g>
        ))}

        {/* Bottom callout */}
        <rect x="10" y="575" width="660" height="0" fill="none" />
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
          <polygon points={\`\${cx + 112},209 \${cx + 116},217 \${cx + 120},209\`} fill="#7986CB" />

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
          <polygon points={\`\${cx + 112},350 \${cx + 116},358 \${cx + 120},350\`} fill="#FF9900" />

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
}`;

src = src.slice(0, oldStart) + newFn + src.slice(oldEnd);
writeFileSync('src/HyperfleetMap.tsx', src);
console.log('Done. File length:', src.length);
