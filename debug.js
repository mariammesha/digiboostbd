const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Capture console messages
    page.on('console', msg => {
      console.log(`[PAGE CONSOLE] ${msg.type().toUpperCase()}: ${msg.text()}`);
    });
    
    // Capture page errors (unhandled exceptions)
    page.on('pageerror', error => {
      console.log(`[PAGE ERROR]: ${error.message}`);
    });
    
    // Capture failed requests
    page.on('requestfailed', request => {
      console.log(`[REQUEST FAILED]: ${request.url()} - ${request.failure()?.errorText}`);
    });

    console.log('Navigating to http://localhost:3001/ ...');
    await page.goto('http://localhost:3001/', { waitUntil: 'networkidle0', timeout: 30000 });
    console.log('Page loaded successfully.');
    
    // Check if the page is empty (white screen)
    const bodyContent = await page.evaluate(() => document.body.innerHTML);
    if (!bodyContent || bodyContent.trim() === '') {
        console.log('[PAGE STATUS]: Body is empty! (White screen confirmed)');
    } else {
        console.log('[PAGE STATUS]: Body has content. Length:', bodyContent.length);
    }
    
    await browser.close();
  } catch (err) {
    console.error('Puppeteer Script Error:', err);
    process.exit(1);
  }
})();
