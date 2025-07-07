import { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import { createSafeMarkdown } from '../lib/utils';

interface ChangelogSectionProps {
  readonly changelog: string;
}

const ChangelogSection = memo<ChangelogSectionProps>(({ changelog }) => {
  const safeMarkdown = createSafeMarkdown(changelog);

  if (!safeMarkdown) {
    return (
      <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8 animate-slide-up">
        <div className="text-center py-12">
          <div className="text-4xl mb-3">📝</div>
          <p className="text-gray-500 text-sm">Changelog is currently unavailable.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8 animate-slide-up">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-1 flex items-center gap-2">
          <span className="text-lg">📝</span>
          Changelog
        </h2>
        <p className="text-sm text-gray-500">
          Latest updates and improvements
        </p>
      </div>
      
      <div className="changelog-content">
        <ReactMarkdown>{safeMarkdown}</ReactMarkdown>
      </div>
    </section>
  );
});

ChangelogSection.displayName = 'ChangelogSection';

export default ChangelogSection;