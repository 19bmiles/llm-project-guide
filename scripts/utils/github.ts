import { Octokit } from '@octokit/rest';
import chalk from 'chalk';
import type { Config } from '../types/config';
import { PullRequestDataSchema, type GitHubData, type DiffData } from '../types/github';

export async function fetchPRData(
  octokit: Octokit,
  config: Config,
  prNumber: number
): Promise<GitHubData> {
  console.log(chalk.blue(`🔍 Fetching PR #${prNumber} data...`));

  // Fetch PR data
  const { data: prData } = await octokit.pulls.get({
    owner: config.github.owner,
    repo: config.github.repo,
    pull_number: prNumber,
  });

  // Validate PR data
  const validatedPR = PullRequestDataSchema.parse(prData);

  // Fetch commit data
  const { data: commit } = await octokit.repos.getCommit({
    owner: config.github.owner,
    repo: config.github.repo,
    ref: validatedPR.merge_commit_sha || validatedPR.head.sha,
  });

  // Fetch diff
  const diffResponse = await octokit.request(
    `GET /repos/${config.github.owner}/${config.github.repo}/commits/${commit.sha}`,
    {
      headers: { accept: 'application/vnd.github.v3.diff' },
    }
  );

  if (!diffResponse.data) {
    throw new Error('Failed to fetch diff data');
  }

  // Process diff data
  const diff = processDiff(
    typeof diffResponse.data === 'string' 
      ? diffResponse.data 
      : JSON.stringify(diffResponse.data),
    config.diff.maxHunkLines,
    config.diff.contextLines
  );

  const commitUrl = `https://github.com/${config.github.owner}/${config.github.repo}/commit/${commit.sha}`;

  console.log(chalk.green('✅ GitHub data fetched successfully'));

  return {
    pr: validatedPR,
    diff,
    commitUrl,
  };
}

function processDiff(
  rawDiff: string,
  maxHunkLines: number,
  contextLines: number
): DiffData {
  const hunks = rawDiff
    .split('\ndiff --git ')
    .filter(Boolean)
    .map((hunk) => {
      const lines = hunk.split('\n');
      const fileHeader = lines[0];
      const content = lines.slice(1).join('\n');
      
      // Simple heuristic to find the actual diff content
      const diffStart = content.indexOf('@@');
      const diffContent = diffStart > -1 ? content.slice(diffStart) : content;
      
      // Extract line numbers from the @@ notation
      const lineMatch = diffContent.match(/@@ -(\d+),\d+ \+(\d+),\d+ @@/);
      const startLine = lineMatch ? parseInt(lineMatch[1], 10) : 1;
      
      const contentLines = diffContent.split('\n');
      const endLine = startLine + contentLines.length;
      
      return {
        content: cropHunk(diffContent, maxHunkLines, contextLines),
        lineCount: contentLines.length,
        startLine,
        endLine,
      };
    });

  return {
    raw: rawDiff,
    hunks,
  };
}

function cropHunk(content: string, maxLines: number, contextLines: number): string {
  const lines = content.split('\n');
  
  if (lines.length <= maxLines) {
    return content;
  }
  
  // Keep header
  const header = lines[0];
  
  // Get the meaningful lines (changes)
  const changeLines = lines.slice(1).filter(line => line.startsWith('+') || line.startsWith('-'));
  
  // If we have fewer changes than max, return all
  if (changeLines.length <= maxLines) {
    return content;
  }
  
  // Take first and last half of the changes
  const halfMax = Math.floor((maxLines - contextLines) / 2);
  const firstHalf = changeLines.slice(0, halfMax);
  const lastHalf = changeLines.slice(-halfMax);
  
  return [
    header,
    ...firstHalf,
    `@@ ... ${changeLines.length - maxLines} lines skipped ... @@`,
    ...lastHalf,
  ].join('\n');
} 