import { type ReactNode } from 'react';
import { useGlossary } from './GlossaryContext';

/** Abbreviation → one-sentence definition */
export const GLOSSARY: Record<string, string> = {
  OCM: 'OpenShift Cluster Manager — Red Hat\'s web dashboard for creating and managing all your OpenShift clusters.',
  OCP: 'OpenShift Container Platform — Red Hat\'s enterprise Kubernetes distribution with built-in security and a web console.',
  ROSA: 'Red Hat OpenShift Service on AWS — a managed OpenShift cluster that runs on Amazon Web Services.',
  OSD: 'OpenShift Dedicated — a managed OpenShift cluster with a dedicated SRE team, available on AWS or GCP.',
  HCP: 'Hosted Control Plane — the cluster\'s "brain" runs in Red Hat\'s account instead of yours, reducing cost and setup time.',
  CLI: 'Command Line Interface — a text-based tool you run in a terminal to interact with a system.',
  SRE: 'Site Reliability Engineering — a specialized team that monitors, patches, and keeps your cluster running 24/7.',
  AWS: 'Amazon Web Services — Amazon\'s cloud computing platform.',
  GCP: 'Google Cloud Platform — Google\'s cloud computing platform.',
  Azure: 'Microsoft Azure — Microsoft\'s cloud computing platform.',
  STS: 'Security Token Service — short-lived AWS credentials using IAM roles instead of permanent access keys.',
  IAM: 'Identity and Access Management — AWS\'s system for controlling who can access which cloud resources.',
  RBAC: 'Role-Based Access Control — Kubernetes permission system that controls who can do what inside a cluster.',
  IDP: 'Identity Provider — an external login service (like GitHub, Google, or LDAP) used to authenticate users.',
  CVO: 'Cluster Version Operator — the component that manages OpenShift version upgrades.',
  OLM: 'Operator Lifecycle Manager — manages the install and upgrade of optional cluster add-ons (Operators).',
  API: 'Application Programming Interface — a structured way for software to communicate with a service.',
  VPC: 'Virtual Private Cloud — an isolated network within a cloud provider where your resources run.',
  SCC: 'Security Context Constraint — OpenShift rules that control what containers are allowed to do on a node.',
  MCO: 'Machine Config Operator — manages the operating system and configuration of cluster nodes.',
  RHCOS: 'Red Hat CoreOS — the minimal, immutable operating system that runs on every OpenShift node.',
  K8s: 'Kubernetes — abbreviated as K-8 letters-s (K8s). The open-source container orchestration system that OpenShift is built on.',
  TLS: 'Transport Layer Security — encryption protocol that secures network traffic (the "S" in HTTPS).',
  OIDC: 'OpenID Connect — a login protocol built on OAuth2 that lets users sign in with an external identity provider.',
  LDAP: 'Lightweight Directory Access Protocol — a protocol for looking up users and groups in a corporate directory (like Active Directory).',
  CSV: 'ClusterServiceVersion — an OLM resource that describes how to install and upgrade an Operator.',
  PSA: 'Pod Security Admission — Kubernetes built-in policy enforcement for pod security standards.',
  HAProxy: 'High Availability Proxy — the load balancer that powers OpenShift Routes, directing traffic to pods.',
  OAuth: 'Open Authorization — a protocol that lets users log in using external identity providers without sharing passwords.',
  ImageStreams: 'An OpenShift resource that tracks container image versions and can trigger redeployments when a new image is pushed.',
  operators: 'Software that automates the management of a complex application or service inside a Kubernetes cluster.',
  etcd: 'A distributed key-value database that stores all Kubernetes cluster state — every pod, service, and config.',
  HA: 'High Availability — running multiple copies so the system stays up even if one fails.',
  KV: 'Key-Value — a simple data storage pattern where each item is stored as a name (key) and its data (value).',
  GC: 'Garbage Collection — automatic cleanup of resources that are no longer needed.',
  L7: 'Layer 7 — the application layer of networking (HTTP/HTTPS), where routing decisions use URLs and headers.',
  kubelet: 'The agent running on every node that receives instructions from the control plane and manages containers.',
  'CRI-O': 'Container Runtime Interface — the lightweight container engine that OpenShift uses to run containers on each node.',
  RESTful: 'A web API style where you interact with resources using standard HTTP methods (GET, POST, PUT, DELETE).',
  'Raft-consensus': 'Raft is a consensus algorithm that lets multiple servers agree on data even if some fail — used by etcd to stay consistent.',
  'kube-apiserver': 'The Kubernetes API Server — the front door to the cluster that processes every command, request, and configuration change.',
  'kube-scheduler': 'The Kubernetes component that decides which worker node should run each new pod based on available resources and rules.',
  'controller-manager': 'A control plane process that runs dozens of reconciliation loops, constantly fixing differences between desired and actual cluster state.',
  taints: 'Labels on a node that repel pods unless the pod explicitly "tolerates" them — used to reserve nodes for specific workloads.',
  Deployment: 'A Kubernetes resource that manages rolling out and scaling your application — it creates and updates ReplicaSets for you.',
  ReplicaSet: 'A Kubernetes resource that ensures a specified number of identical pod copies are running at all times.',
  Job: 'A Kubernetes resource that runs a task to completion (like a database migration or batch process) and then stops.',
  'Control Plane': 'The set of components (API server, etcd, scheduler, controllers) that manage the cluster — the "brain" that never runs your apps.',
  'Machine Pool': 'A group of identical worker nodes managed together — scale the pool up or down to add or remove worker nodes without touching them individually.',
  'Worker Node': 'A machine dedicated to running your application workloads, as opposed to control plane or infrastructure nodes.',
  Ingress: 'The entry point for external traffic into a cluster, routing HTTP/HTTPS requests to the correct service.',
  Services: 'A Kubernetes resource that gives a stable network address to a group of pods, load-balancing traffic between them.',
  'kube-proxy': 'The network agent on every node that maintains rules so traffic to a Service reaches the right pods.',
  'Node Pool': 'The ROSA HCP equivalent of a Machine Pool — a group of worker nodes managed by the hosted control plane.',
  OCI: 'Open Container Initiative — the standard specification for container image formats and runtimes.',
  iptables: 'A Linux firewall tool that Kubernetes uses to route network traffic from Services to the correct pods.',
  IPVS: 'IP Virtual Server — a high-performance Linux load balancer, an alternative to iptables for Service routing.',
  MachineSet: 'A Kubernetes resource that ensures a specified number of identical machines (nodes) exist in the cluster.',
  MachineAutoscaler: 'A resource that automatically adjusts the number of machines in a MachineSet based on workload demand.',
  ASG: 'Auto Scaling Group — an AWS feature that automatically adds or removes EC2 instances based on demand.',
  AZ: 'Availability Zone — an isolated data center within an AWS region, used to spread workloads for resilience.',
  ClusterIP: 'A virtual IP address assigned to a Kubernetes Service, reachable only from inside the cluster.',
  HPA: 'Horizontal Pod Autoscaler — automatically scales the number of pod replicas based on CPU, memory, or custom metrics.',
  mTLS: 'Mutual TLS (Transport Layer Security) — both sides of a connection verify each other\'s identity, encrypting all traffic between services.',
  EndpointSlices: 'Kubernetes resources that track which pod IPs belong to a Service, updated automatically as pods come and go.',
  DNAT: 'Destination NAT (Network Address Translation) — a networking technique where kube-proxy rewrites the destination IP of packets to route them to the correct pod.',
  IPC: 'Inter-Process Communication — a mechanism that lets containers in the same pod share memory and signals directly.',
  VIP: 'Virtual IP — a single IP address that represents a group of pods behind a Service.',
  Prometheus: 'An open-source monitoring system that collects metrics from your applications and cluster components.',
  Service: 'A Kubernetes resource that gives a stable network address to a group of pods, load-balancing traffic between them.',
  Container: 'A lightweight, isolated package containing your application code and everything it needs to run — like a sealed box with the app inside.',
  namespace: 'A Linux isolation mechanism that gives a container its own view of processes, network, and filesystem — separate from the host.',
  cgroups: 'Control Groups — a Linux feature that limits how much CPU, memory, and I/O a container can use.',
  overlayfs: 'Overlay Filesystem — a layered filesystem where read-only base layers are stacked, with a writable layer on top for changes.',
  PID: 'Process ID — the unique number assigned to a running process. PID 1 is the main process inside a container.',
  UTS: 'Unix Timesharing System namespace — gives a container its own hostname, separate from the host machine.',
  CRI: 'Container Runtime Interface — the standard API that Kubernetes uses to communicate with container runtimes like CRI-O.',
  gRPC: 'A high-performance protocol for services to communicate, used by Kubernetes to talk to the container runtime.',
  selector: 'A label-matching rule that tells a Service (or other resource) which pods to target.',
  Alertmanager: 'Handles alerts from Prometheus — deduplicates, groups, and routes them to notification channels like email or Slack.',
  Thanos: 'An extension for Prometheus that adds long-term storage and a unified view across multiple clusters.',
  Loki: 'A log aggregation system from Grafana Labs, designed to work like Prometheus but for log data.',
  EFK: 'Elasticsearch, Fluentd, Kibana — a logging pipeline that collects, stores, and visualizes cluster logs.',
  Tekton: 'A Kubernetes-native CI/CD framework for building and deploying applications using pipelines.',
  OperatorHub: 'A built-in catalog in OpenShift where you can discover and install Operators (add-ons) like databases, monitoring tools, and more.',
  kubectl: 'The standard Kubernetes command-line tool for managing clusters — OpenShift\'s "oc" CLI extends it with extra features.',
  Classic: 'ROSA Classic deploys the control plane inside the customer\'s AWS account, unlike HCP where Red Hat hosts it separately.',
  HTTP: 'HyperText Transfer Protocol — the standard way browsers and apps communicate over the web.',
  Kubernetes: 'An open-source system for automating deployment, scaling, and management of containerized applications — the foundation OpenShift is built on.',
  PrivateLink: 'An AWS networking feature that creates a private, secure connection between two AWS accounts without going over the public internet.',
  HyperShift: 'The technology behind ROSA HCP — it runs the cluster control plane as pods in a separate management cluster instead of dedicated machines.',
  IRSA: 'IAM Roles for Service Accounts — lets Kubernetes pods assume AWS IAM roles using temporary credentials, without storing access keys.',
  NLB: 'Network Load Balancer — an AWS load balancer that operates at the TCP level for high-performance traffic routing.',
  ALB: 'Application Load Balancer — an AWS load balancer that operates at the HTTP level, with URL-based routing.',
  EBS: 'Elastic Block Store — AWS\'s persistent disk storage, used for etcd data and persistent volume claims in OpenShift.',
  CCS: 'Customer Cloud Subscription — a model where the cluster runs in the customer\'s own cloud account, with the customer paying the cloud provider directly.',
  MIG: 'Managed Instance Group — GCP\'s equivalent of AWS Auto Scaling Groups, managing groups of identical VM instances.',
  ISO: 'A disk image file format used to distribute bootable software — the Assisted Installer generates one to discover your hardware.',
  BMC: 'Baseboard Management Controller — a small computer on the server motherboard that allows remote power-on, reboot, and console access.',
  IPMI: 'Intelligent Platform Management Interface — a protocol for remotely managing servers via the BMC (power on/off, console access).',
  PXE: 'Preboot Execution Environment — a protocol that lets servers boot an operating system image from the network instead of a local disk.',
  CVE: 'Common Vulnerabilities and Exposures — a publicly cataloged security flaw that needs patching.',
  CSI: 'Container Storage Interface — the standard API for connecting external storage systems (like cloud disks) to Kubernetes.',
  DR: 'Disaster Recovery — a plan and process for restoring a system after a major failure or data loss.',
  PKI: 'Public Key Infrastructure — the system of certificates and keys used to encrypt network traffic and verify identities.',
  CCM: 'Cloud Controller Manager — the Kubernetes component that integrates with a cloud provider\'s API for load balancers, routes, and storage.',
  NTP: 'Network Time Protocol — a protocol that keeps all servers\' clocks in sync, critical for certificate validation and etcd consistency.',
  SSO: 'Single Sign-On — lets you log in once and access multiple services without logging in again.',
  AMS: 'Account Management Service — Red Hat\'s internal service that manages org subscriptions, roles, and access assignments.',
  SigV4: 'AWS Signature Version 4 — the signing method AWS uses to authenticate API requests without sending credentials in plaintext.',
  Cedar: 'An open-source policy language from AWS used in HyperFleet to write fine-grained permit/forbid access rules for ROSA resources.',
  EKS: 'Elastic Kubernetes Service — AWS\'s managed Kubernetes service, used by HyperFleet as the regional Management Cluster platform.',
  DynamoDB: 'A fully managed NoSQL database from AWS, used by the regional Platform API to store cluster metadata within the region.',
  CRD: 'Custom Resource Definition — a Kubernetes extension that lets you define new resource types beyond the built-in ones.',
  RHOBS: 'Red Hat Observability Service — Red Hat\'s internal platform for collecting metrics and alerts across managed services.',
  FIPS: 'Federal Information Processing Standards — US government cryptography standards required by some regulated industries.',
  'clusters_mgmt': 'The V1 OCM API (api.openshift.com) that manages cluster lifecycle today — the predecessor to the regional Platform API.',
  BFF: 'Backend For Frontend — a server-side proxy that translates browser-friendly requests into the format required by a backend API.',
  Route53: 'Amazon Route 53 — AWS\'s DNS service, used by OpenShift to resolve the cluster API endpoint and application ingress domains.',
  S3: 'Amazon Simple Storage Service — AWS object storage used by OpenShift for the internal container image registry.',
  ELB: 'Elastic Load Balancer — AWS\'s classic load balancer for distributing inbound cluster traffic across nodes.',
  GCS: 'Google Cloud Storage — GCP\'s object storage service, used by OpenShift for the internal container image registry on GCP.',
  'Persistent Disks': 'Google Cloud Persistent Disks — GCP\'s block storage, used for persistent volume claims and etcd in OpenShift on GCP.',
  'Cloud DNS': 'Google Cloud DNS — GCP\'s managed DNS service, used to resolve the cluster API and application ingress domains.',
  'Cloud Load Balancing': 'Google Cloud Load Balancing — GCP\'s load balancer service, equivalent to AWS NLB/ALB, used for cluster ingress traffic.',
};

/** Inline glossary term — shows definition in the footer bar on hover */
function GlossaryTerm({ abbr }: { abbr: string }) {
  const { show, hide } = useGlossary();
  return (
    <span
      className="glossary-term"
      onMouseEnter={() => show(abbr, GLOSSARY[abbr])}
      onMouseLeave={hide}
    >
      {abbr}
    </span>
  );
}

/** Escape regex special chars */
function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Build a regex that matches the term — uses word boundaries for simple words, plain match for hyphenated */
function termRegex(term: string): RegExp {
  const escaped = escapeRegex(term);
  if (/^[\w]+$/.test(term)) {
    return new RegExp(`\\b(${escaped})\\b`);
  }
  return new RegExp(`(${escaped})`);
}

/**
 * Process a text string and wrap every occurrence of glossary terms
 * with a GlossaryTerm component. `exclude` terms are skipped.
 */
export function glossarize(text: string, exclude: Set<string>): ReactNode {
  // Find all glossary terms present in this text
  const abbrs = Object.keys(GLOSSARY).filter(
    (a) => !exclude.has(a) && termRegex(a).test(text)
  );

  if (abbrs.length === 0) return text;

  // Sort by length descending so longer terms match first (e.g. "kube-apiserver" before "API")
  const sorted = [...abbrs].sort((a, b) => b.length - a.length);

  // Build a combined regex that matches any glossary term
  const combined = new RegExp(`(${sorted.map(escapeRegex).join('|')})`, 'g');

  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  while ((match = combined.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(<GlossaryTerm key={key++} abbr={match[1]} />);
    lastIndex = match.index + match[1].length;
  }

  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts.length > 0 ? <>{parts}</> : text;
}

/**
 * Returns a glossarize function. Pass `exclude` to skip specific terms.
 */
export function createGlossarizer(exclude?: string[]) {
  const ex = new Set<string>(exclude ?? []);
  return (text: string) => glossarize(text, ex);
}
