import type { Release } from '../lib/types';
import { formatDownloadCount, calculateTotalDownloads, calculateTotalDownloadsFromAllReleases } from '../lib/utils';

export function HeroSection(release: Release | null, releases?: Release[]): HTMLElement {
  const section = document.createElement('section');
  section.className = 'text-center py-12 px-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8 animate-fade-in';

  const totalDownloads = release ? calculateTotalDownloads(release.assets) : 0;
  const totalDownloadsAll = releases?.length ? calculateTotalDownloadsFromAllReleases(releases) : 0;

  section.innerHTML = `
    <h1 class="text-4xl md:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-4 leading-tight">
      KOMODO BUILD PROP
    </h1>
    <p class="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
      A module to spoof your device as a Google Pixel 9 Pro XL
    </p>
    
    ${release ? `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-gray-100 dark:border-gray-700">
        <div class="text-center">
          <div class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-1">
            ${release.tag_name}
          </div>
          <div class="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">
            Latest Version
          </div>
        </div>
        
        <div class="text-center">
          <div class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-1">
            ${totalDownloadsAll > 0 ? formatDownloadCount(totalDownloadsAll) : '0'}
          </div>
          <div class="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">
            Total Downloads
          </div>
        </div>
        
        <div class="text-center">
          <div class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-1">
            ${releases?.length ?? 0}
          </div>
          <div class="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">
           Published Builds
          </div>
        </div>
      </div>
    ` : ''}
  `;

  return section;
}