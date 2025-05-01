import { Octokit } from '@octokit/rest';
import { program } from 'commander';
import chalk from 'chalk';
import { loadConfig } from './utils/config';
import { fetchPRData } from './utils/github';
import { extractCursorChats, formatChatAsMarkdown } from './utils/sqlite';

program
  .name('hackai-log')
  .description('Generate documentation from PR and Cursor chats')
  .requiredOption('-p, --pr <number>', 'Pull-request number')
  .option('-c, --config <path>', 'Path to config file', './.env')
  .option('-n, --name-filter <filter>', 'Filter chats by name')
  .parse();

const { pr, config: configPath, nameFilter } = program.opts();

async function main() {
  try {
    // Load and validate configuration
    const config = await loadConfig(configPath);
    
    // Override name filter if provided via CLI
    if (nameFilter) {
      config.chat.nameFilter = nameFilter;
    }
    
    // Initialize GitHub client
    const octokit = new Octokit({ auth: config.github.token });
    
    // Fetch PR data and diff
    const githubData = await fetchPRData(octokit, config, parseInt(pr, 10));
    
    // Extract relevant chats
    await extractCursorChats(config);
    
    // Format the output
    console.log(chalk.green('\n✨ Successfully gathered all data:'));
    
    console.log(chalk.cyan('\nPR Info:'));
    console.log(`Title: ${githubData.pr.title}`);
    console.log(`Number: ${githubData.pr.number}`);
    console.log(`Labels: ${githubData.pr.labels?.map(l => l.name).join(', ') || 'None'}`);
    console.log(`Commit: ${githubData.commitUrl}`);
    
    console.log(chalk.cyan('\nDiff Summary:'));
    console.log(`Total hunks: ${githubData.diff?.hunks?.length || 0}`);
    if (githubData.diff?.hunks) {
      githubData.diff.hunks.forEach((hunk, i) => {
        if (hunk.startLine !== undefined && hunk.endLine !== undefined && hunk.lineCount !== undefined) {
          console.log(`\nHunk ${i + 1}:`);
          console.log(`Lines: ${hunk.startLine}-${hunk.endLine} (${hunk.lineCount} lines)`);
        }
      });
    }

  } catch (error) {
    if (error instanceof Error) {
      console.error(chalk.red('\n❌ Error:'), error.message);
    } else {
      console.error(chalk.red('\n❌ Unknown error occurred'));
    }
    process.exit(1);
  }
}

main(); 