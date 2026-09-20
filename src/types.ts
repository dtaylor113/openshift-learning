export type ExplainMode = 'beginner' | 'expert';

export interface SceneProps {
  mode: ExplainMode;
  onDeepDive?: () => void;
  onNavigate?: (levelIndex: number) => void;
}

export interface ZoomLevel {
  id: string;
  label: string;
  mapLabel: string;
  beginner: {
    description: string;
    details: string[];
  };
  expert: {
    description: string;
    details: string[];
  };
  color: string;
  bgColor: string;
}

export const ZOOM_LEVELS: ZoomLevel[] = [
  {
    id: 'app',
    label: 'The App',
    mapLabel: 'App',
    beginner: {
      description:
        'This is what your users see — a website in a browser. They type in a web address and your app appears. But where is this app actually running?',
      details: [
        'The user\'s browser sends a request over the internet to wherever your app is hosted',
        'Your app processes that request and sends back a web page',
        'Right now it feels simple — but there\'s a whole stack of infrastructure behind this',
        'Let\'s zoom out to see what\'s actually running your app…',
      ],
    },
    expert: {
      description:
        'An HTTP request is resolved via DNS, routed through the internet, and handled by the application process. The response is rendered client-side.',
      details: [
        'DNS resolution chain: recursive resolver → authoritative NS → A/AAAA record (possibly through CDN)',
        'TLS 1.3 handshake establishes the encrypted channel',
        'HTTP/2 or HTTP/3 (QUIC) multiplexed request to the origin server',
        'The server process handles routing, middleware, and response generation',
      ],
    },
    color: '#4FC3F7',
    bgColor: '#E1F5FE',
  },
  {
    id: 'container',
    label: 'The Container',
    mapLabel: 'Container',
    beginner: {
      description:
        'Your app runs inside a container — a sealed package with everything it needs. The graphic shows the app process plus its libraries, all isolated from the rest of the machine.',
      details: [
        'A container is like a lunchbox: your app + all its ingredients, sealed together',
        'It\'s isolated — your app can\'t accidentally affect other apps on the same machine',
        'The version tag means you can recreate this exact setup anywhere, anytime',
        'If something breaks, throw the container away and start a fresh one — it\'s disposable',
      ],
    },
    expert: {
      description:
        'The application runs as PID 1 inside an OCI container — an isolated user-space instance sharing the host kernel, with its own filesystem layers, network namespace, and cgroup resource limits.',
      details: [
        'OCI image spec: ordered layers (base OS → deps → app code) with manifest and config',
        'Linux namespaces (PID, net, mnt, UTS, IPC) isolate the process tree from the host',
        'cgroups v2 enforce CPU/memory/IO limits — prevents noisy-neighbor problems',
        'overlayfs: read-only base layers + writable upper layer (copy-on-write)',
        'Container runtime (CRI-O) manages lifecycle via the CRI gRPC interface',
      ],
    },
    color: '#81C784',
    bgColor: '#E8F5E9',
  },
  {
    id: 'pod',
    label: 'The Pod',
    mapLabel: 'Pod',
    beginner: {
      description:
        'Kubernetes wraps your container in a Pod — a team of containers that share networking and storage. The dotted lines show they communicate directly. A Deployment manages copies of this pod, and a Service routes traffic to them.',
      details: [
        'Your app container does the real work; the helper (sidecar) adds security and logging automatically',
        'Both containers share the same network — connected by the dotted lines in the graphic',
        'The Deployment keeps 3 copies running for safety — if one crashes, the other 2 keep serving users',
        'The Service gives all copies one address — users don\'t know (or care) which copy handles their request',
        '⚠️ Replicas ≠ more machines. 3 replicas might run on the same machine. Machines are managed separately (see Node level).',
      ],
    },
    expert: {
      description:
        'A Pod is the atomic scheduling unit — co-located containers sharing a network namespace (single IP), IPC namespace, and volumes. A Deployment manages ReplicaSets of this pod spec; a Service provides a stable VIP.',
      details: [
        'Shared network namespace: all containers bind to the same pod IP; inter-container via localhost',
        'Envoy sidecar: mTLS termination, L7 traffic shaping, Prometheus metrics scraping',
        'Deployment → ReplicaSet → N Pods; RollingUpdate controls maxSurge/maxUnavailable',
        'Service selector matches pod labels; ClusterIP is rewritten by kube-proxy (iptables/IPVS DNAT)',
        'Liveness/readiness probes control restart and traffic routing independently',
      ],
    },
    color: '#FFB74D',
    bgColor: '#FFF3E0',
  },
  {
    id: 'node',
    label: 'The Node',
    mapLabel: 'Node',
    beginner: {
      description:
        'Pods need a real computer to run on — that\'s a Node. This graphic shows a worker node with its system services and the pods scheduled onto it. Machine Pools let you manage groups of identical nodes.',
      details: [
        'This is a worker node — it runs your apps. Control plane nodes are the "manager\'s office": they decide what gets cooked where, but never cook anything themselves',
        'Worker nodes = muscle (runs your stuff). Control plane nodes = brain (decisions). They\'re different machines!',
        'The pod manager receives orders from the control plane and starts/stops pods on this machine',
        'The container engine is the software that actually runs containers',
        'The network manager sets up routing so traffic reaches the right pod',
        'Machine Pools let you add/remove worker nodes as a group. Infra nodes handle cluster services (not your apps)',
        'Your myapp pods are highlighted, but they share this machine with monitoring, logging, and other system pods',
      ],
    },
    expert: {
      description:
        'A worker node runs kubelet + CRI-O + kube-proxy. In ROSA, nodes are grouped into Machine Pools (classic) or Node Pools (HCP). Each pool maps to an AWS Auto Scaling Group with a specific instance type.',
      details: [
        'kubelet: watches API server for PodSpecs, manages mounts, probes, and reports node/pod status',
        'CRI-O: OCI-compliant runtime; pulls images, creates containers via conmon process monitor',
        'kube-proxy: programs iptables/IPVS rules for Service ClusterIP → pod IP rewriting',
        'Machine Pool (ROSA Classic): MachineSet + MachineAutoscaler → AWS ASG with instance type/AZ config',
        'Node Pool (ROSA HCP): similar concept but managed by the hosted control plane, not in-cluster',
      ],
    },
    color: '#BA68C8',
    bgColor: '#F3E5F5',
  },
  {
    id: 'cluster',
    label: 'Kubernetes Cluster',
    mapLabel: 'K8s Cluster',
    beginner: {
      description:
        'All nodes together form a Cluster. The control plane nodes are the "brain" — they decide where pods go and keep everything running. Worker nodes do the actual work of running your apps.',
      details: [
        'Control plane nodes run the brain services — they don\'t run your app pods',
        'Worker nodes are where your app actually runs — managed in Machine Pools',
        'The API Server is the front door — every command goes through it',
        'The Scheduler picks which worker node has room for each new pod',
        'The Ingress gateway is how internet traffic enters the cluster and reaches your app',
      ],
    },
    expert: {
      description:
        'A cluster consists of control plane nodes (API server, etcd, scheduler, controller-manager) and worker nodes. All state is persisted to etcd; all mutations flow through the API server\'s admission pipeline.',
      details: [
        'kube-apiserver: RESTful API + admission webhooks + RBAC authorization',
        'etcd: Raft-consensus distributed KV store; 3 members for HA quorum; all cluster state lives here',
        'kube-scheduler: filtering + scoring plugins rank nodes (affinity, taints, topology spread)',
        'controller-manager: ~30 reconciliation loops (Deployment, ReplicaSet, Job, Node lifecycle, GC)',
        'Ingress Controller / OpenShift Router: L7 reverse proxy mapping host/path rules → Services',
      ],
    },
    color: '#4DB6AC',
    bgColor: '#E0F2F1',
  },
  {
    id: 'openshift',
    label: 'OpenShift Cluster',
    mapLabel: 'OCP Cluster',
    beginner: {
      description:
        'An OpenShift Cluster wraps Kubernetes with everything a real team needs. The left side shows the Kubernetes core. Everything else — Routes, security, monitoring, the developer UI — is what OpenShift adds on top.',
      details: [
        'Routes give your app a real URL without complicated networking setup',
        'Built-in login connects to your company\'s identity system — no separate auth setup',
        'OperatorHub is an app store for infrastructure add-ons (databases, queues, etc.)',
        'Monitoring and logging are pre-installed — dashboards and alerts from day one',
        'The Developer Console is a visual UI for seeing your apps, builds, and deployments',
        'Security guardrails are stricter by default — harder to accidentally deploy insecure workloads',
      ],
    },
    expert: {
      description:
        'OpenShift Cluster managed by OpenShift Container Platform (OCP). OCP layers enterprise services on Kubernetes: HAProxy-based Router (Routes), OAuth server, OLM-managed operators, cluster monitoring/logging operators, ImageStreams, SCCs, and MCO-managed RHCOS nodes.',
      details: [
        'Routes (HAProxy): TLS edge/passthrough/re-encrypt; weighted traffic splitting for canary deploys',
        'OAuth server: identity brokering (LDAP, OIDC, HTPasswd, GitHub, Google)',
        'OLM: CSV-based operator install, upgrade channels, dependency resolution',
        'Cluster Monitoring Operator: Prometheus + Alertmanager + Thanos stack',
        'SCCs: Security Context Constraints — more granular than PSA; control capabilities, volumes, host access',
        'MCO: manages RHCOS nodes — kernel args, files, systemd units, OS updates',
      ],
    },
    color: '#EE0000',
    bgColor: '#FDE8E8',
  },
  {
    id: 'ocm',
    label: 'OCM',
    mapLabel: 'OCM',
    beginner: {
      description:
        'OpenShift Cluster Manager (OCM) is your dashboard at console.redhat.com/openshift. It\'s where you create, monitor, and manage all your OpenShift clusters — no matter what type or where they run.',
      details: [
        'Cluster List: See all your clusters in one place — status, version, cloud provider, region',
        'Create Cluster: Step-by-step wizards for ROSA (AWS) and OSD (AWS/GCP) clusters',
        'Cluster Details: Manage machine pools, networking, access control, upgrades, and add-ons per cluster',
        'Cluster types: ROSA Classic (control plane in your AWS), ROSA HCP (control plane in Red Hat\'s AWS — simpler & cheaper), OSD (AWS or GCP)',
        'Downloads: Get the oc CLI, rosa CLI, pull secrets, and installer binaries',
        'Assisted Installer: A guided wizard for installing OpenShift on your own bare-metal hardware',
        '"Open console" on any cluster launches that cluster\'s own OpenShift Container Platform (OCP) console',
      ],
    },
    expert: {
      description:
        'OCM (console.redhat.com/openshift) is the SaaS multi-cluster management plane built on the clusters_mgmt and accounts_mgmt APIs. It provides lifecycle management, quota enforcement, and SRE integration for managed offerings.',
      details: [
        'Cluster lifecycle: provision, upgrade (CVO policies), hibernate, archive, delete via clusters_mgmt API',
        'Products: ROSA Classic (in-cluster CP, STS), ROSA HCP (hosted CP, PrivateLink), OSD AWS/GCP (IAM user), OCP Assisted Install, registered clusters',
        'Machine Pools / Node Pools: CRUD + autoscaler config, instance type selection, labels, taints',
        'Access Control: IDP management (LDAP, GitHub, Google, OIDC, HTPasswd), RBAC role grants',
        'Add-ons: OLM-based managed add-ons installed and upgraded by SRE',
        'Service Logs: cluster events and SRE actions via service_logs API',
        'Billing: Subscription management, quota_cost, marketplace entitlements (AWS/GCP/Azure)',
      ],
    },
    color: '#EE0000',
    bgColor: '#FFEBEE',
  },
];
