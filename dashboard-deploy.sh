#!/bin/bash
# Dashboard Deployment Script - Ensures dashboard works correctly and fixes 502 errors

set -e

echo "🚀 Starting Dashboard Deployment..."

# Function to check if a service is running
check_service() {
    local service_name=$1
    local port=$2
    
    # Use python to check if container is running
    python3 -c "
import subprocess
try:
    result = subprocess.run(['docker', 'ps', '--filter', f'name={service_name}', '--format', '{{.Names}}'], 
                          capture_output=True, text=True, timeout=10)
    if service_name in result.stdout:
        print('✅ $service_name is running')
        return 0
    else:
        print('❌ $service_name is NOT running')
        return 1
except Exception as e:
    print(f'❌ Error checking $service_name: {e}')
    return 1
" || echo "❌ $service_name check failed"
}

# Function to check database connectivity
check_database() {
    echo "🔍 Checking database connectivity..."
    
    # Use python to check database connectivity
    python3 << 'EOF'
import subprocess
import psycopg2
from psycopg2.extras import RealDictCursor

try:
    # Try to connect to silas-postgres
    conn = psycopg2.connect(
        host="localhost",
        port=5433,
        dbname="postgres",
        user="postgres",
        password="SovereignAdmin2026",
        cursor_factory=RealDictCursor,
        connect_timeout=10
    )
    
    print("✅ PostgreSQL is accessible")
    
    # Test a simple query
    with conn.cursor() as cursor:
        cursor.execute("SELECT 1;")
        result = cursor.fetchone()
        if result:
            print("✅ Database queries are working")
        else:
            print("❌ Database queries are failing")
            exit(1)
    
    conn.close()
    exit(0)
    
except Exception as e:
    print(f"❌ PostgreSQL is not accessible: {e}")
    exit(1)
EOF
}

# Function to check environment variables
check_env_vars() {
    echo "📋 Checking required environment variables..."
    
    # List of required environment variables
    local required_vars=("DATABASE_URL" "NEXTAUTH_SECRET" "NEXT_PUBLIC_TINA_CLIENT_ID")
    local missing_vars=()
    
    for var in "${required_vars[@]}"; do
        if [ -z "${!var}" ]; then
            missing_vars+=("$var")
            echo "❌ $var is not set"
        else
            echo "✅ $var is set"
        fi
    done
    
    if [ ${#missing_vars[@]} -gt 0 ]; then
        echo "❌ Missing environment variables: ${missing_vars[*]}"
        return 1
    else
        echo "✅ All required environment variables are set"
        return 0
    fi
}

# Function to rebuild and restart Next.js app
rebuild_nextjs() {
    echo "🔄 Rebuilding Next.js application..."
    
    # Stop existing services
    echo "Stopping existing services..."
    docker compose down >/dev/null 2>&1
    
    # Build and start services
    echo "Building and starting services..."
    docker compose build --no-cache ajay-portfolio >/dev/null 2>&1
    docker compose up -d >/dev/null 2>&1
    
    # Wait for services to start
    echo "Waiting for services to start (30 seconds)..."
    sleep 30
    
    # Check if Next.js is running
    if check_service "ajay-portfolio-ajay-portfolio-1" "3000"; then
        echo "✅ Next.js application is running"
        return 0
    else
        echo "❌ Next.js application failed to start"
        return 1
    fi
}

# Function to test dashboard endpoints
 test_dashboard_endpoints() {
    echo "🔍 Testing dashboard endpoints..."
    
    # Use python to test dashboard endpoints
    python3 << 'EOF'
import requests
import sys

try:
    # Test main dashboard endpoint
    response = requests.get('http://localhost:3000/dashboard', timeout=10)
    
    if response.status_code == 200 or response.status_code == 302:
        print(f"✅ Dashboard endpoint is responding (HTTP {response.status_code})")
        exit(0)
    else:
        print(f"❌ Dashboard endpoint is not responding (HTTP {response.status_code})")
        exit(1)
        
except Exception as e:
    print(f"❌ Dashboard endpoint is not responding: {e}")
    exit(1)
EOF
}

# Main deployment logic
main() {
    echo "🔧 Running comprehensive dashboard deployment checks..."
    
    # Check if required services are running
    local services_ok=true
    
    if ! check_service "silas-postgres" "5433"; then
        services_ok=false
    fi
    
    if ! check_service "ajay-portfolio-ajay-portfolio-1" "3000"; then
        services_ok=false
    fi
    
    # Check database connectivity
    local db_ok=true
    if ! check_database; then
        db_ok=false
    fi
    
    # Check environment variables
    local env_ok=true
    if ! check_env_vars; then
        env_ok=false
    fi
    
    # Rebuild if services or database are not working
    if ! $services_ok || ! $db_ok || ! $env_ok; then
        echo "⚠️  Issues detected. Rebuilding Next.js application..."
        if rebuild_nextjs; then
            echo "✅ Rebuild completed successfully"
        else
            echo "❌ Rebuild failed"
            exit 1
        fi
    else
        echo "✅ All services and database are working correctly"
    fi
    
    # Test dashboard endpoints
    if test_dashboard_endpoints; then
        echo "✅ Dashboard is working correctly"
    else
        echo "❌ Dashboard is not working correctly"
        exit 1
    fi
    
    echo "🎉 Dashboard deployment completed successfully!"
    echo "\n📊 STATUS SUMMARY:
✅ PostgreSQL: $(check_service "silas-postgres" "5433" && echo "RUNNING" || echo "STOPPED")
✅ Next.js: $(check_service "ajay-portfolio-ajay-portfolio-1" "3000" && echo "RUNNING" || echo "STOPPED")
✅ Database: $(check_database && echo "CONNECTED" || echo "DISCONNECTED")
✅ Dashboard: $(test_dashboard_endpoints && echo "WORKING" || echo "NOT WORKING")
"
}

# Run main function
main