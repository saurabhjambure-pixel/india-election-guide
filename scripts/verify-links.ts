import { isAllowedUrl } from '../src/data/civic-data';

// A lightweight script to run in CI to verify allowed official links don't return 404s
async function verifyLinks() {
  const ALLOWED_SOURCE_DOMAINS = [
    'eci.gov.in',
    'voters.eci.gov.in',
    'ecisveep.nic.in',
    'electoralsearch.eci.gov.in',
  ]
  
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
      const response = await fetch(url, { method: 'HEAD', headers: { 'User-Agent': 'IndiaElectionGuide/1.0' } });
      
      // ECI sites sometimes block bot HEAD requests, so a 403/401 is considered "up" enough for a simple ping
      if (!response.ok && response.status !== 403 && response.status !== 401 && response.status !== 405) {
        console.error(`❌ ${url} returned status ${response.status}`);
        hasError = true;
      } else {
        console.log(`✅ ${url} is up.`);
      }
    } catch (err: any) {
      console.error(`❌ Failed to fetch ${url}: ${err.message}`);
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
