import { AppMarker } from '../AppMarker';
import type { SceneProps } from '../types';

export function OpenShiftScene({ mode }: SceneProps) {
  const b = mode === 'beginner';

  return (
    <g>
      {/* OpenShift outer boundary */}
      <rect x="10" y="10" width="480" height="380" rx="22" fill="#FDE8E8" stroke="#EE0000" strokeWidth="3" />

      <text x="35" y="40" fontSize="16" fill="#CC0000" fontWeight="bold">
        {b ? 'OpenShift Cluster (Kubernetes with batteries included)' : 'OpenShift Cluster (managed by OCP)'}
      </text>
      <text x="35" y="56" fontSize="9" fill="#B71C1C" fontFamily="monospace">
        {b ? 'Everything from the Cluster level, plus enterprise tools and security' : 'Enterprise Kubernetes + operator-managed platform services'}
      </text>

      {/* Inner K8s cluster */}
      <rect x="30" y="68" width="210" height="130" rx="12" fill="#E0F2F1" stroke="#4DB6AC" strokeWidth="2" />
      <text x="45" y="88" fontSize="10" fill="#00695C" fontWeight="bold">
        {b ? 'Kubernetes (from before)' : 'Kubernetes Core'}
      </text>
      <rect x="42" y="96" width="60" height="25" rx="4" fill="#B2DFDB" />
      <text x="48" y="112" fontSize="7" fill="#004D40">{b ? 'Front Door' : 'API Server'}</text>
      <rect x="108" y="96" width="45" height="25" rx="4" fill="#B2DFDB" />
      <text x="114" y="112" fontSize="7" fill="#004D40">{b ? 'Memory' : 'etcd'}</text>
      <rect x="159" y="96" width="68" height="25" rx="4" fill="#B2DFDB" />
      <text x="165" y="112" fontSize="7" fill="#004D40">Scheduler</text>

      {/* Worker nodes mini */}
      <rect x="42" y="128" width="50" height="30" rx="4" fill="#EDE7F6" stroke="#4FC3F7" strokeWidth="1.5" />
      <text x="48" y="147" fontSize="6" fill="#0277BD" fontWeight="bold">{b ? 'Machine 1' : 'worker-1'}</text>
      <rect x="98" y="128" width="50" height="30" rx="4" fill="#F3E5F5" stroke="#CE93D8" strokeWidth="1" />
      <text x="104" y="147" fontSize="6" fill="#6A1B9A">{b ? 'Machine 2' : 'worker-2'}</text>
      <rect x="154" y="128" width="50" height="30" rx="4" fill="#F3E5F5" stroke="#CE93D8" strokeWidth="1" />
      <text x="160" y="147" fontSize="6" fill="#6A1B9A">{b ? 'Machine 3' : 'worker-3'}</text>

      <text x="42" y="190" fontSize="7" fill="#00695C">
        {b ? '+ pod manager, container engine, networking' : '+ CRI-O, kubelet, kube-proxy'}
      </text>

      <AppMarker x={67} y={162} size="small" />

      {/* OpenShift additions */}
      <text x="260" y="82" fontSize="10" fill="#CC0000" fontWeight="bold">
        {b ? 'What OpenShift adds:' : 'OCP platform services:'}
      </text>

      {/* Routes */}
      <rect x="260" y="90" width="210" height="30" rx="6" fill="#FFCDD2" stroke="#EF5350" strokeWidth="1.5" />
      <text x="275" y="105" fontSize="8" fill="#B71C1C" fontWeight="bold">
        {b ? '🚦 Easy public URLs' : '🚦 Routes (HAProxy)'}
      </text>
      <text x="275" y="116" fontSize="7" fill="#C62828">
        {b ? 'Expose your app to the internet simply' : 'TLS edge/passthrough/re-encrypt termination'}
      </text>

      {/* OperatorHub */}
      <rect x="260" y="126" width="210" height="30" rx="6" fill="#FFCDD2" stroke="#EF5350" strokeWidth="1.5" />
      <text x="275" y="141" fontSize="8" fill="#B71C1C" fontWeight="bold">
        {b ? '🏪 Add-on Store' : '🏪 OperatorHub + OLM'}
      </text>
      <text x="275" y="152" fontSize="7" fill="#C62828">
        {b ? 'Install databases, queues, tools in clicks' : 'Operator lifecycle management + CSV upgrades'}
      </text>

      {/* OAuth */}
      <rect x="260" y="162" width="210" height="30" rx="6" fill="#FFCDD2" stroke="#EF5350" strokeWidth="1.5" />
      <text x="275" y="177" fontSize="8" fill="#B71C1C" fontWeight="bold">
        {b ? '🔐 Company login' : '🔐 OAuth Server'}
      </text>
      <text x="275" y="188" fontSize="7" fill="#C62828">
        {b ? 'Connect your company identity provider' : 'LDAP, OIDC, HTPasswd, GitHub, Google'}
      </text>

      {/* Bottom features */}
      <rect x="30" y="210" width="140" height="50" rx="8" fill="#FFCDD2" stroke="#EF5350" strokeWidth="1.5" />
      <text x="45" y="228" fontSize="8" fill="#B71C1C" fontWeight="bold">
        {b ? '📊 Dashboards' : '📊 Monitoring (Prometheus)'}
      </text>
      <text x="45" y="242" fontSize="7" fill="#C62828">
        {b ? 'Pre-built health' : 'Prometheus + Alertmanager'}
      </text>
      <text x="45" y="252" fontSize="7" fill="#C62828">
        {b ? 'monitoring & alerts' : '+ Thanos, pre-configured'}
      </text>

      <rect x="180" y="210" width="140" height="50" rx="8" fill="#FFCDD2" stroke="#EF5350" strokeWidth="1.5" />
      <text x="195" y="228" fontSize="8" fill="#B71C1C" fontWeight="bold">
        {b ? '📝 Log collection' : '📝 Logging (Loki/EFK)'}
      </text>
      <text x="195" y="242" fontSize="7" fill="#C62828">
        {b ? 'All logs gathered' : 'Cluster logging operator'}
      </text>
      <text x="195" y="252" fontSize="7" fill="#C62828">
        {b ? 'in one place' : 'LokiStack or EFK pipeline'}
      </text>

      <rect x="330" y="210" width="140" height="50" rx="8" fill="#FFCDD2" stroke="#EF5350" strokeWidth="1.5" />
      <text x="345" y="228" fontSize="8" fill="#B71C1C" fontWeight="bold">
        {b ? '🖼️ Image management' : '🖼️ ImageStreams'}
      </text>
      <text x="345" y="242" fontSize="7" fill="#C62828">
        {b ? 'Track & rollback' : 'Image abstraction with'}
      </text>
      <text x="345" y="252" fontSize="7" fill="#C62828">
        {b ? 'app versions easily' : 'triggers & tag history'}
      </text>

      <rect x="30" y="270" width="140" height="50" rx="8" fill="#FFCDD2" stroke="#EF5350" strokeWidth="1.5" />
      <text x="45" y="288" fontSize="8" fill="#B71C1C" fontWeight="bold">
        {b ? '🛡️ Security guardrails' : '🛡️ SCCs'}
      </text>
      <text x="45" y="302" fontSize="7" fill="#C62828">
        {b ? 'Prevents insecure' : 'Security Context Constraints'}
      </text>
      <text x="45" y="312" fontSize="7" fill="#C62828">
        {b ? 'deployments by default' : 'stricter than PSA'}
      </text>

      <rect x="180" y="270" width="140" height="50" rx="8" fill="#FFCDD2" stroke="#EF5350" strokeWidth="1.5" />
      <text x="195" y="288" fontSize="8" fill="#B71C1C" fontWeight="bold">
        {b ? '👩‍💻 Developer UI' : '👩‍💻 Developer Console'}
      </text>
      <text x="195" y="302" fontSize="7" fill="#C62828">
        {b ? 'Visual app topology,' : 'Topology view, builds,'}
      </text>
      <text x="195" y="312" fontSize="7" fill="#C62828">
        {b ? 'builds, and pipelines' : 'Tekton pipelines'}
      </text>

      <rect x="330" y="270" width="140" height="50" rx="8" fill="#FFCDD2" stroke="#EF5350" strokeWidth="1.5" />
      <text x="345" y="288" fontSize="8" fill="#B71C1C" fontWeight="bold">
        {b ? '🔧 Power CLI' : '🔧 oc CLI'}
      </text>
      <text x="345" y="302" fontSize="7" fill="#C62828">
        {b ? 'Command-line with' : 'kubectl superset with'}
      </text>
      <text x="345" y="312" fontSize="7" fill="#C62828">
        {b ? 'extra shortcuts' : 'login, new-app, projects'}
      </text>

      {/* RHCOS */}
      <rect x="30" y="340" width="440" height="35" rx="8" fill="#D32F2F" fillOpacity="0.1" stroke="#D32F2F" strokeWidth="1.5" />
      <text x="50" y="358" fontSize="9" fill="#B71C1C" fontWeight="bold">
        {b ? '🖥️ Self-updating OS on every machine' : '🖥️ RHCOS (Red Hat CoreOS)'}
      </text>
      <text x={b ? 280 : 240} y="358" fontSize="8" fill="#C62828">
        {b ? 'Nodes patch themselves automatically' : 'Immutable OS — managed by Machine Config Operator'}
      </text>

    </g>
  );
}
