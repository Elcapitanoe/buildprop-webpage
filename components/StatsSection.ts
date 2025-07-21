import { formatDownloadCount, calculateTotalDownloadsFromAllReleases } from '../lib/utils';
import { fetchRepoStats, fetchCommitActivity, fetchCodeFrequency, fetchPunchCard } from '../lib/github-api';
import type { Release } from '../lib/types';

interface RepoStats {
  readonly stargazers_count: number;
  readonly open_issues_count: number;
  readonly forks_count: number;
  readonly watchers_count: number;
  readonly subscribers_count: number;
}

interface CommitActivity {
  readonly total: number;
  readonly week: number;
  readonly days: readonly number[];
}

interface CodeFrequency {
  readonly week: number;
  readonly additions: number;
  readonly deletions: number;
}

interface PunchCardData {
  readonly day: number;
  readonly hour: number;
  readonly commits: number;
}

const StatsIcon: string = `
  <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
  </svg>
`;

const StarIcon: string = `
  <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
  </svg>
`;

const IssueIcon: string = `
  <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
`;

const ForkIcon: string = `
  <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path>
  </svg>
`;

const ActivityIcon: string = `
  <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18M13 8l4-4m0 0l-4-4m4 4H3"></path>
  </svg>
`;

const DownloadIcon: string = `
  <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
  </svg>
`;

const WatchIcon: string = `
  <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
  </svg>
`;

const ReleaseIcon: string = `
  <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
  </svg>
`;

function renderStatCard(icon: string, value: string, label: string, color: string = 'primary'): string {
  return `
    <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
      <div class="flex items-center gap-3 mb-2">
        <div class="text-${color}-600 dark:text-${color}-400">
          ${icon}
        </div>
        <div class="text-2xl font-semibold text-gray-900 dark:text-white">
          ${value}
        </div>
      </div>
      <div class="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">
        ${label}
      </div>
    </div>
  `;
}

function renderCommitActivityChart(activity: CommitActivity[]): string {
  if (!activity || activity.length === 0) {
    return '<p class="text-gray-500 dark:text-gray-400 text-center py-4">No activity data available</p>';
  }

  const maxCommits = Math.max(...activity.map(week => week.total));
  const weeks = activity.slice(-4); // Last 4 weeks

  return `
    <div class="space-y-3">
      <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Weekly Commit Activity (Last 4 weeks)</h4>
      <div class="flex items-end gap-2 h-24 px-2">
        ${weeks.map((week, index) => {
          const height = maxCommits > 0 ? (week.total / maxCommits) * 100 : 0;
          const date = new Date(week.week * 1000);
          return `
            <div class="flex-1 flex flex-col items-center gap-1 min-w-0">
              <div 
                class="w-full bg-primary-500 dark:bg-primary-400 rounded-sm transition-all hover:bg-primary-600 dark:hover:bg-primary-300 min-h-[4px]"
                style="height: ${height}%"
                title="${week.total} commits - Week of ${date.toLocaleDateString()}"
              ></div>
              <div class="text-xs text-gray-400 dark:text-gray-500 text-center leading-tight">
                <div class="hidden sm:block">${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                <div class="sm:hidden">${date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' })}</div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function renderCodeFrequencyChart(frequency: CodeFrequency[]): string {
  if (!frequency || frequency.length === 0) {
    return '<p class="text-gray-500 dark:text-gray-400 text-center py-4">No code frequency data available</p>';
  }

  const weeks = frequency.slice(-4); // Last 4 weeks
  const maxValue = Math.max(...weeks.flatMap(week => [week.additions, Math.abs(week.deletions)]));

  return `
    <div class="space-y-3">
      <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Code Changes (Last 4 weeks)</h4>
      <div class="space-y-2">
        ${weeks.map(week => {
          const date = new Date(week.week * 1000);
          const additionWidth = maxValue > 0 ? (week.additions / maxValue) * 100 : 0;
          const deletionWidth = maxValue > 0 ? (Math.abs(week.deletions) / maxValue) * 100 : 0;
          
          return `
            <div class="space-y-1">
              <div class="text-xs text-gray-500 dark:text-gray-400">
                <span class="hidden sm:inline">${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span><span class="sm:hidden">${date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' })}</span>
              </div>
              <div class="flex gap-1">
                <div class="flex-1">
                  <div 
                    class="h-3 bg-green-500 dark:bg-green-400 rounded-sm"
                    style="width: ${additionWidth}%"
                    title="+${week.additions} additions"
                  ></div>
                </div>
                <div class="flex-1">
                  <div 
                    class="h-3 bg-red-500 dark:bg-red-400 rounded-sm ml-auto"
                    style="width: ${deletionWidth}%"
                    title="-${Math.abs(week.deletions)} deletions"
                  ></div>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
      <div class="flex justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
        <div class="flex items-center gap-1">
          <div class="w-3 h-3 bg-green-500 dark:bg-green-400 rounded-sm"></div>
          <span>Additions</span>
        </div>
        <div class="flex items-center gap-1">
          <div class="w-3 h-3 bg-red-500 dark:bg-red-400 rounded-sm"></div>
          <span>Deletions</span>
        </div>
      </div>
    </div>
  `;
}

function renderPunchCard(punchCard: PunchCardData[]): string {
  if (!punchCard || punchCard.length === 0) {
    return '<p class="text-gray-500 dark:text-gray-400 text-center py-4">No punch card data available</p>';
  }

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const maxCommits = Math.max(...punchCard.map(item => item.commits));

  return `
    <div class="space-y-3">
      <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Commit Punch Card</h4>
      <div class="overflow-x-auto">
        <div class="grid grid-cols-25 gap-1 min-w-[600px]">
          <!-- Header row with hours -->
          <div></div>
          ${hours.map(hour => `
            <div class="text-xs text-gray-400 dark:text-gray-500 text-center p-1">
              ${hour}
            </div>
          `).join('')}
          
          <!-- Data rows -->
          ${days.map((day, dayIndex) => `
            <div class="text-xs text-gray-400 dark:text-gray-500 text-right p-1 font-medium">
              ${day}
            </div>
            ${hours.map(hour => {
              const dataPoint = punchCard.find(item => item.day === dayIndex && item.hour === hour);
              const commits = dataPoint ? dataPoint.commits : 0;
              const intensity = maxCommits > 0 ? commits / maxCommits : 0;
              const opacity = Math.max(0.1, intensity);
              
              return `
                <div 
                  class="w-4 h-4 rounded-sm bg-primary-500 dark:bg-primary-400 transition-all hover:scale-110"
                  style="opacity: ${opacity}"
                  title="${commits} commits on ${day} at ${hour}:00"
                ></div>
              `;
            }).join('')}
          `).join('')}
        </div>
      </div>
      <div class="text-xs text-gray-500 dark:text-gray-400 text-center">
        Darker squares indicate more commits at that time
      </div>
    </div>
  `;
}

export function StatsSection(releases: Release[] = []): HTMLElement {
  const section = document.createElement('section');
  section.className = 'bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-8 animate-slide-up';
  section.id = 'stats-section';

  let isLoading = false;

  const loadStats = async () => {
    if (isLoading) return;
    
    isLoading = true;
    const loadingEl = section.querySelector('#stats-loading');
    const contentEl = section.querySelector('#stats-content');
    const errorEl = section.querySelector('#stats-error');

    if (loadingEl) loadingEl.classList.remove('hidden');
    if (contentEl) contentEl.classList.add('hidden');
    if (errorEl) errorEl.classList.add('hidden');

    try {
      const [repoStatsResult, commitActivityResult, codeFrequencyResult, punchCardResult] = await Promise.allSettled([
        fetchRepoStats(),
        fetchCommitActivity(),
        fetchCodeFrequency(),
        fetchPunchCard(),
      ]);

      let repoStats: RepoStats | null = null;
      let commitActivity: CommitActivity[] = [];
      let codeFrequency: CodeFrequency[] = [];
      let punchCard: PunchCardData[] = [];

      if (repoStatsResult.status === 'fulfilled') {
        repoStats = repoStatsResult.value.data;
      }

      if (commitActivityResult.status === 'fulfilled') {
        commitActivity = commitActivityResult.value.data;
      }

      if (codeFrequencyResult.status === 'fulfilled') {
        codeFrequency = codeFrequencyResult.value.data;
      }

      if (punchCardResult.status === 'fulfilled') {
        punchCard = punchCardResult.value.data;
      }

      const totalDownloadsAll = releases.length > 0 ? calculateTotalDownloadsFromAllReleases(releases) : 0;

      if (contentEl) {
        contentEl.innerHTML = `
          <!-- Basic Stats Grid -->
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            ${renderStatCard(StarIcon, formatDownloadCount(repoStats?.stargazers_count || 0), 'Stars', 'yellow')}
            ${renderStatCard(IssueIcon, formatDownloadCount(repoStats?.open_issues_count || 0), 'Open Issues', 'red')}
            ${renderStatCard(ForkIcon, formatDownloadCount(repoStats?.forks_count || 0), 'Forks', 'blue')}
            ${renderStatCard(DownloadIcon, formatDownloadCount(totalDownloadsAll), 'Downloads', 'green')}
            ${renderStatCard(WatchIcon, formatDownloadCount(repoStats?.watchers_count || 0), 'Watchers', 'purple')}
            ${renderStatCard(ReleaseIcon, releases.length.toString(), 'Releases', 'indigo')}
          </div>

          <!-- Charts Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Commit Activity Chart -->
            <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
              ${renderCommitActivityChart(commitActivity)}
            </div>

            <!-- Code Frequency Chart -->
            <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
              ${renderCodeFrequencyChart(codeFrequency)}
            </div>
          </div>

          <!-- Punch Card -->
          <div class="mt-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
            ${renderPunchCard(punchCard)}
          </div>
        `;
        
        contentEl.classList.remove('hidden');
      }
      
      if (loadingEl) loadingEl.classList.add('hidden');
    } catch (error) {
      console.error('Failed to load stats:', error);
      
      if (errorEl) {
        errorEl.innerHTML = `
          <div class="text-center py-8">
            <p class="text-gray-600 dark:text-gray-400 mb-4">Failed to load repository statistics</p>
            <button
              id="retry-stats"
              class="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        `;
        
        const retryBtn = errorEl.querySelector('#retry-stats');
        if (retryBtn) {
          retryBtn.addEventListener('click', () => loadStats());
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
          <span class="text-2xl" role="img" aria-label="Stats">📊</span>
          <span class="text-3xl">Repository Statistics</span>
        </h2>
        <p class="text-gray-600 dark:text-gray-300">
          Insights and analytics about the project's development activity.
        </p>
      </div>
    </div>

    <!-- Loading State -->
    <div id="stats-loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
      <p class="text-gray-600 dark:text-gray-400">Loading statistics...</p>
    </div>

    <!-- Content -->
    <div id="stats-content" class="hidden"></div>

    <!-- Error State -->
    <div id="stats-error" class="hidden"></div>
  `;

  // Load initial stats
  loadStats();

  return section;
}