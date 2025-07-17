import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />

        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//api.github.com" />
        <link rel="dns-prefetch" href="//raw.githubusercontent.com" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />

        <style dangerouslySetInnerHTML={{
          __html: `
            @font-face { font-family: 'Inter'; font-display: swap; }
            @font-face { font-family: 'JetBrains Mono'; font-display: swap; }
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
            #__next-build-watcher, .__next-dev-overlay,
            .__next-dev-overlay-backdrop, [data-nextjs-dialog],
            [data-nextjs-dialog-backdrop], [data-nextjs-toast],
            .__next-build-indicator { display: none !important; visibility: hidden !important; opacity: 0 !important; pointer-events: none !important; }
            .loading { opacity: 0; transition: opacity 0.3s ease-in-out; }
            .loaded { opacity: 1; }
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
