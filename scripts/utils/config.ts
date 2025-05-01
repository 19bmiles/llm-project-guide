import { config as dotenvConfig } from 'dotenv';
import { ConfigSchema, type Config } from '../types/config';
import chalk from 'chalk';

export async function loadConfig(configPath: string): Promise<Config> {
  // Load environment variables
  const result = dotenvConfig({ path: configPath });
  
  if (result.error) {
    console.error(chalk.red(`Error loading .env file: ${result.error.message}`));
    throw result.error;
  }

  try {
    const config = {
      github: {
        token: process.env.GITHUB_TOKEN,
        owner: process.env.GITHUB_OWNER,
        repo: process.env.GITHUB_REPO,
      },
      sqlite: {
        dbPath: process.env.SQLITE_DB_PATH,
      },
      output: {
        mdxPath: process.env.MDX_OUTPUT_PATH,
      },
      diff: {
        maxHunkLines: parseInt(process.env.MAX_HUNK_LINES || '20', 10),
        contextLines: parseInt(process.env.CONTEXT_LINES || '3', 10),
      },
    };

    // Validate configuration
    const validated = ConfigSchema.parse(config);
    
    return validated;
  } catch (error) {
    if (error instanceof Error) {
      console.error(chalk.red('Configuration error:'));
      console.error(error.message);
    }
    throw error;
  }
} 