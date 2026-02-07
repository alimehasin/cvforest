import { useQuery } from '@tanstack/react-query';
import type { GithubContribution, GithubHeatmapData } from '../types';

interface GithubApiResponse {
  total: Record<string, number>;
  contributions: GithubContribution[];
}

interface GithubContributionsResult {
  heatmapData: GithubHeatmapData;
  contributions: GithubContribution[];
}

function extractGithubUsername(url: string | null | undefined): string | null {
  if (!url) {
    return null;
  }

  try {
    const parsed = new URL(url);
    const segments = parsed.pathname.split('/').filter(Boolean);
    return segments[0] ?? null;
  } catch {
    return null;
  }
}

export function useGithubContributions(githubUrl: string | null | undefined) {
  const username = extractGithubUsername(githubUrl);

  return useQuery({
    queryKey: ['/github/contributions', username],
    enabled: !!username,
    staleTime: 1000 * 60 * 60, // 1 hour
    queryFn: async (): Promise<GithubContributionsResult> => {
      const res = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      );

      if (!res.ok) {
        throw new Error('Failed to fetch GitHub contributions');
      }

      const data: GithubApiResponse = await res.json();

      // Transform array into Record<string, number> for Mantine Heatmap
      const heatmapData: GithubHeatmapData = {};
      for (const entry of data.contributions) {
        if (entry.count > 0) {
          heatmapData[entry.date] = entry.count;
        }
      }

      return {
        heatmapData,
        contributions: data.contributions,
      };
    },
  });
}
