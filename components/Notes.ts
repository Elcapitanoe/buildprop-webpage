export function Notes(): HTMLElement {
  const div = document.createElement('div');
  div.className = 'bg-[#FFF8E1] dark:bg-yellow-900/20 text-gray-700 dark:text-gray-300 rounded-xl shadow-sm border border-gray-200 dark:border-yellow-800/30 p-5 mb-8';
  
  div.innerHTML = `
    <p class="font-semibold">Note:</p>
    <p>
      This page refreshes every hour. However, due to GitHub limitations, the latest content may not appear immediately. You can check the timestamp of the latest deployment at the bottom of the page or visit the GitHub release page by clicking the “Previous Builds” button below.
    </p>
  `;

  return div;
}