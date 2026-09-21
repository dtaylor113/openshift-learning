import { Home, Boxes, Globe, HardDrive, Puzzle, Users, BarChart3, Settings, Hammer, LayoutDashboard, Network, Search, PlusCircle, Eye, Lightbulb } from 'lucide-react';
import { ModeToggle } from './ModeToggle';
import type { ExplainMode } from './types';

interface OcpConsoleMapProps {
  mode: ExplainMode;
  onModeChange: (mode: ExplainMode) => void;
}

function ConsoleDiagram({ b }: { b: boolean }) {
  const navItems = [
    { Icon: Home, label: 'Home', desc: 'Dashboard, status' },
    { Icon: Boxes, label: b ? 'Workloads' : 'Workloads', desc: b ? 'Pods, Deployments...' : 'Pods, Deps, SS, DS, Jobs' },
    { Icon: Globe, label: 'Networking', desc: b ? 'Services, Routes' : 'Svc, Route, Ingress' },
    { Icon: HardDrive, label: 'Storage', desc: b ? 'Disk volumes' : 'PVC, StorageClass' },
    { Icon: Puzzle, label: 'Operators', desc: b ? 'Add-ons & plugins' : 'OLM, OperatorHub' },
    { Icon: Users, label: b ? 'User Mgmt' : 'RBAC', desc: b ? 'Users & permissions' : 'Roles, Bindings' },
    { Icon: BarChart3, label: 'Monitoring', desc: b ? 'Dashboards & alerts' : 'Prometheus, Alerts' },
    { Icon: Settings, label: b ? 'Cluster Settings' : 'Administration', desc: b ? 'Config, upgrades' : 'CRDs, Events, Nodes' },
    { Icon: Hammer, label: b ? 'Builds' : 'Builds', desc: b ? 'Build & deploy code' : 'BuildConfig, IS' },
  ];

  const workloadCards = [
    {
      name: b ? 'Pods' : 'Pods',
      desc: b ? 'Running containers — the smallest unit' : 'Atomic scheduling unit, container(s)',
      color: '#E65100', bg: '#FFF3E0', borderColor: '#FFB74D',
      extra: b ? 'You saw these in the Explorer!' : 'spec.containers[], status.phase',
    },
    {
      name: b ? 'Deployments' : 'Deployments',
      desc: b ? 'Manages copies of your app' : 'Declarative pod management via ReplicaSet',
      color: '#C62828', bg: '#FFEBEE', borderColor: '#EF5350',
      extra: b ? '"Keep 3 copies running"' : 'rollingUpdate, replicas, selector',
    },
    {
      name: b ? 'Services' : 'Services',
      desc: b ? 'Stable address to reach your pods' : 'ClusterIP / NodePort / LoadBalancer',
      color: '#283593', bg: '#E8EAF6', borderColor: '#7986CB',
      extra: b ? 'One address, many pods' : 'selector → EndpointSlice',
    },
    {
      name: b ? 'Routes' : 'Routes (OpenShift)',
      desc: b ? 'Public URL for your app' : 'HAProxy-based L7 ingress, TLS termination',
      color: '#B71C1C', bg: '#FDE8E8', borderColor: '#EE0000',
      extra: b ? 'OpenShift-only — not in plain K8s' : 'edge / passthrough / re-encrypt',
    },
  ];

  const operatorItems = [
    {
      name: b ? 'MachineSet' : 'MachineSet (machine-api)',
      desc: b ? 'Instructions to create cloud machines' : 'Desired state → cloud provider API',
      note: b ? 'Tells AWS/GCP to provision VMs' : 'OCM → CS API → MachineSet → EC2/GCE',
    },
    {
      name: b ? 'MachinePool' : 'MachinePool CR',
      desc: b ? 'Groups of identical worker machines' : 'Abstraction over MachineSets per AZ',
      note: b ? 'Created by OCM, reconciles to MachineSets' : 'ROSA/OSD operator → MachineSet(s)',
    },
    {
      name: b ? 'ClusterVersion' : 'ClusterVersion (CVO)',
      desc: b ? 'Controls cluster upgrades' : 'Cluster Version Operator manages upgrade state',
      note: b ? 'OCM upgrade policies drive this' : 'desiredUpdate, channel, history[]',
    },
    {
      name: b ? 'Prometheus' : 'Prometheus (CMO)',
      desc: b ? 'Collects metrics from everything' : 'Cluster Monitoring Operator stack',
      note: b ? 'Pre-installed, always running' : 'ServiceMonitor CRDs, recording rules',
    },
  ];

  return (
    <div className="ocp-console-diagram">
      {/* Title bar */}
      <div className="ocp-titlebar">
        <div className="ocp-titlebar-left">
          <LayoutDashboard size={18} color="#4DB6AC" />
          <span className="ocp-titlebar-text">
            {b ? 'OpenShift Console (your cluster\'s dashboard)' : 'OCP Console — console-openshift-console.apps.<cluster>'}
          </span>
        </div>
        <span className="ocp-titlebar-badge">{b ? 'One per cluster' : 'Per-cluster UI'}</span>
      </div>

      {/* Perspective toggle */}
      <div className="ocp-perspective-bar">
        <button className="ocp-persp-btn active">
          <Users size={14} />
          <span>Administrator</span>
        </button>
        <button className="ocp-persp-btn">
          <Eye size={14} />
          <span>Developer</span>
        </button>
        <span className="ocp-persp-hint">{b ? '← two different views of the same cluster' : '← perspective switcher'}</span>
      </div>

      <div className="ocp-body">
        {/* Left nav */}
        <div className="ocp-nav">
          <div className="ocp-nav-title">Navigation</div>
          {navItems.map((item, i) => (
            <div key={i} className={`ocp-nav-item ${i === 1 ? 'active' : ''}`}>
              <item.Icon size={14} color={i === 1 ? '#00695C' : '#555'} />
              <div>
                <div className="ocp-nav-label">{item.label}</div>
                <div className="ocp-nav-desc">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="ocp-main">
          {/* Workloads */}
          <div className="ocp-section">
            <div className="ocp-section-header">
              <Boxes size={18} color="#333" />
              <h3>{b ? 'Workloads — Where your apps live' : 'Workloads'}</h3>
            </div>
            <p className="ocp-section-desc">
              {b ? 'These are the Kubernetes resources that actually run your code:' : 'Core K8s workload resources managed via the console:'}
            </p>
            <div className="ocp-cards">
              {workloadCards.map((r, i) => (
                <div key={i} className="ocp-card" style={{ background: r.bg, borderColor: r.borderColor }}>
                  <div className="ocp-card-name" style={{ color: r.color }}>{r.name}</div>
                  <div className="ocp-card-desc">{r.desc}</div>
                  <div className="ocp-card-extra" style={{ color: r.color }}>{r.extra}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom row */}
          <div className="ocp-bottom-row">
            {/* Operators */}
            <div className="ocp-operators">
              <div className="ocp-section-header">
                <Puzzle size={16} color="#CC0000" />
                <h3 style={{ color: '#CC0000' }}>{b ? 'Operators' : 'Operators (OLM-managed)'}</h3>
              </div>
              <p className="ocp-section-desc">
                {b ? 'Extend the cluster with new resource types:' : 'CRD-based extensions with reconciliation loops:'}
              </p>
              {operatorItems.map((op, i) => (
                <div key={i} className="ocp-op-item">
                  <div className="ocp-op-name">{op.name}</div>
                  <div className="ocp-op-desc">{op.desc}</div>
                  <div className="ocp-op-note">{op.note}</div>
                </div>
              ))}
            </div>

            {/* Right column */}
            <div className="ocp-right-col">
              {/* Developer Perspective */}
              <div className="ocp-dev-persp">
                <div className="ocp-section-header">
                  <Eye size={16} color="#00695C" />
                  <h3 style={{ color: '#00695C' }}>{b ? 'Developer Perspective' : 'Developer Console'}</h3>
                </div>
                <p className="ocp-section-desc">
                  {b ? 'A simpler view focused on YOUR apps:' : 'Namespace-scoped, app-centric view:'}
                </p>
                <div className="ocp-dev-btns">
                  <div className="ocp-dev-btn"><Network size={13} /><span>{b ? 'Topology View' : 'Topology (graph)'}</span></div>
                  <div className="ocp-dev-btn"><PlusCircle size={13} /><span>{b ? 'Add to Project' : '+Add (S2I, Helm)'}</span></div>
                  <div className="ocp-dev-btn"><Search size={13} /><span>{b ? 'Search Resources' : 'Search (all types)'}</span></div>
                  <div className="ocp-dev-btn"><BarChart3 size={13} /><span>{b ? 'Monitoring' : 'Observe (metrics)'}</span></div>
                </div>
                <p className="ocp-dev-footnote">
                  {b ? 'Same resources, friendlier view for developers' : 'Same API objects, different UX affordances'}
                </p>
              </div>

              {/* Built-in vs Custom */}
              <div className="ocp-resources-callout">
                <div className="ocp-section-header">
                  <Lightbulb size={16} color="#E65100" />
                  <h3 style={{ color: '#E65100' }}>{b ? 'Two kinds of resources' : 'Built-in vs Custom Resources'}</h3>
                </div>
                <div className="ocp-res-boxes">
                  <div className="ocp-res-box builtin">
                    <div className="ocp-res-label">{b ? 'Built-in (K8s)' : 'Built-in (kube-apiserver)'}</div>
                    <div className="ocp-res-examples">{b ? 'Pods, Deployments, Services' : 'Pod, Deployment, Service, Node'}</div>
                  </div>
                  <div className="ocp-res-box custom">
                    <div className="ocp-res-label">{b ? 'Custom (Operators)' : 'CRDs (operator-managed)'}</div>
                    <div className="ocp-res-examples">{b ? 'MachineSet, Route, Prometheus' : 'MachineSet, Route, CSV, SCC'}</div>
                  </div>
                </div>
                <p className="ocp-res-explain">
                  {b
                    ? 'Operators watch custom resources and act on them automatically — like a MachineSet telling AWS to create machines!'
                    : 'Reconciliation loop: watch CRDs → compare desired vs actual state → take action (create, update, delete)'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function OcpConsoleMap({ mode, onModeChange }: OcpConsoleMapProps) {
  const b = mode === 'beginner';

  return (
    <div className="rosa-map">
      <div className="rosa-controls">
        <div />
        <ModeToggle mode={mode} onModeChange={onModeChange} />
      </div>

      <h2 className="dd-page-title">OCP Console — <em>OpenShift Container Platform Console</em></h2>

      <div className="rosa-variant-note" style={{ borderLeft: '4px solid #4DB6AC' }}>
        <p><strong>{b ? 'What is the OCP Console?' : 'OCP Console Overview'}</strong></p>
        <p>{b
          ? 'Every OpenShift cluster has its own web console — a dashboard where you can see and manage everything running inside that specific cluster. It\'s different from OCM: OCM manages all your clusters from one place, while the OCP Console lets you manage one cluster in depth.'
          : 'Per-cluster web UI served by the console-operator. Two perspectives (Administrator, Developer) over the same Kubernetes API. Accessible via Routes at console-openshift-console.apps.<cluster_domain>. Launched from OCM via "Open console" button on cluster details.'}
        </p>
      </div>

      <ConsoleDiagram b={b} />

      <div className="rosa-variant-note">
        <p>{b
          ? '📌 The OCP Console is where this presentation\'s "Explorer" levels (Pods, Deployments, Services, Nodes) become real, clickable things you can see and manage. When OCM opens the console, you\'re going from fleet management to single-cluster management.'
          : '📌 OCM (fleet management, clusters_mgmt API) → "Open console" → OCP Console (single-cluster, kubernetes API). The console exposes the same resources shown in the Explorer levels, plus operator-managed CRDs for platform services.'}
        </p>
      </div>

      <div className="rosa-bridge">
        <h4>{b ? 'OCM vs OCP Console — What\'s the difference?' : 'OCM vs OCP Console'}</h4>
        <div className="rosa-bridge-content">
          <div className="rosa-bridge-side">
            <strong style={{ color: '#CC0000' }}>OCM (console.redhat.com)</strong>
            <p>{b
              ? '• See ALL your clusters\n• Create new clusters\n• Manage machine pools\n• Set upgrade policies\n• Manage access & billing'
              : '• Fleet management\n• Cluster lifecycle (CRUD)\n• Machine pool / node pool CRUD\n• Upgrade policy scheduling\n• Subscription & quota management'}
            </p>
          </div>
          <div className="rosa-bridge-arrow">
            <span>{b ? 'Open console' : 'per-cluster link'}</span>
            <div className="rosa-bridge-arrow-line" style={{ background: 'linear-gradient(to right, #CC0000, #4DB6AC)' }} />
          </div>
          <div className="rosa-bridge-side">
            <strong style={{ color: '#00695C' }}>OCP Console (per cluster)</strong>
            <p>{b
              ? '• See pods, deployments, services\n• Deploy new apps\n• View logs and monitoring\n• Manage users & roles\n• Install operators from OperatorHub'
              : '• Workload management (CRUD)\n• Operator lifecycle (OLM)\n• RBAC, namespace management\n• Prometheus dashboards, alerting\n• Developer topology view, S2I builds'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
