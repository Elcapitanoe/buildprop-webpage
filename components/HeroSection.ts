import type { Release } from '../lib/types';

export function HeroSection(release: Release | null, releases: Release[] = []): HTMLElement {
  const section = document.createElement('section');
  section.className = 'text-center py-8 px-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8 animate-fade-in';


  section.innerHTML = `
    <h1 class="text-4xl md:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-4 leading-tight">
      KOMODO BUILD PROP
    </h1>
    <p class="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
      A module to spoof your device as a Google Pixel 9 Pro XL
    </p>
  `;

  return section;
}
