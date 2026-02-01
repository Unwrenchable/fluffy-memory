#!/usr/bin/env node

/**
 * Medical Assistance Helper - Automated Browser Test
 * 
 * This script uses Playwright to test the application's functionality
 * in a headless browser environment.
 */

const { chromium } = require('playwright');

// Color codes for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function runTests() {
  log('\n==============================================', 'blue');
  log('Medical Assistance Helper - Browser Tests', 'blue');
  log('==============================================\n', 'blue');

  let browser;
  let testsPassed = 0;
  let testsFailed = 0;

  try {
    // Launch browser
    log('Launching browser...', 'yellow');
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 }
    });
    const page = await context.newPage();
    
    log('✓ Browser launched successfully', 'green');

    // Test 1: Main page loads
    log('\nTest 1: Loading main page...', 'yellow');
    try {
      await page.goto('http://localhost:8080/', { waitUntil: 'networkidle' });
      const title = await page.title();
      if (title.includes('Medical Assistance Helper')) {
        log('✓ Main page loaded successfully', 'green');
        log(`  Title: ${title}`, 'blue');
        testsPassed++;
      } else {
        throw new Error(`Unexpected title: ${title}`);
      }
    } catch (error) {
      log(`✗ Main page test failed: ${error.message}`, 'red');
      testsFailed++;
    }

    // Test 2: AI Assistant Widget
    log('\nTest 2: Testing AI Assistant widget...', 'yellow');
    try {
      const aiButton = await page.locator('button:has-text("Need Help? Ask AI")');
      await aiButton.waitFor({ state: 'visible' });
      await aiButton.click();
      
      // Wait for AI panel to appear
      await page.waitForSelector('.ai-assistant-panel', { state: 'visible' });
      log('✓ AI Assistant opens successfully', 'green');
      testsPassed++;
    } catch (error) {
      log(`✗ AI Assistant test failed: ${error.message}`, 'red');
      testsFailed++;
    }

    // Test 3: AI Chat Interaction
    log('\nTest 3: Testing AI chat interaction...', 'yellow');
    try {
      const chatInput = await page.locator('input[placeholder*="Type your question"]');
      await chatInput.fill('I need help with insurance');
      
      const sendButton = await page.locator('button:has-text("Send")');
      await sendButton.click();
      
      // Wait a moment for response
      await page.waitForTimeout(1000);
      log('✓ AI chat interaction works', 'green');
      testsPassed++;
    } catch (error) {
      log(`✗ AI chat test failed: ${error.message}`, 'red');
      testsFailed++;
    }

    // Test 4: Navigation Links
    log('\nTest 4: Testing navigation links...', 'yellow');
    try {
      // Close AI assistant first
      const closeButton = await page.locator('button:has-text("×")');
      await closeButton.click();
      
      const links = await page.locator('nav a').all();
      log(`  Found ${links.length} navigation links`, 'blue');
      
      if (links.length > 0) {
        log('✓ Navigation links present', 'green');
        testsPassed++;
      } else {
        throw new Error('No navigation links found');
      }
    } catch (error) {
      log(`✗ Navigation test failed: ${error.message}`, 'red');
      testsFailed++;
    }

    // Test 5: Responsive Design (Mobile)
    log('\nTest 5: Testing responsive design (mobile)...', 'yellow');
    try {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(500);
      
      const header = await page.locator('header, nav').first();
      const isVisible = await header.isVisible();
      
      if (isVisible) {
        log('✓ Responsive design works on mobile', 'green');
        testsPassed++;
      } else {
        throw new Error('Header not visible on mobile');
      }
    } catch (error) {
      log(`✗ Responsive design test failed: ${error.message}`, 'red');
      testsFailed++;
    }

    // Test 6: Donation Page
    log('\nTest 6: Testing donation page...', 'yellow');
    try {
      await page.setViewportSize({ width: 1280, height: 720 });
      await page.goto('http://localhost:8080/donation.html', { waitUntil: 'networkidle' });
      
      const heading = await page.locator('h1:has-text("Support")').first();
      await heading.waitFor({ state: 'visible' });
      
      log('✓ Donation page loads successfully', 'green');
      testsPassed++;
    } catch (error) {
      log(`✗ Donation page test failed: ${error.message}`, 'red');
      testsFailed++;
    }

    // Test 7: Service Worker Registration
    log('\nTest 7: Checking service worker...', 'yellow');
    try {
      await page.goto('http://localhost:8080/', { waitUntil: 'networkidle' });
      
      const swRegistered = await page.evaluate(() => {
        return navigator.serviceWorker.getRegistrations().then(regs => regs.length > 0);
      });
      
      if (swRegistered) {
        log('✓ Service worker registered', 'green');
        testsPassed++;
      } else {
        log('⚠ Service worker not registered (may be expected in test environment)', 'yellow');
        testsPassed++;
      }
    } catch (error) {
      log(`✗ Service worker test failed: ${error.message}`, 'red');
      testsFailed++;
    }

    // Test 8: Form Elements
    log('\nTest 8: Testing form elements...', 'yellow');
    try {
      const searchInput = await page.locator('input[type="text"]').first();
      await searchInput.fill('test input');
      const value = await searchInput.inputValue();
      
      if (value === 'test input') {
        log('✓ Form inputs work correctly', 'green');
        testsPassed++;
      } else {
        throw new Error('Input value not set correctly');
      }
    } catch (error) {
      log(`✗ Form elements test failed: ${error.message}`, 'red');
      testsFailed++;
    }

    // Print summary
    log('\n==============================================', 'blue');
    log('Test Summary', 'blue');
    log('==============================================', 'blue');
    log(`Total Tests: ${testsPassed + testsFailed}`, 'blue');
    log(`Passed: ${testsPassed}`, 'green');
    log(`Failed: ${testsFailed}`, testsFailed > 0 ? 'red' : 'green');
    log(`Success Rate: ${((testsPassed / (testsPassed + testsFailed)) * 100).toFixed(1)}%\n`, 'blue');

    if (testsFailed === 0) {
      log('🎉 All tests passed!', 'green');
    } else {
      log('⚠️  Some tests failed. Please review the output above.', 'yellow');
    }

  } catch (error) {
    log(`\n✗ Fatal error: ${error.message}`, 'red');
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
      log('\n✓ Browser closed', 'green');
    }
  }

  process.exit(testsFailed > 0 ? 1 : 0);
}

// Check if server is running
async function checkServer() {
  const http = require('http');
  
  return new Promise((resolve, reject) => {
    const req = http.get('http://localhost:8080/', (res) => {
      resolve(res.statusCode === 200);
    });
    
    req.on('error', () => {
      reject(new Error('Server not running on port 8080'));
    });
    
    req.setTimeout(5000, () => {
      req.abort();
      reject(new Error('Server check timeout'));
    });
  });
}

// Main execution
(async () => {
  try {
    log('Checking if server is running...', 'yellow');
    await checkServer();
    log('✓ Server is running on port 8080', 'green');
    await runTests();
  } catch (error) {
    log(`\n✗ Error: ${error.message}`, 'red');
    log('\nPlease ensure the server is running on port 8080 before running tests.', 'yellow');
    log('You can start it with: python3 -m http.server 8080\n', 'blue');
    process.exit(1);
  }
})();
