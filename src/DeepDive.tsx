import React, { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, HardHat, Laptop, LayoutDashboard, Globe, Cloud, Server } from 'lucide-react';
import type { ExplainMode } from './types';
import { RosaMap } from './RosaMap';
import { OsdMap } from './OsdMap';
import { AssistedInstallerMap } from './AssistedInstallerMap';
import { LocalDevMap } from './LocalDevMap';
import { OcpConsoleMap } from './OcpConsoleMap';
import { HyperfleetMap } from './HyperfleetMap';
import { ZoomLink } from './ZoomLink';
import { ExploreMore, DEEP_DIVE_LINKS } from './ExploreMore';

export type DeepDiveTab = 'overview' | 'ocp-console' | 'rosa' | 'osd' | 'hyperfleet' | 'assisted' | 'local';

interface DeepDiveProps {
  mode: ExplainMode;
  onModeChange: (mode: ExplainMode) => void;
  initialTab?: DeepDiveTab;
}

function BrandLogo({ srcs, alt }: { srcs: string[]; alt: string }) {
  return (
    <span className="dd-tab-brand-logo">
      {srcs.map((src, i) => (
        <img key={i} src={import.meta.env.BASE_URL + src} alt={alt} className="dd-brand-img" />
      ))}
    </span>
  );
}

const TABS: { id: DeepDiveTab; label: string; icon: ReactNode; color: string; tagline: string }[] = [
  { id: 'overview', label: 'Overview', icon: <Map size={16} />, color: '#6A1B9A', tagline: 'Compare all cluster types' },
  { id: 'rosa', label: 'ROSA', icon: <Cloud size={16} />, color: '#CC0000', tagline: 'Red Hat on AWS' },
  { id: 'osd', label: 'OSD', icon: <Server size={16} />, color: '#CC0000', tagline: 'OpenShift Dedicated' },
  { id: 'assisted', label: 'Assisted Installer', icon: <HardHat size={16} />, color: '#E65100', tagline: 'Your hardware' },
  { id: 'local', label: 'Local Dev', icon: <Laptop size={16} />, color: '#1565C0', tagline: 'On your laptop' },
  { id: 'hyperfleet', label: 'HyperFleet', icon: <Globe size={16} />, color: '#0D47A1', tagline: 'ROSA goes regional' },
  { id: 'ocp-console', label: 'OCP Console', icon: <LayoutDashboard size={16} />, color: '#00695C', tagline: 'Inside a cluster' },
];

function OverviewFlowchart({ b, onNavigate }: { b: boolean; onNavigate: (tab: DeepDiveTab) => void }) {
  return (
    <svg viewBox="0 0 800 430" className="rosa-svg" style={{ maxWidth: 1100, minHeight: 500 }}>
      {/* Start node */}
      <rect x="300" y="10" width="200" height="40" rx="20" fill="#0D47A1" />
      <text x="400" y="35" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="bold">
        {b ? 'Where do you want to run?' : 'Choose deployment target'}
      </text>

      {/* Branch lines from start */}
      <line x1="345" y1="50" x2="130" y2="90" stroke="#999" strokeWidth="1.5" />
      <line x1="400" y1="50" x2="400" y2="90" stroke="#999" strokeWidth="1.5" />
      <line x1="455" y1="50" x2="670" y2="90" stroke="#999" strokeWidth="1.5" />

      {/* ---- Datacenter branch (left) ---- */}
      <g style={{ cursor: 'pointer' }} onClick={() => onNavigate('assisted')}>
        <rect x="30" y="90" width="200" height="36" rx="18" fill="#F3E5F5" stroke="#7B1FA2" strokeWidth="2" />
        <text x="130" y="113" textAnchor="middle" fontSize="11" fill="#4A148C" fontWeight="bold">
          🏢 {b ? 'Your Datacenter' : 'On-premise / Bare Metal'}
        </text>
        <line x1="130" y1="126" x2="130" y2="160" stroke="#7B1FA2" strokeWidth="1.5" />
        <rect x="40" y="160" width="180" height="85" rx="10" fill="#F3E5F5" stroke="#7B1FA2" strokeWidth="1.5" />
        <rect x="52" y="168" width="72" height="16" rx="8" fill="#7B1FA2" />
        <text x="58" y="180" fontSize="7" fill="#fff" fontWeight="bold">Assisted Inst.</text>
        <ZoomLink x={198} y={172} />
        <text x="52" y="200" fontSize="8" fill="#4A148C" fontWeight="bold">{b ? 'Guided install on' : 'OCP on bare metal'}</text>
        <text x="52" y="213" fontSize="7" fill="#777">{b ? 'your own servers' : 'or VMs (vSphere)'}</text>
        <text x="52" y="226" fontSize="7" fill="#777">{b ? 'You manage everything' : 'Customer-operated'}</text>
        <text x="52" y="239" fontSize="7" fill="#777">{b ? 'after installation' : 'post-install (no SRE)'}</text>
      </g>

      {/* ---- Cloud branch (center) ---- */}
      <rect x="260" y="90" width="280" height="36" rx="18" fill="#FFF8E1" stroke="#FFA000" strokeWidth="2" />
      <text x="400" y="113" textAnchor="middle" fontSize="11" fill="#E65100" fontWeight="bold">
        ☁️ {b ? 'In the Cloud (AWS or GCP)' : 'Cloud (AWS / GCP)'}
      </text>

      {/* Cloud sub-question */}
      <line x1="400" y1="126" x2="400" y2="160" stroke="#FFA000" strokeWidth="1.5" />
      <rect x="295" y="160" width="210" height="28" rx="14" fill="#FFF3E0" stroke="#FFB74D" strokeWidth="1" />
      <text x="400" y="179" textAnchor="middle" fontSize="9" fill="#E65100" fontWeight="bold">
        {b ? 'Which managed service?' : 'Product selection'}
      </text>

      {/* Cloud sub-branches */}
      <line x1="330" y1="188" x2="200" y2="270" stroke="#CC0000" strokeWidth="1.5" />
      <line x1="400" y1="188" x2="400" y2="270" stroke="#CC0000" strokeWidth="1.5" />
      <line x1="470" y1="188" x2="570" y2="270" stroke="#CC0000" strokeWidth="1.5" />

      {/* ROSA HCP */}
      <g style={{ cursor: 'pointer' }} onClick={() => onNavigate('rosa')}>
        <rect x="110" y="270" width="170" height="95" rx="10" fill="#FDE8E8" stroke="#CC0000" strokeWidth="2" />
        <rect x="122" y="278" width="55" height="16" rx="8" fill="#CC0000" />
        <text x="130" y="290" fontSize="7" fill="#fff" fontWeight="bold">ROSA HCP</text>
        <ZoomLink x={258} y={282} />
        <text x="122" y="310" fontSize="8" fill="#C62828" fontWeight="bold">{b ? 'Most managed' : 'Hosted Control Plane'}</text>
        <text x="122" y="323" fontSize="7" fill="#777">{b ? 'RH runs the "brains" (CP)' : 'CP in RH AWS, STS'}</text>
        <text x="122" y="336" fontSize="7" fill="#777">{b ? 'SRE team + STS roles' : 'SRE + PrivateLink + STS'}</text>
        <text x="122" y="355" fontSize="7" fill="#CC0000" fontWeight="bold">✅ {b ? 'Best for most teams' : 'Recommended (new AWS)'}</text>
      </g>

      {/* ROSA Classic */}
      <g style={{ cursor: 'pointer' }} onClick={() => onNavigate('rosa')}>
        <rect x="310" y="270" width="170" height="95" rx="10" fill="#FDE8E8" stroke="#EF5350" strokeWidth="1.5" />
        <rect x="322" y="278" width="65" height="16" rx="8" fill="#EF5350" />
        <text x="330" y="290" fontSize="7" fill="#fff" fontWeight="bold">ROSA Classic</text>
        <ZoomLink x={458} y={282} />
        <text x="322" y="310" fontSize="8" fill="#C62828" fontWeight="bold">{b ? 'Managed + SRE' : 'In-cluster CP'}</text>
        <text x="322" y="323" fontSize="7" fill="#777">{b ? 'Control Plane ("brains") in YOUR acct' : 'CP in customer AWS'}</text>
        <text x="322" y="336" fontSize="7" fill="#777">{b ? 'SRE team + STS roles' : 'SRE, MachineSet, STS'}</text>
        <text x="322" y="349" fontSize="7" fill="#777">{b ? 'You pay for CP machines' : 'Customer pays CP EC2'}</text>
      </g>

      {/* OSD */}
      <g style={{ cursor: 'pointer' }} onClick={() => onNavigate('osd')}>
        <rect x="510" y="270" width="170" height="95" rx="10" fill="#FDE8E8" stroke="#EF5350" strokeWidth="1.5" />
        <rect x="522" y="278" width="35" height="16" rx="8" fill="#CC0000" />
        <text x="528" y="290" fontSize="7" fill="#fff" fontWeight="bold">OSD</text>
        <ZoomLink x={658} y={282} />
        <text x="522" y="310" fontSize="8" fill="#C62828" fontWeight="bold">{b ? 'Managed + Dedicated SRE' : 'Dedicated SRE per cluster'}</text>
        <text x="522" y="323" fontSize="7" fill="#777">{b ? 'Runs on AWS or GCP clouds' : 'AWS / GCP'}</text>
        <text x="522" y="336" fontSize="7" fill="#777">{b ? 'Your cloud bill or RH pays' : 'CCS or RH cloud account'}</text>
        <text x="522" y="349" fontSize="7" fill="#777">{b ? 'Static keys (not roles)' : 'Static IAM keys / SA'}</text>
      </g>

      {/* ---- Laptop branch (right) ---- */}
      <g style={{ cursor: 'pointer' }} onClick={() => onNavigate('local')}>
        <rect x="570" y="90" width="200" height="36" rx="18" fill="#E3F2FD" stroke="#1565C0" strokeWidth="2" />
        <text x="670" y="113" textAnchor="middle" fontSize="11" fill="#0D47A1" fontWeight="bold">
          💻 {b ? 'Your Laptop' : 'Local Development'}
        </text>
        <line x1="670" y1="126" x2="670" y2="160" stroke="#1565C0" strokeWidth="1.5" />
        <rect x="580" y="160" width="180" height="85" rx="10" fill="#E3F2FD" stroke="#1565C0" strokeWidth="1.5" />
        <rect x="592" y="168" width="58" height="16" rx="8" fill="#1565C0" />
        <text x="598" y="180" fontSize="7" fill="#fff" fontWeight="bold">Local Dev</text>
        <ZoomLink x={738} y={172} />
        <text x="592" y="200" fontSize="8" fill="#0D47A1" fontWeight="bold">{b ? 'Mini cluster for' : 'OpenShift Local / MicroShift'}</text>
        <text x="592" y="213" fontSize="7" fill="#777">{b ? 'learning & testing' : 'Single-node OCP VM'}</text>
        <text x="592" y="226" fontSize="7" fill="#777">{b ? 'Free, not for' : 'Dev/test only'}</text>
        <text x="592" y="239" fontSize="7" fill="#777">{b ? 'production' : 'No SRE, no HA'}</text>
      </g>

      {/* Shared note at bottom */}
      <rect x="60" y="385" width="680" height="30" rx="8" fill="#FFF8E1" stroke="#FFA000" strokeWidth="1" />
      <text x="400" y="405" textAnchor="middle" fontSize="9" fill="#E65100" fontWeight="bold">
        🟠 {b ? 'In ALL models: YOU manage your apps, your data, your users, and cluster access (RBAC)'
             : 'Shared across all models: workload management, RBAC, namespace policies, app deployment, data governance'}
      </text>
    </svg>
  );
}

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

      <OverviewFlowchart b={b} onNavigate={onNavigate} />

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
              <td>{b ? 'Your AWS (HCP: brain in RH\'s AWS)' : 'Customer AWS (HCP: CP in RH AWS)'}</td>
              <td>{b ? 'AWS or GCP (your account or RH\'s)' : 'AWS/GCP (CCS or RH account)'}</td>
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

      <ExploreMore links={DEEP_DIVE_LINKS.overview} />
    </div>
  );
}

export function DeepDive({ mode, onModeChange, initialTab }: DeepDiveProps) {
  const [activeTab, setActiveTab] = useState<DeepDiveTab>(initialTab || 'overview');
  const b = mode === 'beginner';

  // Sync when parent changes the initial tab (e.g. "Open console" vs "Create cluster")
  React.useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab]);

  return (
    <div className="deep-dive">
      <div className="dd-tabs">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              className={`dd-tab ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              style={isActive ? { borderColor: tab.color, color: tab.color } : undefined}
            >
              <span className="dd-tab-icon" style={{ color: tab.color }}>{tab.icon}</span>
              <span className="dd-tab-label">{tab.label}</span>
            </button>
          );
        })}
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
          {activeTab === 'ocp-console' && <OcpConsoleMap mode={mode} onModeChange={onModeChange} />}
          {activeTab === 'rosa' && <RosaMap mode={mode} onModeChange={onModeChange} />}
          {activeTab === 'osd' && <OsdMap mode={mode} onModeChange={onModeChange} />}
          {activeTab === 'hyperfleet' && <HyperfleetMap mode={mode} onModeChange={onModeChange} />}
          {activeTab === 'assisted' && <AssistedInstallerMap mode={mode} onModeChange={onModeChange} />}
          {activeTab === 'local' && <LocalDevMap mode={mode} onModeChange={onModeChange} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
