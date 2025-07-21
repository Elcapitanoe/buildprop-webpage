import type { Commit } from '../lib/types';
import { formatDate } from '../lib/utils';
import { fetchCommits } from '../lib/github-api';

const HistoryIcon: string = `
  <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-6.219-8.56M12 3v1m-9 8H2"></path>
  </svg>
`;

const CommitIcon: string = `
  <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
`;

const ChevronLeftIcon: string = `
  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
  </svg>
`;

const ChevronRightIcon: string = `
  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
  </svg>
`;

function truncateCommitMessage(message: string, maxLength: number = 80): string {
  const firstLine = message.split('\n')[0] || '';
  if (firstLine.length <= maxLength) return firstLine;
  return firstLine.slice(0, maxLength).trim() + '...';
}

function renderCommitItem(commit: Commit): string {
  const shortSha = commit.sha.substring(0, 7);
  const commitMessage = truncateCommitMessage(commit.commit.message);
  const authorName = commit.author?.login || commit.commit.author.name;
  const authorAvatar = commit.author?.avatar_url || `https://github.com/identicons/${authorName}.png`;
  const commitDate = formatDate(commit.commit.author.date);

  return `
    <div class="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
      <div class="flex-shrink-0">
        ${CommitIcon}
      </div>
      
      <div class="flex-1 min-w-0">
        <div class="flex items-start justify-between gap-4 mb-2">
          <h4 class="font-medium text-gray-900 dark:text-white leading-tight max-w-none break-words overflow-x-auto">
            ${commitMessage}
          </h4>
          <a
            href="${commit.html_url}"
            target="_blank"
            rel="noopener noreferrer"
            class="flex-shrink-0 px-2 py-1 text-xs font-mono bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
            title="View commit on GitHub"
          >
            ${shortSha}
          </a>
        </div>
        
        <div class="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
          <div class="flex items-center gap-2">
            <img
              src="${authorAvatar}"
              alt="${authorName}"
              class="w-5 h-5 rounded-full"
              loading="lazy"
            />
            <span class="font-medium">${authorName}</span>
          </div>
          <span>•</span>
          <time datetime="${commit.commit.author.date}">
            ${commitDate}
          </time>
        </div>
      </div>
    </div>
  `;
}

function renderPagination(currentPage: number, hasNextPage: boolean): string {
  const pages = [];
  const maxVisiblePages = 3;
  
  // Calculate page range
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(startPage + maxVisiblePages - 1, currentPage + 2);
  
  // Adjust start page if we're near the end
  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  // Previous button
  if (currentPage > 1) {
    pages.push(`
      <button
        class="pagination-btn flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        data-page="${currentPage - 1}"
        aria-label="Previous page"
      >
        ${ChevronLeftIcon}
        Previous
      </button>
    `);
  }

  // Page numbers
  for (let i = startPage; i <= endPage; i++) {
    const isActive = i === currentPage;
    pages.push(`
      <button
        class="pagination-btn px-3 py-2 text-sm font-medium ${
          isActive
            ? 'text-white bg-primary-600 border-primary-600'
            : 'text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-300'
        } border rounded-md transition-colors"
        data-page="${i}"
        ${isActive ? 'aria-current="page"' : ''}
      >
        ${i}
      </button>
    `);
  }

  // Next button
  if (hasNextPage) {
    pages.push(`
      <button
        class="pagination-btn flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        data-page="${currentPage + 1}"
        aria-label="Next page"
      >
        Next
        ${ChevronRightIcon}
      </button>
    `);
  }

  return `
    <div class="flex items-center justify-center gap-2 pt-6 border-t border-gray-100 dark:border-gray-700">
      ${pages.join('')}
    </div>
  `;
}

export function CommitHistory(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-8 animate-slide-up';
  section.id = 'commit-history-section';

  let currentPage = 1;
  let isLoading = false;

  const loadCommits = async (page: number) => {
    if (isLoading) return;
    
    isLoading = true;
    const loadingEl = section.querySelector('#commits-loading');
    const contentEl = section.querySelector('#commits-content');
    const errorEl = section.querySelector('#commits-error');

    if (loadingEl) loadingEl.classList.remove('hidden');
    if (contentEl) contentEl.classList.add('hidden');
    if (errorEl) errorEl.classList.add('hidden');

    try {
      const response = await fetchCommits(page, 10);
      const commits = response.data as Commit[];
      
      currentPage = page;
      
      // Check if there are more commits (simple heuristic)
      const hasNextPage = commits.length === 10;
      
      if (contentEl) {
        contentEl.innerHTML = `
          <div class="space-y-4 mb-6">
            ${commits.map(commit => renderCommitItem(commit)).join('')}
          </div>
          ${renderPagination(currentPage, hasNextPage)}
        `;
        
        // Add event listeners to pagination buttons
        const paginationBtns = contentEl.querySelectorAll('.pagination-btn');
        paginationBtns.forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = parseInt((e.currentTarget as HTMLElement).dataset.page || '1');
            loadCommits(targetPage);
          });
        });
        
        contentEl.classList.remove('hidden');
      }
      
      if (loadingEl) loadingEl.classList.add('hidden');
    } catch (error) {
      console.error('Failed to load commits:', error);
      
      if (errorEl) {
        errorEl.innerHTML = `
          <div class="text-center py-8">
            <p class="text-gray-600 dark:text-gray-400 mb-4">Failed to load commit history</p>
            <button
              id="retry-commits"
              class="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        `;
        
        const retryBtn = errorEl.querySelector('#retry-commits');
        if (retryBtn) {
          retryBtn.addEventListener('click', () => loadCommits(page));
        }
        
        errorEl.classList.remove('hidden');
      }
      
      if (loadingEl) loadingEl.classList.add('hidden');
      if (contentEl) contentEl.classList.add('hidden');
    } finally {
      isLoading = false;
    }
  };

  section.innerHTML = `
    <div class="flex items-start justify-between mb-6 pb-4 border-b border-gray-100 dark:border-gray-700">
      <div class="flex-1">
        <h2 class="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
          <span class="text-2xl" role="img" aria-label="History">📝</span>
          <span class="text-3xl">Commit History</span>
        </h2>
        <p class="text-gray-600 dark:text-gray-300">
          Recent development activity and changes to the project.
        </p>
      </div>
    </div>

    <!-- Loading State -->
    <div id="commits-loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
      <p class="text-gray-600 dark:text-gray-400">Loading commits...</p>
    </div>

    <!-- Content -->
    <div id="commits-content" class="hidden"></div>

    <!-- Error State -->
    <div id="commits-error" class="hidden"></div>
  `;

  // Load initial commits
  loadCommits(1);

  return section;
}