import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ExplainMode } from './types';
import { RosaMap } from './RosaMap';
import { OsdMap } from './OsdMap';
import { AssistedInstallerMap } from './AssistedInstallerMap';
import { LocalDevMap } from './LocalDevMap';

type DeepDiveTab = 'overview' | 'rosa' | 'osd' | 'assisted' | 'local';

interface DeepDiveProps {
  mode: ExplainMode;
  onModeChange: (mode: ExplainMode) => void;
}

const TABS: { id: DeepDiveTab; label: string; icon: string; tagline: string }[] = [
  { id: 'overview', label: 'Overview', icon: '🗺️', tagline: 'Compare all cluster types' },
  { id: 'rosa', label: 'ROSA', icon: '🌹', tagline: 'Red Hat on AWS' },
  { id: 'osd', label: 'OSD', icon: '🛡️', tagline: 'OpenShift Dedicated' },
  { id: 'assisted', label: 'Assisted Installer', icon: '🏗️', tagline: 'Your hardware' },
  { id: 'local', label: 'Local Dev', icon: '💻', tagline: 'On your laptop' },
];

function OverviewPage({ b, onNavigate }: { b: boolean; onNavigate: (tab: DeepDiveTab) => void }) {
  return (
    <div className="dd-overview">
      <h2 className="dd-overview-title">
        {b ? 'How do you want to run OpenShift?' : 'OpenShift Deployment Models'}
      </h2>
      <p className="dd-overview-subtitle">
        {b
          ? 'OpenShift comes in different flavors depending on how much you want Red Hat to manage for you, and where you want it to run.'
          : 'Choose a deployment model based on operational responsibility, cloud provider, and infrastructure requirements.'}
      </p>

      <div className="dd-overview-grid">
        {/* Managed Services */}
        <div className="dd-category-header managed">
          <h3>☁️ {b ? 'Red Hat Manages It For You' : 'Managed Services (SRE-operated)'}</h3>
          <p>{b
            ? 'Red Hat runs the cluster — you focus on your apps. Pay a subscription + cloud costs.'
            : 'Red Hat SRE handles installation, upgrades, monitoring, and incident response. Customer owns workloads.'}
          </p>
        </div>

        <button className="dd-card managed" onClick={() => onNavigate('rosa')}>
          <div className="dd-card-badge rosa">ROSA</div>
          <h4>Red Hat OpenShift Service on AWS</h4>
          <p>{b
            ? 'OpenShift on your AWS account, managed by Red Hat. Two variants: Classic (control plane in your account) and HCP (control plane in Red Hat\'s account — cheaper & faster).'
            : 'AWS-native OpenShift with STS-based IAM. Classic (in-cluster CP, MachineSet pools) or HCP (hosted CP via HyperShift, NodePool-based). PrivateLink networking.'}
          </p>
          <div className="dd-card-providers">
            <span className="provider-badge aws">AWS</span>
          </div>
          <span className="dd-card-cta">Explore ROSA architecture →</span>
        </button>

        <button className="dd-card managed" onClick={() => onNavigate('osd')}>
          <div className="dd-card-badge osd">OSD</div>
          <h4>OpenShift Dedicated</h4>
          <p>{b
            ? '"Dedicated" = Red Hat dedicates an SRE team to manage your cluster 24/7. Available on AWS or Google Cloud. You pick the cloud, Red Hat runs the cluster.'
            : 'Fully managed OpenShift with dedicated SRE. Available on AWS (CCS or RH-owned account) and GCP. Supports CCS (Customer Cloud Subscription) model.'}
          </p>
          <div className="dd-card-providers">
            <span className="provider-badge aws">AWS</span>
            <span className="provider-badge gcp">GCP</span>
          </div>
          <span className="dd-card-cta">Explore OSD architecture →</span>
        </button>

        {/* Self-Managed */}
        <div className="dd-category-header self-managed">
          <h3>🔧 {b ? 'You Manage It Yourself' : 'Self-Managed (customer-operated)'}</h3>
          <p>{b
            ? 'You install and run the cluster on your own infrastructure. Full control, full responsibility.'
            : 'Customer handles installation, upgrades, monitoring. Red Hat provides the software and support entitlement.'}
          </p>
        </div>

        <button className="dd-card self-managed" onClick={() => onNavigate('assisted')}>
          <div className="dd-card-badge assisted">Assisted Installer</div>
          <h4>{b ? 'Install on Your Own Servers' : 'OCP via Assisted Installer'}</h4>
          <p>{b
            ? 'Got your own servers in a datacenter? The Assisted Installer walks you through setting up OpenShift on bare-metal or VMs — step by step, with validation.'
            : 'Guided OCP installation on bare-metal or virtualized infrastructure. Boot ISO → discovery agent → validation → install. Supports connected, restricted, and air-gapped deployments.'}
          </p>
          <div className="dd-card-providers">
            <span className="provider-badge bare-metal">Bare Metal</span>
            <span className="provider-badge vm">VMs</span>
          </div>
          <span className="dd-card-cta">See installation flow →</span>
        </button>

        <button className="dd-card self-managed" onClick={() => onNavigate('local')}>
          <div className="dd-card-badge local">Local Dev</div>
          <h4>{b ? 'Run on Your Laptop' : 'CRC / MicroShift'}</h4>
          <p>{b
            ? 'Want to try OpenShift without any cloud? Run a mini cluster right on your laptop for development and learning.'
            : 'CRC (CodeReady Containers): single-node OCP 4 in a VM. MicroShift: minimal K8s+OCP APIs for edge/IoT. Both for dev/test, not production.'}
          </p>
          <div className="dd-card-providers">
            <span className="provider-badge local">macOS</span>
            <span className="provider-badge local">Linux</span>
            <span className="provider-badge local">Windows</span>
          </div>
          <span className="dd-card-cta">See local setup →</span>
        </button>
      </div>

      {/* Comparison table */}
      <div className="dd-comparison">
        <h3>{b ? '📊 Quick Comparison' : '📊 Deployment Model Comparison'}</h3>
        <table className="dd-table">
          <thead>
            <tr>
              <th></th>
              <th>ROSA</th>
              <th>OSD</th>
              <th>Assisted Installer</th>
              <th>Local Dev</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="dd-table-label">{b ? 'Who manages it?' : 'Operator'}</td>
              <td>Red Hat SRE</td>
              <td>Red Hat SRE</td>
              <td>You</td>
              <td>You</td>
            </tr>
            <tr>
              <td className="dd-table-label">{b ? 'Where does it run?' : 'Infrastructure'}</td>
              <td>Your AWS</td>
              <td>AWS or GCP</td>
              <td>Your datacenter</td>
              <td>Your laptop</td>
            </tr>
            <tr>
              <td className="dd-table-label">{b ? 'Install time' : 'Provisioning'}</td>
              <td>~10-45 min</td>
              <td>~45 min</td>
              <td>~1-2 hours</td>
              <td>~15 min</td>
            </tr>
            <tr>
              <td className="dd-table-label">{b ? 'Production ready?' : 'Production'}</td>
              <td>✅ Yes</td>
              <td>✅ Yes</td>
              <td>✅ Yes</td>
              <td>❌ Dev only</td>
            </tr>
            <tr>
              <td className="dd-table-label">{b ? 'Cost model' : 'Pricing'}</td>
              <td>{b ? 'Cloud + subscription' : 'Cluster-hour + EC2'}</td>
              <td>{b ? 'Cloud + subscription' : 'Cluster-hour + compute'}</td>
              <td>{b ? 'Hardware + subscription' : 'OCP subscription'}</td>
              <td>Free</td>
            </tr>
            <tr>
              <td className="dd-table-label">{b ? 'Created from' : 'Provisioned via'}</td>
              <td>OCM</td>
              <td>OCM</td>
              <td>OCM / CLI</td>
              <td>crc setup</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function DeepDive({ mode, onModeChange }: DeepDiveProps) {
  const [activeTab, setActiveTab] = useState<DeepDiveTab>('overview');
  const b = mode === 'beginner';

  return (
    <div className="deep-dive">
      <div className="dd-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`dd-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="dd-tab-icon">{tab.icon}</span>
            <span className="dd-tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25 }}
          className="dd-content"
        >
          {activeTab === 'overview' && <OverviewPage b={b} onNavigate={setActiveTab} />}
          {activeTab === 'rosa' && <RosaMap mode={mode} onModeChange={onModeChange} />}
          {activeTab === 'osd' && <OsdMap mode={mode} onModeChange={onModeChange} />}
          {activeTab === 'assisted' && <AssistedInstallerMap mode={mode} onModeChange={onModeChange} />}
          {activeTab === 'local' && <LocalDevMap mode={mode} onModeChange={onModeChange} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
