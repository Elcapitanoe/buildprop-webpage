export interface ReleaseAsset {
  readonly id: number;
  readonly name: string;
  readonly browser_download_url: string;
  readonly size: number;
  readonly download_count: number;
  readonly content_type: string;
}

export interface Release {
  readonly id: string;
  readonly name: string;
  readonly body: string;
  readonly published_at: string;
  readonly assets: readonly ReleaseAsset[];
  readonly tag_name: string;
  readonly prerelease: boolean;
  readonly draft: boolean;
}

export interface RateLimit {
  readonly limit: number;
  readonly remaining: number;
  readonly reset: string;
}

export interface GitHubApiResponse<T> {
  readonly data: T;
  readonly rateLimit: RateLimit;
}

export interface PageProps {
  readonly release: Release | null;
  readonly releases: Release[];
  readonly rateLimit: RateLimit;
  readonly lastDeployed: string;
  readonly error?: string;
}

export interface Commit {
  readonly sha: string;
  readonly commit: {
    readonly message: string;
    readonly author: {
      readonly name: string;
      readonly email: string;
      readonly date: string;
    };
  };
  readonly author: {
    readonly login: string;
    readonly avatar_url: string;
    readonly html_url: string;
  } | null;
  readonly html_url: string;
}

export interface ApiError {
  readonly message: string;
  readonly status: number;
  readonly code?: string;
}