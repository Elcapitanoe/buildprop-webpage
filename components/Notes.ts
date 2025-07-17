export function Notes(): HTMLElement {
  const div = document.createElement('div');
  div.className = 'bg-[#FFF8E1] dark:bg-yellow-900/20 text-gray-700 dark:text-gray-300 rounded-xl shadow-sm border border-gray-200 dark:border-yellow-800/30 p-5 mb-8';
  
  div.innerHTML = `
    <p class="font-semibold">Note:</p>
    <p>
      This page doesn't update automatically due to GitHub limitations. To view the latest version, try refreshing your browser two or more times if needed. You can check the last update at the bottom of the page, or visit my GitHub release page by clicking the "Previous Builds" button below.  
    </p>
  `;

  return div;
}