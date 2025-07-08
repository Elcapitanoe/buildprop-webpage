import { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import type { Release } from '../lib/types';
import { formatDate, formatFileSize, formatDownloadCount, createSafeMarkdown } from '../lib/utils';
import { Clock, ExternalLink } from 'lucide-react';

interface ReleaseSectionProps {
  readonly release: Release;
}

const DownloadIcon = memo(() => (
  <svg 
    className="w-5 h-5 flex-shrink-0" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
    />
  </svg>
));

DownloadIcon.displayName = 'DownloadIcon';

const CloudDownloadIcon = memo(() => (
  <svg 
    className="w-5 h-5 flex-shrink-0" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" 
    />
  </svg>
));

CloudDownloadIcon.displayName = 'CloudDownloadIcon';

const HistoryIcon = memo(() => (
  <svg 
    className="w-5 h-5 flex-shrink-0" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    aria-hidden="true"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M12 8v4l3 3m6-3a9 9 0 11-6.219-8.56M12 3v1m-9 8H2" 
    />
  </svg>
));
HistoryIcon.displayName = 'HistoryIcon';


const ReleaseSection = memo<ReleaseSectionProps>(({ release }) => {
  const safeMarkdown = createSafeMarkdown(release.body);

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8 animate-slide-up">
      <div className="flex items-start justify-between mb-6 pb-4 border-b border-gray-100">
        <div className="flex-1">
          <h2 className="font-semibold text-gray-900 mb-2 flex items-center gap-3">
            <span className="text-2xl" role="img" aria-label="Rocket">🚀</span>
            <span className="text-3xl">Latest Release</span>
          </h2>
          <p className="text-gray-600">
            Download the latest build with improvements.
          </p>
        </div>
      </div>

      
      
<div className="space-y-6">
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
 
    <h3 className="text-xl font-semibold text-gray-900">
      Build: {release.name}
    </h3>

  <div className="w-fit">
    <time 
      className="inline-flex max-w-full md:max-w-max items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-600 border border-primary-300"
      dateTime={release.published_at}
    >
      Released on {formatDate(release.published_at)}
    </time>
  </div>
    
  </div>


        
        {safeMarkdown && (
          <div className="prose prose-gray max-w-none break-words overflow-x-auto">
            <ReactMarkdown>{safeMarkdown}</ReactMarkdown>
          </div>
        )}
        
        {release.assets.length > 0 && (
          <div className="pt-6 border-t border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl" role="img" aria-label="Download">📥</span>
              <h4 className="text-lg font-semibold text-gray-900">Downloads</h4>
            </div>
            
<div className="flex flex-col sm:flex-row gap-3">
  {release.assets.map((asset) => (
    <div key={asset.id} className="flex-1 min-w-[200px]">
      <a
        href={asset.browser_download_url} target="_blank"  rel="noopener noreferrer"
        className="flex items-center justify-between w-full p-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Download ${asset.name}`}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <DownloadIcon />
          <div className="flex-1 min-w-0">
            <div className="font-medium truncate">{asset.name}</div>
            <div className="text-sm opacity-90">
              {formatFileSize(asset.size)}
              {asset.download_count > 0 && (
                <span> • {formatDownloadCount(asset.download_count)} downloads</span>
              )}
            </div>
          </div>
        </div>
        <CloudDownloadIcon />
      </a>
    </div>
  ))}

  {/* Tombol Previous Builds */}
  <div className="flex-1 min-w-[200px]">
    <a
      href="https://sourceforge.net/projects/pixel-build-prop/files/" target="_blank"  rel="noopener noreferrer"
      className="flex items-center justify-between w-full p-4 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <HistoryIcon />
        <div className="flex-1 min-w-0">
          <div className="font-medium truncate">Previous Builds</div>
          <div className="text-sm opacity-90">SF Release page</div>
        </div>
      </div>
      <CloudDownloadIcon />
    </a>
  </div>
</div>



           
          </div>
        )}
      </div>
    </section>
  );
});

ReleaseSection.displayName = 'ReleaseSection';

export default ReleaseSection;