import { SENSOR_ORDER } from './server/security-view-model.mjs';

// Relative times are rebased when a demo is created, so fixtures work offline on any date.
export const SERVER_DEMO_NOW = Date.parse('2026-10-04T09:00:00Z');
const at = (offset = 0) => new Date(SERVER_DEMO_NOW + offset).toISOString();
export const INITIAL_SERVERS = [
  { id: 'srv-api', domain: 'prod-app-01.silenceai.net', ipAddress: '10.12.4.18', ports: [22, 443, 6443], machineCredentialIssuedAt: at(-86400000) },
  { id: 'srv-worker', domain: 'worker-prod-01.silenceai.net', ipAddress: '10.12.4.32', ports: [22, 443, 6443], machineCredentialIssuedAt: at(-86400000) },
  { id: 'srv-db', domain: 'db-primary.internal', ipAddress: '10.12.8.10', ports: [22, 443, 6443], machineCredentialIssuedAt: null },
];
export const INITIAL_SENSORS = SENSOR_ORDER.map(sensor => ({
  sensor, state: 'HEALTHY', version: ({ crowdsec: '1.7.0', falco: '0.41.3', suricata: '8.0.1' })[sensor] || '9.8.7',
  observedAt: at(-2000), lastEventAt: at(-15000),
  details: { detecting: true, response_mode: 'enforce', response_eligible: ['crowdsec', 'falco', 'suricata'].includes(sensor), functional_state: 'FUNCTIONAL', functional_evidence_at: at(-2000), driver: 'modern_bpf', policy_revision: '7', candidate_interfaces: ['ens3', 'ens4'], interface: 'ens3' },
}));
export const INITIAL_INCIDENTS = [
  { id: 'inc-01', severity: 'high', summary: 'crowdsecurity/ssh-bf', sourceIP: '198.51.100.42', detectionSources: ['crowdsec'], evidence: { scenario: 'crowdsecurity/ssh-bf', source_ip: '198.51.100.42', attempts: 47, service: 'SSH', destination_port: 22, detail: 'Repeated SSH login attempts' } },
  { id: 'inc-02', severity: 'critical', summary: 'Guard execution from temporary directory', detectionSources: ['guard', 'falco'], evidence: { executable: '/tmp/payload.bin', user: 'www-data', parent: '/usr/sbin/nginx', rule: 'Guard execution from temporary directory', detail: 'Unauthorized binary executed' } },
  { id: 'inc-03', severity: 'medium', summary: 'Write below binary dir', detectionSources: ['fim', 'falco'], evidence: { path: '/usr/local/bin', process: 'python3', rule: 'Write below binary dir', detail: 'Unexpected modification', sha256: '9f6d9237ad5317c046529df7c663750d127b3f814680770223942807ac7263f9' } },
].map((row, index) => ({ ...row, status: index === 2 ? 'INVESTIGATING' : 'OPEN', firstSeenAt: at(-300000), lastSeenAt: at(-30000), eventCount: index === 0 ? 47 : row.detectionSources.length, events: row.detectionSources.map(source => ({ eventId: `evt-${index}-${source}`, source, eventType: 'security.detection', severity: row.severity, occurredAt: at(-30000), payload: { ...row.evidence, rule: { name: row.summary } } })) }));
export const INITIAL_RESPONSES = [{ id: 'resp-01', sourceCIDR: '198.51.100.42/32', sensor: 'crowdsec', action: 'deny_source_ip_protected_ports', ports: [22, 6443], portGroup: 'SSH 22 · Kubernetes 6443', status: 'APPLIED', reason: 'crowdsecurity/ssh-bf · verified source attribution', startsAt: at(-10000), expiresAt: at(900000), policyRevision: 7 }];
export const INITIAL_PACKAGES = ['linux-image-generic', 'systemd', 'openssh-server', 'crowdsec', 'falco', 'suricata'].map((packageName, index) => ({ id: `pkg-${index}`, packageName, version: ['6.8.0-71', '255.4', '9.6p1', '1.7.0', '0.41.3', '8.0.1'][index], ecosystem: 'deb', architecture: 'amd64', lastObservedAt: at(-15000) }));
export const INITIAL_POSTURE_CHECKS = [
  { title: 'Ensure SSH root login is disabled', status: 'failed', severity: 'high', check_id: 'CIS-5.2.10', actual: 'PermitRootLogin yes', guidance: 'Set PermitRootLogin no in /etc/ssh/sshd_config.' },
  { title: 'Ensure auditd is enabled', status: 'passed', severity: 'info', check_id: 'CIS-4.1.1', actual: 'auditd.service active' },
  { title: 'Ensure password authentication is disabled', status: 'passed', severity: 'info', check_id: 'CIS-5.2.12', actual: 'PasswordAuthentication no' },
];
export const INITIAL_POLICY = {
  activation_state: 'applied', revision: { revision: 7, createdAt: at(-600000) },
  trusted_ips: [{ cidr: '10.0.0.0/8', description: 'Internal VPC' }, { cidr: '192.168.1.0/24', description: 'Office VPN' }],
  explicit_blocks: [{ cidr: '203.0.113.55/32', reason: 'Known C2 IP' }],
  policy: { policy_revision: 7, response: { mode: 'enforce', enabled: true, allowed_actions: ['deny_source_ip_protected_ports'], default_ttl_seconds: 900, maximum_ttl_seconds: 86400, sensors: Object.fromEntries(SENSOR_ORDER.map(sensor => [sensor, { enabled: true, allowed_actions: ['deny_source_ip_protected_ports'] }])) }, components: Object.fromEntries(SENSOR_ORDER.map(sensor => [sensor, true])), suricata: { interface: 'ens3' }, retention: { events_days: 30, incidents_days: 365 } },
};
export const INITIAL_PROVISIONING = { stage: 'complete', releaseVersion: '9.8.7-3', manifestId: 'release-9.8.7-3', createdAt: at(-600000), componentState: Object.fromEntries(SENSOR_ORDER.map(sensor => [sensor, 'healthy'])), policyActivation: { revision: '7', activatedAt: at(-600000), components: INITIAL_POLICY.policy.components } };
export const INITIAL_EVENTS = [
  ...INITIAL_INCIDENTS.flatMap(incident => incident.events.map(event => ({ ...event, incidentId: incident.id }))),
  ...INITIAL_POSTURE_CHECKS.map((payload, index) => ({ eventId: `sca-${index}`, source: 'sca', eventType: 'sca.check', severity: payload.severity, occurredAt: at(-60000), payload: { ...payload, rule: { name: payload.title } } })),
  { eventId: 'inventory-01', source: 'inventory', eventType: 'inventory.snapshot', severity: 'info', occurredAt: at(-15000), payload: { os: 'Ubuntu 24.04 LTS', kernel: '6.8.0-71-generic', services: 'sshd, nginx, containerd', ports: '22, 443, 6443', interface: 'ens3', accounts: 'root, deploy, www-data' } },
  { eventId: 'yara-01', source: 'yarax', eventType: 'malware.scan', severity: 'low', occurredAt: at(-45000), payload: { title: 'YARA-X scheduled scan completed', rule: { name: 'YARA-X scheduled scan completed' }, files_scanned: 18720, matches: 0 } },
  { eventId: 'suricata-01', source: 'suricata', eventType: 'network.ids', severity: 'medium', occurredAt: at(-20000), payload: { title: 'ET SCAN Potential SSH Scan', source_ip: '198.51.100.42', interface: 'ens3', signature_id: 2001219, rule: { name: 'ET SCAN Potential SSH Scan' } } },
];
export const NATIVE_PACKAGES_METADATA = [
  { family: 'deb', filename: 'silence-server-security_9.8.7-3_amd64.deb', architecture: 'amd64', version: '9.8.7-3', size: 28416480, sha256: '137b73a6972a8cd2e77b0cb179984c518157d578d21ab30b5de3e2de7aa4a2f6' },
  { family: 'rpm', filename: 'silence-server-security-9.8.7-3.x86_64.rpm', architecture: 'x86_64', version: '9.8.7-3', size: 29120512, sha256: 'b0d8228f0142739c1557469892bca850ab83e6c14b027b26b482c678981f8c62' },
];
