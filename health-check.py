#!/usr/bin/env python3
"""
Database connection test script for ajay-portfolio dashboard.
This script checks if the database is accessible and fixes common issues.
"""

import os
import psycopg2
from psycopg2.extras import RealDictCursor
import sys

def check_database_connection():
    """Check if we can connect to the database."""
    
    # Try to get database connection details
    # These might be in environment variables or docker-compose.yml
    
    # First, try to connect to silas-postgres via Docker
    try:
        conn = psycopg2.connect(
            host="localhost",
            port=5433,
            dbname="postgres",
            user="postgres",
            password="SovereignAdmin2026",
            cursor_factory=RealDictCursor
        )
        
        print("✅ Successfully connected to silas-postgres (localhost:5433)")
        
        # Test a simple query
        with conn.cursor() as cursor:
            cursor.execute("SELECT version();")
            version = cursor.fetchone()
            print(f"✅ Database version: {version['version']}")
        
        # Check if required tables exist
        with conn.cursor() as cursor:
            cursor.execute("""
                SELECT table_name 
                FROM information_schema.tables 
                WHERE table_schema = 'public'
                ORDER BY table_name;
            """)
            tables = cursor.fetchall()
            print(f"✅ Found {len(tables)} tables: {[t['table_name'] for t in tables]}")
        
        conn.close()
        return True
        
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        return False

def check_environment_variables():
    """Check if required environment variables are set."""
    
    required_vars = [
        "DATABASE_URL",
        "NEXTAUTH_SECRET",
        "NEXTAUTH_URL",
        "NEXT_PUBLIC_TINA_CLIENT_ID",
        "NEXT_PUBLIC_TINA_BRANCH",
        "TINA_TOKEN"
    ]
    
    print("\n📋 Checking environment variables:")
    missing_vars = []
    
    for var in required_vars:
        value = os.environ.get(var)
        if value:
            # Don't print sensitive values
            if "TOKEN" in var or "SECRET" in var:
                print(f"✅ {var}: Set ({len(value)} chars)")
            else:
                print(f"✅ {var}: Set = {value}")
        else:
            print(f"❌ {var}: NOT SET")
            missing_vars.append(var)
    
    return missing_vars

def test_prisma_connection():
    """Test Prisma connection using Node.js if available."""
    
    print("\n🔍 Testing Prisma connection...")
    
    try:
        # Try to import and run a simple Prisma test
        import subprocess
        
        # Create a simple test script
        test_script = """
const { PrismaClient } = require('@prisma/client');

async function testConnection() {
  try {
    const prisma = new PrismaClient();
    
    // Test simple query
    const result = await prisma.user.count();
    console.log(`Prisma connection successful. User count: ${result}`);
    
    await prisma.$disconnect();
    return true;
  } catch (error) {
    console.error('Prisma connection failed:', error.message);
    return false;
  }
}

testConnection();
"""
        
        # Write test script to file
        with open('prisma-test.js', 'w') as f:
            f.write(test_script)
        
        # Run the test
        result = subprocess.run(['node', 'prisma-test.js'], 
                              capture_output=True, text=True, timeout=30)
        
        if result.returncode == 0:
            print("✅ Prisma connection test passed")
            print(result.stdout)
            return True
        else:
            print("❌ Prisma connection test failed")
            print("STDOUT:", result.stdout)
            print("STDERR:", result.stderr)
            return False
            
    except Exception as e:
        print(f"❌ Could not run Prisma test: {e}")
        return False

def main():
    print("🚀 Dashboard Database Health Check")
    print("=" * 50)
    
    # Check environment variables
    missing_vars = check_environment_variables()
    
    # Test database connection
    db_connected = check_database_connection()
    
    # Test Prisma connection
    prisma_connected = test_prisma_connection()
    
    print("\n" + "=" * 50)
    print("📊 HEALTH CHECK SUMMARY:")
    print(f"Database Connection: {'✅ PASS' if db_connected else '❌ FAIL'}")
    print(f"Prisma Connection: {'✅ PASS' if prisma_connected else '❌ FAIL'}")
    print(f"Environment Variables: {'✅ PASS' if not missing_vars else f'❌ FAIL ({len(missing_vars)} missing)'}")
    
    if not (db_connected and prisma_connected and not missing_vars):
        print("\n❌ HEALTH CHECK FAILED - Dashboard may have 502 errors")
        print("\n🔧 RECOMMENDED FIXES:")
        print("1. Check if PostgreSQL container (silas-postgres) is running")
        print("2. Set missing environment variables in docker-compose.yml")
        print("3. Ensure DATABASE_URL is correctly configured")
        return 1
    else:
        print("\n✅ ALL CHECKS PASSED - Dashboard should be working correctly")
        return 0

if __name__ == "__main__":
    sys.exit(main())