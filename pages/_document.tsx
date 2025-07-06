import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Pixel Build Prop - Komodo module to spoof your Android device as Google Pixel 9 Pro XL with advanced system optimization" />
        <meta name="keywords" content="Pixel Build Prop, Komodo, Android, Google Pixel 9 Pro XL, device spoofing, build.prop, system optimization, Magisk module" />
        <meta name="author" content="Pixel Build Prop Team" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Pixel Build Prop - Komodo Module" />
        <meta property="og:description" content="Spoof your Android device as Google Pixel 9 Pro XL using Komodo build prop module" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pixel Build Prop - Komodo Module" />
        <meta name="twitter:description" content="Spoof your Android device as Google Pixel 9 Pro XL using Komodo build prop module" />
        
        {/* Favicon - Multiple formats for better compatibility */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap" 
          rel="stylesheet" 
        />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        
        {/* Hide Next.js dev tools styles */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Hide Next.js development indicators */
            #__next-build-watcher,
            .__next-dev-overlay,
            .__next-dev-overlay-backdrop,
            [data-nextjs-dialog],
            [data-nextjs-dialog-backdrop],
            [data-nextjs-toast],
            [data-nextjs-scroll-lock],
            .__next-dev-overlay-backdrop {
              display: none !important;
              visibility: hidden !important;
              opacity: 0 !important;
              pointer-events: none !important;
            }
            
            /* Hide build activity indicator */
            .__next-build-indicator {
              display: none !important;
            }
            
            /* Hide any remaining dev overlays */
            [id*="__next"],
            [class*="__next-dev"],
            [data-nextjs*=""] {
              z-index: -9999 !important;
            }
          `
        }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}