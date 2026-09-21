import { ExternalLink } from 'lucide-react';

interface Link {
  label: string;
  url: string;
  desc?: string;
}

interface ExploreMoreProps {
  links: Link[];
}

export function ExploreMore({ links }: ExploreMoreProps) {
  return (
    <div className="explore-more">
      <h4><ExternalLink size={16} /> Want to explore more?</h4>
      <ul>
        {links.map((link, i) => (
          <li key={i}>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.label} <ExternalLink size={11} />
            </a>
            {link.desc && <span className="explore-more-desc"> — {link.desc}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---- Curated link sets per page ---- */

export const EXPLORER_LINKS: Record<string, Link[]> = {
  app: [
    { label: 'What is a web application?', url: 'https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web', desc: 'MDN beginner guide' },
  ],
  container: [
    { label: 'What is a container?', url: 'https://www.redhat.com/en/topics/containers/whats-a-linux-container', desc: 'Red Hat overview' },
    { label: 'Docker Getting Started', url: 'https://docs.docker.com/get-started/', desc: 'Official Docker tutorial' },
  ],
  pod: [
    { label: 'Kubernetes Pods', url: 'https://kubernetes.io/docs/concepts/workloads/pods/', desc: 'Official K8s docs' },
    { label: 'Multi-container Pods', url: 'https://kubernetes.io/docs/concepts/workloads/pods/#how-pods-manage-multiple-containers', desc: 'Sidecars, init containers' },
  ],
  node: [
    { label: 'Kubernetes Nodes', url: 'https://kubernetes.io/docs/concepts/architecture/nodes/', desc: 'Official K8s docs' },
    { label: 'OpenShift Machine Management', url: 'https://docs.openshift.com/container-platform/latest/machine_management/index.html', desc: 'MachineSets, MachineAutoscaler' },
  ],
  cluster: [
    { label: 'Kubernetes Components', url: 'https://kubernetes.io/docs/concepts/overview/components/', desc: 'Control plane, worker nodes, etcd' },
    { label: 'Kubernetes Cluster Architecture', url: 'https://kubernetes.io/docs/concepts/architecture/', desc: 'How K8s clusters are structured' },
  ],
  openshift: [
    { label: 'OpenShift vs Kubernetes', url: 'https://www.redhat.com/en/technologies/cloud-computing/openshift/kubernetes-engine', desc: 'What OpenShift adds' },
    { label: 'OpenShift Architecture', url: 'https://docs.openshift.com/container-platform/latest/architecture/architecture.html', desc: 'OCP architecture overview' },
    { label: 'OpenShift Container Platform docs', url: 'https://docs.openshift.com/container-platform/latest/welcome/index.html', desc: 'Official OCP documentation' },
  ],
  ocm: [
    { label: 'Red Hat OpenShift Cluster Manager', url: 'https://www.redhat.com/en/technologies/cloud-computing/openshift/cluster-manager', desc: 'Product overview and capabilities' },
    { label: 'OpenShift Cluster Manager documentation', url: 'https://docs.openshift.com/rosa/ocm/ocm-overview.html', desc: 'Official OCM docs — managing clusters, machine pools, upgrades' },
    { label: 'OCM API Reference', url: 'https://api.openshift.com', desc: 'Interactive Swagger UI for clusters_mgmt and accounts_mgmt APIs' },
  ],
};

export const DEEP_DIVE_LINKS: Record<string, Link[]> = {
  overview: [
    { label: 'Red Hat OpenShift products', url: 'https://www.redhat.com/en/technologies/cloud-computing/openshift', desc: 'Full product lineup' },
    { label: 'OpenShift pricing', url: 'https://www.redhat.com/en/technologies/cloud-computing/openshift/pricing', desc: 'Compare editions' },
  ],
  rosa: [
    { label: 'ROSA documentation', url: 'https://docs.openshift.com/rosa/welcome/index.html', desc: 'Official ROSA docs' },
    { label: 'ROSA on AWS Marketplace', url: 'https://aws.amazon.com/rosa/', desc: 'AWS product page, pricing, and getting started' },
    { label: 'AWS STS (Security Token Service)', url: 'https://docs.aws.amazon.com/STS/latest/APIReference/welcome.html', desc: 'How temporary credentials work' },
  ],
  osd: [
    { label: 'OpenShift Dedicated documentation', url: 'https://docs.openshift.com/dedicated/welcome/index.html', desc: 'Official OSD docs' },
    { label: 'Google Cloud overview', url: 'https://cloud.google.com/docs/overview', desc: 'GCP fundamentals' },
    { label: 'AWS IAM fundamentals', url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html', desc: 'Understanding IAM users, roles, and policies' },
  ],
  assisted: [
    { label: 'Assisted Installer docs', url: 'https://docs.openshift.com/container-platform/latest/installing/installing_on_prem_assisted/installing-on-prem-assisted.html', desc: 'Install OCP on bare metal' },
    { label: 'Assisted Installer UI', url: 'https://console.redhat.com/openshift/assisted-installer/clusters', desc: 'Start an installation' },
  ],
  local: [
    { label: 'Red Hat OpenShift Local (CRC)', url: 'https://developers.redhat.com/products/openshift-local/overview', desc: 'Download and getting started' },
    { label: 'MicroShift documentation', url: 'https://access.redhat.com/documentation/en-us/red_hat_build_of_microshift', desc: 'Edge-optimized OpenShift' },
  ],
  'ocp-console': [
    { label: 'OCP web console overview', url: 'https://docs.openshift.com/container-platform/latest/web_console/web-console-overview.html', desc: 'Official console docs' },
    { label: 'Operators and OperatorHub', url: 'https://docs.openshift.com/container-platform/latest/operators/understanding/olm-understanding-operatorhub.html', desc: 'How Operators extend the cluster' },
    { label: 'Kubernetes Custom Resources', url: 'https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/', desc: 'CRDs explained' },
  ],
};
