import { z } from 'zod';

export const ComposerSchema = z.object({
  type: z.string(),
  composerId: z.string(),
  name: z.string(),
  lastUpdatedAt: z.number(),
  createdAt: z.number(),
  unifiedMode: z.string(),
  forceMode: z.string()
});

export const ComposerDataSchema = z.object({
  allComposers: z.array(ComposerSchema),
  selectedComposerIds: z.array(z.string()),
  hasMigratedComposerData: z.boolean(),
  hasMigratedMultipleComposers: z.boolean()
});

export const GenerationSchema = z.object({
  unixMs: z.number(),
  generationUUID: z.string(),
  type: z.string(),
  textDescription: z.string().optional(),
  text: z.string().optional(),
  model: z.string().optional(),
  promptUUID: z.string().optional(),
  status: z.string().optional(),
  error: z.string().optional(),
  metadata: z.record(z.any()).optional(),
  toolCalls: z.array(z.any()).optional(),
});

export const PromptSchema = z.object({
  text: z.string(),
  commandType: z.number(),
  unixMs: z.number().optional(),
  uuid: z.string().optional(),
  model: z.string().optional(),
  contextMessages: z.array(z.any()).optional(),
  metadata: z.record(z.any()).optional(),
  status: z.string().optional(),
  type: z.string().optional(),
  path: z.string().optional(),
  fileName: z.string().optional(),
});

export type Composer = z.infer<typeof ComposerSchema>;
export type ComposerData = z.infer<typeof ComposerDataSchema>;
export type Generation = z.infer<typeof GenerationSchema>;
export type Prompt = z.infer<typeof PromptSchema>;

export interface DatabaseRow {
  key: string;
  value: Buffer;
}

export interface ChatExtractionOptions {
  nameFilter?: string;
  minTimestamp?: number;
  maxTimestamp?: number;
  characterThreshold?: number;
  composerId?: string;
}

export interface FormattedChat {
  id: string;
  created: number;
  name?: string;
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
    metadata?: Record<string, any>;
  }>;
} 