import { z } from 'zod';

export const ConfigSchema = z.object({
  github: z.object({
    token: z.string().min(1, 'GitHub token is required'),
    owner: z.string().min(1, 'GitHub owner is required'),
    repo: z.string().min(1, 'GitHub repository name is required'),
  }),
  sqlite: z.object({
    dbPath: z.string().min(1, 'SQLite database path is required'),
  }),
  output: z.object({
    mdxPath: z.string().min(1, 'MDX output path is required'),
  }),
  diff: z.object({
    maxHunkLines: z.number().default(20),
    contextLines: z.number().default(3),
  }).default({
    maxHunkLines: 20,
    contextLines: 3,
  }),
  chat: z.object({
    characterThreshold: z.number().default(1000),
    nameFilter: z.string().optional(),
  }).default({
    characterThreshold: 1000,
  }),
});

export type Config = z.infer<typeof ConfigSchema>; 