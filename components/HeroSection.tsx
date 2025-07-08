import { memo } from 'react';
import type { Release } from '../lib/types';
import { formatDownloadCount, calculateTotalDownloads, calculateTotalDownloadsFromAllReleases } from '../lib/utils';

interface HeroSectionProps {
  readonly release: Release | null;
  readonly releases?: Release[];
}

const HeroSection = memo<HeroSectionProps>(({ release, releases }) => {
  const totalDownloads = release ? calculateTotalDownloads(release.assets) : 0;

  const totalDownloadsAll = releases?.length
    ? calculateTotalDownloadsFromAllReleases(releases)
    : 0;

  return (
    <section className="text-center py-12 px-6 bg-white rounded-xl shadow-sm border border-gray-200 mb-8 animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-bold text-primary-600 mb-4 leading-tight">
        KOMODO BUILD PROP
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
        A module to spoof your device as a Google Pixel 9 Pro XL
      </p>
      
      {release && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-gray-100">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-semibold text-gray-900 mb-1">
              {release.tag_name}
            </div>
            <div className="text-sm text-gray-500 uppercase tracking-wide font-medium">
              Latest Version
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-semibold text-gray-900 mb-1">
              {totalDownloadsAll > 0 ? formatDownloadCount(totalDownloadsAll) : '0'}
            </div>
            <div className="text-sm text-gray-500 uppercase tracking-wide font-medium">
              Total Downloads
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-semibold text-gray-900 mb-1">
              {releases?.length ?? 0}
            </div>
            <div className="text-sm text-gray-500 uppercase tracking-wide font-medium">
             Published Builds
            </div>
          </div>
          
        </div>
      )}
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;