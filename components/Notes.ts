export function Notes(): HTMLElement {
  const div = document.createElement('div');
  div.className = 'bg-[#FFF8E1] dark:bg-yellow-900/20 text-gray-700 dark:text-gray-300 rounded-xl shadow-sm border border-gray-200 dark:border-yellow-800/30 p-5 mb-8';
  
  div.innerHTML = `
    <p class="font-semibold">Warning:</p>
    <p>
    We are not responsible for any damage to your system including broken boot, corrupted sdcard, or bricked device. Use this module at your own risk. Always make a full backup before applying any modification.
    </p>
  `;

  return div;
}