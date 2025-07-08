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
      <div className="flex items-start justify-between mb-6 pb-4 border-b border-gray-100">
      <div className="mb-1">
        <h2 className="font-semibold text-gray-900 mb-2 flex items-center gap-3">
          <span className="text-2xl">📝</span>
          <span className="text-3xl">Changelog</span>
        </h2>
        <p className="text-gray-500">
          Recent Changes and Enhancements
        </p>
      </div>
      </div>
      
      <div className="changelog-content">
        <ReactMarkdown>{safeMarkdown}</ReactMarkdown>
      </div>
    </section>
  );
});

ChangelogSection.displayName = 'ChangelogSection';

export default ChangelogSection;