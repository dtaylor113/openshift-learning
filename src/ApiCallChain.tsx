import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { ExplainMode } from './types';

type ProductVariant = 'rosa-classic' | 'rosa-hcp' | 'osd-aws' | 'osd-gcp';

interface ApiCallChainProps {
  mode: ExplainMode;
  variant: ProductVariant;
}

interface Step {
  label: string;
  detail: string;
}

function getSteps(variant: ProductVariant, b: boolean): Step[] {
  switch (variant) {
    case 'rosa-hcp':
      return [
        {
          label: b ? '1. You click "Add Node Pool" in OCM' : '1. OCM UI → POST /clusters/{id}/node_pools',
          detail: b
            ? 'You open the cluster details page on console.redhat.com and add a new node pool — choosing machine size and count.'
            : 'OCM UI sends a REST request to the Clusters Service API (clusters_mgmt/v1). No AWS credentials are involved at this layer.',
        },
        {
          label: b ? '2. Clusters Service API creates a NodePool on the control plane' : '2. CS API → NodePool CR on Hosted Control Plane',
          detail: b
            ? 'The Clusters Service API (Red Hat\'s backend) sends a NodePool definition to the hosted control plane running in Red Hat\'s AWS account.'
            : 'Clusters Service API creates/updates a NodePool custom resource on the HyperShift-managed hosted control plane. The CP runs in Red Hat\'s multi-tenant AWS account.',
        },
        {
          label: b ? '3. Control plane borrows temporary credentials for YOUR account' : '3. CAPI Provider → STS AssumeRole (OIDC) → Customer AWS',
          detail: b
            ? 'The hosted control plane uses a pre-configured role to get temporary AWS credentials for your account — like borrowing a keycard that expires in 1 hour. No stored passwords needed.'
            : 'The CAPI (Cluster API) provider on the hosted CP uses AssumeRoleWithWebIdentity via the OIDC provider to get scoped, temporary STS credentials for the customer\'s AWS account.',
        },
        {
          label: b ? '4. AWS creates the actual machines' : '4. AWS EC2 RunInstances → ASG scales up',
          detail: b
            ? 'Using those temporary credentials, the control plane tells AWS to spin up new virtual machines in your cloud account. They become your new worker nodes, connected back to the control plane via a secure private link.'
            : 'EC2 RunInstances called with the assumed role. Instances join the customer VPC. Kubelet bootstraps via ignition config, connects to hosted API server over PrivateLink. ASG updated for the node pool.',
        },
      ];

    case 'rosa-classic':
      return [
        {
          label: b ? '1. You click "Add Machine Pool" in OCM' : '1. OCM UI → POST /clusters/{id}/machine_pools',
          detail: b
            ? 'You open the cluster details page on console.redhat.com and add a new machine pool — choosing machine size, count, and labels.'
            : 'OCM UI sends a REST request to the Clusters Service API (clusters_mgmt/v1).',
        },
        {
          label: b ? '2. CS API creates a MachineSet on the cluster' : '2. CS API → MachinePool CR → MachineSet on cluster',
          detail: b
            ? 'The Clusters Service API translates your request into a MachineSet — an instruction record that lives on the cluster\'s control plane and says "create X machines of this size." The cluster\'s own software watches for these records.'
            : 'Clusters Service API creates a MachinePool custom resource. The ROSA operator on the cluster reconciles it into one or more MachineSet CRDs (one per AZ).',
        },
        {
          label: b ? '3. Cluster requests temporary credentials from AWS' : '3. machine-api-operator → STS AssumeRole → AWS',
          detail: b
            ? 'The cluster\'s machine controller uses a pre-configured role (set up during install) to borrow temporary AWS credentials — like a keycard that expires in 1 hour. No stored passwords needed.'
            : 'The machine-api-operator watches MachineSets. It assumes the Worker IAM role via STS (OIDC-based) to get scoped, temporary credentials for the customer\'s AWS account.',
        },
        {
          label: b ? '4. AWS creates the actual machines' : '4. AWS EC2 RunInstances → ASG scales up',
          detail: b
            ? 'Using those temporary credentials, the controller tells AWS to spin up new virtual machines in your cloud account. They join the cluster as worker nodes and start running your pods.'
            : 'EC2 RunInstances called with assumed role credentials. New instances join the VPC, kubelet bootstraps via ignition, registers with API server. ASG target updated.',
        },
      ];

    case 'osd-aws':
      return [
        {
          label: b ? '1. You click "Add Machine Pool" in OCM' : '1. OCM UI → POST /clusters/{id}/machine_pools',
          detail: b
            ? 'You open the cluster details page on console.redhat.com and add a new machine pool — choosing machine size, count, and labels.'
            : 'OCM UI sends a REST request to the Clusters Service API (clusters_mgmt/v1).',
        },
        {
          label: b ? '2. CS API creates a MachineSet on the cluster' : '2. CS API → MachinePool CR → MachineSet on cluster',
          detail: b
            ? 'The Clusters Service API translates your request into a MachineSet — an instruction record that lives on the cluster\'s control plane and says "create X machines of this size." The cluster\'s own software watches for these records.'
            : 'Clusters Service API creates a MachinePool custom resource. The OSD operator reconciles it into MachineSet CRDs (one per AZ).',
        },
        {
          label: b ? '3. Machine controller uses your stored AWS password' : '3. machine-api-operator → Static IAM keys → AWS',
          detail: b
            ? 'The machine controller on the cluster uses the long-lived AWS access key you provided during setup. Unlike ROSA, this key doesn\'t expire automatically — it stays stored until you manually change it.'
            : 'The machine-api-operator watches MachineSets. It uses static IAM user credentials (Access Key ID + Secret Access Key) stored as a cluster secret. No STS, no automatic expiry.',
        },
        {
          label: b ? '4. AWS creates the actual machines' : '4. AWS EC2 RunInstances → ASG scales up',
          detail: b
            ? 'Using those stored credentials, the controller tells AWS to create new virtual machines in your cloud account. They join the cluster as worker nodes.'
            : 'EC2 RunInstances called with static IAM credentials. New instances join the VPC, kubelet bootstraps, registers with API server. ASG target updated.',
        },
      ];

    case 'osd-gcp':
      return [
        {
          label: b ? '1. You click "Add Machine Pool" in OCM' : '1. OCM UI → POST /clusters/{id}/machine_pools',
          detail: b
            ? 'You open the cluster details page on console.redhat.com and add a new machine pool — choosing machine size, count, and labels.'
            : 'OCM UI sends a REST request to the Clusters Service API (clusters_mgmt/v1).',
        },
        {
          label: b ? '2. CS API creates a MachineSet on the cluster' : '2. CS API → MachinePool CR → MachineSet on cluster',
          detail: b
            ? 'The Clusters Service API translates your request into a MachineSet — an instruction record that lives on the cluster\'s control plane and says "create X machines of this size." The cluster\'s own software watches for these records.'
            : 'Clusters Service API creates a MachinePool custom resource. The OSD operator reconciles it into MachineSet CRDs (one per zone).',
        },
        {
          label: b ? '3. Machine controller uses your GCP service account' : '3. machine-api-operator → GCP Service Account → GCE API',
          detail: b
            ? 'The machine controller on the cluster uses the GCP service account credentials you provided during setup to authenticate with Google Cloud.'
            : 'The machine-api-operator watches MachineSets. It uses GCP service account credentials (JSON key file) stored as a cluster secret to authenticate with the GCE API.',
        },
        {
          label: b ? '4. Google Cloud creates the actual machines' : '4. GCE instances.insert → MIG scales up',
          detail: b
            ? 'Using those credentials, the controller tells Google Cloud to create new VM instances in your project. They join the cluster as worker nodes.'
            : 'GCE instances.insert called via the service account. New instances join the VPC, kubelet bootstraps, registers with API server. Managed Instance Group updated.',
        },
      ];
  }
}

function getNodeLabels(variant: ProductVariant, b: boolean): string[] {
  const isGcp = variant === 'osd-gcp';
  const isHcp = variant === 'rosa-hcp';
  const cloudLabel = isGcp ? (b ? 'GCP' : 'GCE') : (b ? 'AWS' : 'AWS EC2');

  return [
    'OCM UI',
    b ? 'CS API' : 'CS API',
    isHcp
      ? (b ? 'Control Plane' : 'HCP (CAPI)')
      : (b ? 'Controllers' : 'machine-api'),
    cloudLabel,
  ];
}

function getTitle(variant: ProductVariant, b: boolean): string {
  if (b) return '🔗 What happens when you add workers?';
  switch (variant) {
    case 'rosa-hcp': return '🔗 API Call Chain: NodePool Provisioning';
    case 'rosa-classic': return '🔗 API Call Chain: MachinePool Provisioning';
    case 'osd-aws': return '🔗 API Call Chain: MachinePool Provisioning (OSD AWS)';
    case 'osd-gcp': return '🔗 API Call Chain: MachinePool Provisioning (OSD GCP)';
  }
}

const NODE_COLORS = ['#1565C0', '#CC0000', '#7B1FA2', '#FF9900'];

export function ApiCallChain({ mode, variant }: ApiCallChainProps) {
  const b = mode === 'beginner';
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  const steps = getSteps(variant, b);
  const totalSteps = steps.length;
  const nodeLabels = getNodeLabels(variant, b);

  // Reset when variant changes
  useEffect(() => {
    setStep(0);
    setPlaying(false);
  }, [variant]);

  useEffect(() => {
    if (!playing || step >= totalSteps) {
      if (step >= totalSteps) setPlaying(false);
      return;
    }
    const timer = setTimeout(() => setStep((s) => s + 1), 2000);
    return () => clearTimeout(timer);
  }, [playing, step, totalSteps]);

  const play = () => {
    setStep(0);
    setPlaying(true);
  };

  return (
    <div className="api-call-chain">
      <h4>{getTitle(variant, b)}</h4>

      {/* Chain diagram */}
      <svg viewBox="0 0 700 80" className="chain-svg">
        {nodeLabels.map((label, i) => {
          const boxW = 100;
          const spacing = 165;
          const x = 20 + i * spacing;
          const active = i < step;
          const current = i === step - 1;
          return (
            <g key={i}>
              {/* Connecting arrow */}
              {i > 0 && (
                <>
                  <line
                    x1={x - spacing + boxW + 5}
                    y1={40}
                    x2={x - 5}
                    y2={40}
                    stroke={i < step ? NODE_COLORS[i] : '#ccc'}
                    strokeWidth={i < step ? 3 : 1.5}
                    strokeDasharray={i < step ? undefined : '5 3'}
                  />
                  {i < step && (
                    <polygon
                      points={`${x - 9},36 ${x - 1},40 ${x - 9},44`}
                      fill={NODE_COLORS[i]}
                    />
                  )}
                </>
              )}
              {/* Node */}
              <rect
                x={x}
                y={20}
                width={boxW}
                height={40}
                rx={8}
                fill={active ? NODE_COLORS[i] : '#f5f5f5'}
                stroke={active ? NODE_COLORS[i] : '#ccc'}
                strokeWidth={current ? 3 : 1.5}
              />
              <text
                x={x + boxW / 2}
                y={44}
                fontSize="10"
                fill={active ? '#fff' : '#999'}
                textAnchor="middle"
                fontWeight="bold"
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Step detail */}
      <div className="chain-steps">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            className={`chain-step ${i < step ? 'active' : ''} ${i === step - 1 ? 'current' : ''}`}
            initial={false}
            animate={{
              opacity: i < step ? 1 : 0.3,
            }}
          >
            <div className="chain-step-dot" style={{ background: i < step ? NODE_COLORS[i] : '#ccc' }} />
            <div className="chain-step-content">
              <strong>{s.label}</strong>
              {i < step && <p>{s.detail}</p>}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="chain-controls">
        <button onClick={play} className="variant-btn active">
          {step > 0 ? '↻ Replay' : '▶ Play'}
        </button>
        {!playing && step < totalSteps && (
          <button onClick={() => setStep(step + 1)} className="variant-btn active" style={{ marginLeft: 8 }}>
            Next →
          </button>
        )}
      </div>

      <p className="chain-note">
        {b
          ? '💡 This flow is the same whether the cluster uses your cloud account (CCS) or a Red Hat-managed account — the only difference is whose cloud credentials are used in step 3.'
          : '💡 Identical flow for CCS and Red Hat cloud account models. The only variance is the credential owner in step 3 — customer-provided vs RH-owned.'}
      </p>
    </div>
  );
}
