import Head from 'next/head';
import { GetStaticProps } from 'next';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface ReleaseAsset {
  id: number;
  name: string;
  browser_download_url: string;
  size: number;
  download_count: number;
}

interface Release {
  id: string;
  name: string;
  body: string;
  published_at: string;
  assets: ReleaseAsset[];
  tag_name: string;
}

interface Props {
  changelog: string;
  release: Release | null;
}

const Home: React.FC<Props> = ({ changelog, release }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDownloadCount = (count: number) => {
    if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M';
    if (count >= 1000) return (count / 1000).toFixed(1) + 'K';
    return count.toString();
  };

  return (
    <div className="min-h-screen animated-bg">
      <Head>
        <title>Pixel Build Prop</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Spoof your device as Pixel 9 Pro XL with Komodo Build Prop module."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
	   
      <div className="main-container">
        {/* Hero Section */}
        <section className={`hero-section content-section transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="hero-title">
            KOMODO BUILD PROP
          </h1>
          <p className="hero-subtitle">
            A module to spoof your device as a Google Pixel 9 Pro XL.
          </p>
          
          {/* Stats Section */}
          {release && (
            <div className={`stats-container transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="stat-item">
                <div className="stat-value">{release.tag_name}</div>
                <div className="stat-label">Latest Version</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">
                  {release.assets.reduce((total, asset) => total + asset.download_count, 0) > 0 
                    ? formatDownloadCount(release.assets.reduce((total, asset) => total + asset.download_count, 0))
                    : '0'
                  }
                </div>
                <div className="stat-label">Total Downloads</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{release.assets.length}</div>
                <div className="stat-label">Available Files</div>
              </div>
            </div>
          )}
        </section>

        {/* Main Content - Single Column */}
        <div className="content-single-column">
          {/* Latest Release Section */}
          {release && (
            <section className="content-section scroll-reveal stagger-item">
              <div className="glass-card">
                <div className="section-header">
                  <div>
                    <h2 className="section-title">
                      <span className="section-icon">🚀</span>
                      Latest Release
                    </h2>
                    <p className="section-description">
                      Get the latest version with newest features and improvements
                    </p>
                  </div>
                </div>
                
                <div className="release-section">
                  <div className="release-header">
                    <h3 className="release-title">Android Patch<br />{release.name}</h3>
                    <span className="release-meta">Released on {new Date(release.published_at).toLocaleDateString('en-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  
                  <div className="prose">
                    <ReactMarkdown>{release.body}</ReactMarkdown>
                  </div>
                  
                  {release.assets.length > 0 && (
                    <div className="downloads-section">
                      <div className="downloads-header">
                        <h4 className="downloads-title">
                          <span className="downloads-icon">📥</span>
                          Downloads
                        </h4>
                        <svg className="downloads-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                        </svg>
                      </div>
                      
                      <div className="downloads-list">
                        {release.assets.map((asset, index) => (
                          <a
                            key={asset.id}
                            href={asset.browser_download_url}
                            className="download-btn"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            <div className="download-info">
                              <svg className="download-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              <div className="download-details">
                                <div className="download-name">{asset.name}</div>
                                <div className="download-meta">
                                  {formatFileSize(asset.size)}
                                  {asset.download_count > 0 && (
                                    <span> • {formatDownloadCount(asset.download_count)} downloads</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Changelog Section */}
          <section className="content-section scroll-reveal stagger-item">
            <div className="glass-card">
              <div className="section-header">
                <div>
                  <h2 className="section-title">
                    <span className="section-icon">📋</span>
                    Changelog
                  </h2>
                  <p className="section-description">
                    Track all the latest updates, improvements, and bug fixes
                  </p>
                </div>
              </div>
              
              <div className="prose">
                <ReactMarkdown>{changelog}</ReactMarkdown>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="footer-section content-section scroll-reveal">
          <p className="footer-text">
            Made for the Android community
          </p>
          <p className="footer-subtext">
            Generated by <a href="https://github.com/Elcapitanoe">@Elcapitanoe</a> · Config by <a href="https://github.com/0x11DFE">@0x11DFE</a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    // Fetch changelog (raw markdown dari GitHub)
    const changelogRes = await fetch(
      'https://raw.githubusercontent.com/Elcapitanoe/Komodo-Build-Prop/main/CHANGELOG.md'
    );

    if (!changelogRes.ok) {
      throw new Error(`Failed to fetch changelog: ${changelogRes.status}`);
    }

    const changelog = await changelogRes.text();

    // Siapkan opsi header jika ada token
    const githubToken = process.env.GITHUB_TOKEN;
    const githubHeaders = githubToken
      ? {
          headers: {
            Authorization: `Bearer ${githubToken}`,
            'User-Agent': 'Elcapitanoe-App',
            Accept: 'application/vnd.github+json',
          },
        }
      : {}; // fallback tanpa token

    // Fetch releases dari GitHub API
    const releasesRes = await fetch(
      'https://api.github.com/repos/Elcapitanoe/Komodo-Build-Prop/releases',
      githubHeaders
    );

    if (!releasesRes.ok) {
      throw new Error(`Failed to fetch releases: ${releasesRes.status}`);
    }

    const releases: Release[] = await releasesRes.json();

    const latest =
      releases.find(
        (r) =>
          !r.name.toLowerCase().includes('draft') &&
          !r.name.toLowerCase().includes('pre')
      ) || releases[0] || null;

    return {
      props: {
        changelog,
        release: latest,
      },
      revalidate: 3600, // Rebuild setiap 1 jam
    };
  } catch (error) {
    console.error('Error fetching data:', error);

    return {
      props: {
        changelog:
          '# Changelog\n\nUnable to load changelog at the moment. Please try again later.',
        release: null,
      },
      revalidate: 300, // Retry setelah 5 menit
    };
  }
};

export default Home;