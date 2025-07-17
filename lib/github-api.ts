import type { Release, RateLimit, GitHubApiResponse, ApiError } from './types';

const GITHUB_API_BASE = 'https://api.github.com';
const REPO_OWNER = 'Elcapitanoe';
const REPO_NAME = 'Komodo-Build-Prop';
const REQUEST_TIMEOUT = 15000; // Increased to 15 seconds for ISR
const MAX_RETRIES = 2; // Reduced retries for ISR to avoid long build times

interface RequestOptions {
  readonly timeout?: number;
  readonly retries?: number;
  readonly etag?: string;
}

class GitHubApiError extends Error implements ApiError {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly code?: string
  ) {
    super(message);
    this.name = 'GitHubApiError';
  }
}

function createHeaders(etag?: string): HeadersInit {
  const headers: Record<string, string> = {
    'User-Agent': 'Komodo-Build-Prop-Site/1.0',
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (etag) {
    headers['If-None-Match'] = etag;
  }

  return headers;
}

async function fetchWithTimeout(
  url: string,
  options: RequestInit & { timeout?: number }
): Promise<Response> {
  const { timeout = REQUEST_TIMEOUT, ...fetchOptions } = options;
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new GitHubApiError('Request timeout', 408, 'TIMEOUT');
    }
    throw error;
  }
}

async function fetchWithRetry(
  url: string,
  options: RequestOptions = {}
): Promise<Response> {
  const { timeout = REQUEST_TIMEOUT, retries = MAX_RETRIES, etag } = options;
  let lastError: Error;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetchWithTimeout(url, {
        headers: createHeaders(etag),
        timeout,
      });
      
      if (response.ok || response.status === 304) {
        return response;
      }
      
      if (response.status === 403) {
        const resetTime = response.headers.get('X-RateLimit-Reset');
        const resetDate = resetTime ? new Date(parseInt(resetTime) * 1000) : null;
        throw new GitHubApiError(
          `Rate limit exceeded${resetDate ? `. Reset at: ${resetDate.toISOString()}` : ''}`,
          403,
          'RATE_LIMIT'
        );
      }
      
      if (response.status === 404) {
        throw new GitHubApiError('Resource not found', 404, 'NOT_FOUND');
      }
      
      if (response.status >= 500 && attempt < retries) {
        const delay = Math.min(1000 * Math.pow(2, attempt), 5000); // Max 5 second delay
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      throw new GitHubApiError(
        `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        'HTTP_ERROR'
      );
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      if (lastError instanceof GitHubApiError && 
          (lastError.code === 'RATE_LIMIT' || lastError.code === 'NOT_FOUND')) {
        throw lastError;
      }
      
      if (attempt < retries) {
        const delay = Math.min(1000 * Math.pow(2, attempt), 5000);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      throw lastError;
    }
  }
  
  throw lastError!;
}

export async function fetchReleases(): Promise<GitHubApiResponse<Release[]>> {
  const url = `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/releases`;
  
  try {
    const response = await fetchWithRetry(url, { retries: MAX_RETRIES });
    
    if (!response.ok) {
      throw new GitHubApiError(`Failed to fetch releases: ${response.status}`, response.status);
    }
    
    const releases: Release[] = await response.json();
    const rateLimit = extractRateLimit(response);
    
    // Log for ISR debugging
    console.log(`Fetched ${releases.length} releases, rate limit: ${rateLimit.remaining}/${rateLimit.limit}`);
    
    return { data: releases, rateLimit };
  } catch (error) {
    if (error instanceof GitHubApiError) {
      throw error;
    }
    throw new GitHubApiError('Failed to fetch releases', undefined, 'FETCH_ERROR');
  }
}

export async function fetchChangelog(): Promise<string> {
  const url = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/CHANGELOG.md`;
  
  try {
    console.log('Fetching changelog from:', url);
    const response = await fetchWithRetry(url, { retries: MAX_RETRIES });
    
    if (!response.ok) {
      console.error(`Changelog fetch failed with status: ${response.status}, statusText: ${response.statusText}`);
      throw new GitHubApiError(`Failed to fetch changelog: ${response.status}`, response.status);
    }
    
    if (!response.ok) {
      console.error(`Changelog fetch failed with status: ${response.status}, statusText: ${response.statusText}`);
      throw new GitHubApiError(`Failed to fetch changelog: ${response.status}`, response.status);
    }
    
    const changelog = await response.text();
    console.log('Changelog fetched successfully, length:', changelog.length, 'preview:', changelog.substring(0, 100));
    return changelog;
  } catch (error) {
    console.error('Failed to fetch changelog, error details:', error);
    if (error instanceof GitHubApiError) {
      console.error('GitHub API Error - Status:', error.status, 'Code:', error.code, 'Message:', error.message);
    }
    return '# Changelog\n\nChangelog is currently unavailable. Please check back later.';
  }
}

export async function fetchRateLimit(): Promise<RateLimit> {
  const url = `${GITHUB_API_BASE}/rate_limit`;
  
  try {
    const response = await fetchWithRetry(url, { retries: MAX_RETRIES });
    
    if (!response.ok) {
      throw new GitHubApiError(`Failed to fetch rate limit: ${response.status}`, response.status);
    }
    
    const data = await response.json();
    return extractRateLimit(response, data);
  } catch (error) {
    console.warn('Failed to fetch rate limit:', error);
    return {
      limit: 0,
      remaining: 0,
      reset: 'Unknown',
    };
  }
}

function extractRateLimit(response: Response, data?: any): RateLimit {
  const limit = parseInt(response.headers.get('X-RateLimit-Limit') || '0', 10);
  const remaining = parseInt(response.headers.get('X-RateLimit-Remaining') || '0', 10);
  const resetTimestamp = parseInt(response.headers.get('X-RateLimit-Reset') || '0', 10);
  
  const finalLimit = limit || data?.rate?.limit || 0;
  const finalRemaining = remaining || data?.rate?.remaining || 0;
  const finalReset = resetTimestamp || data?.rate?.reset || 0;
  
  const resetDate = new Date(finalReset * 1000);
  const reset = resetDate.toLocaleString('en-US', {
    timeZone: 'Asia/Jakarta',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
}) + ' (UTC+7)';
  
  return {
    limit: finalLimit,
    remaining: finalRemaining,
    reset,
  };
}

export function findLatestStableRelease(releases: Release[]): Release | null {
  if (!releases || releases.length === 0) {
    return null;
  }
  
  const stableRelease = releases.find(release => 
    !release.draft && 
    !release.prerelease &&
    !release.name.toLowerCase().includes('draft') &&
    !release.name.toLowerCase().includes('pre') &&
    !release.tag_name.toLowerCase().includes('alpha') &&
    !release.tag_name.toLowerCase().includes('beta')
  );
  
  return stableRelease || releases[0];
}