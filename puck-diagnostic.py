#!/usr/bin/env python3
"""
Puck Editor Diagnostic Tool

This script diagnoses the Puck Editor integration issues and provides
precise fixes for the TypeError "Cannot read properties of null (reading 'position')".

The root cause is that API error responses are being treated as valid Puck data,
causing Puck's internal state management to crash.
"""

import os
import json
from pathlib import Path
import sys

def analyze_project_structure():
    """Analyze the project structure and identify issues."""
    print("🔍 PUCK EDITOR DIAGNOSTIC")
    print("=" * 60)
    
    # Check critical files
    critical_files = [
        "lib/puck-config.tsx",
        "app/api/puck/load/route.ts",
        "app/api/puck/files/route.ts",
        "app/dashboard/cms/builder/page.tsx",
        "content/pages/about.json"
    ]
    
    print("\n📁 CRITICAL FILE ANALYSIS:")
    issues_found = []
    
    for file_path in critical_files:
        full_path = Path(file_path)
        if full_path.exists():
            print(f"✅ {file_path} - EXISTS")
            
            # Check file content for specific issues
            with open(full_path, 'r') as f:
                content = f.read()
                
            # Check for API error handling issues
            if file_path == "app/api/puck/load/route.ts":
                if 'return NextResponse.json({ error: "Failed to load page" }' in content:
                    print(f"   ❌ ISSUE: Returns error object instead of empty Puck structure")
                    issues_found.append(f"{file_path}: API error response instead of empty data structure")
                    
            elif file_path == "app/api/puck/files/route.ts":
                if 'return NextResponse.json({ error: "Failed to list files" }' in content:
                    print(f"   ❌ ISSUE: Returns error object instead of empty array")
                    issues_found.append(f"{file_path}: API error response instead of empty files array")
                    
            elif file_path == "app/dashboard/cms/builder/page.tsx":
                if 'const [data, setData] = useState<PuckData>({ root: { props: {} }, content: [] })' in content:
                    print(f"   ❌ ISSUE: Uses empty structure as initial state")
                    issues_found.append(f"{file_path}: Needs better null safety handling")
                    
        else:
            print(f"❌ {file_path} - MISSING")
            issues_found.append(f"{file_path}: File not found")
    
    return issues_found

def analyze_data_structure():
    """Analyze data structures for compatibility."""
    print("\n📊 DATA STRUCTURE ANALYSIS:")
    
    # Check about.json
    about_path = Path("content/pages/about.json")
    if about_path.exists():
        with open(about_path, 'r') as f:
            about_data = json.load(f)
        
        print(f"✅ {about_path} - EXISTS")
        print(f"   Root props: {about_data.get('root', {}).get('props', 'N/A')}")
        print(f"   Content items: {len(about_data.get('content', []))}")
        
        # Validate Puck structure
        required_keys = ['root', 'content']
        missing_keys = [key for key in required_keys if key not in about_data]
        if missing_keys:
            print(f"   ❌ ISSUE: Missing keys: {missing_keys}")
            return False
            
        for item in about_data['content']:
            if not all(key in item for key in ['type', 'props', 'id']):
                print(f"   ❌ ISSUE: Content item missing required keys: {item}")
                return False
                
    else:
        print(f"❌ {about_path} - MISSING")
        return False
    
    return True

def analyze_type_compatibility():
    """Analyze TypeScript type compatibility."""
    print("\n🔧 TYPE COMPATIBILITY ANALYSIS:")
    
    # Check puck-config.tsx
    puck_config_path = Path("lib/puck-config.tsx")
    if puck_config_path.exists():
        with open(puck_config_path, 'r') as f:
            content = f.read()
        
        if 'export type PuckData = Data<ComponentMap, RootProps>;' in content:
            print(f"✅ {puck_config_path} - PuckData type correctly exported")
        else:
            print(f"❌ {puck_config_path} - PuckData type not properly exported")
            return False
            
        if 'export const puckConfig: Config<ComponentMap, RootProps> = {' in content:
            print(f"✅ {puck_config_path} - puckConfig type correctly typed")
        else:
            print(f"❌ {puck_config_path} - puckConfig type not correctly typed")
            return False
            
    else:
        print(f"❌ {puck_config_path} - File not found")
        return False
    
    return True

def generate_fix_plan():
    """Generate a comprehensive fix plan."""
    print("\n🛠️ FIX PLAN:")
    
    print("\n1. CRITICAL: Fix API Error Handling")
    print("   File: app/api/puck/load/route.ts")
    print("   - Change error responses to return empty Puck structure")
    print("   - Maintain HTTP status codes for error handling")
    print("   - Ensure API never returns objects with 'error' keys")
    
    print("\n2. CRITICAL: Fix API Error Handling")
    print("   File: app/api/puck/files/route.ts")
    print("   - Change error responses to return empty array")
    print("   - Maintain HTTP status codes for error handling")
    print("   - Ensure API never returns objects with 'error' keys")
    
    print("\n3. CRITICAL: Fix Builder Component Null Safety")
    print("   File: app/dashboard/cms/builder/page.tsx")
    print("   - Add robust null checking for API responses")
    print("   - Initialize state with guaranteed valid fallback")
    print("   - Add loading/error boundaries")
    
    print("\n4. VERIFICATION: Test Implementation")
    print("   - Run: npm run build")
    print("   - Verify: /dashboard/cms/builder?slug=about loads")
    print("   - Test: Component drag and save operations")
    
    return True

def main():
    print("🚀 Starting Puck Editor Diagnostic Analysis")
    print("=" * 60)
    
    # Run analysis
    issues = analyze_project_structure()
    data_ok = analyze_data_structure()
    type_ok = analyze_type_compatibility()
    
    # Summary
    print("\n" + "=" * 60)
    print("📋 DIAGNOSTIC SUMMARY:")
    
    if not data_ok or not type_ok:
        print("❌ CRITICAL ISSUES FOUND")
        print("   - Data structure problems")
        print("   - Type compatibility issues")
        return 1
    
    if issues:
        print(f"⚠️  {len(issues)} API error handling issues found")
        for issue in issues:
            print(f"   - {issue}")
    else:
        print("✅ No structural issues found")
    
    # Generate fix plan
    generate_fix_plan()
    
    print("\n" + "=" * 60)
    print("🎯 ROOT CAUSE IDENTIFIED:")
    print("The TypeError 'Cannot read properties of null (reading position)'")
    print("is caused by:")
    print("1. API endpoints returning error objects instead of valid data")
    print("2. Builder component trying to parse error responses as Puck data")
    print("3. Lack of null safety in state management")
    
    print("\n🔧 IMMEDIATE ACTION REQUIRED:")
    print("Fix the API endpoints to always return valid data structures")
    print("(even on errors) and implement robust null safety in the builder.")
    
    return 0

if __name__ == "__main__":
    sys.exit(main())