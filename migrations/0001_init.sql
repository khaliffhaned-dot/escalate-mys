-- Escalate MY — Production MVP Schema
-- Severity follows Field Manual T1–T4 (critical / serious / moderate / minor)

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT CHECK(role IN ('admin', 'operator', 'viewer')) DEFAULT 'viewer',
  created_at TEXT DEFAULT (datetime('now')),
  UNIQUE(tenant_id, email)
);

CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  tenant_id TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);

CREATE TABLE IF NOT EXISTS incidents (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  title TEXT NOT NULL,
  summary TEXT,
  severity TEXT NOT NULL CHECK(severity IN ('critical','serious','moderate','minor')) DEFAULT 'moderate',
  incident_type TEXT CHECK(incident_type IN ('operational','reputational','legal_regulatory','human_capital','environmental','cyber','force_majeure','other')),
  status TEXT CHECK(status IN ('Active','Monitoring','Contained','Closed')) DEFAULT 'Active',
  response_sla_minutes INTEGER,
  classification_set_by TEXT,
  classification_set_at TEXT,
  classification_rationale TEXT,
  owner TEXT,
  created_by TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_incidents_tenant ON incidents(tenant_id, status, severity);

CREATE TABLE IF NOT EXISTS decisions (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  incident_id TEXT NOT NULL,
  summary TEXT NOT NULL,
  recorded_by TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY(incident_id) REFERENCES incidents(id)
);

CREATE INDEX IF NOT EXISTS idx_decisions_incident ON decisions(incident_id);

CREATE TABLE IF NOT EXISTS audit_log (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  actor TEXT NOT NULL,
  action TEXT NOT NULL,
  target_type TEXT,
  target_id TEXT,
  detail TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_audit_tenant ON audit_log(tenant_id, created_at DESC);

INSERT OR IGNORE INTO users (id, tenant_id, email, password_hash, role)
VALUES (
  'user-demo',
  'tenant-demo',
  'demo@escalate.local',
  'pbkdf2:100000:Sa6U8nLhBvIRIn1kX4Y5fA==:u3mKO5qCwLUU5Ju2lbV+gIWTp2n+ehHl5powOGNHUAQ=',
  'admin'
);

INSERT OR IGNORE INTO incidents (id, tenant_id, title, summary, severity, incident_type, status, response_sla_minutes, owner, created_by, classification_set_by, classification_set_at)
VALUES 
  ('inc-001', 'tenant-demo', 'Regulatory inquiry — media coverage', 'Signal regarding ongoing compliance process with media interest.', 'serious', 'legal_regulatory', 'Active', 360, 'Governance Lead', 'user-demo', 'user-demo', datetime('now')),
  ('inc-002', 'tenant-demo', 'Stakeholder request — board briefing', 'Investor desk requested updated position on open item.', 'moderate', 'reputational', 'Monitoring', 1440, 'Comms', 'user-demo', 'user-demo', datetime('now'));
