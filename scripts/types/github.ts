import { z } from 'zod';

export const PullRequestDataSchema = z.object({
  number: z.number(),
  title: z.string(),
  body: z.string().nullable(),
  labels: z.array(z.object({ name: z.string() })),
  merge_commit_sha: z.string(),
  merged_at: z.string().nullable(),
  head: z.object({
    ref: z.string(), // branch name
    sha: z.string(), // commit SHA
  }),
});

export type PullRequestData = z.infer<typeof PullRequestDataSchema>;

export interface DiffData {
  raw: string;
  hunks: Array<{
    content: string;
    lineCount: number;
    startLine: number;
    endLine: number;
  }>;
}

export interface GitHubData {
  pr: PullRequestData;
  diff: DiffData;
  commitUrl: string;
} 