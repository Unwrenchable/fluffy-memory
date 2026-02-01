#!/bin/bash

# Medical Assistance Helper - Local Server Test Script
# This script starts a local server and runs basic tests

set -e

echo "======================================"
echo "Medical Assistance Helper - Server Test"
echo "======================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if port is in use
check_port() {
    if lsof -Pi :8080 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
        echo -e "${YELLOW}Port 8080 is already in use${NC}"
        echo "Killing existing process..."
        kill $(lsof -t -i:8080) 2>/dev/null || true
        sleep 2
    fi
}

# Function to start server
start_server() {
    echo -e "${YELLOW}Starting HTTP server on port 8080...${NC}"
    check_port
    
    # Start Python HTTP server in background
    python3 -m http.server 8080 > /tmp/server.log 2>&1 &
    SERVER_PID=$!
    echo "Server PID: $SERVER_PID"
    
    # Wait for server to start
    sleep 3
    
    # Check if server is running
    if ! ps -p $SERVER_PID > /dev/null; then
        echo -e "${RED}Failed to start server${NC}"
        cat /tmp/server.log
        exit 1
    fi
    
    echo -e "${GREEN}✓ Server started successfully${NC}"
}

# Function to test endpoint
test_endpoint() {
    local url=$1
    local description=$2
    
    echo -n "Testing $description... "
    
    if curl -s -o /dev/null -w "%{http_code}" "$url" | grep -q "200\|301\|302"; then
        echo -e "${GREEN}✓ PASSED${NC}"
        return 0
    else
        echo -e "${RED}✗ FAILED${NC}"
        return 1
    fi
}

# Function to cleanup
cleanup() {
    echo ""
    echo "Cleaning up..."
    if [ ! -z "$SERVER_PID" ] && ps -p $SERVER_PID > /dev/null; then
        kill $SERVER_PID 2>/dev/null || true
    fi
    # Kill any remaining processes on port 8080
    lsof -ti:8080 | xargs kill -9 2>/dev/null || true
    echo -e "${GREEN}Cleanup complete${NC}"
}

# Set trap to cleanup on exit
trap cleanup EXIT

# Main test execution
main() {
    # Start the server
    start_server
    
    echo ""
    echo "======================================"
    echo "Running Tests"
    echo "======================================"
    echo ""
    
    # Test main page
    test_endpoint "http://localhost:8080/" "Main page (index.html)"
    
    # Test donation page
    test_endpoint "http://localhost:8080/donation.html" "Donation page"
    
    # Test static assets
    test_endpoint "http://localhost:8080/styles.css" "CSS stylesheet"
    test_endpoint "http://localhost:8080/script.js" "Main JavaScript"
    test_endpoint "http://localhost:8080/manifest.json" "PWA manifest"
    test_endpoint "http://localhost:8080/service-worker.js" "Service worker"
    
    # Test JavaScript modules
    test_endpoint "http://localhost:8080/ai-assistant.js" "AI assistant module"
    test_endpoint "http://localhost:8080/location-services.js" "Location services module"
    test_endpoint "http://localhost:8080/smart-search.js" "Smart search module"
    
    echo ""
    echo "======================================"
    echo "Additional Checks"
    echo "======================================"
    echo ""
    
    # Check if HTML contains expected content
    echo -n "Checking main page content... "
    if curl -s "http://localhost:8080/" | grep -q "Medical Assistance Helper"; then
        echo -e "${GREEN}✓ PASSED${NC}"
    else
        echo -e "${RED}✗ FAILED${NC}"
    fi
    
    # Check service worker registration
    echo -n "Checking service worker content... "
    if curl -s "http://localhost:8080/service-worker.js" | grep -q "CACHE_NAME"; then
        echo -e "${GREEN}✓ PASSED${NC}"
    else
        echo -e "${RED}✗ FAILED${NC}"
    fi
    
    # Display server access information
    echo ""
    echo "======================================"
    echo "Server Information"
    echo "======================================"
    echo ""
    echo "Server is running at:"
    echo -e "${GREEN}http://localhost:8080/${NC}"
    echo ""
    echo "You can access the application in your browser at the above URL."
    echo ""
    echo "Press Ctrl+C to stop the server and exit."
    echo ""
    
    # Keep server running
    wait $SERVER_PID
}

# Run main function
main
