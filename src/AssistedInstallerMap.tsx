import type { ExplainMode } from './types';
import { ModeToggle } from './ModeToggle';
import { ExploreMore, DEEP_DIVE_LINKS } from './ExploreMore';

interface AssistedInstallerMapProps {
  mode: ExplainMode;
  onModeChange: (mode: ExplainMode) => void;
}

function AssistedDiagram({ b }: { b: boolean }) {
  return (
    <svg viewBox="0 0 800 520" className="rosa-svg">
      {/* Title area */}
      <rect x="10" y="10" width="780" height="50" rx="14" fill="#F3E5F5" stroke="#7B1FA2" strokeWidth="2" />
      <text x="30" y="42" fontSize="14" fill="#7B1FA2" fontWeight="bold">
        🏗️ {b ? 'Assisted Installer — Step-by-Step Cluster Setup' : 'OCP Assisted Installer Flow'}
      </text>

      {/* OCM / Assisted UI */}
      <rect x="10" y="70" width="370" height="130" rx="14" fill="#FDE8E8" stroke="#CC0000" strokeWidth="2" />
      <text x="30" y="95" fontSize="12" fill="#CC0000" fontWeight="bold">
        🖥️ {b ? 'console.redhat.com/openshift (starting point)' : 'OCM Assisted Installer UI'}
      </text>

      {/* Step 1 */}
      <rect x="30" y="105" width="155" height="80" rx="8" fill="#fff" stroke="#EF5350" strokeWidth="1.5" />
      <text x="42" y="122" fontSize="9" fill="#C62828" fontWeight="bold">① {b ? 'Create Cluster' : 'Cluster Config'}</text>
      <text x="42" y="136" fontSize="7" fill="#777">{b ? 'Name, version, network' : 'Name, base domain, OCP ver'}</text>
      <text x="42" y="148" fontSize="7" fill="#777">{b ? 'settings, SSH key' : 'Network type, SSH pubkey'}</text>
      <text x="42" y="160" fontSize="7" fill="#777">{b ? '' : 'Platform: bare metal / vsphere'}</text>

      {/* Step 2 */}
      <rect x="200" y="105" width="165" height="80" rx="8" fill="#fff" stroke="#EF5350" strokeWidth="1.5" />
      <text x="212" y="122" fontSize="9" fill="#C62828" fontWeight="bold">② {b ? 'Download Boot File' : 'Generate Discovery ISO'}</text>
      <text x="212" y="136" fontSize="7" fill="#777">{b ? 'Get a special file that' : 'Generates ISO with discovery'}</text>
      <text x="212" y="148" fontSize="7" fill="#777">{b ? 'helps find your servers' : 'agent embedded. Download'}</text>
      <text x="212" y="160" fontSize="7" fill="#777">{b ? '' : 'or mount via BMC/IPMI.'}</text>

      {/* Arrow from OCM to datacenter */}
      <line x1="190" y1="200" x2="190" y2="240" stroke="#7B1FA2" strokeWidth="2" />
      <polygon points="186,236 190,244 194,236" fill="#7B1FA2" />
      <text x="200" y="230" fontSize="8" fill="#7B1FA2" fontWeight="bold">{b ? 'Boot servers with file' : 'Boot hosts from ISO'}</text>

      {/* Your Datacenter */}
      <rect x="10" y="250" width="510" height="260" rx="14" fill="#E3F2FD" stroke="#1565C0" strokeWidth="2" />
      <text x="30" y="275" fontSize="14" fill="#1565C0" fontWeight="bold">
        🏢 {b ? 'Your Datacenter / Server Room' : 'Customer Datacenter (Bare Metal / VMs)'}
      </text>

      {/* Discovery phase */}
      <rect x="30" y="285" width="230" height="65" rx="8" fill="#fff" stroke="#42A5F5" strokeWidth="1.5" />
      <text x="45" y="302" fontSize="9" fill="#1565C0" fontWeight="bold">③ {b ? 'Servers Check In' : 'Host Discovery'}</text>
      <text x="45" y="316" fontSize="7" fill="#777">{b ? 'Each server boots and reports:' : 'Discovery agent reports:'}</text>
      <text x="45" y="328" fontSize="7" fill="#777">{b ? '"I have X CPUs, Y RAM, Z disks"' : 'CPU, RAM, disks, NICs, connectivity'}</text>
      <text x="45" y="340" fontSize="7" fill="#777">{b ? 'back to console.redhat.com' : '→ API validates requirements'}</text>

      {/* Validation arrow */}
      <line x1="260" y1="317" x2="290" y2="317" stroke="#1565C0" strokeWidth="2" />
      <polygon points="286,313 294,317 286,321" fill="#1565C0" />

      {/* Validation */}
      <rect x="295" y="285" width="210" height="65" rx="8" fill="#fff" stroke="#42A5F5" strokeWidth="1.5" />
      <text x="310" y="302" fontSize="9" fill="#1565C0" fontWeight="bold">④ {b ? 'Validation ✓' : 'Pre-flight Checks'}</text>
      <text x="310" y="316" fontSize="7" fill="#777">{b ? 'System checks everything:' : 'Validates: min resources, DNS,'}</text>
      <text x="310" y="328" fontSize="7" fill="#777">{b ? 'enough servers? network ok?' : 'NTP, connectivity, disk space,'}</text>
      <text x="310" y="340" fontSize="7" fill="#777">{b ? 'enough disk space?' : 'container runtime compatibility'}</text>

      {/* Install arrow */}
      <line x1="190" y1="350" x2="190" y2="370" stroke="#1565C0" strokeWidth="2" />
      <polygon points="186,366 190,374 194,366" fill="#1565C0" />

      {/* Installed cluster */}
      <rect x="30" y="375" width="475" height="120" rx="10" fill="rgba(255,255,255,0.7)" stroke="#1565C0" strokeWidth="1" strokeDasharray="5 3" />
      <text x="50" y="395" fontSize="11" fill="#1565C0" fontWeight="bold">⑤ {b ? 'Your OpenShift Cluster (installed!)' : 'OCP Cluster (Installed)'}</text>

      {/* Control plane nodes */}
      <rect x="50" y="405" width="200" height="75" rx="8" fill="#FFCDD2" stroke="#EF5350" strokeWidth="1.5" />
      <text x="65" y="422" fontSize="9" fill="#B71C1C" fontWeight="bold">🧠 {b ? 'Control Plane Servers' : 'Control Plane (3 nodes)'}</text>
      {['Server 1', 'Server 2', 'Server 3'].map((s, i) => (
        <g key={i}>
          <rect x={60 + i * 62} y={430} width={55} height={20} rx="3" fill="#fff" stroke="#EF9A9A" strokeWidth="1" />
          <text x={68 + i * 62} y={444} fontSize="6" fill="#C62828">{b ? s : `master-${i}`}</text>
        </g>
      ))}
      <text x="65" y="468" fontSize="7" fill="#B71C1C">{b ? 'These run the cluster brain' : 'API, etcd, scheduler, controllers'}</text>

      {/* Worker nodes */}
      <rect x="270" y="405" width="220" height="75" rx="8" fill="#EDE7F6" stroke="#CE93D8" strokeWidth="1.5" />
      <text x="285" y="422" fontSize="9" fill="#6A1B9A" fontWeight="bold">🏗️ {b ? 'Worker Servers' : 'Worker Nodes (2+)'}</text>
      {['Worker 1', 'Worker 2', 'Worker 3'].map((w, i) => (
        <g key={i}>
          <rect x={280 + i * 65} y={430} width={58} height={20} rx="3" fill="#fff" stroke="#CE93D8" strokeWidth="1" />
          <text x={288 + i * 65} y={444} fontSize="6" fill="#6A1B9A">{b ? w : `worker-${i}`}</text>
        </g>
      ))}
      <text x="285" y="468" fontSize="7" fill="#6A1B9A">{b ? 'These run your apps' : 'Runs workloads, pods, services'}</text>

      {/* Right side: what you manage */}
      <rect x="540" y="70" width="250" height="440" rx="14" fill="#FFF8E1" stroke="#FFA000" strokeWidth="2" />
      <text x="560" y="95" fontSize="12" fill="#E65100" fontWeight="bold">
        🔧 {b ? 'You Manage' : 'Customer Responsibilities'}
      </text>

      {(b ? [
        '🖥️ Hardware (buy/rack servers)',
        '🔌 Networking (cables, switches)',
        '💾 Storage (disks, SAN/NAS)',
        '⬆️ Upgrades (you schedule them)',
        '📊 Monitoring (set up alerts)',
        '🔒 Security (firewalls, patches)',
        '💡 Power & cooling',
        '🌐 DNS records',
        '📜 TLS certificates',
        '🛡️ Backups',
        '🔄 Disaster recovery',
      ] : [
        '🖥️ Hardware lifecycle',
        '🔌 Network infrastructure',
        '💾 Storage provisioning',
        '⬆️ OCP upgrades (oc adm upgrade)',
        '📊 Monitoring stack (Prometheus)',
        '🔒 Security patches, CVE response',
        '💡 Datacenter facilities',
        '🌐 DNS (base domain, API, *.apps)',
        '📜 TLS / PKI management',
        '🛡️ etcd backup strategy',
        '🔄 DR / HA planning',
      ]).map((item, i) => (
        <g key={i}>
          <rect x={555} y={105 + i * 34} width={220} height={28} rx={6} fill="#fff" stroke="#FFE0B2" strokeWidth="1" />
          <text x={567} y={123 + i * 34} fontSize="8" fill="#BF360C">{item}</text>
        </g>
      ))}
    </svg>
  );
}

export function AssistedInstallerMap({ mode, onModeChange }: AssistedInstallerMapProps) {
  const b = mode === 'beginner';

  return (
    <div className="rosa-map">
      <div className="rosa-controls">
        <div />
        <ModeToggle mode={mode} onModeChange={onModeChange} />
      </div>

      <h2 className="dd-page-title">🏗️ OCP Assisted Installer — <em>OpenShift Container Platform on Your Hardware</em></h2>

      <AssistedDiagram b={b} />

      <div className="rosa-variant-note" style={{ borderLeft: '4px solid #7B1FA2' }}>
        <p><strong>🏗️ {b ? 'When should you use the Assisted Installer?' : 'Assisted Installer Use Cases'}</strong></p>
        <p>{b
          ? 'Use this when you have your own servers (bare metal or VMs in a datacenter) and want to install OpenShift yourself. The Assisted Installer in OCM walks you through the process step by step, validates your hardware, and handles the complex bootstrapping. You\'re responsible for maintaining the cluster after installation.'
          : 'Ideal for on-premise deployments where managed services aren\'t an option. Supports bare metal, vSphere, and platform-agnostic installations. Connected (internet-facing) or restricted/air-gapped networks. Day-2 operations (upgrades, monitoring, backup) are customer responsibility. Red Hat provides support entitlement.'}
        </p>
      </div>

      <div className="rosa-variant-note">
        <p>{b
          ? '📌 The big difference from ROSA/OSD: YOU manage everything after installation. No Red Hat SRE team. You handle upgrades, monitoring, and incidents. The Assisted Installer just helps you get started — after that, it\'s your cluster.'
          : '📌 Key distinction: No SRE management post-install. Customer assumes full operational responsibility. Red Hat support available via case system but no proactive monitoring. Upgrade initiated by customer via `oc adm upgrade` or OCP console.'}
        </p>
      </div>

      <div className="rosa-bridge">
        <h4>{b ? '🏢 Deployment Options' : '🏢 Supported Platforms'}</h4>
        <div className="rosa-bridge-content">
          <div className="rosa-bridge-side">
            <strong style={{ color: '#1565C0' }}>{b ? 'Bare Metal' : 'Bare Metal (BM)'}</strong>
            <p>{b
              ? 'Physical servers you own. Best performance. Requires IPMI/BMC for remote management. Minimum: 3 control + 2 worker servers.'
              : 'Physical hosts with IPMI/BMC/Redfish. Boot via virtual media or PXE. RHCOS on disk. Minimum 5 hosts (3 CP + 2 W) or 3 for compact.'}
            </p>
          </div>
          <div className="rosa-bridge-arrow">
            <span>or</span>
          </div>
          <div className="rosa-bridge-side">
            <strong style={{ color: '#1565C0' }}>{b ? 'Virtual Machines' : 'vSphere / Platform-Agnostic'}</strong>
            <p>{b
              ? 'VMs on VMware or other hypervisors. Easier to set up than bare metal. Same end result — a working OpenShift cluster.'
              : 'vSphere integration (storage, CCM) or platform=none for any IaaS. Same discovery agent flow. vSphere: CSI driver, cloud-controller-manager integration.'}
            </p>
          </div>
        </div>
      </div>

      <ExploreMore links={DEEP_DIVE_LINKS.assisted} />
    </div>
  );
}
