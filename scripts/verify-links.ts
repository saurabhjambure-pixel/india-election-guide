import { isAllowedUrl } from '../src/data/civic-data';

// A lightweight script to run in CI to verify allowed official links don't return 404s
async function verifyLinks() {
  
  // Just some sample high-value links to check to verify the domains are up
  const linksToCheck = [
    'https://voters.eci.gov.in/',
    'https://electoralsearch.eci.gov.in/',
    'https://eci.gov.in/',
  ];
  
  let hasError = false;

  for (const url of linksToCheck) {
    if (!isAllowedUrl(url)) {
       console.error(`URL not allowed: ${url}`);
       hasError = true;
       continue;
    }

    try {
      console.log(`Checking ${url}...`);
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout
      
      const response = await fetch(url, { 
        method: 'HEAD', 
        headers: { 'User-Agent': 'IndiaElectionGuide/1.0' },
        signal: controller.signal
      });
      clearTimeout(timeout);
      
      // ECI sites sometimes block bot HEAD requests, so a 403/401/405 is considered "up" enough for a simple ping
      if (!response.ok && response.status !== 403 && response.status !== 401 && response.status !== 405) {
        console.error(`❌ ${url} returned status ${response.status}`);
        hasError = true;
      } else {
        console.log(`✅ ${url} is up.`);
      }
    } catch (err: unknown) {
      const error = err as Error;
      console.error(`❌ Failed to fetch ${url}: ${error.message}`);
      hasError = true;
    }
  }

  if (hasError) {
    console.error('Link verification failed.');
    process.exit(1);
  } else {
    console.log('Link verification passed.');
    process.exit(0);
  }
}

verifyLinks();
