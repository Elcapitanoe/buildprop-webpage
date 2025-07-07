import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Remove development artifacts in production
    if (process.env.NODE_ENV === 'production') {
      const devElements = document.querySelectorAll(
        '#__next-build-watcher, .__next-dev-overlay, [data-nextjs-dialog]'
      );
      devElements.forEach(el => el.remove());
    }

    // Performance monitoring
    if (typeof window !== 'undefined' && 'performance' in window) {
      window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (perfData) {
          console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }
      });
    }
  }, []);

  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}