import { createSafeMarkdown } from '../lib/utils';
import { renderMarkdown } from '../lib/markdown';

export function ChangelogSection(changelog: string): HTMLElement {
  const section = document.createElement('section');
  section.className = 'bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8 animate-slide-up';

  const safeMarkdown = createSafeMarkdown(changelog);

  if (!safeMarkdown) {
    section.innerHTML = `
      <div class="text-center py-12">
        <div class="text-4xl mb-3">📝</div>
        <p class="text-gray-500 dark:text-gray-400 text-sm">Changelog is currently unavailable.</p>
      </div>
    `;
    return section;
  }

  section.innerHTML = `
    <div class="flex items-start justify-between mb-6 pb-4 border-b border-gray-100 dark:border-gray-700">
      <div class="mb-1">
        <h2 class="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
          <span class="text-2xl">📝</span>
          <span class="text-3xl">Changelog</span>
        </h2>
        <p class="text-gray-500 dark:text-gray-400">
          Recent Changes and Enhancements
        </p>
      </div>
    </div>
    
    <div class="changelog-content">
      ${renderMarkdown(safeMarkdown)}
    </div>
  `;

  return section;
}