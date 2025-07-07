import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//api.github.com" />
        <link rel="dns-prefetch" href="//raw.githubusercontent.com" />
        
        {/* Preconnect to critical external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Google Fonts - moved from Layout component */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" 
          rel="stylesheet" 
        />
        
        {/* Critical CSS for font loading and layout stability */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Font display optimization */
            @font-face {
              font-family: 'Inter';
              font-display: swap;
            }
            @font-face {
              font-family: 'JetBrains Mono';
              font-display: swap;
            }
            
            /* Prevent layout shift */
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
            
            /* Hide development overlays in production */
            #__next-build-watcher,
            .__next-dev-overlay,
            .__next-dev-overlay-backdrop,
            [data-nextjs-dialog],
            [data-nextjs-dialog-backdrop],
            [data-nextjs-toast],
            .__next-build-indicator {
              display: none !important;
              visibility: hidden !important;
              opacity: 0 !important;
              pointer-events: none !important;
            }
            
            /* Loading state */
            .loading {
              opacity: 0;
              transition: opacity 0.3s ease-in-out;
            }
            
            .loaded {
              opacity: 1;
            }
          `
        }} />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}