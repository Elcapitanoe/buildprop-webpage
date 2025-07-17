export interface ThemeSystem {
  getTheme(): 'light' | 'dark';
  setTheme(theme: 'light' | 'dark'): void;
  toggleTheme(): void;
  onThemeChange(callback: (theme: 'light' | 'dark') => void): () => void;
}

class ThemeManager implements ThemeSystem {
  private callbacks: Set<(theme: 'light' | 'dark') => void> = new Set();
  private mediaQuery: MediaQueryList;

  constructor() {
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.mediaQuery.addEventListener('change', this.handleSystemThemeChange.bind(this));
  }

  private handleSystemThemeChange = () => {
    // Only update if no manual preference is stored
    if (!localStorage.getItem('theme')) {
      this.applyTheme(this.getSystemTheme());
    }
  };

  private getSystemTheme(): 'light' | 'dark' {
    return this.mediaQuery.matches ? 'dark' : 'light';
  }

  private applyTheme(theme: 'light' | 'dark') {
    const html = document.documentElement;
    html.classList.toggle('dark', theme === 'dark');
    html.setAttribute('data-theme', theme);
    
    // Update theme-color meta tag
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', theme === 'dark' ? '#1f2937' : '#3b82f6');
    }

    // Notify callbacks
    this.callbacks.forEach(callback => callback(theme));
  }

  getTheme(): 'light' | 'dark' {
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
    return stored || this.getSystemTheme();
  }

  setTheme(theme: 'light' | 'dark'): void {
    localStorage.setItem('theme', theme);
    this.applyTheme(theme);
  }

  toggleTheme(): void {
    const current = this.getTheme();
    this.setTheme(current === 'light' ? 'dark' : 'light');
  }

  onThemeChange(callback: (theme: 'light' | 'dark') => void): () => void {
    this.callbacks.add(callback);
    return () => this.callbacks.delete(callback);
  }
}

let themeManager: ThemeManager;

export function initializeTheme(): ThemeSystem {
  if (!themeManager) {
    themeManager = new ThemeManager();
    
    // Set up theme toggle button
    const toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', () => {
        themeManager.toggleTheme();
      });
    }
  }
  
  return themeManager;
}

export function getThemeManager(): ThemeSystem {
  if (!themeManager) {
    throw new Error('Theme manager not initialized. Call initializeTheme() first.');
  }
  return themeManager;
}