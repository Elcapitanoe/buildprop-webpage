import type { Release } from '../lib/types';
import { formatDate, formatFileSize, formatDownloadCount, createSafeMarkdown } from '../lib/utils';
import { renderMarkdown } from '../lib/markdown';

const DownloadIcon = `
  <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
  </svg>
`;

const CloudDownloadIcon = `
  <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
  </svg>
`;

const HistoryIcon = `
  <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-6.219-8.56M12 3v1m-9 8H2"></path>
  </svg>
`;

export function ReleaseSection(release: Release): HTMLElement {
  const section = document.createElement('section');
  section.className = 'bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-8 animate-slide-up';

  const safeMarkdown = createSafeMarkdown(release.body);

  section.innerHTML = `
    <div class="flex items-start justify-between mb-6 pb-4 border-b border-gray-100 dark:border-gray-700">
      <div class="flex-1">
        <h2 class="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
          <span class="text-2xl" role="img" aria-label="Rocket">🚀</span>
          <span class="text-3xl">Latest Release</span>
        </h2>
        <p class="text-gray-600 dark:text-gray-300">
          Download the latest build with improvements.
        </p>
      </div>
    </div>

    <div class="space-y-6">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
          Build: ${release.name}
        </h3>

        <div class="w-fit">
          <time 
            class="inline-flex max-w-full md:max-w-max items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 border border-primary-300 dark:border-primary-700"
            datetime="${release.published_at}"
          >
            Released on ${formatDate(release.published_at)}
          </time>
        </div>
      </div>
      
      ${safeMarkdown ? `
        <div class="prose prose-gray dark:prose-invert max-w-none break-words overflow-x-auto" id="release-content">
          ${renderMarkdown(safeMarkdown)}
        </div>
      ` : ''}
      
      ${release.assets.length > 0 ? `
        <div class="pt-6 border-t border-gray-100 dark:border-gray-700">
          <div class="flex items-center gap-2 mb-4">
            <span class="text-xl" role="img" aria-label="Download">📥</span>
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white">Downloads</h4>
          </div>
          
          <div class="flex flex-col sm:flex-row gap-3">
            ${release.assets.map((asset) => `
              <div class="flex-1 min-w-[200px]">
                <a
                  href="${asset.browser_download_url}"
                  class="flex items-center justify-between w-full p-4 bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download ${asset.name}"
                >
                  <div class="flex items-center gap-3 flex-1 min-w-0">
                    ${DownloadIcon}
                    <div class="flex-1 min-w-0">
                      <div class="font-medium truncate">${asset.name}</div>
                      <div class="text-sm opacity-90">
                        ${formatFileSize(asset.size)}
                        ${asset.download_count > 0 ? ` • ${formatDownloadCount(asset.download_count)} downloads` : ''}
                      </div>
                    </div>
                  </div>
                  ${CloudDownloadIcon}
                </a>
              </div>
            `).join('')}

            <!-- Previous Builds Button -->
            <div class="flex-1 min-w-[200px]">
              <a
                href="https://github.com/Elcapitanoe/Komodo-Build-Prop/releases"
                class="flex items-center justify-between w-full p-4 bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View all previous builds"
              >
                <div class="flex items-center gap-3 flex-1 min-w-0">
                  ${HistoryIcon}
                  <div class="flex-1 min-w-0">
                    <div class="font-medium truncate">Previous Builds</div>
                    <div class="text-sm opacity-90">GitHub Releases</div>
                  </div>
                </div>
                ${CloudDownloadIcon}
              </a>
            </div>
          </div>
        </div>
      ` : ''}
    </div>
  `;

  return section;
}