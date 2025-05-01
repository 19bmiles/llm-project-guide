import Database from 'better-sqlite3';
import chalk from 'chalk';
import fs from 'fs/promises';
import path from 'path';
import type { Config } from '../types/config';
import type { DatabaseRow, ChatExtractionOptions, FormattedChat, ComposerData, Composer } from '../types/sqlite';
import { GenerationSchema, PromptSchema, ComposerDataSchema } from '../types/sqlite';
import { z } from 'zod';

interface ValueRow {
  value: Buffer;
}

function debugLogObject(obj: any, label: string) {
  console.log(chalk.yellow(`\n=== Debug ${label} ===`));
  console.log(JSON.stringify(obj, null, 2));
  console.log(chalk.yellow('=== End Debug ===\n'));
}

async function selectComposer(composers: Composer[]): Promise<string | undefined> {
  const { selectedComposer } = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedComposer',
      message: 'Select a composer to view prompts for:',
      choices: composers.map(c => ({
        name: `${c.name} (${new Date(c.createdAt).toLocaleString()})`,
        value: c.composerId
      }))
    }
  ]);
  
  return selectedComposer;
}

export async function extractCursorChats(config: Config): Promise<void> {
  console.log(chalk.blue('📚 Extracting Cursor chats...'));
  
  const db = new Database(config.sqlite.dbPath);
  
  try {
    // Get prompts
    const promptsRow = db.prepare<any, ValueRow>(
      'SELECT value FROM ItemTable WHERE key = ?'
    ).get('aiService.prompts');
    
    if (!promptsRow?.value) {
      console.warn(chalk.yellow('No prompts found'));
      return;
    }
    
    // Parse the prompts
    const rawPrompts = JSON.parse(promptsRow.value.toString());
    
    // Save to a JSON file
    const outputPath = path.join(process.cwd(), 'extracted-prompts.json');
    await fs.writeFile(outputPath, JSON.stringify(rawPrompts, null, 2));
    
    console.log(chalk.green(`\n✅ Saved ${rawPrompts.length} prompts to ${outputPath}`));
    console.log('\nPrompt preview:');
    
    // Show first few prompts as preview
    rawPrompts.slice(0, 3).forEach((prompt: any, index: number) => {
      console.log(`\n${chalk.cyan(`Prompt ${index + 1}:`)}`);
      console.log(prompt.text.slice(0, 150) + (prompt.text.length > 150 ? '...' : ''));
    });
    
  } finally {
    db.close();
  }
}

export function formatChatAsMarkdown(
  conversation: FormattedChat,
  characterThreshold: number = 1000
): string {
  const timestamp = new Date(conversation.created).toISOString();
  const totalLength = conversation.messages.reduce((sum, msg) => sum + msg.content.length, 0);
  
  const content = conversation.messages.map(msg => {
    if (msg.role === 'user') {
      return `#### 💬 Prompt\n${msg.content}\n`;
    } else {
      return `##### 🤖 LLM\n${msg.content}\n`;
    }
  }).join('\n');
  
  if (totalLength > characterThreshold) {
    return `<details>
<summary>Chat from ${timestamp} (ID: ${conversation.id})</summary>

${content}
</details>`;
  }
  
  return content;
} 