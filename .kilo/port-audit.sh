#!/bin/bash
# Port Audit Script - Check available ports 3000-3010
echo "🔍 Checking ports 3000-3010..."

# Check each port
for port in 3000 3001 3002 3003 3004 3005 3006 3007 3007 3008 3009 3010; do
    if netstat -tuln 2>/dev/null | grep -q ":$port "; then
        echo "❌ Port $port: OCCUPIED"
    else
        echo "✅ Port $port: FREE"
    fi
done

echo ""
echo "📋 Recommended: Use the first FREE port in range 3000-3010"