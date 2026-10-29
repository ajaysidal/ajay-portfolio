Add-Type -AssemblyName System.Data.SQLite
$conn = New-Object System.Data.SQLite.SQLiteConnection('Data Source=C:\Projects\ajay-portfolio\db.sqlite')
$conn.Open()
$cmd = $conn.CreateCommand()
$cmd.CommandText = @"
CREATE TABLE IF NOT EXISTS User (
  id TEXT PRIMARY KEY,
  createdAt TEXT NOT NULL,
  updatedAt TEXT
);
CREATE INDEX IF NOT EXISTS idx_user_updatedAt ON User(updatedAt);
CREATE TABLE IF NOT EXISTS ConsultationBooking (
  id TEXT PRIMARY KEY,
  createdAt TEXT NOT NULL,
  fullName TEXT,
  email TEXT,
  phone TEXT,
  companyName TEXT,
  businessType TEXT,
  primaryPain TEXT,
  desiredOutcome TEXT,
  budgetRange TEXT,
  timeline TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  ipHash TEXT,
  userAgent TEXT
);
CREATE INDEX IF NOT EXISTS idx_consultationbooking_status ON ConsultationBooking(status);
CREATE INDEX IF NOT EXISTS idx_consultationbooking_createdAt ON ConsultationBooking(createdAt);
CREATE TABLE IF NOT EXISTS ProjectIntake (
  id TEXT PRIMARY KEY,
  createdAt TEXT NOT NULL,
  fullName TEXT,
  email TEXT,
  companyName TEXT,
  companyWebsite TEXT,
  currentTechStack TEXT,
  primaryPainPoints TEXT,
  desiredOutcomes TEXT,
  budgetRange TEXT,
  timeline TEXT,
  scopeOfWork TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  ipHash TEXT,
  userAgent TEXT
);
CREATE INDEX IF NOT EXISTS idx_projectintake_status ON ProjectIntake(status);
CREATE INDEX IF NOT EXISTS idx_projectintake_createdAt ON ProjectIntake(createdAt);
CREATE TABLE IF NOT EXISTS DashboardMetrics (
  id TEXT PRIMARY KEY,
  createdAt TEXT NOT NULL,
  pageViewed TEXT,
  consultationId TEXT,
  projectIntakeId TEXT,
  userId TEXT,
  ipHash TEXT
);
CREATE INDEX IF NOT EXISTS idx_dashboardmetrics_createdAt ON DashboardMetrics(createdAt);
CREATE INDEX IF NOT EXISTS idx_dashboardmetrics_pageViewed ON DashboardMetrics(pageViewed);
"@
$cmd.ExecuteNonQuery()
$conn.Close()
Write-Host 'Tables created successfully'

$tables = $conn.CreateCommand()
$tables.CommandText = "SELECT name FROM sqlite_master WHERE type='table'"
$reader = $tables.ExecuteReader()
$tableNames = @()
while ($reader.Read()) { $tableNames += $reader.GetString(0) }
Write-Host 'Tables in database:'
$tableNames
$reader.Close()