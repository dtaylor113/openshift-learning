import { AppMarker } from '../AppMarker';
import { ZoomLink } from '../ZoomLink';
import type { SceneProps } from '../types';
import { useGlossary } from '../GlossaryContext';
import { GLOSSARY } from '../Glossary';

function SmallPod({ x, y, name, color, highlighted }: { x: number; y: number; name: string; color: string; highlighted?: boolean }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x="0" y="0" width="85" height="30" rx="5"
        fill={highlighted ? '#E1F5FE' : '#fff'}
        stroke={highlighted ? '#4FC3F7' : color}
        strokeWidth={highlighted ? 2 : 1.5}
      />
      <text x="8" y="13" fontSize="7" fill={highlighted ? '#0277BD' : '#333'} fontWeight="bold">{name}</text>
      <rect x="6" y="17" width="26" height="9" rx="2" fill={color} fillOpacity="0.3" />
      <rect x="36" y="17" width="26" height="9" rx="2" fill={color} fillOpacity="0.15" />
    </g>
  );
}

export function NodeScene({ mode, onNavigate }: SceneProps) {
  const b = mode === 'beginner';
  const { show, hide } = useGlossary();

  const tip = (term: string, label?: string) => (
    <tspan fill="#78909C" className="svg-glossary-term"
      onMouseEnter={() => show(term, GLOSSARY[term])}
      onMouseLeave={hide}
    >{label || term}</tspan>
  );

  return (
    <g>
      {/* Machine Pool overlay */}
      <rect x="12" y="6" width="476" height="400" rx="20" fill="none" stroke="#9575CD" strokeWidth="1.5" strokeDasharray="6 4" />
      <rect x="18" y="10" width="220" height="16" rx="4" fill="#EDE7F6" />
      <text x="26" y="22" fontSize="8" fill="#4527A0" fontWeight="bold">
        {b ? <>🏗️ {tip('Machine Pool')}: a group of identical nodes</> : <>🏗️ {tip('Machine Pool')}: worker-pool-1 (e.g. m5.xlarge × 3)</>}
      </text>

      {/* Node boundary */}
      <rect x="25" y="32" width="450" height="300" rx="16" fill="#F3E5F5" stroke="#BA68C8" strokeWidth="3" />
      <text x="45" y="56" fontSize="13" fill="#6A1B9A" fontWeight="bold">
        {b ? <>{tip('Worker Node')} (runs your app pods)</> : <>{tip('Worker Node')}: ip-10-0-1-42</>}
      </text>
      <text x="45" y="72" fontSize="9" fill="#7B1FA2" fontFamily="monospace">
        {b ? 'One machine in the pool — the cluster can add more if needed' : <>{tip('RHCOS')} • e.g. m5.xlarge • 4 vCPU • 16 GiB RAM</>}
      </text>

      {/* System services */}
      {b && (
        <g>
          <rect x="42" y="78" width="420" height="12" rx="3" fill="#EDE7F6" />
          <text x="50" y="87" fontSize="7" fill="#6A1B9A" fontWeight="bold">
            System services on every node — they manage pods on this machine:
          </text>
        </g>
      )}

      <rect x="45" y={b ? 95 : 82} width="130" height="36" rx="8" fill="#CE93D8" fillOpacity="0.3" stroke="#AB47BC" strokeWidth="1.5" />
      <text x="58" y={b ? 110 : 98} fontSize="9" fill="#6A1B9A" fontWeight="bold">
        {b ? 'Pod Manager' : tip('kubelet')}
      </text>
      <text x="58" y={b ? 122 : 110} fontSize="7" fill="#8E24AA">
        {b ? 'Starts & stops pods' : 'manages pod lifecycle'}
      </text>

      <rect x="185" y={b ? 95 : 82} width="130" height="36" rx="8" fill="#CE93D8" fillOpacity="0.3" stroke="#AB47BC" strokeWidth="1.5" />
      <text x="198" y={b ? 110 : 98} fontSize="9" fill="#6A1B9A" fontWeight="bold">
        {b ? 'Container Engine' : tip('CRI-O')}
      </text>
      <text x="198" y={b ? 122 : 110} fontSize="7" fill="#8E24AA">
        {b ? 'Runs containers' : 'OCI container runtime'}
      </text>

      <rect x="325" y={b ? 95 : 82} width="135" height="36" rx="8" fill="#CE93D8" fillOpacity="0.3" stroke="#AB47BC" strokeWidth="1.5" />
      <text x="338" y={b ? 110 : 98} fontSize="9" fill="#6A1B9A" fontWeight="bold">
        {b ? 'Network Manager' : tip('kube-proxy')}
      </text>
      <text x="338" y={b ? 122 : 110} fontSize="7" fill="#8E24AA">
        {b ? 'Routes traffic to pods' : 'iptables / IPVS rules'}
      </text>

      {/* Pod area */}
      <rect x="42" y={b ? 140 : 125} width="420" height="138" rx="10" fill="rgba(206,147,216,0.1)" stroke="#CE93D8" strokeWidth="1" strokeDasharray="5 3" />
      <text x="55" y={b ? 156 : 141} fontSize="9" fill="#8E24AA" fontWeight="bold">
        Pods on this machine:
      </text>

      {/* myapp replicas — all clickable to zoom into Pod */}
      {[
        { x: 55, name: b ? 'myapp replica 1' : 'myapp-x2k9p', hl: true },
        { x: 148, name: b ? 'myapp replica 2' : 'myapp-a8m3n' },
        { x: 241, name: b ? 'myapp replica 3' : 'myapp-q5w7r' },
      ].map((p, i) => (
        <g key={i} style={{ cursor: onNavigate ? 'pointer' : undefined }} onClick={() => onNavigate?.(2)}>
          <SmallPod x={p.x} y={b ? 162 : 148} name={p.name} color="#E57373" highlighted={p.hl} />
          <ZoomLink x={p.x + 78} y={b ? 165 : 151} />
        </g>
      ))}

      {/* Row label: same app */}
      <text x={430} y={b ? 175 : 161} fontSize="6" fill="#C62828">← same app,</text>
      <text x={430} y={b ? 183 : 169} fontSize="6" fill="#C62828">3 copies</text>

      {/* Other apps — different apps sharing this node (different colors) */}
      <SmallPod x={55} y={b ? 198 : 183} name={b ? 'database' : 'redis-0'} color="#4FC3F7" />
      <SmallPod x={148} y={b ? 198 : 183} name={b ? 'monitoring' : 'monitoring-xz'} color="#66BB6A" />
      <SmallPod x={241} y={b ? 198 : 183} name={b ? 'log collector' : 'logging-4k'} color="#FFB74D" />
      <SmallPod x={334} y={b ? 198 : 183} name={b ? 'DNS' : 'dns-resolver'} color="#7986CB" />

      <SmallPod x={55} y={b ? 234 : 218} name={b ? 'gateway' : 'ingress-rt'} color="#4DB6AC" />
      <SmallPod x={148} y={b ? 234 : 218} name={b ? 'cert manager' : 'cert-mgr'} color="#BA68C8" />
      <SmallPod x={241} y={b ? 234 : 218} name={b ? 'metrics' : 'metrics-srv'} color="#66BB6A" />

      {/* Row label: different apps */}
      <text x={430} y={b ? 211 : 196} fontSize="6" fill="#555">← different</text>
      <text x={430} y={b ? 219 : 204} fontSize="6" fill="#555">apps sharing</text>
      <text x={430} y={b ? 227 : 212} fontSize="6" fill="#555">this node</text>

      <AppMarker x={98} y={b ? 172 : 158} size="small" />

      {/* Resource bars */}
      <rect x="45" y="290" width="420" height="32" rx="6" fill="#EDE7F6" stroke="#B39DDB" strokeWidth="1" />
      <text x="58" y="306" fontSize="7" fill="#4527A0" fontWeight="bold">
        {b ? 'How full is this machine?' : 'Resources:'}
      </text>
      <rect x="195" y="298" width="90" height="8" rx="3" fill="#E0E0E0" />
      <rect x="195" y="298" width="58" height="8" rx="3" fill="#AB47BC" />
      <text x="195" y="316" fontSize="6" fill="#6A1B9A">{b ? 'CPU: 65% used' : 'CPU: 65%'}</text>

      <rect x="320" y="298" width="90" height="8" rx="3" fill="#E0E0E0" />
      <rect x="320" y="298" width="72" height="8" rx="3" fill="#7B1FA2" />
      <text x="320" y="316" fontSize="6" fill="#6A1B9A">{b ? 'Memory: 80% used' : 'Mem: 80%'}</text>

      {/* Machine Pool callout at bottom */}
      <rect x="25" y="345" width="450" height="42" rx="8" fill="rgba(255,255,255,0.7)" stroke="#B39DDB" strokeWidth="1" />
      <text x="40" y="360" fontSize="8" fill="#4527A0" fontWeight="bold">
        {b ? <>💡 This node is part of a {tip('Machine Pool')} — a group of identical machines:</> : <>💡 {tip('Machine Pool')} ({tip('ROSA')} {tip('Classic')}) / {tip('Node Pool')} ({tip('ROSA')} {tip('HCP')}):</>}
      </text>
      <text x="40" y="375" fontSize="7" fill="#7B1FA2">
        {b
          ? 'The pool can grow or shrink automatically. Need more capacity? The pool adds another node just like this one.'
          : <>Maps to an {tip('AWS')} {tip('ASG', 'Auto Scaling Group')}. Pool defines instance type, {tip('AZ')}, labels, {tip('taints')}. {tip('MachineAutoscaler', 'Autoscaler')} adjusts count.</>}
      </text>

    </g>
  );
}
