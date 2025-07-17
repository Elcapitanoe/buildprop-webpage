import { initializeTheme } from './theme';
import { renderApp } from './app';
import type { PageProps } from '../lib/types';
import {
  fetchReleases,
  fetchChangelog,
  fetchRateLimit,
  findLatestStableRelease,
} from '../lib/github-api';

// Initialize theme system
initializeTheme();

// Main application initialization
async function main() {
  const loadingEl = document.getElementById('loading');
  const contentEl = document.getElementById('content');
  const errorEl = document.getElementById('error');
  const errorMessageEl = document.getElementById('error-message');
  const retryBtn = document.getElementById('retry-btn');

  if (!loadingEl || !contentEl || !errorEl || !errorMessageEl || !retryBtn) {
    console.error('Required DOM elements not found');
    return;
  }

  const showError = (message: string) => {
    loadingEl.classList.add('hidden');
    contentEl.classList.add('hidden');
    errorEl.classList.remove('hidden');
    errorMessageEl.textContent = message;
  };

  const showContent = (props: PageProps) => {
    loadingEl.classList.add('hidden');
    errorEl.classList.add('hidden');
    contentEl.classList.remove('hidden');
    renderApp(contentEl, props);
  };

  const loadData = async () => {
    const startTime = Date.now();

    try {
      loadingEl.classList.remove('hidden');
      contentEl.classList.add('hidden');
      errorEl.classList.add('hidden');

      const [releasesResult, changelogResult, rateLimitResult] = await Promise.allSettled([
        fetchReleases(),
        fetchChangelog(),
        fetchRateLimit(),
      ]);

      let latestRelease = null;
      let allReleases: any[] = [];
      let finalRateLimit = {
        limit: 0,
        remaining: 0,
        reset: 'Unknown',
      };

      if (releasesResult.status === 'fulfilled') {
        latestRelease = findLatestStableRelease(releasesResult.value.data);
        allReleases = releasesResult.value.data;
        finalRateLimit = releasesResult.value.rateLimit;
      } else {
        console.error('Failed to fetch releases:', releasesResult.reason);
      }

      const finalChangelog =
        changelogResult.status === 'fulfilled'
          ? changelogResult.value
          : '# Changelog\n\nChangelog is currently unavailable. Please check back later.';

      // Debug changelog result
      if (changelogResult.status === 'rejected') {
        console.error('Changelog fetch failed in main:', changelogResult.reason);
      } else {
        console.log('Changelog loaded successfully in main, length:', finalChangelog.length);
      }

      if (rateLimitResult.status === 'fulfilled') {
        finalRateLimit = rateLimitResult.value;
      }

      const lastUpdated = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Jakarta',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }) + ' (UTC+7)';

      const buildTime = Date.now() - startTime;
      console.log(`Data loaded in ${buildTime}ms`);

      showContent({
        changelog: finalChangelog,
        release: latestRelease,
        releases: allReleases,
        rateLimit: finalRateLimit,
        lastUpdated,
      });
    } catch (error) {
      console.error('Critical error loading data:', error);
      showError('Unable to load data. Please try again later.');
    }
  };

  // Retry button handler
  retryBtn.addEventListener('click', loadData);

  // Initial load
  await loadData();
}

// Start the application
main().catch(console.error);