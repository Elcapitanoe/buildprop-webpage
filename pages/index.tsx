import { GetStaticProps } from 'next';
import { useState, useEffect } from 'react';
import type { PageProps } from '../lib/types';
import { fetchReleases, fetchChangelog, fetchRateLimit, findLatestStableRelease } from '../lib/github-api';
import Layout from '../components/Layout';
import HeroSection from '../components/HeroSection';
import ReleaseSection from '../components/ReleaseSection';
import ChangelogSection from '../components/ChangelogSection';
import Footer from '../components/Footer';

export default function HomePage(props: PageProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations after component mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Show error state if there's a critical error
  if (props.error) {
    return (
      <Layout title="Error - Pixel Build Prop">
        <div className="min-h-screen flex items-center justify-center">
          <div className="max-w-md w-full bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Service Unavailable
            </h1>
            <p className="text-gray-600 mb-6">
              {props.error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <HeroSection release={props.release} />
        
        {props.release && (
          <ReleaseSection release={props.release} />
        )}
        
        <ChangelogSection changelog={props.changelog} />
        
        <Footer 
          rateLimit={props.rateLimit} 
          lastUpdated={props.lastUpdated}
        />
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const startTime = Date.now();
  
  try {
    // Fetch all data concurrently for better performance
    const [releasesResult, changelogResult, rateLimitResult] = await Promise.allSettled([
      fetchReleases(),
      fetchChangelog(),
      fetchRateLimit(),
    ]);

    // Handle releases
    let latestRelease = null;
    let finalRateLimit = {
      limit: 0,
      remaining: 0,
      reset: 'Unknown',
    };

    if (releasesResult.status === 'fulfilled') {
      latestRelease = findLatestStableRelease(releasesResult.value.data);
      finalRateLimit = releasesResult.value.rateLimit;
    } else {
      console.error('Failed to fetch releases:', releasesResult.reason);
    }

    // Handle changelog
    const finalChangelog = changelogResult.status === 'fulfilled' 
      ? changelogResult.value 
      : '# Changelog\n\nChangelog is currently unavailable. Please check back later.';

    // Handle rate limit (use from releases or fetch separately)
    if (rateLimitResult.status === 'fulfilled') {
      finalRateLimit = rateLimitResult.value;
    }

    const lastUpdated = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Jakarta',
      hour12: false,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }) + ' WIB';

    const buildTime = Date.now() - startTime;
    console.log(`ISR props generated in ${buildTime}ms`);

    return {
      props: {
        changelog: finalChangelog,
        release: latestRelease,
        rateLimit: finalRateLimit,
        lastUpdated,
      },
      // ISR: Regenerate page every 30 minutes (1800 seconds)
      revalidate: 1800,
    };
  } catch (error) {
    console.error('Critical error in getStaticProps:', error);

    // Return error state for critical failures
    // Still use ISR even for error states to retry later
    return {
      props: {
        changelog: '',
        release: null,
        rateLimit: {
          limit: 0,
          remaining: 0,
          reset: 'Unknown',
        },
        lastUpdated: new Date().toLocaleString('en-US', {
          timeZone: 'Asia/Jakarta',
          hour12: false,
        }) + ' WIB',
        error: 'Unable to load data. Please try again later.',
      },
      // Retry more frequently for error states (5 minutes)
      revalidate: 300,
    };
  }
};