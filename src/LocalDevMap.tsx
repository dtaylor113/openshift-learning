import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ExplainMode } from './types';
import { ModeToggle } from './ModeToggle';
import { ExploreMore, DEEP_DIVE_LINKS } from './ExploreMore';

type LocalVariant = 'crc' | 'microshift';

interface LocalDevMapProps {
  mode: ExplainMode;
  onModeChange: (mode: ExplainMode) => void;
}

function CrcDiagram({ b }: { b: boolean }) {
  return (
    <svg viewBox="0 0 700 400" className="rosa-svg">
      {/* Your laptop */}
      <rect x="10" y="10" width="680" height="380" rx="18" fill="#F5F5F5" stroke="#616161" strokeWidth="2" />
      <text x="30" y="42" fontSize="14" fill="#333" fontWeight="bold">
        💻 {b ? 'Your Laptop / Desktop' : 'Developer Workstation'}
      </text>
      <text x="30" y="58" fontSize="9" fill="#777">{b ? 'macOS, Linux, or Windows' : 'macOS (M1/Intel), Linux (x86_64), Windows (Hyper-V)'}</text>

      {/* CRC binary */}
      <rect x="30" y="70" width="200" height="85" rx="10" fill="#fff" stroke="#1565C0" strokeWidth="1.5" />
      <text x="45" y="90" fontSize="10" fill="#1565C0" fontWeight="bold">⚡ {b ? 'OpenShift Local' : 'crc binary'}</text>
      <text x="45" y="106" fontSize="8" fill="#777">{b ? 'A command you run in terminal:' : 'CLI commands:'}</text>
      <text x="45" y="120" fontSize="7" fill="#333" fontFamily="monospace">$ crc setup</text>
      <text x="45" y="132" fontSize="7" fill="#333" fontFamily="monospace">$ crc start</text>
      <text x="45" y="144" fontSize="7" fill="#333" fontFamily="monospace">{b ? '$ crc console  # open UI' : '$ crc console / oc login'}</text>

      {/* Arrow */}
      <line x1="230" y1="112" x2="260" y2="112" stroke="#1565C0" strokeWidth="2" />
      <polygon points="256,108 264,112 256,116" fill="#1565C0" />
      <text x="230" y="100" fontSize="7" fill="#1565C0">{b ? 'creates' : 'provisions'}</text>

      {/* VM */}
      <rect x="270" y="70" width="400" height="310" rx="14" fill="#E3F2FD" stroke="#1565C0" strokeWidth="2" />
      <text x="290" y="95" fontSize="12" fill="#1565C0" fontWeight="bold">
        🖥️ {b ? 'Virtual Machine (runs inside your laptop)' : 'CRC VM (libvirt/HyperKit/Hyper-V)'}
      </text>
      <text x="290" y="112" fontSize="8" fill="#777">{b ? 'A mini computer inside your computer' : '~4 vCPU, 9+ GB RAM, 35+ GB disk'}</text>

      {/* Single-node OpenShift inside VM */}
      <rect x="290" y="120" width="360" height="245" rx="10" fill="rgba(255,255,255,0.6)" stroke="#EF5350" strokeWidth="1.5" strokeDasharray="5 3" />
      <text x="310" y="142" fontSize="11" fill="#CC0000" fontWeight="bold">
        {b ? '🔴 Single-Node OpenShift (everything in one!)' : '🔴 Single-Node OCP 4 (all-in-one)'}
      </text>

      {/* Control plane components */}
      <rect x="310" y="152" width="160" height="85" rx="8" fill="#FFCDD2" stroke="#EF5350" strokeWidth="1.5" />
      <text x="322" y="170" fontSize="9" fill="#B71C1C" fontWeight="bold">🧠 {b ? 'Control Plane' : 'Control Plane'}</text>
      <rect x="320" y="178" width="60" height="16" rx="3" fill="#fff" stroke="#EF9A9A" strokeWidth="1" />
      <text x="326" y="190" fontSize="6" fill="#C62828">{b ? 'Front Door' : 'API Server'}</text>
      <rect x="385" y="178" width="45" height="16" rx="3" fill="#fff" stroke="#EF9A9A" strokeWidth="1" />
      <text x="391" y="190" fontSize="6" fill="#C62828">{b ? 'Memory' : 'etcd'}</text>
      <rect x="320" y="200" width="60" height="16" rx="3" fill="#fff" stroke="#EF9A9A" strokeWidth="1" />
      <text x="326" y="212" fontSize="6" fill="#C62828">Scheduler</text>
      <rect x="385" y="200" width="75" height="16" rx="3" fill="#fff" stroke="#EF9A9A" strokeWidth="1" />
      <text x="391" y="212" fontSize="6" fill="#C62828">{b ? 'Auto-Fixer' : 'Controllers'}</text>

      {/* OCP Console */}
      <rect x="490" y="152" width="145" height="85" rx="8" fill="#E0F2F1" stroke="#4DB6AC" strokeWidth="1.5" />
      <text x="502" y="170" fontSize="9" fill="#00695C" fontWeight="bold">🎛️ {b ? 'Console' : 'OCP Console'}</text>
      <text x="502" y="186" fontSize="7" fill="#00897B">{b ? 'https://console-' : 'console-openshift-'}</text>
      <text x="502" y="198" fontSize="7" fill="#00897B">{b ? 'openshift.apps-crc' : 'console.apps-crc.testing'}</text>
      <text x="502" y="214" fontSize="7" fill="#00897B">{b ? 'Full OpenShift UI!' : 'Admin + Dev perspectives'}</text>
      <text x="502" y="226" fontSize="7" fill="#00897B">{b ? 'Same as production' : 'kubeadmin credentials'}</text>

      {/* Worker area (same node) */}
      <rect x="310" y="245" width="320" height="105" rx="8" fill="#EDE7F6" stroke="#CE93D8" strokeWidth="1.5" />
      <text x="322" y="262" fontSize="9" fill="#6A1B9A" fontWeight="bold">
        🏗️ {b ? 'Your Apps Run Here Too (same machine!)' : 'Worker Role (same node)'}
      </text>
      <text x="322" y="276" fontSize="7" fill="#777">{b ? 'Deploy pods, test services — just like production' : 'Workloads share resources with CP components'}</text>

      {/* Sample pods */}
      {[
        { name: b ? 'myapp' : 'myapp-pod', color: '#E8F5E9', border: '#A5D6A7' },
        { name: b ? 'database' : 'postgres-pod', color: '#E3F2FD', border: '#90CAF9' },
        { name: b ? 'redis' : 'redis-pod', color: '#FFF3E0', border: '#FFB74D' },
      ].map((pod, i) => (
        <g key={i}>
          <rect x={322 + i * 100} y={285} width={88} height={25} rx="4" fill={pod.color} stroke={pod.border} strokeWidth="1" />
          <text x={332 + i * 100} y={302} fontSize="7" fill="#333">{pod.name}</text>
        </g>
      ))}

      <text x="322" y="330" fontSize="7" fill="#6A1B9A" fontStyle="italic">
        {b ? '⚠️ Not for production! Limited resources. For learning & testing only.' : '⚠️ Resource-constrained. No HA. Dev/test only.'}
      </text>

      {/* Requirements callout */}
      <rect x="30" y="170" width="200" height="195" rx="10" fill="#fff" stroke="#9E9E9E" strokeWidth="1" />
      <text x="45" y="190" fontSize="10" fill="#333" fontWeight="bold">📋 {b ? 'Requirements' : 'System Requirements'}</text>
      {(b ? [
        '4+ CPU cores',
        '9+ GB free RAM',
        '35+ GB free disk space',
        'Virtualization support',
        'Red Hat account (free!)',
        'Pull secret from',
        'console.redhat.com',
      ] : [
        '4 vCPU (physical cores)',
        '9 GiB RAM (free)',
        '35 GiB disk (dynamic)',
        'HW virt (VT-x / AMD-V)',
        'Red Hat account',
        'Pull secret (RH registry)',
        'crc binary download',
      ]).map((req, i) => (
        <text key={i} x="45" y={210 + i * 20} fontSize="8" fill="#555">
          {i < 4 ? '✅' : 'ℹ️'} {req}
        </text>
      ))}
    </svg>
  );
}

function MicroShiftDiagram({ b }: { b: boolean }) {
  return (
    <svg viewBox="0 0 700 380" className="rosa-svg">
      {/* Device/Edge */}
      <rect x="10" y="10" width="680" height="360" rx="18" fill="#F5F5F5" stroke="#616161" strokeWidth="2" />
      <text x="30" y="42" fontSize="14" fill="#333" fontWeight="bold">
        📟 {b ? 'Small Device or Edge Server' : 'Edge Device / Minimal Server'}
      </text>
      <text x="30" y="58" fontSize="9" fill="#777">{b ? 'IoT gateway, retail kiosk, factory floor' : 'RHEL 9, x86_64 or aarch64, 2+ CPU, 2+ GiB RAM'}</text>

      {/* RHEL base */}
      <rect x="30" y="70" width="640" height="285" rx="14" fill="#FDE8E8" stroke="#CC0000" strokeWidth="1.5" />
      <text x="50" y="95" fontSize="12" fill="#CC0000" fontWeight="bold">
        🐧 {b ? 'Red Hat Enterprise Linux (the server\'s OS)' : 'RHEL 9 (Host OS)'}
      </text>

      {/* MicroShift */}
      <rect x="50" y="105" width="600" height="235" rx="10" fill="rgba(255,255,255,0.6)" stroke="#7B1FA2" strokeWidth="1.5" strokeDasharray="5 3" />
      <text x="70" y="128" fontSize="12" fill="#7B1FA2" fontWeight="bold">
        🔬 {b ? 'MicroShift (tiny OpenShift)' : 'MicroShift (K8s + OCP APIs subset)'}
      </text>
      <text x="70" y="144" fontSize="8" fill="#777">
        {b ? 'Just the essential OpenShift parts — runs on very small hardware' : 'Minimal footprint: single-process, ~700 MiB RAM, systemd-managed'}
      </text>

      {/* Components */}
      <rect x="70" y="155" width="145" height="65" rx="8" fill="#FFCDD2" stroke="#EF5350" strokeWidth="1.5" />
      <text x="82" y="172" fontSize="9" fill="#B71C1C" fontWeight="bold">{b ? '🧠 Mini Brain' : 'API + etcd'}</text>
      <text x="82" y="186" fontSize="7" fill="#777">{b ? 'Embedded API server' : 'Embedded kube-apiserver'}</text>
      <text x="82" y="198" fontSize="7" fill="#777">{b ? '+ built-in memory' : '+ etcd (embedded)'}</text>
      <text x="82" y="210" fontSize="7" fill="#777">{b ? '' : '+ kubelet, kube-proxy'}</text>

      <rect x="230" y="155" width="145" height="65" rx="8" fill="#E0F2F1" stroke="#4DB6AC" strokeWidth="1.5" />
      <text x="242" y="172" fontSize="9" fill="#00695C" fontWeight="bold">{b ? '🛣️ Networking' : 'OVN-Kubernetes'}</text>
      <text x="242" y="186" fontSize="7" fill="#777">{b ? 'Routes + ingress' : 'CNI, Routes, Services'}</text>
      <text x="242" y="198" fontSize="7" fill="#777">{b ? 'built in' : 'ingress controller'}</text>

      <rect x="390" y="155" width="145" height="65" rx="8" fill="#FFF3E0" stroke="#FFB74D" strokeWidth="1.5" />
      <text x="402" y="172" fontSize="9" fill="#E65100" fontWeight="bold">{b ? '💾 Storage' : 'CSI (LVMS)'}</text>
      <text x="402" y="186" fontSize="7" fill="#777">{b ? 'Local disk storage' : 'LVM-based local volumes'}</text>
      <text x="402" y="198" fontSize="7" fill="#777">{b ? 'for your apps' : 'PV provisioning'}</text>

      <rect x="550" y="155" width="85" height="65" rx="8" fill="#F3E5F5" stroke="#CE93D8" strokeWidth="1.5" />
      <text x="560" y="172" fontSize="9" fill="#7B1FA2" fontWeight="bold">{b ? '🔒 Auth' : 'SCC'}</text>
      <text x="560" y="186" fontSize="7" fill="#777">{b ? 'Security' : 'SecurityContext'}</text>
      <text x="560" y="198" fontSize="7" fill="#777">{b ? 'policies' : 'Constraints'}</text>

      {/* Workloads */}
      <rect x="70" y="230" width="565" height="95" rx="8" fill="#EDE7F6" stroke="#CE93D8" strokeWidth="1" />
      <text x="82" y="250" fontSize="9" fill="#6A1B9A" fontWeight="bold">
        {b ? '📦 Your Edge Apps' : 'Workloads (pods)'}
      </text>

      {(b ? [
        { name: 'sensor-reader', desc: 'reads sensors' },
        { name: 'data-processor', desc: 'analyzes data' },
        { name: 'dashboard', desc: 'local web UI' },
      ] : [
        { name: 'sensor-agent', desc: 'DaemonSet' },
        { name: 'data-pipeline', desc: 'Deployment' },
        { name: 'dashboard', desc: 'Deployment' },
      ]).map((app, i) => (
        <g key={i}>
          <rect x={82 + i * 185} y={260} width={170} height={50} rx="6" fill="#fff" stroke="#CE93D8" strokeWidth="1" />
          <text x={94 + i * 185} y={278} fontSize="8" fill="#6A1B9A" fontWeight="bold">{app.name}</text>
          <text x={94 + i * 185} y={296} fontSize="7" fill="#777">{app.desc}</text>
        </g>
      ))}
    </svg>
  );
}

export function LocalDevMap({ mode, onModeChange }: LocalDevMapProps) {
  const [variant, setVariant] = useState<LocalVariant>('crc');
  const b = mode === 'beginner';

  return (
    <div className="rosa-map">
      <div className="rosa-controls">
        <div className="variant-toggle">
          <button className={`variant-btn ${variant === 'crc' ? 'active' : ''}`} onClick={() => setVariant('crc')}>
            OpenShift Local (crc)
          </button>
          <button className={`variant-btn ${variant === 'microshift' ? 'active' : ''}`} onClick={() => setVariant('microshift')}>
            MicroShift
          </button>
        </div>
        <ModeToggle mode={mode} onModeChange={onModeChange} />
      </div>

      <h2 className="dd-page-title">💻 Local Dev — <em>Red Hat OpenShift Local (crc) &amp; MicroShift</em></h2>

      <AnimatePresence mode="wait">
        <motion.div
          key={variant}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {variant === 'crc' ? <CrcDiagram b={b} /> : <MicroShiftDiagram b={b} />}
        </motion.div>
      </AnimatePresence>

      <div className="rosa-variant-note">
        <p>{variant === 'crc'
          ? (b
            ? '📌 OpenShift Local gives you a real OpenShift cluster on your laptop. It\'s the exact same OpenShift as production — just shrunk down to one machine. Perfect for learning, developing, and testing before deploying to a real cluster.'
            : '📌 Red Hat OpenShift Local (crc) runs a single-node OCP 4 cluster in a VM. Full OCP API surface (Routes, SCCs, OperatorHub, Dev Console). Uses libvirt (Linux), HyperKit (macOS Intel), or Hyper-V (Windows). Apple Silicon via vfkit. Not for production workloads.')
          : (b
            ? '📌 MicroShift is a tiny version of OpenShift for edge devices — think factory sensors, retail kiosks, or remote equipment. It runs directly on RHEL (no VM needed) and uses very little resources. It has most OpenShift features but skips the big management console.'
            : '📌 MicroShift: OpenShift APIs (Routes, Services, PVCs, SCCs) on a minimal footprint. Single binary, systemd-managed, ~700 MiB RAM. No console UI, no OLM, no full monitoring stack. Designed for RHEL-based edge deployments. Managed at scale via RHEL Image Builder + OSTree.')
        }
        </p>
      </div>

      <div className="rosa-bridge">
        <h4>{b ? '🤔 CRC vs MicroShift — Which one?' : '🤔 CRC vs MicroShift'}</h4>
        <div className="rosa-bridge-content">
          <div className="rosa-bridge-side">
            <strong style={{ color: '#1565C0' }}>OpenShift Local (crc)</strong>
            <p>{b
              ? 'Full OpenShift on your laptop. Has everything — console, operators, the works. Needs ~9 GB RAM. For developers who want the real experience.'
              : 'Full OCP in a VM. Complete API surface + console + OLM. 9+ GiB RAM, 4+ vCPU. Dev/test parity with production clusters.'}
            </p>
          </div>
          <div className="rosa-bridge-arrow">
            <span>{b ? 'vs' : 'tradeoff'}</span>
          </div>
          <div className="rosa-bridge-side">
            <strong style={{ color: '#7B1FA2' }}>MicroShift</strong>
            <p>{b
              ? 'Tiny OpenShift for edge/IoT devices. Needs only ~2 GB RAM. No web console. For running apps on small hardware in remote locations.'
              : 'Minimal OCP APIs on RHEL. ~700 MiB RAM, 2 CPU. No console, no OLM. For edge/IoT workloads. Managed via OSTree.'}
            </p>
          </div>
        </div>
      </div>

      <ExploreMore links={DEEP_DIVE_LINKS.local} />
    </div>
  );
}
