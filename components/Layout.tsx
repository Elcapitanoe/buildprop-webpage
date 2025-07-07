import Head from 'next/head';
import { ReactNode, memo } from 'react';

interface LayoutProps {
  readonly children: ReactNode;
  readonly title?: string;
  readonly description?: string;
}

const DEFAULT_TITLE = 'Pixel Build Prop - Komodo Module';
const DEFAULT_DESCRIPTION = 'Spoof your Android device as Google Pixel 9 Pro XL with advanced system optimization using Komodo build prop module';

const Layout = memo<LayoutProps>(({ 
  children, 
  title = DEFAULT_TITLE, 
  description = DEFAULT_DESCRIPTION 
}) => {
  const fullTitle = title === DEFAULT_TITLE ? title : `${title} | Pixel Build Prop`;

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={description} />
        <meta name="keywords" content="Pixel Build Prop, Komodo, Android, Google Pixel 9 Pro XL, device spoofing, build.prop, system optimization, Magisk module" />
        <meta name="author" content="Pixel Build Prop Team" />
        
        {/* Open Graph */}
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Pixel Build Prop" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        
        {/* Favicon */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        
        {/* Theme */}
        <meta name="theme-color" content="#3b82f6" />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          {children}
        </main>
      </div>
    </>
  );
});

Layout.displayName = 'Layout';

export default Layout;